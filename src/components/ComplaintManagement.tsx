import React, { useState } from 'react';
import { LayoutDashboard, LogOut, Search, Filter, AlertCircle, Calendar } from 'lucide-react';
import type { Page, Complaint } from '../App';

interface ComplaintManagementProps {
  navigateTo: (page: Page, complaintId?: string) => void;
  complaints: Complaint[];
  onLogout: () => void;
}

export function ComplaintManagement({ navigateTo, complaints, onLogout }: ComplaintManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || complaint.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesUrgency;
  });

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

  const getUrgencyBadge = (urgency: Complaint['urgency']) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
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
              onClick={() => navigateTo('admin-dashboard')}
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
            >
              Overview
            </button>
            <button 
              className="px-4 py-3 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600"
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
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-gray-900">Search & Filter</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, title, or description..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="Academic">Academic</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Hostel">Hostel</option>
                <option value="Faculty">Faculty</option>
                <option value="Administration">Administration</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
              >
                <option value="all">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Urgency Filter */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Urgency:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setUrgencyFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  urgencyFilter === 'all'
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setUrgencyFilter('High')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  urgencyFilter === 'High'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                High
              </button>
              <button
                onClick={() => setUrgencyFilter('Medium')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  urgencyFilter === 'Medium'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setUrgencyFilter('Low')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  urgencyFilter === 'Low'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Low
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredComplaints.length}</span> of <span className="font-medium text-gray-900">{complaints.length}</span> complaints
            </p>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No complaints found matching your filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map(complaint => (
                    <tr 
                      key={complaint.id}
                      onClick={() => navigateTo('admin-complaint-detail', complaint.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-indigo-600">{complaint.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{complaint.title}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{complaint.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${getUrgencyBadge(complaint.urgency)}`}>
                          {complaint.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {complaint.dateSubmitted.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {complaint.isAnonymous ? (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            Anonymous
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            Identified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
