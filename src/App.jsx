import React from 'react';
import UserDetails from './components/UserDetails';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import "./index.css";

const isStandalone = !window.__POWERED_BY_HOST__; 

const App = () => {
  const content = (
    <div>
      <UserDetails />
      <ToastContainer />
    </div>
  );

  return isStandalone ? <BrowserRouter>{content}</BrowserRouter> : content;
};

export default App;
