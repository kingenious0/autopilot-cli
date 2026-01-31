const defaults = {
  commitMessage: 'autopilot: auto-commit',
  autoPush: false,
  ignore: [
    'node_modules',
    '.git',
    '.gitignore',
    '.env',
    '.env.local',
    '.env.*.local',
    'dist',
    'build',
    'coverage',
    '.cache',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
  ],
  debounceMs: 2000,
};

module.exports = defaults;
