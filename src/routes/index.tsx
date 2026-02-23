import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store';
import type { UserRole } from '@/types';

// Layouts
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { LandingLayout } from '@/components/layouts/LandingLayout';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

// Landing Pages
import { HomePage } from '@/pages/landing/HomePage';
import { PricingPage } from '@/pages/landing/PricingPage';
import { FeaturesPage } from '@/pages/landing/FeaturesPage';
import { AboutPage } from '@/pages/landing/AboutPage';
import { ContactPage } from '@/pages/landing/ContactPage';

// Dashboard Pages - Super Admin
import { SuperAdminDashboard } from '@/pages/dashboard/super-admin/Dashboard';
import { UserManagement } from '@/pages/dashboard/super-admin/UserManagement';
import { RoleManagement } from '@/pages/dashboard/super-admin/RoleManagement';
import { SystemSettings } from '@/pages/dashboard/super-admin/SystemSettings';

// Dashboard Pages - Sales Admin
import { SalesDashboard } from '@/pages/dashboard/sales/Dashboard';
import { LeadsManagement } from '@/pages/dashboard/sales/LeadsManagement';
import { OffersManagement } from '@/pages/dashboard/sales/OffersManagement';
import { ClientsManagement } from '@/pages/dashboard/sales/ClientsManagement';

// Dashboard Pages - Client
import { ClientDashboard } from '@/pages/dashboard/client/Dashboard';
import { Invoices } from '@/pages/dashboard/client/Invoices';
import { Products } from '@/pages/dashboard/client/Products';
import { ClientReports } from '@/pages/dashboard/client/Reports';

// Dashboard Pages - Manufacturer/Distributor
import { AffiliateDashboard } from '@/pages/dashboard/affiliate/Dashboard';
import { ReferralLinks } from '@/pages/dashboard/affiliate/ReferralLinks';
import { Earnings } from '@/pages/dashboard/affiliate/Earnings';

// Shared Pages
import { SubscriptionPage } from '@/pages/dashboard/SubscriptionPage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';
import { NotificationsPage } from '@/pages/dashboard/NotificationsPage';
import { ProfilePage } from '@/pages/dashboard/ProfilePage';

// Route Guard Component
const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: UserRole[] }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'super_admin':
        return <Navigate to="/dashboard/super-admin" replace />;
      case 'sales_admin':
        return <Navigate to="/dashboard/sales" replace />;
      case 'manufacturer':
      case 'distributor':
      case 'affiliate':
        return <Navigate to="/dashboard/affiliate" replace />;
      default:
        return <Navigate to="/dashboard/client" replace />;
    }
  }

  return <Outlet />;
};

// Public Route Guard (redirect if authenticated)
const PublicRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    switch (user.role) {
      case 'super_admin':
        return <Navigate to="/dashboard/super-admin" replace />;
      case 'sales_admin':
        return <Navigate to="/dashboard/sales" replace />;
      case 'manufacturer':
      case 'distributor':
      case 'affiliate':
        return <Navigate to="/dashboard/affiliate" replace />;
      default:
        return <Navigate to="/dashboard/client" replace />;
    }
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  // Landing Routes
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'features', element: <FeaturesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },

  // Auth Routes
  {
    path: '/auth',
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },

  // Dashboard Routes - Super Admin
  {
    path: '/dashboard/super-admin',
    element: <ProtectedRoute allowedRoles={['super_admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <SuperAdminDashboard /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'roles', element: <RoleManagement /> },
          { path: 'settings', element: <SystemSettings /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  // Dashboard Routes - Sales Admin
  {
    path: '/dashboard/sales',
    element: <ProtectedRoute allowedRoles={['sales_admin', 'super_admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <SalesDashboard /> },
          { path: 'leads', element: <LeadsManagement /> },
          { path: 'offers', element: <OffersManagement /> },
          { path: 'clients', element: <ClientsManagement /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  // Dashboard Routes - Client
  {
    path: '/dashboard/client',
    element: <ProtectedRoute allowedRoles={['client']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <ClientDashboard /> },
          { path: 'invoices', element: <Invoices /> },
          { path: 'products', element: <Products /> },
          { path: 'reports', element: <ClientReports /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  // Dashboard Routes - Affiliate (Manufacturer/Distributor)
  {
    path: '/dashboard/affiliate',
    element: <ProtectedRoute allowedRoles={['manufacturer', 'distributor', 'affiliate']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AffiliateDashboard /> },
          { path: 'referrals', element: <ReferralLinks /> },
          { path: 'earnings', element: <Earnings /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'settings', element: <SettingsPage /> },
          { path: 'notifications', element: <NotificationsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  // Catch all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
