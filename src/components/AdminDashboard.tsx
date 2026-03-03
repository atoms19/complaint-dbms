import React from 'react';
import { LayoutDashboard, FileText, BarChart3, LogOut, AlertCircle, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import type { Page, Complaint } from '../App';

interface AdminDashboardProps {
  navigateTo: (page: Page) => void;
  complaints: Complaint[];
  onLogout: () => void;
}

export function AdminDashboard({ navigateTo, complaints, onLogout }: AdminDashboardProps) {
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Submitted').length,
    inProgress: complaints.filter(c => c.status === 'Under Review' || c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    urgent: complaints.filter(c => c.urgency === 'High').length
  };

  const categoryBreakdown = complaints.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentComplaints = [...complaints]
    .sort((a, b) => b.dateSubmitted.getTime() - a.dateSubmitted.getTime())
    .slice(0, 5);

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-700';
      case 'Under Review':
        return 'bg-amber-100 text-amber-700';
      case 'In Progress':
        return 'bg-purple-100 text-purple-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
    }
  };

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
              className="px-4 py-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
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
              onClick={() => navigateTo('admin-analytics')}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              Analytics
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">Total Complaints</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-600 mt-1">Pending Review</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            <p className="text-sm text-gray-600 mt-1">In Progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.resolved}</p>
            <p className="text-sm text-gray-600 mt-1">Resolved</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 bg-red-50">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-900">{stats.urgent}</p>
            <p className="text-sm text-red-700 mt-1">Urgent Complaints</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Complaints */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Recent Complaints</h2>
              <button 
                onClick={() => navigateTo('admin-complaints')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentComplaints.map(complaint => (
                <div 
                  key={complaint.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => {
                    navigateTo('admin-complaint-detail', complaint.id);
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{complaint.title}</p>
                      <p className="text-sm text-gray-500">{complaint.id}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{complaint.category}</span>
                    <span>•</span>
                    <span className={complaint.urgency === 'High' ? 'text-red-600 font-medium' : ''}>
                      {complaint.urgency} Priority
                    </span>
                    <span>•</span>
                    <span>{complaint.dateSubmitted.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-6">Complaints by Category</h2>
            
            <div className="space-y-4">
              {Object.entries(categoryBreakdown)
                .sort((a, b) => b[1] - a[1])
                .map(([category, count]) => {
                  const percentage = (count / complaints.length) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">{category}</span>
                        <span className="text-sm text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h2 className="font-semibold mb-2">Need Help?</h2>
          <p className="text-sm text-indigo-100 mb-4">
            Review pending complaints, update statuses, or generate reports from the navigation menu.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => navigateTo('admin-complaints')}
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              Manage Complaints
            </button>
            <button 
              onClick={() => navigateTo('admin-analytics')}
              className="px-4 py-2 bg-indigo-400 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
