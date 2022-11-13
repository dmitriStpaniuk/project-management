import { TTaskDataResponse } from './taskServiceTypes';

export type TColumnDataResponse = {
  id: string;
  title: string;
  order: number;
  tasks: TTaskDataResponse[];
};

export type TColumnMainResponse = {
  id: string;
  title: string;
  order: number;
};

export type TCreateColumnData = {
  title: string;
};
