import { ColumnDataResponse } from './columnServiceTypes';

export type BoardMainResponse = {
  id: string;
  title: string;
  description: string;
};

export type BoardDataResponse = BoardMainResponse & { columns: ColumnDataResponse[] };

export type CreateBoardData = Omit<BoardMainResponse, 'id'>;
