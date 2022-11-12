import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../../services/userServiceTypes';

type UserInitialState = {
  user?: UserResponse;
  isUserFetching: boolean;
  isUserLogined: boolean;
  allUsersList?: UserResponse[];
  isAllUsersFetching?: boolean;
};

const initialState: UserInitialState = {
  user: undefined,
  isUserFetching: false,
  isUserLogined: false,
  isAllUsersFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse | undefined>) => {
      state.user = action.payload;
    },
    setIsUserFetching: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },
    setIsUserLogined: (state, action: PayloadAction<boolean>) => {
      state.isUserLogined = action.payload;
    },
    setAllUsersList: (state, action: PayloadAction<UserResponse[]>) => {
      state.allUsersList = action.payload;
    },
    setIsAllUsersFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllUsersFetching = action.payload;
    },
  },
});
