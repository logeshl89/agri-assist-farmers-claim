import React from 'react';
import { Tractor, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Tractor className="h-8 w-8 text-green-500" />
              <span className="text-xl font-bold text-white">AgriAssist</span>
            </div>
            <p className="text-gray-400">
              Empowering farmers with advanced technology for better agricultural management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-500 transition-colors">Damage Assessment</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Subsidy Claims</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Drone Surveys</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-green-500" />
                <span>support@agriassist.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-green-500" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AgriAssist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}