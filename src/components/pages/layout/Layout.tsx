// import { usePageContext } from 'components/context/pageContext';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/store';
import { addFormModalCloseThunk, addFormModalThunk } from 'store/thunks/formThunk';
import { AddBoardForm } from '../boards/boardForms/AddBoardForm';
import FormModal from '../boards/boardForms/FormModal';
import Footer from '../welcomePage/footer/Footer';
import Header from '../welcomePage/header/Header';
import style from './Layout.module.css';

const Layout = () => {
  const dispatch = useAppDispatch();
  const formAddBoard = useAppSelector((state) => state.form.formAddBoard);
  const formModal = useAppSelector((state) => state.form.formModal);
  const formAddColumn = useAppSelector((state) => state.form.formAddColumn);
  const formAddTask = useAppSelector((state) => state.form.formAddTask);
  const confirmDeleteBoard = useAppSelector((state) => state.form.confirmDeleteBoard);
  const confirmEditBoard = useAppSelector((state) => state.form.confirmEditBoard);
  const openAll =
    formAddBoard ||
    formAddColumn ||
    confirmDeleteBoard ||
    confirmEditBoard ||
    formAddTask ||
    formModal;

  useEffect(() => {
    openAll ? dispatch(addFormModalThunk()) : dispatch(addFormModalCloseThunk());
  }, [openAll]);
  return (
    <>
      <Header />
      <div className={style.outletWrapper}>
        {formAddBoard ? <AddBoardForm /> : null}
        {formModal ? <FormModal /> : null}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
