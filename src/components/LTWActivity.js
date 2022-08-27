import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginPage } from '../pages';
import { useLocation } from 'react-router-dom';

export const LTWActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') ? true : false;
    setLoggedInUser(jwt);
  }, [location]);

  const logout = () => {
    navigate('/login', { replace: true });
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setLoggedInUser(false);
  };

  return (
    <div>
      {!loggedInUser && <LoginPage loggedInUser={loggedInUser} />}
      <h1 className='mt-2 mx-2'>LTW Activity</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
