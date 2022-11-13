import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnMainResponse, ColumnDataResponse } from '../../services/columnServiceTypes';

type ColumnInitialState = {
  columnMain?: ColumnMainResponse;
  isColumnMainFetching: boolean;
  columnData?: ColumnDataResponse;
  isColumnDataFetching: boolean;
  allColumnsList?: ColumnMainResponse[];
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
    setColumnMain: (state, action: PayloadAction<ColumnMainResponse>) => {
      state.columnMain = action.payload;
    },
    setIsColumnMainFetching: (state, action: PayloadAction<boolean>) => {
      state.isColumnMainFetching = action.payload;
    },
    setColumnData: (state, action: PayloadAction<ColumnDataResponse>) => {
      state.columnData = action.payload;
    },
    setIsColumnDataFetching: (state, action: PayloadAction<boolean>) => {
      state.isColumnDataFetching = action.payload;
    },
    setAllColumnsList: (state, action: PayloadAction<ColumnMainResponse[]>) => {
      state.allColumnsList = action.payload;
    },
    setIsAllColumnsFetching: (state, action: PayloadAction<boolean>) => {
      state.isAllColumnsFetching = action.payload;
    },
  },
});
