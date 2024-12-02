import React from 'react';
import { Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: 'Rice', value: 45 },
  { name: 'Wheat', value: 30 },
  { name: 'Corn', value: 25 },
  { name: 'Soybean', value: 20 },
  { name: 'Cotton', value: 15 },
];

const pieData = [
  { name: 'Flood', value: 40 },
  { name: 'Drought', value: 30 },
  { name: 'Pest', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Analytics & Reports</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Damage by Crop Type */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Damage by Crop Type</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Damage Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Damage Type Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Total Claims Value</h4>
          <p className="text-3xl font-bold text-green-600">$1,234,567</p>
          <p className="text-sm text-gray-600 mt-2">+12.5% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Average Claim Amount</h4>
          <p className="text-3xl font-bold text-green-600">$4,567</p>
          <p className="text-sm text-gray-600 mt-2">-3.2% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Processing Time</h4>
          <p className="text-3xl font-bold text-green-600">4.2 days</p>
          <p className="text-sm text-gray-600 mt-2">-1.5 days from last month</p>
        </div>
      </div>
    </div>
  );
}