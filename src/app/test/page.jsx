"use client"

import React, { useState, useEffect } from 'react';
import { Button, Table, Switch, Select, Input, InputNumber } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { useRouter } from 'next/navigation';

export default function Test() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);

  const handleReset = () => {
    setDataSource([
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
  };

  const handlePaste = (e, recordKey, dataIndex) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return;

    setDataSource(prev => {
      const rowIndex = prev.findIndex(row => row.key === recordKey);
      const updated = [...prev];
      const colOrder = ['name', 'age', 'address', 'active', 'status'];
      const startCol = colOrder.indexOf(dataIndex);

      const usedKeys = new Set(updated.map(row => parseInt(row.key, 10)));
      let nextKey = 1;
      const getNextAvailableKey = () => {
        while (usedKeys.has(nextKey)) nextKey++;
        usedKeys.add(nextKey);
        return `${nextKey++}`;
      };

      lines.forEach((line, i) => {
        const targetIndex = rowIndex + i;
        const cells = line.split('\t');

        const base = updated[targetIndex] || {
          key: getNextAvailableKey(),
          name: '',
          age: 0,
          address: '',
          active: false,
          status: ''
        };

        cells.forEach((cell, j) => {
          const col = colOrder[startCol + j];
          if (!col) return;

          let val = cell;
          if (col === 'age') {
            val = parseInt(cell, 10) || 0;
          } else if (col === 'active') {
            val = cell.toLowerCase() === 'true';
          } else if (col === 'status') {
            const normalized = cell.toLowerCase();
            const allowed = ['pending', 'approved', 'rejected'];
            val = allowed.includes(normalized) ? normalized : '';
          }
          base[col] = val;
        });

        if (updated[targetIndex]) {
          updated[targetIndex] = { ...base };
        } else {
          updated.push(base);
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
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        ...new Set(dataSource.map(row => row.name)),
      ].map(name => ({ text: name || '(empty)', value: name })),
      onFilter: (value, record) => record.name == value,
      render: renderEditableCell('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      render: renderEditableCell('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        ...new Set(dataSource.map(row => row.address)),
      ].map(address => ({ text: address || '(empty)', value: address })),
      onFilter: (value, record) => record.address == value,
      render: renderEditableCell('address'),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false },
      ],
      onFilter: (value, record) => record.active == value,
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
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Approved', value: 'approved' },
        { text: 'Rejected', value: 'rejected' },
        { text: '(empty)', value: '' },
      ],
      onFilter: (value, record) => record.status == value,
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => router.push(`/test/${record.key}`)}
          >
            View
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => router.push(`/test/edit/${record.key}`)}
          >
            Update
          </Button>
          <Button
            size="small"
            danger
            onClick={() => {
              setDataSource(prev => prev.filter(row => row.key !== record.key));
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleCreate = () => {
    setDataSource(prev => {
      const usedKeys = new Set(prev.map(row => parseInt(row.key, 10)));
      let newKey = 1;
      while (usedKeys.has(newKey)) {
        newKey++;
      }
      return [
        ...prev,
        {
          key: `${newKey}`,
          name: '',
          age: 0,
          address: '',
          active: false,
          status: ''
        },
      ];
    });
  };

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tableData');
    if (saved) {
      setDataSource(JSON.parse(saved));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('tableData', JSON.stringify(dataSource));
    }
  }, [dataSource, hydrated]);

  const { Search } = Input;
  const [searchText, setSearchText] = useState('');
  const filteredData = dataSource.filter(item => {
    const text = searchText.toLowerCase();
    return (
      item.name?.toLowerCase().includes(text) ||
      item.address?.toLowerCase().includes(text) ||
      String(item.age).includes(text) ||
      String(item.active).includes(text) ||
      item.status?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="p-8">
      <Button type="primary" onClick={handleCreate}>Add</Button>
      <Button onClick={() => router.push('/test/create')} className='mx-4'>Create Instead</Button>
      <Search
        placeholder="Search anything..."
        allowClear
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        className="mb-4 w-full max-w-md"
      />
      <Table dataSource={filteredData} columns={columns} pagination={false} className='my-4 border border-black rounded' />
      <Button type="primary" onClick={handleReset}>Reset Data (temp)</Button>
    </div>
  );
}
