const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

const readIgnoreFile = async (repoPath) => {
  const ignorePath = path.join(repoPath, '.autopilot-ignore');
  try {
    if (await fs.pathExists(ignorePath)) {
      const content = await fs.readFile(ignorePath, 'utf-8');
      return content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#'));
    }
  } catch (error) {
    logger.debug(`Error reading ignore file: ${error.message}`);
  }
  return [];
};

const createIgnoreFile = async (repoPath, patterns = []) => {
  const ignorePath = path.join(repoPath, '.autopilot-ignore');
  try {
    const content =
      `# Autopilot Ignore File\n# Add patterns to exclude from autopilot watching\n\n` +
      patterns.join('\n');
    await fs.writeFile(ignorePath, content);
    logger.success('Created .autopilot-ignore file');
  } catch (error) {
    logger.error(`Failed to create ignore file: ${error.message}`);
  }
};

module.exports = {
  readIgnoreFile,
  createIgnoreFile,
};
