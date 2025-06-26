"use client"

import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import MainLayout from "@/app/layout/mainlayout";
import CustomTable from "@/app/ui/CustomTable";

export default function Usertest() {
  return (
    <MainLayout>
      <CustomTable
        initialData={[]}
        storageKey="userRecords"
        columns={[
          {
            username: 'string',
            nullable: false,
            default: '',
            features: {
              filters: data => [...new Set(data.map(row => row.username))].map(n => ({ text: n || '(empty)', value: n })),
              onFilter: (v, r) => r.username === v,
            }
          },
          {
            email: 'string',
            nullable: true,
            default: '',
            features: {
              filters: data => [...new Set(data.map(row => row.email))].map(n => ({ text: n || '(empty)', value: n })),
              onFilter: (v, r) => r.email === v,
            }
          },
          {
            role: 'enum',
            options: ['admin', 'user', 'guest'],
            nullable: false,
            default: 'user',
            features: {
              filters: [
                { text: 'Admin', value: 'admin' },
                { text: 'User', value: 'user' },
                { text: 'Guest', value: 'guest' }
              ],
              onFilter: (v, r) => r.role === v,
            }
          },
          {
            loginCount: 'integer',
            nullable: false,
            default: 0,
            features: {
              sorter: (a, b) => a.loginCount - b.loginCount,
            }
          },
          {
            verified: 'boolean',
            nullable: false,
            default: false,
            features: {
              filters: [
                { text: 'Verified', value: true },
                { text: 'Unverified', value: false }
              ],
              onFilter: (v, r) => r.verified === v,
            }
          }
        ]}
        actions={['create', 'view', 'edit', 'delete', 'reset', 'search']}
        url='/usertest'
      />
    </MainLayout>
  );
}
