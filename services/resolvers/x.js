async function resolveX(url) {
  return {
    success: false,
    platform: "X",
    type: "unsupported",
    message:
      "Direct X media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveX };
