// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default Layout;
