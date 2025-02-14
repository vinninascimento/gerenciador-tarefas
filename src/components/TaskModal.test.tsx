// src/components/TaskModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskModal from './TaskModal';

describe('TaskModal', () => {
  it('should render the modal with correct inputs and buttons', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    const columns = ['Backlog', 'A Fazer', 'Em Andamento'];

    render(
      <TaskModal isOpen={true} onClose={onClose} onSave={onSave} columns={columns} onCreateColumn={function (columnName: string): void {
            throw new Error('Function not implemented.');
        } } />
    );

    expect(screen.getByPlaceholderText('Título da tarefa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descrição da tarefa')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('should call onSave with correct values when form is submitted', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    const columns = ['Backlog', 'A Fazer', 'Em Andamento'];

    render(
      <TaskModal isOpen={true} onClose={onClose} onSave={onSave} columns={columns} onCreateColumn={function (columnName: string): void {
            throw new Error('Function not implemented.');
        } } />
    );

    fireEvent.change(screen.getByPlaceholderText('Título da tarefa'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Descrição da tarefa'), { target: { value: 'Task description' } });

    fireEvent.click(screen.getByText('Salvar'));

    expect(onSave).toHaveBeenCalledWith('New Task', 'Task description', 'Backlog');
  });
});
