/* ==========================================================================
   SABAH BAKES — SITE LOGIC
   Reads everything from SITE_DATA (js/data.js) and renders it into the page.
   No backend, no database — edit data.js to change the content.
   ========================================================================== */

(function () {
  "use strict";

  const D = window.SITE_DATA;

  /* ---------------------------- helpers ---------------------------- */

  function getPath(obj, path) {
    return path
      .split(".")
      .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
  }

  // Fill every element with a data-bind="a.b.c" attribute from SITE_DATA
  function bindText() {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const value = getPath(D, el.getAttribute("data-bind"));
      if (value !== undefined && value !== null) el.textContent = value;
    });
  }

  // Build an <img>-with-fallback "image slot" block as an HTML string
  function imageSlot(src, alt, extraClass) {
    return `
      <div class="img-slot ${extraClass || ""}" data-label="${src}">
        <img src="${src}" alt="${alt}">
        <div class="img-slot-fallback">
          <svg viewBox="0 0 24 24" class="img-icon"><path d="M4 5h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M4 16l4.5-5 3.5 3.5L16 9l4 5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="9" r="1.4" fill="currentColor"/></svg>
          <span>Add photo:<br><code>${src}</code></span>
        </div>
      </div>`;
  }

  // Wire up onload/onerror for every image inside freshly-injected image slots
  function activateImageSlots(container) {
    (container || document).querySelectorAll(".img-slot img").forEach((img) => {
      const fallback = img.nextElementSibling;
      const show = () => {
        if (fallback) fallback.style.display = "flex";
      };
      const hide = () => {
        if (fallback) fallback.style.display = "none";
      };
      if (img.complete && img.naturalWidth > 0) {
        hide();
      } else {
        img.addEventListener("load", hide);
        img.addEventListener("error", () => {
          img.classList.add("is-broken");
          show();
        });
      }
    });
  }

  function starsMarkup(rating) {
    const full = Math.round(rating);
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += `<svg viewBox="0 0 20 20" class="star ${i < full ? "" : "star-empty"}" style="${i < full ? "" : "fill:#e6dcc8"}"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5Z"/></svg>`;
    }
    return out;
  }

  function initials(name) {
    return name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  /* ------------------------------ header ----------------------------- */

  function setupHeader() {
    const wa = document.getElementById("whatsapp-cta");
    if (wa)
      wa.href = `https://wa.me/${D.business.whatsappHref}?text=${encodeURIComponent("Hi Sabah, I'd like to order a cake!")}`;

    const toggle = document.getElementById("nav-toggle");
    const header = document.querySelector(".site-header");
    if (toggle && header) {
      toggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
      document
        .querySelectorAll(".main-nav a")
        .forEach((a) =>
          a.addEventListener("click", () => header.classList.remove("is-open")),
        );
    }
  }

  /* -------------------------- info strip / links ---------------------- */

  function setupInfoAndLinks() {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(D.business.mapsQuery)}`;
    const telHref = `tel:${D.business.phoneHref}`;

    ["info-address", "directions-cta"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = mapsUrl;
    });
    ["info-phone", "call-cta"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = telHref;
    });

    const waReview = document.getElementById("write-review-cta");
    if (waReview) waReview.href = mapsUrl;

    const servicesWrap = document.getElementById("info-services");
    if (servicesWrap) {
      servicesWrap.innerHTML = D.business.services
        .map((s) => `<span class="service-badge">${s}</span>`)
        .join("");
    }

    const knownFor = document.getElementById("known-for-list");
    if (knownFor) {
      knownFor.innerHTML = D.menu.map((m) => `<li>${m.name}</li>`).join("");
    }

    // Map embed — no API key required for a basic place search embed
    const mapFrame = document.getElementById("map-frame");
    if (mapFrame) {
      mapFrame.innerHTML = `<iframe
        src="https://www.google.com/maps?q=${encodeURIComponent(D.business.mapsQuery)}&output=embed"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        title="Map to ${D.business.name}"></iframe>`;
    }
  }

  /* ------------------------------- hours ------------------------------ */

  const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function parseHourToken(token) {
    // "9 AM" / "9 PM" -> 24h number
    const m = token.trim().match(/(\d+)\s*(AM|PM)/i);
    if (!m) return null;
    let h = parseInt(m[1], 10);
    const period = m[2].toUpperCase();
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h;
  }

  function renderHoursTable() {
    const table = document.getElementById("hours-table");
    if (!table) return;
    const today = DAY_NAMES[new Date().getDay()];
    table.innerHTML = D.hours
      .map(
        (row) => `
      <tr class="${row.day === today ? "is-today" : ""}">
        <td>${row.day}${row.day === today ? " · Today" : ""}</td>
        <td>${row.time}${row.note ? `<span class="note">${row.note}</span>` : ""}</td>
      </tr>`,
      )
      .join("");
  }

  function updateOpenStatus() {
    const now = new Date();
    const today = DAY_NAMES[now.getDay()];
    const todayHours = D.hours.find((h) => h.day === today);
    const textEl = document.getElementById("open-status-text");
    const subEl = document.getElementById("open-status-sub");
    const pillEl = document.getElementById("open-status-pill");
    const infoToday = document.querySelector("#info-hours-today span");

    if (!todayHours) return;
    const [openTok, closeTok] = todayHours.time.split("–").map((s) => s.trim());
    const openH = parseHourToken(openTok);
    const closeH = parseHourToken(closeTok);
    const nowH = now.getHours() + now.getMinutes() / 60;

    const isOpen =
      openH !== null && closeH !== null && nowH >= openH && nowH < closeH;
    const closingSoon = isOpen && closeH - nowH <= 1;

    if (textEl && subEl && pillEl) {
      pillEl.classList.remove("is-open", "is-closed");
      if (isOpen) {
        pillEl.classList.add("is-open");
        textEl.textContent = closingSoon ? "Closing soon" : "Open now";
        subEl.textContent = `Until ${closeTok}`;
      } else {
        pillEl.classList.add("is-closed");
        textEl.textContent = "Closed now";
        subEl.textContent = `Opens ${openTok}`;
      }
    }
    if (infoToday) {
      infoToday.textContent = `Today: ${todayHours.time}${isOpen ? (closingSoon ? " · Closing soon" : " · Open") : " · Closed"}`;
    }
  }

  /* --------------------------- popular times --------------------------- */

  function renderPopularTimes() {
    const chart = document.getElementById("popular-times-chart");
    if (!chart) return;
    const max = Math.max(...D.popularTimes.values, 1);
    chart.innerHTML = D.popularTimes.values
      .map(
        (v, i) => `
      <div class="pt-bar-wrap">
        <div class="pt-bar" style="height:${Math.max(6, (v / max) * 100)}%"></div>
        <span class="pt-label">${D.popularTimes.labels[i]}</span>
      </div>`,
      )
      .join("");
  }

  /* --------------------------------- menu -------------------------------- */

  function renderMenu() {
    const grid = document.getElementById("menu-grid");
    if (!grid) return;
    grid.innerHTML = D.menu
      .map(
        (item) => `
      <article class="menu-card">
        ${imageSlot(item.image, item.name)}
        <div class="menu-card-body">
          <span class="menu-card-tag">${item.tag}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span class="menu-card-price">${item.price}</span>
        </div>
      </article>`,
      )
      .join("");
    activateImageSlots(grid);
  }

  /* -------------------------------- gallery ------------------------------- */

  function renderGallery() {
    const tabsWrap = document.getElementById("gallery-tabs");
    const grid = document.getElementById("gallery-grid");
    if (!tabsWrap || !grid) return;

    const categories = [
      "All",
      ...Array.from(new Set(D.gallery.map((g) => g.category))),
    ];

    tabsWrap.innerHTML = categories
      .map(
        (cat, i) =>
          `<button class="gallery-tab ${i === 0 ? "is-active" : ""}" data-cat="${cat}" role="tab" aria-selected="${i === 0}">${cat}</button>`,
      )
      .join("");

    grid.innerHTML = D.gallery
      .map(
        (g) => `
      <div class="gallery-item" data-cat="${g.category}">
        ${imageSlot(g.image, g.caption)}
        <span class="gallery-caption">${g.caption}</span>
      </div>`,
      )
      .join("");
    activateImageSlots(grid);

    tabsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-tab");
      if (!btn) return;
      tabsWrap.querySelectorAll(".gallery-tab").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      const cat = btn.dataset.cat;
      grid.querySelectorAll(".gallery-item").forEach((item) => {
        item.classList.toggle(
          "is-hidden",
          cat !== "All" && item.dataset.cat !== cat,
        );
      });
    });
  }

  /* -------------------------------- reviews -------------------------------- */

  function renderReviewSummary() {
    const starsEl = document.getElementById("summary-stars");
    if (starsEl) starsEl.innerHTML = starsMarkup(D.reviewSummary.average);

    const breakdown = document.getElementById("breakdown-bars");
    if (breakdown) {
      const total = D.reviewSummary.total || 1;
      breakdown.innerHTML = [5, 4, 3, 2, 1]
        .map((star) => {
          const count = D.reviewSummary.breakdown[star] || 0;
          const pct = Math.round((count / total) * 100);
          return `
          <div class="breakdown-row">
            <span>${star}</span>
            <span class="breakdown-track"><span class="breakdown-fill" style="width:${pct}%"></span></span>
            <span>${count}</span>
          </div>`;
        })
        .join("");
    }

    const tagsEl = document.getElementById("review-tags");
    if (tagsEl) {
      tagsEl.innerHTML =
        `<button class="tag-btn is-active" data-tag="All">All</button>` +
        D.reviewSummary.tags
          .map(
            (t) =>
              `<button class="tag-btn" data-tag="${t.label}">${t.label} · ${t.count}</button>`,
          )
          .join("");
    }
  }

  function renderReviewsList(filterTag) {
    const list = document.getElementById("reviews-list");
    if (!list) return;
    const filtered =
      !filterTag || filterTag === "All"
        ? D.reviews
        : D.reviews.filter((r) => r.tags && r.tags.includes(filterTag));

    if (!filtered.length) {
      list.innerHTML = `<p class="section-sub">No reviews mention "${filterTag}" yet.</p>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        (r) => `
      <article class="review-card">
        <div class="review-head">
          <div class="review-avatar">${initials(r.name)}</div>
          <div>
            <div class="review-name-row">
              <span class="review-name">${r.name}</span>
              ${r.isNew ? '<span class="review-badge-new">New</span>' : ""}
            </div>
            <div class="review-meta">${r.meta}</div>
          </div>
          <span class="review-time">${r.timeAgo}</span>
        </div>
        <div class="review-stars">${starsMarkup(r.rating)}</div>
        <p class="review-text">${r.text}</p>
        ${
          r.ownerReply
            ? `
          <div class="owner-reply">
            <strong>Response from the owner</strong><span class="owner-reply-time">${r.ownerReply.timeAgo}</span>
            <p style="margin:0.4em 0 0;">${r.ownerReply.text}</p>
          </div>`
            : ""
        }
      </article>`,
      )
      .join("");
  }

  function setupReviews() {
    renderReviewSummary();
    renderReviewsList("All");
    const tagsEl = document.getElementById("review-tags");
    if (tagsEl) {
      tagsEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".tag-btn");
        if (!btn) return;
        tagsEl
          .querySelectorAll(".tag-btn")
          .forEach((b) => b.classList.toggle("is-active", b === btn));
        renderReviewsList(btn.dataset.tag);
      });
    }
  }

  /* --------------------------------- init ---------------------------------- */

  function init() {
    bindText();
    setupHeader();
    setupInfoAndLinks();
    renderHoursTable();
    updateOpenStatus();
    renderPopularTimes();
    renderMenu();
    renderGallery();
    setupReviews();

    activateImageSlots(document); // hero + about image slots present in initial HTML

    const yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    setInterval(updateOpenStatus, 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
