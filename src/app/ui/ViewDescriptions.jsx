'use client'

import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { Descriptions, ConfigProvider } from 'antd';
import { Button } from "antd"
import { SwapLeftOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

export function ViewDescriptions() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/login')
    }
  }, []);

  const [items, setItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log("Key :", params.key);
    let row = JSON.parse(localStorage.getItem('tableData'))[params.key - 1];
    if (row) {
      setItems([
        { label: 'Name', children: row.name || '(empty)' },
        { label: 'Age', children: (row.age || row.age == 0) ? row.age : '(empty)' },
        { label: 'Address', children: row.address || '(empty)' },
        { label: 'Active', children: `${row.active}` },
        { label: 'Status', children: row.status || '(empty)' },
      ]);
    }
    console.log(row)
  }, [params.key])

  return (
    <div className="p-8 bg-white">
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              labelColor: 'black',
              titleColor: 'black',
              contentColor: 'black'
            },
          },
        }}
      >
        <Button onClick={() => redirect('/test')} icon={<SwapLeftOutlined />} className="mb-2">Back</Button>
        <Descriptions title="User Info" items={items} />
      </ConfigProvider>
    </div>
  );
}