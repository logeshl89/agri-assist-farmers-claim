import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Real-time Damage Assessment & Simplified Subsidy Claims
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Empowering farmers with advanced drone technology and streamlined processes for faster, more accurate agricultural damage assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg">
              Get Started
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center gap-2 text-lg border border-white/30">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}