import React, { useEffect } from 'react';
import styles from './index.module.css';

export const storageTypes = [
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

interface SideMenuProps {
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

const SideMenu: React.FC<SideMenuProps> = ({
  activeKey,
  onSelect,
  className = '',
}) => {
  // 初始化选中的存储类型
  useEffect(() => {
    if (!activeKey && storageTypes.length > 0) {
      onSelect(storageTypes[0].type);
    }
  }, []);

  return (
    <div className={`${styles['container']} ${className}`}>
      {storageTypes.map((item) => (
        <div
          key={item.type}
          title={item.name}
          className={`${styles['item']} ${
            activeKey === item.type ? styles['active'] : ''
          }`}
          onClick={() => onSelect(item.type)}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={item.icon}></use>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
