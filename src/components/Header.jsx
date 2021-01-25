import React from 'react';

export default function Header({ autoRefresh, timer }) {
  return (
    <header
      style={{
        borderBottom: `1px solid #efefef`,
        padding: '16px',
      }}
    >
      <img src="./logo.svg" alt="match" width="110" />
      {autoRefresh && (
        <p
          style={{
            float: 'right',
          }}
        >
          Next refresh: {timer} seconds
        </p>
      )}
    </header>
  );
}
