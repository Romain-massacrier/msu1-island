const currentSlug = document.body.dataset.release;
const release = releases.find((item) => item.slug === currentSlug);

function getYoutubeEmbedUrl(url) {
  if (!url || url === "#") {
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
      if (parsedUrl.pathname.startsWith("/embed/")) {
        const videoId = parsedUrl.pathname.split("/")[2];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
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

if (release) {
  document.title = release.title;
  document.querySelector("[data-release-title]").textContent = release.title;
  document.querySelector("[data-release-image]").src = release.detailImage;
  document.querySelector("[data-release-image]").alt = release.title;
  document.querySelector("[data-release-info]").textContent = release.infoLine;
  document.querySelector("[data-release-type]").textContent = release.type;
  document.querySelector("[data-release-drive]").href = release.drive;
  document.querySelector("[data-release-msu-contribution]").textContent = release.msuContribution;

  const infoGrid = document.querySelector("[data-release-info-grid]");
  const infoItems = release.gameInfo.map(([label, value]) => {
    const item = document.createElement("div");
    const itemLabel = document.createElement("span");
    const itemValue = document.createElement("strong");

    itemLabel.textContent = label;
    itemValue.textContent = value;
    item.append(itemLabel, itemValue);
    return item;
  });
  infoGrid.replaceChildren(...infoItems);

  const videoSection = document.querySelector("[data-release-video-section]");
  const videoFrame = document.querySelector("[data-release-youtube]");
  const videoLink = document.querySelector("[data-release-youtube-link]");
  const youtubeEmbedUrl = getYoutubeEmbedUrl(release.youtube);

  if (videoSection && videoFrame && youtubeEmbedUrl) {
    videoFrame.src = youtubeEmbedUrl;
    videoFrame.title = `Vidéo YouTube - ${release.title}`;
    if (videoLink) {
      videoLink.href = release.youtube;
    }
    videoSection.hidden = false;
  }
}
