import React from 'react';

const LoadingScreen = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-screen" style={{ opacity: isVisible ? 1 : 0 }}>
      <div className="loading-container">
        <div className="loading-logo">
          <span className="logo-text">DIP</span>
        </div>

        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>

        <p className="loading-text">Loading Portfolio</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
