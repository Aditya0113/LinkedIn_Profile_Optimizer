import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  onStartOptimization: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStartOptimization }) => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          LinkedIn Profile Optimizer
        </h1>
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Transform your professional presence with AI-powered optimization
      </p>
      <button 
        onClick={onStartOptimization}
        className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
      >
        Start Optimization
      </button>
    </header>
  );
};

export default Header;