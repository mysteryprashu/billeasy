import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Target, Heart, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const stats = [
  { value: '1L+', label: 'Active Businesses', icon: Users },
  { value: '₹500Cr+', label: 'Invoices Generated', icon: TrendingUp },
  { value: '50+', label: 'Team Members', icon: Target },
  { value: '4.9/5', label: 'Customer Rating', icon: Heart },
];

const values = [
  {
    title: 'Customer First',
    description: 'We put our customers at the center of everything we do. Your success is our success.',
  },
  {
    title: 'Innovation',
    description: 'We constantly innovate to bring you the best tools for managing your business.',
  },
  {
    title: 'Simplicity',
    description: 'We believe powerful software should be easy to use. No complex setups or training required.',
  },
  {
    title: 'Trust',
    description: 'We handle your data with the utmost care and security. Your trust is our most valuable asset.',
  },
];

const team = [
  {
    name: 'Amit Sharma',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Priya Patel',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Rahul Kumar',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    name: 'Sneha Gupta',
    role: 'Head of Customer Success',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
];

export function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#1579e6] to-[#1b4a97] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-white/20 text-white mb-4">About Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Simplifying Business Finances for India
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              MyBill Book was founded with a simple mission: to make GST billing and 
              business management accessible to every business in India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-[#1579e6]" />
                      </div>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Story</h2>
          </div>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p>
              MyBill Book started in 2020 when our founders, Amit and Priya, realized that 
              small businesses in India were struggling with GST compliance and business management. 
              They saw businesses spending hours on manual invoicing, struggling with inventory 
              tracking, and finding it difficult to generate accurate GST reports.
            </p>
            <p>
              With a vision to simplify business finances, they built MyBill Book - a 
              comprehensive GST billing and business management solution that&apos;s easy to use 
              yet powerful enough to handle complex business needs.
            </p>
            <p>
              Today, MyBill Book serves over 1,00,000 businesses across India, from small 
              retailers to large distributors. We&apos;re proud to be a part of India&apos;s digital 
              transformation journey and committed to helping businesses thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground mt-2">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground mt-2">
              The people behind MyBill Book
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground mt-2">
              We&apos;d love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-[#1579e6] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  123 Business Park, Mumbai,
                  <br />
                  Maharashtra, India 400001
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-[#1579e6] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  support@mybillbook.com
                  <br />
                  sales@mybillbook.com
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-[#1579e6] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  +91 1800-123-4567
                  <br />
                  (Toll Free)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Be a part of 1,00,000+ businesses already using MyBill Book
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
