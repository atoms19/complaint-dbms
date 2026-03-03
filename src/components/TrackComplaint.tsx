import React, { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import type { Page, Complaint } from '../App';

interface TrackComplaintProps {
  navigateTo: (page: Page) => void;
  complaints: Complaint[];
}

export function TrackComplaint({ navigateTo, complaints }: TrackComplaintProps) {
  const [complaintId, setComplaintId] = useState('');
  const [searchedComplaint, setSearchedComplaint] = useState<Complaint | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const found = complaints.find(c => c.id === complaintId.toUpperCase());
    if (found) {
      setSearchedComplaint(found);
      setNotFound(false);
    } else {
      setSearchedComplaint(null);
      setNotFound(true);
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getUrgencyColor = (urgency: Complaint['urgency']) => {
    switch (urgency) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-amber-600';
      case 'High':
        return 'text-red-600';
    }
  };

  const statusSteps = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
  const getCurrentStep = (status: Complaint['status']) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Track Your Complaint</h1>
          <p className="text-gray-600">
            Enter your complaint reference ID to check its current status
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Complaint Reference ID
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={complaintId}
              onChange={(e) => {
                setComplaintId(e.target.value);
                setNotFound(false);
              }}
              placeholder="e.g., CMP001"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors uppercase"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
          {notFound && (
            <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Complaint not found. Please check your reference ID and try again.
            </p>
          )}
        </div>

        {/* Complaint Details */}
        {searchedComplaint && (
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="font-semibold text-gray-900 mb-6">Current Status</h2>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200" />
                
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= getCurrentStep(searchedComplaint.status);
                  const isCurrent = index === getCurrentStep(searchedComplaint.status);
                  
                  return (
                    <div key={step} className="relative flex gap-4 mb-8 last:mb-0">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-indigo-600' 
                          : 'bg-gray-200'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className={`font-medium ${
                          isCurrent ? 'text-indigo-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-gray-600 mt-1">
                            Your complaint is currently being processed
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Complaint Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="font-semibold text-gray-900 mb-6">Complaint Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Reference ID</p>
                  <p className="font-semibold text-gray-900">{searchedComplaint.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Title</p>
                  <p className="font-semibold text-gray-900">{searchedComplaint.title}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="font-medium text-gray-900">{searchedComplaint.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Urgency</p>
                    <p className={`font-medium ${getUrgencyColor(searchedComplaint.urgency)}`}>
                      {searchedComplaint.urgency}
                    </p>
                  </div>
                </div>

                {searchedComplaint.department && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Assigned Department</p>
                    <p className="font-medium text-gray-900">{searchedComplaint.department}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Submitted</p>
                  <p className="font-medium text-gray-900">
                    {searchedComplaint.dateSubmitted.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(searchedComplaint.status)}`}>
                    <Clock className="w-4 h-4" />
                    {searchedComplaint.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                    {searchedComplaint.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Response */}
            {searchedComplaint.adminResponse && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <Eye className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h2 className="font-semibold text-indigo-900">Admin Response</h2>
                    <p className="text-sm text-indigo-700">Response from administration</p>
                  </div>
                </div>
                <p className="text-gray-900 leading-relaxed">
                  {searchedComplaint.adminResponse}
                </p>
              </div>
            )}

            {/* Resolution Feedback (for resolved complaints) */}
            {searchedComplaint.status === 'Resolved' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                <h2 className="font-semibold text-gray-900 mb-4">Was this resolution helpful?</h2>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Yes, Satisfied
                  </button>
                  <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    No, Need Follow-up
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Hint */}
        {!searchedComplaint && !notFound && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-3">Try these sample IDs:</h3>
            <div className="flex flex-wrap gap-2">
              {complaints.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setComplaintId(c.id);
                    setSearchedComplaint(c);
                  }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
