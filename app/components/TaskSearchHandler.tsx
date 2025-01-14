
'use client';
import React, { useState, useEffect } from 'react';

interface TaskSearchHandlerProps {
  onSearch: (params: { title?: string; description?: string }) => void;
}

const TaskSearchHandler: React.FC<TaskSearchHandlerProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<{ title?: string; description?: string }>({});

  const handleInputChange = (field: 'title' | 'description') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchParams((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  
  useEffect(() => {
    onSearch(searchParams);
  }, [searchParams, onSearch]);

  return (
    <div className="search-container mb-4">
      <div className="search-fields flex space-x-2">
        <input
          type="text"
          placeholder="Search by Title"
          onChange={handleInputChange('title')}
          className="px-4 py-2 border rounded-l-lg"
        />
        <input
          type="text"
          placeholder="Search by Description"
          onChange={handleInputChange('description')}
          className="px-4 py-2 border rounded-r-lg"
        />
      </div>
    </div>
  );
};

export default TaskSearchHandler;
