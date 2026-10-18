/**
 * OS Lab — CPU Scheduling Simulator
 * Process Metrics Table, KPI Performance Cards, Scheduling Trace Explanation, and CSV Export.
 */

import React from 'react';
import { SimulationResult } from '../types/scheduling';
import { Download, CheckCircle2, Cpu, Clock, HelpCircle, FileText } from 'lucide-react';

interface MetricsTableProps {
  result: SimulationResult;
}

export const MetricsTable: React.FC<MetricsTableProps> = ({ result }) => {
  const {
    algorithm,
    timeQuantum,
    metrics,
    avgWaitingTime,
    avgTurnaroundTime,
    avgResponseTime,
    totalTime,
    cpuUtilization,
    throughput,
    idleTime,
    explanation,
  } = result;

  // Export to CSV function
  const handleExportCSV = () => {
    if (metrics.length === 0) return;

    const headers = [
      'Process ID',
      'Arrival Time (AT)',
      'Burst Time (BT)',
      'Priority',
      'Completion Time (CT)',
      'Turnaround Time (TAT)',
      'Waiting Time (WT)',
      'Response Time (RT)',
    ];

    const rows = metrics.map((m) => [
      m.id,
      m.arrivalTime,
      m.burstTime,
      m.priority,
      m.completionTime,
      m.turnaroundTime,
      m.waitingTime,
      m.responseTime,
    ]);

    const summaryRows = [
      [],
      ['Algorithm', `${algorithm}${timeQuantum ? ` (Q=${timeQuantum})` : ''}`],
      ['Average Waiting Time', avgWaitingTime],
      ['Average Turnaround Time', avgTurnaroundTime],
      ['Average Response Time', avgResponseTime],
      ['CPU Utilization (%)', `${cpuUtilization}%`],
      ['Throughput (proc/unit)', throughput],
      ['Total Time', totalTime],
      ['Idle Time', idleTime],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(',')), ...summaryRows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `OS_Lab_CPU_Metrics_${algorithm.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* KPI Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Avg Waiting Time</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums">
            {avgWaitingTime}
            <span className="text-xs text-slate-500 font-sans ml-1 font-normal">units</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Avg Turnaround Time</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400 tabular-nums">
            {avgTurnaroundTime}
            <span className="text-xs text-slate-500 font-sans ml-1 font-normal">units</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Avg Response Time</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400 tabular-nums">
            {avgResponseTime}
            <span className="text-xs text-slate-500 font-sans ml-1 font-normal">units</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">CPU Utilization</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            {cpuUtilization}%
          </div>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Throughput</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-teal-400 tabular-nums">
            {throughput}
            <span className="text-xs text-slate-500 font-sans ml-1 font-normal">/unit</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 space-y-1">
          <span className="text-slate-400 text-xs font-medium block">Idle Time</span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
            {idleTime}
            <span className="text-xs text-slate-500 font-sans ml-1 font-normal">units</span>
          </div>
        </div>
      </div>

      {/* Main Process Metrics Table */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-white text-base">Process Metrics & Timestamps</h3>
            <span className="text-xs text-slate-400">
              Evaluated using <strong className="text-cyan-400">{algorithm}</strong>
              {timeQuantum ? ` with Time Quantum = ${timeQuantum}` : ''}
            </span>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export to CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-medium">
                <th className="py-3 px-4 font-semibold">PID</th>
                <th className="py-3 px-4 font-semibold">Arrival (AT)</th>
                <th className="py-3 px-4 font-semibold">Burst (BT)</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold text-cyan-400">Completion (CT)</th>
                <th className="py-3 px-4 font-semibold text-blue-400">Turnaround (TAT)</th>
                <th className="py-3 px-4 font-semibold text-indigo-400">Waiting (WT)</th>
                <th className="py-3 px-4 font-semibold text-teal-400">Response (RT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {metrics.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 font-sans text-sm">
                    No metrics available.
                  </td>
                </tr>
              ) : (
                metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: m.color }}
                        />
                        <span className="text-white">{m.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 tabular-nums text-slate-300">{m.arrivalTime}</td>
                    <td className="py-3 px-4 tabular-nums text-slate-200">{m.burstTime}</td>
                    <td className="py-3 px-4 tabular-nums text-slate-300">{m.priority}</td>
                    <td className="py-3 px-4 tabular-nums font-bold text-cyan-300">{m.completionTime}</td>
                    <td className="py-3 px-4 tabular-nums font-bold text-blue-300">{m.turnaroundTime}</td>
                    <td className="py-3 px-4 tabular-nums font-bold text-indigo-300">{m.waitingTime}</td>
                    <td className="py-3 px-4 tabular-nums font-bold text-teal-300">{m.responseTime}</td>
                  </tr>
                ))
              )}
            </tbody>
            {metrics.length > 0 && (
              <tfoot>
                <tr className="bg-slate-900 font-semibold border-t-2 border-slate-700 text-white font-mono">
                  <td colSpan={4} className="py-3 px-4 text-slate-400 font-sans">
                    Queue Average:
                  </td>
                  <td className="py-3 px-4 text-slate-500">—</td>
                  <td className="py-3 px-4 text-blue-400 tabular-nums">{avgTurnaroundTime}</td>
                  <td className="py-3 px-4 text-indigo-400 tabular-nums">{avgWaitingTime}</td>
                  <td className="py-3 px-4 text-teal-400 tabular-nums">{avgResponseTime}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Step-by-Step Scheduling Order Trace & Rationale */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 sm:p-5 space-y-3">
        <h4 className="font-semibold text-white text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Execution Order Explanation & Scheduling Trace</span>
        </h4>

        <div className="max-h-60 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs">
          {explanation.map((step, idx) => (
            <div
              key={idx}
              className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-slate-300 leading-relaxed"
            >
              <span className="text-cyan-500 font-bold mr-2">[{idx + 1}]</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
