import React from 'react';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
  return (
    <Result
      status='404'
      title='Seems like we are Lost!'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button id='app-content-nf-button' type='primary' href='/activity'>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
