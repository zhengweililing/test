// 主题服务，用于管理应用的主题设置

type Theme = 'light' | 'dark';

const THEME_KEY = 'app_theme';

// 获取当前主题
export const getTheme = (): Theme => {
  try {
    // 尝试从本地存储获取主题设置
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    
    // 如果有保存的主题设置，则返回该设置
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // 如果没有保存的主题设置，则检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // 默认返回浅色主题
    return 'light';
  } catch (error) {
    console.error('获取主题设置失败:', error);
    return 'light';
  }
};

// 保存主题设置
export const saveTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
    // 更新文档根元素的data-theme属性
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.error('保存主题设置失败:', error);
  }
};

// 切换主题
export const toggleTheme = (): Theme => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  saveTheme(newTheme);
  return newTheme;
};

// 初始化主题
export const initTheme = (): void => {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
};