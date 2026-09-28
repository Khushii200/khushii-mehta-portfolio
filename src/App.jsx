import React, { useState } from 'react';
import aboutMainPhoto from './assets/about-khushii-illustration.png';
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
import bsnlVisual from './assets/bsnl-visual.webp';
import raahiVisual from './assets/raahi-visual.webp';
import voiaVisual from './assets/voia-visual.webp';
import solarlinkVisual from './assets/solarlink-visual.webp';
import ziptrripVisual from './assets/ziptrrip-visual.webp';
import { Mail, Linkedin, Github, Instagram, Sparkles, ArrowUpRight, ArrowRight, ArrowLeft, ExternalLink, Lock, Calendar, User, Target, Search, Users, Zap, BarChart3, Lightbulb, ClipboardList, Smartphone, Globe, Shield, ZapOff, AlertCircle, TrendingDown, MessageSquare, LogOut, Eye, Ear, Heart, Brain } from 'lucide-react';
import { LoadingExperience } from './components/entrance/LoadingExperience';
import { WorkSection } from './components/work/WorkSection';
import { PencilCursor } from './components/cursor/PencilCursor';
import { BsnlCaseStudy } from './components/case-study/BsnlCaseStudy';
import { ZiptrripCaseStudy } from './components/case-study/ZiptrripCaseStudy';

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

const ProjectDetail = ({ project, onBack, nextProject, onOpenProject }) => {
  const isBSNL = project.id === 1;
  const isRaahi = project.id === 2;
  const isVoia = project.id === 3;
  const isSolar = project.id === 4;
  const isZiptrrip = project.id === 5;

  return (
    <div className="project-detail fixed inset-0 z-[200] overflow-y-auto animate-fade-in">
      <nav className="project-detail__nav sticky top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-xl z-[210]">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={16} /> Close Project
        </button>
        <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{project.number} / {project.category}</div>
      </nav>

      {isBSNL ? (
        <BsnlCaseStudy project={project} nextProject={nextProject} onOpenProject={onOpenProject} />
      ) : isZiptrrip ? (
        <ZiptrripCaseStudy project={project} nextProject={nextProject} onOpenProject={onOpenProject} />
      ) : (
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

        <div className={`grid grid-cols-1 ${isSolar || isRaahi || isVoia ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8 mb-32`}>
          <div className="p-10 border border-white/10 rounded-[50px] bg-white/[0.03] backdrop-blur-sm">
             <Calendar className="mb-6 text-zinc-500" size={28} />
             <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Timeline</h4>
             <p className="text-sm font-bold uppercase tracking-wider">
               {isRaahi || isVoia ? "2 months" : isSolar ? "" : isBSNL ? "12 May 2025 — 12 July 2025" : project.year}
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
                 : isBSNL
                 ? "Design Strategist"
                 : project.role}
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
                 : isBSNL
                 ? "Repositioning & B2C Strategy"
                 : project.category}
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

        {isRaahi ? (
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
      )}
    </div>
  );
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      number: "(01)",
      title: "Reimagining BSNL",
      tabLabel: "BSNL",
      category: "Strategy Design",
      description: "A comprehensive brand and UX strategy to reposition India's legacy telecom provider for the digital-first era.",
      status: "completed",
      theme: "sand",
      image: bsnlVisual,
      year: "2024",
      role: "Design Strategist",
      tags: ["Brand Strategy", "UX Research", "Service Design"],
    },
    {
      id: 5,
      number: "(02)",
      title: "Ziptrrip",
      tabLabel: "ZIPTRRIP",
      category: "Product / UX Strategy",
      description: "Redesigning corporate travel into a simpler, faster and more human booking experience.",
      status: "completed",
      theme: "blue",
      image: ziptrripVisual,
      imageFit: "cover",
      processNote: "product design → travel experience",
      year: "2026",
      role: "Product Design · UX Research · Strategy",
      tags: ["Product Design", "UX Research", "Travel Experience"],
    },
    {
      id: 2,
      number: "(03)",
      title: "Raahi",
      tabLabel: "RAAHI",
      category: "UX Design",
      description: "Crafting a seamless digital journey for modern travelers.",
      status: "completed",
      theme: "ivory",
      image: raahiVisual,
      imageFit: "cover",
      year: "2024",
      role: "Design Research & UI/UX",
      tags: ["Product Design", "User Research", "Prototyping"],
    },
    {
      id: 4,
      number: "(04)",
      title: "SolarLink",
      tabLabel: "SOLARLINK",
      category: "Service Design",
      description: "Designing the infrastructure for future-proof renewable energy services.",
      status: "completed",
      theme: "sage",
      image: solarlinkVisual,
      imageFit: "cover",
      imagePosition: "60% 50%",
      year: "2024",
      role: "Service Design · Research · Insight Synthesis · Journey Mapping · Concept & Experience Design",
      tags: ["Service Design", "Systems Thinking", "Sustainability"],
    },
    {
      id: 3,
      number: "(05)",
      title: "Voia",
      tabLabel: "VOIA",
      category: "Inclusive Design / Wearable",
      description: "VOIA is a wearable that enables discreet, real-time communication between teachers and deaf-mute students using light and vibration.",
      status: "completed",
      theme: "rose",
      image: voiaVisual,
      imageFit: "cover",
      year: "2024",
      tags: ["Wearable", "Inclusive Design", "Hardware"],
    },
  ];

  const openProject = (p) => {
    if (p.status === 'locked') return;
    setSelectedProject(p);
    window.scrollTo(0, 0);
  };

  return (
    <div className="portfolio-shell min-h-screen font-rounded">
      <PencilCursor />
      {/* 1. Paper Plane + Mini Khushii Entrance Experience */}
      <section id="entrance" className="relative w-full z-50">
        <LoadingExperience />
      </section>

      {/* 2. Existing Portfolio Website (Preserved Intact) */}
      <div id="portfolio-content" className="relative">
        <GrainOverlay />

        {selectedProject && (
          <ProjectDetail
            key={selectedProject.id}
            project={selectedProject}
            onBack={() => setSelectedProject(null)}
            nextProject={projects[projects.findIndex((p) => p.id === selectedProject.id) + 1]}
            onOpenProject={openProject}
          />
        )}

      {/* Projects / Work Section */}
      <WorkSection
        projects={projects}
        onOpenProject={openProject}
      />

      {/* About Section */}
      <section id="about" className="portfolio-section about-section">
        <div className="site-container about-me">
          <div className="about-me__image">
            <img src={aboutMainPhoto} alt="Illustrated portrait of Khushii Mehta" />
          </div>

          <div className="about-me__content">
            <header>
              <p className="section-eyebrow">About</p>
              <h2>Get to know me</h2>
            </header>

            <div className="about-me__intro">
              <p>I’m Khushii Mehta, a multidisciplinary Experience Design student at FLAME University, majoring in Design with a minor in Marketing.</p>
              <p>I’m curious about people, behaviour and the systems around us. My practice sits at the intersection of research, strategy, storytelling and creative technology.</p>
              <p>I like turning observations into ideas that people can actually interact with, whether that means designing experiences, building prototypes, experimenting with Arduino and sensors, or figuring out how a system could work better.</p>
            </div>

            <dl className="about-me__details">
              <div><dt>Design</dt><dd>Experience Design · UX · Service Design · Visual Thinking</dd></div>
              <div><dt>Research</dt><dd>User Research · Behaviour · Strategy · Systems Thinking</dd></div>
              <div><dt>Making</dt><dd>Prototyping · Arduino · Sensors · Creative Technology</dd></div>
              <div><dt>Based in</dt><dd>Mumbai / Pune</dd></div>
              <div><dt>Education</dt><dd>FLAME University · Design + Marketing</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section contact-section">
        <div className="site-container text-center contact-panel">
          <p className="section-eyebrow">Contact</p>
          <h2 className="contact-title">Let’s make something thoughtful.</h2>
          <p className="contact-intro">Have a project, opportunity, or idea worth exploring? I’d love to hear about it.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <a
              href="mailto:khushiimehtadesigns@gmail.com"
              className="system-button system-button--primary"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com"
              className="system-button"
            >
              LinkedIn
            </a>
            <a
              href={`${import.meta.env.BASE_URL}khushii-mehta-resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="system-button"
              aria-label="Resume (PDF, opens in a new tab)"
            >
              Resume <ArrowUpRight className="system-button__arrow" size={14} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
          <div className="relative mt-6 w-full">
            <div className="contact-email">
              khushiimehtadesigns@gmail.com
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>©️ 2026 KHUSHII MEHTA • MUMBAI</div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body { font-family: 'Outfit', sans-serif; background-color: #ffffff; color: #202422; }
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
    </div>
  );
};

export default App;
