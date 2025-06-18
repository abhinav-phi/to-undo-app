import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Task } from '../types';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';

interface CalendarProps {
  tasks: Task[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  tasks,
  selectedDate,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getDateStatus = (date: Date) => {
    const dayTasks = tasks.filter(task => 
      task.dueDate && isSameDay(task.dueDate, date)
    );
    
    if (dayTasks.length === 0) return 'none';
    
    const allCompleted = dayTasks.every(task => task.completed);
    const hasIncomplete = dayTasks.some(task => !task.completed);
    
    if (allCompleted) return 'completed';
    if (hasIncomplete) return 'incomplete';
    return 'none';
  };

  const getDateColor = (date: Date) => {
    const status = getDateStatus(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isToday = isSameDay(date, new Date());
    
    let baseClass = `
      w-8 h-8 flex items-center justify-center text-sm rounded-lg cursor-pointer
      transition-all duration-200 hover:scale-110 active:scale-95
    `;
    
    if (isSelected) {
      baseClass += ' ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800';
    }
    
    if (isToday) {
      baseClass += ' font-bold';
    }
    
    if (!isCurrentMonth) {
      baseClass += ' text-gray-400 dark:text-gray-600';
    } else {
      switch (status) {
        case 'completed':
          baseClass += ' bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700';
          break;
        case 'incomplete':
          baseClass += ' bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700';
          break;
        default:
          baseClass += ' text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
      }
    }
    
    return baseClass;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl 
                   border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 
                     dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 
                     dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 
                     dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => onDateSelect(day)}
            className={getDateColor(day)}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">All tasks completed</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Has incomplete tasks</span>
        </div>
      </div>
    </div>
  );
};