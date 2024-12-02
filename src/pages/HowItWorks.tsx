import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Report Damage',
    description: 'Submit details about crop damage through our user-friendly interface, including photos and location.',
  },
  {
    title: 'Assessment',
    description: 'Our system analyzes the damage using advanced technology and expert verification.',
  },
  {
    title: 'Claim Processing',
    description: 'Claims are reviewed by government officials for quick and fair assessment.',
  },
  {
    title: 'Subsidy Distribution',
    description: 'Approved claims receive subsidies directly through secure payment channels.',
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto">
              Simple, transparent process for agricultural damage assessment and subsidy claims
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How long does the assessment process take?</h3>
                <p className="text-gray-600">The assessment process typically takes 2-3 business days, depending on the complexity of the damage and the completeness of submitted documentation.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What documents do I need to submit?</h3>
                <p className="text-gray-600">You'll need to provide proof of land ownership/lease, identification documents, and clear photographs of the damaged crops.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How are subsidy amounts calculated?</h3>
                <p className="text-gray-600">Subsidy amounts are calculated based on the extent of damage, crop type, and affected area size, following government-approved guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}