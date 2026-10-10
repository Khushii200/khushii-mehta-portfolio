import React, { useCallback, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectRow } from '../work/ProjectRow';
import { Figure, Lightbox, Section } from './CaseKit';

import storyboard from '../../assets/solarlink/sl-storyboard.jpg';
import solarSunday from '../../assets/solarlink/sl-solar-sunday.jpg';
import blueprint from '../../assets/solarlink/sl-blueprint.jpg';
import installationProcess from '../../assets/solarlink/sl-installation-process.jpg';
import secretaryJourney from '../../assets/solarlink/sl-secretary-journey.jpg';
import affinityRaw from '../../assets/solarlink/sl-affinity-raw.jpg';

/* ------------------------------------------------------------------
 * Content — taken from the team's FigJam board
 * (“Service design final · Team 5”). Interview guides are shown as
 * research intent; the board holds no transcripts or participant
 * counts, so none are claimed. The Shantivan story is the team's
 * scenario for the concept, not a delivered project.
 * ------------------------------------------------------------------ */

const FACTS = [
  ['Brief', 'UN SDG 7 · Target 7.2 — increase the share of renewable energy'],
  ['Focus', 'Rooftop solar for housing societies in India'],
  ['Format', 'Service design team project · Team 5'],
  ['Output', 'Service concept, blueprint and story'],
];

const METHODS = ['Secondary research', 'Stakeholder mapping', 'Interview guides', 'Personas', 'Affinity mapping', 'Journey mapping', 'How might we', 'Ideation', 'Service blueprint', 'Storyboarding'];

const INDIA = [
  ['13%', 'of the targeted 1 crore homes had gone solar by mid-2025 under PM Surya Ghar Yojana'],
  ['≈22.7%', 'of subsidy applications converted into installations'],
  ['4.9 GW', 'of residential rooftop solar added in H1 2025'],
];

const STAKEHOLDERS = [
  ['Residents', 'Decide, invest, live with the system'],
  ['Secretary & committee', 'Run the decision for the building'],
  ['Architects', 'Design roofs that can take solar'],
  ['Installers', 'Survey, mount, wire, commission'],
  ['Solar companies', 'Quote, supply, warranty'],
  ['DISCOMs', 'Net meter and grid approval'],
  ['MNRE & government', 'Subsidies, rules, portals'],
  ['Banks & municipality', 'Finance and permissions'],
];

const STAGES = ['Site assessment', 'Design & quotation', 'Permits, approvals & subsidy', 'Installation · 2–5 days', 'Grid connection & net metering', 'Testing & commissioning', 'Maintenance & monitoring'];

const GUIDES = [
  ['Solar panel installers', 7, ['Installation process and workflow', 'Client interaction and education', 'Maintenance and after-sales', 'Coordination and service gaps']],
  ['Architects', 6, ['Current practices with solar', 'Barriers and pain points', 'Design integration and aesthetics', 'Where the process causes friction']],
  ['Building secretaries', 8, ['How the building meets its energy needs', 'Awareness and attitudes to solar', 'How the society decides on big spends', 'Vendors, approvals and maintenance']],
];

const PERSONAS = [
  ['The building secretary', 'Newly elected secretary of a redeveloped 30-flat society in Ghatkopar, Mumbai', 'High common-area bills from lifts, lights and the reception AC — and residents with little awareness of solar.', 'Trusts vendors recommended by peers or neighbouring societies.'],
  ['The architect', 'Runs a design studio; enthusiastic about solar and BIPV', 'Integration is messy and poorly communicated between architects, clients and consultants.', '“Clients love the idea of sustainability… until they see the cost or realise the after-sales is chaos.”'],
  ['The installer', 'A decade of residential and commercial installs, leading a small team', 'Weak or uneven roofs, permit delays, low client awareness about maintenance.', 'Coordinates everything on WhatsApp; no unified tracking between client, supplier and DISCOM.'],
  ['The solar owner', 'Installed panels four years ago for about ₹8 lakh', 'Needed patience through the first two years, and had to learn net metering early.', '“At first, I thought spending 8 lakhs on solar panels was too much — now I realise it was the smartest investment I ever made.”'],
];

const CLUSTERS = [
  ['Perceptions & misconceptions', ['Many homeowners believe solar only works in sunny, desert-like regions', 'Users are unsure whether panels generate power on cloudy days', 'Energy is “invisible” — users act only when bills rise']],
  ['Policy & administration', ['DISCOM approval can take months', 'Policy clarity for multi-owner or society-level projects is missing', 'Most users don’t know where or how to register installations']],
  ['Service providers & maintenance', ['Each vendor uses their own pricing model, warranty policy and components', 'Technicians often unavailable for minor repair visits', 'Warranty claims are complicated and time-consuming']],
  ['Integration on real roofs', ['Panels often clash with tanks, ACs, antennas or uneven roofs', 'Rooftop access for technicians in high-rises is unsafe', 'Retrofitting is far harder than integrating at the design stage']],
  ['Collective action', ['Apartment societies debate responsibility for maintenance and billing', 'Housing committee heads are cost-driven and risk-averse', 'People prefer collective, not individual, green action']],
];

const INSIGHTS = [
  {
    finding: 'Adoption is held back by what people believe, not only by cost.',
    evidence: ['Myths about solar causing shocks, fires or heating problems persist', 'Awareness of net metering is extremely low', 'Advertising and government campaigns tend to be overly technical'],
    matters: 'Knowledge gaps, myths and perceptions shape whether a society is willing to invest at all.',
    hmw: 'How might we bring solar awareness into daily society life through fun, relatable and culturally relevant ways?',
  },
  {
    finding: 'Even when people are convinced, the process stops them.',
    evidence: ['Homeowners feel overwhelmed by too many vendors, forms and government steps', 'No unified agency manages installation from design to approval', 'Subsidies get delayed or misused by intermediaries'],
    matters: 'Logistical, technical and procedural hurdles act as barriers after awareness — the journey needs to be simplified end to end.',
    hmw: 'How might we reduce the confusion and delays in the approval process by creating one clear, guided way to get everything done?',
  },
  {
    finding: 'Trust travels through neighbours, not campaigns.',
    evidence: ['Trust deficit between users and vendors is high', 'Consumers trust peer recommendations more than digital campaigns', 'Elderly residents depend on friends’ opinions'],
    matters: '“Every vendor says something different; who should we trust?” — the society head’s journey stalls here.',
    hmw: 'How might we make comparing different solar proposals easy and visual, so that non-technical members can make fair choices?',
  },
  {
    finding: 'On a shared roof, it’s a group decision.',
    evidence: ['Residents in apartment complexes assume solar is infeasible on shared rooftops', 'Committees decide through meetings, AGMs and votes', 'Fear of upfront investment and disagreement between residents'],
    matters: 'One person can’t say yes. The decision has to carry the whole building — financially and socially.',
    hmw: 'How might we turn solar adoption from a technical project into something that brings the community together with pride and excitement?',
  },
  {
    finding: 'Installation isn’t the end of the journey.',
    evidence: ['After installation, user engagement drops drastically', 'Many systems stop performing optimally without users noticing', 'No standardised handover documents or performance logs'],
    matters: 'Adoption is also about ongoing reliability and serviceability — people need easy maintenance and visible performance.',
    hmw: 'How might we make solar maintenance feel like a routine community task rather than a burden or afterthought?',
  },
];

const EMOTIONS = [
  ['Identify rising costs', 'Curious and motivated', '“We need to find a way to cut costs and make our building more sustainable.”'],
  ['Initial research', 'Overwhelmed', '“Every vendor says something different; who should we trust?”'],
  ['Discuss with committee', 'Anxious', '“Some residents are excited, but others think it’s too expensive or risky.”'],
  ['Seek expert advice', 'Reassured but cautious', '“Now it sounds feasible, but will everyone agree to this cost-sharing model?”'],
  ['Committee vote', 'Relieved yet uncertain', '“We’ve made the right choice, but implementation needs to be transparent.”'],
];

const HMW_THEMES = [
  ['Making solar relatable and experiential', 'Awareness that fits into everyday society life.'],
  ['Simplifying the solar process and support', 'Paperwork, permissions and contracts in the background — a bridge between vendors and societies.'],
  ['Inclusive decision-making', 'Everyone in the society involved and heard.'],
  ['Community-focused financing', 'Paying for solar as a shared investment, not a heavy cost for a few.'],
];

const IDEA_STAGES = [
  ['Awareness', ['Solar Confession Booth', '“What if your roof could speak?” posters', 'Myth-busting explainers']],
  ['Vendors', ['Vendor comparison & decision portal', 'Public facilitation meetings', 'Online paperwork portal']],
  ['Installation', ['3D rooftop visualisation', 'Solar Experience Center', 'Mirror of Impact']],
  ['Energy saving', ['Savings dashboard', 'Bill translator in plain language', 'Society vs society energy battle']],
  ['Maintenance', ['Maintenance alert system', 'Annual health-check subscription', 'Neighbourhood micro-teams']],
  ['Community', ['Solar Pledge Wall', 'Building mentorship', 'Collective negotiation clubs']],
];

const CONVERSATIONS = [
  ['Electricity spending', 'Your yearly cost'],
  ['Savings potential', 'How much less'],
  ['Panel count', 'How many needed'],
  ['Panel types', 'What suits the terrace'],
  ['Financial payback', 'Years to recover'],
];

const GUIDED = [
  ['Terrace analysis', 'Space + sunlight'],
  ['Panel selection', 'Quality vs cost'],
  ['Vendor comparison', 'Rate + warranty'],
  ['Approvals & permissions', 'Docs + NOCs'],
  ['Installation supervision', 'On-ground checks'],
  ['Maintenance support', 'Long-term care'],
];

const DECISIONS = [
  ['A guide, not a vendor', 'SolarLink sits on the society’s side — comparing vendors on price transparency, warranty clarity, service history, panel efficiency and installation quality.', 'Answers the trust deficit between residents and vendors.'],
  ['Start with an experience, not a pitch', 'Solar Sunday turns the society’s own terrace into a space with three playful stations before any numbers come up.', 'Answers myths and campaigns that feel too technical.'],
  ['Three-to-four-word explanations', 'Cost, savings, panel count, type and payback, each in plain language.', 'Answers jargon-heavy discussions and unclear data.'],
  ['One owner for the paperwork', 'DISCOM approvals, structural checks, building NOCs and government forms handled end to end.', 'Answers months of approvals and too many forms.'],
  ['Decide together', 'Success stories from similar societies, then a committee comparing vendors with guidance.', 'Answers resident disagreement and a decision no one can make alone.'],
];

const OUTPUTS = [
  ['Research', ['Secondary research on solar technology and India’s rooftop context', 'Stakeholder map for residential solar', 'Interview guides for installers, architects and secretaries', 'Four personas', 'Affinity map and six insights', 'Journey maps for the society head and the installer']],
  ['Design', ['How-might-we statements in four themes', 'Ideation mapped across the solar journey', 'The SolarLink service concept', 'Service blueprint', 'Storyboard and the Solar Sunday narrative']],
  ['Left for later', ['Maintenance tracking and alert dashboards', 'A verified vendor comparison portal', 'Community financing models']],
];

/* ------------------------------------------------------------------ */

export const SolarlinkCaseStudy = ({ nextProject, onOpenProject }) => {
  const [zoomed, setZoomed] = useState(null);
  const zoom = useCallback((image) => setZoomed(image), []);

  return (
    <article className="case-study case-study--zt zt zt--solar">
      {/* HERO */}
      <header className="zt-hero">
        <div className="zt-wrap">
          <p className="zt-kicker"><span>04</span>Service design · Case study</p>
          <h1 className="zt-title">SolarLink.</h1>
          <p className="zt-subtitle">Helping a housing society say yes to solar — together.</p>
          <div className="zt-hero__grid">
            <p className="zt-lede">
              Everyone in the building likes the idea of solar. No one knows enough to confidently say yes. We looked at why
              rooftop solar stalls in Indian housing societies, and designed a service that guides a whole building from the
              first question to the final installation.
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
            src={storyboard}
            alt="Storyboard of the SolarLink concept: a confused society, the Solar Sunday experience on the terrace with a confession booth, AR energy visualiser and pledge wall, a guided six-step journey, building confidence through success stories and a clear comparison, and finally the building powered by solar"
            source="Concept storyboard"
            caption="The final concept in one frame: from the confusion loop, through Solar Sunday and a guided journey, to a building that went solar together."
            onZoom={zoom}
          />
        </div>
      </header>

      {/* 01 / CONTEXT */}
      <Section
        id="sl-context"
        number="01"
        label="The context"
        title="Solar is more than panels on a roof."
        intro="Our brief started from SDG 7.2 — increasing the share of renewable energy. India’s rooftop push is real, but our secondary research showed how much of it stalls between interest and installation."
      >
        <ul className="sl-stats">
          {INDIA.map(([value, text]) => (
            <li key={value}><strong>{value}</strong><span>{text}</span></li>
          ))}
        </ul>
        <p className="zt-note zt-note--block">Figures gathered in the team’s secondary research on India’s residential solar context.</p>

        <div className="zt-split sl-gap">
          <div className="zt-system" role="img" aria-label="Diagram: a rooftop solar decision in a housing society involves residents, the secretary and committee, architects, installers, solar companies, DISCOMs, MNRE and government, banks and the municipality">
            <p className="zt-system__core">One shared rooftop</p>
            <ul className="zt-system__nodes">
              {STAKEHOLDERS.map(([who, what]) => (
                <li key={who}><strong>{who}</strong><span>{what}</span></li>
              ))}
            </ul>
            <p className="zt-note">Stakeholders from the team’s residential solar stakeholder map</p>
          </div>
          <div className="zt-stack">
            <div>
              <p className="zt-label">The installation journey, as documented</p>
              <ol className="sl-stages">
                {STAGES.map((stage, index) => (
                  <li key={stage}><span className="zt-num">{String(index + 1).padStart(2, '0')}</span>{stage}</li>
                ))}
              </ol>
            </div>
            <p className="zt-callout zt-callout--tight">
              Seven stages, six or more organisations — and in a housing society, every one of them waits on a committee
              decision first.
            </p>
          </div>
        </div>
        <Figure
          src={installationProcess}
          alt="The team’s map of installing solar panels at home: site assessment and feasibility, system design and quotation, permits, approvals and subsidies, installation, grid connection and net metering, testing and commissioning, and maintenance and monitoring, each with its steps"
          source="Research board · installation process"
          caption="Each stage has its own steps, documents and people — from roof inspection to net metering approval to cleaning every two to four weeks."
          onZoom={zoom}
          className="sl-narrow"
        />
      </Section>

      {/* 02 / RESEARCH */}
      <Section
        id="sl-research"
        number="02"
        label="Research"
        title="Three sides of the same rooftop."
        intro="We wrote interview guides for the three groups who shape a building’s solar journey — the people who install it, design for it and decide on it — and built personas around each."
        tone="soft"
      >
        <ul className="sl-guides">
          {GUIDES.map(([who, themes, topics]) => (
            <li key={who}>
              <p className="zt-label">{themes} themes</p>
              <h3>{who}</h3>
              <ul>{topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="zt-note zt-note--block">
          These are the questions we set out to ask — research intent, not findings. The findings are in the next section.
        </p>

        <p className="zt-label zt-label--spaced">Personas</p>
        <ul className="sl-personas">
          {PERSONAS.map(([role, who, pain, note]) => (
            <li key={role}>
              <h3>{role}</h3>
              <p className="sl-personas__who">{who}</p>
              <p><span className="zt-label">Pain point</span>{pain}</p>
              <p className="sl-personas__note">{note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 03 / SYNTHESIS */}
      <Section
        id="sl-synthesis"
        number="03"
        label="Synthesis"
        title="From a wall of notes to five insights."
        intro="We captured every barrier, observation and idea on sticky notes, then clustered them. These are a few, verbatim, from each cluster."
      >
        <div className="sl-clusters">
          <Figure
            src={affinityRaw}
            alt="The raw affinity board: dozens of colour-coded sticky notes about barriers, misconceptions and ideas around solar adoption"
            source="Affinity board"
            caption="Before clustering."
            onZoom={zoom}
          />
          <ul className="sl-clusters__list">
            {CLUSTERS.map(([name, notes]) => (
              <li key={name}>
                <h3>{name}</h3>
                <ul>{notes.map((note) => <li key={note}>{note}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>

        <p className="zt-label zt-label--spaced">What it told us</p>
        <ol className="sl-insights">
          {INSIGHTS.map(({ finding, evidence, matters, hmw }, index) => (
            <li key={finding}>
              <div className="sl-insights__head">
                <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{finding}</h3>
              </div>
              <div className="sl-insights__body">
                <div>
                  <p className="zt-chain__step">Evidence</p>
                  <ul>{evidence.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
                <div>
                  <p className="zt-chain__step">Why it matters</p>
                  <p>{matters}</p>
                </div>
                <div className="sl-insights__hmw">
                  <p className="zt-chain__step">Opportunity</p>
                  <p>{hmw}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 04 / THE SECRETARY'S JOURNEY */}
      <Section
        id="sl-journey"
        number="04"
        label="The decision"
        title="Where the journey actually stalls."
        intro="We mapped the society head’s journey across six phases. The first — deciding — is where most buildings get stuck, long before an installer arrives."
        tone="soft"
      >
        <ol className="sl-emotions" aria-label="The society head’s deciding phase, step by step">
          {EMOTIONS.map(([step, feeling, thought], index) => (
            <li key={step} className={index === 1 || index === 2 ? 'is-low' : ''}>
              <p className="zt-label">{String(index + 1).padStart(2, '0')} · {step}</p>
              <p className="sl-emotions__feeling">{feeling}</p>
              <p className="sl-emotions__thought">{thought}</p>
            </li>
          ))}
        </ol>
        <Figure
          src={secretaryJourney}
          alt="Journey map of the society head’s deciding phase: steps, touchpoints, descriptions, emotions, thoughts, pain points and opportunity areas, from noticing rising bills to a committee vote"
          source="Journey map · society head, deciding phase"
          caption="Pain points here are lack of awareness, jargon and unstandardised pricing, resident disagreement and unclear subsidies. The opportunities: awareness sessions, a verified marketplace, ROI tools, end-to-end consultant support and decision templates."
          onZoom={zoom}
        />
      </Section>

      {/* 05 / OPPORTUNITIES */}
      <Section
        id="sl-opportunities"
        number="05"
        label="Opportunities"
        title="Four directions, ideas across every stage."
        intro="Our how-might-we statements grouped into four themes. We then ideated widely — and mapped every idea to the stage of the solar journey it would serve."
      >
        <ol className="zt-patterns">
          {HMW_THEMES.map(([title, body], index) => (
            <li key={title}>
              <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>

        <p className="zt-label zt-label--spaced">A few of the ideas, by journey stage</p>
        <ul className="sl-ideas">
          {IDEA_STAGES.map(([stage, ideas]) => (
            <li key={stage}>
              <h3>{stage}</h3>
              <ul>{ideas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="zt-callout">
          No single idea answered all five insights. The final concept <strong>combines an awareness experience with an
          end-to-end guide</strong> — so the society both wants to go solar and can actually get there.
        </p>
      </Section>

      {/* 06 / FINAL CONCEPT */}
      <Section
        id="sl-concept"
        number="06"
        label="The concept"
        title="SolarLink: a guide that stays from the first question to the final installation."
        intro="A service for housing societies. It starts with an experience that helps every resident understand solar, then carries the committee through vendors, approvals, installation and maintenance."
        tone="soft"
      >
        <div className="sl-concept">
          <div className="sl-concept__text">
            <p className="zt-label">The entry point · Solar Sunday</p>
            <h3 className="zt-h3">The society’s own terrace becomes an awareness space.</h3>
            <p>Not corporate, not technical — three playful stations, each tied to a barrier from the research:</p>
            <ul className="zt-list">
              <li><strong>Solar Confession Booth</strong> — myths revealed</li>
              <li><strong>AR Energy Visualiser</strong> — see your savings</li>
              <li><strong>Pledge Wall</strong> — small habits matter</li>
            </ul>
            <p className="zt-label zt-label--spaced">Then, the real conversations — in three to four words</p>
            <ul className="sl-chips">
              {CONVERSATIONS.map(([topic, words]) => <li key={topic}><strong>{topic}</strong>{words}</li>)}
            </ul>
          </div>
          <Figure
            src={solarSunday}
            alt="Concept illustration of the Solar Sunday experience on a society terrace: a Solar Confession Booth, an AR energy visualiser and a pledge wall, with residents and SolarLink staff talking"
            source="Concept visual · Solar Sunday"
            onZoom={zoom}
          />
        </div>

        <p className="zt-label zt-label--spaced">The guided journey, explained at a meeting after Solar Sunday</p>
        <ol className="sl-guided">
          {GUIDED.map(([step, words], index) => (
            <li key={step}>
              <span className="zt-num">{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              <span>{words}</span>
            </li>
          ))}
        </ol>

        <p className="zt-label zt-label--spaced">Design decisions</p>
        <ul className="zt-responses">
          {DECISIONS.map(([decision, what, why]) => (
            <li key={decision}>
              <span className="zt-responses__problem">{decision}</span>
              <ArrowRight size={16} aria-hidden="true" />
              <span className="zt-responses__response">{what}</span>
              <span className="sl-why">{why}</span>
            </li>
          ))}
        </ul>

        <p className="zt-label zt-label--spaced">How it runs · service blueprint</p>
        <Figure
          src={blueprint}
          alt="SolarLink service blueprint with physical evidence, customer actions, onstage and backstage contact actions and support processes — from finding SolarLink online and on WhatsApp, through Solar Sunday and enquiries, approvals and vendor selection, to installation and maintenance"
          source="Service blueprint"
          caption="Front stage: website, WhatsApp, Solar Sunday stalls, a presentation with rooftop analysis, brochures. Back stage: planning the event with the secretary, handling government approvals, talking to vendors — supported by an event team, designers, a vendor database and an auto-reply agent."
          onZoom={zoom}
        />
        <p className="zt-note">
          The story of “Shantivan Society” and “Mr. Shah” is the team’s scenario for the concept. The illustrations are
          concept visuals. Nothing here was piloted.
        </p>
      </Section>

      {/* 07 / OUTCOME */}
      <Section id="sl-outcome" number="07" label="The outcome" title="What we produced." intro="A researched service concept — not a launched one. No pilot or measured results are part of this project.">
        <div className="zt-delivered sl-delivered">
          {OUTPUTS.map(([group, items]) => (
            <div key={group}>
              <h3>{group}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 08 / REFLECTION */}
      <Section id="sl-reflection" number="08" label="Reflection" title="The hardest part wasn’t the technology." tone="soft">
        <div className="zt-reflection">
          <div>
            <h3>A shared roof means a shared decision</h3>
            <p>
              We started by researching panels and inverters. The real constraint was a committee trying to agree — so the
              design had to work for a whole building, not one homeowner.
            </p>
          </div>
          <div>
            <h3>Trust comes before information</h3>
            <p>
              People already had information — too much of it, from too many vendors. What they lacked was someone on their
              side. That shaped SolarLink as a guide rather than a seller.
            </p>
          </div>
          <div>
            <h3>Fun has to lead somewhere</h3>
            <p>
              Our ideation was full of playful ideas. The useful ones were those that opened the door to the real
              conversation about cost, payback and process — Solar Sunday exists to get people to that meeting.
            </p>
          </div>
        </div>
      </Section>

      {/* NEXT PROJECT */}
      {nextProject && (
        <section className="zt-next" aria-labelledby="sl-next-title">
          <div className="zt-wrap">
            <p id="sl-next-title" className="zt-kicker">Next project <ArrowUpRight size={12} aria-hidden="true" /></p>
            <ol className="archive__list archive__list--single">
              <ProjectRow project={nextProject} index={4} onOpen={onOpenProject} />
            </ol>
          </div>
        </section>
      )}

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </article>
  );
};

export default SolarlinkCaseStudy;
