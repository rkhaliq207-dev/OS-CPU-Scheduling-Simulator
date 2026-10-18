/**
 * OS Lab — CPU Scheduling Simulator
 * Overview Section with Hero, Project Objectives, Feature Cards, and Uniprocessor Architecture Notice.
 */

import React from 'react';
import { Layers, BarChart2, BookOpen, Clock, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface OverviewSectionProps {
  onNavigate: (section: string) => void;
  onSelectPreset: (presetId: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate, onSelectPreset }) => {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1427] via-[#0f172a] to-[#0a1120] border border-slate-800/80 p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/50 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>B.Tech Computer Science & Engineering · Operating Systems Mini-Project</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight">
            CPU Scheduling Simulator & Visual Laboratory
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            An interactive educational workbench to analyze, simulate, and compare uniprocessor CPU scheduling algorithms:
            <strong className="text-cyan-400 font-semibold"> FCFS</strong>,
            <strong className="text-cyan-400 font-semibold"> SJF</strong>,
            <strong className="text-cyan-400 font-semibold"> Priority</strong>, and
            <strong className="text-cyan-400 font-semibold"> Round Robin</strong>. Built with precise Gantt timeline math, CPU idle tracking, and viva voce revision modules.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('simulator')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('comparison')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Compare All 4 Algorithms</span>
            </button>

            <button
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Formulas & Viva Quiz</span>
            </button>
          </div>
        </div>

        {/* Decorative subtle ambient backdrop glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Mandatory Educational Scope & Architecture Callout */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 flex items-start gap-4">
        <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/50 text-blue-400 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-sm">
          <h2 className="text-white font-semibold">Single-CPU Uniprocessor Model (Educational Scope)</h2>
          <p className="text-slate-300 leading-relaxed">
            This simulator models a canonical <strong>Single-CPU (Uniprocessor) system</strong> without multi-threading or hardware multiprocessors.
            At any given time unit $t$, exactly one process or the CPU idle thread occupies the processing unit.
            Deterministic tie-breaking prioritizes arrival time and Process ID, aligning strictly with standard university academic curricula (Silberschatz, Galvin & Gagne).
          </p>
        </div>
      </div>

      {/* Project Objectives & Core Features Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span>Core Simulator Capabilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#0e1628] border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base">4 Core Algorithms</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Explore FCFS, Non-Preemptive SJF, Non-Preemptive Priority (lower number = higher priority), and Round Robin with configurable Time Quantum $Q$.
            </p>
          </div>

          <div className="rounded-xl bg-[#0e1628] border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800/50 text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base">Proportional Gantt Chart</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Color-coded time blocks with start and finish markers. Accurately highlights CPU Idle periods when no process has arrived.
            </p>
          </div>

          <div className="rounded-xl bg-[#0e1628] border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-800/50 text-indigo-400 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base">Multi-Metric Analytics</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Real-time calculation of Completion Time ($CT$), Turnaround Time ($TAT$), Waiting Time ($WT$), Response Time ($RT$), CPU Utilization, and Throughput.
            </p>
          </div>

          <div className="rounded-xl bg-[#0e1628] border border-slate-800 p-5 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-teal-950/80 border border-teal-800/50 text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-base">Viva Voce Preparation</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Detailed step-by-step trace explanations, textbook formulas, worked numericals, and a 5-question interactive quiz with feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Viva Demonstration Scenarios */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Curated Lab Test Cases (One-Click Demonstrations)
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">Click any scenario to load into simulator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              onSelectPreset('convoy_effect');
              onNavigate('simulator');
            }}
            className="text-left rounded-xl bg-[#0c1427] hover:bg-[#111a33] border border-slate-800 hover:border-cyan-800/60 p-5 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400 font-semibold text-sm group-hover:text-cyan-300">
                1. FCFS Convoy Effect Test
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                Viva Classic
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              P1 has a massive burst time of 20, trapping short processes P2, P3, and P4. Shows why FCFS suffers and how SJF/Round Robin rescue turnaround times.
            </p>
          </button>

          <button
            onClick={() => {
              onSelectPreset('idle_gap_test');
              onNavigate('simulator');
            }}
            className="text-left rounded-xl bg-[#0c1427] hover:bg-[#111a33] border border-slate-800 hover:border-cyan-800/60 p-5 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-400 font-semibold text-sm group-hover:text-cyan-300">
                2. CPU Idle Gap Edge Case
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                Edge Case
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Processes finish at t=6, and the next process does not arrive until t=11. Proves correct idle interval insertion and accurate waiting time computation.
            </p>
          </button>
        </div>
      </div>

      {/* Lab Checkpoints & Mathematical Proof */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800/80 p-6 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Core Academic Formulas Verified in Simulator</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Turnaround Time (TAT)</span>
            <span className="text-cyan-300 font-bold text-sm">TAT = CT − AT</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Waiting Time (WT)</span>
            <span className="text-cyan-300 font-bold text-sm">WT = TAT − BT</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block mb-1">Response Time (RT)</span>
            <span className="text-cyan-300 font-bold text-sm">RT = First CPU Allocation − AT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
