import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from './components/context/AuthContext';
import EventContext from './components/context/EventContext';
import './index.css';
import router from './router/routes.jsx';
// ..
AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <EventContext>

      <RouterProvider router={router} />
    </EventContext>

  </AuthProvider>
  </React.StrictMode>,
)
