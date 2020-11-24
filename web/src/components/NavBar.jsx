import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const NavBar = () => {
  const { signOut } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: 'lightgray',
        marginBottom: 30,
      }}
    >
      <div>
        <Link to="/news">
          <button type="button">Notícias</button>
        </Link>
        <Link to="/registerNews">
          <button style={{ height: '100%' }} type="button">
            Cadastrar Notícia
          </button>
        </Link>
      </div>
      <button
        style={{
          width: 80,
          justifySelf: 'flex-end',
        }}
        type="button"
        onClick={signOut}
      >
        Sair
      </button>
    </div>
  );
};

export default NavBar;
