import { useTheme } from '../../hooks/useTheme';
import styles from './index.module.css';

interface ThemeToggleProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 是否显示为导航项样式（用于 NavBar）
   */
  variant?: 'default' | 'nav-item';
}

/**
 * 主题切换组件
 * 支持在亮色和暗色两种主题间切换
 */
const ThemeToggle = ({ className, variant = 'default' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  // 切换主题：light <-> dark
  const handleThemeToggle = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  // 获取主题图标
  const getThemeIcon = () => {
    if (theme === 'light') {
      return (
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-heianmoshi"></use>
        </svg>
      );
    } else {
      return (
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-liangsemoshi"></use>
        </svg>
      );
    }
  };

  // 获取主题提示文本
  const getThemeTitle = () => {
    return theme === 'light' ? '亮色模式' : '暗色模式';
  };

  const buttonClassName =
    variant === 'nav-item'
      ? className || styles['theme-toggle']
      : `${styles['theme-toggle']} ${className || ''}`;

  return (
    <button
      className={buttonClassName}
      aria-label="主题切换"
      title={getThemeTitle()}
      onClick={handleThemeToggle}>
      {getThemeIcon()}
    </button>
  );
};

export default ThemeToggle;
