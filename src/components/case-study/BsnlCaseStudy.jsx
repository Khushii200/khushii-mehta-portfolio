import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CasePlaceholder } from './CasePlaceholder';
import { Figure, Lightbox } from './CaseKit';
import { ProjectRow } from '../work/ProjectRow';
import bsnlFramework from '../../assets/bsnl-framework-rings.png';
import bsnlWhatsappPrototype from '../../assets/bsnl-whatsapp-prototype.webp';
import bsnlCampaignBoard from '../../assets/bsnl-campaign-board.jpg';
import bsnlLogo from '../../assets/bsnl-logo.png';
import bsnlResearchBoard from '../../assets/bsnl-research-board.jpg';
import bsnlPlayStoreReviews from '../../assets/bsnl-play-store-reviews.webp';
import bsnlEmpathyMap from '../../assets/bsnl-empathy-map.png';
import bsnlCompetitorAnalysis from '../../assets/bsnl-competitor-analysis.webp';
import bsnlJourneyMap from '../../assets/bsnl-journey-map.png';

/* ------------------------------------------------------------------
 * Content — condensed from the original BSNL case study, nothing new.
 * ------------------------------------------------------------------ */

const META = [
  ['Project type', 'Design Strategy'],
  ['Role', 'Design Strategy + Research + UX'],
  ['Focus', 'Repositioning & B2C Strategy'],
  ['Duration', '2 months · 12 May — 12 July 2025'],
];

const CONTEXT = [
  ['Legacy', 'Unmatched rural reach, national infrastructure and a legacy of trust built over decades.'],
  ['Perception', 'Remembered as outdated, slow and disconnected. For Gen Z and digital-first users it doesn’t even register as an option.'],
  ['Opportunity', 'BSNL isn’t losing on infrastructure or affordability — it’s losing on perceived relevance and usability.'],
];

const CHALLENGES = [
  ['Legacy perception', 'People haven’t forgotten BSNL — they remember it as outdated, slow and disconnected.'],
  ['Fragmented experience', 'A weak digital presence and journeys that feel disconnected across touchpoints.'],
  ['No relatable voice', 'Inconsistent brand communication, with little visibility or personalisation for digital-first users.'],
];

const METHODS = [
  ['Secondary research', 'TRAI reports, telecom & fintech trends, AI adoption, cultural frameworks'],
  ['Competitor analysis', 'Jio, Airtel, Vi — plus Verizon and AT&T as global references'],
  ['Digital listening', '200+ Play Store reviews to surface real user friction'],
  ['User interviews', 'BSNL and non-BSNL users across age groups'],
  ['Synthesis', 'Personas and journey maps across recharge, usage and support'],
];

const MARKET = [
  ['Jio', 51, '~50–52%', 'Youthful & innovative'],
  ['Airtel', 29.5, '~29–30%', 'Premium & urban'],
  ['Vi', 13.5, '~13–14%', 'Trendy & vibrant'],
];

const PERSONAS = [
  ['Meenakshi Iyer', '60–70 · The older loyalist', '“If BSNL becomes easier to use, they won’t leave — they’ll advocate.”'],
  ['Riya Sharma', '18–24 · The Gen Z skeptic', '“They don’t reject BSNL for price — they reject it for perception.”'],
  ['Shivram Mahato', '30–45 · Rural first-time user', '“Access exists — understanding doesn’t.”'],
];

const INSIGHTS = [
  ['Trust without engagement', 'Users trust BSNL, but hesitate to engage with it digitally.'],
  ['Perception, not price', 'Younger users don’t reject BSNL for its price — they reject it for how it feels.'],
  ['Access without clarity', 'Rural users have access, but lack the clarity and confidence to use it on their own.'],
  ['Fragmented touchpoints', 'Recharge, plans and support depend on shopkeepers and family, with jargon and no proactive help.'],
];

const PILLARS = [
  ['Trust', 'The core advantage', 'BSNL’s only current advantage — the foundation of the repositioning.', ['Legacy & SIM-unboxing storytelling', '“Your Data Stays in India” campaign']],
  ['Tech', 'Make BSNL easier to use', 'GenAI support, UX redesign, conversational journeys and plan personalisation.', ['Native-language UI + “Senior Mode”', 'Bharat, a WhatsApp assistant']],
  ['Tone', 'Make BSNL feel relevant', 'Speak Gen Z, stay Bharat — a modern but grounded brand voice.', ['Culturally rooted storytelling', 'Creator partnerships, regional content']],
  ['Tribe', 'Make BSNL feel meant for someone', 'Creators, students, loyalists and underserved users — not everyone.', ['Student packs + education bundles', 'Kirana & rural sales partnerships']],
];

const ROADMAP = [
  ['Visibility & trust', '0–6 months', 'Make BSNL visible again and reintroduce what it stands for.'],
  ['Clarity & access', '6–12 months', 'Reduce friction and make BSNL easier to use.'],
  ['Adoption & expansion', '12–18 months', 'Create stronger reasons to choose BSNL.'],
  ['Ecosystem & retention', '18–24 months', 'Build long-term engagement and relevance.'],
];

/* Problem statement — what exists vs. what people perceive (from the team’s “From research to the problem” board) */
const HAS = [
  ['Legacy & trust', 'A well-known, trusted name across generations.'],
  ['Nationwide infrastructure', 'One of the largest telecom networks in India.'],
  ['Wide network reach', 'Present in urban, semi-urban and rural India.'],
  ['Access for all', 'Continues to serve rural and remote areas.'],
  ['Existing user base', 'A loyal customer base, especially in rural India.'],
];
const FEELS = [
  ['Outdated', 'Feels like an uncle brand.'],
  ['Disconnected', 'Confusing experience and low visibility digitally.'],
  ['Unrelatable', 'No modern voice, no personalisation, no cultural relevance.'],
];

/* The research board, grouped in reading order (labels as they appear on the board) */
const BOARD = [
  ['Inputs', 'Competitor websites', ['Jio', 'Airtel', 'Vodafone Idea', 'AT&T', 'Verizon', 'BSNL’s own pages']],
  ['Analysis', 'Structured comparison', ['SWOT analysis', 'Competitor analysis', 'Similarities · Differences · Learnings · Opportunities']],
  ['Synthesis', 'Where BSNL should go', ['To-be journey', 'Ideation', 'Tone of voice', 'Mascot sketches (Signal Singh)']],
  ['Design', 'First service flow', ['User flow for the WhatsApp bot “BHARAT”']],
];

/* Evidence behind each insight — quotes, reviews and journey friction from the research synthesis board */
const EVIDENCE = [
  [['“Main toh BSNL ke saath bada hua. Par ab lagta hai jaise apne hi ghar ko bhool gaye sab.”', 'Bharat Sinha · ex-BSNL employee, 52'], ['“Good network in rural areas but app is very confusing.”', 'Play Store review']],
  [['“BSNL feels like an uncle brand. Why would I switch unless it’s smarter and cheaper?”', 'Riya Sharma · design student, 21'], ['“Feels old compared to Jio/Airtel. Needs innovation.”', 'Play Store review']],
  [['“Mujhe bas yeh samajhna hai — kab khatam hoga, aur dubara kaise bharna hai.”', 'Shivram Mahato · farmer, 38'], ['Finds plans confusing and hard to understand — too many options, technical jargon.', 'Journey mapping · compare']],
  [['“I don’t need so many options. Just tell me what’s best — in my language.”', 'Meenakshi Iyer · retired principal, 64'], ['Relies on shopkeepers or family to recharge; turns to shopkeepers or WhatsApp for help.', 'Journey mapping · recharge & support']],
];

/* Idea prioritisation — every idea placed by impact and cost (team matrix) */
const PRIORITY = [
  ['High impact', 'Low cost', 'Do first', ['Social media storytelling (trust, unboxing, SIM legacy)', 'Mascot introduction (Signal Singh)', 'Regional festival offers', '“Your data stays in India” narrative', 'Night data boosters for students', 'Native language UI + “Senior Mode”', 'Proactive WhatsApp support + recharge reminders', 'Twitter + LinkedIn brand updates']],
  ['High impact', 'High cost', 'Plan & invest', ['BSNL Pay digital wallet + UPI gateway', 'Online BSNL University', 'AI financial advisor for telecom budgeting', 'BSNL dongles & keypad phones with student bundles', 'WhatsApp chatbot with voice, eKYC, plan optimisation', 'Creator partnerships, rural content grants']],
  ['Low impact', 'Low cost', 'Quick extras', ['Cybersecurity email series', 'LinkedIn job hiring posts', 'DND toggle features in app', 'App-only spam blocker']],
  ['Low impact', 'High cost', 'Deprioritise', ['Real-time doubt-solving with professional tutors', 'Micro-loans for prepaid recharge', 'BSNL marketplace inside the app', 'Full OTT bundling (Disney+, Netflix, etc.)', 'Loyalty programs with 3rd-party coupons (Amazon, Flipkart)']],
];

/* Campaign & chatbot board, grouped into broader directions */
const CAMPAIGNS = [
  ['Brand voice on social', 'Making BSNL visible where younger users already are.', ['Twitter sample messages', 'LinkedIn sample messages']],
  ['Retention & trust', 'Staying in touch before users drift away.', ['Proactive retention strategy on WhatsApp', 'Cyber security email series']],
  ['Guided service on WhatsApp', 'Everyday tasks through a conversation, not an app.', ['Bill payment flow for an older user', 'Applying for a new connection']],
  ['Plans & offers', 'Clearer, more relatable plans.', ['Postpaid plans']],
];

const PROTOTYPES = {
  app: 'https://www.figma.com/make/F5UjMEU9MOCOlV82DxlD6T/Khushi---Piyush-Collaboration-FM-BSNL-app--Copy-?t=34z5jtw7tpwiani2-1',
  chatbot: 'https://www.figma.com/design/eWPd5da2R0TAQfYtFP5dF8/BSNL-whatsapp-chatbot?node-id=0-1&t=LH8YBRd5JbNSFOC0-1',
};

/* ------------------------------------------------------------------
 * Layout helpers — everything sits on one 12-column grid.
 * `col` is the desktop placement; tablet/phone stack unless `md` is given.
 * ------------------------------------------------------------------ */

const pad = (n) => String(n).padStart(2, '0');

const Col = ({ col, md, className = '', children }) => (
  <div className={`case-col ${className}`} style={{ '--col': col, ...(md ? { '--col-md': md } : {}) }}>
    {children}
  </div>
);

const Chapter = ({ id, number, title, children, tone }) => (
  <section id={id} className={`case-chapter ${tone ? `case-chapter--${tone}` : ''}`} aria-labelledby={`${id}-title`}>
    <div className="case-grid case-chapter__head">
      <Col col="1 / span 3">
        <p className="case-meta"><span className="case-meta__num">{pad(number)}</span> / {title}</p>
      </Col>
    </div>
    {children}
  </section>
);

const Caption = ({ index, title, children }) => (
  <p className="case-caption">
    <span className="case-meta">{pad(index)} / {title}</span>
    {children}
  </p>
);

const NumberedList = ({ items, className = '' }) => (
  <ol className={`case-points ${className}`}>
    {items.map(([title, body], index) => (
      <li key={title}>
        <span className="case-points__num">{pad(index + 1)}</span>
        <h3 className="case-sub">{title}</h3>
        <p className="case-body">{body}</p>
      </li>
    ))}
  </ol>
);

/* Market share as a pie. The source gives approximate ranges for the three private
   operators; slices use the midpoint and are labelled with the range. The remainder
   (BSNL and others) isn’t broken down in the source, so it isn’t split. */
const MarketPie = () => {
  const slices = [...MARKET.map(([name, value, label, voice]) => ({ name, value, label, voice }))];
  const rest = 100 - slices.reduce((sum, s) => sum + s.value, 0);
  slices.push({ name: 'BSNL & others', value: rest, label: `≈${Math.round(rest)}% remainder`, voice: 'Not broken down in the source', muted: true });
  // each operator in its own brand colour (Jio blue, Airtel red, Vi yellow); the unsplit remainder stays neutral
  const shades = ['#2f5bea', '#e3342f', '#f5c518', '#5f5d59'];
  let angle = -90;
  const r = 70; const c = 80;
  const arc = (start, sweep) => {
    const a0 = (start * Math.PI) / 180; const a1 = ((start + sweep) * Math.PI) / 180;
    const large = sweep > 180 ? 1 : 0;
    return `M ${c} ${c} L ${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} Z`;
  };
  return (
    <figure className="bsnl-pie">
      <p className="case-meta">Market share · 2024</p>
      <svg viewBox="0 0 160 160" role="img" aria-label={slices.map((s) => `${s.name} ${s.label}`).join(', ')}>
        {slices.map((s, i) => {
          const sweep = (s.value / 100) * 360;
          const d = arc(angle, sweep);
          angle += sweep;
          return <path key={s.name} d={d} fill={shades[i]} stroke="#0a0a0a" strokeWidth="1.5" />;
        })}
      </svg>
      <ul className="bsnl-pie__legend">
        {slices.map((s, i) => (
          <li key={s.name}>
            <i style={{ background: shades[i] }} aria-hidden="true" />
            <strong>{s.name}</strong>
            <span>{s.label}</span>
            <em>{s.voice}</em>
          </li>
        ))}
      </ul>
      <figcaption>Private players compete on speed, pricing and bundled ecosystems. Shares are approximate ranges from secondary research.</figcaption>
    </figure>
  );
};

/* ------------------------------------------------------------------ */

export const BsnlCaseStudy = ({ project, nextProject, onOpenProject }) => {
  const [zoomed, setZoomed] = useState(null);
  return (
  <article className="case-study case-study--bsnl">
    {/* 01 / HERO */}
    <header className="case-hero">
      <div className="case-grid">
        <Col col="1 / span 12">
          <p className="case-meta">01 / {project.category} · Case study</p>
          <h1 className="case-title">
            Reimagining <span>BSNL</span>
          </h1>
        </Col>
        <Col col="1 / span 6" md="1 / -1">
          <p className="case-lede">A strategic repositioning of India’s telecom legacy to win back the digital-first generation.</p>
          <p className="bsnl-byline">By Khushii Mehta — a 4th-year Experience Design student at FLAME University.</p>
        </Col>
        <Col col="8 / span 5" md="1 / -1">
          <dl className="case-facts">
            {META.map(([term, value]) => (
              <div key={term}>
                <dt className="case-meta">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Col>
      </div>
    </header>

    {/* 02 / CONTEXT */}
    <Chapter id="bsnl-context" number={2} title="Context">
      <div className="case-grid case-grid--center">
        <Col col="1 / span 5">
          <h2 id="bsnl-context-title" className="case-h2">A trusted network that stopped feeling relevant.</h2>
          <p className="case-body case-body--lead">
            BSNL is India’s state-owned telecom operator, with unmatched rural reach and decades of trust — yet it has steadily
            lost relevance in urban and younger markets.
          </p>
          <NumberedList items={CONTEXT} className="case-points--stacked" />
        </Col>
        <Col col="7 / span 6">
          <CasePlaceholder label="BSNL context / legacy visual" ratio="4:3" src={bsnlLogo} alt="BSNL logo — Connecting Bharat: Securely, Affordably, Reliably" className="case-visual--light case-visual--inset" />
        </Col>
      </div>
    </Chapter>

    {/* 03 / CHALLENGE */}
    <Chapter id="bsnl-challenge" number={3} title="The challenge" tone="ink">
      <div className="case-grid">
        <Col col="1 / span 10">
          <h2 id="bsnl-challenge-title" className="case-statement">
            How might BSNL build on its existing <em>brand legacy</em> — and appeal to a <em>younger, metropolitan audience</em>?
          </h2>
        </Col>
        <Col col="1 / -1">
          <NumberedList items={CHALLENGES} className="case-points--row" />
        </Col>
        <Col col="1 / -1">
          <div className="bsnl-gap" aria-label="From research to the problem: what exists versus what people perceive">
            <div className="bsnl-gap__side">
              <p className="case-meta">What BSNL already has</p>
              <h3 className="bsnl-gap__title">A strong foundation.</h3>
              <ul>
                {HAS.map(([name, body]) => <li key={name}><strong>{name}</strong><span>{body}</span></li>)}
              </ul>
            </div>
            <div className="bsnl-gap__centre">
              <p className="case-meta">The gap isn’t access</p>
              <p className="bsnl-gap__word">It’s relevance.</p>
              <p className="bsnl-gap__note">People still remember BSNL, but it no longer fits into their current, digital-first lives.</p>
            </div>
            <div className="bsnl-gap__side">
              <p className="case-meta">What younger users feel</p>
              <h3 className="bsnl-gap__title">A brand that feels out of place.</h3>
              <ul>
                {FEELS.map(([name, body]) => <li key={name}><strong>{name}</strong><span>{body}</span></li>)}
              </ul>
            </div>
          </div>
        </Col>
      </div>
    </Chapter>

    {/* 04 / SECONDARY RESEARCH */}
    <Chapter id="bsnl-research" number={4} title="Secondary research">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="bsnl-research-title" className="case-h2">Five lenses on one problem.</h2>
          <p className="case-body case-body--lead">I started wide — the market, the competitors and what users were already saying online — before talking to anyone.</p>
        </Col>
        <Col col="1 / -1">
          <ol className="case-methods">
            {METHODS.map(([title, body], index) => (
              <li key={title}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-sub">{title}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>

        <Col col="1 / -1">
          <p className="case-meta bsnl-board__label">The research board, in reading order</p>
          <ol className="bsnl-board">
            {BOARD.map(([phase, title, items], index) => (
              <li key={phase}>
                <span className="case-points__num">{pad(index + 1)} · {phase}</span>
                <h3 className="case-sub">{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                {index < BOARD.length - 1 && <ArrowRight className="bsnl-board__arrow" size={16} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / span 7">
          <Figure
            src={bsnlResearchBoard}
            alt="The FigJam research board: competitor websites (Jio, Airtel, Vodafone Idea, AT&T, Verizon), a SWOT analysis, a competitor analysis with similarities, differences, learnings and opportunities, a to-be journey, ideation, tone of voice, mascot sketches and the user flow for the WhatsApp bot BHARAT"
            source="Research board · overview"
            caption="The whole board at a glance — click to open it. Each group above maps to a cluster here: competitor websites in the centre, analysis on the right, the BHARAT flow at the bottom."
            onZoom={setZoomed}
          />
        </Col>
        <Col col="8 / span 5">
          <MarketPie />
        </Col>

        <Col col="1 / span 6" md="1 / span 6">
          <CasePlaceholder label="Competitor analysis" ratio="2000:1190" src={bsnlCompetitorAnalysis} fit="contain" alt="Competitor analysis of Reliance Jio, Airtel and Vodafone Idea: network, pricing, ecosystem, support, image and reach" className="case-visual--light" />
          <Caption index={1} title="Competitor analysis">Jio, Airtel and Vi compared on network, pricing, ecosystem, support, image and reach — showing where BSNL could still compete.</Caption>
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Digital listening / Play Store reviews" ratio="2000:1190" src={bsnlPlayStoreReviews} alt="A collage of BSNL app reviews from the Play Store, mostly one- to three-star complaints about failed payments, missing plan details, network drops and scattered apps" />
          <Caption index={2} title="Digital listening">A selection from 200+ Play Store reviews. Most praise the network and fault the app — payments, plan details and support — which pointed the research at the experience, not coverage.</Caption>
        </Col>
      </div>

      <div className="case-grid bsnl-bridge">
        <Col col="1 / span 5">
          <p className="case-meta">What desk research established</p>
          <p className="case-body">A market led by Jio, Airtel and Vi competing on speed, pricing and bundled ecosystems — and an app users rate for its network, not its experience.</p>
        </Col>
        <Col col="7 / span 6">
          <p className="case-meta">What it couldn’t answer</p>
          <p className="case-body">Why do people who trust BSNL still not engage with it? How do different users actually recharge, pay and get help? Reviews show what goes wrong — not why, or for whom. That needed direct research.</p>
        </Col>
      </div>
    </Chapter>

    {/* 05 / USER RESEARCH */}
    <Chapter id="bsnl-users" number={5} title="User research">
      <div className="case-grid">
        <Col col="1 / span 7">
          <h2 id="bsnl-users-title" className="case-h2">Listening to the people behind the numbers.</h2>
          <p className="case-body case-body--lead">Interviews with BSNL and non-BSNL users across age groups, synthesised into personas, an empathy map and an as-is journey.</p>
        </Col>

        <Col col="1 / -1">
          <ul className="case-personas">
            {PERSONAS.map(([name, profile, quote]) => (
              <li key={name}>
                <p className="case-meta">{profile}</p>
                <h3 className="case-sub">{name}</h3>
                <p className="case-quote">{quote}</p>
              </li>
            ))}
          </ul>
        </Col>
        <Col col="1 / span 5">
          <CasePlaceholder label="Empathy map — Says, Thinks, Sees, Hears" ratio="1452:974" src={bsnlEmpathyMap} alt="Empathy map (Says, Thinks, Sees, Hears) for an older BSNL user: what they say, think, see and hear — from relying on family to recharge, to fearing the wrong plan, to jargon with no explanation" className="case-visual--light" />
          <Caption index={1} title="Empathy map · Says, Thinks, Sees, Hears">One map for the older, family-reliant user: what they say, think, see and hear around recharging — dependence on family, fear of the wrong plan, jargon with no explanation.</Caption>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="As-is journey map" ratio="1414:844" src={bsnlJourneyMap} alt="As-is journey map for Meena across six stages — recharge awareness, search, payment, plan usage, customer service and retention — with actions, touchpoints, pain points and emotions from frustrated to willing to switch" className="case-visual--light" />
          <Caption index={2} title="As-is journey map · Meena">Six stages from recharge awareness to retention. Each one adds dependence, confusion or silence — until switching feels easier than staying.</Caption>
        </Col>
      </div>
    </Chapter>

    {/* 06 / WHAT I FOUND */}
    <Chapter id="bsnl-insights" number={6} title="What I found">
      <div className="case-grid">
        <Col col="1 / span 10">
          <h2 id="bsnl-insights-title" className="case-statement">
            BSNL isn’t failing because people forgot it — it’s failing because they remember it as outdated.
          </h2>
        </Col>
        <Col col="1 / -1">
          <ol className="bsnl-findings">
            {INSIGHTS.map(([title, body], index) => (
              <li key={title}>
                <div className="bsnl-findings__claim">
                  <span className="case-points__num">{pad(index + 1)}</span>
                  <h3 className="case-sub">{title}</h3>
                  <p className="case-body">{body}</p>
                </div>
                <ul className="bsnl-findings__evidence" aria-label="Evidence">
                  {EVIDENCE[index].map(([quote, source]) => (
                    <li key={quote}><p>{quote}</p><span>{source}</span></li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / -1">
          <div className="bsnl-verdict">
            <p className="case-meta">Final insight</p>
            <p className="bsnl-verdict__line">Trusted, but not relevant.</p>
            <p className="case-body">The gap is not access. It is clarity, confidence and relevance — which is why the strategy had to change how BSNL feels and works, not where it reaches.</p>
          </div>
        </Col>
      </div>
    </Chapter>

    {/* 07 / STRATEGIC DIRECTION */}
    <Chapter id="bsnl-direction" number={7} title="Strategic direction">
      <div className="case-grid">
        <Col col="1 / span 7">
          <h2 id="bsnl-direction-title" className="case-statement">
            BSNL doesn’t need to become Airtel or Jio. It needs to become BSNL 2.0 — smart, grounded, human-first.
          </h2>
        </Col>
        <Col col="1 / -1">
          <ol className="case-pillars">
            {PILLARS.map(([title, role, body, actions], index) => (
              <li key={title}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-pillars__title">{title}</h3>
                <p className="case-meta">{role}</p>
                <p className="case-body case-body--small">{body}</p>
                <ul>
                  {actions.map((action) => <li key={action}>{action}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </Col>
        <Col col="3 / span 8">
          <CasePlaceholder src={bsnlFramework} alt="Concentric framework: Trust (BSNL’s only current advantage) at the core, then Tech (GenAI, UX redesign, plan personalisation), Tone (speak Gen Z, but stay Bharat) and Tribe (creators, loyalists, underserved markets)" label="Strategic framework" ratio="16:10" fit="contain" className="case-visual--light" />
          <Caption index={1} title="Trust → Tech → Tone → Tribe">Trust — BSNL’s one existing advantage — sits at the core. Each outer ring makes it easier to use, more relevant and more personal.</Caption>
        </Col>
        <Col col="1 / -1">
          <h3 className="bsnl-subhead">Idea Prioritization</h3>
          <p className="case-body bsnl-subhead__intro">Every idea from ideation was placed on two axes — impact on users and cost to BSNL — to decide what to do first.</p>
          <div className="bsnl-matrix" role="table" aria-label="Ideas placed by impact and cost">
            {PRIORITY.map(([impact, cost, verdict, items]) => (
              <div key={`${impact}-${cost}`} className={`bsnl-matrix__cell ${impact === 'High impact' && cost === 'Low cost' ? 'is-first' : ''}`} role="row">
                <p className="case-meta">{impact} · {cost}</p>
                <h4>{verdict}</h4>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <Caption index={2} title="Idea Prioritization">High-impact, low-cost ideas lead — most of them trust-building communication and simpler, native-language experiences.</Caption>
        </Col>
      </div>
    </Chapter>

    {/* 08 / THE OUTCOME */}
    <Chapter id="bsnl-outcome" number={8} title="The outcome">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="bsnl-outcome-title" className="case-h2">From strategy to experience.</h2>
          <p className="case-body case-body--lead">Prototypes that make recharge, support and onboarding simple — and a 24-month plan to roll them out.</p>
        </Col>
        <Col col="1 / -1">
          <h3 className="bsnl-subhead">Campaigns & conversations</h3>
          <ul className="bsnl-campaigns">
            {CAMPAIGNS.map(([category, why, items]) => (
              <li key={category}>
                <h4>{category}</h4>
                <p>{why}</p>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </li>
            ))}
          </ul>
          <Figure
            src={bsnlCampaignBoard}
            alt="The campaign and chatbot board: a proactive retention strategy on WhatsApp, Twitter and LinkedIn sample messages, a cyber security email series, a bill payment flow for an older user, a new connection flow and postpaid plans"
            source="Campaign & chatbot board"
            caption="The full board — click to open it. Every artefact sits in one of the four directions above."
            onZoom={setZoomed}
          />
          <div className="case-caption case-caption--split">
            <span className="case-meta">BSNL app prototype</span>
            <a className="case-link" href={PROTOTYPES.app} target="_blank" rel="noopener noreferrer">
              Open app prototype in Figma <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder kind="Large image placeholder" label="Bharat — WhatsApp assistant prototype" ratio="16:9" size="large" src={bsnlWhatsappPrototype} alt="Bharat WhatsApp assistant prototype: a BSNL screen asking the user to choose their preferred language — Hindi, Marathi or English" />
          <div className="case-caption case-caption--split">
            <span className="case-meta">Bharat, WhatsApp assistant — starts by asking which language you’d like</span>
            <a className="case-link" href={PROTOTYPES.chatbot} target="_blank" rel="noopener noreferrer">
              Open chatbot in Figma <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col col="1 / -1">
          <ol className="case-roadmap" aria-label="24-month implementation roadmap">
            {ROADMAP.map(([phase, months, goal], index) => (
              <li key={phase}>
                <p className="case-meta">Phase {index + 1} · {months}</p>
                <h3 className="case-sub">{phase}</h3>
                <p className="case-body case-body--small">{goal}</p>
              </li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 09 / REFLECTION */}
    <Chapter id="bsnl-reflection" number={9} title="Reflection">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="bsnl-reflection-title" className="visually-hidden">Reflection</h2>
          <div className="case-reflection">
            <div>
              <p className="case-meta">What changed</p>
              <p className="case-body">The brief moved from fixing telecom performance to an experience problem — making BSNL understandable, usable and relevant again.</p>
            </div>
            <div>
              <p className="case-meta">What I learnt</p>
              <p className="case-body">Strategy isn’t about flash — it’s about clarity, empathy and fit. BSNL doesn’t need to become like others; it needs to become more like itself.</p>
            </div>
            <div>
              <p className="case-meta">What I’d explore next</p>
              <p className="case-body">Usability testing with Gen Z, rural and senior users, and piloting Bharat with clear KPIs for retention, NPS and activation.</p>
            </div>
          </div>
        </Col>
      </div>
    </Chapter>

    {/* NEXT PROJECT */}
    {nextProject && (
      <section className="case-chapter case-next" aria-labelledby="bsnl-next-title">
        <div className="case-grid">
          <Col col="1 / -1">
            <p id="bsnl-next-title" className="case-meta case-next__label">
              Next project <ArrowDown size={12} aria-hidden="true" />
            </p>
            <h2 className="case-next__title">{nextProject.title} →</h2>
          </Col>
          <Col col="1 / -1" className="case-next__card">
            <ol className="archive__list archive__list--single">
              <ProjectRow project={nextProject} index={1} onOpen={onOpenProject} />
            </ol>
          </Col>
        </div>
      </section>
    )}
    <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
  </article>
  );
};

export default BsnlCaseStudy;
