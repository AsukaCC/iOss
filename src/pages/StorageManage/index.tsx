import { useEffect, useState } from 'react';
import styles from './index.module.css';

const StorageManage = () => {
  const storageTypes = [
    {
      name: '阿里云',
      icon: '#icon-aliyun',
      type: 'aliyun',
    },
  ];

  const [selectedStorageType, setSelectedStorageType] = useState<string>('');

  const handleStorageTypeClick = (type: string) => {
    setSelectedStorageType(type);
  };

  useEffect(() => {
    setSelectedStorageType(storageTypes[0].type);
  }, []);

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
            <button className={styles['button-item']}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-xinjian"></use>
              </svg>
            </button>
            <button className={styles['button-item']}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-shanchu"></use>
              </svg>
            </button>
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
      </div>
    </div>
  );
};

export default StorageManage;
