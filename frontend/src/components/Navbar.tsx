import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/services';
import { Link as LinkIcon, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-text">
        <LinkIcon className="text-primary w-8 h-8" />
        Actlink
      </Link>
      
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white/80 hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-primary rounded-full font-medium hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};
