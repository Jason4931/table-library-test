'use client'

import React, { useState, useEffect } from 'react';
import { Button, Table, Switch, Select, Input, InputNumber } from 'antd';
import { useRouter } from 'next/navigation';

export default function CustomTable({ initialData = [], storageKey, columns, actions }) {
  const router = useRouter();
  const [dataSource, setDataSource] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const { Search } = Input;
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!hydrated) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setDataSource(JSON.parse(saved));
      }
      setHydrated(true);
    }
  }, [hydrated]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(storageKey, JSON.stringify(dataSource));
    }
  }, [dataSource, hydrated]);

  const handlePaste = (e, recordKey, dataIndex) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (!lines.length) return;

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
          if (col === 'age') val = parseInt(cell, 10) || 0;
          else if (col === 'active') val = cell.toLowerCase() === 'true';
          else if (col === 'status') {
            const norm = cell.toLowerCase();
            val = ['pending', 'approved', 'rejected'].includes(norm) ? norm : '';
          }
          base[col] = val;
        });

        updated[targetIndex] = base;
      });

      return updated;
    });
  };//idfk about this

  const renderEditableCell = dataIndex => (text, record) => {
    const isAge = dataIndex === 'age';
    const value = record[dataIndex];
    const handleChange = val => {
      setDataSource(prev =>
        prev.map(row => (row.key === record.key ? { ...row, [dataIndex]: val } : row))
      );
    };
    return isAge ? (
      <InputNumber value={value} onChange={handleChange} onPaste={e => handlePaste(e, record.key, dataIndex)} min={0} style={{ width: '100%' }} />
    ) : (
      <Input value={value} onChange={e => handleChange(e.target.value)} onPaste={e => handlePaste(e, record.key, dataIndex)} onPressEnter={e => e.preventDefault()} />
    );
  };

  const handleCreate = () => {
    setDataSource(prev => {
      const used = new Set(prev.map(row => parseInt(row.key, 10)));
      let newKey = 1;
      while (used.has(newKey)) newKey++;
      return [...prev, { key: `${newKey}`, name: '', age: 0, address: '', active: false, status: '' }];
    });
  };

  const handleReset = () => {
    setDataSource([...initialData]);
  };

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

  function formatColumns(columnsProp, dataSource, renderEditableCell, setDataSource, router) {
    return [
      { title: 'ID', dataIndex: 'key', key: 'key' },
      ...columnsProp.map(col => {
        const colName = Object.keys(col)[0]; // e.g. 'name', 'age', etc
        const features = col.features || {};

        // Base column
        const column = {
          title: colName.charAt(0).toUpperCase() + colName.slice(1),
          dataIndex: colName,
          key: colName,
          ...features,
        };

        // Replace filters (map values from dataSource if needed)
        if (features.filters) {
          column.filters =
            typeof features.filters === 'function'
              ? features.filters(dataSource)
              : features.filters;
        }
        if (features.sorter) {
          column.sorter =
            typeof features.sorter === 'function'
              ? features.sorter
              : (a, b) => 0;
        }

        // Default editable cell for all types
        column.render = renderEditableCell(colName);

        return column;
      }),
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div className="flex gap-2">
            {actions.includes('view') && (
              <Button size="small" onClick={() => router.push(`/test/${record.key}`)}>
                View
              </Button>
            )}
            {actions.includes('edit') && (
              <Button size="small" type="primary" onClick={() => router.push(`/test/edit/${record.key}`)}>
                Update
              </Button>
            )}
            {actions.includes('delete') && (
              <Button
                size="small"
                danger
                onClick={() => setDataSource(prev => prev.filter(r => r.key !== record.key))}
              >
                Delete
              </Button>
            )}
          </div>
        ),
      },
    ];
  }
  columns = formatColumns(columns, dataSource, renderEditableCell, setDataSource, router);

  // columns = [
  //   { title: 'ID', dataIndex: 'key', key: 'key' },
  //   {
  //     title: 'Name', dataIndex: 'name', key: 'name',
  //     filters: [...new Set(dataSource.map(row => row.name))].map(n => ({ text: n || '(empty)', value: n })),
  //     onFilter: (v, r) => r.name == v,
  //     render: renderEditableCell('name')
  //   },
  //   {
  //     title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age,
  //     render: renderEditableCell('age')
  //   },
  //   {
  //     title: 'Address', dataIndex: 'address', key: 'address',
  //     filters: [...new Set(dataSource.map(r => r.address))].map(a => ({ text: a || '(empty)', value: a })),
  //     onFilter: (v, r) => r.address == v,
  //     render: renderEditableCell('address')
  //   },
  //   {
  //     title: 'Active', dataIndex: 'active', key: 'active',
  //     filters: [
  //       { text: 'Active', value: true },
  //       { text: 'Inactive', value: false }
  //     ],
  //     onFilter: (v, r) => r.active == v,
  //     render: (checked, record) => (
  //       <Switch checked={!!checked} onChange={value => {
  //         setDataSource(prev => prev.map(row => row.key === record.key ? { ...row, active: value } : row));
  //       }} />
  //     )
  //   },
  //   {
  //     title: 'Status', dataIndex: 'status', key: 'status',
  //     filters: [
  //       { text: 'Pending', value: 'pending' },
  //       { text: 'Approved', value: 'approved' },
  //       { text: 'Rejected', value: 'rejected' },
  //       { text: '(empty)', value: '' },
  //     ],
  //     onFilter: (v, r) => r.status == v,
  //     render: (value, record) => (
  //       <Select
  //         value={value}
  //         style={{ width: 120 }}
  //         onChange={val => {
  //           setDataSource(prev => prev.map(row => row.key === record.key ? { ...row, status: val } : row));
  //         }}
  //         options={[
  //           { label: 'Pending', value: 'pending' },
  //           { label: 'Approved', value: 'approved' },
  //           { label: 'Rejected', value: 'rejected' },
  //         ]}
  //       />
  //     )
  //   },
  //   {
  //     title: 'Actions', key: 'actions',
  //     render: (_, record) => (
  //       <div className="flex gap-2">
  //         <Button size="small" onClick={() => router.push(`/test/${record.key}`)}>View</Button>
  //         <Button size="small" type="primary" onClick={() => router.push(`/test/edit/${record.key}`)}>Update</Button>
  //         <Button size="small" danger onClick={() => setDataSource(prev => prev.filter(r => r.key !== record.key))}>Delete</Button>
  //       </div>
  //     )
  //   }
  // ];

  return (
    <div>
      <Button type="primary" onClick={handleCreate}>Add</Button>
      <Button onClick={() => router.push('/test/create')} className='mx-4'>Create Instead</Button>
      <Search placeholder="Search anything..." allowClear onChange={e => setSearchText(e.target.value)} className="w-full max-w-md" />
      <Table dataSource={filteredData} columns={columns} pagination={false} className='my-4 border border-black rounded' />
      <Button type="primary" onClick={handleReset}>Reset Data (temp)</Button>
    </div>
  );
}