const urlInput = document.getElementById("url");
const downloadBtn = document.getElementById("downloadBtn");
const pasteBtn = document.getElementById("pasteBtn");
const message = document.getElementById("message");

const resultCard = document.getElementById("resultCard");
const resultPlatform = document.getElementById("resultPlatform");
const resultTitle = document.getElementById("resultTitle");
const resultUrl = document.getElementById("resultUrl");
const newDownload = document.getElementById("newDownload");

pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();

    if (text) {
      urlInput.value = text;
      message.textContent = "✅ URL pasted successfully";
    }
  } catch {
    message.textContent = "Please paste the URL manually";
  }
});

downloadBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();

  if (!url) {
    message.textContent = "❌ Please paste a social media URL";
    return;
  }

  resultCard.hidden = true;
  downloadBtn.disabled = true;
  downloadBtn.innerHTML = "⏳ CHECKING...";
  message.textContent = "🔍 Detecting platform...";

  try {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      message.textContent = "❌ " + (data.message || "Unable to process URL");
      return;
    }

    resultPlatform.textContent = data.platform;
    resultTitle.textContent = `${data.platform} URL ready`;
    resultUrl.textContent = data.url;
    downloadBtn.onclick = () => { window.location.href = data.downloadUrl; };

    resultCard.hidden = false;
    message.textContent = "";

  } catch (error) {
    message.textContent = "❌ Server connection failed";
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.innerHTML = "⚡ DOWNLOAD";
  }
});

newDownload.addEventListener("click", () => {
  resultCard.hidden = true;
  urlInput.value = "";
  message.textContent = "";
  urlInput.focus();
});

document.getElementById("videoBtn").addEventListener("click", () => {
  message.textContent =
    "ℹ️ Video retrieval integration will be connected next.";
});

document.getElementById("audioBtn").addEventListener("click", () => {
  message.textContent =
    "ℹ️ Audio retrieval integration will be connected next.";
});
