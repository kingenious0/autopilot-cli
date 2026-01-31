const fs = require('fs-extra');
const path = require('path');
const { getPidFile, getStateFile } = require('./paths');
const logger = require('./logger');

const savePid = async (pid) => {
  try {
    await fs.writeFile(getPidFile(), pid.toString());
  } catch (error) {
    logger.error(`Failed to save PID: ${error.message}`);
  }
};

const readPid = async () => {
  try {
    if (await fs.pathExists(getPidFile())) {
      const pid = await fs.readFile(getPidFile(), 'utf-8');
      return parseInt(pid, 10);
    }
    return null;
  } catch (error) {
    logger.debug(`Error reading PID: ${error.message}`);
    return null;
  }
};

const removePid = async () => {
  try {
    await fs.remove(getPidFile());
  } catch (error) {
    logger.debug(`Error removing PID file: ${error.message}`);
  }
};

const isProcessRunning = (pid) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return false;
  }
};

const saveState = async (state) => {
  try {
    await fs.writeJson(getStateFile(), state, { spaces: 2 });
  } catch (error) {
    logger.error(`Failed to save state: ${error.message}`);
  }
};

const readState = async () => {
  try {
    if (await fs.pathExists(getStateFile())) {
      return await fs.readJson(getStateFile());
    }
    return null;
  } catch (error) {
    logger.debug(`Error reading state: ${error.message}`);
    return null;
  }
};

module.exports = {
  savePid,
  readPid,
  removePid,
  isProcessRunning,
  saveState,
  readState,
};
