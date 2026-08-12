const currentSlug = document.body.dataset.project;
const project = projects.find((item) => item.slug === currentSlug);
const expectedDriveFolder = "https://drive.google.com/drive/folders/1cpJzZc-oveM9zQQPiCYYWwCNJE5VP5IX";

function getDriveUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    const expectedUrl = new URL(expectedDriveFolder);

    if (parsedUrl.origin === expectedUrl.origin && parsedUrl.pathname === expectedUrl.pathname) {
      return url;
    }
  } catch (error) {
    return "";
  }

  return "";
}

function getYoutubeEmbedUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsedUrl.pathname.startsWith("/embed/") || parsedUrl.pathname.startsWith("/shorts/")) {
        const videoId = parsedUrl.pathname.split("/")[2];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
      }

      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
    }
  } catch (error) {
    return "";
  }

  return "";
}

function createTags(tags) {
  return tags.map((tag) => {
    const item = document.createElement("span");
    item.className = "project-tag";
    item.textContent = tag;
    return item;
  });
}

function createParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

function createList(items, ordered = false) {
  const list = document.createElement(ordered ? "ol" : "ul");
  items.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  });
  return list;
}

function createContentSection(sectionData) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  section.className = "project-section";
  title.textContent = sectionData.title;
  section.append(title);

  (sectionData.paragraphs || []).forEach((text) => section.append(createParagraph(text)));

  if (sectionData.list?.length) {
    section.append(createList(sectionData.list));
  }

  (sectionData.subsections || []).forEach((subsectionData) => {
    const subsection = document.createElement("div");
    const subtitle = document.createElement("h3");
    subsection.className = "project-subsection";
    subtitle.textContent = subsectionData.title;
    subsection.append(subtitle);
    (subsectionData.paragraphs || []).forEach((text) => subsection.append(createParagraph(text)));
    if (subsectionData.list?.length) {
      subsection.append(createList(subsectionData.list));
    }
    section.append(subsection);
  });

  return section;
}

function createGallerySection(items) {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const gallery = document.createElement("div");
  section.className = "project-section";
  title.textContent = "Galerie";
  gallery.className = "project-gallery";

  items.forEach((item, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    image.alt = item.alt || `${project.title} - image ${index + 1}`;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.hidden = true;
      figure.classList.add("is-placeholder");
      figure.dataset.placeholder = image.alt;
    }, { once: true });
    image.src = item.src;
    figure.append(image);
    if (item.caption) {
      caption.textContent = item.caption;
      figure.append(caption);
    }
    gallery.append(figure);
  });

  section.append(title, gallery);
  return section;
}

function createYoutubePlayer(url, index) {
  const embedUrl = getYoutubeEmbedUrl(url);
  if (!embedUrl) {
    return null;
  }

  const player = document.createElement("div");
  const frame = document.createElement("iframe");
  player.className = "video-player";
  frame.src = embedUrl;
  frame.title = `${project.title} - vidéo ${index + 1}`;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  player.append(frame);
  return player;
}

function renderProjectImage(image, media) {
  image.alt = `Illustration de ${project.title}`;
  image.addEventListener("error", () => {
    image.hidden = true;
    media.classList.add("is-placeholder");
    media.dataset.placeholder = project.title;
  }, { once: true });
  image.removeAttribute("src");
  image.src = project.detailImage;
}

function renderProject() {
  document.title = `${project.title} — Retro Mod Island`;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = project.metaDescription;
  }

  document.querySelector("[data-project-title]").textContent = project.title;
  document.querySelector("[data-project-info]").textContent = project.infoLine;
  document.querySelector("[data-project-type]").textContent = project.type;
  document.querySelector("[data-project-status]").textContent = project.status;

  const media = document.querySelector("[data-project-media]");
  renderProjectImage(document.querySelector("[data-project-image]"), media);
  document.querySelector("[data-project-tags]").replaceChildren(...createTags(project.tags));

  const participation = document.querySelector("[data-project-participation]");
  if (project.participation) {
    participation.textContent = project.participation;
    participation.hidden = false;
  }

  const infoGrid = document.querySelector("[data-project-info-grid]");
  const infoItems = project.gameInfo.map(([label, value]) => {
    const item = document.createElement("div");
    const itemLabel = document.createElement("span");
    const itemValue = document.createElement("strong");
    itemLabel.textContent = label;
    itemValue.textContent = value;
    item.append(itemLabel, itemValue);
    return item;
  });
  infoGrid.replaceChildren(...infoItems);

  const sections = (project.sections || []).map(createContentSection);
  if (project.gallery?.length) {
    sections.push(createGallerySection(project.gallery));
  }
  document.querySelector("[data-project-sections]").replaceChildren(...sections);

  if (project.msuContribution) {
    const msuSection = document.querySelector("[data-project-msu-section]");
    msuSection.querySelector("p").textContent = project.msuContribution;
    msuSection.hidden = false;
  }

  const players = (project.youtube || [])
    .map((url, index) => createYoutubePlayer(url, index))
    .filter(Boolean);
  if (players.length) {
    const videoSection = document.querySelector("[data-project-video-section]");
    videoSection.querySelector("[data-project-youtube-list]").replaceChildren(...players);
    videoSection.hidden = false;
  }

  if (project.download || project.availabilityMessage) {
    const downloadSection = document.querySelector("[data-project-download-section]");
    const actions = downloadSection.querySelector("[data-project-download-actions]");
    const message = downloadSection.querySelector("[data-project-availability]");
    const driveUrl = getDriveUrl(project.download?.url);

    if (driveUrl) {
      const link = document.createElement("a");
      link.className = "button button-drive";
      link.href = driveUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = project.download.label;
      actions.append(link);
    }

    const availabilityText = project.availabilityMessage || project.download?.note || "";
    if (availabilityText) {
      message.textContent = availabilityText;
    } else {
      message.hidden = true;
    }
    downloadSection.hidden = false;
  }

  if (project.installation) {
    const installation = project.installation;
    const section = document.querySelector("[data-project-installation-section]");
    const content = section.querySelector("[data-project-installation]");
    const romCheck = document.createElement("div");
    const romTitle = document.createElement("h3");
    romCheck.className = "rom-check";
    romTitle.textContent = "ROM attendue";
    romCheck.append(romTitle);

    installation.romInfo.forEach(([label, value]) => {
      const row = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = value;
      row.append(`${label} : `, strong);
      romCheck.append(row);
    });
    romCheck.append(createParagraph(installation.romNote));

    const baseName = document.createElement("p");
    const baseNameValue = document.createElement("strong");
    baseNameValue.textContent = installation.baseName;
    baseName.append("Nom de base conseillé après patch : ", baseNameValue);

    content.append(
      createParagraph(installation.intro),
      romCheck,
      createList(installation.steps, true),
      createParagraph(installation.troubleshooting),
      baseName,
      createParagraph("Exemple attendu :"),
      createList(installation.files)
    );
    section.hidden = false;
  }
}

if (project) {
  renderProject();
} else {
  const error = document.createElement("p");
  const link = document.createElement("a");
  error.className = "project-error";
  error.append("Ce projet est introuvable. ");
  link.href = "../../index.html#projets";
  link.textContent = "Retour aux projets";
  error.append(link);
  document.querySelector(".detail-page").replaceChildren(error);
}
