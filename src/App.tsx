import { Footer } from './components/Footer';
import { useState, useMemo } from 'react';
import { Plus, Target } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { FilterType } from './types';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import { CategoryFilter } from './components/CategoryFilter';
import { TaskCard } from './components/TaskCard';
import { AddTaskModal } from './components/AddTaskModal';
import { Calendar } from './components/Calendar';
import { FloatingAddButton } from './components/FloatingAddButton';
import { isSameDay } from 'date-fns';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  
  // const {toggletheme} = 
  
  useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by date if selected
    if (selectedDate) {
      filtered = filtered.filter(task => 
        task.dueDate && isSameDay(task.dueDate, selectedDate)
      );
    }

    // Filter by category/status
    switch (activeFilter) {
      case 'all':
        return filtered;
      case 'active':
        return filtered.filter(task => !task.completed);
      case 'completed':
        return filtered.filter(task => task.completed);
      default:
        return filtered.filter(task => task.category === activeFilter);
    }
  }, [tasks, activeFilter, selectedDate]);

  const taskCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: tasks.length,
      active: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
    };

    // Count by category
    tasks.forEach(task => {
      counts[task.category] = (counts[task.category] || 0) + 1;
    });

    return counts;
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
                   dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                           rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                           bg-clip-text text-transparent">
                To-Undo List
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
               Where Bad Habits End and Good Days Begin 
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-500 
                       hover:bg-blue-600 text-white rounded-xl transition-all duration-200 
                       hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <ProgressBar tasks={tasks} />
            
            <CategoryFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />

            {selectedDate && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 
                           rounded-xl p-4 flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  Showing tasks for {selectedDate.toLocaleDateString()}
                </span>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                           dark:hover:text-blue-200 text-sm font-medium"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full 
                                 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {selectedDate ? 'No tasks for this date' : 'No tasks yet'}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500 mb-4">
                    {selectedDate 
                      ? 'Try selecting a different date or add new tasks.'
                      : 'Start by adding habits or behaviors you want to eliminate.'
                    }
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                             rounded-xl transition-colors"
                  >
                    Add Your First Task
                  </button>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Calendar
              tasks={tasks}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTask}
      />

      <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />
        <Footer />
    </div>
  );
}

export default App;