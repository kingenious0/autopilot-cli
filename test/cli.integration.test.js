const { test, describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { execa } = require('execa');

const CLI_PATH = path.join(__dirname, '../bin/autopilot.js');

describe('CLI Integration Tests', () => {
  let tmpDir;
  let originalCwd;

  before(async () => {
    // Create a temp directory for our "repo"
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'autopilot-cli-test-'));
    originalCwd = process.cwd();
    
    // Initialize a dummy git repo
    await execa('git', ['init'], { cwd: tmpDir });
    await execa('git', ['config', 'user.email', 'test@example.com'], { cwd: tmpDir });
    await execa('git', ['config', 'user.name', 'Test User'], { cwd: tmpDir });
  });

  after(async () => {
    // Cleanup
    try {
      await fs.remove(tmpDir);
    } catch (e) {
      console.warn('Failed to cleanup temp dir:', e.message);
    }
  });

  it('should display help', async () => {
    const { stdout } = await execa('node', [CLI_PATH, '--help']);
    assert.match(stdout, /Usage: autopilot/);
    assert.match(stdout, /Built by Praise Masunga/);
  });

  it('should initialize a new repo with "init"', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'init'], { cwd: tmpDir });
    
    assert.match(stdout, /Autopilot Init/);
    assert.match(stdout, /Initialization Complete/);
    
    const configExists = await fs.pathExists(path.join(tmpDir, '.autopilotrc.json'));
    const ignoreExists = await fs.pathExists(path.join(tmpDir, '.autopilotignore'));
    
    assert.strictEqual(configExists, true, 'Config file should exist');
    assert.strictEqual(ignoreExists, true, 'Ignore file should exist');
  });

  it('should run "status" without crashing', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'status'], { cwd: tmpDir });
    // It might say "Not Running"
    assert.match(stdout, /Autopilot Status/);
  });

  it('should run "doctor" without crashing', async () => {
    const { stdout } = await execa('node', [CLI_PATH, 'doctor'], { cwd: tmpDir });
    assert.match(stdout, /Autopilot Doctor/);
    // It might find issues, but shouldn't crash
  });

  it('should start in test mode and exit cleanly', async () => {
    // We use the AUTOPILOT_TEST_MODE env var we added to watcher.js
    // This should run for 3 seconds and then exit
    
    // Windows might need shell: true or careful env handling, execa handles env well.
    const start = Date.now();
    
    try {
      const { stdout, stderr } = await execa('node', [CLI_PATH, 'start'], { 
        cwd: tmpDir,
        env: { ...process.env, AUTOPILOT_TEST_MODE: '1' }
      });
      
      const duration = Date.now() - start;
      
      assert.match(stdout, /Starting Autopilot/);
      assert.match(stdout, /TEST MODE/);
      assert.ok(duration >= 2500, 'Should run for at least ~3 seconds');
      
    } catch (error) {
      // If it fails, log output for debugging
      console.error('Start command failed:', error.stdout, error.stderr);
      throw error;
    }
  });
});
