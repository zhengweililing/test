// 本地存储服务，用于保存和获取聊天历史记录

// 本地存储服务，用于保存和获取聊天历史记录
import type { Message } from '../types/message';

const STORAGE_KEY = 'chat_history';

// 保存消息历史到本地存储
export const saveMessages = (messages: Message[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('保存消息历史失败:', error);
  }
};

// 从本地存储获取消息历史
export const getMessages = (): Message[] => {
  try {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    return storedMessages ? JSON.parse(storedMessages) : [];
  } catch (error) {
    console.error('获取消息历史失败:', error);
    return [];
  }
};

// 清除所有消息历史
export const clearMessages = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除消息历史失败:', error);
  }
};