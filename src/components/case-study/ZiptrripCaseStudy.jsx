import React from 'react';
import { ArrowDown, ArrowRight, BedDouble, Building2, Car, CarTaxiFront, Plane } from 'lucide-react';
import { CasePlaceholder } from './CasePlaceholder';
import { Caption, Chapter, Chips, Col, Flow, FromTo, ListColumns, NumberedList, pad } from './CaseStudyLayout';
import { ProjectRow } from '../work/ProjectRow';

/* ------------------------------------------------------------------
 * Content — condensed from the Ziptrrip master case-study content.
 * No metrics, quotes or outcomes beyond what the source states.
 * ------------------------------------------------------------------ */

const META = [
  ['Role', 'Product / Experience Designer'],
  ['Duration', '3 months'],
  ['Company', 'ZipTrrip'],
];

const WORKED_ACROSS = ['UX Research', 'Competitive Analysis', 'Stakeholder Research', 'Usability Testing', 'Product Strategy', 'UX Design', 'Conversational Design', 'Prototyping'];

const SIMPLE_JOURNEY = ['I need to travel', 'Search', 'Choose', 'Get approval', 'Book', 'Done'];

const ECOSYSTEM = ['Employee', 'Manager', 'Manager', 'Travel / Admin', 'Finance', 'Confirmation'];

const COMPETING_NEEDS = ['Employee convenience', 'Company policy', 'Cost control', 'Approvals', 'Booking availability', 'Administration', 'Time-sensitive decisions'];

const QUESTIONS = [
  ['Understand', 'How do people currently travel for work?'],
  ['Diagnose', 'Where does the existing Ziptrrip experience break down?'],
  ['Compare', 'How are other corporate travel products solving similar problems?'],
  ['Improve', 'What could make Ziptrrip faster, clearer and easier to use?'],
];

const ROLE = [
  ['Research', ['Secondary research', 'Industry research', 'Competitive benchmarking', 'User interviews', 'Stakeholder interviews', 'Product observation', 'User testing']],
  ['Synthesis', ['Journey mapping', 'Pain-point identification', 'Opportunity mapping', 'UX problem definition', 'Pattern identification', 'Strategic recommendations']],
  ['Product + UX', ['User flows', 'Interaction design', 'Chatbot experience', 'Comparison systems', 'Booking experience', 'Approval experience', 'Interface recommendations']],
  ['Communication', ['Strategy documents', 'Research synthesis', 'Competitive benchmark', 'Product presentations', 'Prototypes', 'Founder / stakeholder presentations', 'Final handover']],
];

const COMPETITORS = ['MakeMyTrip MyBiz', 'ITILITE', 'Navan', 'TravelPerk', 'Concur', 'Yatra for Business', 'Thomas Cook Business Travel', 'SOTC Business Travels', 'Zoho Expense', 'Skyscanner'];

const GENERATIONS = [
  ['Gen 1', 'Operational travel infrastructure', 'Make business travel manageable.'],
  ['Gen 2', 'Consumerised enterprise travel', 'Make corporate travel feel like consumer travel.'],
  ['Gen 3', 'Intelligent operational ecosystems', 'Make the system proactively handle complexity.'],
];

const BENCHMARK = ['Search', 'Flight booking', 'Hotel booking', 'Approvals', 'Policy', 'Expenses', 'Recommendations', 'Support', 'Notifications', 'Administration', 'Automation', 'Personalisation'];

const OPPORTUNITIES = [
  ['Invisible compliance', 'The system quietly handles policy instead of making users constantly think about it.'],
  ['Smart recommendations', 'Help users see which option is actually best, rather than processing hundreds of options.'],
  ['Unified coordination', 'Flights, hotels, cabs, approvals and expenses should feel like parts of the same trip.'],
  ['Proactive support', 'Anticipate problems instead of waiting for users to report them.'],
  ['Automated expense handling', 'Reduce manual administrative work.'],
  ['Adaptive approvals', 'Make approvals faster and less bureaucratic.'],
];

const TESTED = ['Flight', 'Hotel', 'Cab', 'Approval', 'Round-trip', 'Multiple attempts', 'Different devices'];

const BREAKS = [
  ['Flight booking', 'No visible seat availability', 'Users could see a flight, but couldn’t easily tell how much availability remained.', 'Flight booking issue'],
  ['Hotel booking', 'Blank white screen', 'Hotel search could end on a blank white screen — loading, broken or waiting for input? Users couldn’t tell.', 'Hotel blank state'],
  ['Round-trip booking', 'Select Fare → stall', 'Select Fare could stall, particularly on iOS and desktop — after users had already invested time in search and comparison.', 'Round-trip Select Fare issue'],
];

const APPROVAL_CHAIN = ['Employee', 'Manager 1', 'Manager 2', 'Admin', 'Final confirmation'];

const REFRAME_LIST = ['Finding the right option', 'Understanding the option', 'Staying within policy', 'Getting approval', 'Coordinating bookings', 'Completing the transaction', 'Handling what happens next'];

const DECISION_JOURNEY = ['Search', 'Compare', 'Decide', 'Approve', 'Book', 'Coordinate', 'Resolve'];

const CHAT_AREAS = ['Flights', 'Hotels', 'Rental cars', 'Buses', 'Trains', 'Airport transfers', 'Customer support'];

const CHAT_FLOW = ['Flight', 'Itinerary', 'Seat', 'Meal', 'Hotel', 'Amenities · location · budget · preferences', 'Approval', 'Confirmation'];

const COMPARISON_TYPES = [
  ['Flights', Plane],
  ['Hotels', Building2],
  ['Rooms', BedDouble],
  ['Rental cars', Car],
  ['Airport transfers', CarTaxiFront],
];

const PRINCIPLES = [
  ['Reduce decisions, not just clicks.', 'A user doesn’t necessarily mind one extra click. They mind having to figure out what to do.'],
  ['Make complexity invisible.', 'Corporate travel is inherently complex. The interface doesn’t need to be.'],
  ['Show context at the moment of decision.', 'Users shouldn’t have to remember information from three screens ago.'],
  ['Design for the actual ecosystem.', 'Employees, managers, admins and companies are all part of the experience.'],
  ['Proactively resolve friction.', 'The best support experience is often the one that prevents the problem.'],
];

const DEVELOPMENT = [
  ['User flow exploration', 'User flows', 'Mapping flight, hotel, cab and approval journeys.'],
  ['Booking flow exploration', 'Booking flow', 'Reducing unnecessary decisions during travel selection.'],
  ['Chatbot exploration', 'Chatbot', 'Conversation as a unified travel coordination layer.'],
  ['Comparison card exploration', 'Comparison cards', 'One interaction model across very different travel options.'],
  ['Approval experience', 'Approvals', 'Making approvals faster and less bureaucratic.'],
];

const PROCESS = [
  ['Discover', 'Understand the industry, users and existing product.'],
  ['Investigate', 'Run interviews, testing and competitive research.'],
  ['Synthesise', 'Identify patterns, pain points and systemic problems.'],
  ['Define', 'Translate findings into opportunity areas.'],
  ['Explore', 'Develop possible product and interaction directions.'],
  ['Design', 'Build flows, interfaces and conversational experiences.'],
  ['Validate', 'Review ideas with stakeholders and test assumptions.'],
  ['Handover', 'Package the work into usable recommendations and prototypes.'],
];

const DELIVERED = [
  ['Research', ['Industry research', 'Competitor research', 'User research', 'Stakeholder interviews', 'Usability testing', 'Product audits']],
  ['Strategy', ['Competitive benchmark', 'Industry landscape', 'Opportunity areas', 'UX recommendations', 'Product strategy insights']],
  ['Design', ['User flows', 'Conversational UX', 'Chatbot interactions', 'Comparison cards', 'Booking explorations', 'UI / UX recommendations', 'Prototypes']],
  ['Communication', ['Research presentations', 'Strategy documents', 'Founder presentations', 'Product walkthroughs', 'Final handover']],
];

const NEXT = [
  ['Approval intelligence', 'How can the system understand approval requirements before the user reaches a blocker?'],
  ['Proactive travel assistance', 'How can Ziptrrip identify potential problems before users report them?'],
  ['Unified trip management', 'How can flights, hotels, cabs, approvals and expenses become one connected trip rather than separate transactions?'],
];

const AMBIGUITY = ['Explain design decisions', 'Present research', 'Defend findings', 'Turn messy information into actionable insights', 'Understand business constraints', 'Iterate quickly', 'Create structure from ambiguous problems'];

/* ------------------------------------------------------------------ */

export const ZiptrripCaseStudy = ({ project, nextProject, onOpenProject }) => (
  <article className="case-study case-study--ziptrrip">
    {/* HERO */}
    <header className="case-hero">
      <div className="case-grid">
        <Col col="1 / span 12">
          <p className="case-meta">02 / Product design / UX / Strategy · Case study</p>
          <h1 className="case-title">{project.title}</h1>
        </Col>
        <Col col="1 / span 7" md="1 / -1">
          <p className="case-statement case-statement--hero">Making corporate travel less of a process, and more of a decision.</p>
          <p className="case-body case-body--lead case-hero__support">
            Corporate travel involves far more than booking a flight. I explored how Ziptrrip could reduce the decisions,
            coordination and friction between “I need to travel” and “your trip is confirmed.”
          </p>
        </Col>
        <Col col="9 / span 4" md="1 / -1">
          <dl className="case-facts">
            {META.map(([term, value]) => (
              <div key={term}>
                <dt className="case-meta">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div className="case-facts__wide">
              <dt className="case-meta">Worked across</dt>
              <dd>{WORKED_ACROSS.join(' · ')}</dd>
            </div>
          </dl>
        </Col>
        <Col col="1 / -1" className="case-hero__visual">
          <CasePlaceholder kind="Hero image" label="Ziptrrip hero visual" ratio="16:9" size="hero" src={project.image} alt="" />
        </Col>
      </div>
    </header>

    {/* 01 / THE PROJECT */}
    <Chapter id="zt-project" number={1} title="The project">
      <div className="case-grid">
        <Col col="1 / span 8">
          <h2 id="zt-project-title" className="case-statement">Corporate travel is supposed to be simple.</h2>
        </Col>
        <Col col="1 / -1">
          <Flow items={SIMPLE_JOURNEY} label="The simple version of a work trip" className="case-flow--light" />
        </Col>
        <Col col="1 / span 5">
          <p className="case-body case-body--lead">In practice, it rarely is.</p>
          <p className="case-body">
            Multiple approval layers, scattered decisions, unclear information, repetitive forms, booking friction and poor
            visibility can turn a simple travel request into a long administrative process.
          </p>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="Corporate travel journey" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 02 / THE CONTEXT */}
    <Chapter id="zt-context" number={2} title="The context" tone="paper">
      <div className="case-grid">
        <Col col="1 / span 10">
          <h2 id="zt-context-title" className="case-statement">
            Corporate travel isn’t just a booking experience. <em>It is a coordination experience.</em>
          </h2>
        </Col>
        <Col col="1 / -1">
          <p className="case-meta case-label">Who is involved</p>
          <Flow items={ECOSYSTEM} label="People involved in one corporate trip" className="case-flow--nodes" />
        </Col>
        <Col col="1 / span 5">
          <p className="case-meta case-label">What they’re balancing</p>
          <Chips items={COMPETING_NEEDS} label="Competing needs" />
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder kind="Image / diagram placeholder" label="Corporate travel ecosystem" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 03 / THE CHALLENGE */}
    <Chapter id="zt-challenge" number={3} title="The challenge" tone="ink">
      <div className="case-grid">
        <Col col="1 / span 9">
          <h2 id="zt-challenge-title" className="case-statement">What is actually making corporate travel difficult?</h2>
        </Col>
        <Col col="1 / -1">
          <NumberedList items={QUESTIONS} className="case-points--four" />
        </Col>
        <Col col="1 / span 6">
          <p className="case-body">These four questions became the foundation for the three-month exploration.</p>
        </Col>
      </div>
    </Chapter>

    {/* 04 / MY ROLE */}
    <Chapter id="zt-role" number={4} title="My role">
      <div className="case-grid">
        <Col col="1 / span 7">
          <h2 id="zt-role-title" className="case-h2">Research, synthesis, product and communication.</h2>
        </Col>
        <Col col="1 / -1">
          <ListColumns columns={ROLE} />
        </Col>
      </div>
    </Chapter>

    {/* 05 / STARTING WITH THE ECOSYSTEM */}
    <Chapter id="zt-ecosystem" number={5} title="Starting with the ecosystem">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="zt-ecosystem-title" className="case-h2">Before the screens, the landscape.</h2>
          <p className="case-body">Before looking at individual screens, I wanted to understand where Ziptrrip sat within the larger corporate travel landscape.</p>
        </Col>
        <Col col="1 / -1">
          <ul className="case-logos" aria-label="Competitors studied">
            {COMPETITORS.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </Col>
        <Col col="1 / -1">
          <ol className="case-generations" aria-label="How corporate travel products evolved">
            {GENERATIONS.map(([gen, name, aim], index) => (
              <li key={gen}>
                <p className="case-meta">{gen}</p>
                <h3 className="case-generations__name">{name}</h3>
                <p className="case-body">{aim}</p>
                {index < GENERATIONS.length - 1 && <ArrowRight className="case-generations__arrow" size={22} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Competitive landscape / industry evolution" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 06 / COMPETITIVE BENCHMARKING */}
    <Chapter id="zt-benchmark" number={6} title="Competitive benchmarking">
      <div className="case-grid">
        <Col col="1 / span 9">
          <h2 id="zt-benchmark-title" className="case-statement">
            The question wasn’t “what features do they have?” It was: <em>“why do those features matter?”</em>
          </h2>
        </Col>
        <Col col="1 / span 5">
          <p className="case-meta case-label">Benchmarked across</p>
          <Chips items={BENCHMARK} label="Benchmark categories" className="case-chips--grid" />
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="Competitor benchmark" ratio="16:9" />
        </Col>
        <Col col="1 / span 10">
          <div className="case-callout">
            <p className="case-callout__lead">Adding more features doesn’t necessarily make Ziptrrip better.</p>
            <p className="case-callout__text">The opportunity was to reduce the amount of work the user has to do.</p>
          </div>
        </Col>
      </div>
    </Chapter>

    {/* 07 / THE CORE OPPORTUNITY */}
    <Chapter id="zt-opportunity" number={7} title="The core opportunity" tone="paper">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="zt-opportunity-title" className="case-h2">Six places to take work away from the user.</h2>
        </Col>
        <Col col="1 / -1">
          <ol className="case-cards case-cards--three">
            {OPPORTUNITIES.map(([title, body], index) => (
              <li key={title}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-sub">{title}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Opportunity map" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 08 / LOOKING AT THE ACTUAL PRODUCT */}
    <Chapter id="zt-product" number={8} title="Looking at the actual product">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-product-title" className="visually-hidden">Looking at the actual product</h2>
          <FromTo from="What do competitors do?" to="What actually happens when someone uses Ziptrrip?" size="large" />
        </Col>
        <Col col="1 / span 5">
          <p className="case-body case-body--lead">I ran product walkthroughs and usability testing across the whole journey.</p>
          <Chips items={TESTED} label="What was tested" />
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="Existing Ziptrrip user journey" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 09 / THE REALITY OF THE BOOKING JOURNEY */}
    <Chapter id="zt-reality" number={9} title="The reality of the booking journey" tone="ink" className="case-chapter--metrics">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-reality-title" className="visually-hidden">The reality of the booking journey</h2>
          <div className="case-metrics">
            <p className="case-metric"><strong>36</strong><span>minutes</span></p>
            <p className="case-metric"><strong><small>~</small>69</strong><span>clicks</span></p>
          </div>
        </Col>
        <Col col="1 / span 6">
          <p className="case-body case-body--lead">A complete Ziptrrip booking session could involve 36 minutes and approximately 69 clicks.</p>
        </Col>
        <Col col="7 / span 6">
          <p className="case-body">
            The pattern wasn’t simply “too many clicks.” <strong>The system was making users perform too many decisions and actions themselves.</strong>
          </p>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="User testing journey / click + time breakdown" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 10 / WHERE THINGS BROKE */}
    <Chapter id="zt-breaks" number={10} title="Where things broke">
      <div className="case-grid">
        <Col col="1 / span 7">
          <h2 id="zt-breaks-title" className="case-h2">Three moments where the journey stopped.</h2>
        </Col>
        <Col col="1 / -1">
          <ol className="case-issues">
            {BREAKS.map(([area, issue, body, visual], index) => (
              <li key={area}>
                <CasePlaceholder label={visual} ratio="4:3" note="Replace with real screenshot / recording" />
                <p className="case-meta">{pad(index + 1)} / {area}</p>
                <h3 className="case-issues__issue">{issue}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 11 / THE IOS INSIGHT */}
    <Chapter id="zt-ios" number={11} title="The iOS insight" tone="paper">
      <div className="case-grid">
        <Col col="1 / span 8">
          <h2 id="zt-ios-title" className="case-statement case-statement--xl">Ziptrrip = the iPhone app.</h2>
        </Col>
        <Col col="1 / span 5">
          <p className="case-body case-body--lead">One stakeholder interview fundamentally changed how I thought about the product.</p>
          <p className="case-body">
            Vivek Singh, a Central Booking Coordinator and frequent Ziptrrip user, didn’t think of it as the web platform the
            team did. His primary device was iOS, with laptop / desktop second.
          </p>
          <FromTo fromLabel="Assumed" from="A web platform" toLabel="Actually" to="iOS first, desktop second" size="compact" />
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="iOS experience / user context" ratio="16:9" />
        </Col>
        <Col col="1 / span 10">
          <p className="case-principle">
            Don’t design for the platform you think users use. <em>Design for the platform they actually use.</em>
          </p>
        </Col>
      </div>
    </Chapter>

    {/* 12 / THE APPROVAL BOTTLENECK */}
    <Chapter id="zt-approval" number={12} title="The approval bottleneck">
      <div className="case-grid">
        <Col col="1 / span 8">
          <h2 id="zt-approval-title" className="case-h2">Each additional layer introduces waiting.</h2>
          <p className="case-body">And waiting is particularly painful in travel, because travel decisions are time-sensitive.</p>
        </Col>
        <Col col="1 / -1">
          <ol className="case-approval" aria-label="Approval chain, with waiting added at every hand-off">
            {APPROVAL_CHAIN.map((step, index) => (
              <li key={step}>
                <span className="case-approval__step">{step}</span>
                {index > 0 && (
                  <span className="case-approval__wait" aria-label={`${index} wait${index > 1 ? 's' : ''} so far`}>
                    {Array.from({ length: index }, (_, i) => <i key={i} />)}
                    <em>{index === 1 ? 'wait' : `${index}× waiting`}</em>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Approval flow" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 13 / THE BIGGER PROBLEM */}
    <Chapter id="zt-bigger" number={13} title="The bigger problem" tone="paper">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-bigger-title" className="visually-hidden">The bigger problem</h2>
          <ol className="case-reframe">
            <li>
              <p className="case-meta">Initial framing</p>
              <p className="case-reframe__text"><s>Make booking easier.</s></p>
            </li>
            <li>
              <p className="case-meta">Research</p>
              <p className="case-reframe__body">Users weren’t simply struggling with booking. They were navigating decisions, policies, approvals, coordination and uncertainty.</p>
            </li>
            <li className="case-reframe__new">
              <p className="case-meta">New framing</p>
              <p className="case-reframe__text">Make corporate travel decisions faster.</p>
            </li>
          </ol>
        </Col>
        <Col col="1 / -1">
          <p className="case-meta case-label">What “faster” has to cover</p>
          <ol className="case-steps-inline">
            {REFRAME_LIST.map((item, index) => (
              <li key={item}><span className="case-points__num">{pad(index + 1)}</span>{item}</li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 14 / THE STRATEGIC SHIFT — hero moment */}
    <Chapter id="zt-shift" number={14} title="The strategic shift" tone="ink" className="case-chapter--hero-moment">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-shift-title" className="case-shift-title">
            <span>Booking platform</span>
            <ArrowDown className="case-shift-title__arrow" aria-hidden="true" />
            <span>Decision platform</span>
          </h2>
        </Col>
        <Col col="1 / span 5">
          <p className="case-meta">Instead of asking</p>
          <p className="case-question case-question--muted">“How do we help users book travel?”</p>
        </Col>
        <Col col="7 / span 6">
          <p className="case-meta">I started asking</p>
          <p className="case-question">“How do we help users make and complete travel decisions with the least possible effort?”</p>
        </Col>
        <Col col="1 / -1">
          <Flow items={DECISION_JOURNEY} label="The complete decision journey" className="case-flow--journey" />
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Strategic shift / decision platform visual" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 15 / CONVERSATIONAL TRAVEL */}
    <Chapter id="zt-chat" number={15} title="Conversational travel">
      <div className="case-grid">
        <Col col="1 / span 9">
          <h2 id="zt-chat-title" className="case-statement">
            Tell me where you’re going. <em>I’ll help you figure out the rest.</em>
          </h2>
        </Col>
        <Col col="1 / span 5">
          <p className="case-body case-body--lead">The goal wasn’t to place a chatbot over the existing interface.</p>
          <p className="case-body">The exploration asked whether conversation could become a unified travel coordination layer.</p>
          <p className="case-meta case-label">One conversation across</p>
          <Chips items={CHAT_AREAS} label="Supported areas" />
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="Conversational travel concept" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 16 / DESIGNING THE CONVERSATIONAL EXPERIENCE */}
    <Chapter id="zt-chatflow" number={16} title="Designing the conversational experience">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-chatflow-title" className="visually-hidden">Designing the conversational experience</h2>
          <p className="case-meta case-label">One trip, one conversation</p>
          <Flow items={CHAT_FLOW} label="Conversation flow" className="case-flow--light" />
        </Col>
        <Col col="1 / -1">
          <p className="case-shift-inline">
            <span>AI search</span>
            <ArrowRight aria-hidden="true" />
            <span>AI travel coordination</span>
          </p>
        </Col>
        <Col col="1 / span 6" md="1 / span 6">
          <CasePlaceholder label="Chatbot flow" ratio="16:9" />
        </Col>
        <Col col="7 / span 6" md="7 / span 6">
          <CasePlaceholder label="Chatbot UI / interaction" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 17 / THE COMPARISON CARD SYSTEM */}
    <Chapter id="zt-cards" number={17} title="The comparison card system" tone="paper">
      <div className="case-grid">
        <Col col="1 / span 5">
          <h2 id="zt-cards-title" className="case-h2">One system, many travel decisions.</h2>
          <p className="case-body">
            Flights, hotels, rooms, rental cars and airport transfers carry completely different information — yet users
            still need to compare options.
          </p>
        </Col>
        <Col col="7 / span 6" className="case-col--end">
          <p className="case-principle case-principle--tight">Same interaction model. <em>Different content.</em></p>
        </Col>
        <Col col="1 / -1">
          <ul className="case-compare" aria-label="The same comparison card adapting to each travel type">
            {COMPARISON_TYPES.map(([name, Icon]) => (
              <li key={name}>
                <span className="case-compare__head"><Icon size={16} aria-hidden="true" />{name}</span>
                <span className="case-compare__line" />
                <span className="case-compare__line case-compare__line--short" />
                <span className="case-compare__line" />
                <span className="case-compare__action" />
              </li>
            ))}
          </ul>
        </Col>
        <Col col="1 / -1">
          <CasePlaceholder label="Comparison card system" ratio="16:9" />
        </Col>
      </div>
    </Chapter>

    {/* 18 / DESIGN PRINCIPLES */}
    <Chapter id="zt-principles" number={18} title="Design principles">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-principles-title" className="visually-hidden">Design principles</h2>
          <ol className="case-principles">
            {PRINCIPLES.map(([title, body], index) => (
              <li key={title}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-principles__title">{title}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 19 / DESIGN DEVELOPMENT */}
    <Chapter id="zt-development" number={19} title="Design development">
      <div className="case-grid">
        <Col col="1 / span 6">
          <h2 id="zt-development-title" className="case-h2">From findings to flows.</h2>
        </Col>
        {DEVELOPMENT.slice(0, 4).map(([label, title, caption], index) => (
          <Col key={label} col={index % 2 === 0 ? '1 / span 6' : '7 / span 6'} md={index % 2 === 0 ? '1 / span 6' : '7 / span 6'}>
            <CasePlaceholder label={label} ratio="4:3" />
            <Caption index={index + 1} title={title}>{caption}</Caption>
          </Col>
        ))}
        <Col col="1 / span 5">
          <CasePlaceholder label={DEVELOPMENT[4][0]} ratio="4:3" />
          <Caption index={5} title={DEVELOPMENT[4][1]}>{DEVELOPMENT[4][2]}</Caption>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder label="UI / interaction exploration" ratio="16:9" />
          <Caption index={6} title="UI / interaction">Interface recommendations across the booking journey.</Caption>
        </Col>
      </div>
    </Chapter>

    {/* 20 / PROCESS */}
    <Chapter id="zt-process" number={20} title="Process">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-process-title" className="visually-hidden">Process</h2>
          <ol className="case-process">
            {PROCESS.map(([step, body], index) => (
              <li key={step}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-process__step">{step}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 21 / WHAT I DELIVERED */}
    <Chapter id="zt-delivered" number={21} title="What I delivered" tone="paper">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-delivered-title" className="visually-hidden">What I delivered</h2>
          <ListColumns columns={DELIVERED} />
        </Col>
      </div>
    </Chapter>

    {/* 22 / THE IMPACT */}
    <Chapter id="zt-impact" number={22} title="The impact">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-impact-title" className="visually-hidden">The impact</h2>
          <FromTo from="A platform that helps employees book corporate travel." to="A system that helps organisations coordinate travel with less effort." size="large" />
        </Col>
        <Col col="1 / -1">
          <Flow items={DECISION_JOURNEY} label="The whole journey, not one moment" className="case-flow--journey case-flow--quiet" />
        </Col>
        <Col col="1 / span 5">
          <p className="case-body case-body--lead">The biggest outcome wasn’t a single new screen. It was a shift in how the product could be understood.</p>
          <p className="case-body">Instead of optimising one moment, the product could begin optimising the entire travel journey.</p>
          <p className="case-note">No post-redesign business metrics are claimed here — the outcome was a strategic one.</p>
        </Col>
        <Col col="6 / span 7">
          <CasePlaceholder kind="Large image placeholder" label="Final Ziptrrip product / strategy visual" ratio="16:9" size="large" />
        </Col>
      </div>
    </Chapter>

    {/* 23 / WHAT I WOULD EXPLORE NEXT */}
    <Chapter id="zt-next-explore" number={23} title="What I would explore next">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-next-explore-title" className="visually-hidden">What I would explore next</h2>
          <ol className="case-cards case-cards--three">
            {NEXT.map(([title, body], index) => (
              <li key={title}>
                <span className="case-points__num">{pad(index + 1)}</span>
                <h3 className="case-sub">{title}</h3>
                <p className="case-body case-body--small">{body}</p>
              </li>
            ))}
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 24 / WHAT I LEARNED */}
    <Chapter id="zt-learned" number={24} title="What I learned" tone="paper">
      <div className="case-grid">
        <Col col="1 / -1">
          <h2 id="zt-learned-title" className="visually-hidden">What I learned about enterprise UX</h2>
          <div className="case-compare-chains">
            <div>
              <p className="case-meta">Before</p>
              <Flow items={['User', 'Interface', 'Task']} className="case-flow--compact" />
            </div>
            <div>
              <p className="case-meta">After</p>
              <Flow items={['User', 'Interface', 'Organisation', 'Policy', 'People', 'Approval', 'System', 'Task']} className="case-flow--compact case-flow--emphasis" />
            </div>
          </div>
        </Col>
        <Col col="1 / span 8">
          <p className="case-principle case-principle--tight">
            The interface is only one part of the experience. <em>A beautifully designed screen cannot fix a fundamentally inefficient system.</em>
          </p>
        </Col>
      </div>
    </Chapter>

    {/* 25 / DESIGNING WITH AMBIGUITY */}
    <Chapter id="zt-ambiguity" number={25} title="Designing with ambiguity">
      <div className="case-grid">
        <Col col="1 / span 5">
          <h2 id="zt-ambiguity-title" className="case-h2">Not only designing screens.</h2>
          <p className="case-body">As the primary design person on the team, I worked closely with the founders and stakeholders. That meant I also had to:</p>
        </Col>
        <Col col="7 / span 6">
          <Chips items={AMBIGUITY} label="What the role involved" className="case-chips--stack" />
        </Col>
        <Col col="1 / -1">
          <p className="case-loop" aria-label="Research, strategy, design and business informing each other">
            {['Research', 'Strategy', 'Design', 'Business'].map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <span aria-hidden="true">↔</span>}
                <strong>{item}</strong>
              </React.Fragment>
            ))}
          </p>
        </Col>
      </div>
    </Chapter>

    {/* 26 / THE BIGGEST TAKEAWAY */}
    <Chapter id="zt-takeaway" number={26} title="The biggest takeaway" tone="ink" className="case-chapter--hero-moment">
      <div className="case-grid">
        <Col col="1 / span 11">
          <h2 id="zt-takeaway-title" className="case-statement case-statement--xl">What should the user actually have to do?</h2>
        </Col>
        <Col col="1 / span 11">
          <p className="case-meta case-label">And more importantly</p>
          <p className="case-statement case-statement--xl case-statement--accent">What shouldn’t they have to do at all?</p>
        </Col>
        <Col col="1 / span 6">
          <p className="case-body">
            Good product design isn’t always about making the interface simpler. Sometimes the interface is only revealing a much
            bigger system problem — and the real opportunity is to understand that system well enough to decide what it should do differently.
          </p>
        </Col>
      </div>
    </Chapter>

    {/* 27 / REFLECTION */}
    <Chapter id="zt-reflection" number={27} title="Reflection">
      <div className="case-grid">
        <Col col="1 / span 5">
          <h2 id="zt-reflection-title" className="case-h2">Beyond the classroom brief.</h2>
          <p className="case-body case-body--lead">This internship was my first experience designing beyond the safety of a classroom project.</p>
          <ul className="case-nots">
            <li>No perfectly defined brief.</li>
            <li>No neatly packaged persona.</li>
            <li>No fixed problem statement.</li>
          </ul>
          <p className="case-body">
            The problem kept changing as I learned more. I learned to be comfortable with ambiguity, defend my thinking, work
            directly with stakeholders and move between research and execution.
          </p>
        </Col>
        <Col col="7 / span 6" className="case-col--end">
          <p className="case-meta case-label">I stopped treating UX as screen design. I started seeing it as</p>
          <ol className="case-closing">
            <li>Understanding a system,</li>
            <li>finding where people struggle inside it,</li>
            <li>and figuring out what the system should do differently.</li>
          </ol>
        </Col>
      </div>
    </Chapter>

    {/* 28 / NEXT PROJECT */}
    {nextProject && (
      <section className="case-chapter case-next" aria-labelledby="zt-next-title">
        <div className="case-grid">
          <Col col="1 / -1">
            <p id="zt-next-title" className="case-meta case-next__label">
              Next project <ArrowDown size={12} aria-hidden="true" />
            </p>
            <h2 className="case-next__title">{nextProject.title} →</h2>
          </Col>
          <Col col="1 / -1" className="case-next__card">
            <ol className="archive__list archive__list--single">
              <ProjectRow project={nextProject} index={2} onOpen={onOpenProject} />
            </ol>
          </Col>
        </div>
      </section>
    )}
  </article>
);

export default ZiptrripCaseStudy;
