async function resolvePinterest(url) {
  return {
    success: false,
    platform: "Pinterest",
    type: "unsupported",
    message:
      "Direct Pinterest media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolvePinterest };
