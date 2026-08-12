const projectGrid = document.querySelector("#project-grid");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function createTag(tag) {
  const item = document.createElement("span");
  item.className = "project-tag";
  item.textContent = tag;
  return item;
}

function useImagePlaceholder(image, container, title) {
  image.addEventListener("error", () => {
    image.hidden = true;
    container.classList.add("is-placeholder");
    container.dataset.placeholder = title;
  }, { once: true });
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const thumbnail = document.createElement("a");
  thumbnail.className = "project-thumbnail";
  thumbnail.href = project.page;
  thumbnail.setAttribute("aria-label", `Ouvrir la fiche ${project.title}`);

  const image = document.createElement("img");
  image.alt = `Illustration de ${project.title}`;
  image.loading = "lazy";
  useImagePlaceholder(image, thumbnail, project.title);
  image.src = project.image;
  thumbnail.append(image);

  const body = document.createElement("div");
  body.className = "project-body";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const meta = document.createElement("div");
  meta.className = "project-card-meta";
  const consoleName = document.createElement("span");
  const type = document.createElement("span");
  const status = document.createElement("span");
  status.className = "project-card-status";
  consoleName.textContent = project.console;
  type.textContent = project.type;
  status.textContent = project.status;
  meta.append(consoleName, type, status);

  const description = document.createElement("p");
  description.className = "description";
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "project-tags";
  tags.setAttribute("aria-label", "Catégories du projet");
  tags.append(...project.tags.map(createTag));

  body.append(title, meta, description, tags);
  card.append(thumbnail, body);
  return card;
}

if (projectGrid) {
  projectGrid.replaceChildren(...projects.map(createProjectCard));
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Ouvrir le menu");
    }
  });
}
