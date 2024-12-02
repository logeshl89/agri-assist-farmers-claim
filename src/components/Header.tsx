import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Tractor, Menu, X, Bell, LogOut } from 'lucide-react';
import { auth } from '../services/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = auth.getCurrentUser();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const menuItems = currentUser
    ? [
        { to: currentUser.role === 'farmer' ? '/farmer' : '/admin', label: 'Dashboard' },
        { to: '/schemes', label: 'Schemes' },
        { to: '/status', label: 'Check Status' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
      ]
    : [
        { to: '/how-it-works', label: 'How It Works' },
        { to: '/schemes', label: 'Schemes' },
        { to: '/status', label: 'Check Status' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
      ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Tractor className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-800">AgriAssist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-gray-600 hover:text-green-600 transition-colors ${
                  location.pathname === item.to ? 'text-green-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <button className="relative">
                  <Bell className="h-6 w-6 text-gray-600 hover:text-green-600 transition-colors" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    2
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-gray-600 hover:text-green-600 transition-colors ${
                    location.pathname === item.to ? 'text-green-600' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}