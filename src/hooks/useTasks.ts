import { useState, useEffect } from 'react';
import { Task, Category } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('to-undo-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('to-undo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, category: Category, dueDate?: Date) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: new Date(),
      dueDate
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined
          }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask
  };
};