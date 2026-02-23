import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const { addNotification } = useUIStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      addNotification({
        title: 'Welcome back!',
        message: 'You have successfully logged in.',
        type: 'success',
      });
      navigate('/dashboard/client');
    } catch (error) {
      addNotification({
        title: 'Login failed',
        message: 'Invalid email or password. Please try again.',
        type: 'error',
      });
    }
  };

  // Demo credentials helper
  const fillDemoCredentials = (role: string) => {
    switch (role) {
      case 'super_admin':
        setEmail('superadmin@mybillbook.com');
        break;
      case 'sales':
        setEmail('sales@mybillbook.com');
        break;
      case 'client':
        setEmail('client@mybillbook.com');
        break;
      case 'manufacturer':
        setEmail('manufacturer@mybillbook.com');
        break;
      case 'distributor':
        setEmail('distributor@mybillbook.com');
        break;
    }
    setPassword('password');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-none lg:border lg:shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demo Credentials */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 font-medium mb-2">Demo Credentials (Password: &quot;password&quot;)</p>
            <div className="flex flex-wrap gap-2">
              {['super_admin', 'sales', 'client', 'manufacturer', 'distributor'].map((role) => (
                <button
                  key={role}
                  onClick={() => fillDemoCredentials(role)}
                  className="text-xs px-2 py-1 bg-white border border-blue-200 rounded hover:bg-blue-100 transition-colors capitalize"
                >
                  {role.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <NavLink
                to="/auth/forgot-password"
                className="text-sm text-[#1579e6] hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.684.81-1.768 1.46-2.849 1.46-.973 0-1.685-.62-1.685-1.73 0-1.09.62-2.27 1.542-3.08.922-.81 2.036-1.39 2.99-1.39 1.02 0 1.179.62 1.179 1.66zm-10.33 19.57c-.973 0-1.79-.46-2.27-1.23l-3.57 11.29h4.84l2.09-6.52c.37-1.14.68-2.62.68-3.76 0-.97-.31-1.66-1.02-1.66-.43 0-.87.25-1.27.62l-.52-1.85c.87-.74 1.85-1.14 2.97-1.14 1.73 0 2.73 1.21 2.73 3.26 0 1.85-.74 4.34-1.36 6.09l-.62 1.79h-2.09l1.61-5.03c-.25.19-.56.31-.93.31-.5 0-.87-.31-.87-.93 0-.25.06-.5.12-.74l1.36-4.28h2.18l-.37 1.3c.5-.87 1.3-1.48 2.3-1.48 1.61 0 2.42 1.27 2.42 3.01 0 2.05-.99 4.9-1.85 7.13l-.68 1.85h-2.12l1.54-4.84c-.19.12-.43.19-.68.19-.56 0-.99-.37-.99-1.02 0-.25.06-.5.12-.74l1.36-4.28h2.18l-.37 1.3c.5-.87 1.3-1.48 2.3-1.48 1.61 0 2.42 1.27 2.42 3.01 0 2.05-.99 4.9-1.85 7.13l-.68 1.85h-4.47l2.09-6.52c.37-1.14.68-2.62.68-3.76 0-.97-.31-1.66-1.02-1.66-.43 0-.87.25-1.27.62l-.52-1.85c.87-.74 1.85-1.14 2.97-1.14 1.73 0 2.73 1.21 2.73 3.26 0 1.85-.74 4.34-1.36 6.09l-.62 1.79h-2.09l1.61-5.03c-.25.19-.56.31-.93.31-.5 0-.87-.31-.87-.93 0-.25.06-.5.12-.74l1.36-4.28h2.18l-.37 1.3c.5-.87 1.3-1.48 2.3-1.48 1.61 0 2.42 1.27 2.42 3.01 0 2.05-.99 4.9-1.85 7.13l-.68 1.85h-4.47l2.09-6.52c.37-1.14.68-2.62.68-3.76 0-.97-.31-1.66-1.02-1.66-.43 0-.87.25-1.27.62l-.52-1.85c.87-.74 1.85-1.14 2.97-1.14 1.73 0 2.73 1.21 2.73 3.26 0 1.85-.74 4.34-1.36 6.09l-.62 1.79h-2.09l1.61-5.03z" />
              </svg>
              Apple
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <NavLink to="/auth/signup" className="text-[#1579e6] hover:underline font-medium">
              Sign up
            </NavLink>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
