import React from 'react';

const Footer = () => {
  const footerStyle = {
    background: 'linear-gradient(90deg, #343a40, #212529)',
    color: '#f8f9fa',
    padding: '20px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
  };

  const brandNameStyle = {
    color: '#f39c12',
    fontWeight: 'bold',
  };

  return (
    <div style={footerStyle}>
      <h6>
        All rights reserved &copy;{' '}
        <span style={brandNameStyle}>Budget Buddy</span>
      </h6>
    </div>
  );
};

export default Footer;
