const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const logger = {
  info: (message) => {
    console.log(`${colors.blue}ℹ${colors.reset} ${message}`);
  },
  success: (message) => {
    console.log(`${colors.green}✓${colors.reset} ${message}`);
  },
  warn: (message) => {
    console.warn(`${colors.yellow}⚠${colors.reset} ${message}`);
  },
  error: (message) => {
    console.error(`${colors.red}✗${colors.reset} ${message}`);
  },
  debug: (message) => {
    if (process.env.DEBUG) {
      console.log(`${colors.dim}[DEBUG]${colors.reset} ${message}`);
    }
  },
  section: (title) => {
    console.log(`\n${colors.bright}${colors.cyan}${title}${colors.reset}\n`);
  },
};

module.exports = logger;
