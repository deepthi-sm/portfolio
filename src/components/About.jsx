import React from 'react';
import { personal, education, stats } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';

function StatCard({ value, suffix, label, delay }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`card-glass rounded-xl p-5 border-animated transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display font-extrabold text-3xl text-gradient mb-1">
        {value}{suffix}
      </div>
      <div className="text-gray-500 text-sm font-body">{label}</div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div ref={ref} className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle">01 — About</p>
          <h2 className="section-title">Who I Am</h2>
          <div className="w-12 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + education */}
          <div className="space-y-8">
            <p className="text-gray-300 text-base leading-relaxed font-body">{personal.bio}</p>

            {/* Education timeline */}
            <div>
              <h3 className="font-display font-semibold text-white mb-5 text-lg">Education</h3>
              <div className="relative pl-5 space-y-6">
                <div className="timeline-line" />
                {education.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-5 top-1.5 w-2 h-2 rounded-full bg-brand-500 border-2 border-surface-dark" />
                    <div className="card-glass rounded-xl p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-display font-semibold text-white text-sm">{edu.degree}</h4>
                        <span className="tag">{edu.year}</span>
                      </div>
                      <p className="text-brand-400 text-xs font-mono mb-1">{edu.institution}</p>
                      <p className="text-gray-500 text-xs">{edu.grade}</p>
                      {edu.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {edu.highlights.map(h => (
                            <span key={h} className="tag text-xs">{h}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stats + info */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 100} />
              ))}
            </div>

            {/* Contact info card */}
            <div className="card-glass rounded-xl p-5 space-y-3">
              <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Info</h3>
              {[
                { icon: '📍', label: 'Location', value: personal.location },
                { icon: '📧', label: 'Email',    value: personal.email },
                { icon: '📱', label: 'Phone',    value: personal.phone },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-sm">
                  <span>{item.icon}</span>
                  <span className="text-gray-500 w-16 font-mono text-xs">{item.label}</span>
                  <span className="text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
