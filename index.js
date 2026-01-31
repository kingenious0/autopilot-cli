// Main entry point
module.exports = {
  // Commands
  ...require('./src/commands/init'),
  ...require('./src/commands/start'),
  ...require('./src/commands/stop'),
  ...require('./src/commands/status'),
  
  // Core utilities
  git: require('./src/core/git'),
  watcher: require('./src/core/watcher'),
  commit: require('./src/core/commit'),
  safety: require('./src/core/safety'),
  
  // Config
  config: require('./src/config/loader'),
  ignore: require('./src/config/ignore'),
  defaults: require('./src/config/defaults'),
  
  // Utils
  logger: require('./src/utils/logger'),
  paths: require('./src/utils/paths'),
  process: require('./src/utils/process'),
};
