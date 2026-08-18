(() => {
  const start = () => {
    const button = document.querySelector(".menu");

    if (!button) {
      console.log("❌ Menu button not found");
      return;
    }

    if (document.getElementById("subbhuMenu")) return;

    const style = document.createElement("style");
    style.textContent = `
      #subbhuMenuOverlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.55);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease;
      }

      #subbhuMenuOverlay.open {
        opacity: 1;
        pointer-events: auto;
      }

      #subbhuMenu {
        position: fixed;
        top: 78px;
        right: 15px;
        width: min(310px, calc(100vw - 30px));
        padding: 16px;
        border: 1px solid rgba(255,255,255,.18);
        border-radius: 24px;
        background:
          linear-gradient(145deg,
            rgba(40,20,75,.97),
            rgba(5,15,30,.97));
        box-shadow:
          0 25px 70px rgba(0,0,0,.65),
          0 0 35px rgba(0,180,255,.18);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        z-index: 9999;
        transform: translateY(-18px) scale(.92) rotateX(-8deg);
        transform-origin: top right;
        opacity: 0;
        pointer-events: none;
        transition:
          transform .38s cubic-bezier(.2,.8,.2,1),
          opacity .25s ease;
      }

      #subbhuMenu.open {
        transform: translateY(0) scale(1) rotateX(0);
        opacity: 1;
        pointer-events: auto;
      }

      .subbhu-menu-title {
        font-family: system-ui, sans-serif;
        color: white;
        font-size: 18px;
        font-weight: 800;
        padding: 8px 10px 14px;
        letter-spacing: 1px;
      }

      .subbhu-menu-title span {
        display: inline-block;
        animation: subbhuGlow 2s ease-in-out infinite;
      }

      @keyframes subbhuGlow {
        0%,100% { transform: translateY(0); text-shadow: 0 0 8px #7c4dff; }
        50% { transform: translateY(-2px); text-shadow: 0 0 20px #00d9ff; }
      }

      .subbhu-menu-item {
        width: 100%;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 16px;
        background: rgba(255,255,255,.055);
        color: white;
        padding: 13px 14px;
        margin: 6px 0;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: left;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: .25s ease;
      }

      .subbhu-menu-item:hover {
        transform: translateX(-4px) scale(1.02);
        background: linear-gradient(90deg,
          rgba(100,70,255,.35),
          rgba(0,210,255,.25));
        box-shadow: 0 8px 25px rgba(0,180,255,.18);
      }

      .subbhu-menu-icon {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 11px;
        background: linear-gradient(135deg,#704cff,#00c8ff);
        font-size: 18px;
        flex-shrink: 0;
      }

      .subbhu-page {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        overflow-y: auto;
        padding: 85px 20px 35px;
        background:
          radial-gradient(circle at 20% 15%, rgba(105,50,255,.35), transparent 35%),
          radial-gradient(circle at 80% 40%, rgba(0,190,255,.22), transparent 35%),
          #05060c;
        color: white;
        font-family: system-ui, sans-serif;
      }

      .subbhu-page.open {
        display: block;
        animation: subbhuPageIn .35s ease both;
      }

      @keyframes subbhuPageIn {
        from { opacity: 0; transform: scale(.97) translateY(15px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .subbhu-page-card {
        max-width: 650px;
        margin: auto;
        padding: 25px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 25px;
        background: rgba(255,255,255,.06);
        box-shadow: 0 20px 60px rgba(0,0,0,.45);
      }

      .subbhu-page h2 {
        font-size: 28px;
        margin-top: 0;
      }

      .subbhu-close {
        position: fixed;
        top: 18px;
        right: 18px;
        border: 1px solid rgba(255,255,255,.18);
        background: rgba(255,255,255,.1);
        color: white;
        border-radius: 14px;
        padding: 11px 15px;
        font-size: 18px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "subbhuMenuOverlay";

    const menu = document.createElement("div");
    menu.id = "subbhuMenu";

    menu.innerHTML = `
      <div class="subbhu-menu-title">
        ⚡ <span>SUBBHU MENU</span>
      </div>

      <button class="subbhu-menu-item" data-page="downloads">
        <span class="subbhu-menu-icon">📥</span>
        Download History
      </button>

      <button class="subbhu-menu-item" data-page="settings">
        <span class="subbhu-menu-icon">⚙️</span>
        Download Settings
      </button>

      <button class="subbhu-menu-item" data-page="help">
        <span class="subbhu-menu-icon">❓</span>
        How to Use
      </button>

      <button class="subbhu-menu-item" data-page="privacy">
        <span class="subbhu-menu-icon">🔒</span>
        Privacy
      </button>

      <button class="subbhu-menu-item" data-page="contact">
        <span class="subbhu-menu-icon">💬</span>
        Contact / Support
      </button>

      <button class="subbhu-menu-item" data-page="about">
        <span class="subbhu-menu-icon">⚡</span>
        About SUBBHU
      </button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(menu);

    function openMenu() {
      menu.classList.add("open");
      overlay.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (menu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", closeMenu);

    function showPage(type) {
      const old = document.querySelector(".subbhu-page");
      if (old) old.remove();

      const page = document.createElement("div");
      page.className = "subbhu-page open";

      const content = {
        downloads: [
          "📥 Download History",
          "Your recent downloads will appear here."
        ],
        settings: [
          "⚙️ Download Settings",
          "🎬 Video Quality: 360p • 480p • 720p • 1080p",
          "🎵 Audio: MP3"
        ],
        help: [
          "❓ How to Use",
          "1. Copy a supported video URL.",
          "2. Paste it into SUBBHU.",
          "3. Tap DOWNLOAD.",
          "4. Choose the download location if Android asks."
        ],
        privacy: [
          "🔒 Privacy",
          "SUBBHU Downloader should only collect information necessary for its features."
        ],
        contact: [
          "💬 Contact / Support",
          "For help with SUBBHU Downloader, please use your official support channel."
        ],
        about: [
          "⚡ About SUBBHU",
          "SUBBHU Downloader",
          "Fast social-media downloader for supported platforms.",
          "Made with ❤️ by SUBBHU."
        ]
      };

      const data = content[type] || content.about;

      page.innerHTML = `
        <button class="subbhu-close">✕</button>
        <div class="subbhu-page-card">
          <h2>${data[0]}</h2>
          ${data.slice(1).map(x => `<p>${x}</p>`).join("")}
        </div>
      `;

      document.body.appendChild(page);

      page.querySelector(".subbhu-close").addEventListener("click", () => {
        page.classList.remove("open");
        setTimeout(() => page.remove(), 300);
      });
    }

    menu.querySelectorAll(".subbhu-menu-item").forEach(item => {
      item.addEventListener("click", () => {
        const type = item.dataset.page;
        closeMenu();
        setTimeout(() => showPage(type), 150);
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        closeMenu();
        const page = document.querySelector(".subbhu-page");
        if (page) page.remove();
      }
    });

    console.log("✅ SUBBHU 3D MENU WORKING");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
