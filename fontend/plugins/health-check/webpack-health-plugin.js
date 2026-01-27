// webpack-health-plugin.js
class WebpackHealthPlugin {
  constructor(options = {}) {
    this.options = {
      path: options.path || '/health',
      ...options,
    };
    this.isHealthy = true;
    this.startTime = Date.now();
  }

  apply(compiler) {
    compiler.hooks.done.tap('WebpackHealthPlugin', (stats) => {
      if (stats.hasErrors()) {
        this.isHealthy = false;
      } else {
        this.isHealthy = true;
      }
    });

    compiler.hooks.failed.tap('WebpackHealthPlugin', () => {
      this.isHealthy = false;
    });
  }

  getStatus() {
    return {
      healthy: this.isHealthy,
      uptime: Date.now() - this.startTime,
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = WebpackHealthPlugin;
