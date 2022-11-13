import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TColumnMainResponse, TColumnDataResponse } from '../../services/columnServiceTypes';

type ColumnInitialState = {
  columnMain?: TColumnMainResponse;
  isColumnMainFetching: boolean;
  columnData?: TColumnDataResponse;
  isColumnDataFetching: boolean;
  allColumnsList?: TColumnMainResponse[];
  isAllColumnsFetching: boolean;
};

const initialState: ColumnInitialState = {
  columnMain: undefined,
  isColumnMainFetching: false,
  columnData: undefined,
  isColumnDataFetching: false,
  allColumnsList: undefined,
  isAllColumnsFetching: false,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumnMain: (state, action: PayloadAction<TColumnMainResponse>) => {
      state.columnMain = action.payload;
    },
    setIsColumnMainFetching: (state, action: PayloadAction<boolean>) => {
      state.isColumnMainFetching = action.payload;
    },
    setColumnData: (state, action: PayloadAction<TColumnDataResponse>) => {
      state.columnData = action.payload;
    },
    setIsColumnDataFetching: (state, action: PayloadAction<boolean>) => {
      state.isColumnDataFetching = action.payload;
    },
    setAllColumnsList: (state, action: PayloadAction<TColumnMainResponse[]>) => {
      state.allColumnsList = action.payload;
    },
    setIsAllColumnsFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllColumnsFetching = action.payload;
    },
  },
});
