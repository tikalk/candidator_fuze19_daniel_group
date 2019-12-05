import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Auth from '../auth/Auth';
import Button from './Button';

const TopBar = styled.div`
  background-color: #3e3e3e;
  padding: 20px;
  color: #e3e3e3;
  display: flex;
  justify-content: space-between;
  font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
`;

const Title = styled.div`
  font-size: 2rem;
`;

function Header({ auth }) {
  const logout = () => {
    auth.logout(true);
  };

  return (
    <TopBar>
      <Title>Tikal Candidator</Title>
      {auth.isAuthenticated() && <Button onClick={logout}>Log Out</Button>}
    </TopBar>
  );
}

Header.propTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired,
};

export default Header;
