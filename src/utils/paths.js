/**
 * Path utilities for Autopilot
 * Built by Praise Masunga (PraiseTechzw)
 */

const path = require('path');
const os = require('os');
const fs = require('fs-extra');

/**
 * Get path to config file in repository
 * @param {string} repoPath - Repository path
 * @returns {string} Config file path
 */
const getConfigPath = (repoPath) => {
  return path.join(repoPath, '.autopilotrc.json');
};

/**
 * Get path to ignore file in repository
 * @param {string} repoPath - Repository path
 * @returns {string} Ignore file path
 */
const getIgnorePath = (repoPath) => {
  return path.join(repoPath, '.autopilotignore');
};

/**
 * Get path to .git directory
 * @param {string} repoPath - Repository path
 * @returns {string} .git directory path
 */
const getGitPath = (repoPath) => {
  return path.join(repoPath, '.git');
};

/**
 * Get global config directory
 * @returns {string} Config directory path
 */
const getConfigDir = () => {
  return path.join(os.homedir(), '.autopilot');
};

/**
 * Get PID file path
 * @returns {string} PID file path
 */
const getPidFile = () => {
  return path.join(getConfigDir(), 'autopilot.pid');
};

/**
 * Get state file path
 * @returns {string} State file path
 */
const getStateFile = () => {
  return path.join(getConfigDir(), 'state.json');
};

/**
 * Ensure config directory exists
 * @returns {Promise<void>}
 */
const ensureConfigDir = async () => {
  await fs.ensureDir(getConfigDir());
};

module.exports = {
  getConfigPath,
  getIgnorePath,
  getGitPath,
  getConfigDir,
  getPidFile,
  getStateFile,
  ensureConfigDir,
};
