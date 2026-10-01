import React from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CasePlaceholder } from './CasePlaceholder';
import { ProjectRow } from '../work/ProjectRow';
import bsnlFramework from '../../assets/bsnl-ideations.png';

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

const JOURNEY = [
  ['Recharge awareness', 'Frustrated', 'No proactive reminders'],
  ['Recharge search', 'Dependent', 'Vendor chooses for her'],
  ['Payment', 'Helpless', 'No direct digital access'],
  ['Plan usage', 'Unaware', 'No idea of benefits or usage'],
  ['Customer service', 'Ignored', 'IVR, language barrier'],
  ['Retention', 'Ready to switch', 'No reason to stay'],
];

const INSIGHTS = [
  ['Trust without engagement', 'Users trust BSNL, but hesitate to engage with it digitally.'],
  ['Perception, not price', 'Younger users don’t reject BSNL for its price — they reject it for how it feels.'],
  ['Access without clarity', 'Rural users have access, but lack the clarity and confidence to use it on their own.'],
  ['Fragmented touchpoints', 'Recharge, plans and support depend on shopkeepers and family, with jargon and no proactive help.'],
];

const EXPLORED = ['Low-cost telecom provider', 'Youth-first digital brand', 'Rural-first network', 'Feature-heavy digital ecosystem'];

const RULED_OUT = [
  'Price competition is unsustainable against Jio',
  'A youth-only focus ignores loyal users',
  'Digital-first excludes low-tech users',
  'Feature-heavy adds complexity instead of solving it',
];

const PILLARS = [
  ['Trust', 'The core advantage', 'BSNL’s only current advantage — the foundation of the repositioning.', ['Legacy & SIM-unboxing storytelling', '“Your Data Stays in India” campaign']],
  ['Tech', 'Make BSNL easier to use', 'GenAI support, UX redesign, conversational journeys and plan personalisation.', ['Native-language UI + “Senior Mode”', 'Bharat, a WhatsApp assistant']],
  ['Tone', 'Make BSNL feel relevant', 'Speak Gen Z, stay Bharat — a modern but grounded brand voice.', ['Culturally rooted storytelling', 'Creator partnerships, regional content']],
  ['Tribe', 'Make BSNL feel meant for someone', 'Creators, students, loyalists and underserved users — not everyone.', ['Student packs + education bundles', 'Kirana & rural sales partnerships']],
];

const MATRIX = [
  ['High impact', 'Low cost', ['Trust-led social storytelling', 'Native-language UI + “Senior Mode”', 'Proactive WhatsApp support + reminders', 'Night data boosters for students']],
  ['High impact', 'High cost', ['Bharat — WhatsApp chatbot with voice & eKYC', 'BSNL Pay (UPI wallet)', 'Online BSNL University', 'Creator partnerships, rural content grants']],
  ['Low impact', 'Low cost', ['Cybersecurity email series', 'DND toggle + spam blocker']],
  ['Low impact', 'High cost', ['Full OTT bundling', 'In-app marketplace', 'Third-party loyalty coupons']],
];

const PROCESS = ['Research', 'Synthesise', 'Reframe', 'Strategise', 'Prototype', 'Roadmap'];

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
          <CasePlaceholder kind="Hero image" label="BSNL project visual" ratio="16:9" size="hero" />
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
          <CasePlaceholder label="BSNL context / legacy visual" ratio="4:3" />
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
          <CasePlaceholder label="Problem / challenge visual" ratio="16:9" />
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
          <CasePlaceholder label="Secondary research / industry landscape" ratio="16:9" />
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
          <CasePlaceholder label="Competitor analysis" ratio="4:3" />
          <Caption index={2} title="Competitor analysis">Jio, Airtel and Vi benchmarked on tech, pricing, ecosystem, voice and dominance.</Caption>
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Digital listening / Play Store reviews" ratio="4:3" />
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
          <CasePlaceholder label="User personas / empathy map" ratio="4:3" />
          <Caption index={4} title="User research">Three personas — loyalist, skeptic, first-time user — and what they say, think, see and hear.</Caption>
        </Col>
        <Col col="6 / span 7">
          <div className="case-journey" aria-label="As-is journey of an older loyal user">
            <p className="case-meta">As-is journey · Meenakshi</p>
            <ol>
              {JOURNEY.map(([phase, emotion, friction]) => (
                <li key={phase}>
                  <span className="case-journey__dot" />
                  <strong>{emotion}</strong>
                  <span>{phase}</span>
                  <em>{friction}</em>
                </li>
              ))}
            </ol>
          </div>
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
          <CasePlaceholder label="Supporting research evidence / insight synthesis" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 06 / THE STRATEGIC SHIFT */}
    <Chapter id="bsnl-shift" number={6} title="The strategic shift" tone="paper">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="bsnl-shift-title" className="visually-hidden">The strategic shift</h2>
          <ol className="case-shift">
            <li>
              <p className="case-meta">Before</p>
              <p className="case-shift__text">A telecom performance problem — compete on speed, price and bundles.</p>
            </li>
            <li aria-hidden="true" className="case-shift__arrow"><ArrowRight size={22} /></li>
            <li>
              <p className="case-meta">Discovery</p>
              <p className="case-shift__text">BSNL wasn’t losing on reach or price — it was losing on relevance and usability.</p>
            </li>
            <li aria-hidden="true" className="case-shift__arrow"><ArrowRight size={22} /></li>
            <li>
              <p className="case-meta">After</p>
              <p className="case-shift__text">An experience problem — make BSNL understandable, usable and relevant again.</p>
            </li>
          </ol>
        </Col>
        <Col col="1 / span 9">
          <p className="case-statement case-statement--xl">“Lean into trust and simplify access.”</p>
          <p className="case-body case-body--lead">A human-first, accessible telecom experience built on trust — not complexity.</p>
        </Col>
        <Col col="1 / span 5">
          <div className="case-ruled-out">
            <p className="case-meta">Explored</p>
            <ul className="case-ruled-out__options">
              {EXPLORED.map((option) => <li key={option}><s>{option}</s></li>)}
            </ul>
            <p className="case-meta">Ruled out because</p>
            <ul className="case-ruled-out__reasons">
              {RULED_OUT.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
          </div>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="Strategic framework / shift (Get → To → By)" ratio="16:9" />
          <Caption index={1} title="Get → To → By">From confused, passive users to a trusted, actively chosen telecom — by simplifying, humanising and localising.</Caption>
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
        <Col col="1 / span 7">
          <CasePlaceholder src={bsnlFramework} alt="Concentric framework: Trust at the core, then Tech, Tone and Tribe" label="Strategic framework" ratio="16:10" fit="contain" />
          <Caption index={1} title="Trust → Tech → Tone → Tribe">Trust sits at the core; each outer ring makes BSNL easier, more relevant and more personal.</Caption>
        </Col>
        <Col col="8 / span 5">
          <div className="case-matrix" aria-label="Cost versus impact prioritisation">
            <p className="case-meta">Cost × impact</p>
            <div className="case-matrix__grid">
              {MATRIX.map(([impact, cost, items], index) => (
                <div key={`${impact}-${cost}`} className={`case-matrix__cell case-matrix__cell--${index + 1}`}>
                  <p className="case-matrix__name">{impact}</p>
                  <p className="case-matrix__axis">{cost}</p>
                  <ul>
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </div>
    </Chapter>

    {/* 08 / PROCESS */}
    <Chapter id="bsnl-process" number={8} title="The process">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="bsnl-process-title" className="visually-hidden">The process</h2>
          <ol className="case-timeline">
            {PROCESS.map((step, index) => (
              <li key={step}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <span className="case-timeline__step">{step}</span>
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / span 6" md="1 / span 6">
          <CasePlaceholder label="Research / mapping" ratio="4:3" />
          <Caption index={1} title="Research & mapping">Personas, empathy map and the as-is journey.</Caption>
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Ideation / exploration" ratio="4:3" />
          <Caption index={2} title="Exploration">Four directions explored before choosing trust and simplicity.</Caption>
        </Col>
        <Col col="1 / span 6" md="1 / span 6">
          <CasePlaceholder label="Strategic development" ratio="4:3" />
          <Caption index={3} title="Strategy">Pillars translated into actions across product, communication and distribution.</Caption>
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Prototype iteration / refinement" ratio="4:3" />
          <Caption index={4} title="Refinement">Recharge, support and onboarding flows shaped into prototypes.</Caption>
        </Col>
      </div>
    </Chapter>

    {/* 09 / THE OUTCOME */}
    <Chapter id="bsnl-outcome" number={9} title="The outcome" tone="paper">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="bsnl-outcome-title" className="case-h2">From strategy to experience.</h2>
          <p className="case-body case-body--lead">Prototypes that make recharge, support and onboarding simple — and a 24-month plan to roll them out.</p>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder kind="Large image placeholder" label="BSNL app prototype — recharge, support & onboarding" ratio="16:9" size="large" />
          <div className="case-caption case-caption--split">
            <span className="case-meta">01 / App prototype</span>
            <a className="case-link" href={PROTOTYPES.app} target="_blank" rel="noopener noreferrer">
              Open prototype in Figma <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col col="1 / span 7">
          <CasePlaceholder kind="Large image placeholder" label="Bharat — WhatsApp assistant prototype" ratio="16:9" size="large" />
          <div className="case-caption case-caption--split">
            <span className="case-meta">02 / Bharat, WhatsApp assistant</span>
            <a className="case-link" href={PROTOTYPES.chatbot} target="_blank" rel="noopener noreferrer">
              Open chatbot in Figma <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </Col>
        <Col col="8 / span 5">
          <CasePlaceholder kind="Large image placeholder" label="Final BSNL strategy / brand visual" ratio="4:3" size="large" />
          <Caption index={3} title="Repositioning">Trust-led, human-first and culturally grounded.</Caption>
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

    {/* 10 / REFLECTION */}
    <Chapter id="bsnl-reflection" number={10} title="Reflection">
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

    {/* 11 / NEXT PROJECT */}
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
