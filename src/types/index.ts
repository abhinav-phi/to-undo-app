export interface Task {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
  description?: string;
}

export type Category = 
  | 'life'
  | 'work'
  | 'relationships'
  | 'habits'
  | 'health'
  | 'learning'
  | 'urgent'
  | 'personal'
  | 'other';

export interface CategoryConfig {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

export type Theme = 'light' | 'dark';

export type FilterType = 'all' | 'active' | 'completed' | Category;

export interface User {
  id: string;
  username: string;
  email?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}