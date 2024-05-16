import React from 'react';

const FilterSidebar = ({ filter, setFilter }) => {
  const filters = [
    { label: 'All', value: 'all', color: 'bg-gray-500' },
    { label: 'High', value: 'high', color: 'bg-red-500' },
    { label: 'Medium', value: 'medium', color: 'bg-yellow-500' },
    { label: 'Low', value: 'low', color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 w-64 flex flex-col space-y-6 shadow-lg rounded-l-lg transition-colors duration-500 ease-in-out">
      <h2 className="text-xl font-semibold mb-4 text-transition">Filter by Importance</h2>
      <div className="flex flex-col space-y-4">
        {filters.map((f) => (
          <div
            key={f.value}
            className={`flex items-center space-x-2 cursor-pointer ${filter === f.value ? 'font-bold' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            <div className={`w-4 h-4 rounded-full ${f.color}`}></div>
            <span className="text-gray-700 dark:text-gray-300 text-transition">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
