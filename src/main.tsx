// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from '@/store/store.ts'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // 当应用程序包装在<React.StrictMode>中时，您的组件将在开发环境中呈现两次。这用于错误/警告检测
    // <React.StrictMode>
    // 可以让容器组件访问store
    <Provider store={store}>
        <App/>
    </Provider>
    // </React.StrictMode>,
)
