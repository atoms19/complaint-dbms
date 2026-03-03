import React from 'react';
import { LayoutDashboard, LogOut, TrendingUp, Download, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Page, Complaint } from '../App';

interface AdminAnalyticsProps {
  navigateTo: (page: Page) => void;
  complaints: Complaint[];
  onLogout: () => void;
}

export function AdminAnalytics({ navigateTo, complaints, onLogout }: AdminAnalyticsProps) {
  // Category breakdown data
  const categoryData = Object.entries(
    complaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Status breakdown data
  const statusData = [
    { name: 'Submitted', value: complaints.filter(c => c.status === 'Submitted').length },
    { name: 'Under Review', value: complaints.filter(c => c.status === 'Under Review').length },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length }
  ];

  // Monthly trend data (mock data for demonstration)
  const monthlyData = [
    { month: 'Aug', complaints: 12 },
    { month: 'Sep', complaints: 19 },
    { month: 'Oct', complaints: 15 },
    { month: 'Nov', complaints: 22 },
    { month: 'Dec', complaints: 18 },
    { month: 'Jan', complaints: complaints.length }
  ];

  // Urgency breakdown
  const urgencyData = [
    { name: 'High', value: complaints.filter(c => c.urgency === 'High').length },
    { name: 'Medium', value: complaints.filter(c => c.urgency === 'Medium').length },
    { name: 'Low', value: complaints.filter(c => c.urgency === 'Low').length }
  ];

  const COLORS = {
    category: ['#4f46e5', '#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626'],
    status: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'],
    urgency: ['#ef4444', '#f59e0b', '#10b981']
  };

  const stats = [
    {
      label: 'Average Resolution Time',
      value: '4.2 days',
      change: '-12%',
      trend: 'down'
    },
    {
      label: 'Resolution Rate',
      value: '82%',
      change: '+8%',
      trend: 'up'
    },
    {
      label: 'Student Satisfaction',
      value: '4.6/5',
      change: '+0.3',
      trend: 'up'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Complaint Management System</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button 
              onClick={() => navigateTo('admin-dashboard')}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              Overview
            </button>
            <button 
              onClick={() => navigateTo('admin-complaints')}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              All Complaints
            </button>
            <button 
              className="px-4 py-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
            >
              Analytics
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Export */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
            <p className="text-gray-600 mt-1">Comprehensive insights into complaint patterns and resolution metrics</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Complaints Trend (Last 6 Months)</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="complaints" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Complaints by Category</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Status Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.status[index % COLORS.status.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Urgency Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Urgency Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={urgencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {urgencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.urgency[index % COLORS.urgency.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Department Performance</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Complaints</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resolved</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Resolution Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Facilities Management', total: 2, resolved: 1, pending: 1, avgTime: '5.2 days', performance: 85 },
                  { name: 'Academic Affairs', total: 1, resolved: 0, pending: 1, avgTime: '3.1 days', performance: 92 },
                  { name: 'Student Welfare', total: 1, resolved: 0, pending: 1, avgTime: '2.8 days', performance: 95 },
                  { name: 'Food Services', total: 1, resolved: 1, pending: 0, avgTime: '1.5 days', performance: 98 }
                ].map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{dept.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{dept.total}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">{dept.resolved}</td>
                    <td className="px-6 py-4 text-sm text-amber-600 font-medium">{dept.pending}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{dept.avgTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${dept.performance}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{dept.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
