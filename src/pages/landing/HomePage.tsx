import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Zap,
  Shield,
  Users,
  FileText,
  Package,
  BarChart3,
  Check,
  ArrowRight,
  Star,
  Play,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'GST Invoicing',
    description: 'Create professional GST-compliant invoices in seconds with automatic tax calculations.',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels, get low stock alerts, and manage products effortlessly.',
  },
  {
    icon: BarChart3,
    title: 'Business Reports',
    description: 'Get insights with detailed reports on sales, expenses, and profitability.',
  },
  {
    icon: Shield,
    title: 'GST Filing',
    description: 'Generate GSTR-1, GSTR-3B reports and file your GST returns with ease.',
  },
  {
    icon: Users,
    title: 'Multi-User Access',
    description: 'Add team members with role-based permissions for better collaboration.',
  },
  {
    icon: Zap,
    title: 'Auto Reminders',
    description: 'Send automatic payment reminders to clients for pending invoices.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    content: 'MyBill Book has transformed how I manage my business finances. The GST invoicing feature alone has saved me hours every month.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    role: 'Distributor',
    content: 'The affiliate program is fantastic! I earn commissions while helping other businesses discover this amazing tool.',
    rating: 5,
  },
  {
    name: 'Anita Patel',
    role: 'Manufacturer',
    content: 'Inventory management was a nightmare before. Now I have complete visibility and control over my stock.',
    rating: 5,
  },
];

const stats = [
  { value: '1L+', label: 'Businesses' },
  { value: '4.9/5', label: 'Rating' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-[#1579e6]/5 via-background to-[#1b4a97]/5"
        />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#1579e6]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1b4a97]/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-[#1579e6]/10 text-[#1579e6] hover:bg-[#1579e6]/20">
                #1 GST Billing Software in India
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                GST Billing Software for{' '}
                <span className="text-[#1579e6]">Modern Businesses</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                Create professional invoices, track inventory, and manage your finances with ease. 
                Join 1,00,000+ businesses already using MyBill Book.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
                <Button size="lg" variant="outline" asChild>
                  <NavLink to="/pricing">
                    View Pricing
                  </NavLink>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop"
                  alt="Dashboard Preview"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Invoice Sent</p>
                    <p className="text-sm text-muted-foreground">₹25,000</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Powerful Features</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to manage your business finances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#1579e6]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">What Our Customers Say</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Trusted by 1,00,000+ businesses across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1579e6] to-[#1b4a97]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of businesses already using MyBill Book for their billing and accounting needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#1579e6] hover:bg-white/90"
              asChild
            >
              <NavLink to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </NavLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <NavLink to="/contact">
                Contact Sales
              </NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
