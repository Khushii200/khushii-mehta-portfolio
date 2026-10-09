import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { ProjectRow } from '../work/ProjectRow';

import protoWelcome from '../../assets/ziptrrip/zt-proto-welcome.jpg';
import protoFlights from '../../assets/ziptrrip/zt-proto-flights.jpg';
import protoHotels from '../../assets/ziptrrip/zt-proto-hotels.jpg';
import protoApproval from '../../assets/ziptrrip/zt-proto-approval.jpg';
import currentFlightFlow from '../../assets/ziptrrip/zt-current-flight-flow.jpg';
import currentHotelFlow from '../../assets/ziptrrip/zt-current-hotel-flow.jpg';
import fieldNotes from '../../assets/ziptrrip/zt-field-notes-navan.jpg';
import benchmarkCards from '../../assets/ziptrrip/zt-benchmark-navan-cards.jpg';
import benchmarkPatterns from '../../assets/ziptrrip/zt-benchmark-patterns.jpg';
import opportunityMatrix from '../../assets/ziptrrip/zt-opportunity-matrix.jpg';
import sections20 from '../../assets/ziptrrip/zt-20-sections.jpg';
import model20 from '../../assets/ziptrrip/zt-20-model.jpg';
import userflow20 from '../../assets/ziptrrip/zt-20-userflow.jpg';

/* ------------------------------------------------------------------
 * Content — drawn from the internship report, the internship brief, the
 * customer research repository (6 interviews, 4–10 June 2026), the
 * competitive benchmark, the ZipTrrip 2.0 strategy and the prototypes.
 * Interviewees are described by role, not name. Nothing here claims a
 * design shipped.
 * ------------------------------------------------------------------ */

const FACTS = [
  ['Company', 'ZipTrrip — B2B corporate travel platform, India'],
  ['Role', 'UX Research & Design Intern, Founder’s Office'],
  ['Duration', '3 months · summer 2026'],
  ['Worked with', 'The founders, tech and customer-experience teams'],
];

const METHODS = ['Secondary research', 'Product walkthroughs', 'User-flow mapping', 'Competitive benchmarking', 'Customer interviews', 'Journey mapping', 'Synthesis', 'Prototyping'];

const STAKEHOLDERS = [
  ['Employee', 'Requests, books and takes the trip'],
  ['Managers', 'Approve — sometimes two levels deep'],
  ['Travel admin', 'Books for others, handles exceptions'],
  ['Finance', 'Invoices, GST, reconciliation'],
  ['ZipTrrip ops', 'Cancellations, changes, support'],
  ['Suppliers', 'Airlines, hotels, buses, cabs'],
];

const OFFICIAL_FLOW = ['Create a trip', 'Add flights and hotel', 'Send for approval', 'Manager approves on WhatsApp or email', 'Booking confirmed'];

const AROUND_IT = [
  'Requests start in email chains, before anyone opens the platform',
  'Travellers nudge managers on WhatsApp while fares move',
  'Admins track bookings in email and Excel',
  'Cabs are booked on Ola or Uber; some hotels outside the platform',
];

const OBJECTIVES = [
  ['Map', 'Document the current ZipTrrip user flows through primary and secondary research.'],
  ['Benchmark', 'Compare ZipTrrip’s flows and design against competitors in the category.'],
  ['Recommend', 'Propose a user flow and design framework grounded in what the research found.'],
];

const PHASES = [
  ['Discover', 'May', 'Product walkthrough, industry reports, founder conversations', 'Booking is a small part of corporate travel — approvals, policy, finance and coordination surround it.'],
  ['Map', 'May', 'Current flows for flights, hotels, buses, trains and cabs, screen by screen', 'Where decisions pile up, and where the journey leaves the platform.'],
  ['Prototype', 'Late May', 'A conversational assistant, iterated through 14 versions', 'What “one conversation for the whole trip” could feel like.'],
  ['Benchmark', 'May–June', 'Five competitors booked end to end; 69 observations evaluated', 'Policy and reassurance have moved into the booking flow itself.'],
  ['Interview', '4–10 June', 'Six customer interviews across travellers, coordinators and admins', 'Users weren’t asking for more inventory. They wanted visibility and reliability.'],
  ['Synthesise', 'June–July', 'Research repository, journey map, pain-point and bug logs, 2.0 strategy', 'Eight opportunity pillars, prioritised by evidence.'],
  ['Design', 'July', 'ZipTrrip 2.0 information architecture and end-to-end user flow', 'A trip-first structure, built around approvals, memory and recovery.'],
];

const COMPETITORS = ['Navan', 'TravelPerk', 'Travel Plus', 'MakeMyTrip MyBiz', 'TripGain'];

const PATTERNS = [
  ['Policy moved upstream', 'Every competitor flags in-policy / out-of-policy inline, while choosing — not later, at approval.'],
  ['Confidence is designed', 'Tags like “Booked with Confidence” exist to lower anxiety at the moment of payment.'],
  ['Maps decide, not just locate', 'List-and-map sync turns the map into a comparison tool for hotels.'],
  ['Checkout became a workflow', 'Request forms, approval reasons and add-ons are resolved on the last screen.'],
];

const SEGMENTS = [
  ['Frequent travellers', 'Sales, field and tech professionals booking their own trips', ['Book fast and get approved fast', 'Find a hotel near the work location', 'No surprises after booking']],
  ['Coordinators & admins', 'Book for whole teams — one books 100–200 trips a month', ['Keep travellers happy within policy', 'Avoid escalations', 'Reconcile invoices without chasing']],
  ['Approvers & finance', 'Managers, department heads, finance — seen through the other two groups', ['Approve without switching context', 'Keep visibility of spend']],
];

const FINDINGS = [
  {
    key: 'approvals',
    tab: 'Approvals',
    count: '5 of 6 interviews',
    headline: 'The wait isn’t the worst part. Not knowing is.',
    evidence: [
      'Chains of up to four people: employee → manager → manager → admin',
      'Fares rose during 2–3 hour approval windows',
      'No visibility of where a request was — raised in 4 of 6 interviews',
    ],
    quote: ['It goes to the first line manager, then to the second line manager, then to the admin, and then to the fourth position.', 'Field sales executive, frequent traveller'],
    insight: 'Approval layers often exist for good reasons — one admin argued blanket approvals are needed for policy control. What users couldn’t bear was the black box.',
    implication: 'Make approval status visible, show cost and policy context to approvers, and keep WhatsApp approvals — the most-loved feature, praised in 4 of 6 interviews.',
  },
  {
    key: 'hotels',
    tab: 'Hotel trust',
    count: '4 of 6 interviews',
    headline: 'Hotels are trusted through colleagues, not listings.',
    evidence: [
      'Rooms that didn’t match their photos; a hotel that had closed down by arrival',
      'In tier-2 and tier-3 cities, few options and hotels 3–5 km from town',
      'Some hotels booked outside ZipTrrip altogether',
    ],
    quote: ['At 12:30 at night I got dropped there… the hotel’s location is around 4–5 kms from the stand, but there is no facility at night to go there.', 'Field sales executive, frequent traveller'],
    insight: '“Booked before” helped when it was accurate. When the tag appeared on hotels the company had never used, it damaged trust instead.',
    implication: 'Lead with colleague history and verified signals, and show distance to where the person actually needs to be.',
  },
  {
    key: 'reliability',
    tab: 'Reliability',
    count: '3 of 6 · 8 bugs logged',
    headline: 'A bug blamed on the user costs more than the bug.',
    evidence: [
      'Round-trip booking stalled after fare selection, on iOS and desktop',
      'Hotel search ended on a blank white screen — no results, no error',
      'Seat 2F was selected and 7F was booked; no seat-availability count in results',
    ],
    quote: ['When it is being told that it is a mistake from my end, and I already have the proof that I have selected the seat, then it basically hampers the relations between the companies.', 'Travel & procurement admin'],
    insight: 'For a B2B product, a broken flow is a relationship problem. Each failure travels up to the company that chose the platform.',
    implication: 'Fix the core booking flows first. I logged every reported bug with severity and platform and shared it with the engineering team.',
  },
  {
    key: 'coordination',
    tab: 'Coordination',
    count: '3 of 6 interviews',
    headline: 'Travel is collaborative. The platform is built for one.',
    evidence: [
      'Trips are coordinated across email, WhatsApp, calls, PDFs and Excel',
      'No cab booking — travellers switch to Ola, Uber or Rapido mid-journey',
      'The support helpline wasn’t known to one traveller who needed it at night',
    ],
    quote: ['Earlier there was an admin. At least we could communicate. But here, communication was zero for us.', 'Field sales executive, frequent traveller'],
    insight: 'Most coordination pain sat between people and tools, not on any single screen.',
    implication: 'Give every trip one shared place — bookings, approvals, support and documents together — and make support impossible to miss.',
  },
  {
    key: 'ai',
    tab: 'AI & devices',
    count: 'Split views',
    headline: 'An assistant, not an agent. A desktop product, with a mobile moment.',
    evidence: [
      'AI views split evenly: 2 supportive, 2 indifferent, 2 sceptical',
      'Rejected: AI booking non-refundable fares or overriding policy on its own',
      '5 of 6 book on desktop; the travel admin works mostly from an iPhone',
    ],
    quote: ['AI can help you automate things but AI can only work up to a certain thing.', 'Travel & procurement admin'],
    insight: 'Users wanted help deciding, not decisions made for them. And mobile mattered most to coordinators and to people mid-trip, not to booking.',
    implication: 'Keep the user in control, explain every recommendation, and design mobile for status, support and approvals.',
  },
];

const KEEP = [
  ['Flight booking', 'Praised across interviews — “my flight experience is 10 on 10.”'],
  ['Price transparency', 'No sponsored results; corporate fares compared honestly.'],
  ['WhatsApp approvals', 'Managers approve from wherever they are.'],
];

const THEMES = [
  ['Approval delays', 5],
  ['Hotel trust', 4],
  ['Visibility & status', 4],
  ['Platform reliability', 3],
  ['Cab & transport gaps', 3],
  ['Support accessibility', 3],
  ['Corporate memory', 2],
  ['Finance & invoices', 1],
];

const PILLARS = [
  ['Approval Intelligence', 'Status, ETA and context cards, so approvals stop being a black box.', 'primary'],
  ['Reliability & Trust', 'Core flows that don’t break, and confirmations that match what was chosen.', 'primary'],
  ['Corporate Memory', 'Booked before, preferred by the team, closest to the client office.', 'primary'],
  ['Travel Workspace', 'One place per trip for bookings, approvals, documents and support.', ''],
  ['Travel Command Center', 'Visibility before, during and after travel.', ''],
  ['Collaborative Travel', 'Group trips planned together, not message by message.', ''],
  ['Travel Intelligence', 'Assistance that suggests and alerts — never books on its own.', ''],
  ['Post-Trip Operations', 'Invoices, GST and reconciliation inside the platform.', ''],
];

const RESPONSES = [
  ['No visibility of approvals', 'Approval timeline: created → sent → viewed → decision → confirmed', 'Prototype'],
  ['Fares rise while approvals wait', 'If the price increases, notify the traveller and admin and re-send for approval', '2.0 user flow'],
  ['Too many options to compare', 'Three preferences based on travel history, each with the reason it’s shown', '2.0 user flow'],
  ['Hotel trust and location', 'Hotels on a map with distance from the location that matters', '2.0 user flow'],
  ['Trips scattered across tools', 'A Workspace for everything about one trip, and a Recovery section for when things change', '2.0 IA'],
  ['Scepticism about AI', 'AI is an optional path; a quick-booking flow sits beside it', '2.0 user flow'],
];

const DELIVERED = [
  ['Research & synthesis', ['Customer research repository — 6 interviews, 14 pain points, 8 bugs, 11 feature requests', 'End-to-end journey map', 'Competitive benchmark — 5 competitors, 69 observations', 'Stakeholder research plan']],
  ['Strategy', ['ZipTrrip 2.0 strategic direction — eight pillars', 'Opportunity prioritisation matrix', 'Product principles (“The Invisible Travel Manifesto”)']],
  ['Design', ['Annotated maps of the current booking flows', 'ZipTrrip 2.0 information architecture', 'ZipTrrip 2.0 end-to-end user flow', 'Conversational assistant prototype, 14 iterations']],
  ['Handover', ['Reliability and bug log for the engineering team', 'Product walkthroughs and presentations for the founders and customers']],
];

/* ------------------------------------------------------------------ */

const Section = ({ id, number, label, title, intro, tone, children }) => (
  <section id={id} className={`zt-section ${tone ? `zt-section--${tone}` : ''}`} aria-labelledby={`${id}-title`}>
    <div className="zt-wrap">
      <header className="zt-head">
        <p className="zt-kicker"><span>{number}</span>{label}</p>
        <h2 id={`${id}-title`} className="zt-h2">{title}</h2>
        {intro && <p className="zt-intro">{intro}</p>}
      </header>
      {children}
    </div>
  </section>
);

/** A real project artefact. Click to open it full size. */
const Figure = ({ src, alt, caption, source, onZoom, className = '', framed = true }) => (
  <figure className={`zt-figure ${className}`}>
    <button
      type="button"
      className={`zt-figure__frame ${framed ? '' : 'zt-figure__frame--bare'}`}
      onClick={() => onZoom({ src, alt, caption })}
      aria-label={`Enlarge image: ${alt}`}
    >
      <img src={src} alt={alt} loading="lazy" />
      <span className="zt-figure__zoom" aria-hidden="true"><Maximize2 size={14} strokeWidth={2} /></span>
    </button>
    {(caption || source) && (
      <figcaption>
        {source && <span className="zt-figure__source">{source}</span>}
        {caption}
      </figcaption>
    )}
  </figure>
);

const Lightbox = ({ image, onClose }) => {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);
  return (
    <dialog
      ref={ref}
      className="zt-lightbox"
      aria-label={image?.alt || 'Image'}
      onClose={onClose}
      onClick={(event) => { if (event.target === ref.current) onClose(); }}
    >
      {image && (
        <>
          <button type="button" className="zt-lightbox__close" onClick={onClose} aria-label="Close image">
            <X size={20} />
          </button>
          <div className="zt-lightbox__scroll">
            <img src={image.src} alt={image.alt} />
          </div>
          {image.caption && <p className="zt-lightbox__caption">{image.caption}</p>}
        </>
      )}
    </dialog>
  );
};

/** Evidence → insight → implication, one finding at a time. */
const Findings = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const onKey = (event) => {
    const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + FINDINGS.length) % FINDINGS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };
  const f = FINDINGS[active];
  return (
    <div className="zt-findings">
      <div className="zt-findings__tabs" role="tablist" aria-label="Findings" aria-orientation="vertical" onKeyDown={onKey}>
        {FINDINGS.map((item, index) => (
          <button
            key={item.key}
            ref={(el) => { tabs.current[index] = el; }}
            type="button"
            role="tab"
            id={`zt-tab-${item.key}`}
            aria-selected={index === active}
            aria-controls={`zt-panel-${item.key}`}
            tabIndex={index === active ? 0 : -1}
            className="zt-findings__tab"
            onClick={() => setActive(index)}
          >
            <span className="zt-findings__num">{String(index + 1).padStart(2, '0')}</span>
            <span className="zt-findings__label">{item.tab}</span>
            <span className="zt-findings__count">{item.count}</span>
          </button>
        ))}
      </div>

      <div className="zt-findings__panel" role="tabpanel" id={`zt-panel-${f.key}`} aria-labelledby={`zt-tab-${f.key}`} tabIndex={0}>
        <h3 className="zt-findings__headline">{f.headline}</h3>
        <ol className="zt-chain">
          <li>
            <p className="zt-chain__step">Evidence</p>
            <ul>{f.evidence.map((line) => <li key={line}>{line}</li>)}</ul>
          </li>
          <li>
            <p className="zt-chain__step">Insight</p>
            <p>{f.insight}</p>
          </li>
          <li>
            <p className="zt-chain__step">Design implication</p>
            <p>{f.implication}</p>
          </li>
        </ol>
        <blockquote className="zt-quote">
          <p>“{f.quote[0]}”</p>
          <footer>— {f.quote[1]}</footer>
        </blockquote>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

export const ZiptrripCaseStudy = ({ project, nextProject, onOpenProject }) => {
  const [zoomed, setZoomed] = useState(null);
  const zoom = useCallback((image) => setZoomed(image), []);

  return (
    <article className="case-study case-study--zt zt">
      {/* HERO */}
      <header className="zt-hero">
        <div className="zt-wrap">
          <p className="zt-kicker"><span>02</span>Experience design internship · Case study</p>
          <h1 className="zt-title">Beyond booking.</h1>
          <p className="zt-subtitle">Rethinking the corporate travel experience at ZipTrrip</p>
          <div className="zt-hero__grid">
            <p className="zt-lede">
              Three months inside a B2B travel startup, researching why a simple work trip turns into a chain of approvals,
              follow-ups and workarounds — and what the next version of the product should do about it.
            </p>
            <dl className="zt-facts">
              {FACTS.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="zt-tags" aria-label="Methods">
            {METHODS.map((method) => <li key={method}>{method}</li>)}
          </ul>
          <Figure
            className="zt-hero__figure"
            src={protoWelcome}
            alt="The ZipTrrip conversational assistant prototype, opening on the question “Where are you headed?” with suggested requests such as Mumbai to Bangalore tomorrow morning"
            source="Prototype"
            caption="The conversational travel assistant I prototyped — one of the design directions explored later in this case study."
            onZoom={zoom}
          />
        </div>
      </header>

      {/* 01 / CONTEXT */}
      <Section
        id="zt-context"
        number="01"
        label="The context"
        title="A trip is more than a ticket."
        intro="ZipTrrip brings bookings, approvals, travel policies and travel services into one platform for companies. But every trip it handles involves far more people than the one making the booking."
      >
        <div className="zt-split">
          <div className="zt-system" role="img" aria-label="Diagram: one work trip connects the employee, managers, travel admin, finance, ZipTrrip operations and suppliers">
            <p className="zt-system__core">One work trip</p>
            <ul className="zt-system__nodes">
              {STAKEHOLDERS.map(([who, what]) => (
                <li key={who}><strong>{who}</strong><span>{what}</span></li>
              ))}
            </ul>
            <p className="zt-note">Synthesis diagram · drawn from interviews and secondary research</p>
          </div>
          <div className="zt-stack">
            <div>
              <p className="zt-label">The intended journey</p>
              <ol className="zt-flow">
                {OFFICIAL_FLOW.map((step, index) => (
                  <li key={step}>
                    <span>{step}</span>
                    {index < OFFICIAL_FLOW.length - 1 && <ArrowRight size={14} aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className="zt-label">What happens around it</p>
              <ul className="zt-list">
                {AROUND_IT.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* 02 / BRIEF + APPROACH */}
      <Section
        id="zt-brief"
        number="02"
        label="The brief"
        title="Map it, benchmark it, reimagine it."
        intro="I joined the founder’s office as a UX research and design intern. The work went well beyond screens — research, product strategy, stakeholder interviews and the communication around them."
        tone="soft"
      >
        <ol className="zt-objectives">
          {OBJECTIVES.map(([name, body], index) => (
            <li key={name}>
              <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>

        <p className="zt-label zt-label--spaced">How the work unfolded — and what each step uncovered</p>
        <ol className="zt-phases">
          {PHASES.map(([name, when, did, found]) => (
            <li key={name}>
              <p className="zt-phases__when">{when}</p>
              <h3>{name}</h3>
              <p className="zt-phases__did">{did}</p>
              <p className="zt-phases__found">{found}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 03 / THE EXISTING PRODUCT */}
      <Section
        id="zt-product"
        number="03"
        label="The existing product"
        title="Following one booking, screen by screen."
        intro="I mapped how an employee books flights, hotels, buses, trains and cabs on ZipTrrip today, annotating every decision the interface asks them to make."
      >
        <Figure
          src={currentFlightFlow}
          alt="Annotated user flow of booking a flight on ZipTrrip: searching, filtering many results, then comparing the ZipTrrip corporate fare with the regular fare, cancellation charges and date-change charges"
          source="User-flow map · flights"
          caption="Search, filter, then choose between corporate and regular fares — with cancellation and date-change charges to weigh up before a single seat is picked."
          onZoom={zoom}
        />
        <Figure
          src={currentHotelFlow}
          alt="Annotated user flow of booking a hotel on ZipTrrip: filters, tags showing that colleagues have booked a hotel before, and a red branch for when the hotel is not on the platform"
          source="User-flow map · hotels"
          caption="“Colleague booked” tags already hint at corporate memory. And when a hotel isn’t listed, the request leaves the product entirely."
          onZoom={zoom}
        />
      </Section>

      {/* 04 / THE MARKET */}
      <Section
        id="zt-market"
        number="04"
        label="The market"
        title="Five competitors, booked end to end."
        intro={`I walked through ${COMPETITORS.join(', ')} across flights, hotels, trains, buses and cars — logging 69 observations and asking of each: what does it do, why would a business traveller value it, and is it a gap for ZipTrrip?`}
        tone="soft"
      >
        <div className="zt-pair">
          <Figure
            src={fieldNotes}
            alt="Handwritten field notes on Navan: AI chatbot, showing policy, loyalty programme, flags out-of-policy options while booking, carbon emissions, seat dimensions, Booked with Confidence tags and more"
            source="Field notes"
            caption="Raw notes, taken while booking."
            onZoom={zoom}
          />
          <Figure
            src={benchmarkCards}
            alt="The same Navan features turned into evaluated cards, each with a description, why users value it, the opportunity for ZipTrrip and a priority"
            source="Benchmark · feature cards"
            caption="The same notes, evaluated one by one."
            onZoom={zoom}
          />
        </div>

        <p className="zt-label zt-label--spaced">Patterns that held across all five</p>
        <ol className="zt-patterns">
          {PATTERNS.map(([title, body], index) => (
            <li key={title}>
              <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="zt-callout">
          The direction of the market was clear: <strong>from booking platforms to travel operating systems</strong> — less
          friction, earlier, with more intelligence by default.
        </p>
      </Section>

      {/* 05 / THE PEOPLE */}
      <Section
        id="zt-people"
        number="05"
        label="The people"
        title="Six conversations, three kinds of user."
        intro="Between 4 and 10 June I interviewed six ZipTrrip customers from six organisations — frequent travellers, travel coordinators and admins — about their last trips, their workarounds, and what they would and wouldn’t trust AI with."
      >
        <ul className="zt-segments">
          {SEGMENTS.map(([name, who, goals]) => (
            <li key={name}>
              <h3>{name}</h3>
              <p className="zt-segments__who">{who}</p>
              <ul>{goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="zt-note zt-note--block">
          Managers and finance teams weren’t interviewed directly in this round; their side of the process came through the
          travellers and admins who work with them.
        </p>
      </Section>

      {/* 06 / FINDINGS */}
      <Section
        id="zt-findings"
        number="06"
        label="What I found"
        title="People didn’t ask for more airlines. They asked for certainty."
        intro="Five findings, each traced from what people said and did, to what it means, to what the product should do."
        tone="soft"
      >
        <Findings />
        <div className="zt-keep">
          <p className="zt-label">What must not change</p>
          <ul>
            {KEEP.map(([name, body]) => (
              <li key={name}><strong>{name}</strong><span>{body}</span></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 07 / THE SHIFT */}
      <Section
        id="zt-shift"
        number="07"
        label="The strategic shift"
        title="From booking travel to managing it."
        intro="The research reframed the problem. Booking was already working reasonably well. What broke was everything around it — and that was where ZipTrrip could stand apart."
      >
        <div className="zt-shift" role="img" aria-label="ZipTrrip 1.0 helped users book travel. ZipTrrip 2.0 should help organisations manage travel: from a corporate travel booking platform to a corporate travel operating system.">
          <div>
            <p className="zt-label">ZipTrrip 1.0</p>
            <p className="zt-shift__from">Helped users <em>book</em> travel</p>
            <p className="zt-shift__sub">Corporate travel booking platform</p>
          </div>
          <ArrowRight className="zt-shift__arrow" size={28} aria-hidden="true" />
          <div>
            <p className="zt-label">ZipTrrip 2.0</p>
            <p className="zt-shift__to">Helps organisations <em>manage</em> travel</p>
            <p className="zt-shift__sub">Corporate travel operating system</p>
          </div>
        </div>
        <ul className="zt-principles">
          <li><strong>Reduce thinking before reducing clicks.</strong><span>Cognitive load, not click count, is the real cost of business travel.</span></li>
          <li><strong>Never ask what the platform already knows.</strong><span>Preferences, policy, managers and past trips shouldn’t be re-entered.</span></li>
          <li><strong>Confidence is the product.</strong><span>Answer “is it confirmed? has it been approved?” before anyone has to ask.</span></li>
          <li><strong>Every recommendation must be explainable.</strong><span>“Stayed here before”, “within policy”, “400 m from the client office”.</span></li>
        </ul>
        <p className="zt-note">Principles from the ZipTrrip 2.0 product manifesto I wrote with the research.</p>
      </Section>

      {/* 08 / OPPORTUNITIES */}
      <Section
        id="zt-opportunities"
        number="08"
        label="Opportunity areas"
        title="Eight pillars — not all equal."
        intro="I grouped the findings into eight opportunity pillars for ZipTrrip 2.0, and weighted them by how often and how severely they came up."
        tone="soft"
      >
        <div className="zt-split zt-split--wide">
          <div>
            <p className="zt-label">Themes, by number of interviews</p>
            <ul className="zt-bars" aria-label="Themes by number of interviews, out of six">
              {THEMES.map(([name, count]) => (
                <li key={name}>
                  <span className="zt-bars__name">{name}</span>
                  <span className="zt-bars__track"><span style={{ width: `${(count / 6) * 100}%` }} /></span>
                  <span className="zt-bars__value">{count}/6</span>
                </li>
              ))}
            </ul>
            <p className="zt-callout zt-callout--tight">
              <strong>Approvals mattered most.</strong> They came up in five of six interviews, they cost money — fares rose
              while requests waited — and they strained relationships between travellers and their managers.
            </p>
          </div>
          <ol className="zt-pillars">
            {PILLARS.map(([name, body, weight], index) => (
              <li key={name} className={weight ? 'is-primary' : ''}>
                <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Figure
          src={opportunityMatrix}
          alt="Opportunity prioritisation matrix: fix the critical bugs, show hotel phone numbers, notify travellers of price changes and show seat availability now; plan and build cab booking, approval intelligence, hotel ratings, self-service cancellation, an invoice hub, a trip workspace and an emergency mode"
          source="Research repository · opportunity matrix"
          caption="Quick wins first — mostly reliability fixes — then the larger bets."
          onZoom={zoom}
        />
      </Section>

      {/* 09 / DESIGN EXPLORATION */}
      <Section
        id="zt-design"
        number="09"
        label="Design exploration"
        title="From one conversation to a trip-first product."
        intro="Two directions, developed at different points in the internship: a conversational assistant prototyped early, and a ZipTrrip 2.0 structure and user flow designed after the research."
      >
        <div className="zt-direction">
          <div className="zt-direction__text">
            <p className="zt-label">Direction A · Conversational assistant · late May</p>
            <h3 className="zt-h3">Tell it where you’re going. It handles the rest.</h3>
            <p>
              A single conversation that carries a trip from request to approval, built and iterated through 14 versions.
              Recommendations explain themselves, policy shows inline, and the approval shows exactly where it is.
            </p>
            <p className="zt-aside">
              I built it before the interviews. They reshaped it: users wanted an assistant that suggests, not an agent that
              books — so in 2.0, AI became an optional path rather than the only one.
            </p>
          </div>
          <div className="zt-gallery">
            <Figure src={protoFlights} alt="Prototype: flight options for a Mumbai to Bangalore trip, with policy tags and a recommended flight explaining why — within company policy, lands two hours before the meeting, booked on this route before" source="Recommend" caption="Every recommendation says why." onZoom={zoom} />
            <Figure src={protoHotels} alt="Prototype: two hotels near the client office in Whitefield, showing distance from the office, review score, policy status and free cancellation" source="Compare" caption="Distance from where the work is." onZoom={zoom} />
            <Figure src={protoApproval} alt="Prototype: an approval request sent on WhatsApp, with a timeline of request created, sent, viewed by manager, decision pending and booking confirmed, plus expected time and amount" source="Approve" caption="The approval, no longer a black box." onZoom={zoom} />
          </div>
          <p className="zt-note">Prototype with sample data. Not shipped.</p>
        </div>

        <div className="zt-direction">
          <div className="zt-direction__text">
            <p className="zt-label">Direction B · ZipTrrip 2.0 · July</p>
            <h3 className="zt-h3">Organised around trips, not bookings.</h3>
            <p>
              The proposed structure replaces separate flight and hotel tabs with Trips and a Workspace for everything about
              one trip — plus Recovery for when plans change, and Memory so the platform never asks twice.
            </p>
          </div>
          <div className="zt-pair zt-pair--ia">
            <Figure src={sections20} alt="ZipTrrip 2.0 information architecture: Home, Trips, Discover, Workspace, Recovery, Memory and Admin, with what each section contains" source="2.0 · information architecture" onZoom={zoom} />
            <Figure src={model20} alt="ZipTrrip 2.0 system model: a user’s need to visit Bangalore passes through an intent engine using memory, policy and company data, then a recommendation engine for flights, hotels, buses, cabs, trains and approvals, into a trip workspace, continuous recovery and journey memory" source="2.0 · system model" onZoom={zoom} />
          </div>
          <Figure
            src={userflow20}
            alt="ZipTrrip 2.0 end-to-end user flow: an AI path and a quick-booking path for flights, hotels, buses, trains and cabs, each showing three preferences based on travel history with reasons, triggers to add related bookings, approval, and a branch that notifies the traveller and admin if the price increases"
            source="2.0 · end-to-end user flow"
            caption="Each service shows three options based on travel history, with reasons. Related bookings are suggested in context. If a fare rises, the traveller and admin are told and the approval is re-sent."
            onZoom={zoom}
          />
          <p className="zt-note">Proposed flow. Click any image to read it at full size.</p>
        </div>

        <p className="zt-label zt-label--spaced">How the designs answer the findings</p>
        <ul className="zt-responses">
          {RESPONSES.map(([problem, response, where]) => (
            <li key={problem}>
              <span className="zt-responses__problem">{problem}</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span className="zt-responses__response">{response}</span>
              <span className="zt-responses__where">{where}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 10 / OUTCOME */}
      <Section
        id="zt-outcome"
        number="10"
        label="The outcome"
        title="What I handed over."
        intro="The internship produced research, a strategy and design directions — recommendations and concepts for the founders and product team, not shipped features."
        tone="soft"
      >
        <div className="zt-delivered">
          {DELIVERED.map(([group, items]) => (
            <div key={group}>
              <h3>{group}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 11 / REFLECTION */}
      <Section id="zt-reflection" number="11" label="Reflection" title="The interface was the smallest part.">
        <div className="zt-reflection">
          <div>
            <h3>Research before solutions</h3>
            <p>
              My first prototype came before I had spoken to a single customer. The interviews changed it — and changed how
              I start. I used to jump straight to a solution; now I want the evidence first.
            </p>
          </div>
          <div>
            <h3>Contradictions are data</h3>
            <p>
              One person wanted fewer approval layers; another needed them for control. One would trust AI with everything;
              another wouldn’t trust it with a non-refundable fare. Looking for patterns across everyone, not one strong
              opinion, made the recommendations defensible.
            </p>
          </div>
          <div>
            <h3>Design the system around the screen</h3>
            <p>
              The hardest problems sat between people — managers, admins, finance, support. Experience design in an
              enterprise product means designing for that whole system, not just the booking screen.
            </p>
          </div>
        </div>
      </Section>

      {/* NEXT PROJECT */}
      {nextProject && (
        <section className="zt-next" aria-labelledby="zt-next-title">
          <div className="zt-wrap">
            <p id="zt-next-title" className="zt-kicker">Next project <ArrowUpRight size={12} aria-hidden="true" /></p>
            <ol className="archive__list archive__list--single">
              <ProjectRow project={nextProject} index={2} onOpen={onOpenProject} />
            </ol>
          </div>
        </section>
      )}

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </article>
  );
};

export default ZiptrripCaseStudy;
