import { useEffect, useState } from 'react';
import styles from './AddStorageModal.module.css';
import {
  AddStorageModalProps,
  STORAGE_FORM_CONFIG,
  StorageItem,
} from '@/types';
import Modal from '@/components/Modal';

interface ExtendedAddStorageModalProps extends AddStorageModalProps {
  initialData?: StorageItem | null;
  isEdit?: boolean;
}

const AddStorageModal = ({
  visible,
  onClose,
  onConfirm,
  storageTypes,
  defaultType,
  initialData,
  isEdit = false,
}: ExtendedAddStorageModalProps) => {
  const [selectedType, setSelectedType] = useState(defaultType);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (visible) {
      if (isEdit && initialData) {
        setSelectedType(initialData.type);
        // 回填数据
        const newFormData: Record<string, string> = {
          alias: initialData.name,
          ...initialData.config,
        };
        setFormData(newFormData);
      } else {
        setSelectedType(defaultType);
        setFormData({});
      }
    }
  }, [visible, defaultType, initialData, isEdit]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setFormData({}); // 切换类型时清空表单
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTest = () => {
    console.log('测试连接');
  };

  const handleConfirm = () => {
    // 简单的校验：检查必填项
    const currentConfig = STORAGE_FORM_CONFIG[selectedType] || [];
    const missingFields = currentConfig.filter(
      (field) => field.required && !formData[field.name]
    );

    if (missingFields.length > 0) {
      // TODO: 更好的提示方式
      alert(`请填写: ${missingFields.map((f) => f.label).join(', ')}`);
      return;
    }

    onConfirm({
      type: selectedType,
      ...formData,
    });
    // onClose(); // Let parent handle close
  };

  const currentConfig = STORAGE_FORM_CONFIG[selectedType] || [];

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={isEdit ? '编辑存储' : '添加存储'}
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <div>
            {isEdit && (
              <button
                className={styles['button'] + ' ' + styles['button-test']}
                onClick={handleTest}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-ceshilianjie"></use>
                </svg>
                <span>测试连接</span>
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className={styles['button'] + ' ' + styles['button-cancel']}
              onClick={onClose}>
              取消
            </button>
            <button
              className={styles['button'] + ' ' + styles['button-confirm']}
              onClick={handleConfirm}>
              确定
            </button>
          </div>
        </div>
      }>
      <div
        className={styles['modal-body']}
        style={{ overflowY: 'auto', maxHeight: '60vh' }}>
        <div className={styles['form-item']}>
          <label className={styles['label']}>存储类型</label>
          <select
            className={styles['select']}
            value={selectedType}
            onChange={handleTypeChange}
            disabled={isEdit}>
            {storageTypes.map((type) => (
              <option key={type.type} value={type.type}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {currentConfig.map((field) => (
          <div key={field.name} className={styles['form-item']}>
            <label className={styles['label']}>
              {field.label}
              {field.required && (
                <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>
              )}
            </label>
            <input
              type={field.type}
              className={styles['input']}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddStorageModal;
