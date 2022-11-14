// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../welcomePage/footer/Footer';
import Header from '../welcomePage/header/Header';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
