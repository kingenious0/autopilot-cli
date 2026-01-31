/**
 * Default configuration values for Autopilot
 * Built by Praise Masunga (PraiseTechzw)
 */

const DEFAULT_CONFIG = {
  debounceSeconds: 20,
  minSecondsBetweenCommits: 180,
  autoPush: true,
  blockBranches: ['main', 'master'],
  requireChecks: false,
  checks: [],
  commitMessageMode: 'smart', // smart | simple
};

const DEFAULT_IGNORE_PATTERNS = [
  'node_modules/',
  'dist/',
  'build/',
  '.next/',
  '.env',
  '.env.*',
  'coverage/',
  '*.log',
  '.DS_Store',
].join('\n');

module.exports = {
  DEFAULT_CONFIG,
  DEFAULT_IGNORE_PATTERNS,
};
