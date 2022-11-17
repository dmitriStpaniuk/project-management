import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from 'components/pages/layout/Layout';
import Board from 'components/pages/board/Board';
import Login from 'components/pages/login/Login';
import Page404 from 'components/pages/page404/Page404';
import Registration from 'components/pages/registration/Registration';
import WelcomePage from 'components/pages/welcomePage/WelcomePage';
import styles from './App.module.css';
import Profile from 'components/pages/profile/Profile';
import { useAppDispatch } from 'store/store';
import jwt_decode from 'jwt-decode';
import { getTokenLocalStorage } from 'services/apiConstants';
import { DecodedToken } from 'services/userServiceTypes';
import { PrivateRoute } from './routes/PrivateRoute';
import { getCurrentUserByIdThunk } from 'store/thunks/userThunk';
import Users from 'components/pages/users/Users';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenLocalStorage();
    if (!token) return;
    const decodedToken = jwt_decode<DecodedToken>(token);
    if (decodedToken) dispatch(getCurrentUserByIdThunk(decodedToken.userId));
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="board/*"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="page404" element={<Page404 />} />
          <Route path="*" element={<Navigate to={'/page404'} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
