import { useState, useEffect } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import { FiMoon, FiSun } from 'react-icons/fi'
import { getTheme, toggleTheme, initTheme } from './services/themeService'

function App() {
  const [theme, setTheme] = useState(getTheme())
  
  // 初始化主题
  useEffect(() => {
    initTheme()
  }, [])
  
  // 处理主题切换
  const handleToggleTheme = () => {
    const newTheme = toggleTheme()
    setTheme(newTheme)
  }
  
  return (
    <div className="app" data-theme={theme}>
      <button 
        className="theme-toggle" 
        onClick={handleToggleTheme}
        title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
      >
        {theme === 'light' ? <FiMoon /> : <FiSun />}
      </button>
      <ChatInterface />
    </div>
  )
}

export default App
