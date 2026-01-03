const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "block";
    mobileMenu.style.display = isOpen ? "none" : "block";
    hamburgerBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  // close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileMenu.style.display = "none";
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function handleQuote(e) {
  e.preventDefault();
  const ok = document.getElementById("quoteSuccess");
  if (ok) ok.hidden = false;
  e.target.reset();
  return false;
}

function handleContact(e) {
  e.preventDefault();
  const ok = document.getElementById("contactSuccess");
  if (ok) ok.hidden = false;
  e.target.reset();
  return false;
}

// expose for inline handlers
window.handleQuote = handleQuote;
window.handleContact = handleContact;
