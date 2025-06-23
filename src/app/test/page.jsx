"use client"

import React, { useState } from 'react';
import { Button, Table } from 'antd';

export default function Test() {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
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
      },
    ]);
  };

  const handleCellChange = (e, recordKey, dataIndex) => {
    const value = e.target.innerText;
    setDataSource(prev =>
      prev.map(row =>
        row.key === recordKey ? { ...row, [dataIndex]: value } : row
      )
    );
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
            [dataIndex]: line,
          };
        } else {
          updated.push({
            key: `${updated.length + 1}`,
            name: dataIndex === 'name' ? line : '',
            age: 0,
            address: dataIndex === 'address' ? line : '',
          });
        }
      });

      return updated;
    });
  };

  const renderEditableCell = (dataIndex) => (text, record) => (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={e => handleCellChange(e, record.key, dataIndex)}
      onPaste={e => handlePaste(e, record.key, dataIndex)}
      onInput={e => {
        // Optional: clear leftover paste residue if needed
        const html = e.currentTarget.innerHTML;
        if (html.includes('<br')) e.currentTarget.innerHTML = '';
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault(); // blocks line breaks on Enter key
        }
      }}
    >
      {text}
    </div>
  );

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
  ];

  return (
    <div className="p-8">
      <Button type="primary" onClick={handleCreate}>Add</Button>
      <Table dataSource={dataSource} columns={columns} pagination={false} className='mt-4 border border-black rounded' />
    </div>
  );
}
