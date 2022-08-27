import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Input, Form, Alert } from 'antd';
import ApiService from '../services/ApiService';
import { FormValidationRules } from '../utils/FormValidationRules';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [alertMessage, setAlertMessage] = useState(false);

  const onLoginFinish = async (data) => {
    let response = await ApiService.login(data);
    if (response.status === 200 || response.status === 201) {
      form.resetFields();
      navigate('/activity', { replace: true });

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
      <Row justify='space-around' align='middle' style={{ minHeight: '85vh' }}>
        <Col>
          <Form
            form={form}
            layout='vertical'
            onFinish={onLoginFinish}
            onFinishFailed={onLoginFailed}
            autoComplete='on'
            className='login-form'
          >
            <Card className='login-card'>
              {alertMessage && (
                <Alert message='Login Failed. Try Again' type='error' />
              )}
              <Row>
                <Form.Item
                  label='Email'
                  name='identifier'
                  rules={[
                    FormValidationRules.required('Email'),
                    FormValidationRules.isEmail(),
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
                  rules={[FormValidationRules.required('Password')]}
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
            </Card>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
