import React, { useState } from 'react';
import { projects } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';

function ProjectCard({ project, index, onClick }) {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => onClick(project)}   // 🔥 CLICK ENABLED
      className={`card-glass rounded-2xl p-6 transition-all duration-700 group cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${project.featured ? 'border border-brand-500/20' : 'border border-surface-border'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="tag text-xs">⭐ Featured</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display font-bold text-white text-lg leading-snug group-hover:text-brand-300 transition-colors">
          {project.title || project.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 font-body">
        {project.short || project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(project.tags || []).map(tag => (
          <span key={tag} className="tag text-xs">{tag}</span>
        ))}
      </div>

      {/* Hover line */}
      <div className={`mt-5 h-0.5 rounded-full transition-all duration-500 ${
        hovered ? 'bg-gradient-to-r from-brand-500 to-emerald-400 w-full' : 'bg-surface-border w-0'
      }`} />
    </div>
  );
}

export default function Projects() {
  const [ref, visible] = useScrollReveal();
  const [selected, setSelected] = useState(null); // 🔥 POPUP STATE

  return (
    <section id="projects" className="py-24 relative">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-1/2 h-96 bg-brand-500/3 blur-3xl rounded-full -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

    <div
  ref={ref}
  className={`mb-14 transition-all duration-700 ${
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
  <p className="section-subtitle">02 — Projects</p>

  <h2 className="section-title">What I've Built</h2>

  <p className="text-gray-400 text-sm mt-2">
    Click a project to learn more!
  </p>
</div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              index={i}
              onClick={setSelected}   // 🔥 PASS CLICK HANDLER
            />
          ))}
        </div>

        {/* 🔥 POPUP */}
        {selected && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-surface-card p-8 rounded-2xl max-w-lg w-full">

              <h3 className="text-xl font-bold mb-4 text-white">
                {selected.title || selected.name}
              </h3>

              <p className="text-gray-300 mb-4 whitespace-pre-line">
                {selected.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {(selected.tags || []).map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>

              <button
                onClick={() => setSelected(null)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}