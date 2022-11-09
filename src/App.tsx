import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getUserThunk } from 'store/thunks/userThunk';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getUserThunk('1'));
  }, []);
  return <div>{JSON.stringify(user)}</div>;
}

export default App;
