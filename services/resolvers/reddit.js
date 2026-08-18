async function resolveReddit(url) {
  return {
    success: false,
    platform: "Reddit",
    type: "unsupported",
    message:
      "Direct Reddit media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveReddit };
