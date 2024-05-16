import React, { useState } from 'react';
import { format } from 'date-fns';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Task = ({ task, onEdit, onDelete, onToggleComplete, onToggleCompleteStep }) => {
  const [expanded, setExpanded] = useState(false);

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

  const calculateProgress = (steps) => {
    if (!steps.length) return 0;
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  const progress = calculateProgress(task.steps);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md mb-4 flex flex-col transition-transform duration-300 transform hover:scale-105 opacity-100 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="form-checkbox mr-2"
          />
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full ${getImportanceColor(task.importance)} mr-2`}></div>
            <div className={task.completed ? 'line-through' : ''}>
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
      {task.steps.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg text-gray-900 dark:text-gray-100">Steps</h4>
          <div className="mt-2">
            {task.steps.slice(0, 2).map((step, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => onToggleCompleteStep(task.id, index)}
                  className="form-checkbox mr-2"
                />
                <span className={step.completed ? 'line-through' : ''}>{step.name}</span>
              </div>
            ))}
            {expanded && task.steps.slice(2).map((step, index) => (
              <div key={index + 2} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={step.completed}
                  onChange={() => onToggleCompleteStep(task.id, index + 2)}
                  className="form-checkbox mr-2"
                />
                <span className={step.completed ? 'line-through' : ''}>{step.name}</span>
              </div>
            ))}
            {task.steps.length > 2 && (
              <button
                className="text-blue-500 mt-2 transition duration-300 hover:text-blue-700"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show Less' : `Show ${task.steps.length - 2} More Steps`}
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
