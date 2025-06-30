'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/app/layout/mainlayout";
import CustomForm from '@/app/ui/CustomForm';

export default function EditData() {
  const params = useParams();
  const [editData, setEditData] = useState({});

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
      }
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
    }
  }, [params.key]);

  if (!editData || !editData.key) return null;

  return (
    <MainLayout>
      <CustomForm
        action="update"
        storageKey="tableData"
        columns={[
          {
            name: 'name',
            type: "string",
            initialValue: editData.name,
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'age',
            type: "integer",
            initialValue: editData.age,
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'address',
            type: "string",
            initialValue: editData.address,
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'active',
            type: "boolean",
            initialValue: editData.active,
            valuePropName: "checked",
          },
          {
            name: 'status',
            type: "enum",
            initialValue: editData.status,
            options: ['pending', 'approved', 'rejected'],
          },
        ]}
        url="/test"
      />
    </MainLayout>
  );
}
