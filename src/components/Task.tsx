// src/components/Task.tsx
import React from 'react';
import './Task.css';

interface TaskProps {
  id: number;
  title: string;
  description: string;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, description, onEdit, onDelete }) => {
  return (
    <div className="task">
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <button onClick={() => onEdit(id)} className="btn btn-warning">Editar</button>
        <button onClick={() => onDelete(id)} className="btn btn-danger">Excluir</button>
      </div>
    </div>
  );
};

export default Task;
