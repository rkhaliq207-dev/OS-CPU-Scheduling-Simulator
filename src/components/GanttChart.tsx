/**
 * OS Lab — CPU Scheduling Simulator
 * Proportional Gantt Chart Visualizer with Idle CPU Distinction and Step-by-Step Playback Controls.
 */

import React, { useState, useEffect } from 'react';
import { GanttSegment } from '../types/scheduling';
import { Play, Pause, SkipForward, RotateCcw, Clock, Activity } from 'lucide-react';

interface GanttChartProps {
  timeline: GanttSegment[];
  totalTime: number;
  algorithmName: string;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  timeline,
  totalTime,
  algorithmName,
}) => {
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(totalTime);
  const [speed, setSpeed] = useState<number>(1); // 1 = 1 second per time unit

  // Reset to full view whenever timeline changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(totalTime);
  }, [timeline, totalTime]);

  // Playback timer effect
  useEffect(() => {
    if (!isPlaying) return;

    if (currentTime >= totalTime) {
      setIsPlaying(false);
      return;
    }

    const intervalMs = 1000 / speed;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1;
        if (next >= totalTime) {
          setIsPlaying(false);
          return totalTime;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentTime, totalTime, speed]);

  if (!timeline || timeline.length === 0 || totalTime === 0) {
    return (
      <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-8 text-center text-slate-500 text-sm">
        No schedule data to display. Please add processes to generate the Gantt chart.
      </div>
    );
  }

  // Active segment at currentTime
  const currentSegment = timeline.find(
    (seg) => currentTime >= seg.startTime && (currentTime < seg.endTime || (currentTime === totalTime && currentTime === seg.endTime))
  ) || timeline[timeline.length - 1];

  const handlePlayToggle = () => {
    if (currentTime >= totalTime) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setCurrentTime((prev) => Math.min(totalTime, prev + 1));
  };

  const handleResetPlayback = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleJumpToEnd = () => {
    setIsPlaying(false);
    setCurrentTime(totalTime);
  };

  return (
    <div className="rounded-xl bg-[#0c1427] border border-slate-800 p-4 sm:p-6 space-y-6 shadow-xl">
      {/* Header with Title and Playback Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Proportional Gantt Chart Timeline</span>
          </h3>
          <span className="text-xs text-slate-400">
            {algorithmName} · Total Execution Span: <strong className="text-cyan-400 font-mono">{totalTime}</strong> units
          </span>
        </div>

        {/* Live Playback Indicator */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-400">Time:</span>
            <span className="font-mono font-bold text-white tabular-nums">t = {currentTime}</span>
            <span className="text-slate-500">/</span>
            <span className="font-mono text-slate-400 tabular-nums">{totalTime}</span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center gap-1.5">
            <span className="text-slate-400">CPU State:</span>
            {currentSegment?.isIdle ? (
              <span className="text-amber-400 font-semibold font-mono">IDLE</span>
            ) : (
              <span className="text-emerald-400 font-semibold font-mono">
                Executing {currentSegment?.processId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Proportional Gantt Visualization Bar */}
      <div className="space-y-2">
        <div className="relative overflow-x-auto pb-6 pt-2">
          {/* Timeline Bar Container */}
          <div className="min-w-[600px] flex h-14 sm:h-16 rounded-xl overflow-hidden border border-slate-700/80 shadow-inner bg-slate-950">
            {timeline.map((seg, idx) => {
              // Percentage width based on totalTime
              const widthPct = (seg.duration / totalTime) * 100;
              const isPassed = currentTime >= seg.endTime;
              const isCurrent = currentTime >= seg.startTime && currentTime < seg.endTime;

              return (
                <div
                  key={`${seg.processId}-${seg.startTime}-${idx}`}
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: seg.isIdle ? '#1e293b' : seg.color,
                  }}
                  className={`relative flex flex-col items-center justify-center transition-all duration-150 select-none border-r border-slate-900/60 last:border-r-0 ${
                    seg.isIdle
                      ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px]'
                      : ''
                  } ${
                    isCurrent
                      ? 'ring-2 ring-white ring-inset shadow-lg z-10 brightness-110'
                      : isPassed
                      ? 'opacity-100'
                      : 'opacity-40 grayscale-[30%]'
                  }`}
                  title={`${seg.isIdle ? 'CPU IDLE' : seg.processId}: [${seg.startTime} → ${seg.endTime}] (${seg.duration} units)`}
                >
                  <span
                    className={`font-mono font-bold text-xs sm:text-sm tracking-wide ${
                      seg.isIdle ? 'text-slate-400 italic' : 'text-white drop-shadow-md'
                    }`}
                  >
                    {seg.isIdle ? '[IDLE]' : seg.processId}
                  </span>
                  <span className="text-[10px] text-white/80 font-mono hidden sm:inline tabular-nums">
                    {seg.duration}u
                  </span>
                </div>
              );
            })}
          </div>

          {/* Time Marker Tick Scale along the bottom */}
          <div className="min-w-[600px] relative flex h-6 mt-1 text-slate-400 font-mono text-[11px] tabular-nums select-none">
            {timeline.map((seg, idx) => {
              const leftPct = (seg.startTime / totalTime) * 100;
              return (
                <div
                  key={`marker-start-${idx}`}
                  style={{ left: `${leftPct}%` }}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-[1px] h-2 bg-slate-700" />
                  <span>{seg.startTime}</span>
                </div>
              );
            })}

            {/* Final right edge marker */}
            <div
              style={{ left: '100%' }}
              className="absolute -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-[1px] h-2 bg-slate-700" />
              <span>{totalTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Legend & Color Code */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-slate-800/80">
        <span className="text-slate-400 font-medium">Timeline Legend:</span>
        {Array.from(new Set(timeline.filter((s) => !s.isIdle).map((s) => s.processId))).map((pid) => {
          const seg = timeline.find((s) => s.processId === pid);
          return (
            <div key={pid} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg?.color }} />
              <span className="font-mono text-white font-semibold">{pid}</span>
            </div>
          );
        })}

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 border border-slate-500 border-dashed" />
          <span className="font-mono text-slate-300 italic">CPU Idle Period</span>
        </div>
      </div>

      {/* Step-by-Step Playback Controller Deck */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetPlayback}
            title="Reset to Time 0"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayToggle}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{currentTime >= totalTime ? 'Replay' : 'Play Simulation'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentTime >= totalTime}
            title="Step Forward by 1 Time Unit"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step +1</span>
          </button>

          <button
            onClick={handleJumpToEnd}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Jump to End
          </button>
        </div>

        {/* Speed Selector & Time Slider */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Speed:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  speed === s
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={totalTime}
              value={currentTime}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentTime(Number(e.target.value));
              }}
              className="w-32 accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
