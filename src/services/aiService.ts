import axios from 'axios'

// 这是一个示例服务，用于处理与AI API的通信
// 在实际应用中，你需要替换为真实的AI API端点和密钥

// AI服务的基本URL
const API_BASE_URL = 'https://my-app.awei883882.workers.dev//graphql'

// 发送消息到AI API并获取响应
export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    // 在实际应用中，这里应该使用真实的API端点
    // 目前使用模拟响应进行演示

    // 模拟API调用延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 返回模拟响应
    //return `这是对"${message}"的AI回复。在实际应用中，这里应该是从AI API获取的真实响应。`;

    // 实际API调用示例：

    const response = await axios.post(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query AskDeepseek($prompt: String!) {
              deepseekResponse: askDeepseek(prompt: $prompt)
            }
          `,
        variables: {
          prompt: message, // 替换为实际内容
        },
      }),
    })

    return response.data.message
  } catch (error) {
    console.error('Error sending message to AI:', error)
    throw new Error('无法获取AI响应，请稍后再试')
  }
}
