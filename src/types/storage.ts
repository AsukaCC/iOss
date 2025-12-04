// 不同存储类型的表单配置
// 定义字段配置接口
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password';
  required?: boolean;
  placeholder?: string;
}

export const STORAGE_FORM_CONFIG: Record<string, FormField[]> = {
  aliyun: [
    {
      name: 'alias',
      label: '别名',
      type: 'text',
      required: true,
      placeholder: '请输入别名',
    },
    {
      name: 'accessKeyId',
      label: 'AccessKeyId',
      type: 'text',
      required: true,
      placeholder: '请输入 AccessKeyId',
    },
    {
      name: 'accessKeySecret',
      label: 'AccessKeySecret',
      type: 'password',
      required: true,
      placeholder: '请输入 AccessKeySecret',
    },
    {
      name: 'bucket',
      label: 'Bucket',
      type: 'text',
      required: true,
      placeholder: '请输入 Bucket 名称',
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
      required: true,
      placeholder: '例如：oss-cn-hangzhou',
    },
    {
      name: 'endpoint',
      label: '自定义 Endpoint',
      type: 'text',
      required: false,
      placeholder: '可选，例如：https://oss-cn-hangzhou.aliyuncs.com',
    },
  ],
  tencent: [
    {
      name: 'alias',
      label: '别名',
      type: 'text',
      required: true,
      placeholder: '请输入别名',
    },
    {
      name: 'secretId',
      label: 'SecretId',
      type: 'text',
      required: true,
      placeholder: '请输入 SecretId',
    },
    {
      name: 'secretKey',
      label: 'SecretKey',
      type: 'password',
      required: true,
      placeholder: '请输入 SecretKey',
    },
    {
      name: 'bucket',
      label: 'Bucket',
      type: 'text',
      required: true,
      placeholder: '请输入 Bucket 名称',
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
      required: true,
      placeholder: '例如：ap-guangzhou',
    },
  ],
};

export interface StorageItem {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  config: Record<string, any>;
}

export interface StorageState {
  storageList: StorageItem[];
  setStorageList: (storageList: StorageItem[]) => void;
  addStorage: (storage: StorageItem) => void;
  deleteStorage: (id: string) => void;
  updateStorage: (storage: StorageItem) => void;
  getStorageList: () => StorageItem[];
}

export interface StorageType {
  name: string;
  icon: string;
  type: string;
}

export interface AddStorageModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  storageTypes: StorageType[];
  defaultType: string;
}
