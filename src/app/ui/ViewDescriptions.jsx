'use client'

import React, { useState, useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { Descriptions, ConfigProvider } from 'antd';
import { Button } from "antd"
import { SwapLeftOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';

export function ViewDescriptions({ storageKey, url }) {
  const [items, setItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log("Key :", params.key);
    let row = JSON.parse(localStorage.getItem(storageKey))[params.key - 1];
    if (row && typeof row === 'object') {
      const formattedItems = Object.entries(row).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        children: (value || value === 0 || value === false) ? `${value}` : '(empty)'
      }));
      setItems(formattedItems);
    }
    console.log(row)
  }, [params.key])

  return (
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
      <Button onClick={() => redirect(url)} icon={<SwapLeftOutlined />} className="mb-2">Back</Button>
      <Descriptions title="User Info" items={items} />
    </ConfigProvider>
  );
}