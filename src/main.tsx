import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login';
import Register from './routes/Register';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  // {
  //   path: '/painter',
  //   element: <Painter />
  // }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)