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

      const intro = aboutContainer.querySelector(".intro");
      if (!intro) return;

      const fitIntroText = () => {
        const paragraphs = intro.querySelectorAll("p");
        if (!paragraphs.length) return;

        paragraphs.forEach((paragraph) => {
          paragraph.style.fontSize = "";
        });

        const baseFontSize = parseFloat(getComputedStyle(paragraphs[0]).fontSize);
        const minimumFontSize = 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        const maximumFontSize = Math.max(
          baseFontSize,
          1.3 * parseFloat(getComputedStyle(document.documentElement).fontSize),
        );
        const introStyle = getComputedStyle(intro);
        const gap = parseFloat(introStyle.rowGap) || 0;
        const verticalPadding =
          parseFloat(introStyle.paddingTop) + parseFloat(introStyle.paddingBottom);
        const contentFits = () => {
          const textHeight = [...paragraphs].reduce(
            (height, paragraph) => height + paragraph.scrollHeight,
            0,
          );
          return textHeight + gap * (paragraphs.length - 1) + verticalPadding <= intro.clientHeight;
        };
        let lowerBound = minimumFontSize;
        let upperBound = maximumFontSize;

        for (let iteration = 0; iteration < 10; iteration += 1) {
          const fontSize = (lowerBound + upperBound) / 2;
          paragraphs.forEach((paragraph) => {
            paragraph.style.fontSize = `${fontSize}px`;
          });

          if (contentFits()) {
            lowerBound = fontSize;
          } else {
            upperBound = fontSize;
          }
        }

        paragraphs.forEach((paragraph) => {
          paragraph.style.fontSize = `${lowerBound}px`;
        });
      };

      const introObserver = new ResizeObserver(fitIntroText);
      introObserver.observe(intro);
      fitIntroText();
    })
    .catch((err) => console.error("About Me page load failed:", err));
});
