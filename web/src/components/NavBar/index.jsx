import React from 'react';
import { useAuth } from '../../hooks/auth';
import { Container, LogoutButton, NavItem } from './style';

const NavBar = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: '100%',
          alignItems: 'center',
        }}
      >
        <NavItem to="/news">
          Notícias
        </NavItem>
        <NavItem to="/registerNews">
          Cadastrar Notícia
        </NavItem>
      </div>
      <LogoutButton
        type="button"
        onClick={signOut}
      >
        Sair
      </LogoutButton>
    </Container>
  );
};

export default NavBar;
