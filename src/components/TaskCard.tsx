import React, { useState } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { Task } from '../types';
import { CATEGORIES } from '../config/categories';
import { format, isToday, isYesterday } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  
  const category = CATEGORIES[task.category];
  
  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
  };

  return (
    <div className={`
      group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg
      ${task.completed 
        ? 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
        : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800'
      }
      backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]
    `}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200
            hover:scale-110 active:scale-95
            ${task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-400'
            }
          `}
        >
          {task.completed && <Check className="w-4 h-4 mx-auto" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`
              px-2 py-1 rounded-md text-xs font-medium border
              ${category.color} ${category.bgColor} ${category.borderColor}
            `}>
              {category.icon} {category.name}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded-md 
                         bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
              />
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <h3
              className={`
                text-sm font-medium transition-all duration-200 cursor-pointer
                ${task.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }
              `}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Created {formatDate(task.createdAt)}
              {task.completedAt && (
                <> • Completed {formatDate(task.completedAt)}</>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                     transition-colors rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 
                     transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};