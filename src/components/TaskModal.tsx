// src/components/TaskModal.tsx
import React, { useState, useEffect } from 'react';
import './TaskModal.css';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string, column: string, taskId?: number) => void;
  columns: string[];
  taskToEdit?: any;
  onCreateColumn: (columnName: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  columns,
  taskToEdit,
  onCreateColumn,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState('');
  const [newColumnName, setNewColumnName] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setColumn(taskToEdit.column);
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (title && description && (column || newColumnName)) {
      onSave(title, description, column || newColumnName, taskToEdit?.id);
      onClose();
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const handleCreateColumn = () => {
    if (newColumnName) {
      onCreateColumn(newColumnName);
      setColumn(newColumnName); // Seleciona a nova coluna
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{taskToEdit ? 'Editar Tarefa' : 'Criar Tarefa'}</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={column} onChange={(e) => setColumn(e.target.value)}>
          <option value="">Escolher coluna</option>
          {columns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
        <div>
          <input
            type="text"
            placeholder="Nova Coluna"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <button onClick={handleCreateColumn}>Criar Coluna</button>
        </div>
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default TaskModal;
