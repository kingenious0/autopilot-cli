const { test, describe, it } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { loadConfig } = require('../src/config/loader');
const { DEFAULT_CONFIG } = require('../src/config/defaults');

describe('Config Loader', () => {
  let tmpDir;

  it('should load default config when no config file exists', async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autopilot-test-config-'));
    // Ensure we are in a clean directory
    const originalCwd = process.cwd();
    process.chdir(tmpDir);

    try {
      const config = await loadConfig(tmpDir);
      assert.deepStrictEqual(config, DEFAULT_CONFIG);
    } finally {
      process.chdir(originalCwd);
      await fs.remove(tmpDir);
    }
  });

  it('should merge user config with defaults', async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autopilot-test-config-merge-'));
    const originalCwd = process.cwd();
    process.chdir(tmpDir);

    const userConfig = {
      autoPush: false,
      commitPrefix: 'custom:'
    };

    await fs.writeJson(path.join(tmpDir, '.autopilotrc.json'), userConfig);

    try {
      const config = await loadConfig(tmpDir);
      assert.strictEqual(config.autoPush, false);
      assert.strictEqual(config.commitPrefix, 'custom:');
      assert.strictEqual(config.pushIntervalMinutes, DEFAULT_CONFIG.pushIntervalMinutes); // Preserves defaults
    } finally {
      process.chdir(originalCwd);
      await fs.remove(tmpDir);
    }
  });
});
