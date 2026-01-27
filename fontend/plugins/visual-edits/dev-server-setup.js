// dev-server-setup.js
function setupDevServer(devServerConfig) {
  // Add CORS headers for visual editing
  if (!devServerConfig.headers) {
    devServerConfig.headers = {};
  }

  // Enable CORS for visual editing tools
  devServerConfig.headers['Access-Control-Allow-Origin'] = '*';
  devServerConfig.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
  devServerConfig.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';

  // Add custom middleware for visual edits
  const originalSetupMiddlewares = devServerConfig.setupMiddlewares;
  
  devServerConfig.setupMiddlewares = (middlewares, devServer) => {
    // Call original setup if exists
    if (originalSetupMiddlewares) {
      middlewares = originalSetupMiddlewares(middlewares, devServer);
    }

    // Add visual edits endpoint
    devServer.app.get('/api/visual-edits/config', (req, res) => {
      res.json({
        enabled: true,
        version: '1.0.0',
        features: {
          liveEditing: true,
          componentMetadata: true,
        },
      });
    });

    return middlewares;
  };

  return devServerConfig;
}

module.exports = setupDevServer;
