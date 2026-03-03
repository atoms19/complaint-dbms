import React, { useState } from 'react';
import { ArrowLeft, Lock, AlertCircle, ShieldCheck } from 'lucide-react';
import type { Page } from '../App';

interface AdminLoginProps {
  navigateTo: (page: Page) => void;
  onLogin: (success: boolean) => void;
}

export function AdminLogin({ navigateTo, onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-sm text-gray-600">

				</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => {
                  setCredentials({ ...credentials, username: e.target.value });
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials Notice 
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900 mb-1">Demo Credentials</p>
                <p className="text-xs text-amber-700">
                  Username: <code className="bg-amber-100 px-1.5 py-0.5 rounded">admin</code>
                  <br />
                  Password: <code className="bg-amber-100 px-1.5 py-0.5 rounded">admin123</code>
                </p>
              </div>
            </div>
          </div>*/}

          {/* Security Notice */}
          <p className="text-xs text-center text-gray-500 mt-6">
            This is a secure area. All login attempts are monitored.
          </p>
        </div>
      </main>
    </div>
  );
}
