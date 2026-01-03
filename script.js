// Tecgin site JS (mobile menu + contact forms)
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden", isOpen);
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  async function postJSON(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json?.error || "Something went wrong. Please try again.");
    return json;
  }

  function setStatus(el, type, msg) {
    if (!el) return;
    el.textContent = msg;
    el.className = "text-sm font-semibold";
    if (type === "success") el.classList.add("text-emerald-700");
    if (type === "error") el.classList.add("text-rose-700");
    if (type === "info") el.classList.add("text-slate-700");
  }

  function formToObj(form) {
    const data = new FormData(form);
    const obj = {};
    for (const [k, v] of data.entries()) obj[k] = String(v || "").trim();
    return obj;
  }

  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus(contactStatus, "info", "Sending…");
      const payload = formToObj(contactForm);
      payload.source = "contact-page";
      try {
        await postJSON("/api/contact", payload);
        setStatus(contactStatus, "success", "✅ Sent! We’ll get back to you shortly.");
        contactForm.reset();
      } catch (err) {
        setStatus(contactStatus, "error", "❌ " + err.message);
      }
    });
  }

  const quoteForm = document.getElementById("quoteForm");
  const quoteStatus = document.getElementById("quoteStatus");
  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus(quoteStatus, "info", "Sending…");
      const payload = formToObj(quoteForm);
      payload.source = "home-quote";
      try {
        await postJSON("/api/contact", payload);
        setStatus(quoteStatus, "success", "✅ Sent! We’ll email you back soon.");
        quoteForm.reset();
      } catch (err) {
        setStatus(quoteStatus, "error", "❌ " + err.message);
      }
    });
  }
})();


  // Animated counters (elements with data-count="1234")
  function animateCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        const target = Number(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const prefix = el.getAttribute("data-prefix") || "";
        const duration = Math.max(700, Math.min(1800, Number(el.getAttribute("data-duration") || "1200")));
        const start = performance.now();
        function tick(t) {
          const p = Math.min(1, (t - start) / duration);
          const val = Math.floor(target * (0.15 + 0.85 * (1 - Math.pow(1 - p, 3))));
          el.textContent = prefix + val.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.35 });
    els.forEach((el) => io.observe(el));
  }
  animateCounters();

  // Simple accordion (buttons with data-accordion and a next sibling panel)
  document.querySelectorAll("[data-accordion]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      if (!panel) return;
      const isOpen = !panel.classList.contains("hidden");
      panel.classList.toggle("hidden", isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
