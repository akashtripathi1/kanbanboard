import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'priority', // Default value for sortBy
  groupBy: 'status', // Default value for groupBy
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setGroupBy, setSortBy } = filtersSlice.actions;

export default filtersSlice.reducer;
