import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'components/pages/layout/Layout';
import Board from 'components/pages/board/Board';
import Login from 'components/pages/login/Login';
import Page404 from 'components/pages/page404/Page404';
import Registration from 'components/pages/registration/Registration';
import WelcomePage from 'components/pages/welcomePage/WelcomePage';
import './App.css';
import Profile from 'components/pages/layout/profile/Profile';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="board/*" element={<Board />} />
          <Route path="Page404" element={<Page404 />} />
          {/* <Route path="*" element={<Navigate to={'/Page404'} />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
