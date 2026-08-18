const { execFile } = require("child_process");

function runYtDlp(url, output) {
  return new Promise((resolve, reject) => {
    const args = [
      "--no-cache-dir",
      "--no-continue",
      "--no-playlist",
      "--js-runtimes",
      "deno",
      "--extractor-args",
      "youtube:player_client=default,web_embedded",
      "-f",
      "18/b[ext=mp4]/best",
      "-o",
      output,
      url
    ];

    execFile(
      "python",
      ["-m", "yt_dlp", ...args],
      { maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }

        resolve(stdout);
      }
    );
  });
}

function getInfo(url) {
  return new Promise((resolve, reject) => {
    const args = [
      "--no-playlist",
      "--dump-single-json",
      "--no-warnings",
      "--js-runtimes",
      "deno",
      "--extractor-args",
      "youtube:player_client=default,web_embedded",
      url
    ];

    execFile(
      "python",
      ["-m", "yt_dlp", ...args],
      { maxBuffer: 20 * 1024 * 1024 },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
          return;
        }

        try {
          resolve(JSON.parse(stdout));
        } catch {
          reject(new Error("Invalid yt-dlp JSON output"));
        }
      }
    );
  });
}

async function resolveYouTube(url) {
  try {
    const info = await getInfo(url);

    return {
      success: true,
      platform: "YouTube",
      type: "video",
      title: info.title || "YouTube Video",
      thumbnail: info.thumbnail || null,
      duration: info.duration || null,
      url: info.webpage_url || url,
      uploader: info.uploader || null,
      message: "YouTube metadata resolved successfully."
    };
  } catch (error) {
    return {
      success: false,
      platform: "YouTube",
      type: "error",
      message: error.message || "YouTube resolver failed."
    };
  }
}

async function downloadYouTube(url, output) {
  await runYtDlp(url, output);
  return output;
}

module.exports = {
  resolveYouTube,
  downloadYouTube
};
