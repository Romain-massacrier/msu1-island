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

function getYoutubeUrls(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : [];
}

function createYoutubePlayer(url, index) {
  const embedUrl = getYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return null;
  }

  const item = document.createElement("div");
  const player = document.createElement("div");
  const frame = document.createElement("iframe");

  item.className = "video-item";
  player.className = "video-player";

  frame.src = embedUrl;
  frame.title = `${release.title} - vidéo ${index + 1}`;
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;

  player.append(frame);
  item.append(player);

  return item;
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
  const videoList = document.querySelector("[data-release-youtube-list]");
  const youtubePlayers = getYoutubeUrls(release.youtube)
    .map((url, index) => createYoutubePlayer(url, index))
    .filter(Boolean);

  if (videoSection && videoList && youtubePlayers.length) {
    videoList.replaceChildren(...youtubePlayers);
    videoSection.hidden = false;
  }
}
