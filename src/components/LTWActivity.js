import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const LTWActivity = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login', { replace: true });
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  };

  return (
    <div>
      <h1 className='mt-2 mx-2'>LTW Activity</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
