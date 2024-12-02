import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell } from 'lucide-react';
import Overview from '../components/admin/Overview';
import ClaimManagement from '../components/admin/ClaimManagement';
import Reports from '../components/admin/Reports';

const navigation = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Claims Management', href: '/admin/claims', icon: FileText },
  { name: 'Reports', href: '/admin/reports', icon: Users },
];

export default function AdminDashboard() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 w-full">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {navigation.find((item) => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-gray-600" />
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/claims" element={<ClaimManagement />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}