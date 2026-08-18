async function resolveTikTok(url) {
  return {
    success: false,
    platform: "TikTok",
    type: "unsupported",
    message:
      "Direct TikTok video-file retrieval is not available through the official API. Use authorized TikTok API access for supported metadata/display features."
  };
}

module.exports = { resolveTikTok };
