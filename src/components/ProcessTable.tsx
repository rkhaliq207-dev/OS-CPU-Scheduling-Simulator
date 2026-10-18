/**
 * OS Lab — CPU Scheduling Simulator
 * Process Table Component with Add, Edit, Delete, Input Validation, and Preset Loading.
 */

import React, { useState } from 'react';
import { ProcessInput } from '../types/scheduling';
import { Plus, Trash2, Edit2, Check, X, AlertCircle, Sparkles } from 'lucide-react';
import { PRESET_SCENARIOS } from '../data/presets';
import { PROCESS_COLORS } from '../utils/schedulingAlgorithms';

interface ProcessTableProps {
  processes: ProcessInput[];
  setProcesses: React.Dispatch<React.SetStateAction<ProcessInput[]>>;
  onLoadPreset: (presetId: string) => void;
  selectedPresetId: string;
}

export const ProcessTable: React.FC<ProcessTableProps> = ({
  processes,
  setProcesses,
  onLoadPreset,
  selectedPresetId,
}) => {
  // New process form state
  const [newId, setNewId] = useState('');
  const [newArrival, setNewArrival] = useState('0');
  const [newBurst, setNewBurst] = useState('4');
  const [newPriority, setNewPriority] = useState('1');
  const [formError, setFormError] = useState<string | null>(null);

  // Edit inline state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editArrival, setEditArrival] = useState<number>(0);
  const [editBurst, setEditBurst] = useState<number>(1);
  const [editPriority, setEditPriority] = useState<number>(1);

  // Suggest next ID based on current list
  const getNextId = () => {
    let max = 0;
    for (const p of processes) {
      const match = p.id.match(/^P(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > max) max = num;
      }
    }
    return `P${max + 1}`;
  };

  const handleAddProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const pid = (newId.trim() || getNextId()).toUpperCase();
    const at = Number(newArrival);
    const bt = Number(newBurst);
    const pr = Number(newPriority);

    // Validation checks
    if (!pid) {
      setFormError('Process ID cannot be blank.');
      return;
    }
    if (processes.some((p) => p.id.toUpperCase() === pid)) {
      setFormError(`Process ID "${pid}" already exists in the queue.`);
      return;
    }
    if (isNaN(at) || at < 0) {
      setFormError('Arrival Time must be a non-negative integer (≥ 0).');
      return;
    }
    if (isNaN(bt) || bt <= 0) {
      setFormError('Burst Time must be a positive integer (> 0).');
      return;
    }
    if (isNaN(pr) || pr < 1) {
      setFormError('Priority must be a positive integer (≥ 1, where 1 is highest).');
      return;
    }

    const nextColor = PROCESS_COLORS[processes.length % PROCESS_COLORS.length];
    const newProcess: ProcessInput = {
      id: pid,
      arrivalTime: Math.floor(at),
      burstTime: Math.floor(bt),
      priority: Math.floor(pr),
      color: nextColor,
    };

    setProcesses((prev) => [...prev, newProcess]);
    setNewId('');
    setNewArrival('0');
    setNewBurst('4');
    setNewPriority('1');
  };

  const handleDelete = (id: string) => {
    setProcesses((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (p: ProcessInput) => {
    setEditingId(p.id);
    setEditArrival(p.arrivalTime);
    setEditBurst(p.burstTime);
    setEditPriority(p.priority);
  };

  const saveEdit = (id: string) => {
    if (editArrival < 0 || editBurst <= 0 || editPriority < 1) {
      alert('Invalid edit: Arrival Time ≥ 0, Burst Time > 0, Priority ≥ 1.');
      return;
    }

    setProcesses((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              arrivalTime: Math.floor(editArrival),
              burstTime: Math.floor(editBurst),
              priority: Math.floor(editPriority),
            }
          : p
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Preset Scenario Selector & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0c1427] border border-slate-800">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Load Curated Lab Test Workload</span>
          </label>
          <p className="text-xs text-slate-400">
            Select a textbook scenario or create your custom workload below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedPresetId}
            onChange={(e) => onLoadPreset(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
          >
            {PRESET_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name} ({scenario.badge})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Process Queue Table */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Process Queue Definition</h3>
            <span className="text-xs text-slate-400">
              Total {processes.length} process{processes.length === 1 ? '' : 'es'} in ready queue
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Priority rule: <strong>1 = Highest Priority</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-medium">
                <th className="py-3 px-4 font-semibold">Process ID</th>
                <th className="py-3 px-4 font-semibold">Arrival Time (AT)</th>
                <th className="py-3 px-4 font-semibold">Burst Time (BT)</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {processes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-sans text-sm">
                    No processes in the queue. Add a process or load a textbook preset above.
                  </td>
                </tr>
              ) : (
                processes.map((p) => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id} className="hover:bg-slate-850/40 transition-colors">
                      {/* ID Column */}
                      <td className="py-3 px-4 font-sans font-semibold">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          <span className="text-white">{p.id}</span>
                        </div>
                      </td>

                      {/* Arrival Time */}
                      <td className="py-3 px-4 tabular-nums">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={editArrival}
                            onChange={(e) => setEditArrival(Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded bg-slate-900 border border-cyan-500 text-white text-xs focus:outline-none"
                          />
                        ) : (
                          <span className="text-slate-200">{p.arrivalTime}</span>
                        )}
                      </td>

                      {/* Burst Time */}
                      <td className="py-3 px-4 tabular-nums">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editBurst}
                            onChange={(e) => setEditBurst(Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded bg-slate-900 border border-cyan-500 text-white text-xs focus:outline-none"
                          />
                        ) : (
                          <span className="text-cyan-300 font-semibold">{p.burstTime}</span>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-4 tabular-nums">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={editPriority}
                            onChange={(e) => setEditPriority(Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded bg-slate-900 border border-cyan-500 text-white text-xs focus:outline-none"
                          />
                        ) : (
                          <span className="text-slate-300">{p.priority}</span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3 px-4 text-right font-sans">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => saveEdit(p.id)}
                              className="p-1.5 text-emerald-400 hover:bg-emerald-950/40 rounded transition-colors"
                              title="Save Changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1.5 text-slate-400 hover:bg-slate-800 rounded transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                              title="Edit Process"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                              title="Delete Process"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Process Form */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 sm:p-5 space-y-4">
        <h4 className="font-semibold text-white text-sm flex items-center gap-2">
          <Plus className="w-4 h-4 text-cyan-400" />
          <span>Add Custom Process to Queue</span>
        </h4>

        {formError && (
          <div className="rounded-lg bg-red-950/60 border border-red-800/60 p-3 flex items-center gap-2 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleAddProcess} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Process ID
            </label>
            <input
              type="text"
              placeholder={getNextId()}
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Arrival Time (AT)
            </label>
            <input
              type="number"
              min="0"
              value={newArrival}
              onChange={(e) => setNewArrival(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Burst Time (BT)
            </label>
            <input
              type="number"
              min="1"
              value={newBurst}
              onChange={(e) => setNewBurst(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Priority (1=High)
            </label>
            <input
              type="number"
              min="1"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-mono"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm shadow-cyan-500/20 cursor-pointer h-[38px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Process</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
