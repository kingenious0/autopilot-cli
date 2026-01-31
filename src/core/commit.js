const logger = require('../utils/logger');
const git = require('./git');

const stageAndCommit = async (repoPath, message) => {
  try {
    const staged = await git.stageAllChanges(repoPath);
    if (!staged) {
      logger.error('Failed to stage changes');
      return false;
    }

    const committed = await git.commit(repoPath, message);
    return committed;
  } catch (error) {
    logger.error(`Stage and commit failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  stageAndCommit,
};
