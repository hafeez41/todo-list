
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const AddTaskModal = ({ onClose, onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [importance, setImportance] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = () => {
    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }
    
    if (!importance.trim()) {
      setError('Importance level is required');
      return;
    }

    const newTask = {
      id: uuidv4(),
      name: taskName,
      dueDate: dueDate && dueTime ? format(new Date(`${dueDate}T${dueTime}`), 'yyyy-MM-dd HH:mm') : '',
      importance,
      recurring,
      completed: false,
    };

    onSave(newTask);
    setVisible(false);
    setTimeout(onClose, 300); 
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); 
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96 transition-transform duration-300 transform ${
          visible ? 'scale-100' : 'scale-0'
        }`}
      >
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Add New Task</h2>
        <input
          type="text"
          className="form-input mt-1 block w-full mb-2 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
            if (error) setError('');
          }}
        />
        {error === 'Task name is required' && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="date"
          className="form-input mt-1 block w-full mb-2 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="time"
          className="form-input mt-1 block w-full mb-4 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        <select
          className="form-select mt-1 block w-full mb-4 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          value={importance}
          onChange={(e) => {
            setImportance(e.target.value);
            if (error) setError('');
          }}
        >
          <option value="">Select importance</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {error === 'Importance level is required' && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label className="flex items-center mb-4 text-gray-900 dark:text-gray-300">
          <input
            type="checkbox"
            className="form-checkbox mr-2"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
          />
          Recurring Task
        </label>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 transition duration-300 hover:bg-red-700"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
