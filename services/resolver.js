const { resolveTikTok } = require("./resolvers/tiktok");
const { resolveInstagram } = require("./resolvers/instagram");
const { resolveFacebook } = require("./resolvers/facebook");
const { resolveYouTube } = require("./resolvers/youtube");
const { resolveX } = require("./resolvers/x");
const { resolvePinterest } = require("./resolvers/pinterest");
const { resolveReddit } = require("./resolvers/reddit");
const { resolveThreads } = require("./resolvers/threads");
const { resolveSnapchat } = require("./resolvers/snapchat");
const { resolveShareChat } = require("./resolvers/sharechat");

async function resolveMedia(platform, url) {
  switch (platform) {
    case "TikTok":
      return await resolveTikTok(url);

    case "Instagram":
      return await resolveInstagram(url);

    case "Facebook":
      return await resolveFacebook(url);

    case "YouTube":
      return await resolveYouTube(url);

    case "X":
      return await resolveX(url);

    case "Pinterest":
      return await resolvePinterest(url);

    case "Reddit":
      return await resolveReddit(url);

    case "Threads":
      return await resolveThreads(url);

    case "Snapchat":
      return await resolveSnapchat(url);

    case "ShareChat":
      return await resolveShareChat(url);

    default:
      return {
        success: false,
        platform,
        type: "unsupported",
        message: `${platform} resolver is not connected yet.`
      };
  }
}

module.exports = { resolveMedia };
