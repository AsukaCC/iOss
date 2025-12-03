import { useEffect } from 'react';
import { useConfigStore, ThemeMode } from '../store/configStore';

/**
 * 主题切换 Hook
 * 支持亮色、暗色两种模式，使用 config store 管理状态
 *
 * @deprecated 推荐直接使用 useConfigStore，此 hook 保留用于向后兼容
 */
export const useTheme = () => {
  const theme = useConfigStore((state) => state.theme);
  const setTheme = useConfigStore((state) => state.setTheme);
  const storeToggleTheme = useConfigStore((state) => state.toggleTheme);

  // 确保主题在初始化时被应用
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // 包装 toggleTheme 以保持向后兼容：接受可选的 mode 参数
  const toggleTheme = (mode?: ThemeMode) => {
    if (mode !== undefined) {
      setTheme(mode);
    } else {
      storeToggleTheme();
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};

// 导出 ThemeMode 类型以保持向后兼容
export type { ThemeMode };
