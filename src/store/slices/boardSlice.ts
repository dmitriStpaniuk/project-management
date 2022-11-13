import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TBoardMainResponse, TBoardDataResponse } from '../../services/boardServiceTypes';

type BoardInitialState = {
  boardMain?: TBoardMainResponse;
  isBoardMainFetching: boolean;
  boardData?: TBoardDataResponse;
  isBoardDataFetching: boolean;
  allBoardsList?: TBoardMainResponse[];
  isAllBoardsFetching: boolean;
};

const initialState: BoardInitialState = {
  boardMain: undefined,
  isBoardMainFetching: false,
  boardData: undefined,
  isBoardDataFetching: false,
  allBoardsList: undefined,
  isAllBoardsFetching: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardMain: (state, action: PayloadAction<TBoardMainResponse>) => {
      state.boardMain = action.payload;
    },
    setIsBoardMainFetching: (state, action: PayloadAction<boolean>) => {
      state.isBoardMainFetching = action.payload;
    },
    setBoardData: (state, action: PayloadAction<TBoardDataResponse>) => {
      state.boardData = action.payload;
    },
    setIsBoardDataFetching: (state, action: PayloadAction<boolean>) => {
      state.isBoardDataFetching = action.payload;
    },
    setAllBoardsList: (state, action: PayloadAction<TBoardMainResponse[]>) => {
      state.allBoardsList = action.payload;
    },
    setIsAllBoardsFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllBoardsFetching = action.payload;
    },
  },
});
