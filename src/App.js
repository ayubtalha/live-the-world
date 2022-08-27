import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { NotFoundPage } from './pages';
import { LTWRoutePaths } from './routes/RoutesPaths';

const App = () => {
  return (
    <>
      <Routes>
        {LTWRoutePaths.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
