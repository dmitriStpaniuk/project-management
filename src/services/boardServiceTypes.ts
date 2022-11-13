import { TColumnDataResponse } from './columnServiceTypes';

export type TBoardDataResponse = {
  id: string;
  title: string;
  description: string;
  columns: TColumnDataResponse[];
};

export type TBoardMainResponse = {
  id: string;
  title: string;
  description: string;
};

export type TCreateBoardData = {
  title: string;
  description: string;
};
