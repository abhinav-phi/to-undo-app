import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 
               text-white rounded-full shadow-lg hover:shadow-xl
               transition-all duration-200 hover:scale-110 active:scale-95
               flex items-center justify-center z-40 md:hidden"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};