import React from "react";
import { skills } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="section-title mb-12">Technical Stack</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Languages */}
          <div className="card-glass p-6 rounded-2xl">
            <h3 className="text-brand-400 mb-4 font-semibold">Languages</h3>

            {skills.languages.map((s, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className="bg-green-400 h-2 rounded"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Coursework */}
          <div className="card-glass p-6 rounded-2xl">
            <h3 className="text-brand-400 mb-4 font-semibold">Coursework</h3>

            {skills.coursework.map((s, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded">
                  <div
                    className="bg-green-400 h-2 rounded"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="card-glass p-6 rounded-2xl">
            <h3 className="text-brand-400 mb-4 font-semibold">Tools</h3>

            <div className="flex flex-wrap gap-2">
              {skills.tools.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </div>

        </div>

        {/* Certifications */}
        <div className="mt-12">
          <h3 className="text-white text-lg mb-4 font-semibold">
            Certifications
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {skills.certs.map((c, i) => (
              <div key={i} className="card-glass p-4 rounded-xl">
                <p className="text-white font-semibold">{c.name}</p>
                <p className="text-gray-400 text-sm">
                  {c.issuer} · {c.year}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}