const aboutUrl = new URL(
  "../components/about.html",
  document.currentScript.src,
);

document.addEventListener("DOMContentLoaded", () => {
  const aboutContainer = document.getElementById("about-container");
  if (!aboutContainer) return;

  fetch(aboutUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load about.html");
      }
      return response.text();
    })
    .then((html) => {
      aboutContainer.innerHTML = html;
    })
    .catch((err) => console.error("About Me page load failed:", err));
});
