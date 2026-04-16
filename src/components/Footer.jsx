import React from 'react';
import { personal } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-border py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-brand-500/20 border border-brand-500/40 flex items-center justify-center font-display text-brand-400 text-xs font-bold">
            {personal.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <span className="text-gray-600 font-mono text-xs">
            © {year} {personal.name} — Hosted on AWS EC2
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
          <span className="glow-dot w-1.5 h-1.5" />
          Deployed with Elastic Load Balancer · 2 AZs
        </div>
      </div>
    </footer>
  );
}
