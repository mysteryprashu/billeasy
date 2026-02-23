import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  TrendingUp,
  Menu,
} from 'lucide-react';

const navItems = [
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">MyBill Book</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-[#1579e6]',
                    isActive ? 'text-[#1579e6]' : 'text-muted-foreground'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild>
                <NavLink to="/dashboard/client">Go to Dashboard</NavLink>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <NavLink to="/auth/login">Sign In</NavLink>
                </Button>
                <Button asChild>
                  <NavLink to="/auth/signup">Get Started</NavLink>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">MyBill Book</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block py-3 text-lg font-medium transition-colors',
                        isActive
                          ? 'text-[#1579e6]'
                          : 'text-muted-foreground hover:text-foreground'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-border space-y-3">
                  {isAuthenticated ? (
                    <Button className="w-full" asChild>
                      <NavLink to="/dashboard/client">Go to Dashboard</NavLink>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <NavLink to="/auth/login">Sign In</NavLink>
                      </Button>
                      <Button className="w-full" asChild>
                        <NavLink to="/auth/signup">Get Started</NavLink>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
