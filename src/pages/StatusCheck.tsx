import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, FileText, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import axios from 'axios';

interface StatusStep {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface DamageReport {
  id: string;
  status: string;
  createdAt: string;
  cropType: string;
  estimatedDamage: number;
  farmer: {
    name: string;
  };
}

export default function StatusCheck() {
  const [claimId, setClaimId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [claim, setClaim] = useState<DamageReport | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:5000/api/damages/status/${claimId}`);
      console.log(claimId)
      console.log(response.data.status)
      setClaim(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Claim not found');
      setClaim(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = (status: string): StatusStep[] => {
    const steps = [
      {
        title: 'Claim Submitted',
        description: 'Initial damage report submitted',
        status: 'completed' as const
      },
      {
        title: 'Document Verification',
        description: 'Verifying submitted documents and images',
        status: 'completed' as const
      },
      {
        title: 'Drone Assessment',
        description: 'Aerial survey and damage assessment',
        status: 'completed' as const
      },
      {
        title: 'Expert Review',
        description: 'Technical evaluation by agriculture experts',
        status: 'upcoming' as const
      },
      {
        title: 'Final Approval',
        description: 'Final review and compensation approval',
        status: 'upcoming' as const
      }
    ];

    const statusIndex = {
      'pending': 1,
      'processing': 2,
      'review': 3,
      'approved': 5,
      'rejected': 5
    }[status] || 0;

    return steps.map((step, index) => ({
      ...step,
      status: index < statusIndex ? 'completed' : index === statusIndex ? 'current' : 'upcoming'
    }));
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="pt-20">
          <div className="bg-green-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Check Claim Status</h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
                Track your claim status and view assessment reports
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <form onSubmit={handleSearch} className="flex gap-4">
                  <div className="flex-1">
                    <input
                        type="text"
                        value={claimId}
                        onChange={(e) => setClaimId(e.target.value)}
                        placeholder="Enter your claim ID"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                    />
                  </div>
                  <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </form>
              </div>

              {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-8">
                    {error}
                  </div>
              )}

              {claim && (
                  <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-green-600" />
                          <div>
                            <h2 className="text-2xl font-bold">Claim #{claim.id}</h2>
                            <p className="text-gray-600">
                              Submitted  on {new Date(claim.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                              Crop Type: {claim.cropType}
                            </p>
                            <p className="text-gray-600">
                              Estimated Damage: ${<claim className="estimatedDamage"></claim>}
                            </p>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                                claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                        }`}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                      </div>

                      <div className="space-y-8">
                        {getStatusSteps(claim.status).map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                  step.status === 'completed' ? 'bg-green-100' :
                                      step.status === 'current' ? 'bg-blue-100' :
                                          'bg-gray-100'
                              }`}>
                                {step.status === 'completed' ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : step.status === 'current' ? (
                                    <Clock className="h-5 w-5 text-blue-600" />
                                ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>

                    {claim.status !== 'pending' && (
                        <div className="bg-white rounded-xl shadow-sm p-8">
                          <h3 className="text-xl font-semibold mb-6">Assessment Reports</h3>
                          <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                <span>Drone Assessment Report</span>
                              </div>
                              <Download className="h-5 w-5 text-gray-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                <span>Technical Evaluation Report</span>
                              </div>
                              <Download className="h-5 w-5 text-gray-400" />
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
}