export const parseHeading = (heading: string | undefined): string[] => {
  if (!heading) return [""];

  const trimmedHeading = heading.trim();

  const separatorPattern =
    /(\s+(?:for|and|with|to|in|by|at|of|the|a|an)\s+)|([,;:]\s*)|(\s*[-—–]\s*)/i;
  const separatorMatch = trimmedHeading.match(separatorPattern);

  if (separatorMatch) {
    const separator = separatorMatch[0];
    const index = separatorMatch.index || 0;
    const parts = [
      trimmedHeading.substring(0, index).trim(),
      trimmedHeading.substring(index + separator.length).trim(),
    ].filter(Boolean);

    if (parts.length === 2) {
      const connectingWord = separator.trim().toLowerCase();
      const keepWithFirst = [
        "for",
        "and",
        "with",
        "to",
        "in",
        "by",
        "at",
        "of",
      ].includes(connectingWord);
      return keepWithFirst
        ? [`${parts[0]} ${connectingWord}`, parts[1]]
        : parts;
    }
  }

  const words = trimmedHeading.split(/\s+/);
  if (words.length > 1) {
    const lastWord = words[words.length - 1];
    const firstPart = words.slice(0, -1).join(" ");
    return [firstPart, lastWord];
  }

  return [trimmedHeading];
};

export const getS3Url = (url: string) => {
  return `https://${process.env.S3_URL}${url}`;
};
