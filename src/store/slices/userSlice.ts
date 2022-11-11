import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserResponse } from '../../services/userServiceTypes';

type UserInitialState = {
  user?: TUserResponse;
  isUserFetching: boolean;
  isUserLogined: boolean;
  allUsersList?: TUserResponse[];
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
    setUser: (state, action: PayloadAction<TUserResponse | undefined>) => {
      state.user = action.payload;
    },
    setIsUserFetching: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },
    setIsUserLogined: (state, action: PayloadAction<boolean>) => {
      state.isUserLogined = action.payload;
    },
    setAllUsersList: (state, action: PayloadAction<TUserResponse[]>) => {
      state.allUsersList = action.payload;
    },
    setIsAllUsersFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllUsersFetching = action.payload;
    },
  },
});
