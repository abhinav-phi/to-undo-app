import React, { useState } from 'react';
import { Trash2, Edit3, Check, X, Calendar, Tag } from 'lucide-react';
import { Task, Category } from '../types';
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
  const [editCategory, setEditCategory] = useState(task.category);
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : ''
  );
  
  const category = CATEGORIES[task.category];
  
  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, { 
        title: editTitle.trim(),
        category: editCategory,
        dueDate: editDueDate ? new Date(editDueDate) : undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditDueDate(task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '');
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d');
  };

  return (
    <div className={`
      group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl
      ${task.completed 
        ? 'bg-gray-50/80 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white/90 dark:bg-gray-800/90 border-gray-200/80 dark:border-gray-700/80 hover:bg-white dark:hover:bg-gray-800'
      }
      backdrop-blur-sm hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-2xl
    `}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`
            flex-shrink-0 w-7 h-7 rounded-full border-2 transition-all duration-300
            hover:scale-110 active:scale-95 shadow-sm
            ${task.completed
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-emerald-500/25'
              : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-400 bg-white dark:bg-gray-700'
            }
          `}
        >
          {task.completed && <Check className="w-4 h-4 mx-auto" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className={`
              px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-sm
              ${category.color} ${category.bgColor} ${category.borderColor}
            `}>
              {category.icon} {category.name}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 
                             bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                <Calendar className="w-3 h-3" />
                Due {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-xl 
                           bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSave();
                    }
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(CATEGORIES).map(([key, config]) => (
                    <label
                      key={key}
                      className={`
                        flex items-center gap-1 p-2 rounded-lg border cursor-pointer transition-all text-xs
                        ${editCategory === key
                          ? `${config.bgColor} ${config.borderColor} ${config.color}`
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="editCategory"
                        value={key}
                        checked={editCategory === key}
                        onChange={(e) => setEditCategory(e.target.value as Category)}
                        className="sr-only"
                      />
                      <span className="text-sm">{config.icon}</span>
                      <span className="font-medium truncate">{config.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-xl 
                           bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white 
                           bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg 
                           hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200
                           hover:scale-105 active:scale-95"
                >
                  <Check className="w-3 h-3" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 
                           dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg 
                           hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200
                           hover:scale-105 active:scale-95"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3
                className={`
                  text-base font-semibold transition-all duration-200 cursor-pointer mb-2
                  ${task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}
                onDoubleClick={() => setIsEditing(true)}
              >
                {task.title}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Created {formatDate(task.createdAt)}
                  {task.completedAt && (
                    <> • Completed {formatDate(task.completedAt)}</>
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                       transition-colors rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20
                       hover:scale-110 active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 
                       transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20
                       hover:scale-110 active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};