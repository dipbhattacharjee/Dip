// health-endpoints.js
function setupHealthEndpoints(devServer, healthPlugin) {
  if (!healthPlugin) {
    return;
  }

  devServer.app.get('/health', (req, res) => {
    const status = healthPlugin.getStatus();
    const statusCode = status.healthy ? 200 : 503;
    
    res.status(statusCode).json({
      status: status.healthy ? 'healthy' : 'unhealthy',
      ...status,
    });
  });

  devServer.app.get('/health/ready', (req, res) => {
    const status = healthPlugin.getStatus();
    const statusCode = status.healthy ? 200 : 503;
    
    res.status(statusCode).json({
      ready: status.healthy,
      ...status,
    });
  });

  devServer.app.get('/health/live', (req, res) => {
    res.status(200).json({
      alive: true,
      timestamp: new Date().toISOString(),
    });
  });
}

module.exports = setupHealthEndpoints;
