import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore, useUIStore } from '@/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  CreditCard,
  TrendingUp,
  LayoutDashboard,
  Users,
  Shield,
  Gift,
  Target,
  Briefcase,
  FileText,
  Package,
  BarChart3,
  Link,
  IndianRupee,
} from 'lucide-react';
import type { UserRole } from '@/types';

const getMobileNavItems = (role: UserRole) => {
  switch (role) {
    case 'super_admin':
      return [
        { label: 'Dashboard', path: '/dashboard/super-admin', icon: LayoutDashboard },
        { label: 'Users', path: '/dashboard/super-admin/users', icon: Users },
        { label: 'Roles', path: '/dashboard/super-admin/roles', icon: Shield },
        { label: 'Settings', path: '/dashboard/super-admin/settings', icon: Settings },
      ];
    case 'sales_admin':
      return [
        { label: 'Dashboard', path: '/dashboard/sales', icon: LayoutDashboard },
        { label: 'Leads', path: '/dashboard/sales/leads', icon: Target },
        { label: 'Offers', path: '/dashboard/sales/offers', icon: Gift },
        { label: 'Clients', path: '/dashboard/sales/clients', icon: Briefcase },
      ];
    case 'client':
      return [
        { label: 'Dashboard', path: '/dashboard/client', icon: LayoutDashboard },
        { label: 'Invoices', path: '/dashboard/client/invoices', icon: FileText },
        { label: 'Products', path: '/dashboard/client/products', icon: Package },
        { label: 'Reports', path: '/dashboard/client/reports', icon: BarChart3 },
      ];
    case 'manufacturer':
    case 'distributor':
    case 'affiliate':
      return [
        { label: 'Dashboard', path: '/dashboard/affiliate', icon: LayoutDashboard },
        { label: 'Referrals', path: '/dashboard/affiliate/referrals', icon: Link },
        { label: 'Earnings', path: '/dashboard/affiliate/earnings', icon: IndianRupee },
      ];
    default:
      return [];
  }
};

export function Header() {
  const { notifications, markNotificationRead } = useUIStore();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const mobileNavItems = user ? getMobileNavItems(user.role) : [];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">MyBill Book</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="p-4 space-y-1">
                {mobileNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
                        'hover:bg-accent',
                        isActive && 'bg-gradient-to-r from-[#1579e6]/10 to-transparent text-[#1579e6]'
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 lg:w-80"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <NavLink to="notifications" className="text-xs text-[#1579e6]">
                  View all
                </NavLink>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex items-start gap-3 p-3 cursor-pointer"
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                          notification.type === 'success' && 'bg-green-500',
                          notification.type === 'error' && 'bg-red-500',
                          notification.type === 'warning' && 'bg-yellow-500',
                          notification.type === 'info' && 'bg-blue-500'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-[#1579e6] rounded-full flex-shrink-0" />
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1579e6] to-[#1b4a97] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="profile" className="flex items-center cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="subscription" className="flex items-center cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Subscription
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="settings" className="flex items-center cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
