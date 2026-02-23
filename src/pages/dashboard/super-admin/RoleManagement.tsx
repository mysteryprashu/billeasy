import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdminStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Check,
  X,
} from 'lucide-react';
import type { Role } from '@/types';

const availablePermissions = [
  { id: 'users:read', label: 'View Users', module: 'Users' },
  { id: 'users:write', label: 'Manage Users', module: 'Users' },
  { id: 'roles:read', label: 'View Roles', module: 'Roles' },
  { id: 'roles:write', label: 'Manage Roles', module: 'Roles' },
  { id: 'leads:read', label: 'View Leads', module: 'Sales' },
  { id: 'leads:write', label: 'Manage Leads', module: 'Sales' },
  { id: 'offers:read', label: 'View Offers', module: 'Sales' },
  { id: 'offers:write', label: 'Manage Offers', module: 'Sales' },
  { id: 'payments:read', label: 'View Payments', module: 'Finance' },
  { id: 'payments:write', label: 'Manage Payments', module: 'Finance' },
  { id: 'invoices:read', label: 'View Invoices', module: 'Billing' },
  { id: 'invoices:write', label: 'Manage Invoices', module: 'Billing' },
  { id: 'products:read', label: 'View Products', module: 'Inventory' },
  { id: 'products:write', label: 'Manage Products', module: 'Inventory' },
  { id: 'reports:read', label: 'View Reports', module: 'Reports' },
  { id: 'settings:read', label: 'View Settings', module: 'Settings' },
  { id: 'settings:write', label: 'Manage Settings', module: 'Settings' },
];

export function RoleManagement() {
  const { roles, createRole, updateRole, deleteRole } = useAdminStore();
  const { addNotification } = useUIStore();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleCreate = async () => {
    try {
      await createRole({
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        isSystem: false,
      });
      addNotification({
        title: 'Role created',
        message: `${formData.name} role has been created successfully`,
        type: 'success',
      });
      setIsCreateDialogOpen(false);
      setFormData({ name: '', description: '', permissions: [] });
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to create role',
        type: 'error',
      });
    }
  };

  const handleEdit = async () => {
    if (selectedRole) {
      try {
        await updateRole(selectedRole.id, {
          name: formData.name,
          description: formData.description,
          permissions: formData.permissions,
        });
        addNotification({
          title: 'Role updated',
          message: `${formData.name} role has been updated`,
          type: 'success',
        });
        setIsEditDialogOpen(false);
        setSelectedRole(null);
      } catch (error) {
        addNotification({
          title: 'Error',
          message: 'Failed to update role',
          type: 'error',
        });
      }
    }
  };

  const handleDelete = async () => {
    if (selectedRole) {
      try {
        await deleteRole(selectedRole.id);
        addNotification({
          title: 'Role deleted',
          message: `${selectedRole.name} role has been deleted`,
          type: 'success',
        });
        setIsDeleteDialogOpen(false);
        setSelectedRole(null);
      } catch (error) {
        addNotification({
          title: 'Error',
          message: 'Failed to delete role',
          type: 'error',
        });
      }
    }
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsEditDialogOpen(true);
  };

  const permissionsByModule = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage user roles and permissions
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#1579e6] to-[#1b4a97]"
          onClick={() => {
            setFormData({ name: '', description: '', permissions: [] });
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      {/* Roles Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#1579e6]" />
                    </div>
                    <span className="font-medium">{role.name}</span>
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {role.permissions.length} permissions
                  </Badge>
                </TableCell>
                <TableCell>
                  {role.isSystem ? (
                    <Badge className="bg-purple-100 text-purple-700">System</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700">Custom</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(role)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {!role.isSystem && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedRole(role);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      )}
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
              {isCreateDialogOpen ? 'Create New Role' : 'Edit Role'}
            </DialogTitle>
            <DialogDescription>
              Define role details and assign permissions.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sales Manager"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this role"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Permissions</label>
              <div className="border rounded-lg p-4 space-y-4">
                {Object.entries(permissionsByModule).map(([module, permissions]) => (
                  <div key={module}>
                    <h4 className="font-medium text-sm mb-2">{module}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={permission.id}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={() => handlePermissionToggle(permission.id)}
                          />
                          <label
                            htmlFor={permission.id}
                            className="text-sm cursor-pointer"
                          >
                            {permission.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
              disabled={!formData.name || !formData.description}
            >
              {isCreateDialogOpen ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
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
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedRole?.name}? This action cannot be undone.
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
