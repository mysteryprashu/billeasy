import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  IndianRupee,
  TrendingUp,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 180000, users: 1200 },
  { month: 'Feb', revenue: 220000, users: 1500 },
  { month: 'Mar', revenue: 280000, users: 1900 },
  { month: 'Apr', revenue: 250000, users: 2200 },
  { month: 'May', revenue: 320000, users: 2800 },
  { month: 'Jun', revenue: 380000, users: 3400 },
  { month: 'Jul', revenue: 420000, users: 4100 },
  { month: 'Aug', revenue: 450000, users: 4800 },
];

const planDistribution = [
  { name: 'Basic', value: 4500, color: '#94a3b8' },
  { name: 'Professional', value: 3200, color: '#1579e6' },
  { name: 'Enterprise', value: 1234, color: '#1b4a97' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SuperAdminDashboard() {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of platform performance and metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{formatNumber(stats.totalUsers)}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+12.5%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#1579e6]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalRevenue)}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+23.1%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                  <h3 className="text-2xl font-bold mt-1">{formatNumber(stats.activeSubscriptions)}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+8.3%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.conversionRate}%</h3>
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <ArrowDownRight className="w-4 h-4" />
                    <span>-2.1%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1579e6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1579e6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" tickFormatter={(value) => `₹${value / 1000}K`} />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1579e6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Plan Distribution */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Plan Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {planDistribution.map((plan) => (
                <div key={plan.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{plan.name}</span>
                    <span className="text-muted-foreground">{plan.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(plan.value / 8934) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: plan.color }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Subscribers</span>
                  <span className="font-semibold">8,934</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR & ARR */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recurring Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly (MRR)</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(stats.mrr)}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+15.2%</span>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Annual (ARR)</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(stats.arr)}</p>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+18.7%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                New Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-3xl font-bold">{stats.newSignups}</p>
                  <p className="text-sm text-muted-foreground">New users this week</p>
                </div>
                <div className="h-16 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData.slice(-7)}>
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#1579e6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
