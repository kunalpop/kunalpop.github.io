const projectsDataUrl = new URL(
  "../data/projects-data.json",
  document.currentScript.src,
);

const ALL_CATEGORIES = [
  "Software Engineering",
  "Blockchain/Web3",
  "Finance",
  "Artificial Intelligence and Machine Learning",
  "Operations Research",
  "Engineering",
  "Statistics",
];

function renderCategoryTags(categories) {
  return categories
    .map((category) => `<span class="category">${category}</span>`)
    .join("");
}

function renderProject(project) {
  const managementBlock =
    project.management && project.managementLabel
      ? `<p>
            <strong>${project.managementLabel}</strong>
            ${project.management}
          </p>`
      : "";

  return `
    <div class="project">
      <!-- Title at top center -->
      <div class="project-header-title">
        <h2>${project.title}</h2>
      </div>

      <!-- Left and Right cards -->
      <div class="project-content">
        <!-- Left card: image + year -->
        <div class="project-left-card">
          <div class="category-tags">
            ${renderCategoryTags(project.categories)}
          </div>
          <img
            src="${project.image}"
            alt="${project.alt}"
          />
          <span class="year">${project.year}</span>
        </div>

        <!-- Right card: description -->
        <div class="project-right-card">
          <p>
            ${project.description}
          </p>
          <p>
            <strong>${project.techLabel}</strong>
            ${project.tech}
          </p>
          ${managementBlock}
        </div>
      </div>
    </div>
  `;
}

function renderCategoryFilter(selected) {
  const options = ["All", ...ALL_CATEGORIES]
    .map((category) => {
      const isSelected = category === selected ? "selected" : "";
      return `<option value="${category}" ${isSelected}>${category}</option>`;
    })
    .join("");

  return `
    <div class="category-filter">
      <label for="category-select">Select Category:</label>
        <select id="category-select">
          ${options}
        </select>
    </div>
  `;
}

function renderProjectsList(projects, selectedCategory) {
  const filtered =
    selectedCategory && selectedCategory !== "All"
      ? projects.filter((project) =>
          project.categories.includes(selectedCategory),
        )
      : projects;

  return filtered.map(renderProject).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;

  fetch(projectsDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load projects-data.json");
      }
      return response.json();
    })
    .then((projects) => {
      let selectedCategory = "All";

      function draw() {
        projectsContainer.innerHTML = `
          <projects-component>
            <div class="container">
              ${renderCategoryFilter(selectedCategory)}
              <div class="projects-list">
                ${renderProjectsList(projects, selectedCategory)}
              </div>
            </div>
          </projects-component>
        `;

        const select = document.getElementById("category-select");
        select.addEventListener("change", (event) => {
          selectedCategory = event.target.value;
          draw();
        });
      }

      draw();
    })
    .catch((err) => console.error("Projects load failed:", err));
});
