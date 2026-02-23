import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Gift,
  Copy,
  Percent,
  IndianRupee,
  Calendar,
  CheckCircle,
  X,
} from 'lucide-react';
import type { Offer, SubscriptionPlan } from '@/types';

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  expired: 'bg-red-100 text-red-700',
};

export function OffersManagement() {
  const { offers, createOffer, updateOffer, deleteOffer } = useAdminStore();
  const { addNotification } = useUIStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    validFrom: '',
    validUntil: '',
    usageLimit: 0,
    applicablePlans: [] as SubscriptionPlan[],
    status: 'active' as Offer['status'],
  });

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const generateCode = () => {
    const prefix = 'OFFER';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData({ ...formData, code: `${prefix}${random}` });
  };

  const handleCreate = async () => {
    try {
      await createOffer({
        ...formData,
        createdBy: '2', // Current sales admin
      });
      addNotification({
        title: 'Offer created',
        message: `${formData.code} has been created successfully`,
        type: 'success',
      });
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to create offer',
        type: 'error',
      });
    }
  };

  const handleEdit = async () => {
    if (selectedOffer) {
      try {
        await updateOffer(selectedOffer.id, formData);
        addNotification({
          title: 'Offer updated',
          message: `${formData.code} has been updated`,
          type: 'success',
        });
        setIsEditDialogOpen(false);
        setSelectedOffer(null);
      } catch (error) {
        addNotification({
          title: 'Error',
          message: 'Failed to update offer',
          type: 'error',
        });
      }
    }
  };

  const handleDelete = async () => {
    if (selectedOffer) {
      try {
        await deleteOffer(selectedOffer.id);
        addNotification({
          title: 'Offer deleted',
          message: `${selectedOffer.code} has been deleted`,
          type: 'success',
        });
        setIsDeleteDialogOpen(false);
        setSelectedOffer(null);
      } catch (error) {
        addNotification({
          title: 'Error',
          message: 'Failed to delete offer',
          type: 'error',
        });
      }
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    addNotification({
      title: 'Copied!',
      message: `Code ${code} copied to clipboard`,
      type: 'success',
    });
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      discountType: 'percentage',
      discountValue: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      validFrom: '',
      validUntil: '',
      usageLimit: 0,
      applicablePlans: [],
      status: 'active',
    });
  };

  const openEditDialog = (offer: Offer) => {
    setSelectedOffer(offer);
    setFormData({
      code: offer.code,
      name: offer.name,
      description: offer.description,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      minOrderAmount: offer.minOrderAmount || 0,
      maxDiscount: offer.maxDiscount || 0,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil,
      usageLimit: offer.usageLimit || 0,
      applicablePlans: offer.applicablePlans,
      status: offer.status,
    });
    setIsEditDialogOpen(true);
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
          <h1 className="text-3xl font-bold">Offers & Coupons</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage promotional offers
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Offer
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Offers Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono">
                      {offer.code}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCopyCode(offer.code)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{offer.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {offer.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {offer.discountType === 'percentage' ? (
                    <span className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      {offer.discountValue}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {offer.discountValue}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {offer.usageLimit ? (
                    <span>
                      {offer.usageCount} / {offer.usageLimit}
                    </span>
                  ) : (
                    <span>{offer.usageCount} (unlimited)</span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(offer.validUntil).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[offer.status]}>
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(offer)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopyCode(offer.code)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedOffer(offer);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? 'Create New Offer' : 'Edit Offer'}
            </DialogTitle>
            <DialogDescription>
              Configure offer details and restrictions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Code */}
            <div className="space-y-2">
              <Label>Offer Code</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., WELCOME20"
                  className="font-mono"
                />
                {isCreateDialogOpen && (
                  <Button variant="outline" onClick={generateCode}>
                    Generate
                  </Button>
                )}
              </div>
            </div>

            {/* Name & Description */}
            <div className="space-y-2">
              <Label>Offer Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Welcome Discount"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the offer"
              />
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(v) => setFormData({ ...formData, discountType: v as 'percentage' | 'fixed' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Discount Value</Label>
                <Input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                  placeholder={formData.discountType === 'percentage' ? '20' : '500'}
                />
              </div>
            </div>

            {/* Restrictions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Order Amount (₹)</Label>
                <Input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Discount (₹)</Label>
                <Input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                  placeholder="No limit"
                />
              </div>
            </div>

            {/* Validity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valid From</Label>
                <Input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Valid Until</Label>
                <Input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>

            {/* Usage Limit */}
            <div className="space-y-2">
              <Label>Usage Limit (0 = unlimited)</Label>
              <Input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                placeholder="0"
              />
            </div>

            {/* Applicable Plans */}
            <div className="space-y-2">
              <Label>Applicable Plans</Label>
              <div className="flex gap-2">
                {(['basic', 'professional', 'enterprise'] as SubscriptionPlan[]).map((plan) => (
                  <Button
                    key={plan}
                    type="button"
                    variant={formData.applicablePlans.includes(plan) ? 'default' : 'outline'}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        applicablePlans: formData.applicablePlans.includes(plan)
                          ? formData.applicablePlans.filter((p) => p !== plan)
                          : [...formData.applicablePlans, plan],
                      });
                    }}
                    className="capitalize"
                  >
                    {plan}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch
                checked={formData.status === 'active'}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, status: checked ? 'active' : 'inactive' })
                }
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateDialogOpen(false);
                setIsEditDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={isCreateDialogOpen ? handleCreate : handleEdit}
              disabled={!formData.code || !formData.name}
            >
              {isCreateDialogOpen ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Offer
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Offer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedOffer?.code}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
