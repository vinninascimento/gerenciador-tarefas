// src/store/TaskContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  column: string;
  createdAt: string | undefined; // Permitir undefined
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  moveTask: (taskId: number, toColumn: string) => void;
  columns: string[];
  addColumn: (columnName: string) => void;
  deleteTask: (taskId: number) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<string[]>(['Backlog', 'A Fazer', 'Em Andamento', 'Fase de Testes', 'Concluído']);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Salvar tarefas no localStorage quando elas forem atualizadas
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() } : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId: number, toColumn: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, column: toColumn, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  const addColumn = (columnName: string) => {
    setColumns((prevColumns) => [...prevColumns, columnName]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, moveTask, columns, addColumn, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
