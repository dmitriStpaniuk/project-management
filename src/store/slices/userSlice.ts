import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string;
};
type UserInitialState = {
  user?: User;
  isUserFetching: boolean;
};
const initialState: UserInitialState = {
  user: undefined,
  isUserFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsUserFetching: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },
  },
});
