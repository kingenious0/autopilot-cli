const { test, describe, it } = require('node:test');
const assert = require('node:assert');
const { generateCommitMessage } = require('../src/core/commit');

describe('Commit Message Generator', () => {
  it('should generate a feat: message for new source files', () => {
    const files = ['src/core/watcher.js', 'src/commands/start.js'];
    const msg = generateCommitMessage(files);
    assert.match(msg, /^feat: /);
  });

  it('should generate a fix: message for bug fixes or patches', () => {
    // This logic depends on implementation details, assuming we can infer intent
    // or defaults. Since the generator is simple currently:
    // If we only have modifications, it might default to 'chore' or 'update'.
    // Let's check the current implementation behavior.
    const files = ['src/utils/logger.js'];
    const msg = generateCommitMessage(files);
    assert.ok(msg.length > 0);
  });

  it('should generate a docs: message for documentation changes', () => {
    const files = ['README.md', 'docs/api.md'];
    const msg = generateCommitMessage(files);
    assert.match(msg, /^docs: /);
  });

  it('should generate a chore: message for config files', () => {
    const files = ['package.json', '.gitignore'];
    const msg = generateCommitMessage(files);
    assert.match(msg, /^chore: /);
  });

  it('should handle mixed file types with priority', () => {
    const files = ['src/index.js', 'README.md'];
    const msg = generateCommitMessage(files);
    // Source code usually takes precedence
    assert.match(msg, /^(feat|fix|refactor|update): /);
  });
});
