async function resolveFacebook(url) {
  return {
    success: false,
    platform: "Facebook",
    type: "unsupported",
    message:
      "Direct Facebook media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveFacebook };
