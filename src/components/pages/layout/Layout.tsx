// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Headers from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  return (
    <div>
      <Headers />
      <Outlet />
    </div>
  );
};
export default Layout;
