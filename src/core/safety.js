const logger = require('../utils/logger');

const validateConfig = (config) => {
  const errors = [];

  if (!config) {
    errors.push('Configuration is missing');
    return errors;
  }

  if (config.commitMessage && typeof config.commitMessage !== 'string') {
    errors.push('commitMessage must be a string');
  }

  if (config.autoPush && typeof config.autoPush !== 'boolean') {
    errors.push('autoPush must be a boolean');
  }

  if (config.ignore && !Array.isArray(config.ignore)) {
    errors.push('ignore must be an array');
  }

  return errors;
};

const validateBeforeCommit = async (repoPath) => {
  const errors = [];

  // Add safety checks before committing
  // For example, check for large files, sensitive files, etc.

  return errors;
};

module.exports = {
  validateConfig,
  validateBeforeCommit,
};
