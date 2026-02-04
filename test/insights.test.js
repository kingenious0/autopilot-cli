const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { insights } = require('../src/commands/insights');
const execa = require('execa');

describe('Insights Command', () => {
  let tempDir;
  let originalCwd;

  beforeEach(async () => {
    originalCwd = process.cwd();
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autopilot-test-'));
    process.chdir(tempDir);
  });

  afterEach(async () => {
    process.chdir(originalCwd);
    await fs.remove(tempDir);
    mock.restoreAll();
  });

  it('should run insights command without error', async () => {
    // Mock git log execution
    mock.method(execa, 'default', (cmd, args) => {
        if (cmd === 'git' && args.includes('log')) {
            return Promise.resolve({ 
                stdout: 'hash|author|2023-01-01|feat: test\n1\t1\tfile.js' 
            });
        }
        return Promise.resolve({ stdout: '' });
    });

    // We just want to ensure it runs through
    await insights({});
  });

  it('should export csv if requested', async () => {
    // Mock git log execution
    mock.method(execa, 'default', (cmd, args) => {
        if (cmd === 'git' && args.includes('log')) {
            return Promise.resolve({ 
                stdout: 'hash|author|2023-01-01|feat: test\n1\t1\tfile.js' 
            });
        }
        return Promise.resolve({ stdout: '' });
    });

    await insights({ export: 'csv' });
    
    // Check if file exists
    // The filename is hardcoded in insights.js as autopilot-insights.csv
    const exists = await fs.pathExists(path.join(tempDir, 'autopilot-insights.csv'));
    assert.strictEqual(exists, true);
  });
});
