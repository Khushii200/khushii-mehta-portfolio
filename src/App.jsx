import React, { useState, useEffect, useRef } from 'react';
import aboutMainPhoto from './assets/IMG_7769.jpg';
import raahiUserFlow from './assets/raahi-user-flow.png';
import raahiTaskFlow from './assets/raahi-task-flow.png';
import raahiMoodBoard from './assets/raahi-mood-board.png';
import raahiMoodBoardCopy from './assets/raahi-mood-board-copy.png';
import raahiPersonaOne from './assets/raahi-persona-1.png';
import raahiPersonaTwo from './assets/raahi-persona-2.png';
import raahiLoginScreens from './assets/raahi-login-screens.png';
import raahiSignUpScreens from './assets/raahi-sign-up-screens.png';
import raahiPreferenceScreens from './assets/raahi-preference-screens.png';
import raahiPlanningTrip from './assets/raahi-planning-trip.png';
import raahiHomePages from './assets/raahi-home-pages.png';
import bsnlLogoAlt from './assets/bsnl-logo-alt.png';
import { Mail, Linkedin, Github, Instagram, Sparkles, ArrowUpRight, ArrowRight, ArrowLeft, ExternalLink, Lock, Calendar, User, Target, Search, Users, Zap, BarChart3, Lightbulb, ClipboardList, Smartphone, Globe, Shield, ZapOff, AlertCircle, TrendingDown, Clock, MessageSquare, LogOut, Eye, Ear, Heart, Brain } from 'lucide-react';

// --- Custom Hooks ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return mousePosition;
};

// --- Fun Doodle Components ---
const ScribbleUnderline = () => (
  <svg className="absolute -bottom-2 left-0 w-full h-4 text-zinc-600" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15C30 5 170 5 195 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DoodleArrow = ({ className }) => (
  <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10C15 25 35 25 40 40M40 40L30 38M40 40L38 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FloatingDoodle = ({ x, y }) => (
  <div 
    className="fixed pointer-events-none z-[60] opacity-40 text-white"
    style={{ 
      left: x, 
      top: y, 
      transform: 'translate(-50%, -50%) rotate(15deg)',
      transition: 'transform 0.2s ease-out'
    }}
  >
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path d="M20 5L22 15L32 17L22 19L20 29L18 19L8 17L18 15L20 5Z" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 z-[10001] pointer-events-none opacity-[0.08] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const CustomCursor = ({ hovering, label, status }) => {
  const dotRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const dotCurrentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const containerEasing = 0.12; 
      const dotEasing = 0.35; 

      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * containerEasing;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * containerEasing;
      
      dotCurrentPos.current.x += (mousePos.current.x - dotCurrentPos.current.x) * dotEasing;
      dotCurrentPos.current.y += (mousePos.current.y - dotCurrentPos.current.y) * dotEasing;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrentPos.current.x}px, ${dotCurrentPos.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 0 : 1})`;
      }
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1 : 0})`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [hovering]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full z-[10000] pointer-events-none opacity-80 mix-blend-difference will-change-transform"
      />
      <div 
        ref={containerRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center whitespace-nowrap px-6 py-3 rounded-2xl shadow-2xl border will-change-transform transition-colors duration-300 ${
          status === 'locked' 
          ? 'bg-red-600 border-red-400 text-white' 
          : 'bg-white border-zinc-200 text-black'
        }`}
      >
        <div className="flex items-center gap-3">
          {status === 'locked' && <Lock size={14} className="animate-pulse" />}
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {label}
          </span>
          {status !== 'locked' && <ArrowUpRight size={14} />}
        </div>
      </div>
    </>
  );
};

const ProjectDetail = ({ project, onBack, setHovering, setCursorLabel }) => {
  const isBSNL = project.id === 1;
  const isRaahi = project.id === 2;
  const isVoia = project.id === 3;
  const isSolar = project.id === 4;

  const personas = [
    {
      name: "Meenakshi Iyer (60–70)",
      role: "The Older Loyalist",
      location: "Coimbatore",
      description: "Tech comfort: low. Current SIM: BSNL. Background: retired school principal.",
      needs: ["Wants large font and Tamil voice support", "Prefers “talk to a person” or WhatsApp voice-based help", "Simple, honest plans with long validity"],
      painPoint: "Confused by complex app UI and digital recharge; needs help with bill payments and doesn’t understand data plans.",
      icon: <Shield size={24} />
    },
    {
      name: "Riya Sharma (18–24)",
      role: "The Gen Z Skeptic",
      location: "Pune",
      description: "Tech comfort: very high (lives online). Current SIM: Airtel. Background: design college student.",
      needs: ["Customizable plans, UPI payments, dark mode", "Wants meme-savvy brands, clean UI, and fast service", "Low-cost student plans with OTT bundles and night boosters"],
      painPoint: "Thinks BSNL is outdated/uncool and assumes it’s only for parents or remote areas.",
      icon: <Globe size={24} />
    },
    {
      name: "Shivram Mahato (30–45)",
      role: "The Rural First-Time User",
      location: "Bihar",
      description: "Tech comfort: basic (uses voice, some YouTube in Hindi). Current SIM: BSNL. Background: small-scale farmer.",
      needs: ["Voice-first interface in Hindi/Bhojpuri", "WhatsApp-based support and recharge", "Simple daily/weekly plans and local offers"],
      painPoint: "Doesn’t understand English app content; needs help to recharge and sometimes doesn’t know when the pack ends.",
      icon: <Zap size={24} />
    }
  ];

  const journeySteps = [
    {
      phase: "Recharge Awareness",
      action: "Meena doesn’t get notified when her plan is about to expire.",
      touchpoint: "Phone stops working (calls/data).",
      painPoint: "No proactive reminders.",
      emotion: "Frustrated",
      emotionIcon: "😣",
      icon: <Search size={20} />
    },
    {
      phase: "Recharge Search",
      action: "Asks a neighbor/shopkeeper what recharge plan is available.",
      touchpoint: "Local kirana or recharge vendor.",
      painPoint: "No clarity on options; vendor chooses for her.",
      emotion: "Dependent",
      emotionIcon: "🥺",
      icon: <Users size={20} />
    },
    {
      phase: "Recharge Payment",
      action: "Pays in cash or asks someone to pay online via their phone.",
      touchpoint: "Physical shop or family member’s help.",
      painPoint: "No direct digital access or transparency.",
      emotion: "Helplessness",
      emotionIcon: "😔",
      icon: <Smartphone size={20} />
    },
    {
      phase: "Plan Usage",
      action: "Uses BSNL network without tracking data/call usage.",
      touchpoint: "Phone interface (no app usage).",
      painPoint: "No idea about benefits or usage status.",
      emotion: "Unaware",
      emotionIcon: "😶",
      icon: <Zap size={20} />
    },
    {
      phase: "Customer Service",
      action: "Experiences a network issue; calls BSNL helpline.",
      touchpoint: "IVR system or long wait call center.",
      painPoint: "Hard to navigate, language barrier, no resolution.",
      emotion: "Angry/Ignored",
      emotionIcon: "😠",
      icon: <MessageSquare size={20} />
    },
    {
      phase: "Retention/Exit",
      action: "A private player (like Jio) offers a better deal.",
      touchpoint: "Peer influence or phone shop.",
      painPoint: "No loyalty benefits or compelling reason to stay.",
      emotion: "Willingness to Switch",
      emotionIcon: "🙂",
      icon: <LogOut size={20} />
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#070707] overflow-y-auto animate-fade-in cursor-default md:cursor-none">
      <nav className="sticky top-0 w-full px-6 md:px-12 py-8 flex justify-between items-center bg-[#070707]/80 backdrop-blur-xl z-[210]">
        <button 
          onClick={onBack}
          onMouseEnter={() => { setHovering(true); setCursorLabel("GO BACK"); }}
          onMouseLeave={() => setHovering(false)}
          className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={16} /> Close Project
        </button>
        <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{project.number} / {project.category}</div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        <header className="mb-24">
          <h1 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-12">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="text-xl md:text-3xl font-medium text-zinc-400 max-w-4xl leading-tight">
            {isBSNL 
              ? "A complete strategic repositioning of India's telecom legacy to win back the digital-first generation."
              : isRaahi
                ? "Crafting a seamless digital journey for modern travelers with clarity, trust, and local relevance."
                : isVoia
                  ? "VOIA is a wearable that enables discreet, real-time communication between teachers and deaf-mute students using light and vibration."
                  : isSolar
                    ? "Designing the infrastructure for future-proof renewable energy services."
                    : project.description}
          </p>
        </header>

        <div className={`grid grid-cols-1 md:grid-cols-${isSolar || isRaahi || isVoia ? '4' : '3'} gap-8 mb-32`}>
          <div className="p-10 border border-white/10 rounded-[50px] bg-white/[0.03] backdrop-blur-sm">
             <Calendar className="mb-6 text-zinc-500" size={28} />
             <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Timeline</h4>
             <p className="text-sm font-bold uppercase tracking-wider">
               {isRaahi ? "2 months" : isVoia || isSolar ? "" : "12 May 2025 — 12 July 2025"}
             </p>
          </div>
          <div className="p-10 border border-white/10 rounded-[50px] bg-white/[0.03] backdrop-blur-sm">
             <User className="mb-6 text-zinc-500" size={28} />
             <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Role</h4>
             <p className="text-sm font-bold uppercase tracking-wider">
               {isRaahi
                 ? "Design Research & UI/UX"
                 : isVoia
                 ? ""
                 : isSolar
                 ? "Service Design · Research · Insight Synthesis · Journey Mapping · Concept & Experience Design"
                 : "Design Strategist"}
             </p>
          </div>
          <div className="p-10 border border-white/10 rounded-[50px] bg-white/[0.03] backdrop-blur-sm">
             <Target className="mb-6 text-zinc-500" size={28} />
             <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">
               {isSolar ? "Project Type" : "Focus"}
             </h4>
             <p className="text-sm font-bold uppercase tracking-wider">
               {isRaahi
                 ? "UI/UX of App"
                 : isVoia
                 ? ""
                 : isSolar
                 ? "Service Design · Sustainability · Systems Thinking"
                 : "Repositioning & B2C Strategy"}
             </p>
          </div>
          {(isSolar || isRaahi || isVoia) && (
            <div className="p-10 border border-white/10 rounded-[50px] bg-white/[0.03] backdrop-blur-sm">
               <Users className="mb-6 text-zinc-500" size={28} />
               <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Team Members</h4>
               <p className="text-sm font-bold uppercase tracking-wider">
                 {isSolar
                   ? "Khushii · Jash · Kaushal"
                   : isRaahi
                   ? "Khushii · Arwa · Tanvee"
                   : "Khushii · Kanika · Gauri · Melwin · Naman"}
               </p>
            </div>
          )}
        </div>

        {isBSNL ? (
          <div className="space-y-40">
            {/* Where BSNL Stands Today */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <span className="w-8 h-1 bg-white inline-block"></span> Where BSNL Stands Today
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xl md:text-2xl font-medium text-zinc-400 leading-snug">
                  Bharat Sanchar Nigam Limited (BSNL) is India’s state-owned telecom operator with unmatched rural reach and a legacy of trust built over decades. Despite competitive pricing and national infrastructure, BSNL has steadily lost relevance in urban and younger markets due to weak digital presence, fragmented experiences, and inconsistent brand communication.
                </p>
              </div>
            </section>

            {/* Problem Statement */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <span className="w-8 h-1 bg-white inline-block"></span> The Problem
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-2xl md:text-3xl font-medium text-white leading-snug">
                  BSNL isn’t failing because people forgot it — it’s failing because they remember it as <span className="text-zinc-500 italic">outdated, slow, and disconnected</span>. 
                </p>
                <p className="text-lg text-zinc-400 mt-8 leading-relaxed">
                  For Gen Z and digital-first users, it doesn’t even register as a telecom option — not due to price or reach, but because it lacks visibility, personalization, and a relatable brand voice.
                </p>
              </div>
            </section>

            {/* Research Approach */}
            <section className="space-y-6">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Research Approach</h2>
              </div>
              <div className="relative rounded-[28px] border border-white/10 bg-white/[0.02] px-6 md:px-10 py-10">
                <div className="hidden md:block absolute left-10 right-10 top-[54px] h-px bg-white/10"></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 relative z-10">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-xs font-black flex items-center justify-center">01</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Secondary Research</h3>
                      <p className="text-sm text-zinc-300 mt-2">
                        TRAI reports, telecom &amp; fintech trends, AI adoption, cultural frameworks
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-xs font-black flex items-center justify-center">02</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Competitor Analysis</h3>
                      <p className="text-sm text-zinc-300 mt-2">
                        Airtel, Jio, Vi (India) + Verizon, AT&amp;T (global references)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-xs font-black flex items-center justify-center">03</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Digital Listening</h3>
                      <p className="text-sm text-zinc-300 mt-2">
                        200+ Play Store reviews to surface real user friction
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-xs font-black flex items-center justify-center">04</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">User Interviews</h3>
                      <p className="text-sm text-zinc-300 mt-2">
                        BSNL and non‑BSNL users across age groups
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 text-xs font-black flex items-center justify-center">05</div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">Synthesis</h3>
                      <p className="text-sm text-zinc-300 mt-2">
                        Personas and journey maps across recharge, usage, and support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Competitive Benchmarking */}
            <section className="py-20 bg-white/[0.02] -mx-6 md:-mx-12 px-6 md:px-12 rounded-[100px] border-y border-white/5">
               <div className="mb-20">
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Competitive Benchmarking</h2>
                 <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold">Understanding the Telecom Landscape</p>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[1100px]">
                   <thead>
                     <tr className="border-b border-white/10 text-[10px] uppercase font-black tracking-widest text-zinc-500">
                       <th className="pb-8 pl-6 pr-6">Player</th>
                       <th className="pb-8 pr-6">Tech</th>
                       <th className="pb-8 pr-6">Pricing</th>
                       <th className="pb-8 pr-6">Ecosystem</th>
                       <th className="pb-8 pr-6">Brand Voice</th>
                       <th className="pb-8 pr-6">Dominance</th>
                       <th className="pb-8 pr-6">Market Share (as of 2024)</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     <tr className="group">
                       <td className="py-10 pl-6 pr-6">
                         <div className="font-black text-xl text-white">JIO</div>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Extensive 4G/5G</p>
                        </td>
                        <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Aggressive Pricing</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">JioCinema, Games, AI</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Youthful & Innovative</p>
                       </td>
                       <td className="py-10 pr-6">
                         <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">Urban & Tier-2</span>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-xs text-zinc-300 font-bold uppercase tracking-widest">~50–52%</p>
                       </td>
                     </tr>
                     <tr className="group">
                       <td className="py-10 pl-6 pr-6">
                         <div className="font-black text-xl text-white">AIRTEL</div>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">High Consistency</p>
                        </td>
                        <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Balanced Pricing</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Wynk, Thanks, Xstream</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Premium & Urban</p>
                       </td>
                       <td className="py-10 pr-6">
                         <span className="px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest">Urban-Focused</span>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-xs text-zinc-300 font-bold uppercase tracking-widest">~29–30%</p>
                       </td>
                     </tr>
                     <tr className="group">
                       <td className="py-10 pl-6 pr-6">
                         <div className="font-black text-xl text-white">VODAFONE IDEA (Vi)</div>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Good 4G Coverage</p>
                        </td>
                        <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Value-Added Plans</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Vi Movies & TV, Music</p>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-sm font-bold">Trendy & Vibrant</p>
                       </td>
                       <td className="py-10 pr-6">
                         <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest">Youth-Centric</span>
                       </td>
                       <td className="py-10 pr-6">
                         <p className="text-xs text-zinc-300 font-bold uppercase tracking-widest">~13–14%</p>
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </section>

            {/* Insight From the Market */}
            <section className="space-y-8 py-12">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Insight From the Market</h2>
              </div>
              <div className="max-w-3xl space-y-5 text-lg md:text-xl text-zinc-300 leading-relaxed">
                <p>
                  The competitive landscape revealed a clear pattern — private players like Jio, Airtel, and Vi are competing on speed, pricing, and bundled ecosystems.
                </p>
                <p>
                  However, BSNL’s challenge is fundamentally different.
                </p>
                <p>
                  It is not losing because it lacks infrastructure or affordability — it is losing because it lacks perceived relevance and usability.
                </p>
              </div>
              <div className="-mx-6 md:-mx-12">
                <div className="mt-2 border border-white/10 rounded-[24px] bg-white/[0.03] p-6 md:p-8 text-center">
                  <p className="text-xl md:text-2xl text-zinc-200 font-medium leading-snug">
                    <span className="font-normal">
                      The opportunity is not to compete head‑on, but to reposition BSNL around what competitors are not solving:{" "}
                    </span>
                    <span className="whitespace-nowrap font-bold">clarity, trust, and accessibility.</span>
                  </p>
                </div>
              </div>
            </section>

            {/* Persona Section */}
            <section className="space-y-10">
              <div className="max-w-4xl space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Who BSNL Is Serving</h2>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold">
                  Three distinct user groups reveal that BSNL’s challenge isn’t reach — it’s relevance, usability, and perception.
                </p>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 pb-12 border-b border-white/10">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Meenakshi Iyer</h3>
                      <p className="text-sm text-zinc-400">60–70 | The Older Loyalist</p>
                    </div>
                    <p className="text-sm md:text-base text-zinc-400">
                      Retired school principal<br />
                      Uses BSNL out of trust<br />
                      Low tech comfort
                    </p>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Needs</div>
                      <p className="text-sm md:text-base text-zinc-300">Simple plans, human support, clarity</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Key Insight</div>
                    <p className="text-lg md:text-2xl text-zinc-200 font-semibold leading-snug">
                      “If BSNL becomes easier to use, they won’t leave — they’ll advocate.”
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 pb-12 border-b border-white/10">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Riya Sharma</h3>
                      <p className="text-sm text-zinc-400">18–24 | The Gen Z Skeptic</p>
                    </div>
                    <p className="text-sm md:text-base text-zinc-400">
                      Design student, always online<br />
                      Uses Airtel/Jio<br />
                      Perception‑driven
                    </p>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Needs</div>
                      <p className="text-sm md:text-base text-zinc-300">Speed, personalization, modern UX</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Key Insight</div>
                    <p className="text-lg md:text-2xl text-zinc-200 font-semibold leading-snug">
                      “They don’t reject BSNL for price — they reject it for perception.”
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white">Shivram Mahato</h3>
                      <p className="text-sm text-zinc-400">30–45 | Rural First‑Time User</p>
                    </div>
                    <p className="text-sm md:text-base text-zinc-400">
                      Small‑scale farmer<br />
                      Uses voice + basic apps<br />
                      Relies on others
                    </p>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">Needs</div>
                      <p className="text-sm md:text-base text-zinc-300">Guided experience, local language, assistance</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Key Insight</div>
                    <p className="text-lg md:text-2xl text-zinc-200 font-semibold leading-snug">
                      “Access exists — understanding doesn’t.”
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Empathy Map Section */}
            <section className="space-y-16">
               <div className="max-w-3xl">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">Empathy Map</h2>
                  <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold mt-2">Decoding the User's Internal & External World</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[48px] overflow-hidden transform scale-[0.92] origin-top -mb-28">
                 {/* SAYS */}
                 <div className="p-8 bg-[#070707] flex flex-col items-center text-center group">
                    <MessageSquare size={32} className="mb-6 text-zinc-500 group-hover:text-white transition-colors" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Says</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="sticky-note sticky-note-purple">"Bharat, ₹199 ka data chahiye"</div>
                      <div className="sticky-note sticky-note-purple">"Beta, tu hi recharge kar de."</div>
                      <div className="sticky-note sticky-note-pink">Forgets renewal dates, gets surprised by balance expiry.</div>
                      <div className="sticky-note sticky-note-pink">Feels proud of BSNL when told it’s secure and Indian.</div>
                      <div className="sticky-note sticky-note-lilac">Uses WhatsApp, voice notes, YouTube — not the app.</div>
                    </div>
                 </div>

                 {/* THINKS */}
                 <div className="p-8 bg-[#070707] flex flex-col items-center text-center group">
                    <Brain size={32} className="mb-6 text-zinc-500 group-hover:text-white transition-colors" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Thinks</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="sticky-note sticky-note-green">"I love the idea of BSNL... but the experience is too clunky."</div>
                      <div className="sticky-note sticky-note-green">"I don’t want to be cheated — just give me clarity."</div>
                      <div className="sticky-note sticky-note-sage">"I’m scared I’ll choose the wrong plan or press the wrong button."</div>
                      <div className="sticky-note sticky-note-sage">"I wish someone could just tell me what’s right for me — in my language."</div>
                    </div>
                 </div>

                 {/* SEES */}
                 <div className="p-8 bg-[#070707] flex flex-col items-center text-center group">
                   <Eye size={32} className="mb-6 text-zinc-500 group-hover:text-white transition-colors" />
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Sees</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="sticky-note sticky-note-peach">Too many options; confusing GBs, validity dates, top‑up types.</div>
                      <div className="sticky-note sticky-note-peach">Private players innovating, BSNL lagging.</div>
                      <div className="sticky-note sticky-note-rose">Legacy government interfaces — outdated, dense, cluttered.</div>
                      <div className="sticky-note sticky-note-rose">Jio/Airtel’s sleek campaigns, influencer content, OTT bundles.</div>
                      <div className="sticky-note sticky-note-peach">Shopkeepers or family members doing tasks for them.</div>
                    </div>
                 </div>

                 {/* HEARS */}
                 <div className="p-8 bg-[#070707] flex flex-col items-center text-center group">
                   <Ear size={32} className="mb-6 text-zinc-500 group-hover:text-white transition-colors" />
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Hears</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      <div className="sticky-note sticky-note-blue">"BSNL is for rural India / old people."</div>
                      <div className="sticky-note sticky-note-blue">"Use GPay or PhonePe — it’s easier."</div>
                      <div className="sticky-note sticky-note-sky">Misinformation like "BSNL doesn’t work anymore."</div>
                      <div className="sticky-note sticky-note-sky">Jargon like "booster pack," "FUP," "KYC incomplete" — with no explanation.</div>
                    </div>
                 </div>
               </div>
            </section>

            {/* Gain & Pain Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 -mt-56">
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-[0.2em]">Gain <span className="text-zinc-500 tracking-normal">(User Needs)</span></h3>
                <ul className="list-disc pl-6 space-y-3 text-sm md:text-base text-zinc-300">
                  <li>Recharge/Bill help in 2 taps or 1 voice command.</li>
                  <li>Interface in their mother tongue, with voice + visual prompts.</li>
                  <li>Auto reminders for expiry, smart suggestions, simple comparisons.</li>
                  <li>Humanized assistant (like “Bharat”) who knows preferences.</li>
                  <li>“Don’t make it cool — make it calm, smart, and clear.”</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-[0.2em]">Pain <span className="text-zinc-500 tracking-normal">(User Frustrations)</span></h3>
                <ul className="list-disc pl-6 space-y-3 text-sm md:text-base text-zinc-300">
                  <li>App UI is overwhelming or completely alien (esp. for seniors & rural users).</li>
                  <li>Trust issues with online payments.</li>
                  <li>Doesn’t understand plan differences, GBs, or voice minutes.</li>
                  <li>Forced dependency on shopkeepers or family for basic actions.</li>
                  <li>Missed opportunities: no proactive support, no regional UX, no “I get you” moment.</li>
                </ul>
              </div>
            </section>

            {/* As-Is Journey */}
            <section className="space-y-16">
               <div className="max-w-3xl">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">The As-Is Journey</h2>
                  <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold mt-2">Current Friction Points & Emotional Map</p>
               </div>

               <div className="relative pt-20 pb-10">
                  <div className="absolute top-[138px] left-0 w-full h-[1px] bg-white/10 hidden md:block"></div>
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-10 relative items-stretch">
                     {journeySteps.map((step, idx) => (
                       <div key={idx} className="relative group h-full">
                          <div className="hidden md:flex absolute top-[40px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-800 border-2 border-white/20 z-10 group-hover:scale-150 group-hover:bg-white group-hover:border-white transition-all duration-300"></div>
                          <div className="mb-8 md:text-center h-[120px] flex flex-col items-start md:items-center justify-end">
                             <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 mb-8 -mt-2 md:mx-auto group-hover:bg-white group-hover:text-black transition-colors">
                                {step.icon}
                             </div>
                             <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 whitespace-nowrap">Phase 0{idx+1}</h4>
                             <h3 className="text-lg font-black uppercase tracking-tighter leading-tight whitespace-nowrap">{step.phase}</h3>
                          </div>
                          <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 h-[390px] flex flex-col gap-4">
                             <div className="space-y-2">
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-zinc-600 mb-2">Typical Action</h5>
                                <p className="text-[13px] font-bold text-zinc-300 leading-snug">{step.action}</p>
                             </div>
                             <div className="pt-3 border-t border-white/5 space-y-2">
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-zinc-600 mb-2">Touchpoint</h5>
                                <p className="text-[13px] font-bold text-zinc-300 leading-snug">{step.touchpoint}</p>
                             </div>
                             <div className="pt-3 border-t border-white/5 space-y-2">
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-red-500/60 mb-2 flex items-center gap-2">
                                   <AlertCircle size={10} /> Friction Point
                                </h5>
                                <p className="text-[13px] font-medium text-zinc-500 italic leading-snug">{step.painPoint}</p>
                             </div>
                             <div className="pt-3 border-t border-white/5 space-y-2 mt-auto">
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-zinc-600 mb-2">Emotion</h5>
                                <div className="flex items-center gap-2 text-[13px] font-bold text-zinc-300 leading-snug">
                                  <span className="text-base">{step.emotionIcon}</span>
                                  <span>{step.emotion}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Reframing the Challenge */}
            <section className="space-y-8 py-16">
              <div className="max-w-4xl space-y-4">
                <div className="h-px w-24 bg-white/10"></div>
                <h2 className="text-5xl font-black uppercase tracking-tighter">Reframing the Challenge</h2>
              </div>
              <div className="max-w-3xl space-y-5 text-lg md:text-xl text-zinc-300 leading-relaxed">
                <p>At this point, the problem was no longer just about telecom performance.</p>
                <p>It became a question of experience design, perception, and access.</p>
              </div>
              <div className="max-w-3xl">
                <p className="text-xl md:text-2xl text-zinc-200 font-semibold leading-snug">
                  The goal shifted from improving services → to making BSNL understandable, usable, and relevant again.
                </p>
              </div>
            </section>

            {/* Strategic Core */}
            <section className="space-y-24">
               <div className="max-w-3xl">
                 <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 italic">"How Might We..."</h2>
                 <p className="text-3xl font-medium text-zinc-300 leading-tight border-l-4 border-white pl-12">
                   How might we craft a strategy that allows BSNL to build on its <span className="text-white">existing brand legacy</span> and appeal to a <span className="text-white">younger, metropolitan audience</span>?
                 </p>
               </div>
            </section>

            {/* From Insights to Direction */}
            <section className="space-y-10">
              <div className="max-w-4xl space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">From Insights to Direction</h2>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold">
                  Making sense of research before jumping into solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1200px]">
                <div className="h-full rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">What I Observed</h3>
                  <ul className="mt-4 list-disc pl-6 space-y-2 text-sm md:text-base text-zinc-300 leading-relaxed">
                    <li>Users trust BSNL, but hesitate to engage digitally</li>
                    <li>Younger users don’t reject BSNL for price — but for perception</li>
                    <li>Rural users have access, but lack clarity and confidence</li>
                    <li>Experience feels fragmented across touchpoints</li>
                  </ul>
                </div>

                <div className="h-full rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">What I Explored</h3>
                  <ul className="mt-4 list-disc pl-6 space-y-2 text-sm md:text-base text-zinc-300 leading-relaxed">
                    <li>Competing as a low‑cost telecom provider</li>
                    <li>Becoming a youth‑first digital brand</li>
                    <li>Doubling down as a rural‑first network</li>
                    <li>Building a feature‑heavy digital ecosystem</li>
                  </ul>
                </div>

                <div className="h-full rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">What I Ruled Out</h3>
                  <ul className="mt-4 list-disc pl-6 space-y-2 text-sm md:text-base text-zinc-300 leading-relaxed">
                    <li>Price competition is unsustainable against Jio</li>
                    <li>Youth‑only focus ignores loyal users</li>
                    <li>Digital‑first excludes low‑tech users</li>
                    <li>Feature‑heavy increases complexity instead of solving it</li>
                  </ul>
                </div>

                <div className="h-full rounded-[18px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 p-7 text-zinc-100 shadow-[0_12px_50px_rgba(0,0,0,0.5)]">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">What I Chose</h3>
                  <div className="mt-4 space-y-2 text-base md:text-lg leading-relaxed">
                    <p>Instead of competing directly, BSNL should:</p>
                    <p className="font-semibold text-white">“Lean into trust and simplify access”</p>
                    <p className="text-zinc-300">Repositioning it as:</p>
                    <p className="text-white font-medium">
                      A human‑first, accessible telecom experience built on trust — not complexity
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl">
                <p className="text-xl md:text-2xl text-zinc-200 font-semibold leading-snug">
                  This thinking led to the strategic pillars that guided all subsequent ideas.
                </p>
              </div>
            </section>

            {/* The Strategic Shift */}
            <section className="space-y-10">
              <div className="max-w-4xl space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">The Strategic Shift</h2>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold">
                  Translating insights into a clear direction for repositioning BSNL
                </p>
              </div>

              <div className="max-w-[1100px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-7 text-left h-full flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">Get</div>
                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                      Urban, digital‑first users and long‑time BSNL customers who are stuck in confusion, low visibility, and declining relevance — leading to passive usage or early rejection.
                    </p>
                  </div>

                  <div className="rounded-[20px] bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/20 p-7 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] h-full flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-3">To</div>
                    <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
                      A trusted, relevant, and actively chosen telecom that is simple to understand, easy to use, and culturally grounded.
                    </p>
                  </div>

                  <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-7 text-left h-full flex flex-col">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-3">By</div>
                    <ul className="text-sm md:text-base text-zinc-400 leading-relaxed space-y-2 list-disc pl-5 md:pl-6 md:text-left">
                      <li>Simplifying plans, pricing, and communication</li>
                      <li>Introducing conversational, human‑first interfaces (like Bharat)</li>
                      <li>Leveraging trust instead of competing on price</li>
                      <li>Designing for real India across languages and access levels</li>
                    </ul>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center gap-4 mt-4 text-zinc-600 text-xs font-black uppercase tracking-[0.4em]">
                  <span>Get</span>
                  <span className="text-zinc-700">→</span>
                  <span>To</span>
                  <span className="text-zinc-700">→</span>
                  <span>By</span>
                </div>
              </div>
            </section>

            {/* Ideations */}
            <section className="space-y-10">
              <div className="max-w-4xl space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Ideations</h2>
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed font-semibold">
                  “BSNL doesn’t need to become Airtel or Jio. It needs to become BSNL 2.0 — smart, grounded, and human‑first.”
                </p>
                <p className="text-sm md:text-base text-zinc-400">
                  <span className="font-black text-zinc-200">Problem:</span> Low visibility + outdated perception
                </p>
                <p className="text-sm md:text-base text-zinc-400">
                  The idea was to modernize BSNL without erasing what already makes it valuable.
                </p>
              </div>

              <div className="rounded-[48px] border border-white/10 bg-white/[0.02] p-8 md:p-12 space-y-10">
                <div className="max-w-4xl">
                  <div className="p-8 md:p-10 rounded-[32px] border border-white/10 bg-white/[0.04]">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-3">The core advantage</div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">Trust</h3>
                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                      BSNL still holds trust, especially among legacy and regional users. This became the foundation of the repositioning strategy.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-stretch">
                    <div className="p-7 rounded-[28px] border border-white/10 bg-white/[0.03]">
                      <div className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-2">Make BSNL easier to use</div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Tech</h4>
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                        GenAI support, UX redesign, conversational journeys, and plan personalization.
                      </p>
                    </div>
                    <div className="p-7 rounded-[28px] border border-white/10 bg-white/[0.03]">
                      <div className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-2">Make BSNL feel more relevant</div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Tone</h4>
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                        Speak Gen Z, stay Bharat through a modern but grounded brand voice.
                      </p>
                    </div>
                    <div className="p-7 rounded-[28px] border border-white/10 bg-white/[0.03]">
                      <div className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 mb-2">Make BSNL feel meant for someone</div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">Tribe</h4>
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                        Focus on creators, students, loyalists, and underserved users instead of trying to appeal to everyone.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-zinc-400">
                  Together, these levers shaped a repositioning strategy that made BSNL more usable, visible, and culturally relevant.
                </p>
              </div>
            </section>

            {/* How the Strategy Translates */}
            <section className="space-y-10">
              <div className="max-w-4xl space-y-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">How the Strategy Translates</h2>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold">
                  Each pillar drives a set of focused actions across product, communication, and distribution
                </p>
              </div>

              <div className="max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Trust</div>
                  <ul className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-2 list-disc pl-5">
                    <li>SIM unboxing, legacy storytelling</li>
                    <li>“Your Data Stays in India” campaign</li>
                    <li>Cybersecurity awareness series</li>
                    <li>Social media activation</li>
                  </ul>
                </div>

                <div className="rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Tech</div>
                  <ul className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-2 list-disc pl-5">
                    <li>Simplified plans + clear summaries</li>
                    <li>Native language UI</li>
                    <li>“Senior Mode” + voice interface</li>
                    <li>Bharat (WhatsApp assistant)</li>
                    <li>Spam control + proactive reminders</li>
                  </ul>
                </div>

                <div className="rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Tone</div>
                  <ul className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-2 list-disc pl-5">
                    <li>Gen Z‑friendly but grounded communication</li>
                    <li>Meme‑aware, culturally rooted storytelling</li>
                    <li>Creator partnerships</li>
                    <li>Regional content</li>
                  </ul>
                </div>

                <div className="rounded-[18px] bg-white/[0.04] border border-white/10 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">Tribe</div>
                  <ul className="text-sm md:text-base text-zinc-300 leading-relaxed space-y-2 list-disc pl-5">
                    <li>Rural saleswomen + kirana partnerships</li>
                    <li>Education bundles + student packs</li>
                    <li>Port‑in offers targeting segments</li>
                    <li>Device ecosystem (dongles + keypad phones)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Strategy Classification: Cost vs Impact */}
            <section className="space-y-10">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Strategy Classification: Cost v/s Impact</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 items-stretch">
                <div className="hidden md:block"></div>
                <div className="text-sm font-black uppercase tracking-widest text-zinc-500 text-center">Low Cost</div>
                <div className="text-sm font-black uppercase tracking-widest text-zinc-500 text-center">High Cost</div>

                <div className="hidden md:flex items-center justify-center text-sm font-black uppercase tracking-widest text-zinc-500">
                  <span className="rotate-[-90deg] origin-center">Low Impact</span>
                </div>
                <div className="rounded-[18px] p-6 bg-[#b9c26a]/20 border border-[#b9c26a]/40 h-full">
                  <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                    <li>Cybersecurity email series</li>
                    <li>LinkedIn job hiring posts</li>
                    <li>DND toggle features in app</li>
                    <li>App-only spam blocker</li>
                  </ul>
                </div>
                <div className="rounded-[18px] p-6 bg-[#a7c7ff]/20 border border-[#a7c7ff]/40 h-full">
                  <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                    <li>Real-time doubt-solving with professional tutors</li>
                    <li>Micro-loans for prepaid recharge</li>
                    <li>BSNL marketplace inside the app</li>
                    <li>Full OTT bundling (Disney+, Netflix, etc.)</li>
                    <li>Loyalty programs with 3rd-party coupons (Amazon, Flipkart)</li>
                  </ul>
                </div>

                <div className="hidden md:flex items-center justify-center text-sm font-black uppercase tracking-widest text-zinc-500">
                  <span className="rotate-[-90deg] origin-center">High Impact</span>
                </div>
                <div className="rounded-[18px] p-6 bg-[#f2c49b]/25 border border-[#f2c49b]/50 h-full">
                  <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                    <li>Social media storytelling (trust, unboxing, SIM legacy)</li>
                    <li>Mascot introduction (Signal Singh)</li>
                    <li>Regional festival offers</li>
                    <li>“Your data stays in India” narrative</li>
                    <li>Night data boosters for students</li>
                    <li>Native language UI + “Senior Mode”</li>
                    <li>Proactive WhatsApp support + recharge reminders</li>
                    <li>Twitter + LinkedIn brand updates</li>
                  </ul>
                </div>
                <div className="rounded-[18px] p-6 bg-[#ff9aa2]/20 border border-[#ff9aa2]/40 h-full">
                  <ul className="space-y-2 text-sm text-zinc-200 list-disc pl-5">
                    <li>BSNL Pay digital wallet + UPI gateway</li>
                    <li>Online BSNL University</li>
                    <li>AI financial advisor for telecom budgeting</li>
                    <li>BSNL dongles & keypad phones with student bundles</li>
                    <li>WhatsApp chatbot with voice, eKYC, plan optimization</li>
                    <li>Creator partnerships, rural content grants</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prototypes */}
            <section className="py-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">Prototypes</h2>
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    These prototypes explore how the strategy translates into real user interactions and service experiences.
                  </p>
                  <p className="text-sm md:text-base text-zinc-400">
                    “From strategy to experience — here’s how BSNL becomes usable”
                  </p>
                  <p className="text-sm text-zinc-400">
                    Designed to simplify recharge, support, and onboarding journeys.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://www.figma.com/design/eWPd5da2R0TAQfYtFP5dF8/BSNL-whatsapp-chatbot?node-id=0-1&t=LH8YBRd5JbNSFOC0-1"
                      className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white hover:opacity-70 transition-opacity w-[520px] justify-between"
                    >
                      <span>Explore the full prototype on Figma</span>
                      <ArrowRight size={16} className="shrink-0" />
                    </a>
                    <a
                      href="https://www.figma.com/make/F5UjMEU9MOCOlV82DxlD6T/Khushi---Piyush-Collaboration-FM-BSNL-app--Copy-?t=34z5jtw7tpwiani2-1"
                      className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white hover:opacity-70 transition-opacity w-[520px] justify-between"
                    >
                      <span>Explore the WhatsApp chatbot prototype on Figma</span>
                      <ArrowRight size={16} className="shrink-0" />
                    </a>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end lg:pr-24">
                  <div className="[perspective:1200px]">
                    <div
                      className="relative w-[260px] h-[520px] md:w-[300px] md:h-[600px] rounded-[40px] border border-white/25 ring-1 ring-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-white/[0.01] shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
                      style={{ transform: "rotateY(-10deg) rotateX(5deg)" }}
                    >
                      <div className="absolute inset-[10px] rounded-[32px] bg-white border border-zinc-200/80">
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white via-white to-zinc-100/80"></div>
                        <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]"></div>
                        <div className="relative z-10 h-full w-full flex items-center justify-center">
                          <img
                            src={bsnlLogoAlt}
                            alt="BSNL logo"
                            className="w-48 h-48 object-contain drop-shadow-[0_0_20px_rgba(13,79,170,0.2)]"
                          />
                        </div>
                      </div>
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-white/20"></div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/60 blur-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Implementation Roadmap */}
            <section className="space-y-10 pb-10">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">
                  Implementation Roadmap <span className="whitespace-nowrap">(24 Months)</span>
                </h2>
                <p className="text-zinc-500 uppercase text-[10px] tracking-[0.4em] font-bold mt-2">
                  A phased rollout to transition BSNL from legacy perception to active relevance
                </p>
              </div>

              <div className="relative">
                <div className="hidden lg:block absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px bg-white/10"></div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="p-7 rounded-[28px] border border-emerald-500/30 bg-white/[0.03]">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300 mb-2">
                      Phase 1 — Visibility &amp; Trust
                      <span className="block text-[10px] tracking-[0.25em] text-emerald-200 mt-1">(0–6 Months)</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      Make BSNL visible again and reintroduce what it stands for
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc pl-5">
                      <li>Trust‑led storytelling (SIM unboxing, legacy users, infrastructure)</li>
                      <li>“Your Data Stays in India” campaign</li>
                      <li>Cybersecurity awareness content</li>
                      <li>Social media activation (Twitter, LinkedIn, Instagram)</li>
                      <li>Regional + festive offers</li>
                      <li>Basic proactive communication (SMS / WhatsApp reminders)</li>
                    </ul>
                    <p className="text-xs text-emerald-200 mt-4">
                      Outcome: BSNL becomes visible, understandable, and top‑of‑mind again
                    </p>
                  </div>

                  <div className="p-7 rounded-[28px] border border-yellow-500/30 bg-white/[0.03]">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-yellow-300 mb-2">
                      Phase 2 — Clarity &amp; Access
                      <span className="block text-[10px] tracking-[0.25em] text-yellow-200 mt-1">(6–12 Months)</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      Reduce friction and make BSNL easier to use
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc pl-5">
                      <li>Simplified plan structures + clear summaries</li>
                      <li>Native language UI</li>
                      <li>“Senior Mode” (large text, voice assistance, simplified flows)</li>
                      <li>Night data boosters for students</li>
                      <li>Spam control (DND toggle, spam blocker)</li>
                      <li>Improved recharge and support flows</li>
                    </ul>
                    <p className="text-xs text-yellow-200 mt-4">
                      Outcome: BSNL becomes easier to navigate and more reliable in everyday use
                    </p>
                  </div>

                  <div className="p-7 rounded-[28px] border border-orange-500/30 bg-white/[0.03]">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-300 mb-2">
                      Phase 3 — Adoption &amp; Expansion
                      <span className="block text-[10px] tracking-[0.25em] text-orange-200 mt-1">(12–18 Months)</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      Drive adoption and create stronger reasons to choose BSNL
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc pl-5">
                      <li>Bharat (WhatsApp assistant for recharge, support, plans)</li>
                      <li>BSNL Pay (UPI, cashback, low‑data payments)</li>
                      <li>Education bundles + BSNL University</li>
                      <li>Rural distribution (kirana + assisted onboarding)</li>
                      <li>Port‑in offers targeting competitor users</li>
                    </ul>
                    <p className="text-xs text-orange-200 mt-4">
                      Outcome: BSNL becomes easier to adopt and more useful in daily life
                    </p>
                  </div>

                  <div className="p-7 rounded-[28px] border border-red-500/30 bg-white/[0.03]">
                    <div className="text-[11px] font-black uppercase tracking-[0.3em] text-red-300 mb-2">
                      Phase 4 — Ecosystem &amp; Retention
                      <span className="block text-[10px] tracking-[0.25em] text-red-200 mt-1">(18–24 Months)</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      Build long‑term engagement and sustained relevance
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc pl-5">
                      <li>AI‑based plan recommendations + financial advisor</li>
                      <li>BSNL marketplace (services + add‑ons)</li>
                      <li>OTT bundling partnerships</li>
                      <li>Loyalty programs + rewards ecosystem</li>
                      <li>Creator partnerships + regional content</li>
                    </ul>
                    <p className="text-xs text-red-200 mt-4">
                      Outcome: BSNL evolves into a connected service ecosystem
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm md:text-base text-zinc-400">
                This roadmap focuses on rebuilding perception first, then improving usability, and finally expanding into a long‑term ecosystem.
              </p>
            </section>

            {/* Future Steps & Learnings */}
            <section className="space-y-10 pb-10">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Future Steps & Learnings</h2>
              </div>
              <div className="max-w-4xl space-y-10 text-lg md:text-xl text-zinc-300 leading-relaxed">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-100 mb-4">Future Steps:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Conduct usability testing with Gen Z, rural, and senior user groups</li>
                    <li>Build a working prototype of the WhatsApp bot and BSNL “Bharat” experience</li>
                    <li>Collaborate with the tech team to pilot MVP features (e.g., student packs, chat‑based recharge)</li>
                    <li>Roll out localized campaigns with on‑ground partnerships in Tier 2/3 towns</li>
                    <li>Define KPIs to measure retention, NPS, and activation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-100 mb-4">Learnings:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Strategy is not about flash — it’s about clarity, empathy, and fit</li>
                    <li>BSNL doesn’t need to become like others — it needs to become more like itself</li>
                    <li>Cultural grounding + tech intuition is the key to long‑term revival</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : isRaahi ? (
          <div className="space-y-32">
            {/* Setting the Stage */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Setting the Stage</h2>
              </div>
              <div className="max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>
                  Traveling is more than moving from one place to another — it’s about shared stories, connections, and meaningful experiences. Yet, most travel platforms today offer generic itineraries and overcrowded tourist spots, leaving little room for authentic discovery.
                </p>
                <p>
                  <span className="font-black text-zinc-100">Raahi</span> is a mobile travel companion designed to inspire families, solo travelers, and groups to explore offbeat destinations safely and meaningfully. The app personalises journeys for diverse age groups and interests, combining curated itineraries, community‑driven content, and seamless planning tools.
                </p>
              </div>
            </section>

            {/* The Challenge */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">The Challenge</h2>
              <div className="max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-5">
                <p>
                  Current travel apps overload users with information, focusing on <span className="font-black text-zinc-100">mainstream destinations and rigid itineraries</span>. They fail to address the needs of:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-black text-zinc-100">Families</span> with diverse preferences across generations.</li>
                  <li><span className="font-black text-zinc-100">Solo travelers</span> seeking safe, authentic experiences.</li>
                  <li><span className="font-black text-zinc-100">Explorers</span> who want flexibility without losing structure.</li>
                </ul>
                <p>
                  As a result, travelers are forced to juggle between blogs, reviews, and apps to piece together a trip that actually suits them.
                </p>
              </div>
            </section>

            {/* Problem Statement */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto border border-white/10 rounded-[28px] px-8 md:px-16 py-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Problem Statement</h2>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  Current travel apps push generic, crowded itineraries, leaving families without safe, unique discoveries.
                </p>
              </div>
            </section>

            {/* Objectives & Goals */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Objectives & Goals</h2>
              <div className="max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                <p className="mb-4 text-zinc-400">Our App aims to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Help users discover unique, lesser‑known destinations.</li>
                  <li>Create personalized itineraries tailored to group or individual interests.</li>
                  <li>Build trust through community‑driven storytelling and local insights.</li>
                  <li>Offer a seamless, visually engaging, and intuitive travel‑planning experience.</li>
                </ul>
              </div>
            </section>

            {/* Unpacking the Travel Struggles */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Unpacking the Travel Struggles</h2>
              <p className="text-lg md:text-xl text-zinc-400">
                Explain your research in detail with observations and inferences
              </p>
              <div className="max-w-4xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Observations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Group travel planning is <span className="font-black text-zinc-100">time‑consuming and stressful.</span></li>
                  <li>Existing apps cater to logistics (flights, hotels) but <span className="font-black text-zinc-100">not personalization.</span></li>
                  <li>Flexibility, safety, and cultural authenticity are top priorities.</li>
                </ul>
              </div>
            </section>

            {/* Competitor Analysis */}
            <section className="space-y-10">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Competitor Analysis</h2>
              </div>

              <div className="overflow-x-auto border border-white/10 rounded-[20px]">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] uppercase font-black tracking-widest text-zinc-500">
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">App/Website</th>
                      <th className="py-4 px-4">Overview</th>
                      <th className="py-4 px-4">Key Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-zinc-300">
                    <tr>
                      <td className="py-4 px-4">Solo Travel Apps</td>
                      <td className="py-4 px-4">Tripoto</td>
                      <td className="py-4 px-4">Travel planning and itinerary sharing platform.</td>
                      <td className="py-4 px-4">Personalized trip planning, community sharing, access to bookings.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">ixigo</td>
                      <td className="py-4 px-4">Travel search and booking aggregator for flights, hotels, etc.</td>
                      <td className="py-4 px-4">Real‑time prices, user reviews, transport and accommodation integration.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">Travel Buddy</td>
                      <td className="py-4 px-4">Social platform for solo travelers to meet and connect.</td>
                      <td className="py-4 px-4">Platform for connecting with fellow travelers, trip planning and sharing.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">TripBFF</td>
                      <td className="py-4 px-4">Helps solo travelers find companions based on shared interests.</td>
                      <td className="py-4 px-4">AI‑generated itineraries, trip sharing, community interaction.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">Going Solo</td>
                      <td className="py-4 px-4">Meet and connect with solo travelers globally.</td>
                      <td className="py-4 px-4">Join local groups, connect with travelers, share trip plans.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Family Travel Apps</td>
                      <td className="py-4 px-4">MakeMyTrip</td>
                      <td className="py-4 px-4">Comprehensive platform for flights, hotels, and holiday packages.</td>
                      <td className="py-4 px-4">Family‑friendly holiday packages, user reviews, 24/7 customer support.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">Goibibo</td>
                      <td className="py-4 px-4">Aggregates travel services such as flights, hotels, and buses.</td>
                      <td className="py-4 px-4">Family discounts, detailed accommodation info, easy booking process.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">Yatra</td>
                      <td className="py-4 px-4">Travel agency providing a range of services for holiday planning.</td>
                      <td className="py-4 px-4">Customizable family packages, travel guides, secure payment gateway.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">Cleartrip</td>
                      <td className="py-4 px-4">Travel service platform for booking flights, hotels, and trains.</td>
                      <td className="py-4 px-4">Exclusive family offers, simple interface for trip planning, multiple provider integration.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">TripIt</td>
                      <td className="py-4 px-4">Itinerary management app.</td>
                      <td className="py-4 px-4">Centralized itinerary, real‑time updates, easy sharing of plans.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">Personalized Exploration Apps</td>
                      <td className="py-4 px-4">HolidayIQ</td>
                      <td className="py-4 px-4">India‑centric travel app for discovering destinations and booking services.</td>
                      <td className="py-4 px-4">2,000+ cities, 60,000+ landmarks, authentic reviews, hotel and homestay booking options.</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4"></td>
                      <td className="py-4 px-4">AudioCompass</td>
                      <td className="py-4 px-4">Audio guides for tourist destinations in India.</td>
                      <td className="py-4 px-4">Offline access, detailed audio tours, multilingual support.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="max-w-4xl space-y-3 text-sm md:text-base text-zinc-300">
                <p><span className="font-black text-zinc-100">MakeMyTrip, Goibibo, Yatra</span> → Strong in booking, weak in personalization.</p>
                <p><span className="font-black text-zinc-100">Tripoto, TripBFF</span> → Focused on solo travelers, community aspects.</p>
                <p><span className="font-black text-zinc-100">HolidayIQ, AudioCompass</span> → Exploration‑based, but lack integration.</p>
                <p className="pt-2"><span className="font-black text-zinc-100">Insight:</span> No single platform addresses family needs, personalization, and authentic local experiences together.</p>
              </div>
            </section>

            {/* Meet Our Travelers */}
            <section className="space-y-12">
              <div className="max-w-4xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Meet Our Travelers</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase tracking-tight">User Persona 1</h3>
                  <div className="p-6 rounded-[24px] border border-white/10 bg-white/[0.02] text-center">
                    <img
                      src={raahiPersonaOne}
                      alt="Aarav Desai persona avatar"
                      className="w-28 h-28 mx-auto rounded-full border border-white/10 mb-4 object-cover"
                    />
                    <div className="text-xl font-black text-zinc-100">Aarav Desai</div>
                    <div className="text-sm text-zinc-400">The Explorer</div>
                    <div className="mt-6 text-left text-sm text-zinc-300 space-y-2">
                      <div><span className="font-black text-zinc-100">Age:</span> 27</div>
                      <div><span className="font-black text-zinc-100">Location:</span> Bengaluru, India</div>
                      <div><span className="font-black text-zinc-100">Role:</span> UX Designer</div>
                      <div><span className="font-black text-zinc-100">Status:</span> Employee</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Needs</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>A smart, minimal‑effort itinerary generator based on specific interests (e.g. “heritage + nature + local art”).</li>
                      <li>Solo travel safety tips integrated with travel plans.</li>
                      <li>Community stories or reflections from similar solo travelers.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Goals</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>Discover offbeat places that align with his interests.</li>
                      <li>Have meaningful solo experiences, especially over long weekends.</li>
                      <li>Avoid overcrowded tourist traps.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Pain Points</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>Existing apps recommend popular places, not tailored to niche interests.</li>
                      <li>Overwhelmed with blog‑hopping for planning.</li>
                      <li>Wants a flexible itinerary but with a sense of structure.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 pt-10 border-t border-white/10">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase tracking-tight">User Persona 2</h3>
                  <div className="p-6 rounded-[24px] border border-white/10 bg-white/[0.02] text-center">
                    <img
                      src={raahiPersonaTwo}
                      alt="Pooja Nair persona avatar"
                      className="w-28 h-28 mx-auto rounded-full border border-white/10 mb-4 object-cover"
                    />
                    <div className="text-xl font-black text-zinc-100">Pooja Nair</div>
                    <div className="text-sm text-zinc-400">The Caregiver</div>
                    <div className="mt-6 text-left text-sm text-zinc-300 space-y-2">
                      <div><span className="font-black text-zinc-100">Age:</span> 41</div>
                      <div><span className="font-black text-zinc-100">Location:</span> Pune, India</div>
                      <div><span className="font-black text-zinc-100">Role:</span> HR Manager</div>
                      <div><span className="font-black text-zinc-100">Status:</span> Employee</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Needs</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>A smart, minimal‑effort itinerary generator based on specific interests (e.g. “heritage + nature + local art”).</li>
                      <li>Solo travel safety tips integrated with travel plans.</li>
                      <li>Community stories or reflections from similar solo travelers.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Goals</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>Discover offbeat places that align with his interests.</li>
                      <li>Have meaningful solo experiences, especially over long weekends.</li>
                      <li>Avoid overcrowded tourist traps.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest mb-3">Pain Points</h4>
                    <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                      <li>Existing apps recommend popular places, not tailored to niche interests.</li>
                      <li>Overwhelmed with blog‑hopping for planning.</li>
                      <li>Wants a flexible itinerary but with a sense of structure.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Learned */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">What We Learned</h2>
              <ol className="list-decimal pl-6 space-y-2 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-4xl">
                <li>Travel is about stories and memories, not just places.</li>
                <li>Personalization should consider multiple travelers in a group.</li>
                <li>Community voices (local guides, other families) create trust.</li>
                <li>Seamless integration with tools (maps, expense sharing) improves usability.</li>
              </ol>
            </section>

            {/* Shaping the Experience */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Shaping the Experience</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                <p className="font-black text-zinc-100 mb-4">Core Features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-black text-zinc-100">Smart Itinerary Generator</span> → Creates trips based on interests (e.g., heritage + nature + local art).</li>
                  <li><span className="font-black text-zinc-100">Group Voting System</span> → Families/ friends vote on plans to decide together.</li>
                  <li><span className="font-black text-zinc-100">AI Travel Assistant</span> → Offers suggestions, reminders, and safety tips.</li>
                  <li><span className="font-black text-zinc-100">Community Content</span> → Stories, reviews, and reflections from real travelers.</li>
                  <li><span className="font-black text-zinc-100">Integrated Tools</span> → Google Maps, Splitwise, local guides.</li>
                </ul>
              </div>
            </section>

            {/* Blue Sky Thinking */}
            <section className="space-y-10">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Blue Sky Thinking</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Storytelling", "AI Chat", "Comments", "Offline Save", "Mobile tracker", "Plugins", "The Bright Effect", "Widgets", "API/Web-hooks", "Community Chat"].map((item, i) => (
                  <div key={i} className="rounded-full border border-white/30 px-8 py-5 text-center text-lg md:text-xl text-zinc-200 bg-white/[0.03]">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* Mapping the Journey */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Mapping the Journey</h2>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center rounded-[24px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-zinc-400">User Flows</p>
                  <p className="text-sm md:text-base text-zinc-500 max-w-md leading-relaxed">
                    A high-level view of how users move through the Raahi product journey, from onboarding to planning and shared travel experiences.
                  </p>
                  <p className="text-sm md:text-base text-zinc-300 max-w-md break-words">
                    https://www.figma.com/board/SlINHxCvj6NAwNCrP6WMbQ/Travel-App?node-id=0-1&t=svee5QJPVFfT2uu4-1
                  </p>
                </div>
                <img
                  src={raahiUserFlow}
                  alt="Raahi user flow diagram"
                  className="w-full max-h-[70vh] rounded-[16px] border border-white/10 object-contain justify-self-end"
                />
              </div>
            </section>

            {/* Task Flow */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Task Flow</h2>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center rounded-[24px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-zinc-400">Task Flow</p>
                  <p className="text-sm md:text-base text-zinc-500 max-w-md leading-relaxed">
                    A closer look at how users move through specific tasks, decisions, and interactions within the Raahi experience.
                  </p>
                  <p className="text-sm md:text-base text-zinc-300 max-w-md break-words">
                    https://www.figma.com/board/SlINHxCvj6NAwNCrP6WMbQ/Travel-App?node-id=0-1&t=svee5QJPVFfT2uu4-1
                  </p>
                </div>
                <img
                  src={raahiTaskFlow}
                  alt="Raahi task flow diagram"
                  className="w-full max-h-[70vh] rounded-[16px] border border-white/10 object-contain justify-self-end"
                />
              </div>
            </section>

            {/* Design Language & Feel */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Design Language & Feel</h2>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center rounded-[24px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-zinc-400">Mood Board</p>
                  <p className="text-sm md:text-base text-zinc-500 max-w-md leading-relaxed">
                    A visual direction exploring tone, color, interface cues, and the overall travel experience language for Raahi.
                  </p>
                </div>
                <img
                  src={raahiMoodBoardCopy}
                  alt="Raahi mood board"
                  className="w-full max-h-[70vh] rounded-[16px] border border-white/10 object-contain justify-self-end"
                />
              </div>
            </section>

            {/* Story Board */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Story Board</h2>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center rounded-[24px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-zinc-400">A Journey for Everyone</p>
                  <p className="text-sm md:text-base text-zinc-500 max-w-md leading-relaxed">
                    A storyboard showing how Raahi supports travelers through planning, discovery, and shared decision-making.
                  </p>
                </div>
                <img
                  src={raahiMoodBoard}
                  alt="Raahi storyboard"
                  className="w-full max-h-[70vh] rounded-[16px] border border-white/10 object-contain justify-self-end"
                />
              </div>
            </section>

            {/* Our Guiding Philosophy */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Our Guiding Philosophy</h2>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-4xl">
                “Raahi is not just a travel app — it’s a trusted companion that transforms journeys into shared stories, helping families and explorers discover the unseen with confidence.”
              </p>
            </section>

            {/* Bringing Raahi to Life */}
            <section className="space-y-10">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Bringing Raahi to Life</h2>
              <div className="space-y-10">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <img
                    src={raahiLoginScreens}
                    alt="Raahi login screens"
                    className="w-full max-h-[80vh] rounded-[20px] object-contain"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 text-center">
                  Login Screens
                </p>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <img
                    src={raahiSignUpScreens}
                    alt="Raahi sign up screens"
                    className="w-full max-h-[80vh] rounded-[20px] object-contain"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 text-center">
                  Sign Up Screens
                </p>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <img
                    src={raahiPreferenceScreens}
                    alt="Raahi preference screens"
                    className="w-full max-h-[80vh] rounded-[20px] object-contain"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 text-center">
                  Preference Screens
                </p>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <img
                    src={raahiPlanningTrip}
                    alt="Raahi travel planning screens"
                    className="w-full max-h-[80vh] rounded-[20px] object-contain"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 text-center">
                  Travel Planning Screens
                </p>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-4 md:p-6">
                  <img
                    src={raahiHomePages}
                    alt="Raahi home page screens"
                    className="w-full max-h-[80vh] rounded-[20px] object-contain"
                  />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 text-center">
                  Home Page Screens
                </p>
              </div>
            </section>

          </div>
        ) : isVoia ? (
          <div className="space-y-24">
            {/* What’s the Real Challenge */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">What’s the Real Challenge?</h2>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-5xl">
                Deaf and mute students face significant challenges in receiving and responding to instructions in classroom environments due to their dependence on visual cues. This reliance restricts their ability to stay engaged, act independently, and communicate seamlessly during activities or transitions, hindering inclusivity and learning outcomes.
              </p>
            </section>

            {/* Objectives and Goals */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Objectives and Goals</h2>
              <ul className="list-disc pl-6 space-y-4 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-5xl">
                <li>Enable real‑time communication between teachers and deaf/mute students without relying solely on vision.</li>
                <li>Develop an inclusive, accessible, and discreet notification system.</li>
                <li>Promote independence and equal engagement for differently‑abled students in educational settings.</li>
                <li>Ensure the device is child‑friendly, easy to use, and doesn’t require extensive teacher training.</li>
              </ul>
            </section>

            {/* Through Our Eyes: Key Observations */}
            <section className="space-y-10">
              <div className="max-w-5xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Through Our Eyes: Key Observations</h2>
                <p className="text-lg md:text-xl text-zinc-400 mt-4">
                  To research further on the topic, we visited <span className="font-black text-zinc-200">Aadhar Mook Badhir Vidyalaya</span> to meet the children and the teachers there to get their insights.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-none">
                <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-lg text-zinc-300 leading-relaxed">
                  Students often missed cues and instructions unless they were visually engaged.
                </div>
                <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-lg text-zinc-300 leading-relaxed">
                  Attention and discipline were hard to maintain during group activities.
                </div>
                <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-lg text-zinc-300 leading-relaxed">
                  Teachers faced challenges in grabbing the attention of all students during active lessons.
                </div>
                <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-lg text-zinc-300 leading-relaxed">
                  Some students showed excellent engagement through tactile and visual learning methods.
                </div>
                <div className="p-6 rounded-[24px] bg-white/[0.03] border border-white/10 text-lg text-zinc-300 leading-relaxed lg:col-span-2">
                  Communication gaps between teachers and students led to reduced classroom responsiveness.
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[20px] border border-white/10 bg-white/[0.02] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500"
                  >
                    Photo {i + 1}
                  </div>
                ))}
              </div>
            </section>

            {/* The Thread That Ties It Together */}
            <section className="space-y-6">
              <div className="max-w-5xl mx-auto border border-white/20 bg-white/[0.04] rounded-[28px] px-8 md:px-12 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 text-center text-amber-200">The Thread That Ties It Together</h2>
                <p className="text-lg md:text-xl text-zinc-200 leading-relaxed">
                  Design a compact, wearable communication device that uses vibrations and LED signals to transmit classroom cues, helping deaf and mute students stay connected and responsive without visual dependence.
                </p>
              </div>
            </section>

            {/* Getting the Real Picture / What the World Already Knows */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Getting the Real Picture</h2>
                  <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                    <li>Field visits to Aadhar Mook Badhir Vidyalaya</li>
                    <li>Observing classroom behaviors, attention patterns, and interaction modes</li>
                    <li>Informal interviews with special educators and students</li>
                    <li>Noting response gaps and current solutions (like hand gestures or visual boards)</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">What the World Already Knows</h2>
                  <ul className="list-disc pl-6 space-y-2 text-lg text-zinc-300">
                    <li>Analysis of existing assistive devices (hearing aids, tactile alerts)</li>
                    <li>Studies on communication patterns in deaf/mute education</li>
                    <li>Design precedents in haptic feedback systems</li>
                    <li>Research on cognitive and emotional needs of differently‑abled children</li>
                  </ul>
                </div>

              </div>

              <div className="relative h-[520px] hidden lg:block">
                <div className="absolute right-6 top-0 rotate-[6deg] bg-white p-3 shadow-2xl">
                  <div className="w-48 h-32 bg-gradient-to-br from-zinc-300/70 via-zinc-200/80 to-zinc-400/60" />
                </div>
                <div className="absolute right-10 top-36 rotate-[-4deg] bg-white p-3 shadow-2xl">
                  <div className="w-44 h-36 bg-gradient-to-br from-zinc-200/70 via-zinc-300/80 to-zinc-500/60" />
                </div>
                <div className="absolute right-2 top-72 rotate-[8deg] bg-white p-3 shadow-2xl">
                  <div className="w-44 h-36 bg-gradient-to-br from-zinc-400/70 via-zinc-300/80 to-zinc-200/60" />
                </div>
                <div className="absolute right-12 top-[420px] rotate-[-6deg] bg-white p-3 shadow-2xl">
                  <div className="w-44 h-32 bg-gradient-to-br from-zinc-300/70 via-zinc-200/80 to-zinc-400/60" />
                </div>
              </div>
            </section>

            {/* Meet the Learner */}
            <section className="mt-10 -mx-6 md:-mx-12">
              <div className="border border-white/10 rounded-[24px] p-10 bg-white/[0.02] w-full max-w-none">
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-36 h-36 rounded-[24px] bg-white/10 flex items-center justify-center text-zinc-500 text-xs font-black uppercase">
                      Illustration
                    </div>
                    <div className="mt-6 text-left text-sm text-zinc-300 space-y-2 w-full">
                      <div><span className="font-black text-zinc-100">Name:</span> Riya</div>
                      <div><span className="font-black text-zinc-100">Age:</span> 9 years</div>
                      <div><span className="font-black text-zinc-100">Occupation:</span> Student</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Meet the Learner: Riya’s World</h2>
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">A Glimpse into Her Life</h3>
                      <p className="text-lg text-zinc-300 leading-relaxed">
                        Riya is a bright and curious 9‑year‑old who has been deaf and mute since birth. She communicates primarily through expressive gestures and sign language. Though she faces challenges in receiving instructions when not directly looking at the teacher, she compensates with a strong visual memory and tactile intelligence. Riya especially enjoys puzzles and hands‑on activities that allow her to explore and learn through interaction.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">Where She Struggles</h4>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>Misses out on instructions or alerts when not visually focused on the teacher</li>
                          <li>Struggles during sudden changes or transitions</li>
                          <li>Needs constant visual contact to stay engaged and informed</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">What She Hopes For</h4>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>To feel more independent in her learning environment</li>
                          <li>To interact more confidently with peers and teachers</li>
                          <li>To experience learning in ways that embrace her visual and tactile strengths</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Behind the Chalkboard */}
            <section className="mt-10 -mx-6 md:-mx-12">
              <div className="border border-white/10 rounded-[24px] p-10 bg-white/[0.02] w-full max-w-none">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
                  Behind the Chalkboard: Meet Mrs. Anita Sharma
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-48 h-48 rounded-[24px] bg-white/10 flex items-center justify-center text-zinc-500 text-xs font-black uppercase">
                      Illustration
                    </div>
                    <div className="mt-6 text-left text-sm text-zinc-300 space-y-2 w-full">
                      <div><span className="font-black text-zinc-100">Name:</span> Mrs. Anita Sharma</div>
                      <div><span className="font-black text-zinc-100">Age:</span> 42 years</div>
                      <div><span className="font-black text-zinc-100">Occupation:</span> Teacher</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">Her Story</h3>
                      <p className="text-lg text-zinc-300 leading-relaxed">
                        Mrs. Anita Sharma is a dedicated special educator with over 15 years of experience working with differently‑abled children. Passionate about inclusive education, she communicates fluently in sign language and integrates visual cues into her teaching methods. Despite her experience, she often finds it challenging to quickly grab the attention of all students—especially during emergencies or activity transitions. Her mission is to help students like Riya grow more independent in both learning and day‑to‑day functioning.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">Challenges in Classroom</h4>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>Difficulty alerting students during transitions or emergencies</li>
                          <li>Struggles to maintain students’ attention without direct visual contact</li>
                          <li>Adapting tools for each child’s needs can be time‑consuming</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-widest text-zinc-200 mb-2">Her Aspirations</h4>
                        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                          <li>Create a more responsive and accessible classroom</li>
                          <li>Foster student independence and confidence</li>
                          <li>Explore tools that support seamless non‑verbal communication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Research Blueprint */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Research Blueprint: Listening Beyond Hearing</h2>
              <p className="text-lg md:text-xl text-zinc-400 max-w-5xl">
                Our research plan outlines the strategic approach we followed to deeply understand the classroom challenges faced by deaf‑mute students and their educators, paving the way for an empathetic design solution.
              </p>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[16/9] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Research Blueprint Diagram [Placeholder]
                </div>
              </div>
            </section>

            {/* Storyboard: Communicating Beyond Words */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Storyboard: Communicating Beyond Words</h2>
              <p className="text-lg md:text-xl text-zinc-400 max-w-5xl">
                This storyboard illustrates a typical classroom moment where VOIA bridges the communication gap between a deaf‑mute student and her teacher, transforming confusion into clarity with a simple signal.
              </p>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[16/9] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Storyboard Panels [Placeholder]
                </div>
              </div>
            </section>

            {/* Patterns We Found */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Patterns We Found</h2>
              <p className="text-lg md:text-xl text-zinc-400 max-w-5xl">
                To make sense of our observations, we organized user insights into themes using an affinity map. This helped us uncover patterns, needs, and opportunities that guided our design direction.
              </p>
              <p className="text-sm md:text-base text-zinc-300 max-w-5xl">
                https://www.figma.com/board/dbSlkJXOVSabJh9wjGoO6/design-thinking-and-processes?node-id=0-1&t=lydcuzS8HvFAtx2P-1
              </p>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[16/9] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Affinity Map [Placeholder]
                </div>
              </div>
            </section>

            {/* Diverge Before You Converge */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Diverge Before You Converge</h2>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[4/5] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Concept Exploration Grid [Placeholder]
                </div>
              </div>
            </section>

            {/* Sketch. Shape. Shift. */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Sketch. Shape. Shift.</h2>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[4/5] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Form Explorations [Placeholder]
                </div>
              </div>
            </section>

            {/* Here’s What We Built */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Here’s What We Built</h2>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <div className="aspect-[3/4] bg-white/5 rounded-[16px] flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Prototype Render + Notes [Placeholder]
                </div>
              </div>
            </section>
          </div>
        ) : isSolar ? (
          <div className="space-y-24">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Overview</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>
                  India has vast rooftop solar potential, especially within urban housing societies. Yet adoption at the community level remains slow.
                </p>
                <p>
                  SolarLink is a service design concept that reframes solar adoption from a technology challenge into a decision‑making problem.
                </p>
                <p>
                  The project explores how housing societies can move from confusion and indecision to shared clarity and confidence before any installation begins.
                </p>
              </div>
            </section>

            {/* Why This Project Exists */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Why This Project Exists</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>
                  Despite falling costs, government subsidies, and increasing awareness, solar adoption in housing societies continues to stall.
                </p>
                <p>Solar doesn’t fail because people don’t care.</p>
                <p>It fails because deciding together is hard.</p>
                <div>
                  <p className="mb-3">In societies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Information is fragmented</li>
                    <li>Opinions clash</li>
                    <li>Responsibility feels risky</li>
                    <li>Decisions get endlessly postponed</li>
                  </ul>
                </div>
                <p>Solar becomes “next year’s agenda”.</p>
              </div>
            </section>

            {/* Research Insights */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Research Insights</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>
                  India has an estimated <span className="text-[#E3FC03] font-bold">124 GW</span> of rooftop solar potential, yet <span className="text-[#E3FC03] font-bold">less than 10%</span> has been utilised so far.
                  Within this, residential housing societies contribute <span className="text-[#E3FC03] font-bold">under 20%</span> of total rooftop solar installations, despite having large, shared roof areas and predictable energy demand.
                </p>
                <p>
                  While awareness and interest in solar are high, adoption within housing societies is <span className="text-[#E3FC03] font-bold">significantly slower</span> compared to individual homes. Research and field observations showed that decision-making timelines in societies are <span className="text-[#E3FC03] font-bold">2–3× longer</span>, largely due to the involvement of multiple stakeholders and shared financial responsibility. <span className="text-[#E3FC03] font-bold">Less than 1 in 5</span> rooftop solar installations in India come from residential societies, not due to lack of intent, but lack of decision clarity.
                </p>
                <p>
                  Contrary to common assumptions, <span className="text-[#E3FC03] font-bold">cost and technology were not the primary barriers</span>. Instead, societies struggled with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Conflicting and vendor‑biased information</li>
                  <li>Lack of clear feasibility and savings comparisons</li>
                  <li>Fear of making long‑term, irreversible decisions</li>
                </ul>
                <p>
                  Committee members, especially society secretaries, often carry the <span className="text-[#E3FC03] font-bold">burden of accountability</span>. With no neutral decision‑support system in place, solar discussions tend to <span className="text-[#E3FC03] font-bold">stall</span>, getting postponed to “next year” despite clear long‑term benefits.
                </p>
                <p>
                  These findings revealed that solar adoption at the community level is <span className="text-[#E3FC03] font-bold">not a technology challenge</span>, but a <span className="text-[#E3FC03] font-bold">confidence and decision‑making problem</span>.
                </p>
              </div>
            </section>

            {/* Problem Statement */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto border border-white/10 rounded-[28px] px-8 md:px-16 py-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Problem Statement</h2>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  How might we help housing societies confidently decide on solar adoption in a system involving multiple stakeholders, high perceived risk, and unclear information?
                </p>
              </div>
            </section>

            {/* User Persona: Society Secretary */}
            <section className="space-y-8">
              <div className="max-w-5xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">User Persona</h2>
                <h3 className="text-3xl font-black uppercase tracking-tight mt-4">Society Secretary</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start border border-white/10 rounded-[28px] p-10 bg-white/[0.02] w-full max-w-5xl mx-auto">
                <div className="flex flex-col items-start text-left">
                  <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center text-zinc-500 text-xs font-black uppercase">
                    Avatar
                  </div>
                  <div className="mt-5 text-sm text-zinc-300 space-y-3">
                    <div className="text-base font-black text-zinc-100">Rajesh Nair</div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span>42</span>
                      <span>•</span>
                      <span>Mumbai</span>
                    </div>
                    <div className="text-xs text-zinc-400 leading-relaxed">Mid‑size urban cooperative housing society</div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-[0.25em] text-zinc-200 mb-3">Needs</h4>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-300 leading-relaxed">
                      <li>Clear, neutral information on solar feasibility and savings</li>
                      <li>Structured support for group discussions and decisions</li>
                      <li>Confidence before committing to long‑term adoption</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-[0.25em] text-zinc-200 mb-3">Goals</h4>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-300 leading-relaxed">
                      <li>Reduce common‑area electricity costs sustainably</li>
                      <li>Make informed, long‑term decisions the society can agree on</li>
                      <li>Maintain trust and credibility as a committee member</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-[0.25em] text-zinc-200 mb-3">Pain Points</h4>
                    <ul className="list-disc pl-6 space-y-2 text-zinc-300 leading-relaxed">
                      <li>Conflicting information and vendor bias around solar</li>
                      <li>Fear of making a costly or irreversible decision</li>
                      <li>Difficulty aligning multiple stakeholder opinions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Insight */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto border border-white/10 rounded-[28px] px-8 md:px-16 py-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Core Insight</h2>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  The barrier to clean energy adoption is rarely technological. In housing societies, it lies in unclear, high‑risk collective decisions. Building confidence and trust is essential before solar implementation.
                </p>
              </div>
            </section>

            {/* Design Question */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto border border-white/10 rounded-[28px] px-8 md:px-16 py-12 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Design Question</h2>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                  How might we move housing societies from confusion to clarity before any solar installation begins?
                </p>
              </div>
            </section>

            {/* Design Direction */}
            <section className="space-y-10">
              <div className="max-w-5xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">Design Direction</h2>
              </div>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>The solution needed to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be neutral, not vendor-driven</li>
                  <li>Support collective decision-making</li>
                  <li>Reduce fear around long-term commitments</li>
                  <li>Make solar understandable and discussable</li>
                  <li>Build trust before execution</li>
                </ul>
              </div>
            </section>

            {/* The Solution: SolarLink */}
            <section className="space-y-8">
              <div className="max-w-5xl">
                <h2 className="text-5xl font-black uppercase tracking-tighter">
                  The Solution: <span className="text-[#E3FC03]">SolarLink</span>
                </h2>
              </div>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>SolarLink is a service ecosystem designed to guide housing societies through solar adoption with confidence.</p>
                <p className="font-black text-zinc-100">We are not a solar vendor. We are a neutral facilitator.</p>
                <p>Our role is to help societies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Understand solar</li>
                  <li>Discuss options together</li>
                  <li>Decide confidently</li>
                </ul>
              </div>
            </section>

            {/* Core Intervention */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">
                Core Intervention: <span className="text-[#E3FC03]">Solar Sunday</span>
              </h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p className="font-black text-zinc-100">What is Solar Sunday?</p>
                <p>
                  Solar Sunday is a one-day, on-site experience designed to help housing societies explore solar without pressure.
                </p>
                <p>
                  Instead of sales presentations, Solar Sunday turns the society terrace into a calm, interactive learning space where:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Questions are safe</li>
                  <li>Myths are surfaced</li>
                  <li>Understanding is shared</li>
                </ul>
                <p className="font-black text-zinc-100">Solar adoption begins with understanding. Solar Sunday is where that understanding is built.</p>
              </div>
            </section>

            {/* Key Experience Touchpoints */}
            <section className="space-y-8">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Key Experience Touchpoints</h2>
              <ol className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6 list-decimal pl-6">
                <li>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-2">Solar Confession Booth</h3>
                  <p>A private, judgment-free space where residents openly express doubts and myths.</p>
                  <p className="italic text-zinc-400">Most common confession: “I don’t really understand solar.”</p>
                  <p>Surfacing uncertainty early reduces resistance later.</p>
                </li>
                <li>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-2">AR Energy Visualiser</h3>
                  <p>Residents see projected costs, savings, and energy generation mapped onto their own building.</p>
                  <p>Solar becomes tangible, not abstract.</p>
                </li>
                <li>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-2">Pledge Wall</h3>
                  <p>Residents make small, non-binding commitments to show intent and interest.</p>
                  <p>Small signals build collective ownership.</p>
                </li>
                <li>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-2">Guided Decision Framework</h3>
                  <p>Structured comparisons replace opinion-based debates.</p>
                  <p>No selling. Only shared understanding.</p>
                </li>
              </ol>
            </section>

            {/* Redefined Journey */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Redefined Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-3">Before SolarLink</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fragmented information</li>
                    <li>Vendor bias</li>
                    <li>Endless discussions</li>
                    <li>Decisions delayed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-zinc-200 mb-3">With SolarLink</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Structured learning</li>
                    <li>Neutral facilitation</li>
                    <li>Transparent comparisons</li>
                    <li>Confidence before approvals</li>
                  </ul>
                </div>
              </div>
              <p className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed">
                Solar doesn’t move faster by pushing harder. It moves faster when people feel ready.
              </p>
            </section>

            {/* Impact & SDG Alignment */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Impact &amp; SDG Alignment</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>
                  SolarLink directly supports SDG 7: Affordable &amp; Clean Energy by addressing the decision layer of adoption.
                </p>
                <p>The impact is not measured in panels installed, but in:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Reduced decision friction</li>
                  <li>Increased trust</li>
                  <li>Higher likelihood of adoption</li>
                </ul>
                <p className="font-black text-zinc-100">SolarLink doesn’t install panels. We install confidence.</p>
              </div>
            </section>

            {/* What I Learned */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">What I Learned</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>This project strengthened my understanding that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sustainability adoption is a systems problem</li>
                  <li>Designing for confidence is as important as efficiency</li>
                  <li>Service design can unlock stalled behaviors</li>
                  <li>Community decisions require facilitation, not persuasion</li>
                </ul>
                <p>It reinforced my ability to design for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Complex systems</li>
                  <li>Multiple stakeholders</li>
                  <li>Long-term impact</li>
                </ul>
              </div>
            </section>

            {/* Why This Project Matters in My Portfolio */}
            <section className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Why This Project Matters in My Portfolio</h2>
              <div className="max-w-5xl text-lg md:text-xl text-zinc-300 leading-relaxed space-y-6">
                <p>SolarLink reflects my approach to design:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Insight-led, not solution-first</li>
                  <li>Human-centered at a systems scale</li>
                  <li>Focused on clarity, trust, and behavior</li>
                </ul>
                <p>
                  It demonstrates how design can enable sustainable change by reshaping how decisions are made.
                </p>
              </div>
            </section>

            {/* Closing Statement */}
            <section className="py-10">
              <div className="max-w-5xl mx-auto border border-white/10 rounded-[28px] px-8 md:px-16 py-12 text-center">
                <p className="text-xl md:text-2xl text-zinc-200 leading-relaxed">
                  Solar doesn’t stall because people don’t care. <br />
                  It stalls because the process feels unclear. <br />
                  <span className="text-[#E3FC03] font-bold">SolarLink exists to change that.</span>
                </p>
              </div>
            </section>
          </div>
        ) : (
          <section className="space-y-32">
            <div className="aspect-video bg-zinc-900 rounded-[60px] overflow-hidden group border border-white/10">
               <div className="w-full h-full flex items-center justify-center text-zinc-700 font-black text-4xl uppercase italic opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                 Project Visualization [In Progress]
               </div>
            </div>
          </section>
        )}

        <footer className="mt-40 pt-20 border-t border-white/10 text-center">
          <button 
            onClick={onBack}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter hover:italic transition-all opacity-20 hover:opacity-100"
          >
            Go Back
          </button>
        </footer>
      </div>
    </div>
  );
};

const App = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [hovering, setHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorStatus, setCursorStatus] = useState("default");
  const [selectedProject, setSelectedProject] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [aboutOpen, setAboutOpen] = useState(false);
  const { x, y } = useMousePosition();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);



  const projects = [
    { id: 1, number: "(01)", title: "Reimagining BSNL", category: "Strategy Design", description: "A comprehensive brand and UX strategy to reposition India's legacy telecom provider for the digital-first era.", status: "completed" },
    { id: 2, number: "(02)", title: "Raahi", category: "UX Design", description: "Crafting a seamless digital journey for modern travelers.", status: "completed" },
    { id: 3, number: "(03)", title: "Voia", category: "Design Thinking", description: "VOIA is a wearable that enables discreet, real-time communication between teachers and deaf-mute students using light and vibration.", status: "completed" },
    { id: 4, number: "(04)", title: "SolarLink", category: "Service Design", description: "Designing the infrastructure for future-proof renewable energy services.", status: "completed" },
    { id: 5, number: "(05)", title: "Revela", category: "Tangible Interface", description: "Exploring physical interactions in a digital-first world.", status: "locked" },
  ];

  const openProject = (p) => {
    if (p.status === 'locked') return;
    setSelectedProject(p);
    setHovering(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-zinc-100 selection:bg-white selection:text-black overflow-x-hidden cursor-none pb-20 font-rounded">
      <GrainOverlay />
      <CustomCursor hovering={hovering} label={cursorLabel} status={cursorStatus} />
      {hovering && <FloatingDoodle x={x} y={y} />}

      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)} 
          setHovering={setHovering}
          setCursorLabel={setCursorLabel}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference">
        <div 
          onMouseEnter={() => { setHovering(true); setCursorLabel("HI"); setCursorStatus("default"); }} 
          onMouseLeave={() => { setHovering(false); setCursorLabel(""); setCursorStatus("default"); }}
          className="text-xl md:text-2xl font-black tracking-tight group cursor-none uppercase"
        >
          Khushii <span className="text-zinc-500 group-hover:line-through decoration-zinc-100 decoration-4 transition-all">Mehta</span>
        </div>
        <div className="flex gap-4 items-center text-[10px] font-bold tracking-[0.4em] opacity-60">
          <a href="#work" className="hover:opacity-100 transition-opacity uppercase cursor-none px-4 py-2 rounded-full hover:bg-white/10">Work</a>
          <a href="#about" className="hover:opacity-100 transition-opacity uppercase cursor-none px-4 py-2 rounded-full hover:bg-white/10">About</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity uppercase cursor-none px-4 py-2 rounded-full hover:bg-white/10">Contact</a>
          <div className="font-mono tabular-nums bg-white/10 px-4 py-2 rounded-full border border-white/5">{time}</div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 opacity-10 rotate-12 scale-[3]">
           <DoodleArrow className="w-40 h-40" />
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8 relative inline-block">
            <span className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase animate-slide-up bg-zinc-800 text-zinc-300 px-5 py-2 rounded-full border border-zinc-700">
              Strategy & Experience Design
            </span>
          </div>
          <h1 className="text-[16vw] md:text-[14vw] font-black leading-[0.85] tracking-tight uppercase mb-16 relative">
            <div className="overflow-hidden"><span className="block animate-slide-up" style={{ animationDelay: '0.1s' }}>Khushii</span></div>
            <div className="overflow-hidden relative inline-block">
              <span className="block animate-slide-up" style={{ animationDelay: '0.3s' }}>Mehta</span>
              <ScribbleUnderline />
            </div>
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
             <a href="#work" className="group relative px-12 py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-xl inline-block cursor-none" onMouseEnter={() => { setHovering(true); setCursorLabel("SCROLL DOWN"); }} onMouseLeave={() => setHovering(false)}>Explore Projects</a>
          </div>
        </div>
      </header>

      {/* Projects List Section */}
      <section id="work" className="relative z-10 pt-40 pb-20 bg-[#070707]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-24">
            <h2 className="text-8xl md:text-[9vw] font-black tracking-tighter uppercase leading-[0.8]">My <br/> <span className="text-zinc-500 italic font-medium">Projects</span></h2>
        </div>
        <div className="max-w-[1800px] mx-auto px-4 md:px-12">
          {projects.map((p) => (
            <div key={p.id} onClick={() => openProject(p)} className={`group relative border-t border-white/10 last:border-b py-12 md:py-20 px-8 md:px-16 transition-all duration-500 cursor-none rounded-[40px] md:rounded-[60px] hover:my-4 ${p.status === 'locked' ? 'hover:bg-red-500/5' : 'hover:bg-white active:scale-[0.98]'}`} onMouseEnter={() => { setHovering(true); setCursorLabel(p.status === 'locked' ? "Coming Soon" : "View Case Study"); setCursorStatus(p.status); }} onMouseLeave={() => { setHovering(false); setCursorLabel(""); setCursorStatus("default"); }}>
              <div className="hidden md:flex items-center justify-between gap-20">
                <div className="flex items-center gap-12 flex-1">
                  <span className={`text-xs font-mono opacity-40 transition-colors ${p.status === 'locked' ? 'group-hover:text-red-500' : 'group-hover:text-black group-hover:opacity-60'}`}>{p.number}</span>
                  <h3 className={`text-6xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-500 ${p.status === 'locked' ? 'group-hover:text-red-500/40' : 'group-hover:text-black group-hover:italic'}`}>{p.title}</h3>
                </div>
                <p className={`text-zinc-500 text-sm font-medium leading-snug max-w-sm text-right transition-colors ${p.status === 'locked' ? 'group-hover:text-red-500/60' : 'group-hover:text-black/70'}`}>{p.description}</p>
                <div className={`w-20 h-20 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${p.status === 'locked' ? 'group-hover:border-red-500/20 group-hover:text-red-500' : 'group-hover:border-black/20 group-hover:rotate-45 group-hover:text-black'}`}>{p.status === 'locked' ? <Lock size={32} /> : <ArrowUpRight size={40} />}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 bg-[#070707]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-16 items-start">
            <div className={`relative z-10 hidden lg:block transition-opacity duration-300 ${aboutOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <div className="max-w-3xl space-y-8">
                <div className="space-y-4 text-sm md:text-base text-zinc-300">
                  <div><span className="font-black text-zinc-100">Name:</span> Khushii Mehta</div>
                  <div><span className="font-black text-zinc-100">Age:</span> 22</div>
                  <div><span className="font-black text-zinc-100">Education:</span> Fourth year undergraduate student at FLAME University</div>
                  <div><span className="font-black text-zinc-100">Field of Study:</span> Design (Major), Marketing (Minor)</div>
                  <div className="pt-2">
                    <div className="font-black text-zinc-100">Background:</div>
                    <p>
                      Multidisciplinary design student with academic exposure to design thinking, graphic design, programming, storytelling, marketing, economics, product and brand management, and consumer behavior.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm md:text-base text-zinc-300">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-zinc-200 mb-2">Goals</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Create meaningful, real‑world solutions</li>
                      <li>Combine design, technology, and marketing in product thinking</li>
                      <li>Build functional, user‑centered outcomes rather than purely visual concepts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[520px] lg:h-[580px] flex items-center justify-center [perspective:1200px]">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-8 -left-6 rotate-[-10deg] bg-white p-2 shadow-2xl">
                  <div className="w-28 h-36 bg-gradient-to-br from-zinc-300/70 via-zinc-200/80 to-zinc-400/60" />
                </div>
                <div className="absolute -bottom-6 left-2 rotate-[8deg] bg-white p-2 shadow-2xl">
                  <div className="w-32 h-24 bg-gradient-to-br from-zinc-200/70 via-zinc-300/80 to-zinc-500/60" />
                </div>
                <div className="absolute -top-2 -right-8 rotate-[12deg] bg-white p-2 shadow-2xl">
                  <div className="w-28 h-32 bg-gradient-to-br from-zinc-400/70 via-zinc-300/80 to-zinc-200/60" />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0">
                <svg className="absolute -left-8 top-8 w-24 h-24 rotate-[-8deg] text-yellow-300/90" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="26" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="55" r="3" fill="currentColor" />
                  <circle cx="70" cy="55" r="3" fill="currentColor" />
                  <path d="M48 70C54 76 66 76 72 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M60 10V26M60 94V110M10 60H26M94 60H110M22 22L34 34M86 86L98 98M22 98L34 86M86 34L98 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <svg className="absolute right-8 -top-4 w-28 h-20 rotate-[6deg]" viewBox="0 0 140 80" fill="none">
                  <path d="M10 60C22 30 46 18 70 18C94 18 118 30 130 60" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                  <path d="M16 60C28 34 48 26 70 26C92 26 112 34 124 60" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                  <path d="M22 60C34 38 50 34 70 34C90 34 106 38 118 60" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
                  <path d="M28 60C38 42 52 42 70 42C88 42 102 42 112 60" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
                </svg>
                <svg className="absolute right-2 bottom-0 w-24 h-24 rotate-[8deg] text-pink-300/90" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="60" r="24" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="56" r="3" fill="currentColor" />
                  <circle cx="70" cy="56" r="3" fill="currentColor" />
                  <path d="M48 72C54 78 66 78 72 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M36 44C28 36 18 30 10 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M84 44C92 36 102 30 110 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <svg className="absolute left-6 bottom-10 w-20 h-20 rotate-[-6deg] text-rose-300/90" viewBox="0 0 120 120" fill="none">
                  <path d="M60 96C60 96 24 70 24 44C24 30 34 20 48 20C58 20 66 26 60 36C54 26 62 20 72 20C86 20 96 30 96 44C96 70 60 96 60 96Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                </svg>
              </div>

              <div
                className={`tilt-card relative bg-white rounded-[32px] p-4 shadow-2xl border border-black/10 w-64 h-[420px] md:w-72 md:h-[460px] ${aboutOpen ? "cursor-default" : "cursor-none"}`}
                style={{ "--rx": `${tilt.y}deg`, "--ry": `${tilt.x}deg` }}
                onClick={() => {
                  if (!aboutOpen) setAboutOpen(true);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width;
                  const py = (e.clientY - rect.top) / rect.height;
                  const max = 12;
                  setTilt({
                    x: (px - 0.5) * max * 2,
                    y: (0.5 - py) * max * 2,
                  });
                }}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
              >
                <img
                  src={aboutMainPhoto}
                  alt="Khushii Mehta"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              {!aboutOpen && (
                <div className="pointer-events-none absolute right-[-18px] top-[60%] flex flex-col items-start gap-2 rotate-[-4deg]">
                  <DoodleArrow className="w-16 h-16 text-white/90" />
                  <span className="text-[12px] uppercase tracking-[0.35em] font-black text-white/90">Tap me</span>
                </div>
              )}
            </div>

            <div className={`relative z-10 hidden lg:block transition-opacity duration-300 ${aboutOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <div className="max-w-3xl space-y-4 text-sm md:text-base text-zinc-300">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-200 mb-2">Motivations</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Understanding how users think, choose, and interact</li>
                    <li>Translating abstract ideas into tangible prototypes</li>
                    <li>Using design as a problem‑solving tool, not just aesthetics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-200 mb-2">Skills &amp; Capabilities</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Research and user analysis</li>
                    <li>Ideation and prototyping</li>
                    <li>Storytelling and concept communication</li>
                    <li>Hands‑on experience with Arduino, sensors, motors, and basic programming</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-200 mb-2">Approach</h3>
                  <p>Research‑driven, iterative, and experiment‑led. Prefers learning by building, testing, and refining.</p>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-200 mb-2">Design Philosophy</h3>
                  <p>Design should be intuitive, functional, and grounded in user needs while aligning with business and market realities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 bg-[#070707]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10">Get in <span className="text-zinc-500 italic font-medium">touch</span></h2>
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <svg className="absolute left-12 top-8 w-20 h-20 rotate-[-6deg] text-yellow-300/90" viewBox="0 0 120 120" fill="none">
              <path d="M25 30C20 20 30 10 40 15L52 22C58 25 60 32 56 38L48 50C54 62 64 72 76 78L88 70C94 66 101 68 104 74L111 86C115 96 105 106 95 101C70 90 30 50 25 30Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 18L30 28M8 36L22 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <svg className="absolute right-16 top-6 w-24 h-20 rotate-[6deg] text-sky-300/90" viewBox="0 0 140 100" fill="none">
              <rect x="12" y="20" width="116" height="60" rx="10" stroke="currentColor" strokeWidth="4"/>
              <path d="M12 28L70 60L128 28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 76H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <svg className="absolute left-24 bottom-16 w-20 h-20 rotate-[4deg] text-pink-300/90" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="22" stroke="currentColor" strokeWidth="4" />
              <circle cx="52" cy="56" r="3" fill="currentColor" />
              <circle cx="68" cy="56" r="3" fill="currentColor" />
              <path d="M50 70C54 76 66 76 70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <svg className="absolute right-24 bottom-10 w-20 h-20 rotate-[-4deg] text-emerald-300/90" viewBox="0 0 120 120" fill="none">
              <rect x="24" y="20" width="72" height="80" rx="10" stroke="currentColor" strokeWidth="4"/>
              <path d="M44 50V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M44 46C44 38 56 38 56 46V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M64 64V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M64 52C64 44 76 44 76 52V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <path d="M34 30L28 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <a
              href="mailto:khushiimehtadesigns@gmail.com"
              className="px-10 py-4 rounded-full border border-white/20 text-sm uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all cursor-none"
              onMouseEnter={() => { setHovering(true); setCursorLabel("EMAIL ME"); }}
              onMouseLeave={() => setHovering(false)}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com"
              className="px-10 py-4 rounded-full border border-white/20 text-sm uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all cursor-none"
              onMouseEnter={() => { setHovering(true); setCursorLabel("LINKEDIN"); }}
              onMouseLeave={() => setHovering(false)}
            >
              LinkedIn
            </a>
          </div>
          <div className="relative mt-6 w-full">
            <div className="inline-block whitespace-nowrap text-[12vw] md:text-[8vw] font-black tracking-tighter text-white/80 animate-marquee">
              khushiimehtadesigns@gmail.com
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-20">
        <div className="opacity-20 text-[10px] font-black uppercase tracking-[1em] text-center">©️ 2026 KHUSHII MEHTA • MUMBAI</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@1,400;1,900&display=swap');
        body { font-family: 'Outfit', sans-serif; background-color: #070707; }
        .font-rounded { font-family: 'Outfit', sans-serif; }
        @keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 16s linear infinite; }
        .tilt-card {
          transform-style: preserve-3d;
          transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 0.15s ease;
        }
        .sticky-note {
          max-width: 190px;
          padding: 10px 12px;
          font-size: 11px;
          line-height: 1.3;
          font-weight: 600;
          color: #1f2937;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          transform: rotate(-2deg);
        }
        .sticky-note-purple { background: #e9d5ff; }
        .sticky-note-lilac { background: #ddd6fe; }
        .sticky-note-pink { background: #fbcfe8; }
        .sticky-note-green { background: #bbf7d0; }
        .sticky-note-sage { background: #d1fae5; }
        .sticky-note-peach { background: #fecaca; }
        .sticky-note-rose { background: #fda4af; }
        .sticky-note-blue { background: #bfdbfe; }
        .sticky-note-sky { background: #bae6fd; }
        ::-webkit-scrollbar { width: 0px; }
        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
};

export default App;
