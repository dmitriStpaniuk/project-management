// import { usePageContext } from 'components/context/pageContext';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/store';
import { AddBoardForm } from '../boards/boardForms/AddBoardForm';
import Footer from '../welcomePage/footer/Footer';
import Header from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  return (
    <>
      <Header />
      <div className={style.outletWrapper}>
        {formAddBoard ? <AddBoardForm /> : null}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
