"use client"

import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/app/layout/mainlayout";
import CustomTable from "@/app/ui/CustomTable";
import { nullable } from 'zod';

export default function Test() {
  return (
    <MainLayout>
      <CustomTable
        initialData={[]}
        storageKey="tableData"
        columns={[
          {
            name: 'string',
            nullable: true,
            default: '',
            features: {
              filters: [...new Set(dataSource.map(row => row.name))].map(n => ({ text: n || '(empty)', value: n })),
              onFilter: (v, r) => r.name == v,
            }
          },
          {
            age: 'integer',
            nullable: true,
            default: 0,
            features: {
              sorter: (a, b) => a.age - b.age,
            }
          },
          {
            address: 'string',
            nullable: true,
            default: '',
            features: {
              filters: [...new Set(dataSource.map(row => row.address))].map(n => ({ text: n || '(empty)', value: n })),
              onFilter: (v, r) => r.address == v,
            }
          },
          {
            active: 'boolean',
            nullable: false,
            default: false,
            features: {
              filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false }
              ],
              onFilter: (v, r) => r.active == v,
            }
          },
          {
            status: 'enum',
            options: ['pending', 'approved', 'rejected'],
            nullable: true,
            default: '',
            features: {
              filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Approved', value: 'approved' },
                { text: 'Rejected', value: 'rejected' },
                { text: '(empty)', value: '' },
              ],
              onFilter: (v, r) => r.status == v,
            }
          }
        ]}
        actions={['create', 'view', 'edit', 'delete']}
      />
    </MainLayout>
  );
}
