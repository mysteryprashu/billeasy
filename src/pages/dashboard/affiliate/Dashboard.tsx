import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore, useAuthStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Users,
  IndianRupee,
  TrendingUp,
  Link,
  Gift,
  ArrowUpRight,
  Copy,
  CheckCircle,
  Share2,
  Wallet,
  Percent,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 2500, referrals: 3 },
  { month: 'Feb', earnings: 4200, referrals: 5 },
  { month: 'Mar', earnings: 3800, referrals: 4 },
  { month: 'Apr', earnings: 5500, referrals: 6 },
  { month: 'May', earnings: 7200, referrals: 8 },
  { month: 'Jun', earnings: 6800, referrals: 7 },
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

export function AffiliateDashboard() {
  const { affiliates } = useAdminStore();
  const { user } = useAuthStore();
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copied, setCopied] = useState(false);

  // Find affiliate data for current user
  const affiliate = affiliates.find((a) => a.userId === user?.id) || {
    code: user?.referralCode || 'REF2024',
    discountPercent: 15,
    commissionPercent: 10,
    totalReferrals: 25,
    totalEarnings: 15000,
    pendingEarnings: 3000,
  };

  const referralLink = `${window.location.origin}/auth/signup?ref=${affiliate.code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = () => {
    setIsWithdrawDialogOpen(false);
    setWithdrawAmount('');
  };

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
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your referrals and earnings
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
          onClick={() => setIsWithdrawDialogOpen(true)}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Withdraw Earnings
        </Button>
      </div>

      {/* Referral Link Card */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Your Referral Link</h3>
                <p className="text-white/80 text-sm">
                  Share this link with your network and earn commissions
                </p>
              </div>
              <div className="flex gap-2">
                <div className="bg-white/20 rounded-lg px-4 py-2 font-mono text-sm flex items-center">
                  {referralLink}
                </div>
                <Button
                  variant="secondary"
                  onClick={handleCopyLink}
                  className="bg-white text-[#1579e6] hover:bg-white/90"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white text-[#1579e6] hover:bg-white/90"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Referrals</p>
                  <h3 className="text-2xl font-bold mt-1">{affiliate.totalReferrals}</h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+5 this month</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {formatCurrency(affiliate.totalEarnings)}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Lifetime</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {formatCurrency(affiliate.pendingEarnings)}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-yellow-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Next payout</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-yellow-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">Commission Rate</p>
                  <h3 className="text-2xl font-bold mt-1">{affiliate.commissionPercent}%</h3>
                  <div className="flex items-center gap-1 mt-2 text-blue-600 text-sm">
                    <Percent className="w-4 h-4" />
                    <span>Per sale</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1579e6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1579e6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" tickFormatter={(value) => `₹${value}`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="#1579e6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorEarnings)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referrals Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Referrals per Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Bar dataKey="referrals" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Program Details */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Affiliate Program Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Your Referral Code</h4>
                <div className="flex items-center gap-2">
                  <code className="bg-white px-3 py-1 rounded border font-mono">
                    {affiliate.code}
                  </code>
                  <Button variant="ghost" size="icon" onClick={() => navigator.clipboard.writeText(affiliate.code)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Discount You Offer</h4>
                <p className="text-2xl font-bold text-[#1579e6]">{affiliate.discountPercent}%</p>
                <p className="text-sm text-muted-foreground">Off on all plans</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Your Commission</h4>
                <p className="text-2xl font-bold text-green-600">{affiliate.commissionPercent}%</p>
                <p className="text-sm text-muted-foreground">Of each sale</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Earnings</DialogTitle>
            <DialogDescription>
              Available balance: {formatCurrency(affiliate.pendingEarnings)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Amount to Withdraw</label>
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                max={affiliate.pendingEarnings}
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Minimum withdrawal: ₹1,000</p>
              <p className="text-sm text-muted-foreground">Processing time: 3-5 business days</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || Number(withdrawAmount) < 1000}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Request Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
