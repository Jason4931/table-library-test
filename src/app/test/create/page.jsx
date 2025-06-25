'use client'

import React, { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Form, Button, Input, InputNumber, Switch, Select } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

export default function CreateData() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/login')
    }
  }, []);

  const router = useRouter();
  const onFinish = values => {
    const existing = JSON.parse(localStorage.getItem('tableData') || '[]');
    const usedKeys = new Set(existing.map(row => parseInt(row.key, 10)));
    let newKey = 1;
    while (usedKeys.has(newKey)) {
      newKey++;
    }
    const newEntry = {
      key: `${newKey}`,
      ...values,
    };
    const updated = [...existing, newEntry];
    localStorage.setItem('tableData', JSON.stringify(updated));
    router.replace('/test');
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="p-8">
      <Button onClick={() => redirect('/test')} icon={<SwapLeftOutlined />} className="mb-4">Back</Button>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          active: true,
          status: '',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input the age!' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Active"
          name="active"
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"

        >
          <Select
            options={[
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
              { label: 'Rejected', value: 'rejected' },
            ]}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}