import React from 'react';
import { ShieldCheck, MessageSquare, Search, Lock } from 'lucide-react';
import type { Page } from '../App';

interface LandingProps {
  navigateTo: (page: Page) => void;
}

export function Landing({ navigateTo }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">College Complaint Box</h1>
                <p className="text-xs text-gray-500">Your Voice Matters</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('admin-login')}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <ShieldCheck className="w-4 h-4" />
            100% Anonymous & Secure
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Raise Your Voice.
            <span className="text-indigo-600"> Anonymously.</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            A secure platform for students to submit complaints and concerns without fear. 
            Your identity is protected, and every complaint is reviewed by our administration.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => navigateTo('submit')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Submit a Complaint
            </button>
            <button 
              onClick={() => navigateTo('track')}
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Track Complaint Status
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Anonymous Submission</h3>
              <p className="text-sm text-gray-600">
                Submit complaints without revealing your identity. Your privacy is our priority.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Monitor your complaint status in real-time with a unique reference ID.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Resolution</h3>
              <p className="text-sm text-gray-600">
                Every complaint is reviewed and assigned to the relevant department for action.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 College Complaint Box. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Anonymity Assurance</a>
              <a href="#" className="hover:text-indigo-600">Terms of Use</a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2 inline-block">
              <ShieldCheck className="w-3 h-3 inline mr-1" />
              Your complaints are encrypted and stored securely. We never track IP addresses or personal information for anonymous submissions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
