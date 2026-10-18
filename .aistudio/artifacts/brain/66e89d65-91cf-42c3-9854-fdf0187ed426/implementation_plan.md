# OS Lab — CPU Scheduling Simulator

A complete, responsive educational web platform designed for second-year B.Tech Computer Science students to simulate, visualize, compare, and learn single-CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin) with precision scheduling mathematics, proportional Gantt charts, and viva-ready documentation.

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were skipped, so the project adopts the recommended student-first defaults:
> - **Dual Simulation Modes**: Provides both instant calculation and an interactive step-by-step playback controller with play/pause, step forward, and speed adjustment for classroom viva presentations.
> - **Preloaded Presets**: Includes 4 realistic textbook workloads (Balanced Textbook Case, CPU Idle Gap Stress Test, FCFS Convoy Effect Demo, and Priority Tie-Breaker).
> - **Export & Viva Tools**: Includes CSV metric export and printable lab record report view with student detail placeholders (`[Student Name]`, `[College/University]`, `[Roll Number / Academic Year]`).
> - **GitHub Pages Static Architecture**: Built as a pure client-side static application with zero backend or external API requirements, easily deployable via Vite build or direct static deployment.

---

## 1. Overview & Core Concept

- **What It Does**: Simulates CPU scheduling in a uniprocessor operating system environment. Users can add, edit, and delete processes with Arrival Time ($AT$), Burst Time ($BT$), and Priority ($P$). The simulator calculates Completion Time ($CT$), Turnaround Time ($TAT$), Waiting Time ($WT$), and Response Time ($RT$), rendering a proportional, time-scaled Gantt chart highlighting CPU active and idle phases. It also features a side-by-side Multi-Algorithm Comparison view, an interactive "Learn OS" knowledge base with worked numericals and formulas, an interactive 5-question viva quiz with instant feedback, and student viva notes.
- **Target Audience / Persona**: Second-year B.Tech / BE Computer Science students preparing mini-projects, practical lab exams, and viva voce questions on CPU scheduling concepts.
- **Key Value**: Bridges the gap between textbook theory (Silberschatz/Galvin) and visual intuition by showing exact execution order, tie-breaking rules, idle CPU times, and quantum expiration dynamics in real time.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Overview & Objectives**: Welcomes the student with lab objectives, course prerequisites (B.Tech CS OS Lab), and an architectural breakdown of CPU scheduling.
2. **Interactive Simulator**:
   - Process Table: Add custom processes, inline edit, delete, or load preset test cases. Validates inputs ($AT \ge 0$, $BT > 0$, Priority $\ge 1$, Quantum $> 0$).
   - Algorithm Selector: Toggle between FCFS, SJF (Non-Preemptive), Priority (Non-Preemptive, lower number = higher priority), and Round Robin (configurable Time Quantum $Q$).
   - Gantt Visualizer: Real-time proportional timeline with color-coded process blocks, precise start/finish time markers, and striped CPU Idle intervals.
   - Metrics & Formulas: Clean tabular numerals breakdown of $CT$, $TAT = CT - AT$, $WT = TAT - BT$, and $RT = \text{First CPU Start} - AT$, alongside CPU Utilization and Throughput.
   - Step-by-Step Playback: Play, pause, step-by-step step forward, and scrub execution state time unit by time unit.
3. **Multi-Algorithm Comparison**: Run all 4 algorithms concurrently on identical workloads; view comparative metrics (Average $WT$, Average $TAT$, Total Elapsed Time) and educational trade-off breakdown.
4. **Learn OS & Quiz**: Comprehensive guide with definitions, step-by-step worked examples, glossary, and an interactive 5-question OS quiz with scoring and explanations.
5. **Project & Viva Info**: Lab cover sheet with student credentials placeholders, evaluation rubric summary, and college viva FAQ.

### Visual Identity & Theme
- **Aesthetic Direction**: Professional dark technical laboratory dashboard (Dark Navy `#0a0f1d`, Deep Slate `#111827`, Card Surface `#1e293b`), accented with high-contrast electric cyan (`#06b6d4`), cobalt blue (`#3b82f6`), and emerald (`#10b981`) for idle/active indicators.
- **Typography & Hierarchy**:
  - Headings: `Plus Jakarta Sans` / `Outfit` (clean geometric tech aesthetic, SemiBold 600).
  - Body: Modern readable sans-serif with comfortable line height and optical dark compensation.
  - Metrics & Numbers: Strict tabular monospace (`JetBrains Mono` / `font-mono tabular-nums`) ensuring vertical column alignment.
- **Layout & Structure**:
  - Top navigation with single-line links (`Overview`, `CPU Scheduling`, `Algorithm Comparison`, `Learn OS`, `About Project`) and responsive mobile menu.
  - Two-zone simulation canvas: Process Input & Algorithm Configuration Deck (left/top) + Gantt Stage & Detailed Analytics (right/bottom).
  - Anti-slop discipline: No fake scorecards, no decorative pulse dots, no static pill badge sandwiches, and full WCAG AA contrast.

---

## 3. Key Product Decisions & Trade-Offs

- **Deterministic Tie-Breaking & Standard Assumptions**:
  - *Chosen Approach*: Ties in arrival time or burst time default to Process ID (arrival order in process queue). Priority follows standard textbook convention: **lower integer value = higher priority** (e.g., Priority 1 > Priority 2).
  - *Why*: Conforms strictly to standard university syllabi (GATE CS, Silberschatz, Galvin & Gagne).
- **Single-CPU Realism & Idle Handling**:
  - *Chosen Approach*: If the CPU finishes a process at time $T_1$ and no arrived process is ready until $T_2$ ($T_2 > T_1$), the CPU sits idle for $(T_2 - T_1)$ time units. The Gantt chart explicitly paints an `[IDLE]` block.
  - *Why*: Many naive student simulators incorrectly skip idle time, resulting in false turnaround calculations.
- **Client-Side Vanilla Architecture with Zero External Dependencies**:
  - *Chosen Approach*: Core scheduling logic implemented in pure, cleanly commented TypeScript/vanilla functions without third-party graphing bloat. Works instantaneously in browser and deploys seamlessly to GitHub Pages.
  - *Why*: Essential for a beginner student presenting code to a professor during viva examinations.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                   OS Lab — CPU Scheduling Simulator                     │
└────────────────────────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
┌──────────────┐             ┌──────────────┐            ┌──────────────┐
│  Navigation  │             │   App State  │            │ Learn & Viva │
│  & Lab Mode  │             │ Process Queue│            │  Interactive │
│   Selector   │             │ Algorithm, Q │            │  Theory/Quiz │
└──────────────┘             └──────┬───────┘            └──────────────┘
                                    │
       ┌────────────────────────────┴───────────────────────────┐
       ▼                                                        ▼
┌──────────────────────────────────────┐        ┌───────────────────────────────┐
│     Core Scheduling Engine (Pure JS) │        │     Simulation Controller     │
│  - FCFS Algorithm                    │        │  - Instant Execution Engine   │
│  - SJF (Non-Preemptive)              │        │  - Step-by-Step Playback Loop │
│  - Priority (Non-Preemptive)         │        │  - Speed & Timeline Scrubbing │
│  - Round Robin (Time Quantum Q)      │        └───────────────┬───────────────┘
└──────────────────┬───────────────────┘                        │
                   │                                            │
                   ▼                                            ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                           Visualization & Presentation                        │
│  - Proportional SVG/CSS Gantt Chart (Process Blocks, Time Labels, Idle Slots) │
│  - Detailed Process Metrics Table (AT, BT, P, CT, TAT, WT, RT, Tabular Nums)  │
│  - Side-by-Side Algorithm Comparison Matrix & Performance Benchmarks          │
│  - CSV Export & Printable Lab Record Generator                                │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Specifications

```typescript
export interface ProcessInput {
  id: string;          // e.g. "P1", "P2"
  arrivalTime: number; // AT >= 0
  burstTime: number;   // BT >= 1
  priority: number;    // Lower integer = Higher priority (>= 1)
  color?: string;      // Consistent distinct hue for Gantt visualization
}

export interface GanttSegment {
  processId: string;   // Process ID or "IDLE"
  startTime: number;
  endTime: number;
  duration: number;
  isIdle: boolean;
}

export interface ProcessMetric {
  id: string;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  completionTime: number;  // CT
  turnaroundTime: number;  // TAT = CT - AT
  waitingTime: number;     // WT = TAT - BT
  responseTime: number;    // RT = FirstStartTime - AT
}

export interface SimulationResult {
  algorithm: 'FCFS' | 'SJF' | 'Priority' | 'Round Robin';
  timeQuantum?: number;
  timeline: GanttSegment[];
  metrics: ProcessMetric[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  avgResponseTime: number;
  totalTime: number;
  cpuUtilization: number;
  throughput: number;
  scheduleOrderExplanation: string[];
}
```

### Plan Verification & Deliverables
1. **Application Preview**: Full operational simulator running in the dev environment.
2. **Algorithm Accuracy**: Tested against standard textbook test vectors for all 4 algorithms including corner cases (simultaneous arrivals, gap/idle arrivals, Round Robin with remaining bursts smaller than quantum).
3. **Responsive UI**: Tested across viewport sizes with clean navigation.
4. **README.md**: Complete documentation explaining architecture, formulas, viva questions, running locally, and step-by-step GitHub Pages deployment.
