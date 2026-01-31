const path = require("path");
const fs = require("fs-extra");
const { findRepoRoot } = require("./init");

function stopWatcher() {
  const root = findRepoRoot();
  const pidPath = path.join(root, ".autopilot.pid");
  if (!fs.existsSync(pidPath)) {
    console.log("⛔ Not running.");
    return;
  }

  const pid = Number(fs.readFileSync(pidPath, "utf8").trim());
  try {
    process.kill(pid);
    console.log("🛑 Stopped. PID:", pid);
  } catch {
    console.log("⚠️ Could not kill process, removing PID file.");
  }
  fs.removeSync(pidPath);
}

module.exports = { stopWatcher };
