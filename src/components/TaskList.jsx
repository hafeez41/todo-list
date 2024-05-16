import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, onToggleCompleteStep }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onToggleCompleteStep={onToggleCompleteStep} 
        />
      ))}
    </div>
  );
};

export default TaskList;
