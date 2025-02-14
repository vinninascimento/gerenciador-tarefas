// src/App.tsx
import React, { useState } from 'react';
import { useTasks } from './store/TaskContext';
import TaskModal from './components/TaskModal';
import Task from './components/Task'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const App: React.FC = () => {
  const { tasks, columns, addTask, updateTask, deleteTask, addColumn } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any>(null);

  const handleOpenModal = (task?: any) => {
    setTaskToEdit(task || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = (title: string, description: string, column: string, taskId?: number) => {
    const newTask = {
      id: taskId || tasks.length + 1,
      title,
      description,
      column,
      createdAt: taskId ? tasks.find((task) => task.id === taskId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (taskId) {
      updateTask(taskId, newTask);
    } else {
      addTask(newTask);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleOnDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId !== source.droppableId) {
      const movedTask = tasks.find((task) => task.id === parseInt(result.draggableId));
      if (movedTask) {
        const updatedTask = { ...movedTask, column: destination.droppableId };
        updateTask(movedTask.id, updatedTask);
      }
    }
  };

  return (
    <div className="container mt-4">
<button className="btn btn-primary mb-3 create-task-button " onClick={() => handleOpenModal()}>
  Criar Tarefa
</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="row d-flex flex-row">
          {columns.map((column, index) => (
            <Droppable droppableId={column} key={index} isDropDisabled={false}>
              {(provided) => (
                <div className="col mx-2 border p-3 bg-light shadow-sm column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h2 className="text-center mb-3">{column}</h2>
                  {tasks.filter((task) => task.column === column).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Task
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                          onEdit={handleOpenModal}
                          onDelete={handleDeleteTask}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveTask} columns={columns} taskToEdit={taskToEdit} onCreateColumn={addColumn} />
    </div>
  );
};

export default App;
