import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  IndianRupee,
  TrendingUp,
  Users,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Zap,
  Plus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const leadData = [
  { month: 'Jan', leads: 45, converted: 12 },
  { month: 'Feb', leads: 52, converted: 18 },
  { month: 'Mar', leads: 48, converted: 15 },
  { month: 'Apr', leads: 65, converted: 22 },
  { month: 'May', leads: 72, converted: 28 },
  { month: 'Jun', leads: 68, converted: 25 },
];

const leadStatusData = [
  { name: 'New', value: 25, color: '#94a3b8' },
  { name: 'Contacted', value: 35, color: '#f59e0b' },
  { name: 'Qualified', value: 20, color: '#1579e6' },
  { name: 'Proposal', value: 12, color: '#8b5cf6' },
  { name: 'Won', value: 8, color: '#22c55e' },
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

export function SalesDashboard() {
  const { leads, offers, fetchStats } = useAdminStore();
  const [stats, setStats] = useState({
    totalLeads: 156,
    convertedLeads: 42,
    totalRevenue: 850000,
    activeOffers: 8,
    conversionRate: 26.9,
  });

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
          <h1 className="text-3xl font-bold">Sales Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track leads, conversions, and sales performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Target className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
          <Button className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]">
            <Plus className="w-4 h-4 mr-2" />
            New Offer
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.totalLeads}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+18.5%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#1579e6]" />
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
                  <p className="text-sm font-medium text-muted-foreground">Converted</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.convertedLeads}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+12.3%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalRevenue)}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+24.7%</span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">Active Offers</p>
                  <h3 className="text-2xl font-bold mt-1">{stats.activeOffers}</h3>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground text-sm">
                    <span>Running campaigns</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Lead Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      name="Total Leads"
                    />
                    <Line
                      type="monotone"
                      dataKey="converted"
                      stroke="#1579e6"
                      strokeWidth={2}
                      name="Converted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lead Status Distribution */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Lead Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {leadStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Conversion Rate & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#1579e6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${stats.conversionRate * 3.52} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold">{stats.conversionRate}%</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">
                  {stats.convertedLeads} out of {stats.totalLeads} leads converted
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Active Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { code: 'WELCOME20', discount: '20% off', usage: '245/1000', progress: 24.5 },
                  { code: 'YEARLY50', discount: '₹500 off', usage: '89/500', progress: 17.8 },
                  { code: 'AFFILIATE15', discount: '15% off', usage: '156/unlimited', progress: 0 },
                ].map((offer) => (
                  <div key={offer.code} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Badge variant="secondary" className="font-mono">
                          {offer.code}
                        </Badge>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {offer.discount}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {offer.usage}
                      </span>
                    </div>
                    <Progress value={offer.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
