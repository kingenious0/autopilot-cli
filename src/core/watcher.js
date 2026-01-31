const chokidar = require('chokidar');
const logger = require('../utils/logger');
const git = require('./git');
const { stageAndCommit } = require('./commit');

class Watcher {
  constructor(repoPath, config = {}) {
    this.repoPath = repoPath;
    this.config = config;
    this.watcher = null;
    this.isWatching = false;
  }

  async start() {
    if (this.isWatching) {
      logger.warn('Watcher is already running');
      return;
    }

    logger.section('Starting Autopilot Watcher');

    const isGit = await git.isGitRepo(this.repoPath);
    if (!isGit) {
      logger.error('Not a git repository');
      return;
    }

    const branch = await git.getCurrentBranch(this.repoPath);
    logger.info(`Watching repository on branch: ${branch}`);

    const ignorePatterns = this.config.ignore || [
      'node_modules',
      '.git',
      '.env',
      'dist',
      'build',
    ];

    this.watcher = chokidar.watch(this.repoPath, {
      ignored: ignorePatterns,
      ignoreInitial: true,
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    });

    this.watcher.on('change', (filepath) => this.onFileChange(filepath));
    this.watcher.on('add', (filepath) => this.onFileChange(filepath));
    this.watcher.on('error', (error) => logger.error(`Watcher error: ${error.message}`));

    this.isWatching = true;
    logger.success('Autopilot is watching for changes');
  }

  async onFileChange(filepath) {
    logger.info(`File changed: ${filepath}`);

    const hasChanges = await git.hasUnstagedChanges(this.repoPath);
    if (!hasChanges) {
      logger.debug('No staged changes to commit');
      return;
    }

    const message = this.config.commitMessage || `autopilot: ${filepath}`;
    const success = await stageAndCommit(this.repoPath, message);

    if (success && this.config.autoPush) {
      const branch = await git.getCurrentBranch(this.repoPath);
      await git.push(this.repoPath, branch);
    }
  }

  async stop() {
    if (!this.isWatching) {
      logger.warn('Watcher is not running');
      return;
    }

    if (this.watcher) {
      await this.watcher.close();
    }

    this.isWatching = false;
    logger.success('Autopilot watcher stopped');
  }

  isRunning() {
    return this.isWatching;
  }
}

module.exports = Watcher;
