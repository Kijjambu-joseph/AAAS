import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Icon } from "@/components/AppShell";
import { Button, Modal, Input, Label } from "@/components/ui-kit";

export const Route = createFileRoute("/admin/transaction-limits")({
  component: TransactionLimitsPage,
  head: () => ({
    meta: [
      { title: "Transaction Limits Management | AAAS" },
      {
        name: "description",
        content: "Manage transaction limits, approval thresholds, and level configurations.",
      },
      { property: "og:title", content: "Transaction Limits Management | AAAS" },
      {
        property: "og:description",
        content: "Manage transaction limits, approval thresholds, and level configurations.",
      },
    ],
  }),
});

interface TransactionLimit {
  id: string;
  level: string;
  minimum: number;
  maximum: number;
  approvalRequired: boolean;
  isActive: boolean;
}

const MOCK_LIMITS: TransactionLimit[] = [
  {
    id: "TL-001",
    level: "Level 1 - Standard",
    minimum: 0,
    maximum: 5000000,
    approvalRequired: false,
    isActive: true,
  },
  {
    id: "TL-002",
    level: "Level 2 - Intermediate",
    minimum: 5000000,
    maximum: 50000000,
    approvalRequired: true,
    isActive: true,
  },
  {
    id: "TL-003",
    level: "Level 3 - High Value",
    minimum: 50000000,
    maximum: 500000000,
    approvalRequired: true,
    isActive: true,
  },
  {
    id: "TL-004",
    level: "Level 4 - Premium",
    minimum: 500000000,
    maximum: 5000000000,
    approvalRequired: true,
    isActive: false,
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function TransactionLimitsPage() {
  const [limits, setLimits] = useState<TransactionLimit[]>(MOCK_LIMITS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<TransactionLimit | null>(null);
  const [formData, setFormData] = useState({
    level: "",
    minimum: "",
    maximum: "",
    approvalRequired: false,
  });

  const handleAddNew = () => {
    setFormData({ level: "", minimum: "", maximum: "", approvalRequired: false });
    setSelectedLimit(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (limit: TransactionLimit) => {
    setSelectedLimit(limit);
    setFormData({
      level: limit.level,
      minimum: limit.minimum.toString(),
      maximum: limit.maximum.toString(),
      approvalRequired: limit.approvalRequired,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveNew = () => {
    if (!formData.level || !formData.minimum || !formData.maximum) {
      alert("Please fill all fields");
      return;
    }

    const newLimit: TransactionLimit = {
      id: `TL-${String(limits.length + 1).padStart(3, "0")}`,
      level: formData.level,
      minimum: parseInt(formData.minimum),
      maximum: parseInt(formData.maximum),
      approvalRequired: formData.approvalRequired,
      isActive: true,
    };

    setLimits([...limits, newLimit]);
    setIsAddModalOpen(false);
    setFormData({ level: "", minimum: "", maximum: "", approvalRequired: false });
  };

  const handleSaveEdit = () => {
    if (!selectedLimit) return;
    if (!formData.level || !formData.minimum || !formData.maximum) {
      alert("Please fill all fields");
      return;
    }

    setLimits(
      limits.map((limit) =>
        limit.id === selectedLimit.id
          ? {
              ...limit,
              level: formData.level,
              minimum: parseInt(formData.minimum),
              maximum: parseInt(formData.maximum),
              approvalRequired: formData.approvalRequired,
            }
          : limit
      )
    );
    setIsEditModalOpen(false);
    setSelectedLimit(null);
  };

  const handleToggleActive = (id: string) => {
    setLimits(
      limits.map((limit) =>
        limit.id === id ? { ...limit, isActive: !limit.isActive } : limit
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction limit?")) {
      setLimits(limits.filter((limit) => limit.id !== id));
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="-mx-xl -mt-xl mb-0">
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-xl py-4">
          <div>
            <span className="text-title-lg text-primary">Transaction Limits Management</span>
            <p className="mt-1 text-body-sm text-on-surface-variant">
              Configure transaction limits and approval thresholds for each level
            </p>
          </div>
          <Button
            onClick={handleAddNew}
            variant="gold"
            icon="add_circle"
            className="shrink-0"
          >
            New Limit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-lg mt-5 md:grid-cols-4">
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Total Levels</span>
            <Icon name="layers" className="text-primary" />
          </div>
          <div className="text-display-lg text-primary">{limits.length}</div>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Active Limits</span>
            <Icon name="check_circle" className="text-success" />
          </div>
          <div className="text-display-lg text-success">
            {limits.filter((l) => l.isActive).length}
          </div>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">
              Approval Required
            </span>
            <Icon name="verified" className="text-secondary" />
          </div>
          <div className="text-display-lg text-secondary">
            {limits.filter((l) => l.approvalRequired).length}
          </div>
        </div>
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <span className="text-label-bold uppercase text-on-surface-variant">Max Threshold</span>
            <Icon name="trending_up" className="text-primary" />
          </div>
          <div className="text-headline-sm text-primary">
            {formatCurrency(Math.max(...limits.map((l) => l.maximum)))}
          </div>
        </div>
      </div>

      {/* Transaction Limits Table */}
      <div className="mt-lg">
        <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container">
                  <th className="px-lg py-4 text-left text-label-bold text-on-surface">Level</th>
                  <th className="px-lg py-4 text-left text-label-bold text-on-surface">
                    Minimum Amount
                  </th>
                  <th className="px-lg py-4 text-left text-label-bold text-on-surface">
                    Maximum Amount
                  </th>
                  <th className="px-lg py-4 text-left text-label-bold text-on-surface">
                    Approval Required
                  </th>
                  <th className="px-lg py-4 text-left text-label-bold text-on-surface">Status</th>
                  <th className="px-lg py-4 text-center text-label-bold text-on-surface">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {limits.map((limit, index) => (
                  <tr
                    key={limit.id}
                    className={`border-b border-outline-variant transition-colors hover:bg-surface-container ${
                      index % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container"
                    }`}
                  >
                    <td className="px-lg py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                          <Icon name="layers" className="text-sm text-primary" />
                        </div>
                        <span className="font-medium text-on-surface">{limit.level}</span>
                      </div>
                    </td>
                    <td className="px-lg py-4 text-on-surface">
                      {formatCurrency(limit.minimum)}
                    </td>
                    <td className="px-lg py-4 text-on-surface">
                      {formatCurrency(limit.maximum)}
                    </td>
                    <td className="px-lg py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            limit.approvalRequired ? "bg-secondary" : "bg-success"
                          }`}
                        />
                        <span className="text-body-sm text-on-surface">
                          {limit.approvalRequired ? "Yes" : "No"}
                        </span>
                      </div>
                    </td>
                    <td className="px-lg py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-label-small ${
                            limit.isActive
                              ? "bg-success/10 text-success"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          <Icon
                            name={limit.isActive ? "check_circle" : "cancel"}
                            className="text-sm"
                          />
                          {limit.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-lg py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(limit)}
                          className="p-2 text-primary hover:bg-surface-container-high rounded-lg transition-colors"
                          title="Edit limit"
                        >
                          <Icon name="edit" className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleToggleActive(limit.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            limit.isActive
                              ? "text-secondary hover:bg-surface-container-high"
                              : "text-success hover:bg-surface-container-high"
                          }`}
                          title={limit.isActive ? "Deactivate" : "Activate"}
                        >
                          <Icon
                            name={limit.isActive ? "toggle_on" : "toggle_off"}
                            className="text-lg"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(limit.id)}
                          className="p-2 text-error hover:bg-surface-container-high rounded-lg transition-colors"
                          title="Delete limit"
                        >
                          <Icon name="delete" className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add New Limit Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Transaction Limit"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="level">Transaction Level Name</Label>
            <Input
              id="level"
              placeholder="e.g., Level 1 - Standard"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum">Minimum Amount (UGX)</Label>
              <Input
                id="minimum"
                type="number"
                placeholder="0"
                value={formData.minimum}
                onChange={(e) => setFormData({ ...formData, minimum: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="maximum">Maximum Amount (UGX)</Label>
              <Input
                id="maximum"
                type="number"
                placeholder="0"
                value={formData.maximum}
                onChange={(e) => setFormData({ ...formData, maximum: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="approval"
              checked={formData.approvalRequired}
              onChange={(e) =>
                setFormData({ ...formData, approvalRequired: e.target.checked })
              }
              className="h-4 w-4 rounded border border-outline"
            />
            <Label htmlFor="approval" className="cursor-pointer">
              Approval Required for this level
            </Label>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="gold" onClick={handleSaveNew}>
              Create Limit
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Limit Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Transaction Limit"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-level">Transaction Level Name</Label>
            <Input
              id="edit-level"
              placeholder="e.g., Level 1 - Standard"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-minimum">Minimum Amount (UGX)</Label>
              <Input
                id="edit-minimum"
                type="number"
                placeholder="0"
                value={formData.minimum}
                onChange={(e) => setFormData({ ...formData, minimum: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-maximum">Maximum Amount (UGX)</Label>
              <Input
                id="edit-maximum"
                type="number"
                placeholder="0"
                value={formData.maximum}
                onChange={(e) => setFormData({ ...formData, maximum: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="edit-approval"
              checked={formData.approvalRequired}
              onChange={(e) =>
                setFormData({ ...formData, approvalRequired: e.target.checked })
              }
              className="h-4 w-4 rounded border border-outline"
            />
            <Label htmlFor="edit-approval" className="cursor-pointer">
              Approval Required for this level
            </Label>
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="gold" onClick={handleSaveEdit}>
              Update Limit
            </Button>
          </div>
        </div>
      </Modal>
    </AppShell>
  );
}
