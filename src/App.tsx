import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Target } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { FilterType } from './types';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { ThemeToggle } from './components/ThemeToggle';
import { ProgressBar } from './components/ProgressBar';
import { CategoryFilter } from './components/CategoryFilter';
import { TaskCard } from './components/TaskCard';
import { AddTaskModal } from './components/AddTaskModal';
import { Calendar } from './components/Calendar';
import { FloatingAddButton } from './components/FloatingAddButton';
import { Footer } from './components/Footer';
import { isSameDay } from 'date-fns';

function App() {
  const { user, isAuthenticated, showAuth, setShowAuth, login, signup, logout } = useAuth();
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks(user?.id);
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Show auth modal on page load if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuth(true);
    }
  }, [isAuthenticated, setShowAuth]);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
                     dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
        <AuthModal
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          onLogin={login}
          onSignup={signup}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
                   dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 transition-colors duration-300
                   relative overflow-hidden">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 
                       rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-600/20 
                       rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 
                       rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                             rounded-2xl flex items-center justify-center text-white shadow-xl 
                             shadow-blue-500/25 hover:scale-105 transition-transform duration-200">
                <Target className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                             bg-clip-text text-transparent">
                  ToUndo 
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Break free from unwanted habits and behaviors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r 
                         from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 
                         hover:via-purple-600 hover:to-pink-600 text-white rounded-xl 
                         transition-all duration-200 hover:scale-105 active:scale-95 
                         shadow-lg hover:shadow-xl shadow-blue-500/25 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
              <ThemeToggle />
              {user && <UserProfile user={user} onLogout={logout} />}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <ProgressBar tasks={tasks} />
              
              <CategoryFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                taskCounts={taskCounts}
              />

              {selectedDate && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                               border border-blue-200 dark:border-blue-800 rounded-2xl p-6 
                               flex items-center justify-between shadow-lg backdrop-blur-sm">
                  <span className="text-blue-800 dark:text-blue-200 font-semibold">
                    📅 Showing tasks for {selectedDate.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 
                             dark:hover:text-blue-200 text-sm font-semibold px-3 py-1 
                             rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 
                             transition-all duration-200"
                  >
                    Clear filter
                  </button>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 
                                   dark:from-gray-800 dark:to-gray-700 rounded-full 
                                   flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-3">
                      {selectedDate ? 'No tasks for this date' : 'No tasks yet'}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                      {selectedDate 
                        ? 'Try selecting a different date or add new tasks for this day.'
                        : 'Start your journey by adding habits or behaviors you want to eliminate from your life.'
                      }
                    </p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                               hover:from-blue-600 hover:to-purple-600 text-white font-semibold
                               rounded-xl transition-all duration-200 hover:scale-105 active:scale-95
                               shadow-lg hover:shadow-xl"
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

        <Footer />
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addTask}
      />

      <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={login}
        onSignup={signup}
      />
    </div>
  );
}

export default App;