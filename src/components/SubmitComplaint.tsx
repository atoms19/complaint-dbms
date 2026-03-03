import React, { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle, ShieldCheck, FileText } from 'lucide-react';
import type { Page, Complaint } from '../App';

interface SubmitComplaintProps {
  navigateTo: (page: Page) => void;
  onSubmit: (complaint: Omit<Complaint, 'id' | 'status' | 'dateSubmitted'>) => void;
}

export function SubmitComplaint({ navigateTo, onSubmit }: SubmitComplaintProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    department: '',
    description: '',
    urgency: 'Medium' as 'Low' | 'Medium' | 'High',
    isAnonymous: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Academic',
    'Infrastructure',
    'Hostel',
    'Faculty',
    'Administration',
    'Harassment',
    'Other'
  ];

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        title: formData.title,
        category: formData.category,
        department: formData.department || undefined,
        description: formData.description,
        urgency: formData.urgency,
        isAnonymous: formData.isAnonymous
      });
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Submit a Complaint</h1>
          <p className="text-gray-600">
            Share your concerns with us. All submissions are taken seriously and will be reviewed by the appropriate department.
          </p>
          
          {/* Privacy Notice */}
          <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-indigo-900 font-medium">Your identity is protected</p>
              <p className="text-xs text-indigo-700 mt-1">
                Anonymous submissions do not store any personal information. You'll receive a reference ID to track your complaint.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Complaint Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Complaint Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief summary of your complaint"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:ring-2 focus:outline-none transition-colors`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category and Department */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } focus:ring-2 focus:outline-none transition-colors`}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Department (Optional)
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
              >
                <option value="">Not specified</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide as much detail as possible about your complaint..."
              rows={6}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              } focus:ring-2 focus:outline-none transition-colors resize-none`}
            />
            <div className="mt-1 flex justify-between items-start">
              {errors.description ? (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              ) : (
                <p className="text-xs text-gray-500">Minimum 20 characters</p>
              )}
              <p className="text-xs text-gray-500">{formData.description.length} characters</p>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Low', 'Medium', 'High'] as const).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level })}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    formData.urgency === level
                      ? level === 'High'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : level === 'Medium'
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* File Upload (Optional) 
          <div className="mb-6 ">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF up to 10MB
              </p>
            </div>
          </div>
			 */}

          {/* Anonymous Toggle */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">Submit Anonymously</span>
                <p className="text-xs text-gray-600 mt-1">
                  Your identity will not be recorded. You'll receive a reference ID to track your complaint.
                </p>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Submit Complaint
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            By submitting, you agree to our terms of use and privacy policy
          </p>
        </form>
      </main>
    </div>
  );
}
