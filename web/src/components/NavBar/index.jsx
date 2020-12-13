import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { AddBox, Description, MeetingRoom } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../hooks/auth';
import { NavItem } from './style';

const NavBar = () => {
  const { signOut } = useAuth();
  return (
    <AppBar position="static" style={{ backgroundColor: '#005484' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button color="inherit">
            <NavItem to="/news">
              <Description />
              <Typography>Notícias</Typography>
            </NavItem>
          </Button>
          <Button color="inherit">
            <NavItem to="/registerNews">
              <AddBox />
              <Typography>Cadastrar Notícias</Typography>
            </NavItem>
          </Button>
        </div>
        <Button color="inherit" onClick={signOut}>
          <MeetingRoom />
          <Typography>Sair</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
