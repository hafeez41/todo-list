import React, { useState, useEffect } from 'react'; 
import { FiPlus, FiMoon, FiSun } from 'react-icons/fi';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import TaskList from '../components/TaskList';
import FilterSidebar from '../components/FilterSidebar';
import { loadTasks, saveTasks } from '../utils/localStorage';

const Home = ({ toggleDarkMode }) => {
  const [tasks, setTasks] = useState(loadTasks());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter !== 'all' && task.importance.toLowerCase() !== filter) return false;
    if (searchQuery && !task.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleDarkMode();
  };

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ease-in-out ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
      <div className="card-container transition-all duration-500 ease-in-out bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-transition">Todo List</h1>
          </div>
          <button
            className="transition-colors duration-500 ease-in-out bg-white dark:bg-gray-800 p-2 rounded"
            onClick={handleToggleDarkMode}
          >
            {darkMode ? <FiSun className="text-transition text-gray-700 dark:text-gray-300" /> : <FiMoon className="text-transition text-gray-700 dark:text-gray-300" />}
          </button>
        </div>
        <div className="flex space-x-2 items-center mb-6">
          <input
            type="text"
            className="form-input mt-1 block w-full"
            placeholder="Search note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-full transition duration-300 hover:bg-blue-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FiPlus />
          </button>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full">
          <FilterSidebar filter={filter} setFilter={setFilter} />
          <div className="w-full">
            <TaskList
              tasks={filteredTasks}
              onEdit={(task) => {
                setCurrentTask(task);
                setIsEditModalOpen(true);
              }}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </div>
        {isAddModalOpen && <AddTaskModal onClose={() => setIsAddModalOpen(false)} onSave={handleAddTask} />}
        {isEditModalOpen && currentTask && (
          <EditTaskModal
            task={currentTask}
            onClose={() => setIsEditModalOpen(false)}
            onSave={(updatedTask) => {
              handleEditTask(updatedTask);
              setIsEditModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
