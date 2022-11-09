import { userSlice } from 'store/slices/userSlice';
import { AppDispatch } from 'store/store';
import * as userService from '../../services/userService';

export const getUserThunk = (userId: string) => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setIsUserFetching(true));
  const user = await userService.getUser(userId);
  dispatch(userSlice.actions.setIsUserFetching(false));
  dispatch(userSlice.actions.saveUser(user));
};
