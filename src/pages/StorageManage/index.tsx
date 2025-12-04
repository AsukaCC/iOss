import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import AddStorageModal from './AddStorageModal';
import ViewStorageModal from './ViewStorageModal';
import { useStorageStore } from '@/store/storageStore';
import { StorageItem } from '@/types';
import Table, { Column } from '@/components/Table';

const StorageManage = () => {
  const storageTypes = [
    {
      name: '阿里云 OSS',
      icon: '#icon-aliyun',
      type: 'aliyun',
    },
    // {
    //   name: '腾讯云 COS',
    //   icon: '#icon-tengxunyun',
    //   type: 'tencent',
    // },
    // {
    //   name: '七牛云 Kodo',
    //   icon: '#icon-qiniuyun',
    //   type: 'qiniu',
    // },
    // {
    //   name: 'Amazon S3',
    //   icon: '#icon-amazon',
    //   type: 's3',
    // },
  ];

  // 选中的存储类型
  const [selectedStorageType, setSelectedStorageType] = useState<string>('');

  // 模态框状态
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // 当前操作的存储项
  const [editingStorage, setEditingStorage] = useState<StorageItem | null>(
    null
  );
  const [viewingStorage, setViewingStorage] = useState<StorageItem | null>(
    null
  );

  const storageList = useStorageStore((state) => state.storageList);
  const addStorage = useStorageStore((state) => state.addStorage);
  const deleteStorage = useStorageStore((state) => state.deleteStorage);
  const updateStorage = useStorageStore((state) => state.updateStorage);

  // 处理存储类型点击
  const handleStorageTypeClick = (type: string) => {
    setSelectedStorageType(type);
  };

  // 初始化选中的存储类型
  useEffect(() => {
    setSelectedStorageType(storageTypes[0].type);
  }, []);

  // 添加存储配置
  const handleAddStorageClick = () => {
    setEditingStorage(null);
    setIsAddModalOpen(true);
  };

  const handleConfirmAdd = (data: { type: string; [key: string]: any }) => {
    const { type, alias, ...restConfig } = data;

    if (editingStorage) {
      // 编辑逻辑
      const updatedStorage: StorageItem = {
        ...editingStorage,
        name: alias || editingStorage.name,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        config: {
          ...restConfig,
        },
      };
      updateStorage(updatedStorage);
    } else {
      // 新增逻辑
      const newStorage: StorageItem = {
        id: Date.now().toString(),
        name: alias || '未命名',
        type: type,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        config: restConfig,
      };
      addStorage(newStorage);
    }

    setIsAddModalOpen(false);
    setEditingStorage(null);
  };

  const handleView = (storage: StorageItem) => {
    setViewingStorage(storage);
    setIsViewModalOpen(true);
  };

  const handleEdit = (storage: StorageItem) => {
    setEditingStorage(storage);
    setIsAddModalOpen(true);
  };

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
    {
      title: '操作',
      key: 'action',
      render: (record) => (
        <div className={styles['action-buttons']}>
          <button
            className={styles['action-btn']}
            onClick={() => handleView(record)}
            title="查看">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-chakan"></use>
            </svg>
          </button>
          <button
            className={styles['action-btn']}
            onClick={() => handleEdit(record)}
            title="编辑">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-icon_bianji"></use>
            </svg>
          </button>
          <button
            className={`${styles['action-btn']} ${styles['delete']}`}
            onClick={() => handleDelete(record.id)}
            title="删除">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-shanchu"></use>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除该存储配置吗？')) {
      deleteStorage(id);
    }
  };

  const getStorageTypeName = (type: string) => {
    const found = storageTypes.find((t) => t.type === type);
    return found ? found.name : type;
  };

  return (
    <div className={styles['storage-manage-container']}>
      <div className={styles['left-sidebar']}>
        {storageTypes.map((type) => (
          <div
            key={type.type}
            title={type.name}
            className={`${styles['storage-type-item']} ${
              selectedStorageType === type.type ? styles['active'] : ''
            }`}
            onClick={() => handleStorageTypeClick(type.type)}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={type.icon}></use>
            </svg>
          </div>
        ))}
      </div>
      <div className={styles['right-content']}>
        <div className={styles['tool-bar']}>
          <div className={styles['button-group']}>
            <button
              className={styles['button-item']}
              onClick={handleAddStorageClick}
              title="新建存储">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-xinjian"></use>
              </svg>
            </button>
            {/* <button className={styles['button-item']}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shanchu"></use>
              </svg>
            </button> */}
          </div>
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
            />
          </div>
        </div>
        <div className={styles['storage-table-container']}>
          <Table
            data={storageList}
            columns={columns}
            rowKey="id"
            emptyText="暂无存储配置"
          />
        </div>
      </div>

      <AddStorageModal
        visible={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingStorage(null);
        }}
        onConfirm={handleConfirmAdd}
        storageTypes={storageTypes}
        defaultType={selectedStorageType}
        initialData={editingStorage}
        isEdit={!!editingStorage}
      />

      <ViewStorageModal
        visible={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        storage={viewingStorage}
        getStorageTypeName={getStorageTypeName}
      />
    </div>
  );
};

export default StorageManage;
