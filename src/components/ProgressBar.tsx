import React from 'react';
import { Task } from '../types';

interface ProgressBarProps {
  tasks: Task[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Undoing Progress
        </h2>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {completedTasks} of {totalTasks} completed
        </span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full 
                       transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                           animate-pulse"></div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent 
                       via-white/10 to-transparent animate-shimmer"></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        {progress === 100 
          ? "🎉 Amazing! You've completed all your to-undo tasks!" 
          : `${Math.round(progress)}% progress towards breaking free`
        }
      </p>
    </div>
  );
};