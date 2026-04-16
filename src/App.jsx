import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useMouseGlow } from './hooks/useScrollReveal';
import './index.css';

export default function App() {
  useMouseGlow();

  return (
    <div className="relative min-h-screen bg-surface-dark text-gray-100 font-body">

      {/* Cursor glow */}
      <div id="cursor-glow" className="cursor-glow hidden lg:block" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}