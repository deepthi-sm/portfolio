import React, { useEffect, useState } from 'react';
import { personal } from '../data';

const ROLES = [
  'Data Analyst',
  'Full-Stack Developer',
  'Problem Solver',
  'Data Science Student',
];

function TypingText({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 40 : 80;

    const t = setTimeout(() => {
      setText(prev =>
        del ? prev.slice(0, -1) : word.slice(0, prev.length + 1)
      );

      if (!del && text === word) {
        setDel(true);
      } else if (del && text === '') {
        setDel(false);
        setIdx(i => i + 1);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, del, idx, words]);

  return (
    <span className="text-gradient">
      {text}
      <span className="animate-pulse text-brand-400">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12">

      <div className="max-w-6xl mx-auto px-6 w-full">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <p className="text-gray-500 font-mono text-sm">Hello, I'm</p>

            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white">
              {personal.name}
            </h1>

            <div className="text-xl text-gray-400 h-8">
              <TypingText words={ROLES} />
            </div>

            <p className="text-gray-400 max-w-lg">
              {personal.tagline}
            </p>

            <div className="flex gap-4">
              <a href="#projects" className="btn-primary">Projects</a>
              <a href="#contact" className="btn-outline">Contact</a>
            </div>

          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <div className="flex justify-center">
            <img
              src="/profile.jpg"
              alt="profile"
              className="w-64 h-64 object-cover rounded-2xl border border-surface-border shadow-lg"
            />
          </div>

        </div>

        {/* SCROLL */}
        <div className="flex justify-center mt-16">
          <span className="text-gray-500 text-sm">scroll ↓</span>
        </div>

      </div>
    </section>
  );
}