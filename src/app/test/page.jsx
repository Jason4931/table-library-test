"use client"

import React, { useState, useEffect } from 'react';
import { Button, Table, Switch, Select, Input, InputNumber } from 'antd';
import '@ant-design/v5-patch-for-react-19';

export default function Test() {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      active: false,
      status: '',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      active: true,
      status: 'approved',
    },
  ]);

  const handleCreate = () => {
    setDataSource(prev => [
      ...prev,
      {
        key: `${prev.length + 1}`,
        name: '',
        age: 0,
        address: '',
        active: false,
        status: ''
      },
    ]);
  };

  const handlePaste = (e, recordKey, dataIndex) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return;

    setDataSource(prev => {
      const rowIndex = prev.findIndex(row => row.key === recordKey);
      const updated = [...prev];

      lines.forEach((line, i) => {
        const targetIndex = rowIndex + i;
        if (updated[targetIndex]) {
          updated[targetIndex] = {
            ...updated[targetIndex],
            [dataIndex]: dataIndex == 'age' ? parseInt(line) : line,
          };
        } else {
          updated.push({
            key: `${updated.length + 1}`,
            name: dataIndex === 'name' ? line : '',
            age: dataIndex === 'age' ? parseInt(line) : 0,
            address: dataIndex === 'address' ? line : '',
            active: false,
            status: ''
          });
        }
      });

      return updated;
    });
  };

  const renderEditableCell = (dataIndex) => (text, record) => {
    const isAge = dataIndex === 'age';
    const value = record[dataIndex];

    const handleChange = (val) => {
      setDataSource(prev =>
        prev.map(row =>
          row.key === record.key ? { ...row, [dataIndex]: val } : row
        )
      );
    };

    return isAge ? (
      <InputNumber
        value={value}
        onChange={handleChange}
        onPaste={(e) => handlePaste(e, record.key, dataIndex)}
        min={0}
        style={{ width: '100%' }}
      />
    ) : (
      <Input
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onPaste={(e) => handlePaste(e, record.key, dataIndex)}
        onPressEnter={(e) => e.preventDefault()}
      />
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: renderEditableCell('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: renderEditableCell('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: renderEditableCell('address'),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (checked, record) => (
        <Switch
          checked={!!checked}
          onChange={(value) => {
            setDataSource(prev =>
              prev.map(row =>
                row.key === record.key ? { ...row, active: value } : row
              )
            );
          }}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value, record) => (
        <Select
          value={value}
          style={{ width: 120 }}
          onChange={(newValue) => {
            setDataSource(prev =>
              prev.map(row =>
                row.key === record.key ? { ...row, status: newValue } : row
              )
            );
          }}
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ]}
        />
      ),
    }
  ];

  // useEffect(() => {
  //   console.log(dataSource);
  // }, [dataSource]);

  return (
    <div className="p-8">
      <Button type="primary" onClick={handleCreate}>Add</Button>
      <Table dataSource={dataSource} columns={columns} pagination={false} className='mt-4 border border-black rounded' />
    </div>
  );
}
