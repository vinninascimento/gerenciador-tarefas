// src/components/Column.tsx
import React from 'react';
import { useTasks } from '../store/TaskContext';

interface ColumnProps {
  title: string;
  tasks: any[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const { moveTask } = useTasks();

  return (
    <div className="column">
      <h3>{title}</h3>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <small>
            Criado em: {new Date(task.createdAt).toLocaleDateString()} | Editado em: {new Date(task.updatedAt).toLocaleDateString()}
          </small>
          <button onClick={() => moveTask(task.id, 'Concluído')}>Mover para Concluído</button>
        </div>
      ))}
    </div>
  );
};

export default Column;
