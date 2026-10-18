/**
 * OS Lab — CPU Scheduling Simulator
 * Learn OS Section: Formulas, Worked Numerical, Algorithm Theory, Glossary, and 5-Question Viva Quiz.
 */

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { BookOpen, HelpCircle, CheckCircle, XCircle, RotateCcw, Award, Lightbulb, Calculator } from 'lucide-react';

export const LearnOSSection: React.FC = () => {
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          <span>Operating Systems Scheduling Theory & Viva Preparation</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Core concepts, mathematical derivations, worked numerical examples, and viva questions aligned with 2nd year B.Tech Computer Science Operating Systems syllabus.
        </p>
      </div>

      {/* Standard Formulas Card */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <span>Standard University Scheduling Formulas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold block text-sm">Turnaround Time (TAT)</span>
            <div className="text-white text-sm bg-slate-950 p-2.5 rounded border border-slate-800">
              TAT = Completion Time (CT) − Arrival Time (AT)
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Measures total elapsed time between process arrival in ready queue and its final completion.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-blue-400 font-bold block text-sm">Waiting Time (WT)</span>
            <div className="text-white text-sm bg-slate-950 p-2.5 rounded border border-slate-800">
              WT = Turnaround Time (TAT) − Burst Time (BT)
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Measures total time spent by the process passively waiting in ready queue without CPU execution.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-indigo-400 font-bold block text-sm">Response Time (RT)</span>
            <div className="text-white text-sm bg-slate-950 p-2.5 rounded border border-slate-800">
              RT = First CPU Allocation Time − Arrival Time (AT)
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Measures time between arrival and the exact moment the process first gains CPU access (crucial for interactive systems).
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold block text-sm">CPU Utilization & Throughput</span>
            <div className="text-white text-sm bg-slate-950 p-2.5 rounded border border-slate-800">
              Utilization = ((Total Time − Idle Time) / Total Time) × 100%
            </div>
            <p className="text-slate-400 font-sans text-xs">
              Throughput is the number of processes completed per unit time: N / Total Elapsed Time.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Worked Numerical Example */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Worked Numerical Example (Viva Walkthrough)</span>
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm">
          <strong>Problem Statement:</strong> Consider 4 processes with Arrival Times and Burst Times under <strong>FCFS</strong>:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
            <thead>
              <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 font-medium">
                <th className="py-2.5 px-4 font-semibold">PID</th>
                <th className="py-2.5 px-4 font-semibold">AT</th>
                <th className="py-2.5 px-4 font-semibold">BT</th>
                <th className="py-2.5 px-4 font-semibold text-cyan-400">CT</th>
                <th className="py-2.5 px-4 font-semibold text-blue-400">TAT = CT − AT</th>
                <th className="py-2.5 px-4 font-semibold text-indigo-400">WT = TAT − BT</th>
                <th className="py-2.5 px-4 font-semibold text-teal-400">RT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 tabular-nums">
              <tr>
                <td className="py-2.5 px-4 text-white font-bold">P1</td>
                <td className="py-2.5 px-4">0</td>
                <td className="py-2.5 px-4">4</td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">4</td>
                <td className="py-2.5 px-4 text-blue-300">4 − 0 = 4</td>
                <td className="py-2.5 px-4 text-indigo-300">4 − 4 = 0</td>
                <td className="py-2.5 px-4 text-teal-300">0 − 0 = 0</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-white font-bold">P2</td>
                <td className="py-2.5 px-4">1</td>
                <td className="py-2.5 px-4">3</td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">7</td>
                <td className="py-2.5 px-4 text-blue-300">7 − 1 = 6</td>
                <td className="py-2.5 px-4 text-indigo-300">6 − 3 = 3</td>
                <td className="py-2.5 px-4 text-teal-300">4 − 1 = 3</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-white font-bold">P3</td>
                <td className="py-2.5 px-4">2</td>
                <td className="py-2.5 px-4">1</td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">8</td>
                <td className="py-2.5 px-4 text-blue-300">8 − 2 = 6</td>
                <td className="py-2.5 px-4 text-indigo-300">6 − 1 = 5</td>
                <td className="py-2.5 px-4 text-teal-300">7 − 2 = 5</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-white font-bold">P4</td>
                <td className="py-2.5 px-4">3</td>
                <td className="py-2.5 px-4">2</td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">10</td>
                <td className="py-2.5 px-4 text-blue-300">10 − 3 = 7</td>
                <td className="py-2.5 px-4 text-indigo-300">7 − 2 = 5</td>
                <td className="py-2.5 px-4 text-teal-300">8 − 3 = 5</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-900/90 font-bold text-white border-t border-slate-700">
                <td colSpan={4} className="py-2.5 px-4 font-sans text-slate-400">Averages:</td>
                <td className="py-2.5 px-4 text-blue-400">Avg TAT = 23 / 4 = 5.75</td>
                <td className="py-2.5 px-4 text-indigo-400">Avg WT = 13 / 4 = 3.25</td>
                <td className="py-2.5 px-4 text-teal-400">Avg RT = 13 / 4 = 3.25</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 4 Core Algorithms Comparison Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-2">
          <h4 className="font-bold text-cyan-400 text-sm">1. First Come First Served (FCFS)</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Non-preemptive algorithm that allocates the CPU in order of arrival. Simple to implement with a FIFO queue.
            <strong> Major flaw:</strong> Convoy Effect—long processes execute first, causing short processes to wait and inflating average waiting time.
          </p>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-2">
          <h4 className="font-bold text-blue-400 text-sm">2. Shortest Job First (SJF)</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Non-preemptive algorithm selecting the process with the smallest CPU burst time.
            <strong> Key advantage:</strong> Mathematically provable minimum average waiting time.
            <strong> Limitation:</strong> Cannot be perfectly implemented in real general-purpose OS because future CPU burst lengths cannot be known in advance.
          </p>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-2">
          <h4 className="font-bold text-indigo-400 text-sm">3. Priority Scheduling (Non-Preemptive)</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Allocates CPU to the process with highest priority (conventionally lower integer = higher priority).
            <strong> Major risk:</strong> Indefinite blocking or Starvation for low-priority processes.
            <strong> Textbook Solution:</strong> Aging (gradually incrementing priority as process waits).
          </p>
        </div>

        <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-5 space-y-2">
          <h4 className="font-bold text-teal-400 text-sm">4. Round Robin (RR)</h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            Preemptive algorithm where each process receives a small fixed CPU slice (Time Quantum Q).
            <strong> Trade-off:</strong> If Q is too large, it degenerates into FCFS; if Q is too small, excessive context switching degrades CPU efficiency.
          </p>
        </div>
      </div>

      {/* Interactive 5-Question Viva Quiz */}
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Interactive Viva Voce Knowledge Check (5 Questions)</span>
            </h3>
            <span className="text-xs text-slate-400">
              Test your understanding of Operating Systems scheduling concepts before your lab exam.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {showResults && (
              <div className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold text-sm">
                Score: {score} / {QUIZ_QUESTIONS.length}
              </div>
            )}
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Quiz</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;

            return (
              <div
                key={q.id}
                className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 space-y-3"
              >
                <div className="font-semibold text-white text-sm flex items-start gap-2.5">
                  <span className="text-cyan-400 font-mono font-bold shrink-0">Q{qIndex + 1}.</span>
                  <span>{q.question}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (showResults) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/70 border-emerald-600 text-emerald-200 font-medium';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-950/70 border-red-600 text-red-200';
                      } else {
                        btnStyle = 'opacity-50 border-slate-800 text-slate-400';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/80 border-cyan-600 text-cyan-200 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono text-slate-400 font-semibold shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      {userAnswer === q.correctIndex ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Button */}
        {!showResults && (
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setShowResults(true)}
              disabled={answeredCount === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:pointer-events-none text-slate-950 shadow-md shadow-cyan-400/20 transition-all cursor-pointer"
            >
              <span>Submit & Review Viva Answers ({answeredCount}/{QUIZ_QUESTIONS.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
