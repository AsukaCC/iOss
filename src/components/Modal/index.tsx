import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: string | number;
  className?: string;
  maskClosable?: boolean;
}

const Modal = ({
  visible,
  onClose,
  title,
  children,
  footer,
  width = 500,
  className = '',
  maskClosable = true,
}: ModalProps) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return createPortal(
    <div className={styles['modal-overlay']} onClick={handleOverlayClick}>
      <div
        className={`${styles['modal-content']} ${className}`}
        style={modalStyle}>
        {title && (
          <div className={styles['modal-header']}>
            <div className={styles['modal-title']}>{title}</div>
            <button className={styles['close-button']} onClick={onClose}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-guanbi"></use>
              </svg>
            </button>
          </div>
        )}
        <div className={styles['modal-body']}>{children}</div>
        {footer !== null && (
          <div className={styles['modal-footer']}>
            {footer ? (
              footer
            ) : (
              <>
                <button
                  className={`${styles['button']} ${styles['button-cancel']}`}
                  onClick={onClose}>
                  取消
                </button>
                <button
                  className={`${styles['button']} ${styles['button-primary']}`}
                  onClick={onClose}>
                  确定
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

