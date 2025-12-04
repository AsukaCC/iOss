import React, { ReactNode } from 'react';
import styles from './index.module.css';

export interface Column<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  render?: (record: T, index: number) => ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T | ((record: T) => string);
  emptyText?: string;
  className?: string;
}

function Table<T>({
  data,
  columns,
  rowKey,
  emptyText = '暂无数据',
  className = '',
}: TableProps<T>) {
  const getRowKey = (record: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey]);
  };

  return (
    <div className={`${styles['table-wrapper']} ${className}`}>
      <div className={styles['table-container']}>
        <table className={styles['table']}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    width: col.width,
                    textAlign: col.align || 'left',
                  }}>
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record, index) => (
                <tr key={getRowKey(record)}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        textAlign: col.align || 'left',
                      }}>
                      {col.render
                        ? col.render(record, index)
                        : col.dataIndex
                        ? (record[col.dataIndex] as ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className={styles['empty-state']}>{emptyText}</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

