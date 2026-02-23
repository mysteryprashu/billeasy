import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Package,
  BarChart3,
  Shield,
  Users,
  Zap,
  Smartphone,
  Lock,
  Cloud,
  ArrowRight,
  Check,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'GST Invoicing',
    description: 'Create professional, GST-compliant invoices in seconds.',
    details: [
      'Automatic GST calculations (CGST, SGST, IGST)',
      'Multiple invoice templates',
      'Custom branding with your logo',
      'Send invoices via email/WhatsApp',
      'Recurring invoices',
      'Credit notes and debit notes',
    ],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels and manage products effortlessly.',
    details: [
      'Real-time stock tracking',
      'Low stock alerts',
      'Product categories and variants',
      'Barcode support',
      'Stock adjustment entries',
      'Purchase order management',
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
  },
  {
    icon: BarChart3,
    title: 'Business Reports',
    description: 'Get insights with detailed reports and analytics.',
    details: [
      'Sales and purchase reports',
      'Profit and loss statements',
      'Balance sheet',
      'Cash flow analysis',
      'Customer and vendor reports',
      'Export to Excel/PDF',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    icon: Shield,
    title: 'GST Filing',
    description: 'Simplify your GST compliance with automated reports.',
    details: [
      'GSTR-1 report generation',
      'GSTR-3B report generation',
      'HSN code summary',
      'Tax liability calculations',
      'Input tax credit tracking',
      'Direct filing integration',
    ],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
  {
    icon: Users,
    title: 'Multi-User Access',
    description: 'Collaborate with your team efficiently.',
    details: [
      'Role-based permissions',
      'Unlimited team members',
      'Activity logs',
      'User management',
      'Department-wise access',
      'Audit trail',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Save time with smart automation features.',
    details: [
      'Payment reminders',
      'Recurring invoices',
      'Auto-backup',
      'Bank reconciliation',
      'Auto-calculations',
      'Smart suggestions',
    ],
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop',
  },
];

const additionalFeatures = [
  { icon: Smartphone, title: 'Mobile App', description: 'Access your business on the go with our mobile app' },
  { icon: Lock, title: 'Bank-Grade Security', description: '256-bit SSL encryption for all your data' },
  { icon: Cloud, title: 'Cloud Backup', description: 'Automatic daily backups to keep your data safe' },
  { icon: Users, title: '24/7 Support', description: 'Round-the-clock customer support via chat, email, and phone' },
];

export function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 bg-[#1579e6]/10 text-[#1579e6]">
              Powerful Features
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Everything You Need to Run Your Business
            </h1>
            <p className="text-xl text-muted-foreground">
              From invoicing to GST filing, MyBill Book provides all the tools you need 
              to manage your business finances efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[#1579e6]" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-xl text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">And Much More</h2>
            <p className="text-muted-foreground mt-2">
              Additional features to help you run your business smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-[#1579e6]" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
            asChild
          >
            <NavLink to="/auth/signup">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </NavLink>
          </Button>
        </div>
      </section>
    </div>
  );
}
