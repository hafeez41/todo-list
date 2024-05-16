import React from 'react';
import { format } from 'date-fns';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getFormattedDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'PPpp') : 'No due date';
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4 flex justify-between items-center transition-transform duration-300 transform hover:scale-105 opacity-100 animate-fade-in">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="form-checkbox mr-2"
        />
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full ${getImportanceColor(task.importance)} mr-2`}></div>
          <div className={`text-transition ${task.completed ? 'line-through' : ''}`}>
            <h3 className="text-xl">{task.name}</h3>
            <p className="text-gray-600">{getFormattedDate(task.dueDate)}</p>
            {task.recurring && <p className="text-blue-500">Recurring</p>}
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <FiEdit className="text-blue-500 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-700" onClick={() => onEdit(task)} />
        <FiTrash className="text-red-500 cursor-pointer transition-colors duration-300 hover:text-red-700" onClick={() => onDelete(task.id)} />
      </div>
    </div>
  );
};

export default Task;
