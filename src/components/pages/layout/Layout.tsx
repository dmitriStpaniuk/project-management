// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Headers from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  // const { state } = usePageContext();
  return (
    <div>
      <Headers />
      {/* <header className={style.header} data-testid="header">
        <h3 className={style.brend}>Rick and Morty</h3>
        <div className={style.links}>
          <Link to="/" data-testid="home">
            Home
          </Link>
          <Link to="about" data-testid="about">
            About Us
          </Link>
          <Link to="form" data-testid="form">
            Form
          </Link>
          <Link to="page404" data-testid="error_page"></Link>
        </div>
      </header> */}
      <Outlet />
    </div>
  );
};
export default Layout;
