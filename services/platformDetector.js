function detectPlatform(inputUrl) {
  try {
    const url = new URL(inputUrl);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");

    if (host === "tiktok.com" || host.endsWith(".tiktok.com")) return "TikTok";
    if (host === "instagram.com" || host.endsWith(".instagram.com")) return "Instagram";
    if (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.watch") return "Facebook";
    if (host === "youtube.com" || host === "youtu.be" || host.endsWith(".youtube.com")) return "YouTube";
    if (host === "x.com" || host === "twitter.com" || host.endsWith(".x.com") || host.endsWith(".twitter.com")) return "X";
    if (host === "pinterest.com" || host.endsWith(".pinterest.com") || host === "pin.it") return "Pinterest";
    if (host === "reddit.com" || host.endsWith(".reddit.com") || host === "redd.it") return "Reddit";
    if (host === "threads.net" || host.endsWith(".threads.net")) return "Threads";
    if (host === "snapchat.com" || host.endsWith(".snapchat.com")) return "Snapchat";
    if (host === "likee.video" || host.endsWith(".likee.video")) return "Likee";
    if (host === "sharechat.com" || host.endsWith(".sharechat.com")) return "ShareChat";

    return "Unknown";
  } catch {
    return "Invalid URL";
  }
}

module.exports = { detectPlatform };
