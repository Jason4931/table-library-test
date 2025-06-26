'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { Button, Table, Switch, Select, Input, InputNumber } from 'antd';
import { useRouter } from 'next/navigation';

export default function CustomTable({ initialData = [], storageKey, columns, actions = [], url }) {
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
      // console.log(dataSource)
    }
  }, [dataSource, hydrated]);

  const handlePaste = (e, recordKey, dataIndex) => {
    // e.preventDefault();
    // const text = e.clipboardData.getData('text/plain');
    // const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    // if (!lines.length) return;

    // setDataSource(prev => {
    //   const rowIndex = prev.findIndex(row => row.key === recordKey);
    //   const updated = [...prev];
    //   const colOrder = ['name', 'age', 'address', 'active', 'status'];
    //   const startCol = colOrder.indexOf(dataIndex);

    //   const usedKeys = new Set(updated.map(row => parseInt(row.key, 10)));
    //   let nextKey = 1;
    //   const getNextAvailableKey = () => {
    //     while (usedKeys.has(nextKey)) nextKey++;
    //     usedKeys.add(nextKey);
    //     return `${nextKey++}`;
    //   };

    //   lines.forEach((line, i) => {
    //     const targetIndex = rowIndex + i;
    //     const cells = line.split('\t');

    //     const base = updated[targetIndex] || {
    //       key: getNextAvailableKey(),
    //       name: '',
    //       age: 0,
    //       address: '',
    //       active: false,
    //       status: ''
    //     };

    //     cells.forEach((cell, j) => {
    //       const col = colOrder[startCol + j];
    //       if (!col) return;
    //       let val = cell;
    //       if (col === 'age') val = parseInt(cell, 10) || 0;
    //       else if (col === 'active') val = cell.toLowerCase() === 'true';
    //       else if (col === 'status') {
    //         const norm = cell.toLowerCase();
    //         val = ['pending', 'approved', 'rejected'].includes(norm) ? norm : '';
    //       }
    //       base[col] = val;
    //     });

    //     updated[targetIndex] = base;
    //   });

    //   return updated;
    // });
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (!lines.length) return;

    setDataSource(prev => {
      const rowIndex = prev.findIndex(row => row.key === recordKey);
      const updated = [...prev];

      // Get the column keys (dataIndex order) from your columns prop
      // You need to have columns available here (e.g. from props or closure)
      // Example: columns = [{ name: 'string', ... }, { age: 'integer', ... }, ...]
      // Extract keys in order:
      const colOrder = columns.map(col => Object.keys(col)[0]);
      const startCol = colOrder.indexOf(dataIndex);

      // Prepare keys used for key generation
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
          // Initialize all columns to their default value from columns prop:
          ...columns.reduce((acc, col) => {
            const key = Object.keys(col)[0];
            acc[key] = col.default ?? (col.type === 'boolean' ? false : '');
            return acc;
          }, {})
        };

        cells.forEach((cell, j) => {
          const col = colOrder[startCol + j];
          if (!col) return;

          const colConfig = columns.find(c => Object.keys(c)[0] === col);
          const type = colConfig?.[col];
          const options = colConfig?.options || [];
          const nullable = colConfig?.nullable ?? true;
          const defaultVal = colConfig?.default ?? (
            type === 'integer' ? 0 :
              type === 'boolean' ? false :
                type === 'enum' ? '' :
                  ''
          );

          let val = cell.trim();

          // Type conversion
          switch (type) {
            case 'integer': {
              const num = parseInt(val, 10);
              val = !isNaN(num) ? num : defaultVal;
              break;
            }
            case 'boolean': {
              const lower = val.toLowerCase();
              val = lower === 'true' ? true : lower === 'false' ? false : defaultVal;
              break;
            }
            case 'enum': {
              const norm = val.toLowerCase();
              val = options.includes(norm) ? norm : defaultVal;
              break;
            }
            case 'string':
            default: {
              if (val === '' && !nullable) val = defaultVal;
              break;
            }
          }

          base[col] = val;
        });

        updated[targetIndex] = base;
      });

      return updated;
    });
  };

  const typeMap = useMemo(() => {
    const map = {};
    columns.forEach(col => {
      const key = Object.keys(col)[0];
      map[key] = {
        type: col[key],
        options: col.options || null
      };
    });
    return map;
  }, [columns]);
  const renderEditableCell = (dataIndex) => {
    const config = typeMap[dataIndex];
    const type = config?.type;

    return (text, record) => {
      const value = record[dataIndex];
      const isEditable = actions.includes('edit');
      const handleSwitchChange = (checked) => {
        if (!isEditable) return;
        handleChange(checked);
      };
      const handleChange = val => {
        setDataSource(prev =>
          prev.map(row =>
            row.key === record.key ? { ...row, [dataIndex]: val } : row
          )
        );
      };

      switch (type) {
        case 'integer':
          return (
            <InputNumber
              value={value}
              onChange={handleChange}
              onPaste={e => handlePaste(e, record.key, dataIndex)}
              min={0}
              readOnly={!isEditable}
              onKeyDown={!isEditable ? e => e.preventDefault() : undefined}
            />
          );
        case 'boolean':
          return (
            <Switch
              checked={!!value}
              onChange={handleSwitchChange}
            />
          );
        case 'enum':
          return (
            <Select
              value={value}
              style={{ width: 120 }}
              onChange={handleChange}
              open={isEditable ? undefined : false}
              popupRender={menu => (isEditable ? menu : null)}
              options={(config.options || []).map(opt => ({ label: opt.charAt(0).toUpperCase() + opt.slice(1), value: opt }))}
            />
          );
        case 'string':
        default:
          return (
            <Input
              value={value}
              readOnly={!isEditable}
              onChange={e => handleChange(e.target.value)}
              onPaste={e => handlePaste(e, record.key, dataIndex)}
              onPressEnter={e => e.preventDefault()}
            />
          );
      }
    };
  };

  const handleCreate = () => {
    setDataSource(prev => {
      const used = new Set(prev.map(row => parseInt(row.key, 10)));
      let newKey = 1;
      while (used.has(newKey)) newKey++;

      const newRow = { key: `${newKey}` };

      // Dynamically apply default values based on columns
      columns.forEach(col => {
        const field = Object.keys(col)[0];
        newRow[field] = col.default;
      });

      return [...prev, newRow];
    });
  };

  const handleReset = () => {
    setDataSource([...initialData]);
  };

  const filteredData = dataSource.filter(item => {
    const text = searchText.toLowerCase();

    return columns.some(col => {
      const field = Object.keys(col)[0];
      const value = item[field];

      if (typeof value === 'string' || typeof value === 'enum') {
        return value.toLowerCase().includes(text);
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value).includes(text);
      }

      return false;
    });
  });

  function formatColumns(columnsProp, dataSource, renderEditableCell, setDataSource, router) {
    const formatted = [
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
      })
    ];
    if (['view', 'edit', 'delete'].some(action => actions.includes(action))) {
      formatted.push({
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div className="flex gap-2">
            {actions.includes('view') && (
              <Button size="small" onClick={() => router.push(`${url}/${record.key}`)}>
                View
              </Button>
            )}
            {actions.includes('edit') && (
              <Button size="small" type="primary" onClick={() => router.push(`${url}/edit/${record.key}`)}>
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
      });
    }

    return formatted;
  }
  const Tablecolumns = formatColumns(columns, dataSource, renderEditableCell, setDataSource, router);

  return (
    <div>
      {actions.includes('create') && (
        <>
          <Button type="primary" onClick={handleCreate}>Add</Button>
          <Button onClick={() => router.push(`${url}/create`)} className='mx-4'>Create Instead</Button>
        </>
      )}
      {actions.includes('search') && (
        <Search placeholder="Search anything..." allowClear onChange={e => setSearchText(e.target.value)} className="w-full max-w-md" />
      )}
      <Table dataSource={filteredData} columns={Tablecolumns} pagination={false} className='my-4 border border-black rounded' />
      {actions.includes('reset') && (
        <Button type="primary" onClick={handleReset}>Reset Data</Button>
      )}
    </div>
  );
}