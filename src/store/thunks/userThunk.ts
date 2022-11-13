import { userSlice } from '../../store/slices/userSlice';
import { AppDispatch } from '../../store/store';
import * as userService from '../../services/userService';
import { TSignupUserData, TLoginUserData } from '../../services/userServiceTypes';
import { setTokenLocalStorage } from '../../services/apiConstants';

export const getAllUsersList = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsAllUsersFetching(true));
  const users = await userService.getAllUsers();
  dispatch(userSlice.actions.setIsAllUsersFetching(false));
  dispatch(userSlice.actions.setAllUsersList(users));
};

export const getUserByIdThunk = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  const user = await userService.getUserById(userId);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.setUser(user));
};

export const deleteUserByIdThunk = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  await userService.deleteUserById(userId);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.setUser(undefined));
  dispatch(userSlice.actions.setIsUserLogined(false));
};

export const updateUserThunk =
  (userId: string, userData: TSignupUserData) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setIsUserFetching(true));
    const user = await userService.updateUser(userId, userData);
    dispatch(userSlice.actions.setIsUserFetching(false));
    dispatch(userSlice.actions.setUser(user));
  };

export const createNewUserThunk = (userData: TSignupUserData) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  const user = await userService.createNewUser(userData);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.setUser(user));
};

export const signinThunk = (userData: TLoginUserData) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  const res = await userService.signin(userData);
  if (res.token) {
    setTokenLocalStorage(res.token);
    dispatch(userSlice.actions.setIsUserLogined(true));
  }
  dispatch(userSlice.actions.setIsUserFetching(false));
};
