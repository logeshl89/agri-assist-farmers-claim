import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, Users, Plane, FileCheck, BarChart3, Building } from 'lucide-react';

const schemes = [
  {
    title: 'Namo Drone Didi',
    description: 'Empowering women through SHGs by providing drone operation training.',
    icon: Plane,
    benefits: [
      'Free drone operation training for women',
      'Employment opportunities in agricultural tech',
      'Support for drone maintenance and operations'
    ]
  },
  {
    title: 'Sub-Mission on Agricultural Mechanization',
    description: 'Access to necessary software and hardware support for drones.',
    icon: BarChart3,
    benefits: [
      'Financial assistance for drone purchase',
      'Technical support and maintenance',
      'Training and capacity building'
    ]
  },
  {
    title: 'Digital Agriculture Mission',
    description: 'Public access to reports generated from drone assessments.',
    icon: FileCheck,
    benefits: [
      'Transparent damage assessment process',
      'Digital record keeping',
      'Easy access to historical data'
    ]
  },
  {
    title: 'National e-Governance Plan in Agriculture',
    description: 'Support for pre-disaster planning and mitigation strategies.',
    icon: Building,
    benefits: [
      'Integration with ATMA',
      'Real-time monitoring and alerts',
      'Disaster preparedness support'
    ]
  }
];

export default function Schemes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Government Schemes</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Access various government initiatives designed to support farmers in agricultural damage assessment and management
            </p>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {schemes.map((scheme, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <scheme.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{scheme.title}</h3>
                    <p className="text-gray-600 mb-4">{scheme.description}</p>
                    <ul className="space-y-2">
                      {scheme.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <ArrowRight className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 inline-flex items-center text-green-600 hover:text-green-700">
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
              <p className="text-gray-600 mb-8">
                Our team is here to help you understand and apply for these schemes. Contact us for guidance and support.
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Users className="h-5 w-5 mr-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}