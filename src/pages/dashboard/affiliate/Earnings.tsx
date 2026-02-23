import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  IndianRupee,
  Wallet,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const monthlyEarnings = [
  { month: 'Jan', earnings: 2500, pending: 500 },
  { month: 'Feb', earnings: 4200, pending: 800 },
  { month: 'Mar', earnings: 3800, pending: 600 },
  { month: 'Apr', earnings: 5500, pending: 1000 },
  { month: 'May', earnings: 7200, pending: 1200 },
  { month: 'Jun', earnings: 6800, pending: 900 },
];

const transactions = [
  { id: '1', date: '2024-06-15', description: 'Commission from Rahul S.', amount: 299, status: 'paid' },
  { id: '2', date: '2024-06-14', description: 'Commission from Priya P.', amount: 999, status: 'paid' },
  { id: '3', date: '2024-06-12', description: 'Commission from Amit K.', amount: 299, status: 'pending' },
  { id: '4', date: '2024-06-10', description: 'Commission from Sunita R.', amount: 999, status: 'paid' },
  { id: '5', date: '2024-06-08', description: 'Commission from Vikram M.', amount: 2999, status: 'pending' },
];

export function Earnings() {
  const { affiliates } = useAdminStore();
  const { user } = useAuthStore();
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const affiliate = affiliates.find((a) => a.userId === user?.id) || {
    totalEarnings: 15000,
    pendingEarnings: 3000,
    totalReferrals: 25,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleWithdraw = () => {
    setIsWithdrawDialogOpen(false);
    setWithdrawAmount('');
  };

  const totalPaid = transactions
    .filter((t) => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPending = transactions
    .filter((t) => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className="text-muted-foreground mt-1">
            Track your commission earnings and withdrawals
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
          onClick={() => setIsWithdrawDialogOpen(true)}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">{formatCurrency(affiliate.totalEarnings)}</p>
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

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(affiliate.pendingEarnings)}</p>
                <div className="flex items-center gap-1 mt-2 text-yellow-600 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Ready to withdraw</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(6800)}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12% vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1579e6]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">{affiliate.totalReferrals}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+3 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Earnings History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => `₹${value}`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="earnings" fill="#22c55e" name="Paid" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        transaction.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {transaction.status === 'paid' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Withdrawal History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-06-01', amount: 5000, status: 'completed', method: 'Bank Transfer' },
              { date: '2024-05-01', amount: 3500, status: 'completed', method: 'UPI' },
              { date: '2024-04-01', amount: 4200, status: 'completed', method: 'Bank Transfer' },
            ].map((withdrawal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      withdrawal.status === 'completed'
                        ? 'bg-green-100'
                        : 'bg-yellow-100'
                    }`}
                  >
                    {withdrawal.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{formatCurrency(withdrawal.amount)}</p>
                    <p className="text-sm text-muted-foreground">{withdrawal.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(withdrawal.date).toLocaleDateString()}
                  </p>
                  <Badge
                    className={
                      withdrawal.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }
                  >
                    {withdrawal.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground">Minimum withdrawal: ₹1,000</p>
              <p className="text-sm text-muted-foreground">Processing time: 3-5 business days</p>
              <p className="text-sm text-muted-foreground">Withdrawal methods: Bank Transfer, UPI</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={
                !withdrawAmount ||
                Number(withdrawAmount) < 1000 ||
                Number(withdrawAmount) > affiliate.pendingEarnings
              }
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
