import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-lg p-12 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-primary"></div>
        
        <AlertCircle size={80} className="mx-auto mb-8 text-red-500/50" />
        
        <h1 className="text-6xl font-black mb-4 gradient-text">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        
        <p className="text-white/50 mb-10 text-lg leading-relaxed">
          The link you followed might be broken, or the page may have been removed. 
          Double check the URL and try again.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};
