async function resolveShareChat(url) {
  return {
    success: false,
    platform: "ShareChat",
    type: "unsupported",
    message:
      "Direct ShareChat media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveShareChat };
