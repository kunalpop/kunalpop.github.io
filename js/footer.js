const footerUrl = new URL(
  "../components/footer.html",
  document.currentScript.src,
);

document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  fetch(footerUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load footer.html");
      }
      return response.text();
    })
    .then((html) => {
      footerContainer.innerHTML = html;

      const modal = document.getElementById("contactModal");
      const contactBtn = document.getElementById("contactBtn");
      const closeBtn = document.querySelector(".close");

      if (!modal || !contactBtn || !closeBtn) return;

      contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
      });

      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          modal.style.display = "none";
        }
      });
    })
    .catch((err) => console.error("Footer load failed:", err));
});
