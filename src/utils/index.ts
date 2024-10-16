export const parseMedia = (media: string, baseUri: string) => {
  let mediaUrl = media
    ? media?.indexOf("http") > -1
      ? media
      : `${baseUri}/${media}`
    : null;

  return { mediaUrl };
};

export const imageUrl = (base_uri: string, media: string) => {
  const baseUrl =
    "https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail";

  if (base_uri && !media.includes("https")){
    return `${baseUrl}?url=${base_uri.replace(/\/$/, "")}/${media}`;
  } else if (!base_uri && !media.includes("https")) {
    return media
  } else {
    return `${baseUrl}?url=${media}`;
  }
};
