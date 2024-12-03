import './styles/App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from './redux/slices/taskSlice';
import { setUsers } from './redux/slices/userSlice';
import KanbanBoard from './components/KanbanBoard'; 


const App = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.data);
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    if (tasks.length === 0 || users.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          const data = await response.json();
          console.log(data);
          // Dispatch data to the Redux store
          dispatch(setTasks(data.tickets));
          dispatch(setUsers(data.users));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [dispatch, tasks, users]); 

  return (
    <div className="App">
      {tasks!==undefined && (
      <KanbanBoard />
      )}
    </div>
  );
};

export default App;
