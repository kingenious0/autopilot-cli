const path = require("path");
const fs = require("fs-extra");
const { findRepoRoot } = require("./init");

function statusWatcher() {
  const root = findRepoRoot();
  const pidPath = path.join(root, ".autopilot.pid");
  if (!fs.existsSync(pidPath)) {
    console.log("⛔ Not running.");
    return;
  }
  const pid = fs.readFileSync(pidPath, "utf8").trim();
  console.log("✅ Running. PID:", pid);
  console.log("Tip: check your terminal logs for activity.");
}

module.exports = { statusWatcher };
