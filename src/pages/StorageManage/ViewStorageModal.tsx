import styles from './ViewStorageModal.module.css';
import { StorageItem, STORAGE_FORM_CONFIG } from '@/types';
import Modal from '@/components/Modal';

interface ViewStorageModalProps {
  visible: boolean;
  onClose: () => void;
  storage: StorageItem | null;
  getStorageTypeName: (type: string) => string;
}

const ViewStorageModal = ({
  visible,
  onClose,
  storage,
  getStorageTypeName,
}: ViewStorageModalProps) => {
  if (!visible || !storage) return null;

  // 获取该类型的配置字段定义，用于显示友好的标签名
  const configFields = STORAGE_FORM_CONFIG[storage.type] || [];

  // 获取配置值的显示内容
  const getConfigValue = (key: string, value: any) => {
    // 查找字段定义
    const field = configFields.find((f) => f.name === key);
    // 如果是密码类型，进行脱敏处理
    if (field?.type === 'password') {
      return '********';
    }
    return value;
  };

  // 获取字段的显示标签
  const getFieldLabel = (key: string) => {
    const field = configFields.find((f) => f.name === key);
    return field ? field.label : key;
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="存储详情"
      footer={
        <button
          className={`${styles['button']} ${styles['button-primary']}`}
          onClick={onClose}>
          关闭
        </button>
      }>
      <div className={styles['modal-body-content']}>
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>ID</span>
          <div className={styles['detail-value']}>{storage.id}</div>
        </div>
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>名称 (别名)</span>
          <div className={styles['detail-value']}>{storage.name}</div>
        </div>
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>存储类型</span>
          <div className={styles['detail-value']}>
            {getStorageTypeName(storage.type)}
          </div>
        </div>
        <div className={styles['detail-item']}>
          <span className={styles['detail-label']}>创建时间</span>
          <div className={styles['detail-value']}>{storage.createdAt}</div>
        </div>

        {/* 动态展示配置项 */}
        {Object.entries(storage.config).map(([key, value]) => (
          <div key={key} className={styles['detail-item']}>
            <span className={styles['detail-label']}>{getFieldLabel(key)}</span>
            <div className={styles['detail-value']}>
              {getConfigValue(key, value)}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ViewStorageModal;
