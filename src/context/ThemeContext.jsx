import React, { createContext, useContext, useState, useCallback } from 'react';

const themes = {
  yellow: {
    id: 'yellow', bg: 'bg-[#FEFCE8]', text: 'text-black',
    accent1: 'bg-[#FF5F5F]', accent1Hover: 'hover:bg-[#ff4444]', accent1Text: 'text-[#FF5F5F]',
    accent2: 'bg-[#FDE047]', accent3: 'bg-[#A7F3D0]', selection: 'selection:bg-[#FF5F5F]', lightAccent: 'bg-[#E0E7FF]',
    cardText: 'text-black', tagText: 'text-black', accentContent: 'text-black',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  blue: {
    id: 'blue', bg: 'bg-[#ECFEFF]', text: 'text-slate-900',
    accent1: 'bg-[#3B82F6]', accent1Hover: 'hover:bg-[#2563eb]', accent1Text: 'text-[#3B82F6]',
    accent2: 'bg-[#67E8F9]', accent3: 'bg-[#C4B5FD]', selection: 'selection:bg-[#3B82F6]', lightAccent: 'bg-[#F3F4F6]',
    cardText: 'text-slate-900', tagText: 'text-slate-900', accentContent: 'text-slate-900',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  purple: {
    id: 'purple', bg: 'bg-[#FAF5FF]', text: 'text-gray-900',
    accent1: 'bg-[#9333EA]', accent1Hover: 'hover:bg-[#7e22ce]', accent1Text: 'text-[#9333EA]',
    accent2: 'bg-[#F0ABFC]', accent3: 'bg-[#6EE7B7]', selection: 'selection:bg-[#9333EA]', lightAccent: 'bg-[#FDF4FF]',
    cardText: 'text-gray-900', tagText: 'text-gray-900', accentContent: 'text-gray-900',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  mint: {
    id: 'mint', bg: 'bg-[#EDFCF2]', text: 'text-emerald-900',
    accent1: 'bg-[#10B981]', accent1Hover: 'hover:bg-[#059669]', accent1Text: 'text-[#10B981]',
    accent2: 'bg-[#6EE7B7]', accent3: 'bg-[#A7F3D0]', selection: 'selection:bg-[#10B981]', lightAccent: 'bg-[#D1FAE5]',
    cardText: 'text-emerald-900', tagText: 'text-emerald-900', accentContent: 'text-emerald-900',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  sunset: {
    id: 'sunset', bg: 'bg-[#FFF7ED]', text: 'text-amber-900',
    accent1: 'bg-[#FB923C]', accent1Hover: 'hover:bg-[#F97316]', accent1Text: 'text-[#F97316]',
    accent2: 'bg-[#FDE68A]', accent3: 'bg-[#FCA5A5]', selection: 'selection:bg-[#FB923C]', lightAccent: 'bg-[#FFEDD5]',
    cardText: 'text-amber-900', tagText: 'text-amber-900', accentContent: 'text-amber-900',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  rose: {
    id: 'rose', bg: 'bg-[#FFF1F2]', text: 'text-rose-900',
    accent1: 'bg-[#F43F5E]', accent1Hover: 'hover:bg-[#E11D48]', accent1Text: 'text-[#F43F5E]',
    accent2: 'bg-[#FDA4AF]', accent3: 'bg-[#FBCFE8]', selection: 'selection:bg-[#F43F5E]', lightAccent: 'bg-[#FFE4E6]',
    cardText: 'text-rose-900', tagText: 'text-rose-900', accentContent: 'text-rose-900',
    cardBg: 'bg-white', border: 'border-2 border-black', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
  },
  indigoDark: {
    id: 'indigoDark', bg: 'bg-[#0F172A]', text: 'text-slate-100',
    accent1: 'bg-[#6366F1]', accent1Hover: 'hover:bg-[#4F46E5]', accent1Text: 'text-[#6366F1]',
    accent2: 'bg-[#1E293B]', accent3: 'bg-[#334155]', selection: 'selection:bg-[#6366F1]', lightAccent: 'bg-[#1E293B]',
    cardText: 'text-slate-100', tagText: 'text-slate-100', accentContent: 'text-slate-100',
    cardBg: 'bg-[#1E293B]', border: 'border-2 border-[#6366F1]', shadow: 'shadow-[4px_4px_0px_0px_rgba(99,102,241,1)]'
  },
  emeraldDark: {
    id: 'emeraldDark', bg: 'bg-[#052e23]', text: 'text-emerald-100',
    accent1: 'bg-[#10B981]', accent1Hover: 'hover:bg-[#059669]', accent1Text: 'text-[#10B981]',
    accent2: 'bg-[#064e3b]', accent3: 'bg-[#047857]', selection: 'selection:bg-[#10B981]', lightAccent: 'bg-[#065f46]',
    cardText: 'text-emerald-100', tagText: 'text-emerald-100', accentContent: 'text-emerald-100',
    cardBg: 'bg-[#064e3b]', border: 'border-2 border-[#10B981]', shadow: 'shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]'
  },
  crimsonDark: {
    id: 'crimsonDark', bg: 'bg-[#1E1A1D]', text: 'text-red-100',
    accent1: 'bg-[#DC2626]', accent1Hover: 'hover:bg-[#B91C1C]', accent1Text: 'text-[#DC2626]',
    accent2: 'bg-[#312527]', accent3: 'bg-[#4C2E31]', selection: 'selection:bg-[#DC2626]', lightAccent: 'bg-[#3F2A2D]',
    cardText: 'text-red-100', tagText: 'text-red-100', accentContent: 'text-red-100',
    cardBg: 'bg-[#312527]', border: 'border-2 border-[#DC2626]', shadow: 'shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]'
  },
  bubblePastel: {
    id: 'bubblePastel', bg: 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50', text: 'text-slate-800',
    accent1: 'bg-pink-400', accent1Hover: 'hover:bg-pink-500', accent1Text: 'text-pink-500',
    accent2: 'bg-purple-200', accent3: 'bg-blue-200', selection: 'selection:bg-pink-400', lightAccent: 'bg-white/60',
    cardText: 'text-slate-800', tagText: 'text-slate-800', accentContent: 'text-slate-800',
    cardBg: 'bg-white/70 backdrop-blur', border: 'border-2 border-pink-300', shadow: 'shadow-[4px_4px_0px_0px_rgba(244,114,182,0.7)]',
    decorations: [
      { className: 'absolute top-24 left-12 w-24 h-24 rounded-full bg-pink-300/40 animate-bubble blur-md' },
      { className: 'absolute top-64 right-10 w-16 h-16 rounded-full bg-purple-300/40 animate-bubbleSlow blur' },
      { className: 'absolute bottom-24 left-1/3 w-20 h-20 rounded-full bg-blue-300/40 animate-floatSlow blur' }
    ]
  },
  oceanDark: {
    id: 'oceanDark', bg: 'bg-gradient-to-b from-[#001F3F] to-[#00395F]', text: 'text-cyan-100',
    accent1: 'bg-cyan-500', accent1Hover: 'hover:bg-cyan-600', accent1Text: 'text-cyan-400',
    accent2: 'bg-[#004F7A]', accent3: 'bg-[#006A9F]', selection: 'selection:bg-cyan-500', lightAccent: 'bg-[#004F7A]',
    cardText: 'text-cyan-100', tagText: 'text-cyan-100', accentContent: 'text-cyan-100',
    cardBg: 'bg-[#003151]', border: 'border-2 border-cyan-500', shadow: 'shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]',
    decorations: Array.from({ length: 12 }).map((_, i) => ({
      className: 'absolute w-2 h-2 rounded-full bg-cyan-300/40 animate-pulseDot',
      style: { top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%` }
    }))
  },
  matrixDark: {
    id: 'matrixDark', bg: 'bg-[#050505]', text: 'text-green-200',
    accent1: 'bg-green-600', accent1Hover: 'hover:bg-green-700', accent1Text: 'text-green-500',
    accent2: 'bg-green-800', accent3: 'bg-green-900', selection: 'selection:bg-green-600', lightAccent: 'bg-green-900',
    cardText: 'text-green-200', tagText: 'text-green-200', accentContent: 'text-green-200',
    cardBg: 'bg-[#0d0d0d]', border: 'border-2 border-green-600', shadow: 'shadow-[4px_4px_0px_0px_rgba(22,163,74,1)]',
    decorations: Array.from({ length: 20 }).map(() => ({
      className: 'absolute w-px h-24 bg-green-500/40 animate-fallSlow',
      style: { left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s` }
    }))
  },
  neonGrid: {
    id: 'neonGrid', bg: 'bg-[#0B0F17]', text: 'text-indigo-100',
    accent1: 'bg-fuchsia-500', accent1Hover: 'hover:bg-fuchsia-600', accent1Text: 'text-fuchsia-400',
    accent2: 'bg-indigo-700', accent3: 'bg-cyan-600', selection: 'selection:bg-fuchsia-500', lightAccent: 'bg-indigo-900',
    cardText: 'text-indigo-100', tagText: 'text-indigo-100', accentContent: 'text-indigo-100',
    cardBg: 'bg-[#111827]', border: 'border-2 border-fuchsia-500', shadow: 'shadow-[4px_4px_0px_0px_rgba(217,70,239,1)]',
    decorations: [
      { className: 'pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:40px_40px] animate-gridPulse' },
      ...Array.from({ length: 10 }).map(() => ({
        className: 'absolute w-2 h-2 rounded-full bg-fuchsia-400 animate-pulseDot',
        style: { top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%` }
      }))
    ]
  },
  
  halloween: {
    id: 'halloween', bg: 'bg-gradient-to-b from-[#1A0F00] via-[#2C0F0F] to-[#3B1F00]', text: 'text-orange-200',
    accent1: 'bg-orange-500', accent1Hover: 'hover:bg-orange-600', accent1Text: 'text-orange-400',
    accent2: 'bg-purple-700', accent3: 'bg-orange-700', selection: 'selection:bg-orange-500', lightAccent: 'bg-purple-900',
    cardText: 'text-orange-200', tagText: 'text-orange-200', accentContent: 'text-orange-200',
    cardBg: 'bg-[#271207]', border: 'border-2 border-orange-600', shadow: 'shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]',
    decorations: [
      ...Array.from({ length: 6 }).map(() => ({
        className: 'absolute rounded-full bg-orange-400/30 animate-bubble',
        style: { width: `${40 + Math.random() * 60}px`, height: `${40 + Math.random() * 60}px`, left: `${Math.random() * 85}%`, top: `${Math.random() * 85}%`, animationDelay: `${Math.random() * 6}s` }
      })),
      ...Array.from({ length: 4 }).map(() => ({
        className: 'absolute w-3 h-3 rounded-full bg-purple-400/40 animate-pulseDot',
        style: { left: `${Math.random() * 90}%`, top: `${Math.random() * 90}%` }
      })),
      { className: 'absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl' }
    ]
  },
  sketch: {
    id: 'sketch',
    bg: 'bg-[#fdfbf7]',
    text: 'text-zinc-800',
    accent1: 'bg-zinc-900',
    accent1Hover: 'hover:bg-zinc-800',
    accent1Text: 'text-zinc-900',
    accent2: 'bg-[#fff176]',
    accent3: 'bg-blue-200',
    selection: 'selection:bg-yellow-300',
    lightAccent: 'bg-zinc-100',
    cardText: 'text-zinc-800',
    tagText: 'text-zinc-800',
    accentContent: 'text-white',
    cardBg: 'bg-white',
    border: 'border-2 border-zinc-800',
    shadow: 'shadow-none',
    roughBorderStyle: {
      borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
      borderWidth: '2px',
      borderColor: '#27272a',
      borderStyle: 'solid'
    },
    sketchFont: 'font-[\'Architects_Daughter\',_cursive]',
    paperTexture: 'bg-[radial-gradient(#d1d1d1_0.5px,transparent_0.5px)] bg-[length:24px_24px]',
    roughBorderVariants: [
      { borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px', borderWidth: '2px' },
      { borderRadius: '235px 15px 205px 15px/15px 205px 15px 235px', borderWidth: '2px' },
      { borderRadius: '245px 15px 215px 15px/15px 215px 15px 245px', borderWidth: '2px' },
      { borderRadius: '265px 15px 235px 15px/15px 235px 15px 265px', borderWidth: '2px' },
      { borderRadius: '225px 15px 245px 15px/15px 245px 15px 225px', borderWidth: '2px' },
      { borderRadius: '250px 15px 220px 15px/15px 220px 15px 250px', borderWidth: '2px' }
    ],
    projectColors: ['#ffeb3b', '#b2ebf2', '#f8bbd0', '#c8e6c9', '#d1c4e9', '#ffccbc'],
    decorations: [
      { className: 'absolute w-20 h-20 bg-yellow-200/50 rounded-full blur-xl', style: { top: '20%', left: '10%' } },
      { className: 'absolute w-16 h-16 bg-pink-200/40 rounded-full blur-lg', style: { top: '60%', right: '15%' } },
      { className: 'absolute w-12 h-12 bg-blue-200/40 rounded-full blur-md', style: { bottom: '30%', left: '80%' } }
    ]
  }
};

const ThemeContext = createContext({
  theme: themes.yellow,
  current: 'yellow',
  cycleTheme: () => {},
  setTheme: () => {},
  themes
});

export const ThemeProvider = ({ children }) => {
  const [current, setCurrent] = useState('yellow');

  const cycleTheme = useCallback(() => {
    const keys = Object.keys(themes);
    const nextIndex = (keys.indexOf(current) + 1) % keys.length;
    setCurrent(keys[nextIndex]);
  }, [current]);

  const setTheme = useCallback((id) => {
    if (themes[id]) setCurrent(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themes[current], current, cycleTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
