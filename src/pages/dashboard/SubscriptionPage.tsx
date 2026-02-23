import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore, useSubscriptionStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, X, Sparkles, Zap, Crown } from 'lucide-react';
import type { SubscriptionPlan } from '@/types';

const planIcons: Record<SubscriptionPlan, React.ElementType> = {
  basic: Zap,
  professional: Sparkles,
  enterprise: Crown,
};

export function SubscriptionPage() {
  const { user } = useAuthStore();
  const { plans, billingCycle, setBillingCycle, subscribe } = useSubscriptionStore();
  const { addNotification } = useUIStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = user?.subscription?.plan;

  const handleSubscribe = async (planId: SubscriptionPlan) => {
    setIsProcessing(true);
    try {
      await subscribe(planId);
      addNotification({
        title: 'Subscription updated',
        message: `You have successfully subscribed to the ${planId} plan`,
        type: 'success',
      });
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to process subscription',
        type: 'error',
      });
    }
    setIsProcessing(false);
  };

  const formatPrice = (monthly: number, yearly: number) => {
    const price = billingCycle === 'monthly' ? monthly : yearly;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription plan
        </p>
      </div>

      {/* Current Plan */}
      {currentPlan && (
        <Card className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <Badge className="bg-white/20 text-white mb-2">Current Plan</Badge>
                <h3 className="text-2xl font-bold capitalize">{currentPlan}</h3>
                <p className="text-white/80">
                  Valid until {new Date(user?.subscription?.endDate || '').toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(user?.subscription?.amount || 0)}
                </p>
                <p className="text-white/80 capitalize">/{user?.subscription?.billingCycle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <Switch
          checked={billingCycle === 'yearly'}
          onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
        />
        <span className={`text-sm ${billingCycle === 'yearly' ? 'font-medium' : 'text-muted-foreground'}`}>
          Yearly
        </span>
        <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = planIcons[plan.id];
          const isCurrentPlan = currentPlan === plan.id;

          return (
            <Card
              key={plan.id}
              className={`relative ${plan.isPopular ? 'border-[#1579e6] border-2' : ''} ${
                isCurrentPlan ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#1579e6]">Most Popular</Badge>
                </div>
              )}
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1579e6]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.monthlyPrice, plan.yearlyPrice)}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#1579e6] to-[#1b4a97]'
                      : ''
                  }`}
                  variant={isCurrentPlan ? 'outline' : 'default'}
                  disabled={isCurrentPlan || isProcessing}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isCurrentPlan ? (
                    'Current Plan'
                  ) : isProcessing ? (
                    'Processing...'
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dodo Payments Info */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 font-bold">D</span>
            </div>
            <div>
              <p className="font-medium">Dodo Payments</p>
              <p className="text-sm text-muted-foreground">
                Secure payments powered by Dodo Payments India
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
