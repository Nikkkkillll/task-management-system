// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderKanban, CheckSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${location.pathname === '/dashboard'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/projects"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${location.pathname === '/projects'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <FolderKanban size={18} />
                <span>Projects</span>
              </Link>
              <Link
                to="/tasks"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${location.pathname.includes('/tasks')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <CheckSquare size={18} />
                <span>Tasks</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <User size={18} />
              <span>{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;