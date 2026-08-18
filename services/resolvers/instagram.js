async function resolveInstagram(url) {
  return {
    success: false,
    platform: "Instagram",
    type: "unsupported",
    message:
      "Direct Instagram media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveInstagram };
