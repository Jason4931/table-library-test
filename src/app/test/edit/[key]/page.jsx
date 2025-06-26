'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, redirect } from 'next/navigation';
import { Form, Button, Input, InputNumber, Switch, Select } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/app/layout/mainlayout";

export default function EditData() {
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const key = params.key;
    if (!key) return;

    const stored = localStorage.getItem('tableData');
    if (!stored) return;

    try {
      const data = JSON.parse(stored);
      const found = data.find(item => String(item.key) === String(key));
      if (found) {
        setEditData(found);
        form.setFieldsValue(found); // ✅ set form values
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
    }
  }, [params.key, form]);

  const onFinish = values => {
    const existing = JSON.parse(localStorage.getItem('tableData') || '[]');
    const updated = existing.map(item =>
      String(item.key) === String(params.key) ? { ...item, ...values, key: item.key } : item
    );
    localStorage.setItem('tableData', JSON.stringify(updated));
    router.replace('/test');
  };

  return (
    <MainLayout>
      <Button onClick={() => router.replace('/test')} icon={<SwapLeftOutlined />} className="mb-4">Back</Button>
      <Form
        form={form}
        name="edit"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
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
          <Switch />
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
    </MainLayout>
  );
}
