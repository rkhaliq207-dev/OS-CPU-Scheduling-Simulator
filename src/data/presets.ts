/**
 * OS Lab — CPU Scheduling Simulator
 * Preset workload scenarios designed for academic lab demonstrations and viva voce exams.
 */

import { PresetScenario } from '../types/scheduling';
import { PROCESS_COLORS } from '../utils/schedulingAlgorithms';

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'textbook_classic',
    name: 'Standard Textbook Case',
    badge: 'Balanced Mix',
    description: 'A standard reference workload from Silberschatz OS concepts with staggered arrivals, mixed bursts, and varied priorities.',
    defaultQuantum: 2,
    educationalInsight: 'Ideal baseline test. Notice how SJF achieves the lowest average waiting time, while Round Robin provides the fairest response time across all processes.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: 2, color: PROCESS_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 1, color: PROCESS_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 8, priority: 4, color: PROCESS_COLORS[2] },
      { id: 'P4', arrivalTime: 3, burstTime: 6, priority: 3, color: PROCESS_COLORS[3] },
    ],
  },
  {
    id: 'convoy_effect',
    name: 'FCFS Convoy Effect',
    badge: 'Viva Favorite',
    description: 'A heavy CPU-bound job arrives first (Burst 20), followed closely by quick I/O-bound processes (Burst 2 and 3).',
    defaultQuantum: 3,
    educationalInsight: 'Under FCFS, short processes (P2, P3, P4) are trapped waiting for P1 to finish (Convoy Effect). Compare this with SJF or Round Robin to see average waiting time plummet!',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 20, priority: 3, color: PROCESS_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 2, priority: 1, color: PROCESS_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 3, priority: 2, color: PROCESS_COLORS[2] },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 1, color: PROCESS_COLORS[3] },
    ],
  },
  {
    id: 'idle_gap_test',
    name: 'CPU Idle Gap Test',
    badge: 'Edge Case',
    description: 'Initial processes finish at time 6, but the subsequent processes do not arrive until time 11, leaving the CPU completely idle.',
    defaultQuantum: 4,
    educationalInsight: 'Verifies CPU idle detection. A naive simulator mistakenly compresses the timeline; this simulator correctly inserts a distinct [IDLE] block from time 6 to 11.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 3, priority: 1, color: PROCESS_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 2, color: PROCESS_COLORS[1] },
      { id: 'P3', arrivalTime: 11, burstTime: 4, priority: 1, color: PROCESS_COLORS[2] },
      { id: 'P4', arrivalTime: 13, burstTime: 2, priority: 3, color: PROCESS_COLORS[3] },
    ],
  },
  {
    id: 'priority_ties',
    name: 'Priority & Tie-Breaker Demo',
    badge: 'Rule Verification',
    description: 'Multiple processes share identical high priorities (Priority 1) or identical burst times, proving deterministic tie-breaking.',
    defaultQuantum: 2,
    educationalInsight: 'In non-preemptive priority, P1 and P3 both have priority 1. P1 runs first because it arrived at t=0; when P1 finishes at t=4, P3 (arrived t=2) takes precedence over P2 (priority 3).',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 4, priority: 1, color: PROCESS_COLORS[0] },
      { id: 'P2', arrivalTime: 1, burstTime: 5, priority: 3, color: PROCESS_COLORS[1] },
      { id: 'P3', arrivalTime: 2, burstTime: 3, priority: 1, color: PROCESS_COLORS[2] },
      { id: 'P4', arrivalTime: 3, burstTime: 2, priority: 2, color: PROCESS_COLORS[3] },
    ],
  },
];
