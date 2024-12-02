import React, { useEffect, useState } from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { damages } from '../../services/api';

interface DamageReport {
  id: string;
  createdAt: string;
  damageType: string;
  status: string;
  estimatedDamage: number;
  progress: number;
}

export default function ClaimStatus() {
  const [claims, setClaims] = useState<DamageReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    approved: 0
  });

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await damages.getAll();
        const claimsData = response.data;
        setClaims(claimsData);

        // Calculate stats
        setStats({
          total: claimsData.length,
          inProgress: claimsData.filter(claim => claim.status === 'pending').length,
          approved: claimsData.filter(claim => claim.status === 'approved').length
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch claims');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Claims</p>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-semibold">{stats.inProgress}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-semibold">{stats.approved}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Claims History</h2>
        </div>
        <div className="divide-y">
          {claims.map((claim) => (
            <div key={claim.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{claim.damageType}</h3>
                    <p className="text-sm text-gray-600">Claim ID: {claim.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${claim.estimatedDamage.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(claim.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    claim.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : claim.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {claim.status}
                  </span>
                  <span className="text-gray-600">
                    {claim.status === 'pending' ? '60% Complete' : '100% Complete'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      claim.status === 'approved'
                        ? 'bg-green-500'
                        : claim.status === 'rejected'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: claim.status === 'pending' ? '60%' : '100%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}