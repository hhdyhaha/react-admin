// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // 当应用程序包装在<React.StrictMode>中时，您的组件将在开发环境中呈现两次。这用于错误/警告检测
    // <React.StrictMode>
        <App/>
    // </React.StrictMode>,
)
