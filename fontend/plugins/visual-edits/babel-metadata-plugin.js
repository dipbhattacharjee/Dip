// babel-metadata-plugin.js
module.exports = function babelMetadataPlugin() {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          // Add metadata to the program node
          if (!state.file.metadata) {
            state.file.metadata = {};
          }
          state.file.metadata.visualEdits = {
            enabled: true,
            timestamp: new Date().toISOString(),
          };
        },
      },
      JSXOpeningElement(path) {
        // Add metadata to JSX elements for visual editing
        if (path.node.attributes) {
          const hasDataId = path.node.attributes.some(
            (attr) => attr.name && attr.name.name === 'data-id'
          );
          
          if (!hasDataId && path.node.name && path.node.name.name) {
            // Optionally add data-id for visual editing
            // This is a simple implementation - can be enhanced
          }
        }
      },
    },
  };
};
