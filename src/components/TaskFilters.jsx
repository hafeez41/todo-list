
import React from 'react';

const TaskFilters = ({ filter, setFilter }) => {
  return (
    <select
      className="form-select mt-1 block"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="high">High Importance</option>
      <option value="medium">Medium Importance</option>
      <option value="low">Low Importance</option>
    </select>
  );
};

export default TaskFilters;
