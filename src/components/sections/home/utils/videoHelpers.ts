export const addAutoplayUnmute = (url: string): string => {
  if (!url) return url;

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  if (isYouTube) {
    let videoId = "";
    let baseUrl = "";

    if (url.includes("/embed/")) {
      const match = url.match(/\/embed\/([^?&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `${url.split("/embed/")[0]}/embed/${videoId}`;
      }
    } else if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([^?&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes("watch?v=")) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (baseUrl && videoId) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}autoplay=1&controls=1`;
    }
  }

  if (isVimeo) {
    let videoId = "";
    let baseUrl = "";

    if (url.includes("/video/")) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://player.vimeo.com/video/${videoId}`;
      }
    } else if (url.includes("player.vimeo.com")) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        videoId = match[1];
        baseUrl = url.split("?")[0];
      }
    }

    if (baseUrl && videoId) {
      const existingParams = url.includes("?") ? url.split("?")[1] : "";
      const params = new URLSearchParams(existingParams);
      params.set("autoplay", "1");
      params.set("muted", "0");
      params.set("controls", "1");
      params.set("dnt", "1");
      return `${baseUrl}?${params.toString()}`;
    }
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}autoplay=1`;
};

export const addAutoplayAndMute = (url: string): string => {
  if (!url) return url;

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  if (isYouTube) {
    let videoId = "";
    let baseUrl = "";

    if (url.includes("/embed/")) {
      const match = url.match(/\/embed\/([^?&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `${url.split("/embed/")[0]}/embed/${videoId}`;
      }
    } else if (url.includes("youtu.be/")) {
      const match = url.match(/youtu\.be\/([^?&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes("watch?v=")) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (baseUrl && videoId) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      return `${baseUrl}${separator}autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0`;
    }
  }

  if (isVimeo) {
    let videoId = "";
    let baseUrl = "";

    if (url.includes("/video/")) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        videoId = match[1];
        baseUrl = `https://player.vimeo.com/video/${videoId}`;
      }
    } else if (url.includes("player.vimeo.com")) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        videoId = match[1];
        baseUrl = url.split("?")[0];
      }
    }

    if (baseUrl && videoId) {
      const existingParams = url.includes("?") ? url.split("?")[1] : "";
      const params = new URLSearchParams(existingParams);
      params.set("autoplay", "1");
      params.set("muted", "1");
      params.set("controls", "0");
      params.set("dnt", "1");
      return `${baseUrl}?${params.toString()}`;
    }
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}autoplay=1&mute=1&controls=0`;
};

export const removeAutoplayAndMute = (
  url: string,
  originalUrl: string,
): string => {
  if (!url) return originalUrl || url;

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return originalUrl || url.split("?")[0];
  }

  return (
    url
      .replace(/[?&]autoplay=1/g, "")
      .replace(/[?&]mute=1/g, "")
      .replace(/[?&]loop=1/g, "")
      .replace(/[?&]playlist=[^&]*/g, "")
      .replace(/\?&/, "?")
      .replace(/[?&]$/, "")
      .replace(/\?$/, "") ||
    originalUrl ||
    url
  );
};

export const disableControls = (url: string): string => {
  if (!url) return url;

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");

  if (isYouTube) {
    if (url.includes("controls=0") || url.includes("controls=1")) {
      return url.replace(/controls=[01]/g, "controls=0");
    }
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}controls=0`;
  }

  if (isVimeo) {
    const existingParams = url.includes("?") ? url.split("?")[1] : "";
    const params = new URLSearchParams(existingParams);
    params.set("controls", "0");
    params.set("dnt", "1");
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?${params.toString()}`;
  }

  return url;
};

export const stopAllVideos = (
  containerElement: HTMLDivElement | null,
  originalUrlsMap: Map<HTMLIFrameElement, string>,
) => {
  if (containerElement) {
    const iframes = containerElement.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const originalUrl = originalUrlsMap.get(iframe);
      if (originalUrl) {
        iframe.src = originalUrl;
      }
    });
  }
};

export const stopHoverVideos = (
  containerElement: HTMLDivElement | null,
  originalUrlsMap: Map<HTMLIFrameElement, string>,
) => {
  if (containerElement) {
    const iframes = containerElement.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const originalUrl = originalUrlsMap.get(iframe);
      if (originalUrl && iframe.src.includes("autoplay=1")) {
        iframe.src = removeAutoplayAndMute(iframe.src, originalUrl);
        iframe.setAttribute("allow", "autoplay; encrypted-media");
      }
    });
  }
};
