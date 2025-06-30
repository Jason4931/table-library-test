'use client'

import React from 'react';
import { useRouter, redirect, useParams } from 'next/navigation';
import { Form, Button, Input, InputNumber, Switch, Select } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

export default function CustomForm({ action, storageKey, columns, url }) {
  const params = useParams();
  const router = useRouter();
  const onFinish = values => {
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    let updated;
    if (action == 'create') {
      const usedKeys = new Set(existing.map(row => parseInt(row.key, 10)));
      let newKey = 1;
      while (usedKeys.has(newKey)) {
        newKey++;
      }
      const newEntry = {
        key: `${newKey}`,
        ...values,
      };
      updated = [...existing, newEntry];
    } else if (action == 'update') {
      updated = existing.map(item =>
        String(item.key) === String(params.key) ? { ...item, ...values, key: item.key } : item
      );
    }
    localStorage.setItem(storageKey, JSON.stringify(updated));
    router.replace(url);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  // Map a column definition to its input component
  const renderField = (col) => {
    switch (col[col.type] || col.type) {
      case "string":
        return <Input />;
      case "integer":
        return <InputNumber min={0} style={{ width: "100%" }} />;
      case "boolean":
        return <Switch />;
      case "enum":
        return (
          <Select
            options={col.options.map((opt) => ({
              label: opt[0].toUpperCase() + opt.slice(1),
              value: opt,
            }))}
          />
        );
      default:
        return <Input />;
    }
  };

  return (
    <div>
      <Button onClick={() => redirect(url)} icon={<SwapLeftOutlined />} className="mb-4">Back</Button>
      <Form
        form={form}
        name={action}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {columns.map((col) => {
          // Extract Form.Item props
          const { name, rules, valuePropName, initialValue } = col;
          // Label = capitalized field name
          const label = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <Form.Item
              key={name}
              label={label}
              name={name}
              rules={rules}
              valuePropName={valuePropName}
              initialValue={initialValue}
            >
              {renderField(col)}
            </Form.Item>
          );
        })}

        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {action == "create" ? "Create" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}