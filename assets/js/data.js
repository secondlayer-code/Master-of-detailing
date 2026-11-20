/* ==========================================================================
   EDIT ME — every business fact and piece of content on the site lives here.
   Sources checked 21 Nov 2026:
     - Google Business Profile ("Masters Of Detailing", Karahiya, Rewa)
     - Justdial listing (9999P7662-7662-260630121118-D1U1_BZDET)
     - Instagram @mastersofdetailing_rewa (public profile)
     - Studio signage (hero photo)
   ========================================================================== */
window.MOD_CONFIG = {
  // ⚠ WhatsApp: this is the phone number listed on the Google Business Profile.
  // Confirm with the owner that it is the WhatsApp Business number before going live.
  // Format: country code + number, digits only (no +, spaces or dashes).
  whatsappNumber: "919109786833",

  phoneDisplay: "+91 91097 86833",          // Google Business Profile
  phoneHref: "tel:+919109786833",

  googleRating: 5.0,                         // Google Business Profile
  googleReviews: 9,                          // Google Business Profile
  googleReviewsUrl: "https://maps.google.com/?cid=8452327374384565099",

  justdialRating: 5.0,                       // Justdial
  justdialRatings: 12,                       // Justdial
  justdialUrl: "https://www.justdial.com/Rewa/Masters-Of-Detailing-Near-Karahiya-Bridge-Karariya/9999P7662-7662-260630121118-D1U1_BZDET",
  justdialReviewsUrl: "https://www.justdial.com/Rewa/Masters-Of-Detailing-Near-Karahiya-Bridge-Karariya/9999P7662-7662-260630121118-D1U1_BZDET/reviews",

  instagramUrl: "https://www.instagram.com/mastersofdetailing_rewa/",
  instagramFollowers: 536,                   // Instagram public profile

  established: "2026",                       // Justdial "Year of Establishment"
  address: "Masters Of Detailing, Near Karahiya Bridge, Shanti Path Turn, Karariya, Rewa – 486448, Madhya Pradesh",
  hours: "Opens daily at 10:00 AM",          // Google + Justdial show opening time only; add closing time once confirmed
  lat: 24.5594208,
  lng: 81.2836009,
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=24.5594208,81.2836009",

  // Booking time slots (preferences only — the studio confirms on WhatsApp)
  slots: [
    { v: "10:00 AM – 12:00 PM", l: "10 – 12", s: "Morning" },
    { v: "12:00 PM – 2:00 PM", l: "12 – 2", s: "Midday" },
    { v: "2:00 PM – 4:00 PM", l: "2 – 4", s: "Afternoon" },
    { v: "4:00 PM onwards", l: "4 PM +", s: "Evening" }
  ]
};

/* Services — only those confirmed by signage, Instagram or Justdial.
   `src` is shown in the detail view so the owner can see where each came from. */
window.MOD_SERVICES = [
  {
    id: "ppf", name: "Paint Protection Film (PPF)", img: "assets/img/ig-07.jpg", wide: true,
    short: "A clear, self-healing film over your paint to guard against stone chips, scratches and road grime — for cars and bikes.",
    long: "Paint Protection Film is a transparent urethane layer applied to painted panels. It takes the hits that would otherwise chip or scratch the paint, and keeps the factory finish underneath intact.",
    points: ["Full-body or high-impact panels (bonnet, bumper, mirrors, doors)", "Available for cars and motorcycles", "Can be combined with a ceramic or graphene top coat"],
    src: "Signage · Instagram (PPF Vehicles, PPF On Bikes)"
  },
  {
    id: "ceramic", name: "Ceramic Coating", img: "assets/img/ig-05.jpg",
    short: "A hard, hydrophobic layer that deepens gloss and makes washing easier.",
    long: "Ceramic coating bonds to the clear coat and forms a slick, glossy protective layer. Water beads and sheets away, dirt struggles to stick, and the paint keeps a just-detailed look between washes.",
    points: ["Applied after decontamination and paint prep", "High gloss and water-repellent finish", "Easier, faster maintenance washes"],
    src: "Signage · Instagram bio"
  },
  {
    id: "graphene", name: "Graphene Coating", img: "assets/img/ig-10.jpg",
    short: "Next-generation graphene-infused coating for gloss, slickness and protection.",
    long: "Graphene coatings build on ceramic chemistry with graphene for a slick, glossy and protective finish. The studio's Instagram features DetailMax graphene products.",
    points: ["Slick, glossy finish", "Hydrophobic protection", "Ask the team which coating suits your car and usage"],
    src: "Signage · Instagram bio"
  },
  {
    id: "correction", name: "Paint Correction", img: "assets/img/ig-04.jpg",
    short: "Machine polishing to remove swirl marks, haze and light scratches.",
    long: "Paint correction levels the clear coat with machine polishing to remove swirls, holograms and light scratches — restoring clarity before any protection is applied.",
    points: ["Inspection under the hex-lit bay", "Swirl and light-scratch removal", "Recommended before ceramic, graphene or PPF"],
    src: "Instagram highlight · Justdial (paint restoration, high-gloss polishing)"
  },
  {
    id: "detailing", name: "Interior & Exterior Detailing", img: "assets/img/ig-06.jpg", wide: true,
    short: "A thorough clean inside and out — paint, wheels, cabin, upholstery.",
    long: "A complete detail covering exterior wash and decontamination, wheels and tyres, and a deep interior clean including upholstery. Popular as a standalone refresh or before a coating.",
    points: ["Foam wash and exterior decontamination", "Interior vacuum, upholstery and surface cleaning", "Wax / polish finishing options"],
    src: "Instagram bio · Justdial (car wash & spa, upholstery cleaning, wax polishing)"
  },
  {
    id: "glazing", name: "Safety Glazing & Sunroof Films", img: "assets/img/ig-03.jpg",
    short: "Protective films for glass and sunroofs.",
    long: "Safety glazing films and sunroof protection films add a protective layer to automotive glass. Speak to the team about film options for your vehicle.",
    points: ["Safety glazing films", "Sunroof protection films", "Fitted in the studio's enclosed bay"],
    src: "Signage"
  },
  {
    id: "bodyshop", name: "Body Shop: Denting & Painting", img: "assets/img/jd-27.jpg", wide: true,
    short: "Denting, painting and accidental repairs, with an enclosed paint booth on site.",
    long: "Body shop services including denting, painting and accidental repair work, carried out with an enclosed spray paint booth at the studio. Insurance claim support is also offered.",
    points: ["Car denting and painting", "Accidental repairs", "Insurance claims support"],
    src: "Signage · Justdial (denting & painting)"
  },
  {
    id: "paint", name: "Custom Colour Paint Jobs", img: "assets/img/jd-22.jpg", wide: true,
    short: "Custom colour paint work done in-house.",
    long: "Custom colour paint jobs carried out at the studio. Share your idea on WhatsApp and the team will advise on what's possible for your car.",
    points: ["Custom colour work", "In-house paint booth", "Discuss your idea on WhatsApp"],
    src: "Signage"
  }
];

window.MOD_EXTRA_SERVICES = ["Insurance claims", "Accidental repairs", "Car wrapping", "Wax polishing", "Car wash & spa", "Pickup & drop facility"];

/* Reels — downloaded from the studio's public Instagram (@mastersofdetailing_rewa), captions from the posts.
   Files: assets/video/<id>.mp4 (full, with sound), <id>-loop.mp4 (6s silent preview), <id>.jpg (poster).
   service: id from MOD_SERVICES used by "Book this service". */
window.MOD_REELS = [
  { id: "reel-virtus", code: "DftwXWYM0L0", date: "14 Nov 2026", title: "VW Virtus — Gloss to Satin PPF", tag: "Satin PPF", service: "ppf",
    cap: "From glossy elegance to satin sophistication. The Volkswagen Virtus gets a premium Satin PPF finish — a completely new look and road presence." },
  { id: "reel-bmw", code: "DfjX0BcstvT", date: "9 Nov 2026", title: "BMW — Complete Paint Correction", tag: "Paint correction", service: "correction",
    cap: "From dull and tired to refreshed and flawless. This BMW received a complete paint correction, restoring its original shine, depth and gloss." },
  { id: "reel-harrier", code: "DfZKmpXsab8", date: "6 Nov 2026", title: "Tata Harrier — Black PPF", tag: "Black PPF", service: "ppf",
    cap: "From dents and scratches to a flawless black finish. The Tata Harrier transformed with Black PPF." },
  { id: "reel-thar", code: "DemD2nnMDoV", date: "17 Oct 2026", title: "Thar Roxx — 7-Year Paintguard PPF", tag: "PPF", service: "ppf",
    cap: "The beast deserves the best. Mahindra Thar ROXX protected with 7-year Paintguard PPF — helps protect against scratches and road debris while preserving the original gloss." },
  { id: "reel-lexus", code: "DeeRP_FMGVm", date: "14 Oct 2026", title: "Lexus NX 350h — 5-Year PPF", tag: "PPF", service: "ppf",
    cap: "Luxury deserves the ultimate protection. Lexus NX 350h protected with 5-year Paintguard PPF, installed at the studio." },
  { id: "reel-baleno", code: "Dc2wEYqou6h", date: "3 Sep 2026", title: "Baleno — Graphene Coating + Interior", tag: "Graphene coating", service: "graphene",
    cap: "7-year graphene coating for long-lasting gloss and hydrophobic protection — paired with a thorough interior deep clean." },
  { id: "reel-5yr", code: "DcEPMxuowE-", date: "15 Aug 2026", title: "5 Years Old, Looking Brand New", tag: "Full restoration", service: "correction",
    cap: "Paint correction to remove years of scratches and swirl marks, a full deep interior clean and complete body cladding restoration." },
  { id: "reel-thanks", code: "Damkvg3owbH", date: "9 Jul 2026", title: "Rain Didn't Stop Our Customers", tag: "Thank you", service: "",
    cap: "Weather may change, but the trust in Masters of Detailing stays the same. Thank you to all our loyal customers." }
];

/* Testimonials — verified reviews from the Justdial listing (shortened only for length). */
window.MOD_TESTIMONIALS = [
  { name: "Gurman Singh", date: "Jul 2026", text: "Great service and excellent detailing. The staff was professional, and my car looks amazing. Highly recommended!", tags: ["Trustworthy", "Free pickup & drop"] },
  { name: "Mangesh Jayanand Gawade", date: "Jul 2026", text: "Their team is professional and attentive, ensuring that every detail is taken care of. Highly recommend them for all your vehicle needs!", tags: ["Hassle-free", "Centrally located"] },
  { name: "Anurag Singh", date: "Jul 2026", text: "Best Detailing Services in the city… and their prices are reasonable too… must try", tags: ["Reasonably priced"] },
  { name: "Kapil Pratap", date: "Jul 2026", text: "One of the Best Car Wash Experience in the Hood… Professional staff and Behaviour was Good too.", tags: ["Short wait time"] }
  // To add a sample/demo testimonial, add { name, date, text, tags, vehicle, photo, sample: true } — samples are labelled on the card.
];

/* Google reviews — as published on the Google Business Profile (limited public view, Nov 2026). */
window.MOD_GOOGLE_REVIEWS = [
  { name: "prateek mishra", meta: "1 review", when: "3 months ago", stars: 5, text: "I got PPF done on one of the doors of my car by Master of Detailing. Honestly, I wasn't sure if they would be able to restore the door to its original condition. But when I left my car with them and came back to pick it up, I was genuinely surprised. I couldn't believe how perfectly they had done the job. The door looked 100% just like it was before. I wouldn't just say they did a good job — they did an exceptionally good job. The quality of the work was truly impressive. If anyone is looking to get PPF or similar detailing work done, I would highly recommend giving Master of Detailing a try. Go once, experience their work, and judge for yourself. Highly recommended!" },
  { name: "Harsh Singh", meta: "Local reviewer · 7 reviews", when: "3 months ago", stars: 5, text: "I opted for a exterior and interior detailing package it turns out to be incredible the swirl marks and minimal scratches are completely gone and the interior also looks like new." },
  { name: "Anurag mishra", meta: "2 reviews", when: "5 months ago", stars: 5, text: "Brought my car in for a full detail and I am blown away. They completely transformed the vehicle inside and out—it feels and smells brand new. The team was professional, thorough, and highly skilled. It is worth every single dollar to see the car looking this pristine. Highly recommend!" }
];
window.MOD_GOOGLE_HIGHLIGHTS = [
  "“I really liked the service, and the behavior was excellent too.”",
  "“The quality of the work was truly impressive.”",
  "“One of the best car wash experience in the city”"
];

/* Gallery — every image is from the studio's Instagram (ig-*) or Justdial listing (jd-*). */
window.MOD_GALLERY = [
  { src: "ig-01.jpg", cat: "Finished", cap: "SUV under the hex lights" },
  { src: "jd-02.jpg", cat: "Studio", cap: "Matte black saloon in the bay" },
  { src: "ig-02.jpg", cat: "Finished", cap: "Black off-roader, detailed" },
  { src: "jd-01.jpg", cat: "Storefront", cap: "Studio frontage" },
  { src: "ig-03.jpg", cat: "Finished", cap: "Head-on in the inspection bay" },
  { src: "jd-19.jpg", cat: "Studio", cap: "Hex-lit detailing bay" },
  { src: "ig-05.jpg", cat: "Finished", cap: "Deep blue saloon, gloss check" },
  { src: "jd-27.jpg", cat: "Workshop", cap: "Enclosed spray paint booth" },
  { src: "ig-04.jpg", cat: "Finished", cap: "Matte grey sedan" },
  { src: "jd-04.jpg", cat: "Storefront", cap: "Black SUV outside the studio" },
  { src: "ig-07.jpg", cat: "Finished", cap: "White crossover, finished" },
  { src: "jd-07.jpg", cat: "Studio", cap: "Front desk and product display" },
  { src: "ig-06.jpg", cat: "Finished", cap: "Black SUV reflections" },
  { src: "jd-17.jpg", cat: "Studio", cap: "Motorcycle bay" },
  { src: "ig-08.jpg", cat: "Finished", cap: "White SUV, front detail" },
  { src: "jd-05.jpg", cat: "Storefront", cap: "Compact SUV at the entrance" },
  { src: "ig-09.jpg", cat: "Finished", cap: "White EV, finished" },
  { src: "jd-11.jpg", cat: "Studio", cap: "Bay with hexagonal ceiling" },
  { src: "ig-11.jpg", cat: "Finished", cap: "Handover day" },
  { src: "jd-22.jpg", cat: "Workshop", cap: "Paint booth exterior" },
  { src: "ig-10.jpg", cat: "Studio", cap: "Graphene coating products" },
  { src: "jd-20.jpg", cat: "Studio", cap: "Hex light wall" },
  { src: "jd-09.jpg", cat: "Workshop", cap: "Wash bay" },
  { src: "jd-03.jpg", cat: "Studio", cap: "Protection film products" },
  { src: "jd-13.jpg", cat: "Storefront", cap: "Signage: Protect & Restore" },
  { src: "jd-14.jpg", cat: "Workshop", cap: "Lift and workshop floor" },
  { src: "jd-10.jpg", cat: "Workshop", cap: "Workshop interior" },
  { src: "jd-23.jpg", cat: "Studio", cap: "Bay wall graphics" },
  { src: "jd-24.jpg", cat: "Storefront", cap: "Studio exterior" },
  { src: "jd-15.jpg", cat: "Workshop", cap: "Workshop lighting" },
  { src: "jd-21.jpg", cat: "Workshop", cap: "Workshop and mezzanine" },
  { src: "jd-08.jpg", cat: "Finished", cap: "Rainy-day shine" },
  { src: "jd-25.jpg", cat: "Storefront", cap: "Frontage, daytime" },
  { src: "jd-06.jpg", cat: "Storefront", cap: "At the studio" },
  { src: "jd-28.jpg", cat: "Location", cap: "Approach to the studio" },
  { src: "jd-18.jpg", cat: "Location", cap: "Next to the Shanti Path signboard" },
  { src: "jd-12.jpg", cat: "Location", cap: "Landmark gateway" },
  { src: "jd-16.jpg", cat: "Location", cap: "Shanti Path gateway" },
  { src: "jd-26.jpg", cat: "Location", cap: "Road towards the studio" }
];
