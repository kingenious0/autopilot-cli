const path = require('path');
const os = require('os');
const fs = require('fs-extra');

const getConfigDir = () => {
  const configDir = path.join(os.homedir(), '.autopilot');
  return configDir;
};

const getStateFile = () => {
  const configDir = getConfigDir();
  return path.join(configDir, 'state.json');
};

const getPidFile = () => {
  const configDir = getConfigDir();
  return path.join(configDir, 'autopilot.pid');
};

const getLogFile = () => {
  const configDir = getConfigDir();
  return path.join(configDir, 'autopilot.log');
};

const ensureConfigDir = async () => {
  const configDir = getConfigDir();
  await fs.ensureDir(configDir);
};

const getConfigPath = (repoPath) => {
  return path.join(repoPath, '.autopilot.json');
};

module.exports = {
  getConfigDir,
  getStateFile,
  getPidFile,
  getLogFile,
  ensureConfigDir,
  getConfigPath,
};
