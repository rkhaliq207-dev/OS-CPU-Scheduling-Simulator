/**
 * OS Lab — CPU Scheduling Simulator
 * Responsive top navigation adhering to universal design constitution (Zone 1 Brand, Zone 2 Links, Zone 3 Actions).
 */

import React, { useState } from 'react';
import { Cpu, RotateCcw, Printer, Menu, X, BarChart2, BookOpen, Layers, Info } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onResetDemo: () => void;
  onPrintReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onResetDemo,
  onPrintReport,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Cpu },
    { id: 'simulator', label: 'CPU Scheduling', icon: Layers },
    { id: 'comparison', label: 'Algorithm Comparison', icon: BarChart2 },
    { id: 'learn', label: 'Learn OS', icon: BookOpen },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 transition-colors no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <button
            onClick={() => handleNavClick('overview')}
            className="text-left font-bold text-base sm:text-lg tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            OS Lab <span className="text-cyan-400 font-normal">CPU Simulator</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line, unboxed, hover underline style) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs xl:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrintReport}
            title="Print or Save Lab Report (PDF)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onResetDemo}
            title="Reset Simulator to default textbook demo"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-900 bg-cyan-400 hover:bg-cyan-300 shadow-sm shadow-cyan-400/20 transition-all whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-1 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 mt-1 border-t border-slate-800/60 flex gap-2">
            <button
              onClick={() => {
                onPrintReport();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-300 bg-slate-800 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
