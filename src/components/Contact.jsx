import React, { useState } from 'react';
import { personal } from '../data';
import { useScrollReveal } from '../hooks/useScrollReveal';

function InputField({ label, type = 'text', name, value, onChange, error, multiline }) {
  const base = `w-full bg-surface-card border rounded-xl px-4 py-3 text-white text-sm font-body placeholder-gray-600 transition-all duration-200 outline-none focus:border-brand-500/60 focus:bg-surface-card/80 focus:shadow-sm focus:shadow-brand-500/10 ${
    error ? 'border-red-500/60' : 'border-surface-border'
  }`;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          placeholder={`Your ${label.toLowerCase()}...`}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Your ${label.toLowerCase()}...`}
          className={base}
        />
      )}
      {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim())           errors.name    = 'Name is required';
  if (!form.email.trim())          errors.email   = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Invalid email address';
  if (!form.message.trim())        errors.message = 'Message is required';
  else if (form.message.trim().length < 10)  errors.message = 'Message is too short';
  return errors;
}

export default function Contact() {
  const [ref, visible] = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('sending');

    // Simulate sending (integrate EmailJS or your backend here)
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-brand-500/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="section-subtitle">04 — Contact</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="w-12 h-0.5 bg-brand-500 mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-8">
            <p className="text-gray-400 text-base leading-relaxed font-body">
              I'm currently open to cloud engineering roles, internships, and interesting projects.
              Whether you have a question, want to collaborate, or just want to say hi — my inbox is open!
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: 'Email',
                  value: personal.email,
                  href: `mailto:${personal.email}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  ),
                  label: 'GitHub',
                  value: personal.github.replace('https://', ''),
                  href: personal.github,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  label: 'LinkedIn',
                  value: personal.linkedin.replace('https://', ''),
                  href: personal.linkedin,
                },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 card-glass rounded-xl p-4 hover:border-brand-500/30 border border-surface-border transition-all duration-200 group"
                >
                  <div className="text-brand-400 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-sm font-body mt-0.5">{item.value}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-brand-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="card-glass rounded-2xl p-6 border border-surface-border">
            <h3 className="font-display font-semibold text-white text-lg mb-6">Send a Message</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-3xl mb-4 animate-glow">
                  ✓
                </div>
                <h4 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h4>
                <p className="text-gray-400 text-sm">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Name"    name="name"    value={form.name}    onChange={handleChange} error={errors.name} />
                  <InputField label="Email"   name="email"   type="email" value={form.email}   onChange={handleChange} error={errors.email} />
                </div>
                <InputField   label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                <InputField   label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} multiline />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-gray-600 text-xs text-center font-mono">
                  * Connect EmailJS or your backend to make this functional
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
