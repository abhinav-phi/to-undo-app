import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES } from '../config/categories';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, category: Category, dueDate?: Date) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('habits');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(
        title.trim(),
        category,
        dueDate ? new Date(dueDate) : undefined
      );
      setTitle('');
      setDueDate('');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl 
                     shadow-2xl border border-gray-200 dark:border-gray-700
                     animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Add New To-Undo Task
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What do you want to undo?
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Stop checking social media every 5 minutes"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                       placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(CATEGORIES).map(([key, config]) => (
                <label
                  key={key}
                  className={`
                    flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
                    ${category === key
                      ? `${config.bgColor} ${config.borderColor} ${config.color}`
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="category"
                    value={key}
                    checked={category === key}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="sr-only"
                  />
                  <span className="text-lg">{config.icon}</span>
                  <span className="text-sm font-medium">{config.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Date (Optional)
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 
                       bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 
                       dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};