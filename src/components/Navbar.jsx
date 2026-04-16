import React, { useState, useEffect } from 'react';
import { personal } from '../data';

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('#home');
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const sections = links.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const initials = personal.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-surface-dark/90 backdrop-blur-xl border-b border-surface-border shadow-xl shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors font-display font-bold text-brand-400 text-sm">
            {initials}
          </div>
          <span className="font-display font-semibold text-white text-sm hidden sm:block">
            {personal.name.split(' ')[0]}
            <span className="text-brand-400">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link font-body text-sm transition-colors duration-200 ${
                active === link.href
                  ? 'text-brand-400 active'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-brand-400 font-mono">
            <span className="glow-dot" />
            Live on AWS
          </div>
          <a href={personal.resume} className="btn-primary py-2 px-4 text-sm" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-surface-dark/95 backdrop-blur-xl border-b border-surface-border px-6 py-4 space-y-4">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-gray-300 hover:text-brand-400 transition-colors font-body py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={personal.resume} className="btn-primary text-sm w-full justify-center" target="_blank" rel="noreferrer">
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
