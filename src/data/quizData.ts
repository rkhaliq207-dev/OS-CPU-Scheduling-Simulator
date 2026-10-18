/**
 * OS Lab — CPU Scheduling Simulator
 * High-yield viva voce quiz questions with instant feedback and pedagogical explanations.
 */

import { QuizQuestion } from '../types/scheduling';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How is Turnaround Time (TAT) mathematically defined in Operating Systems?',
    options: [
      'TAT = Completion Time − Arrival Time',
      'TAT = Burst Time + Waiting Time + Context Switch Time',
      'TAT = Arrival Time − Waiting Time',
      'TAT = Completion Time − Burst Time',
    ],
    correctIndex: 0,
    explanation: 'Turnaround Time (TAT) is the total elapsed time interval between submission (Arrival Time, AT) and final completion (Completion Time, CT): TAT = CT − AT.',
  },
  {
    id: 2,
    question: 'What is the "Convoy Effect" observed primarily in First-Come, First-Served (FCFS) scheduling?',
    options: [
      'Multiple processes requesting disk I/O at the exact same clock tick',
      'Short CPU-bound processes blocking one long process indefinitely',
      'Short processes being delayed behind one long CPU-bound process, causing high average waiting time',
      'A deadlock state where circular wait occurs between process threads',
    ],
    correctIndex: 2,
    explanation: 'The Convoy Effect occurs when a heavy CPU-burst process arrives first; all subsequent short or I/O-bound processes must wait behind it, resulting in severe degradation of average waiting time and CPU/device utilization.',
  },
  {
    id: 3,
    question: 'In Round Robin scheduling, what happens if the Time Quantum (Q) is set extremely large (approaching infinity)?',
    options: [
      'The scheduler degenerates into Shortest Job First (SJF)',
      'The scheduler degenerates into First Come First Served (FCFS)',
      'The CPU enters an infinite thrashing state due to context switching',
      'Starvation occurs for all incoming processes with low priority',
    ],
    correctIndex: 1,
    explanation: 'If the Time Quantum Q is greater than or equal to the longest process burst time, every process will finish its entire burst in its very first allocated slice without preemption. Thus, Round Robin becomes identical to FCFS.',
  },
  {
    id: 4,
    question: 'Which scheduling algorithm is mathematically proven to guarantee the minimum average waiting time for a given set of stationary processes?',
    options: [
      'Round Robin (RR)',
      'First Come First Served (FCFS)',
      'Shortest Job First (SJF)',
      'Highest Priority First',
    ],
    correctIndex: 2,
    explanation: 'Shortest Job First (SJF) is mathematically optimal because moving a short process before a long process decreases the waiting time of the short process by much more than it increases the waiting time of the long process.',
  },
  {
    id: 5,
    question: 'How can the problem of "Indefinite Starvation" in Priority Scheduling be resolved by an operating system?',
    options: [
      'By switching the CPU architecture to Harvard memory bus model',
      'By implementing "Aging", gradually increasing the priority of processes as they wait in the ready queue',
      'By decreasing the time slice quantum dynamically every 10 milliseconds',
      'By terminating the process with the largest burst time',
    ],
    correctIndex: 1,
    explanation: '"Aging" is a technique of gradually increasing the priority of processes that wait in the system for a long time. Eventually, even the lowest-priority process will become the highest-priority process and gain CPU execution.',
  },
];
