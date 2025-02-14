// src/index.tsx (ou main.tsx, conforme sua estrutura de projeto)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Seu componente principal
import { TaskProvider } from './store/TaskContext';  // Importe o TaskProvider

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <TaskProvider>  {/* Envolva o App com o TaskProvider */}
    <App />
  </TaskProvider>
);
