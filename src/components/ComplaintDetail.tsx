import React, { useState } from 'react';
import { LayoutDashboard, LogOut, ArrowLeft, Save, AlertCircle, User, Calendar, FileText } from 'lucide-react';
import type { Page, Complaint } from '../App';

interface ComplaintDetailProps {
  navigateTo: (page: Page) => void;
  complaint: Complaint;
  onUpdate: (id: string, updates: Partial<Complaint>) => void;
  onLogout: () => void;
}

export function ComplaintDetail({ navigateTo, complaint, onUpdate, onLogout }: ComplaintDetailProps) {
  const [status, setStatus] = useState(complaint.status);
  const [adminResponse, setAdminResponse] = useState(complaint.adminResponse || '');
  const [assignedTo, setAssignedTo] = useState(complaint.assignedTo || '');
  const [saved, setSaved] = useState(false);

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Facilities Management',
    'Library',
    'Food Services',
    'Student Welfare',
    'Academic Affairs',
    'Administration'
  ];

  const handleSave = () => {
    onUpdate(complaint.id, {
      status,
      adminResponse: adminResponse.trim() || undefined,
      assignedTo: assignedTo || undefined
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getUrgencyColor = (urgency: Complaint['urgency']) => {
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigateTo('admin-complaints')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to All Complaints</span>
        </button>

        {/* Save Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Save className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm text-green-700 font-medium">Changes saved successfully</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{complaint.title}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-indigo-600">{complaint.id}</span>
                    <span className="text-gray-300">•</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getUrgencyColor(complaint.urgency)}`}>
                      {complaint.urgency} Priority
                    </span>
                    {complaint.isAnonymous && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                          Anonymous Submission
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-gray-900">{complaint.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">
                      {complaint.dateSubmitted.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Detailed Description</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {complaint.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Response Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Admin Response</h2>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Enter your response to the student..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                This response will be visible to the student when they track their complaint.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Status Management</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Complaint['status'])}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Department
                  </label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                  >
                    <option value="">Not Assigned</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Additional Information</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Type</p>
                    <p className="text-sm text-gray-600">
                      {complaint.isAnonymous ? 'Anonymous' : 'Identified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Attachments</p>
                    <p className="text-sm text-gray-600">
                      {complaint.attachments?.length || 0} file(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Priority Level</p>
                    <p className="text-sm text-gray-600">{complaint.urgency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
