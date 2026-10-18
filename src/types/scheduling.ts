/**
 * OS Lab — CPU Scheduling Simulator
 * Type definitions for processes, scheduling results, Gantt segments, and educational modules.
 */

export type AlgorithmType = 'FCFS' | 'SJF' | 'Priority' | 'Round Robin';

export interface ProcessInput {
  id: string;          // Unique identifier, e.g. "P1", "P2"
  arrivalTime: number; // Arrival time in ready queue (AT >= 0)
  burstTime: number;   // CPU execution burst time required (BT > 0)
  priority: number;    // Priority rank (lower number = higher priority, >= 1)
  color: string;       // Distinct badge / chart color
}

export interface GanttSegment {
  processId: string;   // Process ID or "IDLE"
  startTime: number;   // Unit start time
  endTime: number;     // Unit finish time
  duration: number;    // endTime - startTime
  isIdle: boolean;     // True if CPU had no ready process
  color: string;       // Color for visualization block
}

export interface ProcessMetric {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  completionTime: number;  // CT: Time when process finishes execution
  turnaroundTime: number;  // TAT = CT - AT
  waitingTime: number;     // WT = TAT - BT
  responseTime: number;    // RT = First CPU Start Time - AT
  color: string;
}

export interface SimulationResult {
  algorithm: AlgorithmType;
  timeQuantum?: number;
  timeline: GanttSegment[];
  metrics: ProcessMetric[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  totalTime: number;
  idleTime: number;
  cpuUtilization: number;  // Percentage: ((TotalTime - IdleTime) / TotalTime) * 100
  throughput: number;      // Completed processes per unit time (N / TotalTime)
  explanation: string[];   // Trace log of scheduling decisions
}

export interface PresetScenario {
  id: string;
  name: string;
  badge: string;
  description: string;
  processes: ProcessInput[];
  defaultQuantum?: number;
  educationalInsight: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
