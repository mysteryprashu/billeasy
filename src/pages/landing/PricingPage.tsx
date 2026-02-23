import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, X, Sparkles, Zap, Crown, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small businesses just getting started',
    monthlyPrice: 99,
    yearlyPrice: 999,
    icon: Zap,
    features: [
      'Up to 100 invoices/month',
      'Up to 50 products',
      '1 business',
      'Basic reports',
      'Email support',
      'GST calculations',
    ],
    notIncluded: [
      'Inventory management',
      'Multi-business',
      'Advanced reports',
      'API access',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Best for growing businesses with multiple needs',
    monthlyPrice: 299,
    yearlyPrice: 2999,
    icon: Sparkles,
    popular: true,
    features: [
      'Unlimited invoices',
      'Unlimited products',
      'Up to 5 businesses',
      'Advanced reports & analytics',
      'GST filing integration',
      'Priority support',
      'Inventory management',
      'Multi-user access',
    ],
    notIncluded: ['API access', 'White-label options'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with custom requirements',
    monthlyPrice: 999,
    yearlyPrice: 9999,
    icon: Crown,
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
    notIncluded: [],
  },
];

const faqs = [
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to start.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and wallets through our secure payment partner Dodo Payments.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact our support for a full refund.',
  },
  {
    question: 'Do you offer discounts for nonprofits?',
    answer: 'Yes, we offer special discounts for registered nonprofits and educational institutions. Contact our sales team for more information.',
  },
];

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your business needs. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`text-sm ${isYearly ? 'font-medium' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                Save up to 20%
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular ? 'border-[#1579e6] border-2' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-[#1579e6]">Most Popular</Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-[#1579e6]" />
                      </div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mt-2">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <span className="text-4xl font-bold">
                          ₹{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-muted-foreground">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                        {isYearly && (
                          <p className="text-sm text-green-600 mt-1">
                            Save ₹{(plan.monthlyPrice * 12 - plan.yearlyPrice).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <Button
                        className={`w-full ${
                          plan.popular
                            ? 'bg-gradient-to-r from-[#1579e6] to-[#1b4a97]'
                            : ''
                        }`}
                        variant={plan.popular ? 'default' : 'outline'}
                        asChild
                      >
                        <NavLink to="/auth/signup">
                          {plan.popular ? 'Start Free Trial' : 'Get Started'}
                        </NavLink>
                      </Button>

                      <div className="mt-6 space-y-3">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        {plan.notIncluded.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help you choose the right plan for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <NavLink to="/contact">Contact Sales</NavLink>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:support@mybillbook.com">
                <HelpCircle className="w-4 h-4 mr-2" />
                Email Support
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
