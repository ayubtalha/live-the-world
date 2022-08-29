import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Modal, Button, Input, Form, Alert } from 'antd';
import ApiService from '../services/ApiService';
import { formValidationRules } from '../utils/formValidationRules';

const LoginPage = ({ loggedInUser = false }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(false);

  const onLoginFinish = async (data) => {
    let response = await ApiService.login(data);
    if (response.status === 200 || response.status === 201) {
      form.resetFields();
      navigate('/activities/castle-of-gerald-the-devil', { replace: true });

      localStorage.setItem('jwt', response.data.jwt);
      localStorage.setItem('user', response.data.user);
    } else setAlertMessage(true);
  };

  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setAlertMessage(true);
  };

  return (
    <>
      <Modal title='Login Modal' visible={loggedInUser} footer={null}>
        <Form
          form={form}
          layout='vertical'
          onFinish={onLoginFinish}
          onFinishFailed={onLoginFailed}
          autoComplete='on'
          className='login-form'
        >
          {alertMessage && (
            <Alert message='Login Failed. Try Again' type='error' />
          )}
          <Row>
            <Form.Item
              label='Email'
              name='identifier'
              rules={[
                formValidationRules.required('Email'),
                formValidationRules.isEmail(),
              ]}
            >
              <Input
                placeholder='Email e.g jacob@yahoo.com'
                style={{ minWidth: '35vh' }}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              label='Password'
              name='password'
              rules={[formValidationRules.required('Password')]}
            >
              <Input.Password
                placeholder='Password'
                style={{ minWidth: '35vh' }}
              />
            </Form.Item>
          </Row>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginPage;
