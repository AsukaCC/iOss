import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './FileDetail.module.css';
import { useStorageStore } from '@/store/storageStore';
import SideMenu from '@/components/SideMenu';

// 文件项类型定义
interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  updatedAt: string;
}

const FileDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const storageList = useStorageStore((state) => state.storageList);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 根据 ID 查找存储配置
  const storage = storageList.find((item) => item.id === id);

  // 文件列表（示例数据，后续可替换为实际数据）
  const [fileList] = useState<FileItem[]>([]);

  // 如果找不到对应的存储配置，返回列表页
  useEffect(() => {
    if (!storage && storageList.length > 0) {
      navigate('/file-manage');
    }
  }, [storage, storageList, navigate]);

  // 处理文件上传
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: 实现文件上传逻辑
      console.log('上传文件:', files);
      // 这里可以添加上传到云存储的逻辑
    }
    // 重置 input，允许重复选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!storage) {
    return (
      <div className={styles['file-detail-container']}>
        <SideMenu activeKey={''} onSelect={() => {}} />
        <div className={styles['right-content']}>
          <div className={styles['loading']}>加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['file-detail-container']}>
      <SideMenu activeKey={storage.type} onSelect={() => {}} />
      <div className={styles['right-content']}>
        <div className={styles['detail-header']}>
          <button
            className={styles['back-button']}
            onClick={() => navigate('/file-manage')}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-fanhui"></use>
            </svg>
            <span>返回</span>
          </button>
          <h2 className={styles['detail-title']}>{storage.name} - 文件管理</h2>
        </div>
        <div className={styles['tool-bar']}>
          <button
            className={styles['upload-button']}
            onClick={handleUpload}
            title="上传文件">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-shangchuan"></use>
            </svg>
            <span>上传文件</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles['file-list-container']}>
          {fileList.length > 0 ? (
            <div className={styles['file-list']}>
              {fileList.map((file) => (
                <div key={file.id} className={styles['file-item']}>
                  <div className={styles['file-info']}>
                    <span className={styles['file-name']}>{file.name}</span>
                    <span className={styles['file-meta']}>
                      {file.size} · {file.updatedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles['empty-state']}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-wenjian"></use>
              </svg>
              <p>暂无文件</p>
              <p className={styles['empty-hint']}>
                点击上方"上传文件"按钮上传文件
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDetail;
