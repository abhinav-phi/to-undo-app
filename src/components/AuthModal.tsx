import React, { useState } from 'react';
import { X, User, Lock, Mail, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
  onSignup: (username: string, password: string, email?: string) => boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onSignup
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      let success = false;
      
      if (isLoginMode) {
        success = onLogin(username.trim(), password);
        if (!success) {
          setError('Invalid username or password');
        }
      } else {
        success = onSignup(username.trim(), password, email.trim() || undefined);
        if (!success) {
          setError('Username already exists');
        }
      }

      if (success) {
        setUsername('');
        setPassword('');
        setEmail('');
        setError('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setUsername('');
    setPassword('');
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md" />
      
      <div className="relative w-full max-w-md">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl 
                       shadow-2xl border border-white/20 dark:border-gray-700/50
                       animate-in fade-in-0 zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="relative p-8 pb-6">
            <div className="absolute top-6 right-6">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                         rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
                             rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                {isLoginMode ? (
                  <LogIn className="w-8 h-8 text-white" />
                ) : (
                  <UserPlus className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                           dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {isLoginMode ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isLoginMode 
                  ? 'Sign in to access your ToUndo app' 
                  : 'Join us to start breaking free from unwanted habits'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                             rounded-xl text-red-700 dark:text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 
                             dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition-all duration-200
                             text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 
                               dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 
                               focus:border-transparent transition-all duration-200
                               text-gray-900 dark:text-gray-100 placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 
                             dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition-all duration-200
                             text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                       text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLoginMode ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                isLoginMode ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={toggleMode}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 
                         dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                {isLoginMode ? (
                  <>Don't have an account? <span className="text-blue-500">Create one</span></>
                ) : (
                  <>Already have an account? <span className="text-blue-500">Sign in</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};