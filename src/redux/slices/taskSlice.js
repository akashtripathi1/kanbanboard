import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
  },
  reducers: {
    setTasks: (state, action) => {
      console.log('setTasks action');
      console.log(action);
      state.data = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
