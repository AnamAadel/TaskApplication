import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
  <DndProvider backend={HTML5Backend}>
    <EventContext>

      <RouterProvider router={router} />
    </EventContext>

  </DndProvider>

  </QueryClientProvider>

  </AuthProvider>
  </React.StrictMode>,
)
