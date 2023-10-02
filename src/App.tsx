import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import TaskListSection from './pages/tasks/TaskListSection';
import SubTaskForm from './pages/subtasks/SubTaskForm';
import InitializeDb from './db/InitializeDb';
import { Provider } from 'rxdb-hooks';
import TaskForm from './pages/tasks/TaskForm';
import TaskDetailSection from './pages/tasks/TaskDetailSection';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskListSection />,
  },
  {
    path: "/tasks",
    element: <TaskListSection />,
  },
  {
    path: "/taskDetail/:id",
    element: <TaskDetailSection />,
  },
  {
    path: "/taskForm/:id?",
    element: <TaskForm />,
  },
  {
    path: "/subtaskForm/:taskId/:subtaskId?",
    element: <SubTaskForm />,
  },
]);

function App() {
  const [db, setDb] = useState();

  useEffect(() => {
    // RxDB instantiation can be asynchronous
    InitializeDb().then(setDb);
  }, []);
  
  return (
    <Provider db={db}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
