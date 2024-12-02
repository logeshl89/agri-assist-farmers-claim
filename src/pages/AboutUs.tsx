import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Target, Eye, Users, Shield } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        <div className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Empowering farmers through technology and innovation
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600">
                To revolutionize agricultural damage assessment through cutting-edge technology,
                making it easier for farmers to receive timely support and compensation while
                ensuring transparency and efficiency in the process.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-600">
                To create a future where every farmer has access to quick, reliable, and
                technology-driven solutions for agricultural challenges, fostering a more
                resilient and sustainable farming community.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Trust & Transparency</h3>
                <p className="text-gray-600">
                  We believe in building trust through transparent processes and honest communication.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Farmer First</h3>
                <p className="text-gray-600">
                  Every decision we make is centered around the welfare and success of our farmers.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously strive to improve our services through technological advancement.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Rajesh Kumar',
                  position: 'Chief Executive Officer',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
                },
                {
                  name: 'Priya Singh',
                  position: 'Chief Technology Officer',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
                },
                {
                  name: 'Amit Patel',
                  position: 'Head of Operations',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}