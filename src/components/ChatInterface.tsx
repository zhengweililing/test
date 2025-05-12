import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiTrash2 } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import '../styles/ChatInterface.css';
import { sendMessageToAI } from '../services/aiService';
import { saveMessages, getMessages, clearMessages } from '../services/storageService';
import type { Message } from '../types/message';

// 使用从types/message导入的Message接口

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 加载保存的消息历史
  useEffect(() => {
    const savedMessages = getMessages();
    // 将字符串日期转换回Date对象
    const parsedMessages = savedMessages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
    setMessages(parsedMessages);
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 生成唯一ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // 处理用户输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 保存消息到本地存储
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  // 处理消息发送
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: generateId(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    const userInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // 使用aiService获取AI响应
      const aiResponseText = await sendMessageToAI(userInput);
      
      const aiResponse: Message = {
        id: generateId(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // 添加错误消息
      const errorMessage: Message = {
        id: generateId(),
        text: '抱歉，无法获取AI响应，请稍后再试。',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 清除所有消息
  const handleClearMessages = () => {
    setMessages([]);
    clearMessages();
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI 助手</h2>
        {messages.length > 0 && (
          <button 
            className="clear-button" 
            onClick={handleClearMessages} 
            title="清除所有消息"
          >
            <FiTrash2 />
          </button>
        )}
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <RiRobot2Line size={50} />
            <p>发送消息开始与AI对话</p>
          </div>
        ) : (
          messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? <FiUser /> : <RiRobot2Line />}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.sender === 'ai' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message ai-message">
            <div className="message-avatar">
              <RiRobot2Line />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={input.trim() === '' || isLoading}
          className={input.trim() === '' || isLoading ? 'disabled' : ''}
        >
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;