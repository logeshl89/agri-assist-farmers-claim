import React from 'react';
import { Plane, CloudLightning, FileCheck, BarChart } from 'lucide-react';

const features = [
  {
    icon: Plane,
    title: 'Drone Assessment',
    description: 'Advanced drone technology for quick and accurate damage assessment of agricultural lands.'
  },
  {
    icon: CloudLightning,
    title: 'Real-time Monitoring',
    description: 'Instant updates on weather conditions and potential risks to your crops.'
  },
  {
    icon: FileCheck,
    title: 'Easy Claims',
    description: 'Streamlined subsidy claim process with automated documentation and tracking.'
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Comprehensive analytics and reports for better decision-making.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Transforming Agricultural Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with user-friendly features to streamline the entire assessment process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}