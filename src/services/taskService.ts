import axios from 'axios';
import { EApiParametrs, getTokenLocalStorage, EApiRoutes } from './apiConstants';
import {
  TTaskDataResponse,
  TUpdateTaskData,
  TCreateTaskData,
  TTaskMainResponse,
} from './taskServiceTypes';

const instanceTasksAxios = axios.create({
  baseURL: `${EApiParametrs.baseUrl}/${EApiRoutes.boards}`,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

instanceTasksAxios.interceptors.request.use(
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

export const getAllUTasks = async (
  boardId: string,
  columnId: string
): Promise<TTaskDataResponse[]> => {
  const result = await instanceTasksAxios.get(
    `/${boardId}/${EApiRoutes.columns}/${columnId}/${EApiRoutes.tasks}`
  );
  return result.data;
};

export const createNewTask = async (
  boardId: string,
  columnId: string,
  taskData: TCreateTaskData
): Promise<TTaskMainResponse> => {
  const result = await instanceTasksAxios.post(
    `/${boardId}/${EApiRoutes.columns}/${columnId}/${EApiRoutes.tasks}`,
    taskData
  );
  return result.data;
};

export const getTaskById = async (
  boardId: string,
  columnId: string,
  taskId: string
): Promise<TTaskDataResponse> => {
  const result = await instanceTasksAxios.get(
    `/${boardId}/${EApiRoutes.columns}/${columnId}/${EApiRoutes.tasks}/${taskId}`
  );
  return result.data;
};

export const deleteTaskById = async (
  boardId: string,
  columnId: string,
  taskId: string
): Promise<void> => {
  await instanceTasksAxios.delete(
    `/${boardId}/${EApiRoutes.columns}/${columnId}/${EApiRoutes.tasks}/${taskId}`
  );
};

export const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  taskData: TUpdateTaskData
): Promise<TTaskMainResponse> => {
  const result = await instanceTasksAxios.put(
    `/${boardId}/${EApiRoutes.columns}/${columnId}/${EApiRoutes.tasks}/${taskId}`,
    taskData
  );
  return result.data;
};
