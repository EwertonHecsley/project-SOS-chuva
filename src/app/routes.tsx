import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardRouter from './pages/DashboardRouter';
import MissingPersonsPage from './pages/MissingPersonsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: LandingPage
      },
      {
        path: 'login',
        Component: LoginPage
      },
      {
        path: 'register',
        Component: RegisterPage
      },
      {
        path: 'dashboard',
        Component: DashboardRouter
      },
      {
        path: 'missing',
        Component: MissingPersonsPage
      }
    ]
  }
]);
