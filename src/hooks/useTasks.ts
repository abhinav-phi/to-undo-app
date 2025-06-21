import { useState, useEffect } from 'react';
import { Task, Category } from '../types';

export const useTasks = (userId?: string) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`to-undo-tasks-${userId}`);
    if (saved) {
      return JSON.parse(saved).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
    }
    return [];
  });

  useEffect(() => {
    if (userId) {
      const tasksToSave = tasks.map(task => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        completedAt: task.completedAt?.toISOString(),
        dueDate: task.dueDate?.toISOString()
      }));
      localStorage.setItem(`to-undo-tasks-${userId}`, JSON.stringify(tasksToSave));
    }
  }, [tasks, userId]);

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