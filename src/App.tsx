import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { SubmitComplaint } from './components/SubmitComplaint';
import { TrackComplaint } from './components/TrackComplaint';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { ComplaintManagement } from './components/ComplaintManagement';
import { ComplaintDetail } from './components/ComplaintDetail';
import { AdminAnalytics } from './components/AdminAnalytics';
import { SubmissionSuccess } from './components/SubmissionSuccess';

export type Page = 
  | 'landing' 
  | 'submit' 
  | 'track' 
  | 'admin-login' 
  | 'admin-dashboard' 
  | 'admin-complaints' 
  | 'admin-complaint-detail'
  | 'admin-analytics'
  | 'success';

export interface Complaint {
  id: string;
  title: string;
  category: string;
  department?: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';
  isAnonymous: boolean;
  dateSubmitted: Date;
  attachments?: string[];
  adminResponse?: string;
  assignedTo?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);
  
  // Mock complaints data
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 'CMP001',
      title: 'Broken AC in Hostel Room',
      category: 'Hostel',
      department: 'Facilities Management',
      description: 'The air conditioning unit in Room 302, Block A has not been working for the past week. Despite multiple requests to the hostel warden, no action has been taken.',
      urgency: 'High',
      status: 'In Progress',
      isAnonymous: false,
      dateSubmitted: new Date('2026-01-10'),
      adminResponse: 'Maintenance team has been notified. Repair scheduled for Jan 15.',
      assignedTo: 'Facilities Management'
    },
    {
      id: 'CMP002',
      title: 'Unfair Grading in Mathematics Course',
      category: 'Academic',
      department: 'Mathematics Department',
      description: 'There seems to be inconsistency in grading for the Calculus II midterm exam. Several students received lower grades without proper feedback.',
      urgency: 'Medium',
      status: 'Under Review',
      isAnonymous: true,
      dateSubmitted: new Date('2026-01-11'),
      assignedTo: 'Academic Affairs'
    },
    {
      id: 'CMP003',
      title: 'Inadequate Library Resources',
      category: 'Infrastructure',
      department: 'Library',
      description: 'The library lacks sufficient copies of recommended textbooks for the Computer Science department. Students have to wait weeks to borrow essential materials.',
      urgency: 'Medium',
      status: 'Submitted',
      isAnonymous: false,
      dateSubmitted: new Date('2026-01-12')
    },
    {
      id: 'CMP004',
      title: 'Harassment by Senior Students',
      category: 'Harassment',
      description: 'First-year students in the mechanical engineering department are being subjected to ragging and harassment by senior students.',
      urgency: 'High',
      status: 'Under Review',
      isAnonymous: true,
      dateSubmitted: new Date('2026-01-09'),
      adminResponse: 'Anti-ragging committee has been informed. Investigation is underway.',
      assignedTo: 'Student Welfare'
    },
    {
      id: 'CMP005',
      title: 'Poor Food Quality in Cafeteria',
      category: 'Infrastructure',
      department: 'Food Services',
      description: 'The food quality in the main cafeteria has deteriorated significantly. Multiple students have reported stomach issues.',
      urgency: 'High',
      status: 'Resolved',
      isAnonymous: false,
      dateSubmitted: new Date('2026-01-05'),
      adminResponse: 'Health inspection conducted. New vendor has been appointed. Quality monitoring enhanced.',
      assignedTo: 'Food Services'
    }
  ]);

  const handleComplaintSubmit = (complaint: Omit<Complaint, 'id' | 'status' | 'dateSubmitted'>) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: `CMP${String(complaints.length + 1).padStart(3, '0')}`,
      status: 'Submitted',
      dateSubmitted: new Date()
    };
    setComplaints([...complaints, newComplaint]);
    setLastSubmittedId(newComplaint.id);
    setCurrentPage('success');
  };

  const handleComplaintUpdate = (id: string, updates: Partial<Complaint>) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const navigateTo = (page: Page, complaintId?: string) => {
    setCurrentPage(page);
    if (complaintId) {
      setSelectedComplaintId(complaintId);
    }
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentPage('landing');
  };

  const selectedComplaint = selectedComplaintId 
    ? complaints.find(c => c.id === selectedComplaintId) 
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'landing' && (
        <Landing navigateTo={navigateTo} />
      )}
      {currentPage === 'submit' && (
        <SubmitComplaint 
          navigateTo={navigateTo}
          onSubmit={handleComplaintSubmit}
        />
      )}
      {currentPage === 'track' && (
        <TrackComplaint 
          navigateTo={navigateTo}
          complaints={complaints}
        />
      )}
      {currentPage === 'admin-login' && (
        <AdminLogin 
          navigateTo={navigateTo}
          onLogin={handleAdminLogin}
        />
      )}
      {currentPage === 'admin-dashboard' && isAdmin && (
        <AdminDashboard 
          navigateTo={navigateTo}
          complaints={complaints}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'admin-complaints' && isAdmin && (
        <ComplaintManagement 
          navigateTo={navigateTo}
          complaints={complaints}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'admin-complaint-detail' && isAdmin && selectedComplaint && (
        <ComplaintDetail 
          navigateTo={navigateTo}
          complaint={selectedComplaint}
          onUpdate={handleComplaintUpdate}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'admin-analytics' && isAdmin && (
        <AdminAnalytics 
          navigateTo={navigateTo}
          complaints={complaints}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'success' && lastSubmittedId && (
        <SubmissionSuccess 
          navigateTo={navigateTo}
          complaintId={lastSubmittedId}
        />
      )}
    </div>
  );
}
