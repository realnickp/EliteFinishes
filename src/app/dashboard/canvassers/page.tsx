"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, KeyRound, Power, Trash2, Loader2 } from "lucide-react";
import { CreateCanvasserModal } from "@/components/dashboard/CreateCanvasserModal";
import { ResetPasswordModal } from "@/components/dashboard/ResetPasswordModal";

type Canvasser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
  lead_count: number;
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CanvassersPage() {
  const [canvassers, setCanvassers] = useState<Canvasser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [resetFor, setResetFor] = useState<Canvasser | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/canvassers");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCanvassers(data.canvassers ?? []);
    } catch {
      toast.error("Failed to load canvassers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleActive(c: Canvasser) {
    setPendingId(c.id);
    try {
      const res = await fetch(`/api/admin/canvassers/${c.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !c.active }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed");
      }
      toast.success(c.active ? "Canvasser deactivated" : "Canvasser reactivated");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setPendingId(null);
    }
  }

  async function deleteCanvasser(c: Canvasser) {
    if (!confirm(`Delete ${c.name}? This cannot be undone.`)) return;
    setPendingId(c.id);
    try {
      const res = await fetch(`/api/admin/canvassers/${c.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed");
      }
      toast.success("Canvasser deleted");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Canvassers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage door-to-door team accounts. Canvassers log in at{" "}
            <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">/canvasser</code>.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" /> Add Canvasser
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : canvassers.length === 0 ? (
          <div className="p-10 text-center text-sm text-gray-500">
            No canvassers yet. Click <strong>Add Canvasser</strong> to create your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 font-medium">Leads</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Last Login</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {canvassers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-600">{c.phone ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{c.lead_count}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          c.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {c.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(c.last_login_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setResetFor(c)}
                          disabled={pendingId === c.id}
                          title="Reset password"
                          className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-md disabled:opacity-50"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(c)}
                          disabled={pendingId === c.id}
                          title={c.active ? "Deactivate" : "Reactivate"}
                          className={`p-2 rounded-md disabled:opacity-50 ${
                            c.active
                              ? "text-gray-500 hover:text-amber-600 hover:bg-amber-50"
                              : "text-gray-500 hover:text-green-600 hover:bg-green-50"
                          }`}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCanvasser(c)}
                          disabled={pendingId === c.id || c.lead_count > 0}
                          title={c.lead_count > 0 ? "Has leads — deactivate instead" : "Delete"}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreate && (
        <CreateCanvasserModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            setShowCreate(false);
            toast.success("Canvasser created");
            load();
          }}
        />
      )}

      {resetFor && (
        <ResetPasswordModal
          canvasserId={resetFor.id}
          canvasserName={resetFor.name}
          onClose={() => setResetFor(null)}
          onSuccess={() => {
            setResetFor(null);
            toast.success("Password reset");
          }}
        />
      )}
    </div>
  );
}
