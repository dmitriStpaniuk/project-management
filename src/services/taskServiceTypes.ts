import { TFileDataResponse } from './fileServiceTypes';

export type TTaskDataResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
  files: TFileDataResponse[];
};

export type TCreateTaskData = {
  title: string;
  description: string;
  userId: string;
};

export type TTaskMainResponse = TCreateTaskData & { id: string };

export type TUpdateTaskData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export type TUpdateTaskResponse = TUpdateTaskData & { id: string };
