const { execa } = require('execa');
const logger = require('../utils/logger');

const hasUnstagedChanges = async (repoPath) => {
  try {
    const { stdout } = await execa('git', ['status', '--porcelain'], { cwd: repoPath });
    return stdout.trim().length > 0;
  } catch (error) {
    logger.error(`Git status check failed: ${error.message}`);
    return false;
  }
};

const stageAllChanges = async (repoPath) => {
  try {
    await execa('git', ['add', '.'], { cwd: repoPath });
    logger.debug('All changes staged');
    return true;
  } catch (error) {
    logger.error(`Failed to stage changes: ${error.message}`);
    return false;
  }
};

const commit = async (repoPath, message) => {
  try {
    await execa('git', ['commit', '-m', message], { cwd: repoPath });
    logger.success(`Committed with message: "${message}"`);
    return true;
  } catch (error) {
    logger.error(`Failed to commit: ${error.message}`);
    return false;
  }
};

const push = async (repoPath, branch = 'main') => {
  try {
    await execa('git', ['push', 'origin', branch], { cwd: repoPath });
    logger.success(`Pushed to origin/${branch}`);
    return true;
  } catch (error) {
    logger.error(`Failed to push: ${error.message}`);
    return false;
  }
};

const getCurrentBranch = async (repoPath) => {
  try {
    const { stdout } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: repoPath });
    return stdout.trim();
  } catch (error) {
    logger.error(`Failed to get current branch: ${error.message}`);
    return null;
  }
};

const isGitRepo = async (repoPath) => {
  try {
    await execa('git', ['rev-parse', '--git-dir'], { cwd: repoPath });
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  hasUnstagedChanges,
  stageAllChanges,
  commit,
  push,
  getCurrentBranch,
  isGitRepo,
};
