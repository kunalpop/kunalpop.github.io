const profileUrl = new URL(
  "../components/profile.html",
  document.currentScript.src,
);

document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.getElementById("profile-container");
  if (!profileContainer) return;

  fetch(profileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load profile.html");
      }
      return response.text();
    })
    .then((html) => {
      profileContainer.innerHTML = html;
    })
    .catch((err) => console.error("Profile load failed:", err));
});
