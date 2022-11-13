import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RuEnSwitches from './RuEnSwitches';
import { Link } from 'react-router-dom';
import logo from './../../../assets/svg/monitor.svg';
import styles from './Header.module.css';
import { useTranslate } from 'components/languageContext/languageContext';
import { style } from '@mui/system';
interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Sing in', 'Sing up'];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const buttonNameText = useTranslate('buttons.naming');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* <span>d{logo}</span> */}
        {buttonNameText}
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ justifyContent: 'center' }}>
          ru
          <RuEnSwitches />
          en
        </ListItem>
        <Link to="/login" data-testid="login" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: 'rgb(17 15 15 / 0.87)' }}>
              <ListItemText primary={'Sing in'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/registration" data-testid="registration" style={{ textDecoration: 'none' }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: 'rgb(17 15 15 / 0.87)' }}>
              <ListItemText primary={'Sing up'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}X
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
              <div className={styles.logo}>
                <img src={logo} className={styles.logotype} />
                <div className={styles.naming}>{buttonNameText}</div>
              </div>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            ru
            <RuEnSwitches />
            en
            <Link to="/login" data-testid="login" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff', marginLeft: '20px' }}>Sing in</Button>
            </Link>
            <Link to="/registration" data-testid="registration" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff', marginLeft: '20px' }}>Sing up</Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'right' }}>
            <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
              <Box className={styles.logo}>
                <Box className={styles.naming}>{buttonNameText}</Box>
                <img src={logo} className={styles.logotype} />
              </Box>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
