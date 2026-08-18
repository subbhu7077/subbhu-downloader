const fs = require("fs");
const p = "server.js";
let s = fs.readFileSync(p, "utf8");

const route = `
app.post("/api/audio", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({success:false,message:"Please enter a URL"});

    const { execFile } = require("child_process");
    const { promisify } = require("util");
    const exec = promisify(execFile);

    await exec("python", [
      "-m","yt_dl","--no-cache-dir","--no-playlist",
      "-f","bestaudio",
      "-o","/sdcard/Download/SUBBHU_AUDIO_%(id)s.%(ext)s",
      url
    ]);

    res.json({success:true,type:"audio",message:"Audio downloaded successfully."});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
});
`;

if (!s.includes('app.post("/api/audio"')) {
  const pos = s.lastIndexOf("app.listen(");
  s = s.slice(0,pos) + route + "\n" + s.slice(pos);
  fs.writeFileSync(p,s);
  console.log("✅ Audio route added");
} else {
  console.log("✅ Audio route already exists");
}
