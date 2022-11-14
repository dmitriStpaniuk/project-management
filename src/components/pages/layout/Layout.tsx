// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../welcomePage/footer/Footer';
import Header from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.outletWrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
