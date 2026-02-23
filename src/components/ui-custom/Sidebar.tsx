import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useUIStore } from '@/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  TrendingUp,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Package,
  BarChart3,
  Gift,
  Target,
  Briefcase,
  Link,
  IndianRupee,
  Bell,
  CreditCard,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
} from 'lucide-react';
import type { UserRole } from '@/types';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const getNavItems = (role: UserRole): NavItem[] => {
  const commonItems: NavItem[] = [
    { label: 'Dashboard', path: '', icon: LayoutDashboard },
    { label: 'Subscription', path: 'subscription', icon: CreditCard },
    { label: 'Notifications', path: 'notifications', icon: Bell },
    { label: 'Profile', path: 'profile', icon: User },
    { label: 'Settings', path: 'settings', icon: Settings },
  ];

  switch (role) {
    case 'super_admin':
      return [
        { label: 'Dashboard', path: '', icon: LayoutDashboard },
        { label: 'Users', path: 'users', icon: Users },
        { label: 'Roles', path: 'roles', icon: Shield },
        { label: 'System Settings', path: 'settings', icon: Settings },
        { label: 'Subscription', path: 'subscription', icon: CreditCard },
        { label: 'Notifications', path: 'notifications', icon: Bell },
        { label: 'Profile', path: 'profile', icon: User },
      ];
    case 'sales_admin':
      return [
        { label: 'Dashboard', path: '', icon: LayoutDashboard },
        { label: 'Leads', path: 'leads', icon: Target },
        { label: 'Offers', path: 'offers', icon: Gift },
        { label: 'Clients', path: 'clients', icon: Briefcase },
        { label: 'Subscription', path: 'subscription', icon: CreditCard },
        { label: 'Notifications', path: 'notifications', icon: Bell },
        { label: 'Profile', path: 'profile', icon: User },
      ];
    case 'client':
      return [
        { label: 'Dashboard', path: '', icon: LayoutDashboard },
        { label: 'Invoices', path: 'invoices', icon: FileText },
        { label: 'Products', path: 'products', icon: Package },
        { label: 'Reports', path: 'reports', icon: BarChart3 },
        { label: 'Subscription', path: 'subscription', icon: CreditCard },
        { label: 'Settings', path: 'settings', icon: Settings },
        { label: 'Notifications', path: 'notifications', icon: Bell },
        { label: 'Profile', path: 'profile', icon: User },
      ];
    case 'manufacturer':
    case 'distributor':
    case 'affiliate':
      return [
        { label: 'Dashboard', path: '', icon: LayoutDashboard },
        { label: 'Referral Links', path: 'referrals', icon: Link },
        { label: 'Earnings', path: 'earnings', icon: IndianRupee },
        { label: 'Subscription', path: 'subscription', icon: CreditCard },
        { label: 'Settings', path: 'settings', icon: Settings },
        { label: 'Notifications', path: 'notifications', icon: Bell },
        { label: 'Profile', path: 'profile', icon: User },
      ];
    default:
      return commonItems;
  }
};

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = user ? getNavItems(user.role) : [];

  const handleLogout = () => {
    logout();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 288 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border',
          'hidden lg:flex flex-col'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-lg whitespace-nowrap"
                >
                  MyBill Book
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="flex-shrink-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const fullPath = `/dashboard/${user?.role === 'super_admin' ? 'super-admin' : user?.role === 'sales_admin' ? 'sales' : user?.role === 'manufacturer' || user?.role === 'distributor' || user?.role === 'affiliate' ? 'affiliate' : 'client'}/${item.path}`;
              const isActive = location.pathname === fullPath || (item.path === '' && location.pathname === fullPath.replace('/${item.path}', ''));

              const NavContent = (
                <NavLink
                  to={fullPath}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'hover:bg-accent group',
                    isActive && 'bg-gradient-to-r from-[#1579e6]/10 to-transparent text-[#1579e6] border-l-2 border-[#1579e6]'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive ? 'text-[#1579e6]' : 'text-muted-foreground group-hover:text-foreground'
                  )} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm font-medium whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              );

              if (!sidebarOpen) {
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>{NavContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return NavContent;
            })}
          </nav>
        </ScrollArea>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1579e6] to-[#1b4a97] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!sidebarOpen ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="w-5 h-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* Mobile menu button is in Header */}
      </div>
    </TooltipProvider>
  );
}
