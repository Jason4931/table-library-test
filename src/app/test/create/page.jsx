'use client'

import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/app/layout/mainlayout";
import CustomForm from '@/app/ui/CustomForm';

export default function CreateData() {
  return (
    <MainLayout>
      <CustomForm
        action="create"
        storageKey="tableData"
        columns={[
          {
            name: 'name',
            type: "string",
            initialValue: '',
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'age',
            type: "integer",
            initialValue: 0,
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'address',
            type: "string",
            initialValue: '',
            rules: [{ required: true, message: 'Please input the name!' }],
          },
          {
            name: 'active',
            type: "boolean",
            initialValue: true,
            valuePropName: "checked",
          },
          {
            name: 'status',
            type: "enum",
            initialValue: '',
            options: ['pending', 'approved', 'rejected'],
          },
        ]}
        url="/test"
      />
    </MainLayout>
  );
}