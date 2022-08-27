import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import { LoginPage, NotFoundPage } from './pages';
import { unAuthLTWPath, isAuthLTWPath } from './routes/RoutesPaths';

const App = () => {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('user'));
  }, [location]);

  return (
    <>
      {loggedInUser ? (
        <Routes>
          {isAuthLTWPath.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      ) : (
        <Routes>
          {unAuthLTWPath.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
          <Route path='*' element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
