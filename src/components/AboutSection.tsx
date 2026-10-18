/**
 * OS Lab — CPU Scheduling Simulator
 * About Project Section: Student & College Placeholders, Lab Evaluation Rubric, and Viva Voce Tips.
 */

import React from 'react';
import { Info, User, GraduationCap, CheckCircle2, FileCode, HelpCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Info className="w-6 h-6 text-cyan-400" />
          <span>Academic Project Information & Viva Guide</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Prepared for 2nd Year B.Tech Computer Science & Engineering Operating Systems Laboratory practical assessment and viva examination.
        </p>
      </div>

      {/* Student & College Placeholders Card */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          <span>Project Credentials & Lab Record Header</span>
        </h3>
        <p className="text-xs text-slate-400">
          Editable placeholder tags for your laboratory record sheet and final project submission report:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">Student Name</span>
            <span className="text-cyan-300 font-bold text-sm">[Student Name]</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">University Roll Number</span>
            <span className="text-cyan-300 font-bold text-sm">[University Roll / Reg No.]</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">Degree & Program</span>
            <span className="text-white font-bold text-sm">B.Tech in Computer Science & Engg.</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">College / University</span>
            <span className="text-cyan-300 font-bold text-sm">[Your College of Engineering]</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">Academic Year & Semester</span>
            <span className="text-white font-bold text-sm">Semester 4 (2nd Year) · [202X - 202X]</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-sans">Laboratory Course</span>
            <span className="text-white font-bold text-sm">CS301: Operating Systems Laboratory</span>
          </div>
        </div>
      </div>

      {/* Lab Evaluation Rubric & Viva Checklist */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Mini-Project Evaluation Rubric Checklist</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
              <span>Algorithm Precision & Tie-Breaking</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Correctly implements FCFS, non-preemptive SJF, non-preemptive Priority (lower integer = higher priority), and Round Robin with arrival times and tie-breakers.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Proportional Gantt Chart & CPU Idle Slots</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Draws a true proportional timeline with start/finish time stamps. Accurately renders striped [IDLE] blocks when no process is ready.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Accurate Metrics Math</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Computes Completion Time (CT), Turnaround Time (TAT = CT − AT), Waiting Time (WT = TAT − BT), and Response Time (RT = First Start − AT) with verifiable averages.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] font-bold">4</span>
              <span>Comparative Benchmarking & Analysis</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Simulates all 4 algorithms concurrently on identical workloads with comparative bar visualizers and educational trade-off explanations.
            </p>
          </div>
        </div>
      </div>

      {/* College Viva Voce Cheat Sheet */}
      <div className="rounded-xl bg-[#0c1427] border border-cyan-900/60 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2 text-cyan-300">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <span>Top 4 Viva Voce Questions Asked by Professors</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">Q1: What is the difference between Preemptive and Non-Preemptive scheduling?</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              In non-preemptive scheduling, once the CPU has been allocated to a process, the process keeps the CPU until it terminates or switches to waiting state. In preemptive scheduling, the OS kernel can interrupt and switch an executing process to the ready queue (e.g. Round Robin timer interrupt or higher priority arrival).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">Q2: Why is SJF considered optimal, yet rarely used in general-purpose desktop operating systems?</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              SJF is provably optimal for minimizing average waiting time. However, in interactive desktop OSes, the kernel cannot know the exact duration of future CPU bursts in advance. It can only estimate future bursts using exponential smoothing: &tau;[n+1] = &alpha; &middot; t[n] + (1 - &alpha;) &middot; &tau;[n].
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">Q3: What happens if Time Quantum (Q) is too small or too large in Round Robin?</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              If Q is very small, the frequent context switches cause substantial CPU overhead, reducing useful CPU throughput. If Q is very large (larger than the largest burst), Round Robin degrades into simple FCFS. Textbook guideline: around 80% of CPU bursts should be shorter than Q.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">Q4: What is Priority Inversion and how is it solved?</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Priority inversion occurs when a higher-priority process is indirectly preempted by a lower-priority process holding a shared resource. It is resolved using the <strong>Priority Inheritance Protocol</strong>, where the lower-priority process temporarily inherits the highest priority of any process waiting for that shared resource.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
