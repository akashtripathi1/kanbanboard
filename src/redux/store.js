import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import tasksReducer from './slices/taskSlice';
import usersReducer from './slices/userSlice';
import filtersReducer from './slices/filterSlice';

const tasksPersistConfig = {
  key: 'tasks',
  storage,
};

const usersPersistConfig = {
  key: 'users',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
const persistedFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);

const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    users: persistedUsersReducer,
    filters: persistedFiltersReducer,
  },
});

export const persistor = persistStore(store);
export default store;
