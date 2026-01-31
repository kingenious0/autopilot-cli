const path = require("path");
const fs = require("fs-extra");
const chokidar = require("chokidar");
const execa = require("execa");
const { findRepoRoot } = require("./init");

function loadConfig(root) {
  const cfgPath = path.join(root, ".autopilotrc.json");
  if (!fs.existsSync(cfgPath)) throw new Error("Missing .autopilotrc.json. Run: autopilot init");
  return fs.readJsonSync(cfgPath);
}

function loadIgnores(root) {
  const p = path.join(root, ".autopilotignore");
  if (!fs.existsSync(p)) return [];
  return fs
    .readFileSync(p, "utf8")
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(s => s && !s.startsWith("#"));
}

async function git(root, args, opts = {}) {
  return execa("git", args, { cwd: root, ...opts });
}

async function getBranch(root) {
  const r = await git(root, ["rev-parse", "--abbrev-ref", "HEAD"]);
  return r.stdout.trim();
}

async function hasChanges(root) {
  const r = await git(root, ["status", "--porcelain"]);
  return r.stdout.trim().length > 0;
}

function smartMessage(files, mode) {
  if (mode === "simple") return "chore: update changes";

  const f = files.join(" ");
  if (/\.(md|txt)$/i.test(f)) return "docs: update content";
  if (/\.(test|spec)\./i.test(f)) return "test: update tests";
  if (/\.(ts|tsx|js|jsx)$/i.test(f)) return "chore: update code";
  if (/\.(json|yml|yaml)$/i.test(f)) return "chore: update config";
  return "chore: update changes";
}

async function runChecks(root, checks) {
  for (const cmd of checks) {
    const [bin, ...args] = cmd.split(" ");
    const p = await execa(bin, args, { cwd: root, reject: false });
    if (p.exitCode !== 0) {
      console.log(`❌ Check failed: ${cmd}`);
      console.log(p.stdout);
      console.log(p.stderr);
      return false;
    }
  }
  return true;
}

async function startWatcher() {
  const root = findRepoRoot();
  const cfg = loadConfig(root);
  const ignores = loadIgnores(root);

  const pidPath = path.join(root, ".autopilot.pid");
  if (fs.existsSync(pidPath)) {
    console.log("⚠️ Autopilot already running (PID file exists). Run: autopilot stop");
    return;
  }

  // Write current process PID
  fs.writeFileSync(pidPath, String(process.pid), "utf8");

  let lastEvent = Date.now();
  let lastCommit = 0;

  const watcher = chokidar.watch(root, {
    ignored: (p) => {
      const rel = path.relative(root, p).replace(/\\/g, "/");
      if (rel.startsWith(".git/")) return true;
      return ignores.some(rule => {
        if (rule.endsWith("/") && rel.startsWith(rule)) return true;
        if (rule.startsWith("*.") && rel.endsWith(rule.slice(1))) return true;
        return rel === rule;
      });
    },
    ignoreInitial: true,
    persistent: true
  });

  watcher.on("all", () => {
    lastEvent = Date.now();
  });

  console.log("🚀 Autopilot started in:", root);
  console.log("Blocked branches:", cfg.blockBranches.join(", "));
  console.log("Auto-push:", cfg.autoPush);

  const interval = setInterval(async () => {
    try {
      const now = Date.now();

      // debounce
      if (now - lastEvent < cfg.debounceSeconds * 1000) return;

      // anti-spam
      if (now - lastCommit < cfg.minSecondsBetweenCommits * 1000) return;

      if (!(await hasChanges(root))) return;

      const branch = await getBranch(root);
      if (cfg.blockBranches.includes(branch)) {
        console.log(`⚠️ On ${branch} — refusing to commit/push. Switch to a dev branch.`);
        lastCommit = now;
        return;
      }

      if (cfg.requireChecks && cfg.checks?.length) {
        const ok = await runChecks(root, cfg.checks);
        if (!ok) {
          lastCommit = now;
          return;
        }
      }

      const status = await git(root, ["status", "--porcelain"]);
      const files = status.stdout.split(/\r?\n/).filter(Boolean).map(l => l.slice(3));

      const msg = smartMessage(files, cfg.commitMessageMode);

      await git(root, ["add", "-A"]);
      const commit = await git(root, ["commit", "-m", msg], { reject: false });
      if (commit.exitCode !== 0) {
        lastCommit = now;
        return;
      }

      if (cfg.autoPush) {
        await git(root, ["push", "-u", "origin", branch], { reject: false });
        console.log(`✅ Committed + pushed (${branch}): ${msg}`);
      } else {
        console.log(`✅ Committed (${branch}): ${msg}`);
      }

      lastCommit = now;
    } catch (e) {
      console.log("⚠️ Error:", e.message || e);
    }
  }, 2000);

  // Clean shutdown
  const cleanup = async () => {
    clearInterval(interval);
    await watcher.close();
    fs.removeSync(pidPath);
    process.exit(0);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
}

module.exports = { startWatcher };
