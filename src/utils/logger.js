/**
 * Simple logger utility for consistent CLI output
 * Built by Praise Masunga (PraiseTechzw)
 */

const logger = {
  /**
   * Log informational message
   * @param {string} message - Message to log
   */
  info: (message) => {
    console.log(`ℹ️  ${message}`);
  },

  /**
   * Log success message
   * @param {string} message - Message to log
   */
  success: (message) => {
    console.log(`✅ ${message}`);
  },

  /**
   * Log warning message
   * @param {string} message - Message to log
   */
  warn: (message) => {
    console.warn(`⚠️  ${message}`);
  },

  /**
   * Log error message
   * @param {string} message - Message to log
   */
  error: (message) => {
    console.error(`❌ ${message}`);
  },

  /**
   * Log section header
   * @param {string} title - Section title
   */
  section: (title) => {
    console.log(`\n${title}`);
    console.log('─'.repeat(50));
  },
};

module.exports = logger;
