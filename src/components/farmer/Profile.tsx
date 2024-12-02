import React from 'react';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative h-32 bg-green-600">
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full p-1">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-green-600 p-1.5 rounded-full text-white hover:bg-green-700">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-6 px-6">
          <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Farmer ID: F-12345</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="flex-1 block w-full rounded-none rounded-r-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Phone className="h-5 w-5" />
                </span>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="flex-1 block w-full rounded-none rounded-r-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  defaultValue="123 Farm Road, Rural County"
                  className="flex-1 block w-full rounded-none rounded-r-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Details */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Farm Details</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Size (Acres)</label>
              <input
                type="number"
                defaultValue="50"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary Crop</label>
              <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                <option>Rice</option>
                <option>Wheat</option>
                <option>Corn</option>
                <option>Soybean</option>
                <option>Cotton</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Save Changes
        </button>
      </div>
    </div>
  );
}