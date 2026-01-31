const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');
const { DEFAULT_CONFIG } = require('./defaults');
const { getConfigPath } = require('../utils/paths');

const loadConfig = async (repoPath) => {
  const configPath = getConfigPath(repoPath);
  try {
    if (await fs.pathExists(configPath)) {
      const config = await fs.readJson(configPath);
      logger.debug(`Loaded config from ${configPath}`);
      return { ...DEFAULT_CONFIG, ...config };
    }
  } catch (error) {
    logger.warn(`Error loading config: ${error.message}`);
  }
  return { ...DEFAULT_CONFIG };
};

const saveConfig = async (repoPath, config) => {
  const configPath = getConfigPath(repoPath);
  try {
    await fs.writeJson(configPath, config, { spaces: 2 });
    logger.success(`Config saved to ${configPath}`);
  } catch (error) {
    logger.error(`Failed to save config: ${error.message}`);
  }
};

const createDefaultConfig = async (repoPath) => {
  const configPath = getConfigPath(repoPath);
  try {
    if (!(await fs.pathExists(configPath))) {
      await fs.writeJson(configPath, DEFAULT_CONFIG, { spaces: 2 });
      logger.success(`Created default config at ${configPath}`);
    }
  } catch (error) {
    logger.error(`Failed to create config: ${error.message}`);
  }
};

module.exports = {
  loadConfig,
  saveConfig,
  createDefaultConfig,
};
