import { useAuth } from '../context/AuthContext';
import VolunteerDashboard from './VolunteerDashboard';
import NeedHelpDashboard from './NeedHelpDashboard';
import { Navigate } from 'react-router';

export default function DashboardRouter() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.type === 'volunteer') {
    return <VolunteerDashboard />;
  }
  
  return <NeedHelpDashboard />;
}
