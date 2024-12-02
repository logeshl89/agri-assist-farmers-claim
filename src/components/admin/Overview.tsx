import React, { useEffect, useState } from 'react';
import { BarChart as BarChartIcon, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { damages, farmers } from '../../services/api';

interface Stats {
  totalClaims: number;
  activeFarmers: number;
  pendingClaims: number;
  approvedClaims: number;
  monthlyStats: any[];
}

export default function Overview() {
  const [stats, setStats] = useState<Stats>({
    totalClaims: 0,
    activeFarmers: 0,
    pendingClaims: 0,
    approvedClaims: 0,
    monthlyStats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [damagesResponse, farmersResponse] = await Promise.all([
          damages.getAll(),
          farmers.getAll()
        ]);

        const damageReports = damagesResponse.data;
        const activeFarmers = farmersResponse.data;

        // Calculate stats
        const pendingClaims = damageReports.filter(report => report.status === 'pending').length;
        const approvedClaims = damageReports.filter(report => report.status === 'approved').length;

        // Group by month for chart data
        const monthlyData = damageReports.reduce((acc, report) => {
          const date = new Date(report.createdAt);
          const month = date.toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const monthlyStats = Object.entries(monthlyData).map(([name, claims]) => ({
          name,
          claims
        }));

        setStats({
          totalClaims: damageReports.length,
          activeFarmers: activeFarmers.length,
          pendingClaims,
          approvedClaims,
          monthlyStats
        });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Claims',
      value: stats.totalClaims.toString(),
      icon: BarChartIcon,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Active Farmers',
      value: stats.activeFarmers.toString(),
      icon: Users,
      change: '+3.2%',
      changeType: 'positive',
    },
    {
      name: 'Pending Claims',
      value: stats.pendingClaims.toString(),
      icon: AlertTriangle,
      change: '-8%',
      changeType: 'negative',
    },
    {
      name: 'Approved Claims',
      value: stats.approvedClaims.toString(),
      icon: CheckCircle,
      change: '+28.3%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className={`mt-2 text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Claims Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="claims" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {stats.monthlyStats.slice(0, 5).map((stat, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">{stat.claims} new claims</p>
                  <p className="text-sm text-gray-600">in {stat.name}</p>
                </div>
                <span className="text-sm text-gray-500">{stat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}