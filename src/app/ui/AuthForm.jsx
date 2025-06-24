'use client';
import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useStyle } from "@/app/page"
import '@ant-design/v5-patch-for-react-19';
import { Button, Form, Input, ConfigProvider } from 'antd';
import { login } from '../actions/auth';
import { useRouter } from 'next/navigation';
const AuthForm = () => {
  const router = useRouter();
  const { styles } = useStyle();
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);
  const onFinish = values => {
    login(values);
    console.log('Finish:', values);
  };
  return (
    <Form form={form} name="login" layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="E-Mail"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              icon={<AntDesignOutlined />}
              // onClick={() => router.push('/test')}
            >
              Log in
            </Button>
          </ConfigProvider>
        )}
      </Form.Item>
    </Form>
  );
};
export default AuthForm;