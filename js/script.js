const releaseGrid = document.querySelector("#release-grid");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function createReleaseCard(release) {
  const card = document.createElement("article");
  card.className = "release-card";

  const thumbnail = document.createElement("a");
  thumbnail.className = "release-thumbnail";
  thumbnail.href = release.page;
  thumbnail.setAttribute("aria-label", `Ouvrir la fiche ${release.title}`);

  const image = document.createElement("img");
  image.src = release.image;
  image.alt = `Miniature de ${release.title}`;
  image.loading = "lazy";
  thumbnail.appendChild(image);

  const body = document.createElement("div");
  body.className = "release-body";

  body.innerHTML = `
    <h3>${release.title}</h3>
    <p class="description">${release.description}</p>
  `;

  card.append(thumbnail, body);
  return card;
}

function renderReleases() {
  releaseGrid.replaceChildren(...releases.map(createReleaseCard));
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

renderReleases();
