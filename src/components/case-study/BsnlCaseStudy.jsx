import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CasePlaceholder } from './CasePlaceholder';
import { ProjectRow } from '../work/ProjectRow';
import bsnlFramework from '../../assets/bsnl-framework-rings.png';
import bsnlCostImpact from '../../assets/bsnl-cost-impact.png';
import bsnlResearchEvidence from '../../assets/bsnl-research-evidence.webp';
import bsnlChallenge from '../../assets/bsnl-challenge.webp';
import bsnlWhatsappPrototype from '../../assets/bsnl-whatsapp-prototype.webp';
import bsnlAppPrototype from '../../assets/bsnl-app-prototype.webp';
import bsnlLogo from '../../assets/bsnl-logo.png';
import bsnlIndustryLandscape from '../../assets/bsnl-industry-landscape.webp';
import bsnlPlayStoreReviews from '../../assets/bsnl-play-store-reviews.webp';
import bsnlEmpathyMap from '../../assets/bsnl-empathy-map.png';
import bsnlCompetitorAnalysis from '../../assets/bsnl-competitor-analysis.webp';
import bsnlJourneyMap from '../../assets/bsnl-journey-map.png';

/* ------------------------------------------------------------------
 * Content — condensed from the original BSNL case study, nothing new.
 * ------------------------------------------------------------------ */

const META = [
  ['Project type', 'Design Strategy'],
  ['Role', 'Design Strategy / Research / UX'],
  ['Focus', 'Repositioning & B2C Strategy'],
  ['Timeline', '12 May — 12 July 2025'],
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

/* ------------------------------------------------------------------ */

export const BsnlCaseStudy = ({ project, nextProject, onOpenProject }) => (
  <article className="case-study">
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
        <Col col="1 / -1" className="case-hero__visual">
          <CasePlaceholder kind="Hero image" label="BSNL project visual" ratio="16:9" size="hero" src={project.image} alt="" />
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
          <CasePlaceholder label="Problem / challenge visual" ratio="16:9" src={bsnlChallenge} alt="From research to the problem: what BSNL already has — legacy and trust, nationwide infrastructure, wide network reach, access for all, an existing user base — versus what younger users feel: outdated, disconnected, unrelatable. The gap isn’t access, it’s relevance." />
        </Col>
      </div>
    </Chapter>

    {/* 04 / INVESTIGATION */}
    <Chapter id="bsnl-research" number={4} title="Investigation">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="bsnl-research-title" className="case-h2">Five lenses on one problem.</h2>
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

        <Col col="1 / span 8">
          <CasePlaceholder label="Secondary research / industry landscape" ratio="2000:1199" src={bsnlIndustryLandscape} alt="Research board for the telecommunication industry: competitor websites, SWOT analysis, competitor analysis and the BHARAT WhatsApp bot user flow" />
          <Caption index={1} title="Industry landscape">TRAI reports, telecom and fintech trends, AI adoption and cultural frameworks.</Caption>
        </Col>
        <Col col="9 / span 4" className="case-col--end">
          <div className="case-data" aria-label="Market share, as of 2024">
            <p className="case-meta">Market share · 2024</p>
            {MARKET.map(([name, value, label, voice]) => (
              <div key={name} className="case-data__row">
                <div className="case-data__label">
                  <strong>{name}</strong>
                  <span>{label}</span>
                </div>
                <div className="case-data__bar"><span style={{ width: `${value}%` }} /></div>
                <p className="case-data__note">{voice}</p>
              </div>
            ))}
            <p className="case-caption case-caption--tight">Private players compete on speed, pricing and bundled ecosystems.</p>
          </div>
        </Col>

        <Col col="1 / span 6" md="1 / span 6">
          <CasePlaceholder label="Competitor analysis" ratio="2000:1190" src={bsnlCompetitorAnalysis} fit="contain" alt="Competitor analysis of Reliance Jio, Airtel and Vodafone Idea: network, pricing, ecosystem, support, image and reach" className="case-visual--light" />
          <Caption index={2} title="Competitor analysis">Jio, Airtel and Vi benchmarked on tech, pricing, ecosystem, voice and dominance.</Caption>
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Digital listening / Play Store reviews" ratio="2000:1190" src={bsnlPlayStoreReviews} alt="A collage of BSNL app reviews from the Play Store, mostly one- to three-star complaints about failed payments, missing plan details, network drops and scattered apps" />
          <Caption index={3} title="Digital listening">200+ Play Store reviews clustered to surface real user friction.</Caption>
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
          <CasePlaceholder label="User personas / empathy map" ratio="1452:974" src={bsnlEmpathyMap} alt="Empathy map: what BSNL users say, think, see and hear — from relying on family to recharge, to fearing the wrong plan, to jargon with no explanation" className="case-visual--light" />
          <Caption index={4} title="User research">Three personas — loyalist, skeptic, first-time user — and what they say, think, see and hear.</Caption>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="As-is journey map" ratio="1414:844" src={bsnlJourneyMap} alt="As-is journey map for Meena across six stages — recharge awareness, search, payment, plan usage, customer service and retention — with actions, touchpoints, pain points and emotions from frustrated to willing to switch" className="case-visual--light" />
          <Caption index={5} title="Journey map">From expiry to exit — every stage adds dependence, confusion or silence.</Caption>
        </Col>
      </div>
    </Chapter>

    {/* 05 / WHAT I FOUND */}
    <Chapter id="bsnl-insights" number={5} title="What I found">
      <div className="case-grid">
        <Col col="1 / span 10">
          <h2 id="bsnl-insights-title" className="case-statement">
            BSNL isn’t failing because people forgot it — it’s failing because they remember it as outdated.
          </h2>
        </Col>
        <Col col="1 / -1">
          <ol className="case-insights">
            {INSIGHTS.map(([title, body], index) => (
              <li key={title}>
                <span className="case-insights__num">{pad(index + 1)}</span>
                <h3 className="case-sub">{title}</h3>
                <p className="case-body">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Supporting research evidence / insight synthesis" ratio="16:9" src={bsnlResearchEvidence} alt="Research evidence board: user interviews, app reviews and digital touchpoints, journey mapping and secondary research, leading to the final insight — trusted, but not relevant" />
        </Col>
      </div>
    </Chapter>

    {/* 06 / STRATEGIC DIRECTION */}
    <Chapter id="bsnl-direction" number={6} title="Strategic direction">
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
        <Col col="1 / span 7">
          <CasePlaceholder src={bsnlFramework} alt="Concentric framework: Trust (BSNL’s only current advantage) at the core, then Tech (GenAI, UX redesign, plan personalisation), Tone (speak Gen Z, but stay Bharat) and Tribe (creators, loyalists, underserved markets)" label="Strategic framework" ratio="16:10" fit="contain" className="case-visual--light" />
          <Caption index={1} title="Trust → Tech → Tone → Tribe">Trust sits at the core; each outer ring makes BSNL easier, more relevant and more personal.</Caption>
        </Col>
        <Col col="8 / span 5">
          <CasePlaceholder label="Cost × impact matrix" ratio="806:690" src={bsnlCostImpact} alt="Cost versus impact matrix: high-impact low-cost ideas such as trust storytelling, the Signal Singh mascot, native-language UI and WhatsApp reminders; high-impact high-cost ideas such as BSNL Pay, Online BSNL University and the WhatsApp chatbot; plus low-impact ideas in both cost bands" className="case-visual--light" />
          <Caption index={2} title="Cost × impact" />
        </Col>
      </div>
    </Chapter>

    {/* 07 / THE OUTCOME */}
    <Chapter id="bsnl-outcome" number={7} title="The outcome">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="bsnl-outcome-title" className="case-h2">From strategy to experience.</h2>
          <p className="case-body case-body--lead">Prototypes that make recharge, support and onboarding simple — and a 24-month plan to roll them out.</p>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder kind="Large image placeholder" label="BSNL app prototype — recharge, support & onboarding" ratio="2000:1197" size="large" src={bsnlAppPrototype} alt="BSNL WhatsApp chatbot design board: proactive retention messages, Twitter and LinkedIn sample posts, a cyber security email series, bill payment and new connection flows, and postpaid plans" />
          <div className="case-caption case-caption--split">
            <span className="case-meta">01 / App prototype</span>
            <a className="case-link" href={PROTOTYPES.app} target="_blank" rel="noopener noreferrer">
              Open prototype in Figma <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder kind="Large image placeholder" label="Bharat — WhatsApp assistant prototype" ratio="16:9" size="large" src={bsnlWhatsappPrototype} alt="Bharat WhatsApp assistant prototype: a BSNL screen asking the user to choose their preferred language — Hindi, Marathi or English" />
          <div className="case-caption case-caption--split">
            <span className="case-meta">02 / Bharat, WhatsApp assistant</span>
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

    {/* 08 / REFLECTION */}
    <Chapter id="bsnl-reflection" number={8} title="Reflection">
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

    {/* 09 / NEXT PROJECT */}
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
  </article>
);

export default BsnlCaseStudy;
