async function resolveSnapchat(url) {
  return {
    success: false,
    platform: "Snapchat",
    type: "unsupported",
    message:
      "Direct Snapchat media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveSnapchat };
