// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [renderedTasks, setRenderedTasks] = useState([]);

  useEffect(() => {
    
    setRenderedTasks([]);
    const timeout = setTimeout(() => {
      setRenderedTasks(tasks);
    }, 100); 
    return () => clearTimeout(timeout);
  }, [tasks]);

  return (
    <div className="space-y-4 transition-all duration-500 ease-in-out">
      {renderedTasks.map((task) => (
        <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TaskList;
