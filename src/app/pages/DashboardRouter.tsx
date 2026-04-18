import { useAuth } from '../context/AuthContext';
import VolunteerDashboard from './VolunteerDashboard';
import NeedHelpDashboard from './NeedHelpDashboard';
import { Navigate } from 'react-router';

export default function DashboardRouter() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.type === 'volunteer') {
    return <VolunteerDashboard />;
  }

  return <NeedHelpDashboard />;
}
