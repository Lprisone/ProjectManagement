import React from 'react';
import { createRoot } from 'react-dom/client'; // 使用新的 createRoot API
import App from 'src/Menu';

// 获取根 DOM 元素
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement); // 创建根容器
  root.render(<App />); // 渲染应用
} else {
  console.error("Root element not found");
}