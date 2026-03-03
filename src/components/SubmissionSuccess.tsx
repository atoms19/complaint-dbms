import React from 'react';
import { CheckCircle, ArrowLeft, Search, FileText } from 'lucide-react';
import type { Page } from '../App';

interface SubmissionSuccessProps {
  navigateTo: (page: Page) => void;
  complaintId: string;
}

export function SubmissionSuccess({ navigateTo, complaintId }: SubmissionSuccessProps) {
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

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Complaint Submitted Successfully
          </h1>
          <p className="text-gray-600 mb-8">
            Your complaint has been received and will be reviewed by our team.
          </p>

          {/* Reference ID */}
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-indigo-700 font-medium mb-2">
              Your Reference ID
            </p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl font-bold text-indigo-900 tracking-wider">
                {complaintId}
              </code>
            </div>
            <p className="text-xs text-indigo-600 mt-3">
              Save this ID to track your complaint status
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigateTo('track')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Track Complaint Status
            </button>
            <button
              onClick={() => navigateTo('submit')}
              className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Submit Another Complaint
            </button>
          </div>

          {/* What's Next */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
            <div className="grid gap-4 text-left">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-indigo-600">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Review</p>
                  <p className="text-xs text-gray-600">Your complaint will be reviewed within 24 hours</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-indigo-600">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Assignment</p>
                  <p className="text-xs text-gray-600">It will be assigned to the relevant department</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-indigo-600">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Resolution</p>
                  <p className="text-xs text-gray-600">You'll receive updates as your complaint progresses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
