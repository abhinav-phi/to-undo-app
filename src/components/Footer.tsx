import React from 'react';
import { Github, Linkedin, Instagram, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200/50 dark:border-gray-700/50 
                     bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* social media link - Left */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Connect with me:
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/abhinavphi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 
                         dark:hover:text-blue-400 transition-all duration-200 
                         hover:scale-110 active:scale-95 rounded-lg 
                         hover:bg-blue-50 dark:hover:bg-blue-900/20"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/abhinav.phi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 
                         dark:hover:text-pink-400 transition-all duration-200 
                         hover:scale-110 active:scale-95 rounded-lg 
                         hover:bg-pink-50 dark:hover:bg-pink-900/20"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/abhinav-phi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 
                         dark:hover:text-white transition-all duration-200 
                         hover:scale-110 active:scale-95 rounded-lg 
                         hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* made by & codebase - right */}
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Made with ❤️ & 🍵 by{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 
                             bg-clip-text text-transparent font-semibold">
                Abhinav
              </span>
            </span>
            <a
              href="https://github.com/abhinav-phi/to-undo-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-400 
                       hover:text-gray-900 dark:hover:text-white transition-all duration-200 
                       hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg 
                       hover:scale-105 active:scale-95 border border-gray-200 
                       dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">Codebase</span>
            </a>
          </div>
        </div>

        {/* copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ToUndo . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};