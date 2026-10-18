/**
 * OS Lab — CPU Scheduling Simulator
 * Side-by-Side Algorithm Comparison on Identical Workload with Performance Visualizer.
 */

import React, { useState } from 'react';
import { ProcessInput, SimulationResult } from '../types/scheduling';
import {
  calculateFCFS,
  calculateSJF,
  calculatePriority,
  calculateRoundRobin,
} from '../utils/schedulingAlgorithms';
import { BarChart2, Award, Info, Zap, Clock } from 'lucide-react';

interface AlgorithmComparisonProps {
  processes: ProcessInput[];
  defaultQuantum: number;
}

export const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({
  processes,
  defaultQuantum,
}) => {
  const [quantum, setQuantum] = useState<number>(defaultQuantum || 2);

  if (!processes || processes.length === 0) {
    return (
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-8 text-center text-slate-500 text-sm">
        No processes in queue. Please add processes or load a preset scenario in the CPU Scheduling tab.
      </div>
    );
  }

  // Calculate results for all 4 algorithms on the identical process input
  const fcfsResult = calculateFCFS(processes);
  const sjfResult = calculateSJF(processes);
  const priorityResult = calculatePriority(processes);
  const rrResult = calculateRoundRobin(processes, quantum);

  const comparisonData: { name: string; result: SimulationResult; description: string }[] = [
    {
      name: 'FCFS',
      result: fcfsResult,
      description: 'First Come First Served (Non-preemptive)',
    },
    {
      name: 'SJF',
      result: sjfResult,
      description: 'Shortest Job First (Non-preemptive)',
    },
    {
      name: 'Priority',
      result: priorityResult,
      description: 'Priority Scheduling (Lower integer = Higher priority)',
    },
    {
      name: `Round Robin (Q=${quantum})`,
      result: rrResult,
      description: 'Round Robin (Time-shared preemptive)',
    },
  ];

  // Find minimum waiting time and turnaround time to highlight best performers
  const minAvgWT = Math.min(...comparisonData.map((d) => d.result.avgWaitingTime));
  const minAvgTAT = Math.min(...comparisonData.map((d) => d.result.avgTurnaroundTime));
  const maxAvgWT = Math.max(...comparisonData.map((d) => d.result.avgWaitingTime), 1);
  const maxAvgTAT = Math.max(...comparisonData.map((d) => d.result.avgTurnaroundTime), 1);

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-cyan-400" />
              <span>Multi-Algorithm Comparative Benchmark</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Simulating all 4 algorithms simultaneously on the current queue of{' '}
              <strong className="text-white">{processes.length}</strong> processes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 px-3 self-start sm:self-auto">
            <span className="text-xs text-slate-300 font-medium">RR Quantum Q:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={quantum}
              onChange={(e) => setQuantum(Math.max(1, Number(e.target.value)))}
              className="w-14 px-2 py-0.5 rounded bg-slate-800 border border-slate-600 text-cyan-400 font-mono text-xs focus:outline-none focus:border-cyan-500 tabular-nums"
            />
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 overflow-hidden shadow-lg">
        <div className="p-4 sm:p-5 border-b border-slate-800">
          <h3 className="font-bold text-white text-base">Comparative Performance Matrix</h3>
          <span className="text-xs text-slate-400">
            Green badges indicate optimal performance for this workload
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-medium">
                <th className="py-3 px-4 font-semibold">Algorithm</th>
                <th className="py-3 px-4 font-semibold">Avg Waiting (WT)</th>
                <th className="py-3 px-4 font-semibold">Avg Turnaround (TAT)</th>
                <th className="py-3 px-4 font-semibold">Avg Response (RT)</th>
                <th className="py-3 px-4 font-semibold">Total Time</th>
                <th className="py-3 px-4 font-semibold">CPU Utilization</th>
                <th className="py-3 px-4 font-semibold">Throughput</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {comparisonData.map((item) => {
                const isBestWT = item.result.avgWaitingTime === minAvgWT;
                const isBestTAT = item.result.avgTurnaroundTime === minAvgTAT;

                return (
                  <tr key={item.name} className="hover:bg-slate-850/40 transition-colors">
                    <td className="py-4 px-4 font-sans">
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-xs text-slate-400 font-normal">{item.description}</div>
                    </td>

                    <td className="py-4 px-4 tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBestWT ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {item.result.avgWaitingTime}
                        </span>
                        {isBestWT && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-sans font-semibold">
                            Lowest WT
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${isBestTAT ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {item.result.avgTurnaroundTime}
                        </span>
                        {isBestTAT && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-sans font-semibold">
                            Lowest TAT
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 tabular-nums text-slate-300 font-medium">
                      {item.result.avgResponseTime}
                    </td>

                    <td className="py-4 px-4 tabular-nums text-slate-300 font-medium">
                      {item.result.totalTime} units
                    </td>

                    <td className="py-4 px-4 tabular-nums text-cyan-400 font-medium">
                      {item.result.cpuUtilization}%
                    </td>

                    <td className="py-4 px-4 tabular-nums text-teal-400 font-medium">
                      {item.result.throughput}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Relative Comparison Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waiting Time Bars */}
        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-4">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Average Waiting Time Comparison (Lower is Better)</span>
          </h4>

          <div className="space-y-3">
            {comparisonData.map((item) => {
              const pct = Math.max(8, (item.result.avgWaitingTime / maxAvgWT) * 100);
              const isBest = item.result.avgWaitingTime === minAvgWT;

              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className="font-mono tabular-nums text-cyan-400 font-bold">
                      {item.result.avgWaitingTime} units
                    </span>
                  </div>
                  <div className="h-4 rounded-lg bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full transition-all duration-500 rounded-lg ${
                        isBest ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Turnaround Time Bars */}
        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-4">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Average Turnaround Time Comparison (Lower is Better)</span>
          </h4>

          <div className="space-y-3">
            {comparisonData.map((item) => {
              const pct = Math.max(8, (item.result.avgTurnaroundTime / maxAvgTAT) * 100);
              const isBest = item.result.avgTurnaroundTime === minAvgTAT;

              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className="font-mono tabular-nums text-blue-400 font-bold">
                      {item.result.avgTurnaroundTime} units
                    </span>
                  </div>
                  <div className="h-4 rounded-lg bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full transition-all duration-500 rounded-lg ${
                        isBest ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Critical Educational Takeaway (Viva Gold) */}
      <div className="rounded-xl bg-[#0c1427] border border-cyan-900/60 p-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <Award className="w-4 h-4" />
          <span>Viva Voce Key Principle: No Algorithm Is Universally Best</span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          In operating systems theory, algorithm performance is intimately tied to workload characteristics.
          While <strong>SJF</strong> provides the mathematically minimum average waiting time, it requires knowledge of CPU burst times in advance, making pure SJF impractical in general-purpose desktop operating systems.
          Conversely, <strong>Round Robin</strong> ensures responsiveness and fairness for interactive time-sharing systems, but incurs context-switching overhead.
          <strong> FCFS</strong> is trivial to implement with zero scheduling overhead, but suffers from the Convoy Effect when burst times vary significantly.
        </p>
      </div>
    </div>
  );
};
