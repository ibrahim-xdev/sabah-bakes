/* ==========================================================================
   SABAH BAKES — SITE CONTENT
   --------------------------------------------------------------------------
   This is the only file you should need to edit to change what the
   website SAYS. Swap text, prices, hours, reviews, etc. here.

   To add your own PHOTOS: drop image files into the /images folder using
   the exact file names referenced below (e.g. images/hero-cake.jpg).
   Until a real file exists at that path, the site will automatically show
   a neat placeholder in its place — so you can safely publish this site
   now and drop images in later, one at a time, without touching any code.
   ========================================================================== */

window.SITE_DATA = {
  business: {
    name: "Sabah Bakes",
    tagline: "Custom cakes, baked with love in DHA Islamabad",
    category: "Home Bakery",
    rating: 5.0,
    reviewCount: 34,
    priceRange: "Rs 3,000 – 8,000",
    priceNote: "Per person · reported by 6 people",
    phone: "+92 333 5118289",
    phoneHref: "+923335118289",
    whatsappHref: "923335118289",
    address: "H No. 92, Sector B, DHA Phase II, Islamabad, 44000, Pakistan",
    plusCode: "G4MR+45 Islamabad, Pakistan",
    mapsQuery:
      "Sabah Bakes, H No. 92, Sector B, DHA Phase II, Islamabad, Pakistan",
    services: ["Takeout", "Delivery"],
    about:
      "Sabah Bakes is a home bakery tucked into Sector B, DHA Phase II, turning out custom cakes for birthdays, weddings and everything worth celebrating. Every order is made from scratch — fresh buttercream, real ganache, and designs built around what you actually want, from a jiggly Japanese cheesecake to a full basketball-themed birthday centrepiece. Order ahead and collect, or have it delivered to your door.",
    ownerNote:
      "Every cake that leaves this kitchen is one I'd be happy to serve at my own table. Thank you for trusting me with your celebrations.",
    ownerNoteSign: "— Sabah",
  },

  hours: [
    { day: "Monday", time: "9 AM – 9 PM" },
    {
      day: "Tuesday",
      time: "9 AM – 9 PM",
      note: "Mawlid — hours might differ",
    },
    {
      day: "Wednesday",
      time: "9 AM – 9 PM",
      note: "Mawlid — hours might differ",
    },
    { day: "Thursday", time: "9 AM – 9 PM" },
    { day: "Friday", time: "9 AM – 9 PM" },
    { day: "Saturday", time: "9 AM – 9 PM" },
    { day: "Sunday", time: "9 AM – 9 PM" },
  ],

  popularTimes: {
    day: "Friday",
    labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    // relative busyness, 0–100 — tweak freely
    values: [5, 35, 60, 45, 90, 70],
  },

  menu: [
    {
      name: "Japanese Jiggly Cheesecake",
      description:
        "Featherlight, wobbly-soft cheesecake with a delicate golden top — a bakery favourite.",
      price: "From Rs 2,800",
      image: "images/menu-jiggly-cheesecake.png",
      tag: "Bestseller",
    },
    {
      name: "Buttercream Cake",
      description:
        "Classic layered sponge finished in smooth, hand-piped buttercream in any colour palette you choose.",
      price: "From Rs 3,200",
      image: "images/menu-buttercream-cake.png",
      tag: "Custom colours",
    },
    {
      name: "Basketball Theme Cake",
      description:
        "A fully sculpted, sports-themed centrepiece — built for the birthday kid who lives on the court.",
      price: "From Rs 4,800",
      image: "images/menu-basketball-cake.png",
      tag: "Kids' favourite",
    },
    {
      name: "Wedding Cake",
      description:
        "Multi-tier showpiece cakes designed around your wedding colours and theme, tasting as good as they look.",
      price: "Custom quote",
      image: "images/menu-wedding-cake.png",
      tag: "Made to order",
    },
  ],

  gallery: [
    {
      image: "images/gallery-01.png",
      caption: "Wedding cake, three tiers",
      category: "Wedding cake",
    },
    {
      image: "images/menu-basketball-cake.png",
      caption: "Basketball birthday cake",
      category: "Food & drink",
    },
    {
      image: "images/menu-jiggly-cheesecake.png",
      caption: "Japanese jiggly cheesecake",
      category: "Food & drink",
    },
    {
      image: "images/menu-buttercream-cake.png",
      caption: "Buttercream floral cake",
      category: "Food & drink",
    },
    {
      image: "images/gallery-05.png",
      caption: "In the kitchen",
      category: "By owner",
    },
    {
      image: "images/gallery-06.png",
      caption: "Cake decorating, close up",
      category: "By owner",
    },
    {
      image: "images/gallery-video-01.png",
      caption: "Piping the final layer",
      category: "Videos",
    },
    {
      image: "images/gallery-07.png",
      caption: "Fresh batch, ready for pickup",
      category: "Latest",
    },
  ],

  reviewSummary: {
    average: 5.0,
    total: 34,
    // counts should add up to `total` — adjust as real reviews come in
    breakdown: { 5: 31, 4: 2, 3: 1, 2: 0, 1: 0 },
    tags: [
      { label: "custom cakes", count: 5 },
      { label: "design", count: 6 },
      { label: "birthday cakes", count: 2 },
      { label: "presentation", count: 2 },
      { label: "packaging", count: 2 },
      { label: "cake", count: 11 },
      { label: "food", count: 2 },
    ],
  },

  reviews: [
    {
      name: "Fatima Waseem",
      meta: "2 reviews · 2 photos",
      timeAgo: "2 weeks ago",
      isNew: true,
      rating: 5,
      tags: ["custom cakes", "design", "presentation"],
      text: "I am extremely impressed with the quality, design and overall presentation of the cake I ordered from Sabah. I cannot explain in words how tasty and delicious it was. Fresh buttercream and ganache had the flavour of cookies and cream. I highly recommend her cakes for your special events.",
      ownerReply: {
        timeAgo: "2 weeks ago",
        text: "Thank you so much for your kind compliments. I appreciate you taking the time to share your thoughts — I'm so glad you enjoyed it!",
      },
    },
    {
      name: "Adil Siddique",
      meta: "4 reviews · 1 photo",
      timeAgo: "2 months ago",
      isNew: false,
      rating: 5,
      tags: ["cake", "packaging"],
      text: "The cake was absolutely perfect! It looked amazing, tasted great, and was ready exactly on time. Couldn't have asked for a better experience. Thank you so much!",
      ownerReply: null,
    },
  ],
};
