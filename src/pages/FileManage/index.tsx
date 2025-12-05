import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import SideMenu, { storageTypes } from '@/components/SideMenu';
import Table, { Column } from '@/components/Table';
import { useStorageStore } from '@/store/storageStore';
import { StorageItem } from '@/types';

const FileManage = () => {
  const navigate = useNavigate();
  const [selectedStorageType, setSelectedStorageType] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const storageList = useStorageStore((state) => state.storageList);

  const handleStorageTypeClick = (type: string) => {
    setSelectedStorageType(type);
  };

  const handleRowClick = (record: StorageItem) => {
    navigate(`/file-manage/detail/${record.id}`);
  };

  const getStorageTypeName = (type: string) => {
    const found = storageTypes.find((t) => t.type === type);
    return found ? found.name : type;
  };

  // 过滤存储列表
  const filteredStorageList = useMemo(() => {
    let filtered = storageList;

    // 按存储类型过滤
    if (selectedStorageType) {
      filtered = filtered.filter((item) => item.type === selectedStorageType);
    }

    // 按搜索关键词过滤
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          getStorageTypeName(item.type).toLowerCase().includes(keyword)
      );
    }

    return filtered;
  }, [storageList, selectedStorageType, searchKeyword]);

  const columns: Column<StorageItem>[] = [
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      render: (record) => (
        <div className={styles['storage-item-name']}>
          <span className={styles['storage-item-name-text']}>
            {record.name}
          </span>
        </div>
      ),
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: (record) => getStorageTypeName(record.type),
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
    },
  ];

  return (
    <div className={styles['file-manage-container']}>
      <SideMenu
        activeKey={selectedStorageType}
        onSelect={handleStorageTypeClick}
      />
      <div className={styles['right-content']}>
        <div className={styles['tool-bar']}>
          <div className={styles['button-group']}></div>
          <div className={styles['search-box']}>
            <span className={styles['search-icon']}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-sousuo"></use>
              </svg>
            </span>
            <input
              className={styles['search-input']}
              type="text"
              placeholder="搜索"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles['file-table-container']}>
          <Table
            data={filteredStorageList}
            columns={columns}
            rowKey="id"
            emptyText="暂无存储配置"
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FileManage;
