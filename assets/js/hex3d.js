/* ==========================================================================
   3D hex-light ceiling — a nod to the studio's signature hexagonal lighting.
   One Three.js plane in perspective with a GPU hex-grid shader.
   Renders only while the section is on screen; static frame for reduced motion.
   ========================================================================== */
(function () {
  function init() {
    var canvas = document.getElementById("hexCanvas");
    if (!canvas || !window.THREE) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var THREE = window.THREE;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x040506, 1);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    var uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 }
    };

    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: false,
      vertexShader: [
        "varying vec2 vUv;",
        "varying vec3 vPos;",
        "void main(){ vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }"
      ].join("\n"),
      fragmentShader: [
        "precision highp float;",
        "varying vec2 vUv; varying vec3 vPos;",
        "uniform float uTime; uniform vec2 uMouse; uniform float uScroll;",
        "const vec2 S = vec2(1.0, 1.7320508);",
        "float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }",
        "vec4 hexCoords(vec2 uv){",
        "  vec4 hc = floor(vec4(uv, uv - vec2(0.5,1.0)) / S.xyxy) + 0.5;",
        "  vec4 h = vec4(uv - hc.xy*S, uv - (hc.zw + 0.5)*S);",
        "  return dot(h.xy,h.xy) < dot(h.zw,h.zw) ? vec4(h.xy, hc.xy) : vec4(h.zw, hc.zw + 0.5);",
        "}",
        "float hexDist(vec2 p){ p = abs(p); return max(dot(p, S*0.5), p.x); }",
        "void main(){",
        "  vec2 uv = vPos.xy * 0.55;",
        "  uv.y += uScroll * 0.6;",
        "  vec4 h = hexCoords(uv);",
        "  float d = 0.5 - hexDist(h.xy);",          // 0 at edge
        "  float rnd = hash(h.zw);",
        "  float on = step(0.16, rnd);",              // some cells dark, like a real install
        "  float line = smoothstep(0.022, 0.0, d);",
        "  float glow = exp(-d * 34.0) * 0.55;",
        "  float sweep = smoothstep(0.9, 0.0, abs(fract(h.z*0.07 - h.w*0.04 - uTime*0.08) - 0.5) * 2.0);",
        "  float flick = 0.86 + 0.14 * sin(uTime*2.0 + rnd*40.0);",
        "  vec2 m = uMouse * vec2(6.0, 3.5);",
        "  float near = exp(-length(vPos.xy - m) * 0.32);",
        "  float lum = (line + glow) * on * flick * (0.55 + 0.45*sweep + 0.9*near);",
        "  vec3 cool = vec3(0.86, 0.93, 1.0);",
        "  vec3 col = cool * lum;",
        "  col += vec3(0.56,0.82,1.0) * near * 0.06;",   // faint ice wash near cursor
        "  float fog = smoothstep(16.0, 2.0, length(vPos.xy * vec2(0.6, 1.0)));",
        "  gl_FragColor = vec4(col * fog, 1.0);",
        "}"
      ].join("\n")
    });

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(40, 30, 1, 1), mat);
    plane.rotation.x = -1.05; // tilt into a ceiling seen from below
    plane.position.set(0, 2.2, -3);
    scene.add(plane);

    var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    var visible = false, raf = 0, last = performance.now(), t = 0;

    function resize() {
      var r = canvas.getBoundingClientRect();
      var w = Math.max(1, r.width), hgt = Math.max(1, r.height);
      renderer.setSize(w, hgt, false);
      camera.aspect = w / hgt;
      camera.fov = w < 700 ? 64 : 50;
      camera.updateProjectionMatrix();
    }

    function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;
      uniforms.uTime.value = t;
      uniforms.uMouse.value.set(cur.x, cur.y);
      var r = canvas.getBoundingClientRect();
      var prog = 1 - (r.top + r.height) / (window.innerHeight + r.height); // 0..1 through viewport
      uniforms.uScroll.value = prog;
      camera.position.x = cur.x * 0.6;
      camera.position.y = -cur.y * 0.35;
      camera.lookAt(0, 0.6, -3);
      plane.rotation.z = cur.x * 0.05;
      renderer.render(scene, camera);
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    var section = canvas.parentElement;
    section.addEventListener("pointermove", function (e) {
      var r = section.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    });
    section.addEventListener("pointerleave", function () { target.x = 0; target.y = 0; });

    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) { reduce ? frame(performance.now()) : start(); } else stop();
    }, { rootMargin: "100px" }).observe(section);

    window.addEventListener("resize", function () { resize(); if (reduce || !visible) frame(performance.now()); });
    resize();
    frame(performance.now());
  }

  // Lazy-load Three.js only when the 3D section is approaching the viewport.
  function boot() {
    var section = document.getElementById("trust");
    if (!section) return;
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      if (window.THREE) return init();
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.async = true;
      s.onload = init;
      document.head.appendChild(s);
    }, { rootMargin: "1200px 0px" });
    io.observe(section);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
