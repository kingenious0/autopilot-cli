# 🚀 Autopilot CLI

<div align="center">

![Autopilot Logo](https://img.shields.io/badge/Autopilot-CLI-blue?style=for-the-badge&logo=git&logoColor=white)

**Intelligent Git automation that commits and pushes your code, so you can focus on building.**

[![npm version](https://img.shields.io/npm/v/autopilot-cli?style=flat-square&color=success)](https://www.npmjs.com/package/autopilot-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square)](https://nodejs.org)
[![Downloads](https://img.shields.io/npm/dm/autopilot-cli?style=flat-square&color=blue)](https://www.npmjs.com/package/autopilot-cli)
[![GitHub Stars](https://img.shields.io/github/stars/praisetechzw/autopilot-cli?style=flat-square&color=gold)](https://github.com/praisetechzw/autopilot-cli/stargazers)
[![Build Status](https://img.shields.io/github/actions/workflow/status/praisetechzw/autopilot-cli/ci.yml?style=flat-square)](https://github.com/praisetechzw/autopilot-cli/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**Built by [Praise Masunga](https://github.com/praisetechzw) (PraiseTechzw)**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-usage-examples) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Why Autopilot?](#-why-autopilot)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Commands](#-commands)
- [Configuration](#-configuration)
- [Safety Features](#-safety-features)
- [Usage Examples](#-usage-examples)
- [Architecture](#-architecture)
- [Extending Autopilot](#-extending-autopilot)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🎯 Why Autopilot?

<table>
<tr>
<td width="50%">

### ❌ Before Autopilot

```bash
# Every. Single. Time.
git add .
git commit -m "update stuff"
git push

# Repeat 50+ times a day...
# Lose focus on coding
# Forget to commit
# Inconsistent messages
```

</td>
<td width="50%">

### ✅ With Autopilot

```bash
# One time setup
autopilot init
autopilot start

# That's it! 
# Focus on coding
# Auto-commits with smart messages
# Never lose work again
```

</td>
</tr>
</table>

---

## ✨ Features

<table>
<tr>
<td width="33%" align="center">

### 🧠 **Smart Commits**

Generates professional conventional commit messages automatically

```
feat(auth): add OAuth2 login
fix(api): resolve race condition
docs: update installation guide
```

</td>
<td width="33%" align="center">

### 🛡️ **Safety First**

Protected branches, large file detection, sensitive data blocking, conflict detection

```
✅ Protected branches
✅ Size limits
✅ Secret detection
✅ Conflict detection
```

</td>
<td width="33%" align="center">

### ⚡ **Lightning Fast**

Debounced file watching, rate limiting, zero configuration needed

```
📁 Watches all files
⏱️ Smart debouncing
🚫 Respects .gitignore
🎯 Zero config
```

</td>
</tr>
</table>

### Core Features

| Feature | Description | Status |
|---------|-------------|:------:|
| 🤖 Auto-commit | Automatically commits file changes | ✅ |
| 📝 Smart messages | Context-aware conventional commits | ✅ |
| 🔒 Branch protection | Prevents commits on main/master | ✅ |
| 📊 File size checks | Blocks large files from commits | ✅ |
| 🔐 Secret detection | Prevents API keys & passwords | ✅ |
| 🔄 Conflict detection | Pauses on merge conflicts | ✅ |
| 🎣 Hooks support | Pre/post commit customization | ✅ |
| 🔌 Plugin system | Extensible architecture | ✅ |
| 📈 Monorepo support | Works with multi-package repos | ✅ |
| 🌍 Cross-platform | Linux, macOS, Windows (WSL) | ✅ |

---

## 🚀 Quick Start

### Installation

```bash
# Install globally via npm
npm install -g autopilot-cli
```

### Initialize

```bash
# Navigate to your git repository
cd my-awesome-project

# Initialize Autopilot (creates config files)
autopilot init
```

### Start Watching

```bash
# Start the auto-commit daemon
autopilot start

# ✨ That's it! Your changes are now auto-committed!
```

### Check Status

```bash
# View current status
autopilot status

# Output:
# ✅ Autopilot is running (PID: 12345)
# 📂 Repository: /path/to/my-awesome-project
# 🌿 Branch: feature/new-api
# ⏱️  Last commit: 2 minutes ago
```

### Stop Watching

```bash
# Stop the daemon
autopilot stop

# Output:
# ✅ Autopilot stopped successfully
```

---

## 💿 Installation

<details>
<summary><b>📦 npm (Recommended)</b></summary>

### Global Installation
```bash
npm install -g autopilot-cli
autopilot --version
```

### Local Installation (per project)
```bash
npm install --save-dev autopilot-cli
npx autopilot init
```

</details>

<details>
<summary><b>🐙 GitHub (Development)</b></summary>

```bash
# Clone repository
git clone https://github.com/praisetechzw/autopilot-cli.git
cd autopilot-cli

# Install dependencies
npm install

# Link globally
npm link

# Verify installation
autopilot --version
```

</details>

<details>
<summary><b>🐳 Docker</b></summary>

```dockerfile
FROM node:18-alpine
RUN npm install -g autopilot-cli
WORKDIR /repo
CMD ["autopilot", "start"]
```

```bash
docker run -v $(pwd):/repo autopilot-cli
```

</details>

---

## 🎮 Commands

| Command | Description | Example |
|---------|-------------|---------|
| `init` | Initialize configuration files | `autopilot init` |
| `start` | Start the file watcher daemon | `autopilot start` |
| `stop` | Stop the running daemon | `autopilot stop` |
| `status` | Show daemon status and config | `autopilot status` |
| `doctor` | Diagnose issues and validate setup | `autopilot doctor` |

### Command Details

#### `autopilot init`

Creates configuration files in your repository:

```bash
autopilot init

# Creates:
# ✅ .autopilotrc.json     (configuration)
# ✅ .autopilotignore      (ignore patterns)
# ✅ autopilot.log         (log file)
```

**Options:**
- `--force` - Overwrite existing configuration
- `--template <name>` - Use a specific template (basic, advanced, monorepo)

#### `autopilot start`

Starts the file watcher daemon:

```bash
autopilot start

# Options:
# --verbose    Show detailed logging
# --dry-run    Simulate commits without executing
# --no-push    Disable auto-push even if configured
```

#### `autopilot status`

Shows current status and configuration:

```bash
autopilot status

# Output includes:
# - Daemon status (running/stopped)
# - Process ID (PID)
# - Repository path
# - Current branch
# - Last commit info
# - Configuration summary
```

#### `autopilot doctor`

Diagnoses common issues:

```bash
autopilot doctor

# Checks:
# ✅ Git installation
# ✅ Repository validity
# ✅ Remote configuration
# ✅ Branch tracking
# ✅ Large files
# ✅ Sensitive files
# ✅ Configuration errors
```

---

## ⚙️ Configuration

Create `.autopilotrc.json` in your repository root:

### Basic Configuration

```json
{
  "watchDebounceMs": 2000,
  "minCommitIntervalSec": 60,
  "autoPush": false,
  "protectedBranches": ["main", "master"],
  "commitMessageMode": "smart"
}
```

### Advanced Configuration

```json
{
  "watchDebounceMs": 2000,
  "minCommitIntervalSec": 180,
  "autoPush": true,
  "protectedBranches": ["main", "master", "production"],
  "commitMessageMode": "smart",
  
  "safety": {
    "checkLargeFiles": true,
    "maxFileSizeKb": 1024,
    "detectSensitiveFiles": true,
    "checkForConflicts": true,
    "blockPatterns": [
      "*.env*",
      "*.pem",
      "*.key",
      "secrets.json"
    ]
  },
  
  "hooks": {
    "preCommit": "npm run lint && npm test",
    "postCommit": "npm run build",
    "postPush": "npm run deploy:staging"
  },
  
  "logging": {
    "level": "info",
    "file": "autopilot.log",
    "maxSizeMb": 10,
    "maxFiles": 5
  },
  
  "git": {
    "author": "Autopilot Bot <autopilot@example.com>",
    "signCommits": false,
    "gpgKeyId": null
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `watchDebounceMs` | number | `2000` | Wait time after file changes (ms) |
| `minCommitIntervalSec` | number | `60` | Minimum time between commits (sec) |
| `autoPush` | boolean | `false` | Automatically push after commit |
| `protectedBranches` | string[] | `["main","master"]` | Branches to skip auto-commits |
| `commitMessageMode` | string | `"smart"` | `smart` or `simple` |

📖 **[Full Configuration Reference →](./docs/CONFIGURATION.md)**

---

## 🛡️ Safety Features

<table>
<tr>
<td width="50%">

### 🔒 Branch Protection

Prevents accidental commits to production branches:

```json
{
  "protectedBranches": [
    "main",
    "master",
    "production",
    "staging"
  ]
}
```

**Result:**
```
⚠️  Branch 'main' is protected
❌ Auto-commit skipped
💡 Switch to a feature branch
```

</td>
<td width="50%">

### 📊 Large File Detection

Blocks files exceeding size limits:

```json
{
  "safety": {
    "checkLargeFiles": true,
    "maxFileSizeKb": 1024
  }
}
```

**Result:**
```
⚠️  Large file detected:
   video.mp4 (5.2 MB)
❌ Exceeds limit (1 MB)
💡 Add to .gitignore
```

</td>
</tr>
<tr>
<td width="50%">

### 🔐 Sensitive File Detection

Prevents committing secrets:

```json
{
  "safety": {
    "detectSensitiveFiles": true,
    "blockPatterns": [
      "*.env*",
      "*.pem",
      "*.key",
      "secrets.json"
    ]
  }
}
```

**Result:**
```
🚨 Sensitive file detected:
   .env.production
❌ Contains API keys
💡 Add to .gitignore
```

</td>
<td width="50%">

### 🔄 Conflict Detection

Pauses during merge conflicts:

```json
{
  "safety": {
    "checkForConflicts": true
  }
}
```

**Result:**
```
⚠️  Merge conflict detected
❌ Auto-commit paused
💡 Resolve conflicts first
   git mergetool
```

</td>
</tr>
</table>

📖 **[Complete Safety Guide →](./docs/SAFETY-FEATURES.md)**

---

## 💡 Usage Examples

### Example 1: Basic Auto-Commit

Perfect for personal projects:

```bash
# Initialize
autopilot init

# Start watching
autopilot start

# Your commits will look like:
# ✅ feat(api): add user authentication endpoint
# ✅ fix(ui): resolve button alignment issue
# ✅ docs: update installation instructions
```

### Example 2: With Auto-Push

For continuous deployment:

```json
{
  "autoPush": true,
  "protectedBranches": ["main"],
  "hooks": {
    "postPush": "npm run deploy"
  }
}
```

```bash
autopilot start

# Now:
# 1. Files saved → Auto-commit
# 2. Committed → Auto-push
# 3. Pushed → Deploy triggered
```

### Example 3: Monorepo Setup

For workspaces with multiple packages:

```json
{
  "commitMessageMode": "smart",
  "hooks": {
    "preCommit": "npm run workspace:lint && npm run workspace:test",
    "postCommit": "npm run workspace:build"
  },
  "safety": {
    "checkLargeFiles": true,
    "maxFileSizeKb": 500
  }
}
```

### Example 4: Team Workflow

For collaborative development:

```json
{
  "minCommitIntervalSec": 300,
  "protectedBranches": ["main", "develop", "staging"],
  "git": {
    "author": "Autopilot Bot <bot@team.com>"
  },
  "hooks": {
    "preCommit": "npm run lint && npm test",
    "postPush": "curl -X POST https://slack.com/webhook..."
  }
}
```

---

## 🏗️ Architecture

Autopilot follows a clean, layered architecture:

```
┌─────────────────────────────────────────────┐
│            CLI Layer                        │
│  (commands: init, start, stop, status)      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           Core Layer                        │
│  (watcher, committer, message generator)    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Config Layer                       │
│  (settings, validation, defaults)           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Daemon Layer                       │
│  (process management, PID tracking)         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Utils Layer                        │
│  (git ops, file ops, logging)               │
└─────────────────────────────────────────────┘
```

### Key Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| **CLI** | Command parsing & execution | `src/cli/` |
| **Core** | Business logic & orchestration | `src/core/` |
| **Config** | Configuration management | `src/config/` |
| **Daemon** | Process lifecycle | `src/daemon/` |
| **Safety** | Validation & safety checks | `src/safety/` |
| **Utils** | Pure utility functions | `src/utils/` |

📖 **[Architecture Guide →](./docs/ARCHITECTURE.md)**

---

## 🔌 Extending Autopilot

### Hooks

Execute custom logic at different stages:

```json
{
  "hooks": {
    "preCommit": "npm run lint",
    "postCommit": "npm run build",
    "postPush": "npm run deploy",
    "onError": "npm run notify-team"
  }
}
```

### Custom Commit Message Generator

Create your own message generator:

```javascript
// generators/custom-generator.js
module.exports = {
  generate(files, diff) {
    // Your custom logic
    return `🚀 Deploy: ${files.length} files updated`;
  }
};
```

```json
{
  "commitMessageGenerator": "./generators/custom-generator.js"
}
```

### Plugins

Extend functionality with plugins:

```json
{
  "plugins": [
    "autopilot-plugin-slack",
    "autopilot-plugin-jira",
    "./plugins/my-custom-plugin.js"
  ]
}
```

📖 **[Extension Guide →](./docs/EXTENDING.md)**

---

## 🩺 Troubleshooting

### Quick Diagnosis

```bash
# Run the doctor
autopilot doctor

# Output:
# ✅ Git installed (version 2.39.0)
# ✅ Valid git repository
# ✅ Remote configured
# ⚠️  Large file detected: video.mp4
# ✅ No sensitive files found
# ✅ Configuration valid
```

### Common Issues

<details>
<summary><b>❌ Autopilot won't start</b></summary>

**Symptoms:** `autopilot start` fails or exits immediately

**Solutions:**
1. Check if already running: `autopilot status`
2. Verify git repo: `git status`
3. Check config: `cat .autopilotrc.json`
4. Review logs: `tail -f autopilot.log`

</details>

<details>
<summary><b>❌ No commits happening</b></summary>

**Symptoms:** Files change but no commits

**Solutions:**
1. Check protected branches: Switch to feature branch
2. Verify file patterns: Check `.autopilotignore`
3. Check interval: Wait for `minCommitIntervalSec`
4. Enable verbose logging: `autopilot start --verbose`

</details>

<details>
<summary><b>❌ Push failures</b></summary>

**Symptoms:** Commits succeed but pushes fail

**Solutions:**
1. Check remote: `git remote -v`
2. Test manual push: `git push`
3. Verify credentials: `git credential fill`
4. Check network: `ping github.com`

</details>

📖 **[Complete Troubleshooting Guide →](./docs/TROUBLESHOOTING.md)**

---

## 🤝 Contributing

We love contributions! Here's how to get started:

### Quick Contribution

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/autopilot-cli.git
cd autopilot-cli

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm test

# Commit with conventional commits
git commit -m "feat: add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

### Contribution Guidelines

- ✅ Follow conventional commits
- ✅ Add tests for new features
- ✅ Update documentation
- ✅ Pass all CI checks
- ✅ Keep PRs focused and small

📖 **[Contributing Guide →](./CONTRIBUTING.md)**

---

## 🗺️ Roadmap

### ✅ Phase 1 - Core (Completed)

- [x] Basic commands (init, start, stop, status)
- [x] File watching and debouncing
- [x] Smart commit messages
- [x] Safety checks
- [x] Configuration system
- [x] Process management

### 🔄 Phase 2 - Enhancement (In Progress)

- [x] Hook system
- [x] Plugin architecture
- [ ] Custom generators
- [ ] Advanced logging
- [ ] Performance optimizations
- [ ] Windows support improvements

### 📅 Phase 3 - Integration (Planned)

- [ ] GitHub/GitLab API integration
- [ ] Slack/Discord notifications
- [ ] Jira ticket linking
- [ ] CI/CD webhooks
- [ ] Team collaboration features
- [ ] Analytics dashboard

### 🚀 Phase 4 - Enterprise (Future)

- [ ] Multi-repository support
- [ ] Centralized configuration
- [ ] Role-based permissions
- [ ] Audit logging
- [ ] Compliance reporting
- [ ] SaaS platform

---

## 📊 Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/praisetechzw/autopilot-cli?style=flat-square)
![GitHub code size](https://img.shields.io/github/languages/code-size/praisetechzw/autopilot-cli?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/praisetechzw/autopilot-cli?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/praisetechzw/autopilot-cli?style=flat-square)

</div>

---

## 📄 License

<div align="center">

**MIT License**

Copyright © 2026 **Praise Masunga (PraiseTechzw)**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full License Text →](./LICENSE)

</div>

---

## 🙏 Acknowledgments

Autopilot stands on the shoulders of giants:

| Project | Purpose | License |
|---------|---------|---------|
| [chokidar](https://github.com/paulmillr/chokidar) | File system watcher | MIT |
| [commander.js](https://github.com/tj/commander.js) | CLI framework | MIT |
| [fs-extra](https://github.com/jprichardson/node-fs-extra) | Enhanced file operations | MIT |
| [chalk](https://github.com/chalk/chalk) | Terminal styling | MIT |
| [ora](https://github.com/sindresorhus/ora) | Elegant spinners | MIT |

---

## 💬 Community

<div align="center">

[![GitHub Discussions](https://img.shields.io/github/discussions/praisetechzw/autopilot-cli?style=flat-square)](https://github.com/praisetechzw/autopilot-cli/discussions)
[![Twitter Follow](https://img.shields.io/twitter/follow/praisetechzw?style=flat-square&logo=twitter)](https://twitter.com/praisetechzw)
[![Discord](https://img.shields.io/discord/YOUR_DISCORD_ID?style=flat-square&logo=discord&label=Discord)](https://discord.gg/YOUR_INVITE)

**Join the community:**
- 💬 [GitHub Discussions](https://github.com/praisetechzw/autopilot-cli/discussions)
- 🐛 [Report Issues](https://github.com/praisetechzw/autopilot-cli/issues)
- 📧 [Email Support](mailto:praise@praisetechzw.dev)
- 🐦 [Twitter Updates](https://twitter.com/praisetechzw)

</div>

---

## ⭐ Show Your Support

<div align="center">

**If you find Autopilot useful, please consider:**

[![Star on GitHub](https://img.shields.io/github/stars/praisetechzw/autopilot-cli?style=social)](https://github.com/praisetechzw/autopilot-cli/stargazers)
[![Follow on GitHub](https://img.shields.io/github/followers/praisetechzw?style=social)](https://github.com/praisetechzw)
[![Tweet](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fpraisetechzw%2Fautopilot-cli)](https://twitter.com/intent/tweet?text=Check%20out%20Autopilot%20CLI!&url=https://github.com/praisetechzw/autopilot-cli)

⭐ **Star the repository**  
🐦 **Share on Twitter**  
📝 **Write a blog post**  
💬 **Tell your friends**

</div>

---

<div align="center">

**Built with ❤️ by [Praise Masunga](https://github.com/praisetechzw) (PraiseTechzw)**

[![Portfolio](https://img.shields.io/badge/Portfolio-praisetechzw.dev-blue?style=flat-square)](https://praisetechzw.dev)
[![GitHub](https://img.shields.io/badge/GitHub-praisetechzw-black?style=flat-square&logo=github)](https://github.com/praisetechzw)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Praise%20Masunga-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/praisetechzw)
[![Twitter](https://img.shields.io/badge/Twitter-@praisetechzw-blue?style=flat-square&logo=twitter)](https://twitter.com/praisetechzw)

**© 2026 Praise Masunga. All rights reserved.**

[⬆ Back to Top](#-autopilot-cli)

</div>