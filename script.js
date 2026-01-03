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
