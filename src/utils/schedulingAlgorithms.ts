/**
 * OS Lab — CPU Scheduling Simulator
 * Core Scheduling Algorithms: FCFS, SJF (Non-Preemptive), Priority (Non-Preemptive), and Round Robin.
 * Fully compliant with standard uniprocessor operating systems theory (Silberschatz & Galvin).
 */

import { ProcessInput, GanttSegment, ProcessMetric, SimulationResult, AlgorithmType } from '../types/scheduling';

/**
 * Standard palette of distinct accessible colors for process visualization.
 */
export const PROCESS_COLORS = [
  '#0284c7', // Sky Blue
  '#0d9488', // Teal
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#f97316', // Orange
  '#3b82f6', // Cobalt
  '#14b8a6', // Cyan
];

export const IDLE_COLOR = '#334155'; // Dark Slate for CPU Idle

/**
 * Helper to compute summary metrics and format trace explanation
 */
function compileSimulationResult(
  algorithm: AlgorithmType,
  processes: ProcessInput[],
  timeline: GanttSegment[],
  completionTimes: Map<string, number>,
  firstStartTimes: Map<string, number>,
  explanation: string[],
  timeQuantum?: number
): SimulationResult {
  const n = processes.length;
  if (n === 0) {
    return {
      algorithm,
      timeQuantum,
      timeline: [],
      metrics: [],
      avgWaitingTime: 0,
      avgTurnaroundTime: 0,
      avgResponseTime: 0,
      totalTime: 0,
      idleTime: 0,
      cpuUtilization: 0,
      throughput: 0,
      explanation: ['No processes provided in queue.'],
    };
  }

  // Merge contiguous segments of the same process/idle for cleaner chart
  const mergedTimeline: GanttSegment[] = [];
  for (const seg of timeline) {
    if (seg.duration <= 0) continue;
    const last = mergedTimeline[mergedTimeline.length - 1];
    if (last && last.processId === seg.processId && last.isIdle === seg.isIdle) {
      last.endTime = seg.endTime;
      last.duration += seg.duration;
    } else {
      mergedTimeline.push({ ...seg });
    }
  }

  let totalIdle = 0;
  for (const seg of mergedTimeline) {
    if (seg.isIdle) totalIdle += seg.duration;
  }

  const totalTime = mergedTimeline.length > 0 ? mergedTimeline[mergedTimeline.length - 1].endTime : 0;
  const cpuUtilization = totalTime > 0 ? ((totalTime - totalIdle) / totalTime) * 100 : 0;
  const throughput = totalTime > 0 ? n / totalTime : 0;

  let totalWT = 0;
  let totalTAT = 0;
  let totalRT = 0;

  const metrics: ProcessMetric[] = processes.map((p) => {
    const ct = completionTimes.get(p.id) ?? p.arrivalTime;
    const tat = ct - p.arrivalTime; // Turnaround Time = Completion Time - Arrival Time
    const wt = tat - p.burstTime;   // Waiting Time = Turnaround Time - Burst Time
    const firstStart = firstStartTimes.get(p.id) ?? p.arrivalTime;
    const rt = firstStart - p.arrivalTime; // Response Time = First CPU Allocation - Arrival Time

    totalWT += wt;
    totalTAT += tat;
    totalRT += rt;

    return {
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      priority: p.priority,
      completionTime: ct,
      turnaroundTime: tat,
      waitingTime: wt,
      responseTime: rt,
      color: p.color,
    };
  });

  return {
    algorithm,
    timeQuantum,
    timeline: mergedTimeline,
    metrics,
    avgWaitingTime: Number((totalWT / n).toFixed(2)),
    avgTurnaroundTime: Number((totalTAT / n).toFixed(2)),
    avgResponseTime: Number((totalRT / n).toFixed(2)),
    totalTime,
    idleTime: totalIdle,
    cpuUtilization: Number(cpuUtilization.toFixed(2)),
    throughput: Number(throughput.toFixed(3)),
    explanation,
  };
}

/**
 * 1. FIRST COME FIRST SERVED (FCFS) - Non-Preemptive
 * Dispatches processes in order of arrival time.
 * If arrival times are equal, tie-breaker is process index / ID.
 */
export function calculateFCFS(processes: ProcessInput[]): SimulationResult {
  const explanation: string[] = [];
  explanation.push('Algorithm: First Come First Served (FCFS). Non-preemptive discipline.');

  // Sort strictly by Arrival Time, then original index
  const sorted = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  let currentTime = 0;
  const timeline: GanttSegment[] = [];
  const completionTimes = new Map<string, number>();
  const firstStartTimes = new Map<string, number>();

  for (const p of sorted) {
    // Check if CPU is idle before process arrives
    if (currentTime < p.arrivalTime) {
      const idleDuration = p.arrivalTime - currentTime;
      explanation.push(
        `Time ${currentTime} to ${p.arrivalTime}: CPU is idle waiting for process ${p.id} to arrive (Duration: ${idleDuration}).`
      );
      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: p.arrivalTime,
        duration: idleDuration,
        isIdle: true,
        color: IDLE_COLOR,
      });
      currentTime = p.arrivalTime;
    }

    firstStartTimes.set(p.id, currentTime);
    const startTime = currentTime;
    const endTime = currentTime + p.burstTime;
    currentTime = endTime;
    completionTimes.set(p.id, endTime);

    explanation.push(
      `Time ${startTime} to ${endTime}: Process ${p.id} runs for burst time ${p.burstTime}. Completes at ${endTime}.`
    );

    timeline.push({
      processId: p.id,
      startTime,
      endTime,
      duration: p.burstTime,
      isIdle: false,
      color: p.color,
    });
  }

  return compileSimulationResult(
    'FCFS',
    processes,
    timeline,
    completionTimes,
    firstStartTimes,
    explanation
  );
}

/**
 * 2. SHORTEST JOB FIRST (SJF) - Non-Preemptive
 * At any moment CPU becomes free, inspects all arrived and unfinished processes.
 * Selects the process with the lowest burst time.
 * Tie-breaker: earlier arrival time, then process ID.
 */
export function calculateSJF(processes: ProcessInput[]): SimulationResult {
  const explanation: string[] = [];
  explanation.push('Algorithm: Shortest Job First (SJF). Non-preemptive. Selects lowest burst time among arrived processes.');

  const n = processes.length;
  const completed = new Set<string>();
  const timeline: GanttSegment[] = [];
  const completionTimes = new Map<string, number>();
  const firstStartTimes = new Map<string, number>();

  let currentTime = 0;

  while (completed.size < n) {
    // Find all arrived and incomplete processes
    const available = processes.filter((p) => p.arrivalTime <= currentTime && !completed.has(p.id));

    if (available.length === 0) {
      // Find next arrival time
      const remaining = processes.filter((p) => !completed.has(p.id));
      const nextArrival = Math.min(...remaining.map((p) => p.arrivalTime));
      const idleDuration = nextArrival - currentTime;

      explanation.push(
        `Time ${currentTime} to ${nextArrival}: CPU idle. No processes in ready queue. Waiting for next arrival at ${nextArrival}.`
      );

      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: idleDuration,
        isIdle: true,
        color: IDLE_COLOR,
      });

      currentTime = nextArrival;
      continue;
    }

    // Pick process with shortest burst time
    available.sort((a, b) => {
      if (a.burstTime !== b.burstTime) return a.burstTime - b.burstTime;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    });

    const chosen = available[0];
    const startTime = currentTime;
    const endTime = currentTime + chosen.burstTime;

    firstStartTimes.set(chosen.id, startTime);
    completionTimes.set(chosen.id, endTime);
    completed.add(chosen.id);

    explanation.push(
      `Time ${startTime} to ${endTime}: Selected ${chosen.id} (Shortest burst = ${chosen.burstTime} among ${available.length} ready). Completes at ${endTime}.`
    );

    timeline.push({
      processId: chosen.id,
      startTime,
      endTime,
      duration: chosen.burstTime,
      isIdle: false,
      color: chosen.color,
    });

    currentTime = endTime;
  }

  return compileSimulationResult(
    'SJF',
    processes,
    timeline,
    completionTimes,
    firstStartTimes,
    explanation
  );
}

/**
 * 3. PRIORITY SCHEDULING - Non-Preemptive
 * Standard university convention: Lower integer value represents HIGHER priority (e.g. 1 is highest).
 * At CPU availability, picks arrived process with minimum priority integer.
 * Tie-breaker: earlier arrival time, then process ID.
 */
export function calculatePriority(processes: ProcessInput[]): SimulationResult {
  const explanation: string[] = [];
  explanation.push('Algorithm: Priority Scheduling (Non-Preemptive). Lower integer value = Higher priority.');

  const n = processes.length;
  const completed = new Set<string>();
  const timeline: GanttSegment[] = [];
  const completionTimes = new Map<string, number>();
  const firstStartTimes = new Map<string, number>();

  let currentTime = 0;

  while (completed.size < n) {
    const available = processes.filter((p) => p.arrivalTime <= currentTime && !completed.has(p.id));

    if (available.length === 0) {
      const remaining = processes.filter((p) => !completed.has(p.id));
      const nextArrival = Math.min(...remaining.map((p) => p.arrivalTime));
      const idleDuration = nextArrival - currentTime;

      explanation.push(
        `Time ${currentTime} to ${nextArrival}: CPU idle. No processes in ready queue. Waiting until next arrival at ${nextArrival}.`
      );

      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: idleDuration,
        isIdle: true,
        color: IDLE_COLOR,
      });

      currentTime = nextArrival;
      continue;
    }

    // Pick highest priority (lowest integer value)
    available.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    });

    const chosen = available[0];
    const startTime = currentTime;
    const endTime = currentTime + chosen.burstTime;

    firstStartTimes.set(chosen.id, startTime);
    completionTimes.set(chosen.id, endTime);
    completed.add(chosen.id);

    explanation.push(
      `Time ${startTime} to ${endTime}: Dispatched ${chosen.id} (Highest priority = ${chosen.priority}, Burst = ${chosen.burstTime}). Completes at ${endTime}.`
    );

    timeline.push({
      processId: chosen.id,
      startTime,
      endTime,
      duration: chosen.burstTime,
      isIdle: false,
      color: chosen.color,
    });

    currentTime = endTime;
  }

  return compileSimulationResult(
    'Priority',
    processes,
    timeline,
    completionTimes,
    firstStartTimes,
    explanation
  );
}

/**
 * 4. ROUND ROBIN (RR) - Preemptive
 * Dispatches processes in circular FIFO order using a fixed time quantum Q.
 * If remaining burst <= Q, process finishes within this slice.
 * If remaining burst > Q, process is preempted after Q time units and pushed to back of queue.
 * Handles newly arrived processes while a time slice is running.
 */
export function calculateRoundRobin(processes: ProcessInput[], timeQuantum: number): SimulationResult {
  const q = Math.max(1, timeQuantum);
  const explanation: string[] = [];
  explanation.push(`Algorithm: Round Robin (RR). Preemptive with Time Quantum Q = ${q}.`);

  const n = processes.length;
  const remainingBurst = new Map<string, number>();
  const processMap = new Map<string, ProcessInput>();
  const completionTimes = new Map<string, number>();
  const firstStartTimes = new Map<string, number>();
  const timeline: GanttSegment[] = [];

  for (const p of processes) {
    remainingBurst.set(p.id, p.burstTime);
    processMap.set(p.id, p);
  }

  // Sort by arrival time initially
  const sorted = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  const readyQueue: string[] = [];
  const hasEverQueued = new Set<string>();
  let currentTime = 0;
  let completedCount = 0;

  // Handle initial idle before any process arrives
  if (sorted.length > 0 && sorted[0].arrivalTime > 0) {
    const idleDuration = sorted[0].arrivalTime;
    explanation.push(`Time 0 to ${idleDuration}: CPU idle before initial process arrival.`);
    timeline.push({
      processId: 'IDLE',
      startTime: 0,
      endTime: idleDuration,
      duration: idleDuration,
      isIdle: true,
      color: IDLE_COLOR,
    });
    currentTime = idleDuration;
  }

  // Enqueue initial arrived processes
  for (const p of sorted) {
    if (p.arrivalTime <= currentTime && !hasEverQueued.has(p.id)) {
      readyQueue.push(p.id);
      hasEverQueued.add(p.id);
    }
  }

  while (completedCount < n) {
    if (readyQueue.length === 0) {
      // Find next arriving uncompleted process
      const uncompleted = processes.filter((p) => (remainingBurst.get(p.id) ?? 0) > 0);
      const nextArrival = Math.min(...uncompleted.map((p) => p.arrivalTime));
      const idleDuration = nextArrival - currentTime;

      explanation.push(
        `Time ${currentTime} to ${nextArrival}: Ready queue empty. CPU idle for ${idleDuration} units until next arrival.`
      );

      timeline.push({
        processId: 'IDLE',
        startTime: currentTime,
        endTime: nextArrival,
        duration: idleDuration,
        isIdle: true,
        color: IDLE_COLOR,
      });

      currentTime = nextArrival;

      // Enqueue all newly arrived
      for (const p of sorted) {
        if (p.arrivalTime <= currentTime && !hasEverQueued.has(p.id) && (remainingBurst.get(p.id) ?? 0) > 0) {
          readyQueue.push(p.id);
          hasEverQueued.add(p.id);
        }
      }
      continue;
    }

    const currentId = readyQueue.shift()!;
    const p = processMap.get(currentId)!;
    const currentRem = remainingBurst.get(currentId)!;

    // Record first response time
    if (!firstStartTimes.has(currentId)) {
      firstStartTimes.set(currentId, currentTime);
    }

    const execSlice = Math.min(currentRem, q);
    const startTime = currentTime;
    const endTime = currentTime + execSlice;
    currentTime = endTime;
    const newRem = currentRem - execSlice;
    remainingBurst.set(currentId, newRem);

    timeline.push({
      processId: currentId,
      startTime,
      endTime,
      duration: execSlice,
      isIdle: false,
      color: p.color,
    });

    // Enqueue processes that arrived DURING this execution slice
    for (const other of sorted) {
      if (
        other.arrivalTime > startTime &&
        other.arrivalTime <= endTime &&
        !hasEverQueued.has(other.id) &&
        (remainingBurst.get(other.id) ?? 0) > 0
      ) {
        readyQueue.push(other.id);
        hasEverQueued.add(other.id);
      }
    }

    if (newRem === 0) {
      completedCount++;
      completionTimes.set(currentId, endTime);
      explanation.push(
        `Time ${startTime} to ${endTime}: ${currentId} executed final ${execSlice} unit(s). Process finished at ${endTime}.`
      );
    } else {
      // Re-queue the preempted process
      readyQueue.push(currentId);
      explanation.push(
        `Time ${startTime} to ${endTime}: ${currentId} consumed time quantum (${execSlice} units). Remaining burst = ${newRem}. Preempted to back of queue.`
      );
    }
  }

  return compileSimulationResult(
    'Round Robin',
    processes,
    timeline,
    completionTimes,
    firstStartTimes,
    explanation,
    q
  );
}

/**
 * Universal dispatcher to execute chosen algorithm
 */
export function runSimulation(
  algorithm: AlgorithmType,
  processes: ProcessInput[],
  timeQuantum: number = 2
): SimulationResult {
  switch (algorithm) {
    case 'FCFS':
      return calculateFCFS(processes);
    case 'SJF':
      return calculateSJF(processes);
    case 'Priority':
      return calculatePriority(processes);
    case 'Round Robin':
      return calculateRoundRobin(processes, timeQuantum);
    default:
      return calculateFCFS(processes);
  }
}
