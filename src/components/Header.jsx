import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  border-bottom: 1px solid #efefef;
  padding: 16px;
`;

const Timer = styled.p`
  float: right;
  padding-right: 16px;
`;

export default function Header({ autoRefresh, timer }) {
  return (
    <HeaderStyles>
      <Link to="/">
        <img src="./logo.svg" alt="match logo" width="110" />
      </Link>
      {autoRefresh && <Timer>Next refresh: {timer} seconds</Timer>}
    </HeaderStyles>
  );
}
