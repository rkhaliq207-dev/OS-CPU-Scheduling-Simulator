/**
 * OS Lab — CPU Scheduling Simulator
 * Main Application Component uniting Overview, Simulator, Comparison, Theory, and Viva documentation.
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { ProcessTable } from './components/ProcessTable';
import { GanttChart } from './components/GanttChart';
import { MetricsTable } from './components/MetricsTable';
import { AlgorithmComparison } from './components/AlgorithmComparison';
import { LearnOSSection } from './components/LearnOSSection';
import { AboutSection } from './components/AboutSection';
import { ProcessInput, AlgorithmType } from './types/scheduling';
import { PRESET_SCENARIOS } from './data/presets';
import { runSimulation } from './utils/schedulingAlgorithms';
import { Layers, Clock, Zap, Cpu, Check, HelpCircle } from 'lucide-react';

export default function App() {
  // Navigation active tab: 'overview' | 'simulator' | 'comparison' | 'learn' | 'about'
  const [activeSection, setActiveSection] = useState<string>('simulator');

  // Selected preset scenario ID
  const [selectedPresetId, setSelectedPresetId] = useState<string>('textbook_classic');

  // Core Process Queue State (defaulted to Textbook Classic)
  const [processes, setProcesses] = useState<ProcessInput[]>(
    PRESET_SCENARIOS[0].processes
  );

  // Selected Algorithm & Quantum
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('FCFS');
  const [timeQuantum, setTimeQuantum] = useState<number>(2);

  // Reset Demo handler
  const handleResetDemo = () => {
    const defaultPreset = PRESET_SCENARIOS[0];
    setSelectedPresetId(defaultPreset.id);
    setProcesses([...defaultPreset.processes]);
    setSelectedAlgorithm('FCFS');
    setTimeQuantum(defaultPreset.defaultQuantum || 2);
  };

  // Load a preset scenario
  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_SCENARIOS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(preset.id);
      setProcesses([...preset.processes]);
      if (preset.defaultQuantum) {
        setTimeQuantum(preset.defaultQuantum);
      }
    }
  };

  // Print Lab Report handler
  const handlePrintReport = () => {
    window.print();
  };

  // Run simulation dynamically whenever processes, algorithm, or timeQuantum changes
  const simulationResult = useMemo(() => {
    return runSimulation(selectedAlgorithm, processes, timeQuantum);
  }, [selectedAlgorithm, processes, timeQuantum]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onResetDemo={handleResetDemo}
        onPrintReport={handlePrintReport}
      />

      {/* Printable Lab Report Header (Visible only when printing) */}
      <div className="hidden print:block p-8 border-b border-slate-300 mb-6 bg-white text-slate-900 font-sans">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Operating Systems Laboratory — Practical Record Sheet
        </h1>
        <h2 className="text-base text-slate-700 font-semibold mt-1">
          Experiment: CPU Scheduling Simulator & Performance Evaluation
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-mono border-t border-slate-300 pt-3">
          <div>
            <p><strong>Student Name:</strong> [Student Name]</p>
            <p><strong>Roll / Reg No:</strong> [University Roll Number]</p>
            <p><strong>Branch / Year:</strong> B.Tech CSE · 2nd Year (Sem 4)</p>
          </div>
          <div>
            <p><strong>Institution:</strong> [College of Engineering]</p>
            <p><strong>Algorithm Evaluated:</strong> {selectedAlgorithm} {selectedAlgorithm === 'Round Robin' ? `(Q=${timeQuantum})` : ''}</p>
            <p><strong>Evaluation Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <OverviewSection
            onNavigate={(sec) => setActiveSection(sec)}
            onSelectPreset={handleLoadPreset}
          />
        )}

        {/* VIEW 2: CPU SCHEDULING SIMULATOR */}
        {activeSection === 'simulator' && (
          <div className="space-y-8 py-2">
            {/* Algorithm Selector Header Deck */}
            <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 sm:p-6 space-y-4 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    <span>Select CPU Scheduling Algorithm</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose an algorithm to simulate single-CPU execution order, Gantt timeline, and metrics.
                  </p>
                </div>

                {/* Algorithm Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-700/80 overflow-x-auto">
                  {(['FCFS', 'SJF', 'Priority', 'Round Robin'] as AlgorithmType[]).map((algo) => {
                    const isSelected = selectedAlgorithm === algo;
                    return (
                      <button
                        key={algo}
                        onClick={() => setSelectedAlgorithm(algo)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {algo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Algorithm Information Banner & Quantum Controller */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-semibold text-cyan-400">{selectedAlgorithm}:</span>
                  {selectedAlgorithm === 'FCFS' && (
                    <span>Non-preemptive · First-Come First-Served · Tie-breaker: Arrival Time, then Process ID.</span>
                  )}
                  {selectedAlgorithm === 'SJF' && (
                    <span>Non-preemptive · Shortest Job First · Dispatches lowest burst time among arrived processes.</span>
                  )}
                  {selectedAlgorithm === 'Priority' && (
                    <span>Non-preemptive · Priority Scheduling · Standard rule: <strong>Lower integer = Higher priority</strong>.</span>
                  )}
                  {selectedAlgorithm === 'Round Robin' && (
                    <span>Preemptive · Circular time-slice execution · Slices duration by Time Quantum $Q$.</span>
                  )}
                </div>

                {/* Round Robin Time Quantum Slider/Input */}
                {selectedAlgorithm === 'Round Robin' && (
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-cyan-800/60 self-start sm:self-auto shrink-0">
                    <span className="font-semibold text-cyan-300 text-xs">Time Quantum (Q):</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={timeQuantum}
                      onChange={(e) => setTimeQuantum(Math.max(1, Number(e.target.value)))}
                      className="w-14 px-2 py-0.5 rounded bg-slate-800 border border-slate-600 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 tabular-nums font-bold"
                    />
                    <span className="text-slate-400 text-xs">units</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 1: Process Input Table */}
            <ProcessTable
              processes={processes}
              setProcesses={setProcesses}
              onLoadPreset={handleLoadPreset}
              selectedPresetId={selectedPresetId}
            />

            {/* Section 2: Proportional Gantt Chart Visualizer */}
            <GanttChart
              timeline={simulationResult.timeline}
              totalTime={simulationResult.totalTime}
              algorithmName={`${selectedAlgorithm}${selectedAlgorithm === 'Round Robin' ? ` (Q = ${timeQuantum})` : ''}`}
            />

            {/* Section 3: Process Metrics & Scheduling Trace */}
            <MetricsTable result={simulationResult} />
          </div>
        )}

        {/* VIEW 3: ALGORITHM COMPARISON */}
        {activeSection === 'comparison' && (
          <AlgorithmComparison processes={processes} defaultQuantum={timeQuantum} />
        )}

        {/* VIEW 4: LEARN OS & VIVA QUIZ */}
        {activeSection === 'learn' && <LearnOSSection />}

        {/* VIEW 5: ABOUT PROJECT & VIVA CHEAT SHEET */}
        {activeSection === 'about' && <AboutSection />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#0a0f1d] px-4 sm:px-6 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span className="text-slate-400 font-medium">
              OS Lab — CPU Scheduling Simulator
            </span>
            <span>·</span>
            <span>Uniprocessor Educational Model</span>
          </div>

          <div className="text-slate-400">
            B.Tech Computer Science & Engineering · Operating Systems Mini-Project
          </div>
        </div>
      </footer>
    </div>
  );
}
