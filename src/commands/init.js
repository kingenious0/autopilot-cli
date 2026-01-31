const path = require("path");
const fs = require("fs-extra");

const DEFAULT_IGNORE = `node_modules/
dist/
build/
.next/
.env
.env.*
coverage/
*.log
.DS_Store
`;

const DEFAULT_CONFIG = {
  debounceSeconds: 20,
  minSecondsBetweenCommits: 180,
  autoPush: true,
  blockBranches: ["main", "master"],
  requireChecks: false,
  checks: [],
  commitMessageMode: "smart" // smart | simple
};

function findRepoRoot() {
  const root = process.cwd();
  if (!fs.existsSync(path.join(root, ".git"))) {
    throw new Error("Not a git repo. Run this inside a repository folder.");
  }
  return root;
}

async function initRepo() {
  const root = findRepoRoot();
  const ignorePath = path.join(root, ".autopilotignore");
  const configPath = path.join(root, ".autopilotrc.json");

  if (!fs.existsSync(ignorePath)) {
    await fs.writeFile(ignorePath, DEFAULT_IGNORE, "utf8");
    console.log("✅ Created .autopilotignore");
  } else {
    console.log("ℹ️ .autopilotignore already exists");
  }

  if (!fs.existsSync(configPath)) {
    await fs.writeJson(configPath, DEFAULT_CONFIG, { spaces: 2 });
    console.log("✅ Created .autopilotrc.json");
  } else {
    console.log("ℹ️ .autopilotrc.json already exists");
  }

  console.log("Done. Next: autopilot start");
}

module.exports = { initRepo, findRepoRoot };
