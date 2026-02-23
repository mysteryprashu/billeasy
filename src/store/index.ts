import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  SubscriptionPlan, 
  UserRole, 
  DashboardStats, 
  Notification,
  Offer,
  SalesLead,
  Affiliate,
  ReferralTransaction,
  Payment,
  PlanDetails,
  Activity,
  Invoice,
  Product,
  Role
} from '@/types';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  companyName?: string;
  phone?: string;
  role?: UserRole;
  referralCode?: string;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'superadmin@mybillbook.com',
    name: 'Super Admin',
    role: 'super_admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin',
    phone: '+91 98765 43210',
    companyName: 'MyBill Book',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'sales@mybillbook.com',
    name: 'Sales Manager',
    role: 'sales_admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sales',
    phone: '+91 98765 43211',
    companyName: 'MyBill Book Sales',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '3',
    email: 'client@mybillbook.com',
    name: 'Demo Client',
    role: 'client',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=client',
    phone: '+91 98765 43212',
    companyName: 'Demo Business',
    gstNumber: '27AABCU9603R1ZX',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    subscription: {
      id: 'sub_1',
      plan: 'professional',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      amount: 999,
      billingCycle: 'yearly',
      features: ['Unlimited Invoices', 'Inventory Management', 'GST Reports', 'Multi-business'],
    },
  },
  {
    id: '4',
    email: 'manufacturer@mybillbook.com',
    name: 'Demo Manufacturer',
    role: 'manufacturer',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manufacturer',
    phone: '+91 98765 43213',
    companyName: 'Demo Manufacturing Ltd',
    gstNumber: '27AABCU9603R1ZY',
    referralCode: 'MANU2024',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '5',
    email: 'distributor@mybillbook.com',
    name: 'Demo Distributor',
    role: 'distributor',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=distributor',
    phone: '+91 98765 43214',
    companyName: 'Demo Distribution',
    gstNumber: '27AABCU9603R1ZZ',
    referralCode: 'DIST2024',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          name: data.name,
          role: data.role || 'client',
          status: 'active',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
          phone: data.phone,
          companyName: data.companyName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// UI Store
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
        }));
      },
      
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        }));
      },
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'ui-storage',
    }
  )
);

// Subscription Store
interface SubscriptionState {
  plans: PlanDetails[];
  currentPlan: PlanDetails | null;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  subscribe: (planId: SubscriptionPlan) => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      billingCycle: 'monthly',
      currentPlan: null,
      plans: [
        {
          id: 'basic',
          name: 'Basic',
          description: 'Perfect for small businesses just getting started',
          monthlyPrice: 99,
          yearlyPrice: 999,
          features: [
            'Up to 100 invoices/month',
            'Up to 50 products',
            '1 business',
            'Basic reports',
            'Email support',
          ],
          limits: {
            invoices: 100,
            products: 50,
            businesses: 1,
            users: 1,
          },
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'Best for growing businesses with multiple needs',
          monthlyPrice: 299,
          yearlyPrice: 2999,
          isPopular: true,
          features: [
            'Unlimited invoices',
            'Unlimited products',
            'Up to 5 businesses',
            'Advanced reports & analytics',
            'GST filing integration',
            'Priority support',
            'Inventory management',
          ],
          limits: {
            invoices: -1,
            products: -1,
            businesses: 5,
            users: 3,
          },
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'For large organizations with custom requirements',
          monthlyPrice: 999,
          yearlyPrice: 9999,
          features: [
            'Everything in Professional',
            'Unlimited businesses',
            'Unlimited users',
            'Custom integrations',
            'Dedicated account manager',
            'API access',
            'White-label options',
            '24/7 phone support',
          ],
          limits: {
            invoices: -1,
            products: -1,
            businesses: -1,
            users: -1,
          },
        },
      ],

      setBillingCycle: (cycle) => set({ billingCycle: cycle }),

      subscribe: async (planId) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const plan = useSubscriptionStore.getState().plans.find(p => p.id === planId);
        if (plan) {
          set({ currentPlan: plan });
        }
      },
    }),
    {
      name: 'subscription-storage',
    }
  )
);

// Admin Store
interface AdminState {
  users: User[];
  leads: SalesLead[];
  offers: Offer[];
  affiliates: Affiliate[];
  referralTransactions: ReferralTransaction[];
  payments: Payment[];
  activities: Activity[];
  stats: DashboardStats;
  roles: Role[];
  
  // Actions
  fetchUsers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  updateUserStatus: (userId: string, status: User['status']) => Promise<void>;
  createOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'usageCount'>) => Promise<void>;
  updateOffer: (id: string, offer: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  createLead: (lead: Omit<SalesLead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLead: (id: string, lead: Partial<SalesLead>) => Promise<void>;
  createRole: (role: Omit<Role, 'id' | 'createdAt'>) => Promise<void>;
  updateRole: (id: string, role: Partial<Role>) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
}

// Mock data
const mockOffers: Offer[] = [
  {
    id: '1',
    code: 'WELCOME20',
    name: 'Welcome Offer',
    description: '20% off on first subscription',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1000,
    usageCount: 245,
    applicablePlans: ['basic', 'professional', 'enterprise'],
    createdBy: '1',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    code: 'YEARLY50',
    name: 'Yearly Subscription Discount',
    description: 'Flat ₹500 off on yearly plans',
    discountType: 'fixed',
    discountValue: 500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 500,
    usageCount: 89,
    applicablePlans: ['professional', 'enterprise'],
    createdBy: '1',
    status: 'active',
    createdAt: '2024-01-01',
  },
];

const mockLeads: SalesLead[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    companyName: 'Sharma Traders',
    source: 'Website',
    status: 'qualified',
    assignedTo: '2',
    value: 2999,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    companyName: 'Patel Enterprises',
    source: 'Referral',
    status: 'proposal',
    assignedTo: '2',
    value: 9999,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
  },
];

const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    userId: '4',
    code: 'MANU2024',
    discountPercent: 15,
    commissionPercent: 10,
    totalReferrals: 25,
    totalEarnings: 15000,
    pendingEarnings: 3000,
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    userId: '5',
    code: 'DIST2024',
    discountPercent: 20,
    commissionPercent: 15,
    totalReferrals: 40,
    totalEarnings: 35000,
    pendingEarnings: 5000,
    status: 'active',
    createdAt: '2024-01-01',
  },
];

const mockStats: DashboardStats = {
  totalUsers: 15420,
  totalRevenue: 2847500,
  activeSubscriptions: 8934,
  newSignups: 342,
  conversionRate: 23.5,
  mrr: 245000,
  arr: 2940000,
};

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['*'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Sales Manager',
    description: 'Manage leads, offers, and clients',
    permissions: ['leads:read', 'leads:write', 'offers:read', 'offers:write', 'users:read', 'payments:read'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Support Agent',
    description: 'Handle customer support',
    permissions: ['users:read', 'tickets:read', 'tickets:write'],
    isSystem: false,
    createdAt: '2024-01-01',
  },
];

export const useAdminStore = create<AdminState>()((set, get) => ({
  users: mockUsers,
  leads: mockLeads,
  offers: mockOffers,
  affiliates: mockAffiliates,
  referralTransactions: [],
  payments: [],
  activities: [],
  stats: mockStats,
  roles: mockRoles,

  fetchUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ users: mockUsers });
  },

  fetchStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ stats: mockStats });
  },

  updateUserStatus: async (userId, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      users: state.users.map(u => u.id === userId ? { ...u, status } : u),
    }));
  },

  createOffer: async (offer) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOffer: Offer = {
      ...offer,
      id: Math.random().toString(36).substr(2, 9),
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ offers: [...state.offers, newOffer] }));
  },

  updateOffer: async (id, offer) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      offers: state.offers.map(o => o.id === id ? { ...o, ...offer } : o),
    }));
  },

  deleteOffer: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      offers: state.offers.filter(o => o.id !== id),
    }));
  },

  createLead: async (lead) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newLead: SalesLead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ leads: [...state.leads, newLead] }));
  },

  updateLead: async (id, lead) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      leads: state.leads.map(l => l.id === id ? { ...l, ...lead, updatedAt: new Date().toISOString() } : l),
    }));
  },

  createRole: async (role) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRole: Role = {
      ...role,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ roles: [...state.roles, newRole] }));
  },

  updateRole: async (id, role) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      roles: state.roles.map(r => r.id === id ? { ...r, ...role } : r),
    }));
  },

  deleteRole: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set((state) => ({
      roles: state.roles.filter(r => r.id !== id),
    }));
  },
}));

// Client Store (for invoices, products)
interface ClientState {
  invoices: Invoice[];
  products: Product[];
  fetchInvoices: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  createInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt'>) => Promise<void>;
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    clientName: 'ABC Enterprises',
    clientEmail: 'abc@example.com',
    amount: 5000,
    tax: 900,
    total: 5900,
    status: 'paid',
    dueDate: '2024-02-15',
    createdAt: '2024-01-15',
    items: [
      { id: '1', name: 'Product A', quantity: 10, rate: 500, amount: 5000 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    clientName: 'XYZ Traders',
    clientEmail: 'xyz@example.com',
    amount: 8000,
    tax: 1440,
    total: 9440,
    status: 'pending',
    dueDate: '2024-02-28',
    createdAt: '2024-01-20',
    items: [
      { id: '1', name: 'Product B', quantity: 20, rate: 400, amount: 8000 },
    ],
  },
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product A',
    sku: 'SKU-001',
    category: 'Electronics',
    price: 500,
    cost: 350,
    stock: 100,
    lowStockAlert: 20,
    unit: 'pcs',
    gstRate: 18,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Product B',
    sku: 'SKU-002',
    category: 'Accessories',
    price: 400,
    cost: 280,
    stock: 50,
    lowStockAlert: 10,
    unit: 'pcs',
    gstRate: 18,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

export const useClientStore = create<ClientState>()((set) => ({
  invoices: mockInvoices,
  products: mockProducts,

  fetchInvoices: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ invoices: mockInvoices });
  },

  fetchProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ products: mockProducts });
  },

  createInvoice: async (invoice) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newInvoice: Invoice = {
      ...invoice,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ invoices: [...state.invoices, newInvoice] }));
  },

  createProduct: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
}));
