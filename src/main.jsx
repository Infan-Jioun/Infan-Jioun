import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import SplashCursor from './Components/SplashCursor/SplashCursor.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
 <HelmetProvider>
 <div className='font-Kanit'>
  <SplashCursor/>
 <RouterProvider router={router} />
 <ToastContainer />
 <Toaster />
 </div>
 </HelmetProvider>
</React.StrictMode>
)
