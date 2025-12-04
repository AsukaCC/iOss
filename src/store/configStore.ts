import { ConfigState, ThemeMode } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/**
 * 获取系统主题偏好
 */
const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

/**
 * 配置 Store
 * 使用 zustand 管理应用配置，支持持久化到 localStorage
 */
export const useConfigStore = create<ConfigState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),

      setTheme: (theme: ThemeMode) => {
        set({ theme });
        // 应用主题到 document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },
    }),
    {
      name: 'config-storage', // localStorage 的 key
      // 只持久化 theme
      partialize: (state) => ({ theme: state.theme }),
      // 从 localStorage 读取后，应用主题到 document
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          // 如果 localStorage 中没有保存的主题，使用系统主题
          if (!state.theme) {
            state.theme = getSystemTheme();
          }
          // 应用主题
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    }
  )
);
