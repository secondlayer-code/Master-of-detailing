/* ==========================================================================
   Masters of Detailing — interactions
   ========================================================================== */
(function () {
  "use strict";
  var C = window.MOD_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- WhatsApp ---------- */
  function waLink(text) {
    return "https://wa.me/" + C.whatsappNumber + "?text=" + encodeURIComponent(text);
  }
  function bindWa(root) {
    $$("[data-wa]", root).forEach(function (a) { a.href = waLink(a.getAttribute("data-wa")); });
  }

  /* ---------- Config binding ---------- */
  $$("[data-cfg]").forEach(function (el) {
    var k = el.getAttribute("data-cfg"), v = C[k];
    if (v == null) return;
    if (k === "googleRating" || k === "justdialRating") v = Number(v).toFixed(1);
    el.textContent = v;
  });
  $$("[data-cfg-href]").forEach(function (el) { var v = C[el.getAttribute("data-cfg-href")]; if (v) el.href = v; });
  bindWa(document);
  $("#year").textContent = new Date().getFullYear();
  $("#mapFrame").src = "https://maps.google.com/maps?q=" + C.lat + "," + C.lng + "&z=16&output=embed";

  /* ---------- Loader ---------- */
  var heroImg = $("#heroMedia img");
  var bar = $("#loaderBar");
  var t0 = performance.now();
  bar.style.width = "35%";
  function finishLoad() {
    bar.style.width = "100%";
    var wait = Math.max(0, 1100 - (performance.now() - t0));
    setTimeout(function () {
      $("#loader").classList.add("is-done");
      document.body.classList.remove("is-locked");
      document.documentElement.classList.add("is-ready");
      document.body.classList.add("is-ready");
    }, wait);
  }
  if (heroImg.complete) finishLoad();
  else { heroImg.addEventListener("load", finishLoad); heroImg.addEventListener("error", finishLoad); }
  setTimeout(finishLoad, 3500); // safety

  /* ---------- Smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  }
  function scrollToEl(el) {
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: reduce ? "auto" : "smooth" });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var el = $(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    scrollToEl(el);
  });

  /* ---------- Nav ---------- */
  var nav = $("#nav"), lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("is-hidden", y > 600 && y > lastY && !document.body.classList.contains("menu-open"));
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var sections = $$("main section[id]");
  var links = $$(".nav__links a");
  (function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (l) { l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  })();

  var burger = $("#burger"), menu = $("#mobileMenu");
  function closeMenu() {
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
  }
  burger.addEventListener("click", function () {
    var open = !document.body.classList.contains("menu-open");
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  /* ---------- Hero depth + glare ---------- */
  var heroMedia = $("#heroMedia"), heroContent = $("#heroContent"), glare = $("#heroGlare"), hero = $("#hero");
  var hm = { x: 0, y: 0, tx: 0, ty: 0 };
  if (fine && !reduce) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hm.tx = (e.clientX - r.left) / r.width - 0.5;
      hm.ty = (e.clientY - r.top) / r.height - 0.5;
      glare.style.setProperty("--mx", (e.clientX - r.left) + "px");
      glare.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    hero.addEventListener("pointerleave", function () { hm.tx = 0; hm.ty = 0; });
  }
  function heroLoop() {
    hm.x += (hm.tx - hm.x) * 0.06;
    hm.y += (hm.ty - hm.y) * 0.06;
    var sy = Math.min(window.scrollY, window.innerHeight);
    if (sy < window.innerHeight * 1.2) {
      heroMedia.style.transform = "translate3d(" + (-hm.x * 22) + "px," + (sy * 0.15 - hm.y * 14) + "px,0) rotateY(" + (hm.x * 2) + "deg) rotateX(" + (-hm.y * 1.5) + "deg)";
      heroContent.style.transform = "translate3d(" + (hm.x * 14) + "px," + (hm.y * 8) + "px,0)";
    }
    requestAnimationFrame(heroLoop);
  }
  if (!reduce) requestAnimationFrame(heroLoop);

  /* ---------- Marquee ---------- */
  var mq = ["Paint Protection Film", "Ceramic Coating", "Graphene Coating", "Paint Correction", "Detailing", "Safety Glazing Films", "Sunroof Protection", "Denting & Painting", "Custom Colour", "Insurance Claims"];
  var hexSvg = '<svg viewBox="0 0 24 24"><use href="#i-hex"/></svg>';
  var mqHtml = mq.map(function (m) { return '<span class="marquee__item">' + hexSvg + esc(m) + "</span>"; }).join("");
  $("#marquee").innerHTML = mqHtml + mqHtml;

  /* ---------- Split headings ---------- */
  $$(".split").forEach(function (h) {
    var html = h.innerHTML.trim();
    var tmp = document.createElement("div"); tmp.innerHTML = html;
    var out = [];
    tmp.childNodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (w) {
          if (!w) return;
          if (/^\s+$/.test(w)) out.push(" ");
          else out.push('<span class="split-word"><span>' + esc(w) + "</span></span>");
        });
      } else out.push('<span class="split-word"><span>' + n.outerHTML + "</span></span>");
    });
    h.innerHTML = out.join("");
    $$(".split-word > span", h).forEach(function (s, i) { s.style.transitionDelay = (i * 0.06) + "s"; });
  });

  /* ---------- Services ---------- */
  var grid = $("#svcGrid");
  grid.innerHTML = window.MOD_SERVICES.map(function (s, i) {
    var no = ("0" + (i + 1)).slice(-2);
    return '<article class="svc reveal' + (s.wide ? " svc--wide" : "") + '" data-id="' + s.id + '" style="transition-delay:' + (i % 4) * 0.08 + 's">' +
      '<div class="svc__img"><img src="' + s.img + '" alt="' + esc(s.name) + ' at Masters of Detailing" loading="lazy"></div>' +
      '<div class="svc__body">' +
      '<div class="svc__no"><span>' + no + "</span></div>" +
      "<h3>" + esc(s.name) + "</h3>" +
      "<p>" + esc(s.short) + "</p>" +
      '<div class="svc__actions">' +
      '<button class="svc__more link-arrow" data-more="' + s.id + '">Learn more <svg><use href="#i-arrow-right"/></svg></button>' +
      '<button class="btn btn--ghost btn--sm" data-book="' + s.id + '">Book this</button>' +
      '<a class="svc__wa" href="' + waLink("Hi Masters of Detailing, I'd like to know more about " + s.name + ".") + '" target="_blank" rel="noopener" aria-label="Ask about ' + esc(s.name) + ' on WhatsApp"><svg><use href="#i-wa"/></svg></a>' +
      "</div></div></article>";
  }).join("");
  var extra = $("#svcExtra");
  window.MOD_EXTRA_SERVICES.forEach(function (t) { var s = document.createElement("span"); s.className = "tag"; s.textContent = t; extra.appendChild(s); });
  $("#footerServices").innerHTML = window.MOD_SERVICES.slice(0, 6).map(function (s) { return '<li><a href="#services">' + esc(s.name) + "</a></li>"; }).join("");

  // 3D tilt + spotlight
  if (fine && !reduce) {
    $$(".svc").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transform = "perspective(900px) rotateX(" + ((0.5 - py) * 8) + "deg) rotateY(" + ((px - 0.5) * 10) + "deg) translateY(-4px)";
        card.style.setProperty("--gx", px * 100 + "%");
        card.style.setProperty("--gy", py * 100 + "%");
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });
  }

  // Modal
  var modal = $("#svcModal"), lastFocus = null, currentSvc = null;
  function openModal(id) {
    var s = window.MOD_SERVICES.find(function (x) { return x.id === id; });
    if (!s) return;
    currentSvc = s; lastFocus = document.activeElement;
    var idx = window.MOD_SERVICES.indexOf(s) + 1;
    $("#mImg").src = s.img; $("#mImg").alt = s.name;
    $("#mNo").textContent = "Service " + ("0" + idx).slice(-2);
    $("#mTitle").textContent = s.name;
    $("#mDesc").textContent = s.long;
    $("#mPoints").innerHTML = s.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
    $("#mSrc").textContent = "Source: " + s.src;
    $("#mWa").href = waLink("Hi Masters of Detailing, I'd like to know more about " + s.name + ".");
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    setTimeout(function () { $(".icon-btn", modal).focus(); }, 50);
  }
  function closeModal() {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus();
  }
  $$("[data-close]", modal).forEach(function (b) { b.addEventListener("click", closeModal); });
  $("#mBook").addEventListener("click", function () { var id = currentSvc && currentSvc.id; closeModal(); bookService(id); });

  grid.addEventListener("click", function (e) {
    var more = e.target.closest("[data-more]"), book = e.target.closest("[data-book]");
    if (more) openModal(more.getAttribute("data-more"));
    else if (book) bookService(book.getAttribute("data-book"));
    else if (!e.target.closest("a") && e.target.closest(".svc")) openModal(e.target.closest(".svc").getAttribute("data-id"));
  });

  function bookService(id) {
    var sel = $("#f-service");
    var s = window.MOD_SERVICES.find(function (x) { return x.id === id; });
    if (s) { sel.value = s.name; sel.closest(".field").classList.remove("has-error"); }
    scrollToEl($("#booking"));
    setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, 900);
    if (s) toast(s.name + " selected — just add your details.");
  }

  /* ---------- Reels ---------- */
  var R = window.MOD_REELS || [];
  var reelTrack = $("#reelTrack");
  var igSvg = '<svg viewBox="0 0 24 24"><use href="#i-ig"/></svg>';
  reelTrack.innerHTML = R.map(function (r) {
    return '<button class="reel" data-reel="' + r.id.replace("reel-", "") + '" aria-label="Play reel: ' + esc(r.title) + '">' +
      '<video muted loop playsinline preload="none" poster="assets/video/' + r.id + '.jpg" data-src="assets/video/' + r.id + '-loop.mp4"></video>' +
      '<span class="reel__top">' + igSvg + "<span>" + esc(r.date) + "</span></span>" +
      '<span class="reel__play" aria-hidden="true">▶</span>' +
      '<span class="reel__body"><span class="tag" style="justify-self:start;padding:4px 10px;font-size:11px">' + esc(r.tag) + "</span><b>" + esc(r.title) + "</b></span></button>";
  }).join("");
  // Play silent previews only while visible
  var vidIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        if (!reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      } else v.pause();
    });
  }, { threshold: 0.35 });
  $$(".reel video, .hero-reel video").forEach(function (v) { if (v.closest(".hero-reel")) { v.pause(); } vidIo.observe(v); });
  function scrollReels(dir) { reelTrack.scrollBy({ left: dir * (reelTrack.querySelector(".reel").offsetWidth + 14) * 2, behavior: reduce ? "auto" : "smooth" }); }
  $("#reelPrev").addEventListener("click", function () { scrollReels(-1); });
  $("#reelNext").addEventListener("click", function () { scrollReels(1); });

  var rb = $("#reelbox"), rbVideo = $("#rbVideo"), rbLast = null, rbCur = null;
  function openReel(key) {
    var r = R.find(function (x) { return x.id === "reel-" + key; }); if (!r) return;
    rbCur = r; rbLast = document.activeElement;
    rbVideo.poster = "assets/video/" + r.id + ".jpg";
    rbVideo.src = "assets/video/" + r.id + ".mp4";
    $("#rbDate").textContent = "Instagram · " + r.date;
    $("#rbTitle").textContent = r.title;
    $("#rbCap").textContent = r.cap;
    $("#rbTag").textContent = r.tag;
    $("#rbIg").href = "https://www.instagram.com/reel/" + r.code + "/";
    $("#rbBook").style.display = r.service ? "" : "none";
    rb.classList.add("is-open"); rb.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    var p = rbVideo.play(); if (p && p.catch) p.catch(function () {});
    setTimeout(function () { $(".icon-btn", rb).focus(); }, 50);
  }
  function closeReel() {
    rbVideo.pause(); rbVideo.removeAttribute("src"); rbVideo.load();
    rb.classList.remove("is-open"); rb.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
    if (rbLast) rbLast.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-reel]"); if (t) { e.preventDefault(); openReel(t.getAttribute("data-reel")); }
  });
  $$("[data-rb-close]", rb).forEach(function (b) { b.addEventListener("click", closeReel); });
  $("#rbBook").addEventListener("click", function () { var s = rbCur && rbCur.service; closeReel(); bookService(s); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && rb.classList.contains("is-open")) closeReel(); });

  /* ---------- Testimonials ---------- */
  var track = $("#testiTrack");
  track.innerHTML = window.MOD_TESTIMONIALS.map(function (t) {
    var initials = t.name.split(" ").map(function (p) { return p[0]; }).slice(0, 2).join("").toUpperCase();
    var av = t.photo ? '<img class="avatar" src="' + t.photo + '" alt="">' : '<span class="avatar" aria-hidden="true">' + esc(initials) + "</span>";
    return '<article class="tcard">' +
      '<div class="tcard__q" aria-hidden="true">“</div>' +
      "<blockquote>" + esc(t.text) + "</blockquote>" +
      (t.tags && t.tags.length ? '<div class="tcard__tags">' + t.tags.map(function (g) { return "<span>" + esc(g) + "</span>"; }).join("") + "</div>" : "") +
      "<footer>" + av + "<div><b>" + esc(t.name) + "</b><small>" + (t.vehicle ? esc(t.vehicle) + " · " : "") + (t.sample ? "Sample testimonial" : "Justdial · " + esc(t.date)) + "</small></div>" +
      '<span class="stars" aria-label="5 stars">★★★★★</span></footer></article>';
  }).join("");
  var tIdx = 0, tCards = $$(".tcard", track);
  function maxIdx() {
    var vw = track.parentElement.clientWidth, total = track.scrollWidth;
    var cw = tCards[0].getBoundingClientRect().width + 20;
    return Math.max(0, Math.ceil((total - vw) / cw));
  }
  function goT(i) {
    var m = maxIdx(); tIdx = Math.max(0, Math.min(i, m));
    var cw = tCards[0].getBoundingClientRect().width + 20;
    var off = Math.min(tIdx * cw, Math.max(0, track.scrollWidth - track.parentElement.clientWidth));
    track.style.transform = "translate3d(" + (-off) + "px,0,0)";
    $("#testiBar").style.width = (m ? ((tIdx / m) * 80 + 20) : 100) + "%";
  }
  $("#testiPrev").addEventListener("click", function () { goT(tIdx - 1); });
  $("#testiNext").addEventListener("click", function () { goT(tIdx >= maxIdx() ? 0 : tIdx + 1); });
  window.addEventListener("resize", function () { goT(tIdx); });
  goT(0);
  // drag / swipe
  (function () {
    var sx = 0, dx = 0, down = false, base = 0;
    track.addEventListener("pointerdown", function (e) {
      down = true; sx = e.clientX; dx = 0;
      var m = /translate3d\((-?[\d.]+)px/.exec(track.style.transform); base = m ? parseFloat(m[1]) : 0;
      track.classList.add("dragging"); track.setPointerCapture(e.pointerId);
    });
    track.addEventListener("pointermove", function (e) { if (!down) return; dx = e.clientX - sx; track.style.transform = "translate3d(" + (base + dx) + "px,0,0)"; });
    function up() { if (!down) return; down = false; track.classList.remove("dragging"); if (dx < -50) goT(tIdx + 1); else if (dx > 50) goT(tIdx - 1); else goT(tIdx); }
    track.addEventListener("pointerup", up); track.addEventListener("pointercancel", up);
  })();
  var autoT = setInterval(function () { if (document.hidden) return; goT(tIdx >= maxIdx() ? 0 : tIdx + 1); }, 6000);
  track.addEventListener("pointerenter", function () { clearInterval(autoT); });

  /* ---------- Gallery ---------- */
  var G = window.MOD_GALLERY;
  var cats = ["All"].concat(G.map(function (g) { return g.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  $("#filters").innerHTML = cats.map(function (c, i) {
    var n = c === "All" ? G.length : G.filter(function (g) { return g.cat === c; }).length;
    return '<button class="filter' + (i ? "" : " is-active") + '" role="tab" aria-selected="' + (i ? "false" : "true") + '" data-cat="' + c + '">' + c + "<sup>" + n + "</sup></button>";
  }).join("");
  $("#masonry").innerHTML = G.map(function (g, i) {
    return '<button class="g-item reveal" data-i="' + i + '" data-cat="' + g.cat + '" aria-label="Open image: ' + esc(g.cap) + '">' +
      '<figure style="margin:0"><img src="assets/img/' + g.src + '" alt="' + esc(g.cap) + '" loading="lazy" decoding="async">' +
      "<figcaption><span>" + esc(g.cap) + "</span><small>" + g.cat + "</small></figcaption></figure></button>";
  }).join("");
  var masonry = $("#masonry"), moreWrap = $("#galleryMore");
  var visibleG = G.map(function (_, i) { return i; }).slice(0, 16);
  $("#galleryMoreBtn").textContent = "Show all " + G.length + " photos";
  $("#galleryMoreBtn").addEventListener("click", function () {
    masonry.classList.remove("is-collapsed"); moreWrap.hidden = true;
    visibleG = G.map(function (_, i) { return i; });
    $$(".g-item", masonry).forEach(function (it) { it.classList.add("in"); });
    if (lenis) lenis.resize();
  });
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    var c = b.getAttribute("data-cat");
    masonry.classList.remove("is-collapsed"); moreWrap.hidden = true;
    $$(".filter").forEach(function (f) { var on = f === b; f.classList.toggle("is-active", on); f.setAttribute("aria-selected", String(on)); });
    visibleG = [];
    $$(".g-item").forEach(function (it) {
      var show = c === "All" || it.getAttribute("data-cat") === c;
      it.classList.toggle("is-hidden", !show);
      if (show) { visibleG.push(+it.getAttribute("data-i")); it.classList.add("in"); }
    });
    if (lenis) lenis.resize();
  });

  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbPos = 0, lbLast = null;
  function showLb(pos) {
    lbPos = (pos + visibleG.length) % visibleG.length;
    var g = G[visibleG[lbPos]];
    lbImg.classList.add("swap");
    setTimeout(function () {
      lbImg.src = "assets/img/" + g.src; lbImg.alt = g.cap;
      lbImg.onload = function () { lbImg.classList.remove("swap"); };
    }, 150);
    $("#lbCap").textContent = g.cap + " · " + g.cat;
    $("#lbCount").textContent = (lbPos + 1) + " / " + visibleG.length;
  }
  function openLb(i) {
    lbLast = document.activeElement;
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    if (lenis) lenis.stop();
    showLb(visibleG.indexOf(i));
    $("#lbClose").focus();
  }
  function closeLb() { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); if (lenis) lenis.start(); if (lbLast) lbLast.focus(); }
  $("#masonry").addEventListener("click", function (e) { var it = e.target.closest(".g-item"); if (it) openLb(+it.getAttribute("data-i")); });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", function () { showLb(lbPos - 1); });
  $("#lbNext").addEventListener("click", function () { showLb(lbPos + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__stage")) closeLb(); });
  (function () {
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (sx == null) return; var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) showLb(lbPos + (d < 0 ? 1 : -1)); sx = null; });
  })();

  document.addEventListener("keydown", function (e) {
    if (lb.classList.contains("is-open")) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") showLb(lbPos + 1);
      if (e.key === "ArrowLeft") showLb(lbPos - 1);
    } else if (modal.classList.contains("is-open") && e.key === "Escape") closeModal();
    else if (document.body.classList.contains("menu-open") && e.key === "Escape") closeMenu();
  });

  /* ---------- Google reviews ---------- */
  $("#gQuotes").innerHTML = window.MOD_GOOGLE_HIGHLIGHTS.map(function (q) { return "<span>" + esc(q) + "</span>"; }).join("");
  $("#gList").innerHTML = window.MOD_GOOGLE_REVIEWS.map(function (r) {
    var long = r.text.length > 260;
    return '<article class="rcard reveal">' +
      '<header><span class="avatar" aria-hidden="true">' + esc(r.name.charAt(0).toUpperCase()) + "</span><div><b>" + esc(r.name) + "</b><small>" + esc(r.meta) + "</small></div>" +
      '<svg class="g" aria-label="Google review"><use href="#i-g"/></svg></header>' +
      '<div><span class="stars" aria-label="' + r.stars + ' stars">' + "★★★★★".slice(0, r.stars) + '</span> <small class="muted">' + esc(r.when) + "</small></div>" +
      '<p class="' + (long ? "clamp" : "") + '">' + esc(r.text) + "</p>" +
      (long ? '<button class="rcard__more">Read more</button>' : "") +
      "</article>";
  }).join("");
  $("#gList").addEventListener("click", function (e) {
    var b = e.target.closest(".rcard__more"); if (!b) return;
    var p = b.previousElementSibling; var open = p.classList.toggle("clamp");
    b.textContent = open ? "Read more" : "Show less";
    if (lenis) lenis.resize();
  });

  /* ---------- Booking ---------- */
  var form = $("#bookingForm"), sel = $("#f-service");
  window.MOD_SERVICES.concat(window.MOD_EXTRA_SERVICES.map(function (n) { return { name: n }; })).forEach(function (s) {
    var o = document.createElement("option"); o.value = s.name; o.textContent = s.name; sel.appendChild(o);
  });
  var other = document.createElement("option"); other.value = "Not sure — need advice"; other.textContent = "Not sure — need advice"; sel.appendChild(other);
  $("#slots").innerHTML = C.slots.map(function (s, i) {
    return '<label class="slot"><input type="radio" name="slot" value="' + esc(s.v) + '"><span>' + esc(s.l) + "<small>" + esc(s.s) + "</small></span></label>";
  }).join("");
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var todayStr = today.toISOString().slice(0, 10);
  $("#f-date").min = todayStr;

  function setErr(input, bad) { input.closest(".field").classList.toggle("has-error", bad); return !bad; }
  $$("input, select", form).forEach(function (i) { i.addEventListener("input", function () { i.closest(".field").classList.remove("has-error"); }); i.addEventListener("change", function () { i.closest(".field").classList.remove("has-error"); }); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var phone = f.phone.value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    var ok = true;
    ok = setErr(f.name, f.name.value.trim().length < 2) && ok;
    ok = setErr(f.phone, !/^[6-9]\d{9}$/.test(phone)) && ok;
    ok = setErr(f.car, f.car.value.trim().length < 2) && ok;
    ok = setErr(f.service, !f.service.value) && ok;
    ok = setErr(f.date, !f.date.value || f.date.value < todayStr) && ok;
    var slot = form.querySelector('input[name="slot"]:checked');
    $("#slotField").classList.toggle("has-error", !slot); ok = !!slot && ok;
    if (!ok) {
      var first = form.querySelector(".has-error input, .has-error select");
      if (first) first.focus();
      toast("Please complete the highlighted fields.");
      return;
    }
    var d = new Date(f.date.value + "T00:00:00");
    var dateTxt = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    var lines = [
      "*New Booking Enquiry — Masters of Detailing*",
      "",
      "*Name:* " + f.name.value.trim(),
      "*Mobile:* +91 " + phone,
      "*Vehicle:* " + f.car.value.trim() + (f.reg.value.trim() ? " (" + f.reg.value.trim().toUpperCase() + ")" : ""),
      "*Service:* " + f.service.value,
      "*Preferred date:* " + dateTxt,
      "*Preferred time:* " + slot.value
    ];
    if (f.msg.value.trim()) lines.push("*Message:* " + f.msg.value.trim());
    lines.push("", "Sent from the website.");
    var url = waLink(lines.join("\n"));
    var w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
    var okBox = $("#formOk");
    okBox.innerHTML = "WhatsApp opened with your booking details. Didn't open? <a href=\"" + url + "\" target=\"_blank\" rel=\"noopener\" style=\"text-decoration:underline\">Tap here</a>.";
    okBox.classList.add("show");
  });

  /* ---------- Reveal / parallax / counters ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  $$(".reveal, .split").forEach(function (el) { io.observe(el); });
  // A fully clipped element never reports as intersecting, so watch its parent instead.
  var clipIo = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      $$(".reveal-clip", en.target).forEach(function (c, i) { c.style.transitionDelay = (i * 0.15) + "s"; c.classList.add("in"); });
      clipIo.unobserve(en.target);
    });
  }, { threshold: 0.05 });
  $$(".reveal-clip").map(function (c) { return c.parentElement; })
    .filter(function (p, i, a) { return a.indexOf(p) === i; })
    .forEach(function (p) { clipIo.observe(p); });

  var px = $$("[data-parallax]");
  if (!reduce && px.length) {
    (function loop() {
      var vh = window.innerHeight;
      px.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = "translate3d(0," + (p * -100 * parseFloat(img.getAttribute("data-parallax"))) + "%,0) scale(1.12)";
      });
      requestAnimationFrame(loop);
    })();
  }

  var counted = false;
  new IntersectionObserver(function (en, obs) {
    if (!en[0].isIntersecting || counted) return;
    counted = true; obs.disconnect();
    $$("[data-count]").forEach(function (el) {
      var target = Number(C[el.getAttribute("data-count")]), dec = +el.getAttribute("data-dec") || 0;
      if (reduce || isNaN(target)) { el.textContent = target.toFixed(dec); return; }
      var s = performance.now(), dur = 1600;
      (function step(n) {
        var t = Math.min(1, (n - s) / dur), e = 1 - Math.pow(1 - t, 4);
        el.textContent = (target * e).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
      })(s);
    });
  }, { threshold: 0.4 }).observe($("#stats"));

  /* ---------- Toast ---------- */
  var toastT;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove("show"); }, 2800);
  }
})();
