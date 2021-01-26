import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ autoRefresh, timer }) {
  return (
    <header
      style={{
        borderBottom: `1px solid #efefef`,
        padding: '16px',
      }}
    >
      <Link to="/">
        <img src="./logo.svg" alt="match logo" width="110" />
      </Link>
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
