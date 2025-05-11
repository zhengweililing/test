# React AI 对话应用

这是一个基于React和TypeScript构建的AI对话应用，提供了一个简洁美观的聊天界面，用户可以与AI助手进行对话交流。

## 功能特点

- 现代化的聊天界面设计
- 实时消息发送和接收
- 打字指示器动画效果
- 响应式设计，适配移动端和桌面端
- 可扩展的AI服务接口

## 技术栈

- React 19
- TypeScript
- Vite
- React Icons
- Axios

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
  ├── assets/        # 静态资源
  ├── components/    # React组件
  │   └── ChatInterface.tsx  # 聊天界面组件
  ├── services/      # 服务
  │   └── aiService.ts  # AI服务接口
  ├── styles/        # 样式文件
  │   └── ChatInterface.css  # 聊天界面样式
  ├── App.css        # 应用样式
  ├── App.tsx        # 应用入口组件
  └── main.tsx       # 应用入口文件
```

## 自定义AI服务

要连接到真实的AI API，请修改 `src/services/aiService.ts` 文件中的 `sendMessageToAI` 函数，替换为实际的API调用。

```typescript
// 示例：连接到OpenAI API
export const sendMessageToAI = async (message: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${YOUR_API_KEY}`
      }
    }
  );
  
  return response.data.choices[0].message.content;
};
```

## 许可

MIT
