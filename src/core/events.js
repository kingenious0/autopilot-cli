const fs = require('fs-extra');
const path = require('path');
const { getConfigDir } = require('../utils/paths');
const logger = require('../utils/logger');

const getQueuePath = () => path.join(getConfigDir(), 'events-queue.json');

/**
 * Telemetry/Event System for Autopilot
 * Handles reliable event emission with local queuing
 */
class EventSystem {
  constructor() {
    this.queue = [];
    this.isFlushing = false;
  }

  async loadQueue() {
    try {
      const queuePath = getQueuePath();
      if (await fs.pathExists(queuePath)) {
        this.queue = await fs.readJson(queuePath);
      }
    } catch (error) {
      logger.debug(`Failed to load event queue: ${error.message}`);
    }
  }

  async saveQueue() {
    try {
      await fs.ensureDir(getConfigDir());
      await fs.writeJson(getQueuePath(), this.queue, { spaces: 2 });
    } catch (error) {
      logger.error(`Failed to save event queue: ${error.message}`);
    }
  }

  /**
   * Queue an event for emission
   * @param {object} event - Event payload
   */
  async emit(event) {
    await this.loadQueue();
    
    // Add metadata
    const enrichedEvent = {
      ...event,
      queuedAt: Date.now(),
      retryCount: 0
    };

    this.queue.push(enrichedEvent);
    await this.saveQueue();
    
    // Try to flush immediately
    this.flush();
  }

  /**
   * Attempt to send queued events to backend
   */
  async flush() {
    if (this.isFlushing || this.queue.length === 0) return;
    this.isFlushing = true;

    try {
      const remaining = [];
      
      for (const event of this.queue) {
        try {
          await this.sendToBackend(event);
        } catch (error) {
          // Keep in queue if failed
          event.retryCount++;
          remaining.push(event);
        }
      }

      this.queue = remaining;
      await this.saveQueue();
    } finally {
      this.isFlushing = false;
    }
  }

  /**
   * Mock backend transmission
   * In production, this would POST to an API
   */
  async sendToBackend(event) {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 100));
    
    // For now, we just log that we would have sent it
    // logger.debug(`[Telemetry] Event emitted: ${event.type}`);
    
    // In a real implementation:
    // const response = await fetch('https://api.autopilot.com/events', { ... });
    // if (!response.ok) throw new Error('Network error');
    
    return true; 
  }
}

module.exports = new EventSystem();
