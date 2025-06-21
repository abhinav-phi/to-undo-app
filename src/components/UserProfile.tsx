import React from 'react';
import { LogOut, User } from 'lucide-react';
import { User as UserType } from '../types';

interface UserProfileProps {
  user: UserType;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-gray-800/80 
                     backdrop-blur-sm border border-gray-200 dark:border-gray-700 
                     rounded-xl shadow-sm">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 
                       rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {user.username}
        </span>
      </div>
      
      <button
        onClick={onLogout}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 
                 dark:hover:text-red-400 transition-all duration-200 
                 hover:scale-110 active:scale-95 rounded-xl 
                 hover:bg-red-50 dark:hover:bg-red-900/20"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
};