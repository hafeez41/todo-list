import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [dueDate, setDueDate] = useState(task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '');
  const [dueTime, setDueTime] = useState(task.dueDate && task.dueDate.includes(' ') ? format(new Date(task.dueDate), 'HH:mm') : '');
  const [importance, setImportance] = useState(task.importance);
  const [recurring, setRecurring] = useState(task.recurring || 'none'); 
  const [steps, setSteps] = useState(task.steps || [{ name: '', completed: false }]);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].name = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { name: '', completed: false }]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(newSteps);
  };

  const handleSubmit = () => {
    if (!taskName.trim()) {
      setError('Task name is required');
      return;
    }
    
    if (!importance.trim()) {
      setError('Importance level is required');
      return;
    }

    const updatedTask = {
      ...task,
      name: taskName,
      dueDate: dueDate ? (dueTime ? format(new Date(`${dueDate}T${dueTime}`), 'yyyy-MM-dd HH:mm') : format(new Date(dueDate), 'yyyy-MM-dd')) : '',
      importance,
      recurring,
      steps: steps.filter(step => step.name.trim()), 
      progress: steps.length ? (steps.filter(step => step.completed).length / steps.length) * 100 : 0,
    };

    onSave(updatedTask);
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
        <h2 className="text-2xl mb-4 text-gray-900 dark:text-gray-100">Edit Task</h2>
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
          onChange={(e) => {
            setDueDate(e.target.value);
            if (!e.target.value) setDueTime('');
          }}
        />
        <input
          type="time"
          className="form-input mt-1 block w-full mb-4 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          disabled={!dueDate}
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
        <select
          className="form-select mt-1 block w-full mb-4 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
          value={recurring}
          onChange={(e) => setRecurring(e.target.value)}
        >
          <option value="none">No Recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-gray-900 dark:text-gray-300">Steps</h3>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="form-input mt-1 block w-full mb-1 transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                placeholder={`Step ${index + 1}`}
                value={step.name}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              {index > 0 && (
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2 transition duration-300 hover:bg-red-700"
                  onClick={() => handleRemoveStep(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 transition duration-300 hover:bg-blue-700"
            onClick={handleAddStep}
          >
            Add Step
          </button>
        </div>
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

export default EditTaskModal;
