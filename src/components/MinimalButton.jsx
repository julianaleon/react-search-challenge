import React from 'react';

function MinimalButton({ children, onClick, style, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      style={{ background: 'transparent', border: 0, cursor: 'pointer', margin: 8, ...style }}
    >
      {children}
    </button>
  );
}

export default MinimalButton;
