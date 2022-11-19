import React, { useState, useEffect } from 'react';
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
import { useTranslate } from 'components/languageContext/languageContext';
import { PublicWrapper } from 'routes/PublicWrapper';
import styles from './Header.module.css';
import logo from './../../../assets/svg/logo.svg';
import { HeaderAvatar } from 'components/HeaderAvatar';
import { PrivateWrapper } from 'routes/PrivateWrapper';
import { useScrollTrigger } from '@mui/material';
interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const namingText = useTranslate('welcomeText.naming');
  const linkSignIn = useTranslate('links.signIn');
  const linkSignUp = useTranslate('links.signUp');
  const en = useTranslate('links.en');
  const ru = useTranslate('links.ru');

  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  const navItems = [
    {
      name: linkSignIn,
      to: '/login',
    },
    {
      name: linkSignUp,
      to: '/registration',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ my: 2, display: 'flex', justifyContent: 'center' }}
      >
        <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
          <div className={styles.logo}>
            <img src={logo} className={styles.logotype} />
            <div className={styles.naming} style={{ color: 'black', fontWeight: '700' }}>
              {namingText}
            </div>
          </div>
        </Link>
      </Typography>
      <Divider />
      <List>
        <PublicWrapper>
          {navItems.map((item) => (
            <Link key={item.name} to={item.to} data-testid={item.name}>
              <ListItem disablePadding key={item.name}>
                <ListItemButton sx={{ textAlign: 'center', color: 'gray' }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </PublicWrapper>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', top: '0', zIndex: '1' }} position="sticky">
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          color: trigger ? 'black' : 'white',
          fontWeight: '500',
          boxShadow: trigger
            ? '0px 2px 4px -1px rgb(0 0 0 / 0%)'
            : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: trigger ? 'white' : '#0070A0',
            transition: '1s',
            color: trigger ? 'rgb(133, 133, 133)' : 'white',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { sm: 'none' } }}
          >
            {/* <MenuIcon /> */}X
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/" data-testid="welcome" style={{ textDecoration: 'none' }}>
              <div className={styles.logo}>
                <img src={logo} className={styles.logotype} />
                <Box
                  className={styles.naming}
                  sx={{ color: trigger ? 'rgb(133, 133, 133)' : 'white', fontWeight: '600' }}
                >
                  {namingText}
                </Box>
              </div>
            </Link>
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              width: '120px',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              ml: 'auto',
            }}
          >
            {ru}
            <RuEnSwitches />
            {en}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              justifyContent: 'flex-end',
            }}
          >
            <PublicWrapper>
              {navItems.map((item) => (
                <Link key={item.name} to={item.to} data-testid={item.name}>
                  <Button
                    sx={{
                      color: trigger ? 'rgb(133, 133, 133)' : 'white',
                      width: '123px',
                      fontWeight: '600',
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </PublicWrapper>
          </Box>
          <PrivateWrapper>
            <HeaderAvatar />
          </PrivateWrapper>
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
