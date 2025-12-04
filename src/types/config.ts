export type ThemeMode = 'light' | 'dark';

export interface ConfigState {
  /** 主题模式 */
  theme: ThemeMode;
  /** 设置主题 */
  setTheme: (theme: ThemeMode) => void;
  /** 切换主题 */
  toggleTheme: () => void;
}
