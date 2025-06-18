import React from 'react';
import { Github, Linkedin, Instagram, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {
        
        /* Social Links - Bottom Left */
        
        }
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">

            <a
        
              href="https://github.com/abhinav-phi" // github username
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 
                       hover:scale-110 active:scale-95"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/abhinavphi" // linkedin handle
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 
                       hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 
                       hover:scale-110 active:scale-95"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/abhinav.phi" // insta handle
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 
                       hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-all duration-200 
                       hover:scale-110 active:scale-95"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Made by section */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Made by ❤️</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">Abhinav</span>
            <span>•</span>
            
            <a
              href="https://github.com/abhinav-phi/to-undo-app" // github repo 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 
                       transition-colors underline decoration-dotted underline-offset-2"
            >
              <Code className="w-4 h-4" />
              CodeBase
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};