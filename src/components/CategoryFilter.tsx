import React from 'react';
import { FilterType } from '../types';
import { CATEGORIES } from '../config/categories';

interface CategoryFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeFilter,
  onFilterChange,
  taskCounts
}) => {
  const filters: { key: FilterType; label: string; icon?: string }[] = [
    { key: 'all', label: 'All Tasks', icon: '📋' },
    { key: 'active', label: 'Active', icon: '🔥' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    ...Object.entries(CATEGORIES).map(([key, config]) => ({
      key: key as FilterType,
      label: config.name,
      icon: config.icon
    }))
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ key, label, icon }) => {
          const isActive = activeFilter === key;
          const count = taskCounts[key] || 0;
          
          return (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                border backdrop-blur-sm hover:scale-105 active:scale-95
                ${isActive
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {icon && <span>{icon}</span>}
                {label}
                {count > 0 && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-semibold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};