import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';
import { TUserResponse, TSignupUserData, TLoginUserData, ITokenResponse } from './userServiceTypes';

const instanceUserAxios = axios.create({
  baseURL: EApiParametrs.baseUrl,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

instanceUserAxios.interceptors.request.use(
  (config) => {
    const token = getTokenLocalStorage();
    if (config.headers && token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getAllUsers = async (): Promise<TUserResponse[]> => {
  const result = await instanceUserAxios.get(`/${EApiRoutes.users}`);
  return result.data;
};

export const getUserById = async (userId: string): Promise<TUserResponse> => {
  const result = await instanceUserAxios.get(`/${EApiRoutes.users}/${userId}`);
  return result.data;
};

export const deleteUserById = async (userId: string): Promise<void> => {
  await instanceUserAxios.delete(`/${EApiRoutes.users}/${userId}`);
};

export const updateUser = async (
  userId: string,
  userData: TSignupUserData
): Promise<TUserResponse> => {
  const result = await instanceUserAxios.put(`/${EApiRoutes.users}/${userId}`, userData);
  return result.data;
};

export const createNewUser = async (userData: TSignupUserData): Promise<TUserResponse> => {
  const result = await instanceUserAxios.post(`/${EApiRoutes.signup}`, userData);
  return result.data;
};

export const signin = async (userData: TLoginUserData): Promise<ITokenResponse> => {
  const result = await instanceUserAxios.post(`${EApiRoutes.signin}`, userData);
  return result.data;
};
