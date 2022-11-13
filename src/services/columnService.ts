import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';
import { TColumnDataResponse, TColumnMainResponse, TCreateColumnData } from './columnServiceTypes';

const instanceColumnAxios = axios.create({
  baseURL: `${EApiParametrs.baseUrl}/${EApiRoutes.boards}`,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

instanceColumnAxios.interceptors.request.use(
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

export const getAllUColumns = async (boardId: string): Promise<TColumnMainResponse[]> => {
  const result = await instanceColumnAxios.get(`/${boardId}/${EApiRoutes.columns}`);
  return result.data;
};

export const createNewColumn = async (
  boardId: string,
  columnData: TCreateColumnData
): Promise<TColumnMainResponse> => {
  const result = await instanceColumnAxios.post(`/${boardId}/${EApiRoutes.columns}`, columnData);
  return result.data;
};

export const getColumnById = async (
  boardId: string,
  columnId: string
): Promise<TColumnDataResponse> => {
  const result = await instanceColumnAxios.get(`/${boardId}/${EApiRoutes.columns}/${columnId}`);
  return result.data;
};

export const deleteColumnById = async (boardId: string, columnId: string): Promise<void> => {
  await instanceColumnAxios.delete(`/${boardId}/${EApiRoutes.columns}/${columnId}`);
};

export const updateColumn = async (
  boardId: string,
  columnId: string,
  columnData: TCreateColumnData
): Promise<TColumnMainResponse> => {
  const result = await instanceColumnAxios.put(
    `/${boardId}/${EApiRoutes.columns}/${columnId}`,
    columnData
  );
  return result.data;
};
