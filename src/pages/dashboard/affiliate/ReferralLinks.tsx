import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Link,
  Copy,
  CheckCircle,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  QrCode,
  Download,
  Plus,
  Trash2,
} from 'lucide-react';

interface ReferralLink {
  id: string;
  name: string;
  url: string;
  clicks: number;
  conversions: number;
  createdAt: string;
}

export function ReferralLinks() {
  const { user } = useAuthStore();
  const { addNotification } = useUIStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');

  const baseUrl = `${window.location.origin}/auth/signup?ref=${user?.referralCode || 'REF2024'}`;

  const [links, setLinks] = useState<ReferralLink[]>([
    {
      id: '1',
      name: 'Default Link',
      url: baseUrl,
      clicks: 245,
      conversions: 18,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Social Media Campaign',
      url: `${baseUrl}&utm_source=social`,
      clicks: 128,
      conversions: 12,
      createdAt: '2024-02-15',
    },
    {
      id: '3',
      name: 'Email Newsletter',
      url: `${baseUrl}&utm_source=email`,
      clicks: 89,
      conversions: 8,
      createdAt: '2024-03-01',
    },
  ]);

  const handleCopy = (link: ReferralLink) => {
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    addNotification({
      title: 'Link copied!',
      message: 'Referral link copied to clipboard',
      type: 'success',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = () => {
    if (newLinkName) {
      const newLink: ReferralLink = {
        id: Math.random().toString(36).substr(2, 9),
        name: newLinkName,
        url: `${baseUrl}&utm_campaign=${newLinkName.toLowerCase().replace(/\s+/g, '-')}`,
        clicks: 0,
        conversions: 0,
        createdAt: new Date().toISOString(),
      };
      setLinks([...links, newLink]);
      setNewLinkName('');
      setIsCreateDialogOpen(false);
      addNotification({
        title: 'Link created',
        message: 'New referral link has been created',
        type: 'success',
      });
    }
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
    addNotification({
      title: 'Link deleted',
      message: 'Referral link has been deleted',
      type: 'success',
    });
  };

  const shareOnSocial = (platform: string, url: string) => {
    const text = encodeURIComponent('Join MyBill Book and get 15% off your subscription!');
    const shareUrl = encodeURIComponent(url);
    
    let socialUrl = '';
    switch (platform) {
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`;
        break;
      case 'linkedin':
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      case 'email':
        socialUrl = `mailto:?subject=Get 15% off MyBill Book&body=${text}%0A%0A${shareUrl}`;
        break;
    }
    
    if (socialUrl) {
      window.open(socialUrl, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Referral Links</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your referral links
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Link
        </Button>
      </div>

      {/* Main Referral Card */}
      <Card className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97] text-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Your Main Referral Link</h3>
              <p className="text-white/80 text-sm">
                Share this link to earn {user?.role === 'manufacturer' ? '15%' : '20%'} commission
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/20 rounded-lg px-4 py-2 font-mono text-sm flex items-center">
                {baseUrl}
              </div>
              <Button
                variant="secondary"
                onClick={() => handleCopy(links[0])}
                className="bg-white text-[#1579e6] hover:bg-white/90"
              >
                {copiedId === links[0].id ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Share */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Quick Share
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => shareOnSocial('facebook', baseUrl)}
              className="flex items-center gap-2"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => shareOnSocial('twitter', baseUrl)}
              className="flex items-center gap-2"
            >
              <Twitter className="w-4 h-4 text-sky-500" />
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => shareOnSocial('linkedin', baseUrl)}
              className="flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              onClick={() => shareOnSocial('email', baseUrl)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-gray-600" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Referral Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-muted rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{link.name}</h4>
                    {link.id === '1' && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </div>
                  <code className="text-sm text-muted-foreground break-all">
                    {link.url}
                  </code>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{link.clicks} clicks</span>
                    <span>{link.conversions} conversions</span>
                    <span>{((link.conversions / link.clicks) * 100 || 0).toFixed(1)}% conversion</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(link)}
                  >
                    {copiedId === link.id ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    Copy
                  </Button>
                  {link.id !== '1' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(link.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Link Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Referral Link</DialogTitle>
            <DialogDescription>
              Create a custom referral link for tracking specific campaigns.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Link Name</label>
              <Input
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                placeholder="e.g., Summer Campaign"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newLinkName}>
              <Plus className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
