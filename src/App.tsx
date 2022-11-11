import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'components/pages/layout/Layout';
import Board from 'components/pages/board/Board';
import Login from 'components/pages/login/Login';
import Page404 from 'components/pages/page404/Page404';
import Registration from 'components/pages/registration/Registration';
import WelcomePage from 'components/pages/welcomePage/WelcomePage';
import { setupStore, useAppDispatch, useAppSelector } from 'store/store';
import { getUserThunk } from 'store/thunks/userThunk';
import './App.css';
export const store = setupStore();
function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getUserThunk('1'));
  }, []);
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="board/*" element={<Board />} />
            <Route path="Page404" element={<Page404 />} />
            {/* <Route path="*" element={<Navigate to={'/Page404'} />} /> */}
          </Route>
          {/* {JSON.stringify(user)} */}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
