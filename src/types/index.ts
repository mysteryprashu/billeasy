// User Roles
export type UserRole = 'super_admin' | 'sales_admin' | 'manufacturer' | 'distributor' | 'client' | 'affiliate';

// Subscription Plans
export type SubscriptionPlan = 'basic' | 'professional' | 'enterprise';

// User Status
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// Payment Status
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  companyName?: string;
  gstNumber?: string;
  address?: Address;
  subscription?: Subscription;
  referralCode?: string;
  referredBy?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// Address Interface
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// Subscription Interface
export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
}

// Plan Details
export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  limits: {
    invoices: number;
    products: number;
    businesses: number;
    users: number;
  };
}

// Affiliate/Rewards
export interface Affiliate {
  id: string;
  userId: string;
  code: string;
  discountPercent: number;
  commissionPercent: number;
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

// Referral Transaction
export interface ReferralTransaction {
  id: string;
  affiliateId: string;
  referredUserId: string;
  referredUserName: string;
  amount: number;
  commission: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
}

// Offer/Coupon
export interface Offer {
  id: string;
  code: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usageCount: number;
  applicablePlans: SubscriptionPlan[];
  createdBy: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
}

// Sales Lead
export interface SalesLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  assignedTo?: string;
  notes?: string;
  value?: number;
  createdAt: string;
  updatedAt: string;
}

// Payment Transaction
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  paymentGateway: 'dodo' | 'razorpay' | 'stripe';
  transactionId?: string;
  subscriptionId?: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  newSignups: number;
  conversionRate: number;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
}

// Activity Log
export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: string;
  createdAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead?: boolean;
  link?: string;
  createdAt: string;
}

// Invoice (for client dashboard)
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  dueDate: string;
  createdAt: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Product/Inventory
export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  lowStockAlert: number;
  unit: string;
  gstRate: number;
  createdAt: string;
  updatedAt: string;
}

// Permission
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

// Role with Permissions
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
}
