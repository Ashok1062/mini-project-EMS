import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  return user ? children : <Navigate to="/" />;
};

export default PrivateRouter;
