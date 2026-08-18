async function resolveThreads(url) {
  return {
    success: false,
    platform: "Threads",
    type: "unsupported",
    message:
      "Direct Threads media-file retrieval requires an authorized API/integration. Private or restricted content is not supported."
  };
}

module.exports = { resolveThreads };
