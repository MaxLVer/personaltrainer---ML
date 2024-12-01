import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Pages/Home.jsx';
import Customer from './components/Pages/Customer.jsx';
import Training from './components/Pages/Training.jsx';
import SessionCalendar from './components/Pages/SessionCalendar.jsx';

const router = createHashRouter([  
  {
    path: "/",
    element: <App />,
    children: [                       
      {
        element: <Home />,
        index: true
      },
      {
        path: "customer",                
        element: <Customer />,
      },
      {
        path: "training",
        element: <Training />,
      },
      {
        path: "calendar",
        element: <SessionCalendar />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
