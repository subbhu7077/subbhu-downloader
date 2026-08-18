(function () {
  if (document.getElementById("subbhuMenuBtn")) return;

  const style = document.createElement("style");
  style.textContent = `
    #subbhuMenuBtn{
      position:fixed;right:18px;top:88px;z-index:999999;
      width:54px;height:54px;border-radius:18px;
      border:1px solid rgba(255,255,255,.22);
      background:linear-gradient(145deg,#19192b,#07070d);
      color:white;font-size:30px;line-height:1;
      box-shadow:0 10px 35px rgba(0,0,0,.55),0 0 25px rgba(100,70,255,.25);
      cursor:pointer;transition:.35s;
    }
    #subbhuMenuBtn.active{transform:rotate(90deg) scale(1.05)}

    #subbhuMenu{
      position:fixed;right:18px;top:153px;z-index:999998;
      width:290px;padding:14px;border-radius:24px;
      background:rgba(10,10,20,.94);
      border:1px solid rgba(255,255,255,.16);
      backdrop-filter:blur(25px);
      box-shadow:0 25px 70px rgba(0,0,0,.7),0 0 45px rgba(80,60,255,.25);
      opacity:0;visibility:hidden;
      transform:perspective(700px) rotateX(-18deg) translateY(-15px) scale(.9);
      transform-origin:top right;
      transition:.35s cubic-bezier(.2,.8,.2,1);
    }
    #subbhuMenu.open{
      opacity:1;visibility:visible;
      transform:perspective(700px) rotateX(0) translateY(0) scale(1);
    }

    .subbhuTitle{
      color:white;font-weight:900;font-size:18px;
      padding:8px 10px 14px;letter-spacing:1px;
    }
    .subbhuTitle span{color:#7c5cff}

    .subbhuItem{
      display:flex;align-items:center;gap:12px;
      width:100%;box-sizing:border-box;
      padding:12px;margin:5px 0;
      border-radius:15px;
      border:1px solid rgba(255,255,255,.08);
      background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
      color:#fff;cursor:pointer;
      transition:.25s;
    }
    .subbhuItem:active{
      transform:scale(.96) translateX(-3px);
    }
    .subbhuItem:hover{
      transform:translateX(-5px);
      border-color:rgba(100,100,255,.55);
      background:linear-gradient(135deg,rgba(100,70,255,.25),rgba(0,190,255,.08));
    }
    .subbhuIcon{
      width:36px;height:36px;min-width:36px;
      display:grid;place-items:center;
      border-radius:11px;
      background:linear-gradient(135deg,#654cff,#00b9ff);
      font-size:18px;
    }
    .subbhuText{font-weight:700}
    .subbhuText small{
      display:block;color:#888;font-size:10px;
      margin-top:3px;font-weight:500;
    }

    #subbhuModal{
      position:fixed;inset:0;z-index:9999999;
      display:none;align-items:center;justify-content:center;
      padding:20px;background:rgba(0,0,0,.75);
      backdrop-filter:blur(8px);
    }
    #subbhuModal.show{display:flex}
    .subbhuBox{
      width:min(430px,100%);max-height:80vh;overflow:auto;
      padding:24px;border-radius:25px;
      background:linear-gradient(145deg,#171725,#08080e);
      border:1px solid rgba(255,255,255,.16);
      color:white;box-shadow:0 30px 90px rgba(0,0,0,.8);
      animation:subbhuPop .3s ease;
    }
    @keyframes subbhuPop{
      from{opacity:0;transform:perspective(700px) rotateX(-20deg) scale(.8)}
      to{opacity:1;transform:perspective(700px) rotateX(0) scale(1)}
    }
    .subbhuBox h2{margin-top:0}
    .subbhuBox p,.subbhuBox li{color:#aaa;line-height:1.6}
    .subbhuClose{
      float:right;border:0;background:#29293b;
      color:white;border-radius:10px;padding:8px 12px;
    }

    @media(max-width:600px){
      #subbhuMenuBtn{right:14px;top:85px}
      #subbhuMenu{right:14px;top:148px;width:calc(100vw - 28px)}
    }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.id = "subbhuMenuBtn";
  btn.innerHTML = "⋮";
  document.body.appendChild(btn);

  const menu = document.createElement("div");
  menu.id = "subbhuMenu";

  menu.innerHTML = `
    <div class="subbhuTitle">⚡ <span>SUBBHU</span> MENU</div>

    <div class="subbhuItem" data-page="home">
      <div class="subbhuIcon">🏠</div>
      <div class="subbhuText">Home<small>Back to downloader</small></div>
    </div>

    <div class="subbhuItem" data-page="history">
      <div class="subbhuIcon">📥</div>
      <div class="subbhuText">Download History<small>Recent downloads</small></div>
    </div>

    <div class="subbhuItem" data-page="platforms">
      <div class="subbhuIcon">🎬</div>
      <div class="subbhuText">Supported Platforms<small>TikTok • Instagram • YouTube</small></div>
    </div>

    <div class="subbhuItem" data-page="settings">
      <div class="subbhuIcon">⚙️</div>
      <div class="subbhuText">Download Settings<small>Quality & format</small></div>
    </div>

    <div class="subbhuItem" data-page="downloads">
      <div class="subbhuIcon">📂</div>
      <div class="subbhuText">My Downloads<small>Downloaded files</small></div>
    </div>

    <div class="subbhuItem" data-page="help">
      <div class="subbhuIcon">❓</div>
      <div class="subbhuText">How to Use<small>Download guide</small></div>
    </div>

    <div class="subbhuItem" data-page="privacy">
      <div class="subbhuIcon">🔒</div>
      <div class="subbhuText">Privacy<small>Privacy information</small></div>
    </div>

    <div class="subbhuItem" data-page="contact">
      <div class="subbhuIcon">📞</div>
      <div class="subbhuText">Contact / Support<small>Get help</small></div>
    </div>

    <div class="subbhuItem" data-page="about">
      <div class="subbhuIcon">ℹ️</div>
      <div class="subbhuText">About SUBBHU<small>Downloader information</small></div>
    </div>
  `;

  document.body.appendChild(menu);

  const modal = document.createElement("div");
  modal.id = "subbhuModal";
  modal.innerHTML = `
    <div class="subbhuBox">
      <button class="subbhuClose">✕</button>
      <div id="subbhuContent"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const content = document.getElementById("subbhuContent");

  function closeMenu(){
    menu.classList.remove("open");
    btn.classList.remove("active");
  }

  function show(title, html){
    content.innerHTML = "<h2>" + title + "</h2>" + html;
    modal.classList.add("show");
    closeMenu();
  }

  btn.onclick = function(e){
    e.stopPropagation();
    menu.classList.toggle("open");
    btn.classList.toggle("active");
  };

  document.addEventListener("click", function(e){
    if(!menu.contains(e.target) && e.target !== btn) closeMenu();
  });

  modal.querySelector(".subbhuClose").onclick = function(){
    modal.classList.remove("show");
  };

  menu.querySelectorAll(".subbhuItem").forEach(function(item){
    item.onclick = function(){
      const page = item.dataset.page;

      if(page === "home"){
        closeMenu();
        window.scrollTo({top:0,behavior:"smooth"});
      }

      if(page === "history"){
        let h = JSON.parse(localStorage.getItem("subbhuHistory") || "[]");
        show("📥 Download History",
          h.length
          ? "<p>" + h.map(x => "• " + x).join("</p>") +
            '</p><button onclick="localStorage.removeItem(\\'subbhuHistory\\');location.reload()">🗑️ Clear History</button>'
          : "<p>No download history yet.</p>"
        );
      }

      if(page === "platforms"){
        show("🎬 Supported Platforms",
          "<ul><li>🎵 TikTok</li><li>📸 Instagram</li><li>▶️ YouTube</li><li>📘 Facebook</li><li>𝕏 X</li><li>💠 Pinterest</li></ul>"
        );
      }

      if(page === "settings"){
        show("⚙️ Download Settings",
          "<p>🎥 Video Quality</p><p>360p • 480p • 720p • 1080p</p><p>🎵 Audio</p><p>MP3</p>"
        );
      }

      if(page === "downloads"){
        show("📂 My Downloads",
          "<p>Your downloaded files are saved by your browser according to its download settings.</p>"
        );
      }

      if(page === "help"){
        show("❓ How to Use",
          "<ol><li>Copy a supported video URL.</li><li>Paste it into SUBBHU.</li><li>Tap DOWNLOAD.</li><li>Choose the download location if asked.</li></ol>"
        );
      }

      if(page === "privacy"){
        show("🔒 Privacy",
          "<p>SUBBHU Downloader should only collect information necessary for its features.</p>"
        );
      }

      if(page === "contact"){
        show("📞 Contact / Support",
          "<p>For help with SUBBHU Downloader, use your official support channel.</p>"
        );
      }

      if(page === "about"){
        show("⚡ About SUBBHU",
          "<p><b>SUBBHU Downloader</b></p><p>Fast social-media downloader for supported platforms.</p><p>Made with ❤️ by SUBBHU.</p>"
        );
      }
    };
  });

  console.log("✅ SUBBHU custom menu loaded");
})();
