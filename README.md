# OS Lab — CPU Scheduling Simulator

> **A B.Tech Computer Science & Engineering (2nd Year / 4th Semester) Operating Systems Mini-Project**  
> An educational web application to simulate, visualize, benchmark, and master uniprocessor CPU scheduling algorithms with proportional Gantt charts, metrics calculation, and viva voce revision materials.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Implemented Algorithms & Rules](#-implemented-algorithms--rules)
4. [Mathematical Formulas](#-mathematical-formulas)
5. [Project Architecture & File Structure](#-project-architecture--file-structure)
6. [How to Run and Test Locally](#-how-to-run-and-test-locally)
7. [How to Deploy to GitHub Pages](#-how-to-deploy-to-github-pages)
8. [Curated Test Scenarios & Edge Cases](#-curated-test-scenarios--edge-cases)
9. [Viva Voce Questions & Cheat Sheet](#-viva-voce-questions--cheat-sheet)
10. [Academic Submission Details](#-academic-submission-details)

---

## 🎯 Project Overview
Operating systems rely on CPU scheduling to allocate processing resources efficiently among competing tasks in the ready queue. This simulator models a standard **Single-CPU (Uniprocessor)** environment as described in foundational operating systems literature (*Operating System Concepts* by Silberschatz, Galvin & Gagne).

### Objectives:
- **Interactive Simulation**: Provide real-time scheduling results without requiring a backend server or database.
- **Visual Intuition**: Display true proportional Gantt charts showing start times, end times, and distinct CPU idle intervals.
- **Empirical Comparison**: Contrast how FCFS, SJF, Priority, and Round Robin perform on identical process sets.
- **Viva Preparation**: Offer step-by-step execution traces, formulas, and an interactive quiz for college lab exams.

---

## ✨ Key Features
- **4 Core CPU Scheduling Algorithms**:
  - **FCFS** (First Come First Served)
  - **SJF** (Shortest Job First — Non-Preemptive)
  - **Priority Scheduling** (Non-Preemptive, Lower integer = Higher priority)
  - **Round Robin** (Preemptive with configurable Time Quantum $Q$)
- **Dynamic Process Queue Management**:
  - Add custom processes with Arrival Time ($AT \ge 0$), Burst Time ($BT > 0$), and Priority ($P \ge 1$).
  - Inline edit and delete processes with live recalculation.
  - Strict input validation with user-friendly error banners.
- **Proportional Gantt Chart**:
  - Color-coded process blocks proportionally scaled to their execution duration.
  - Distinct hatched/patterned visual representation for CPU Idle intervals.
  - Complete time-axis marker ruler from $t=0$ to $t_{total}$.
  - Step-by-Step Playback Controller: Play/Pause, Step +1, Jump to End, and speed adjustment (0.5x, 1x, 2x) with a live playback needle.
- **Complete Process Metrics Table**:
  - Calculates Completion Time ($CT$), Turnaround Time ($TAT$), Waiting Time ($WT$), and Response Time ($RT$) for every process.
  - Summary KPI cards: Average $WT$, Average $TAT$, Average $RT$, CPU Utilization (%), and Throughput.
  - Export metrics to CSV for lab reports.
  - Printable Lab Record sheet formatting (`Ctrl+P` / Print Report button).
- **Multi-Algorithm Comparison Matrix**:
  - Runs all 4 algorithms concurrently on identical workloads.
  - Relative bar visualizers for Average Waiting Time and Turnaround Time.
  - Highlights best-performing algorithms and explains why no single algorithm is universally best.
- **Educational Modules & Viva Voce Quiz**:
  - Standard formulas and worked numerical examples.
  - 5-question interactive quiz with immediate scoring and detailed conceptual explanations.

---

## 🧠 Implemented Algorithms & Rules

### 1. First Come First Served (FCFS)
- **Type**: Non-preemptive.
- **Selection Criterion**: Process with the earliest Arrival Time ($AT$).
- **Tie-Breaker**: Process ID / order in process queue.
- **Behavior**: If CPU finishes execution before any new process arrives, CPU sits in an `[IDLE]` state.

### 2. Shortest Job First (SJF)
- **Type**: Non-preemptive.
- **Selection Criterion**: At any CPU scheduling point $t$, inspects all arrived processes ($AT \le t$) and chooses the one with the smallest Burst Time ($BT$).
- **Tie-Breaker**: Earliest arrival time, then Process ID.
- **Properties**: Mathematically optimal for minimizing average waiting time.

### 3. Priority Scheduling
- **Type**: Non-preemptive.
- **Convention**: **Lower integer value represents HIGHER priority** (e.g. Priority 1 is higher priority than Priority 2).
- **Selection Criterion**: Selects arrived process with the minimum priority value.
- **Tie-Breaker**: Earliest arrival time, then Process ID.
- **Mitigation for Starvation**: Solved conceptually via *Aging*.

### 4. Round Robin (RR)
- **Type**: Preemptive.
- **Time Quantum ($Q$)**: Configurable positive integer.
- **Selection Criterion**: FIFO circular queue. Each process executes for at most $Q$ units.
- **Arrival Ordering**: If a new process arrives while another process is completing its time slice, the newly arrived process enters the ready queue *before* the preempted process is re-enqueued.

---

## 📐 Mathematical Formulas

$$\text{Turnaround Time (TAT)} = \text{Completion Time (CT)} - \text{Arrival Time (AT)}$$

$$\text{Waiting Time (WT)} = \text{Turnaround Time (TAT)} - \text{Burst Time (BT)}$$

$$\text{Response Time (RT)} = \text{First CPU Start Time} - \text{Arrival Time (AT)}$$

$$\text{Average Waiting Time} = \frac{\sum_{i=1}^{N} \text{WT}_i}{N}$$

$$\text{Average Turnaround Time} = \frac{\sum_{i=1}^{N} \text{TAT}_i}{N}$$

$$\text{CPU Utilization (\%)} = \left(\frac{\text{Total Time} - \text{Idle Time}}{\text{Total Time}}\right) \times 100\%$$

$$\text{Throughput} = \frac{N}{\text{Total Time}} \quad (\text{processes per unit time})$$

---

## 📁 Project Architecture & File Structure

```
os-lab-cpu-scheduling-simulator/
├── index.html                   # HTML entry point with fonts and viewport configuration
├── metadata.json                # Project identity and metadata
├── package.json                 # Project dependencies and build scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
├── src/
│   ├── main.tsx                 # React DOM mount entry point
│   ├── App.tsx                  # Root application combining navigation and simulator views
│   ├── index.css                # Global CSS with Tailwind and print styles
│   ├── types/
│   │   └── scheduling.ts        # TypeScript interfaces for processes, Gantt, and results
│   ├── utils/
│   │   └── schedulingAlgorithms.ts # Core FCFS, SJF, Priority, and Round Robin logic
│   ├── data/
│   │   ├── presets.ts           # 4 curated textbook workloads for quick demonstrations
│   │   └── quizData.ts          # 5 viva voce quiz questions with explanations
│   └── components/
│       ├── Navbar.tsx           # Responsive header with branding and action buttons
│       ├── OverviewSection.tsx  # Hero banner, objectives, and test case links
│       ├── ProcessTable.tsx     # Process input table with add/edit/delete and validation
│       ├── GanttChart.tsx       # Proportional timeline visualizer and playback controller
│       ├── MetricsTable.tsx     # Process metrics, summary KPIs, trace log, and CSV export
│       ├── AlgorithmComparison.tsx # Simultaneous 4-algorithm benchmark and bar visualizer
│       ├── LearnOSSection.tsx   # Theory, worked numericals, and interactive viva quiz
│       └── AboutSection.tsx     # Student placeholders, evaluation rubric, and viva cheat sheet
└── README.md                    # Comprehensive documentation and viva preparation guide
```

---

## 🚀 How to Run and Test Locally

As a student or beginner, you can run this project on your computer with Node.js in 3 simple steps:

### Prerequisites:
- Install [Node.js](https://nodejs.org/) (Version 18 or above recommended).

### Steps:
1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/your-username/os-lab-cpu-scheduling-simulator.git
   cd os-lab-cpu-scheduling-simulator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the URL displayed in your terminal).

4. **Build for Production**:
   ```bash
   npm run build
   ```
   This generates an optimized static bundle in the `dist/` folder ready for hosting anywhere.

---

## 🌐 How to Deploy to GitHub Pages

Because this project is a purely client-side static application with **zero backend dependencies**, it can be hosted permanently for free on GitHub Pages:

### Method: Automated GitHub Actions (Recommended)
1. Push your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of OS Lab CPU Scheduling Simulator"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. GitHub provides a standard "Static HTML" or "Vite" workflow that builds with `npm run build` and deploys the `dist` folder automatically upon every push!
5. Your live website URL will be: `https://<your-github-username>.github.io/<repo-name>/`.

---

## 🧪 Curated Test Scenarios & Edge Cases

The simulator comes pre-loaded with 4 academic test cases to demonstrate key OS phenomena during your lab evaluation:

| Scenario Name | Key Characteristics | Viva Demonstration Purpose |
| :--- | :--- | :--- |
| **Standard Textbook Case** | Mixed burst times (3 to 8) and staggered arrivals ($0, 1, 2, 3$). | Baseline test demonstrating how SJF minimizes average waiting time compared to FCFS. |
| **FCFS Convoy Effect** | $P_1$ arrives first with huge burst ($BT=20$), followed by short processes ($BT=2, 3, 1$). | Demonstrates why FCFS produces terrible waiting times and how Round Robin or SJF eliminates the convoy bottleneck. |
| **CPU Idle Gap Test** | Processes finish at $t=6$, but subsequent processes do not arrive until $t=11$. | Verifies that the scheduler properly identifies idle CPU periods and does not incorrectly compress time. |
| **Priority & Tie-Breaker** | Processes share identical priorities ($P=1$) or identical burst times. | Verifies deterministic tie-breaking based on arrival time and process ID. |

---

## 🎓 Viva Voce Questions & Cheat Sheet

Here are questions frequently asked by external examiners in B.Tech OS practical examinations:

1. **Q: What is the Convoy Effect and which algorithm suffers from it?**  
   *Answer*: The Convoy Effect occurs in FCFS when a long CPU-bound process executes first; all subsequent short or I/O-bound processes are delayed behind it, causing high average waiting times and low CPU utilization.

2. **Q: Why can SJF not be perfectly implemented in general-purpose desktop operating systems?**  
   *Answer*: SJF requires exact prior knowledge of the duration of the next CPU burst, which is impossible to know in advance for interactive processes. Schedulers instead estimate burst times using exponential smoothing: $\tau_{n+1} = \alpha t_n + (1 - \alpha)\tau_n$.

3. **Q: What is the effect of Time Quantum size in Round Robin?**  
   *Answer*: If $Q$ is very large (larger than the maximum burst), Round Robin degenerates into FCFS. If $Q$ is extremely small, excessive context-switch overhead degrades system throughput. The rule of thumb is that 80% of CPU bursts should be shorter than $Q$.

4. **Q: What is Starvation and how is it resolved in Priority Scheduling?**  
   *Answer*: Starvation (indefinite blocking) occurs when low-priority processes wait indefinitely because high-priority processes continually enter the ready queue. It is resolved using **Aging**, where the operating system gradually increases the priority of waiting processes over time.

---

## 📝 Academic Submission Details

| Field | Value / Placeholder |
| :--- | :--- |
| **Project Title** | OS Lab — CPU Scheduling Simulator |
| **Target Course** | Operating Systems Laboratory (CS301 / PCC-CS402) |
| **Target Semester** | 4th Semester (2nd Year B.Tech CSE) |
| **Student Name** | `[Student Name]` |
| **University Roll Number** | `[University Roll Number / Registration No.]` |
| **Department / College** | `[Department of Computer Science & Engineering, College Name]` |
| **Academic Year** | `[202X - 202X]` |
