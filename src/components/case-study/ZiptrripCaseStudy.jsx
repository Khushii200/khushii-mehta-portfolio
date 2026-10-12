import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CasePlaceholder } from './CasePlaceholder';
import { Caption, Chapter, Col, Flow, pad } from './CaseStudyLayout';
import { Figure, Lightbox } from './CaseKit';
import { ProjectRow } from '../work/ProjectRow';
import { CompetitorMatrix } from './CompetitorMatrix';
import ztLogo from '../../assets/ziptrrip/zt-logo.png';
import ztEcosystem from '../../assets/ziptrrip/zt-ecosystem.webp';
import ztSegments from '../../assets/ziptrrip/zt-segments.jpg';
import ztJourneyMap from '../../assets/ziptrrip/zt-journey-map.jpg';
import ztFlightFlow from '../../assets/ziptrrip/zt-current-flight-flow.jpg';
import ztHotelFlow from '../../assets/ziptrrip/zt-current-hotel-flow.jpg';
import ztS1 from '../../assets/ziptrrip/zt-s01-search.jpg';
import ztS2 from '../../assets/ziptrrip/zt-s02-flights.jpg';
import ztS3 from '../../assets/ziptrrip/zt-s03-seats.jpg';
import ztS6 from '../../assets/ziptrrip/zt-s06-booking-com.jpg';
import ztS10 from '../../assets/ziptrrip/zt-s10-submitted.jpg';
import ztPolicy from '../../assets/ziptrrip/zt-s09-policy.jpg';
import ztNoHotels from '../../assets/ziptrrip/zt-s05-no-hotels.jpg';
import ztMaps from '../../assets/ziptrrip/zt-s08-maps.jpg';
import ztMatrix from '../../assets/ziptrrip/zt-opportunity-matrix.jpg';
import ztProtoFlights from '../../assets/ziptrrip/zt-proto-flights.jpg';
import ztProtoApproval from '../../assets/ziptrrip/zt-proto-approval.jpg';
import ztProtoTrip from '../../assets/ziptrrip/zt-proto-itinerary.jpg';
import ztCardTransfers from '../../assets/ziptrrip/zt-proto-transfers.jpg';
import ztCardHotels from '../../assets/ziptrrip/zt-proto-hotel-cards.jpg';
import ztCardRooms from '../../assets/ziptrrip/zt-proto-rooms.jpg';
import ztProtoV1 from '../../assets/ziptrrip/zt-proto-v1-flights.jpg';
import ztIa20 from '../../assets/ziptrrip/zt-20-sections.jpg';
import ztFlow20 from '../../assets/ziptrrip/zt-20-userflow.jpg';


/* ------------------------------------------------------------------
 * Sources: internship report and brief; customer research repository
 * (6 interviews, 4–10 June 2026); competitive benchmark (5 platforms,
 * 69 observations); ZipTrrip 2.0 strategy; the conversational prototype
 * (v1–v14); one screen recording of a full booking on the live product
 * (30 min 31 s). Interviewees are described by role.
 * ------------------------------------------------------------------ */

/*
 * IMAGE SLOTS — every visual on this page is a placeholder until you add the file.
 * To fill one: put the image in src/assets/ziptrrip/, import it at the top of this file,
 * then set `src` (and `alt`) on its entry below. Nothing else needs to change.
 *   e.g.  import ztLogo from '../../assets/ziptrrip/zt-logo.png';
 *         logo: { ..., src: ztLogo, alt: 'ZipTrrip logo' },
 */
const IMG = {
  logo:          { label: 'ZipTrrip logo', ratio: '4:3', src: ztLogo, alt: 'ZipTrrip logo', light: true },
  ecosystem:     { label: 'Corporate travel ecosystem diagram', ratio: '3:2', src: ztEcosystem, alt: 'Corporate travel ecosystem diagram: ZipTrrip at the centre, connected to the traveller, travel coordinator, company, approvers, finance and travel providers, each with their needs, above the travel journey — search, compare, decide, approve, book, travel, expense' },
  interview: { label: 'Interview synthesis · stakeholder segments', ratio: '2000:1415', src: ztSegments, alt: 'Research repository page “Who uses ZipTrrip and how”: three segments from the interviews — frequent travellers, travel coordinators and admins, approvers and finance — each with goals, pain points and success metrics' },
  flightFlow: { label: 'Current flight booking flow', ratio: '21:9', src: ztFlightFlow, alt: 'Annotated ZipTrrip flight booking flow: search, results and filters, then a choice between the corporate fare and the regular fare with cancellation and date-change charges' },
  hotelFlow: { label: 'Current hotel booking flow', ratio: '21:9', src: ztHotelFlow, alt: 'Annotated ZipTrrip hotel booking flow with filters, colleague-booked tags and a red branch for when the hotel is not listed' },
  session1: { label: 'Session · search', ratio: '16:9', src: ztS1, alt: 'ZipTrrip search page: Need to book a business trip?' },
  session2: { label: 'Session · compare fares', ratio: '16:9', src: ztS2, alt: 'ZipTrrip flight results with filters and corporate fares' },
  session3: { label: 'Session · seat & meal', ratio: '16:9', src: ztS3, alt: 'ZipTrrip seat map beside the meal list' },
  session4: { label: 'Session · off-platform', ratio: '16:9', src: ztS6, alt: 'Booking.com hotel results opened during the booking' },
  session5: { label: 'Session · pending approval', ratio: '16:9', src: ztS10, alt: 'ZipTrrip trip summary after submission, pending approval' },
  policy: { label: 'Exceeded-policy screenshot', ratio: '16:9', src: ztPolicy, alt: 'The Finalize your trip dialog with an Exceeded policy! warning: flight policy amount exceeded by 2465 and booking date exceeded by 2 days, with a mandatory reason before Send for approval' },
  noHotels: { label: 'Hotel search screenshot', ratio: '16:9', src: ztNoHotels, alt: 'ZipTrrip hotel search for Koramangala with Breakfast and 5 star filters, showing No matching hotels found' },
  maps: { label: 'Off-platform cab planning screenshot', ratio: '16:9', src: ztMaps, alt: 'Google Maps showing routes from Goregaon to Navi Mumbai International Airport, opened during the booking' },
  synthesis: { label: 'Research synthesis · journey map', ratio: '2000:1711', src: ztJourneyMap, alt: 'Research repository journey map: travel planning and request, then approvals, each with user goals, pain points, workarounds and an opportunity' },
  matrix: { label: 'Opportunity prioritisation matrix', ratio: '4:3', src: ztMatrix, alt: 'Opportunity prioritisation matrix: fix critical bugs now; plan cab booking, approval intelligence, hotel ratings, an invoice hub, a trip workspace and emergency mode' },
  convoFlights: { label: 'Conversational design · recommendations', ratio: '4:3', src: ztProtoFlights, alt: 'Prototype: flight options with policy tags and a recommended flight explaining why' },
  convoApproval: { label: 'Conversational design · approval timeline', ratio: '4:5', src: ztProtoApproval, alt: 'Prototype: approval request with a timeline — created, sent, viewed by manager, decision pending, booking confirmed' },
  convoTrip: { label: 'Conversational design · itinerary', ratio: '3:4', src: ztProtoTrip, alt: 'Prototype: a single itinerary with flight, transfer, hotel, return flight, policy checks and an emergency contact' },
  cardTransfers: { label: 'Comparison card · transfers', ratio: '1:1', src: ztCardTransfers, alt: 'Prototype transfer cards with pickup time, capacity and luggage' },
  cardHotels: { label: 'Comparison card · hotels', ratio: '1:1', src: ztCardHotels, alt: 'Prototype hotel cards with distance from the office, review score and policy status' },
  cardRooms: { label: 'Comparison card · rooms', ratio: '1:1', src: ztCardRooms, alt: 'Prototype room cards with size, bed, view and total stay' },
  iterV1: { label: 'Prototype v1', ratio: '16:9', src: ztProtoV1, alt: 'Prototype v1: three flight rows with times, price and a Best Value badge, no policy or reasoning' },
  iterV14: { label: 'Prototype v14', ratio: '16:9', src: ztProtoFlights, alt: 'Prototype v14: flight cards with policy and refundability tags and a recommended flight with reasons' },
  ia20: { label: 'ZipTrrip 2.0 information architecture', ratio: '4:3', src: ztIa20, alt: 'ZipTrrip 2.0 information architecture: Home, Trips, Discover, Workspace, Recovery, Memory and Admin' },
  flow20: { label: 'ZipTrrip 2.0 user flow', ratio: '16:9', src: ztFlow20, alt: 'ZipTrrip 2.0 end-to-end user flow with an AI path and a quick-booking path, preferences with reasons, approval, and re-approval if the price increases' },
  team01:        { label: 'Team photo 01', ratio: '4:3', src: null, alt: '', caption: '' },
  team02:        { label: 'Team photo 02', ratio: '4:5', src: null, alt: '', caption: '' },
  team03:        { label: 'Team photo 03', ratio: '1:1', src: null, alt: '', caption: '' },
  team04:        { label: 'Team photo 04', ratio: '1:1', src: null, alt: '', caption: '' },
  team05:        { label: 'Team photo 05', ratio: '16:9', src: null, alt: '', caption: '' },
};

/** One image slot: a labelled placeholder until `src` is set, then the real image (click to enlarge). */
const Slot = ({ id, source, caption, onZoom, className = '' }) => {
  const { label, ratio, src, alt, light } = IMG[id];
  // artwork made for a white ground (the logo) sits on a light frame, scaled down
  if (src && light) return <CasePlaceholder label={label} ratio={ratio} src={src} alt={alt} fit="contain" className="case-visual--light zt3-logo" />;
  if (src) return <Figure src={src} alt={alt} source={source} caption={caption} onZoom={onZoom} className={className} />;
  return (
    <figure className={`zt-figure zt3-slot ${className}`} data-slot={id}>
      <CasePlaceholder kind="Image placeholder" label={`[${label}]`} ratio={ratio} note={`IMG.${id}`} />
      {(source || caption) && (
        <figcaption>{source && <span className="zt-figure__source">{source}</span>}{caption}</figcaption>
      )}
    </figure>
  );
};

const TAKEAWAYS = [
  ['Policy shows up while people choose.', 'Four of the five platforms flagged out-of-policy options during booking; TravelPerk also explained why, and asked for a reason before payment.', 'Bring policy status into the moment of selection, rather than the final screen.'],
  ['Hotels are chosen with location in view.', 'Navan and TripGain paired hotels with a map, and Navan showed distance from the city centre; MyBiz and TripGain listed nearby attractions.', 'Show where a hotel sits relative to where the traveller actually needs to be.'],
  ['The last screen does more than confirm.', 'TravelPerk added extra baggage there, Travel Plus placed its travel request form there, and MyBiz let travellers add a meal at the very end.', 'Treat checkout as a place to finish the trip — requests, add-ons and approval in one step.'],
  ['Ground transport was covered unevenly.', 'Only MyBiz nudged an airport transfer during flight booking, and only TravelPerk’s car rentals were recorded; cab details appeared mainly on MyBiz.', 'Connect flights to the transfer and cab that follow them — a gap interviews raised too.'],
];

const META = [
  ['Project type', 'Product Design'],
  ['Role', 'UX Research + Design Intern, Founder’s Office'],
  ['Focus', 'Corporate Travel Experience · UX Research + Product Design'],
  ['Duration', '3 months · May — August 2026'],
];

const SERVICES = ['Flights and stays', 'Airport transfers', 'Visas', 'Group travel', 'Travel approvals'];

const OBJECTIVES = [
  ['Map', 'Document the current ZipTrrip user flows through primary and secondary research.'],
  ['Benchmark', 'Compare ZipTrrip’s flows and design against competitors in the category.'],
  ['Recommend', 'Propose a user flow and design framework grounded in what the research found.'],
];

const STAKEHOLDERS = [
  ['Traveller', 'Sales, field and tech staff booking their own trips', '“Book fast, and no surprises after booking.”'],
  ['Coordinator', 'Books for whole teams — one books 100–200 trips a month', '“Stay within budget, with zero escalations.”'],
  ['Approvers', 'Managers and heads of department, often two levels', '“Approve without switching context.”'],
  ['Finance', 'Airline GST invoices can arrive 45–75 days late', '“Invoices that reconcile.”'],
];

const METHODS = [
  ['Product walkthroughs', 'Every flow on the live product — flights, hotels, buses, trains, cabs — screen by screen.'],
  ['Competitive benchmark', 'Navan, TravelPerk, Travel Plus, MakeMyTrip MyBiz and TripGain, booked end to end; 69 observations.'],
  ['Customer interviews', 'Six interviews across six organisations, 4–10 June: travellers, coordinators and admins.'],
  ['Recorded session', 'One complete booking on the live product, screen-recorded from search to submission.'],
  ['Synthesis', 'Journey map, pain-point and bug logs, and an opportunity matrix.'],
];

const FINDINGS = [
  {
    slot: 'policy',
    time: '25:31',
    title: 'Policy arrived after every decision was made.',
    happened: 'The first policy check appeared on the final screen: the flight was ₹2,465 over the limit and booked two days too late.',
    mattered: 'Every competitor in the benchmark flags policy inline, while you choose. Here it became a penalty instead of guidance.',
  },
  {
    slot: 'noHotels',
    time: '10:01',
    title: 'Hotel search ended — and continued on Booking.com.',
    happened: 'Breakfast and 5-star in Koramangala returned “No matching hotels found”. Three minutes later the search moved to another site.',
    mattered: 'In interviews, 3 of 6 people had a bad hotel experience, and some book hotels outside ZipTrrip altogether.',
  },
  {
    slot: 'maps',
    time: '23:01',
    title: 'The cab was planned on a map, outside the product.',
    happened: 'The pickup point was checked on Google Maps before the airport cab could be booked.',
    mattered: 'Cab booking was the most requested missing feature; travellers switch to Ola, Uber or Rapido mid-journey.',
  },
];

const REPORTED = [
  ['Round-trip fare selection stalls', 'Booking freezes after selecting a fare — iOS and desktop. Reported by a travel admin.'],
  ['Blank white hotel search', 'No results and no error — the user can’t tell if it is loading or broken. Same admin.'],
  ['No seat availability count', 'Coordinators booking groups can’t see how many seats remain.'],
  ['Multi-layer approvals', 'Chains of up to four people; fares rose while requests waited. Raised in 5 of 6 interviews.'],
];

const JOURNEY = ['Search', 'Compare', 'Decide', 'Approve', 'Book', 'Coordinate', 'Resolve'];

const FRICTION_AT = [
  ['Compare', 'Corporate vs regular fares, charges, filters'],
  ['Decide', 'Hotels checked off-platform'],
  ['Approve', 'Policy at the end; chains of up to four'],
  ['Coordinate', 'Cabs, maps and WhatsApp outside the product'],
  ['Resolve', 'Support hard to find; cancellations via ops'],
];

const OPPORTUNITIES = [
  ['Adaptive approvals', 'Visible status, context for approvers, and re-approval only when a fare changes.', 'Approvals raised in 5 of 6 interviews', 'Prototype · 2.0 flow'],
  ['Invisible compliance', 'Show policy on every option, while choosing — not on the last screen.', 'Policy appeared after every decision', 'Prototype'],
  ['Smart recommendations', 'A few options, each with the reason it’s shown — “booked before”, “within policy”.', 'Hotel trust built on colleagues and history', 'Prototype · 2.0 flow'],
  ['Unified coordination', 'One conversation, one itinerary, one workspace for the whole trip.', 'Trips spread across email, WhatsApp, calls and Excel', 'Prototype · 2.0 structure'],
  ['Proactive support', 'Support visible in every trip view; alerts before problems land.', 'A stranded traveller didn’t know the helpline', 'Recommendation'],
  ['Automated expense handling', 'Invoices and expense drafts from the booking itself.', 'GST reconciliation done by hand', 'Recommendation'],
];

const DELIVERED = [
  ['Research', ['Customer research repository — 6 interviews, 14 pain points, 8 bugs', 'End-to-end journey map', 'Competitive benchmark — 5 platforms, 69 observations', 'Stakeholder research plan']],
  ['Strategy', ['ZipTrrip 2.0 direction — eight pillars', 'Opportunity prioritisation matrix', 'Product principles — “The Invisible Travel Manifesto”']],
  ['Design', ['Annotated maps of current booking flows', 'Conversational assistant prototype, v1 → v14', 'Comparison card system', 'ZipTrrip 2.0 information architecture and user flow']],
  ['Handover', ['Reliability and bug log for engineering', 'Walkthroughs and decks for founders and customers']],
];

const TEAM = [['team01', 'feature'], ['team02', 'tall'], ['team03', 'small'], ['team04', 'small'], ['team05', 'wide']];

/* ------------------------------------------------------------------ */

export const ZiptrripCaseStudy = ({ nextProject, onOpenProject }) => {
  const [zoomed, setZoomed] = useState(null);

  return (
    <article className="case-study case-study--zt">
      {/* HERO */}
      <header className="case-hero">
        <div className="case-grid">
          <Col col="1 / span 12">
            <p className="case-meta">02 / Product Design · Case study</p>
            <h1 className="case-title">
              Rethinking <span>Ziptrrip</span>
            </h1>
          </Col>
          <Col col="1 / span 6" md="1 / -1">
            <p className="case-lede">Making corporate travel less of a process, and more of a decision.</p>
            <p className="zt3-desc">
              ZipTrrip is a B2B corporate travel platform. Over a three-month internship I investigated how its users book,
              approve and coordinate work trips — and what the next version of the product should do differently.
            </p>
            <p className="bsnl-byline">Khushii Mehta · Fourth-year Experience Design student at FLAME University.</p>
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

      {/* 01 / THE COMPANY */}
      <Chapter id="zt-company" number={1} title="The company">
        <div className="case-grid case-grid--center">
          <Col col="1 / span 6">
            <h2 id="zt-company-title" className="case-h2">Corporate travel, beyond the booking.</h2>
            <p className="case-body case-body--lead">
              ZipTrrip helps companies manage employee travel in one place — bringing bookings, approvals and travel
              policies into a single platform, so travel is easier for employees and easier to control for the business.
            </p>
            <p className="case-body">
              Its customers are Indian companies whose employees travel for work. Its stated ambition is to become a
              business travel operating system — not just somewhere to buy a ticket.
            </p>
            <ul className="zt3-services" aria-label="Services">
              {SERVICES.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </Col>
          <Col col="8 / span 5">
            <Slot id="logo" />
          </Col>
        </div>
      </Chapter>

      {/* 02 / THE CHALLENGE */}
      <Chapter id="zt-challenge" number={2} title="The challenge" tone="ink">
        <div className="case-grid">
          <Col col="1 / span 10">
            <h2 id="zt-challenge-title" className="case-statement">
              The brief looked like a booking problem: map the flows, benchmark them, <em>recommend a better one.</em>
            </h2>
          </Col>
          <Col col="1 / -1">
            <ol className="case-points case-points--row">
              {OBJECTIVES.map(([title, body], index) => (
                <li key={title}>
                  <span className="case-points__num">{pad(index + 1)}</span>
                  <h3 className="case-sub">{title}</h3>
                  <p className="case-body">{body}</p>
                </li>
              ))}
            </ol>
          </Col>
          <Col col="1 / span 7">
            <p className="case-body case-body--lead zt3-question">
              But a corporate trip isn’t one person buying a ticket. Before anyone books, someone has to choose, check the
              policy, get approval and coordinate everything around it. The question became: where does that effort
              actually go?
            </p>
          </Col>
        </div>
      </Chapter>

      {/* 03 / THE ECOSYSTEM */}
      <Chapter id="zt-ecosystem" number={3} title="The ecosystem">
        <div className="case-grid">
          <Col col="1 / span 7">
            <h2 id="zt-ecosystem-title" className="case-h2">One trip, several people who want different things.</h2>
            <p className="case-body case-body--lead">
              The traveller wants speed. The coordinator wants zero escalations. The approver wants context. Finance wants
              invoices that add up. The product has to serve all of them on the same trip.
            </p>
          </Col>
          <Col col="1 / -1">
            <ul className="case-personas zt3-stakeholders">
              {STAKEHOLDERS.map(([name, profile, goal]) => (
                <li key={name}>
                  <p className="case-meta">{profile}</p>
                  <h3 className="case-sub">{name}</h3>
                  <p className="case-quote">{goal}</p>
                </li>
              ))}
            </ul>
            <Caption index={1} title="Stakeholder goals">
              Goals from the research repository’s stakeholder segments. Around them sat the tools that held trips
              together outside the product — email chains, WhatsApp nudges, calls and Excel trackers.
            </Caption>
          </Col>
          <Col col="1 / -1">
            <Slot id="ecosystem" source="Ecosystem" caption="ZipTrrip sits between six groups — traveller, travel coordinator, company, approvers, finance and travel providers — each needing something different from the same trip, along a journey from search to expense." onZoom={setZoomed} />
          </Col>
        </div>
      </Chapter>

      {/* 04 / RESEARCH */}
      <Chapter id="zt-research" number={4} title="Research">
        <div className="case-grid">
          <Col col="1 / span 6">
            <h2 id="zt-research-title" className="case-h2">Five ways into the problem.</h2>
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

          <Col col="1 / -1" className="zt3-landscape">
            <div className="zt3-landscape__head">
              <div>
                <p className="case-meta">The landscape</p>
                <h3 className="zt3-landscape__title">Different platforms, different strengths.</h3>
              </div>
              <p className="case-body">
                I analysed leading corporate travel platforms to understand how they support business travel, what sets
                them apart, and where common gaps exist. This helped identify opportunities for ZipTrrip to create a more
                intuitive, contextual and coordinated experience.
              </p>
            </div>
            <CompetitorMatrix caption="What my audit recorded for each platform, by capability" />
            <p className="case-caption">
              <span className="case-meta">Source</span>
              My handwritten audit, made while booking flights, hotels, trains, buses and cabs on each platform.
            </p>

            <div className="zt3-takeaways">
              <h3 className="bsnl-subhead">What the landscape revealed</h3>
              <ol>
                {TAKEAWAYS.map(([finding, evidence, opportunity], index) => (
                  <li key={finding}>
                    <span className="case-points__num">{pad(index + 1)}</span>
                    <h4>{finding}</h4>
                    <p>{evidence}</p>
                    <p className="zt3-takeaways__opp"><span className="case-meta">For ZipTrrip</span>{opportunity}</p>
                  </li>
                ))}
              </ol>
            </div>

            <p className="zt3-bridge">
              The benchmark showed what other platforms offered. It couldn’t show where ZipTrrip itself caused friction —
              for that I went to the product, and to the people using it.
            </p>
          </Col>
          <Col col="1 / span 7">
            <Slot id="interview" source="Customer interviews · segments" caption="Six interviews across six organisations, 4–10 June, synthesised into three user segments with their goals, pain points and success metrics." onZoom={setZoomed} />
          </Col>
          <Col col="8 / span 5" className="case-col--end">
            <p className="case-meta">What the interviews added</p>
            <p className="case-body">People didn’t ask for more airlines or hotels. They asked for visibility — where their approval was, whether a hotel would match its photos, and who to call when something went wrong.</p>
          </Col>
          <Col col="1 / -1">
            <Slot id="flightFlow" source="02 / Current flight flow" caption="Mapping the live flight flow screen by screen: before a seat is chosen, the traveller weighs corporate against regular fares, cancellation and change charges." onZoom={setZoomed} />
          </Col>
          <Col col="1 / -1">
            <Slot id="hotelFlow" source="03 / Current hotel flow" caption="The hotel flow showed the moment a request leaves the product: when a hotel isn’t listed, there is no way forward inside ZipTrrip." onZoom={setZoomed} />
          </Col>
        </div>
      </Chapter>

      {/* 05 / WHAT I DISCOVERED */}
      <Chapter id="zt-findings" number={5} title="What I discovered">
        <div className="case-grid">
          <Col col="1 / span 9">
            <h2 id="zt-findings-title" className="case-statement">
              In one recorded booking: half an hour, two other websites, and a policy warning at the very end.
            </h2>
          </Col>
          <Col col="1 / -1">
            <div className="zt3-strip">
              {[['session1', '00:00 · Search'], ['session2', '02:01 · Compare fares'], ['session3', '05:01 · Seat & meal'], ['session4', '13:01 · Off-platform'], ['session5', '27:01 · Pending approval']].map(([id, label]) => (
                <Slot key={id} id={id} source={label} onZoom={setZoomed} />
              ))}
            </div>
            <p className="case-caption">
              <span className="case-meta">Recorded session</span>
              One observed session on the live product — 30 min 31 s from search to submission. A single example, not an
              average.
            </p>
          </Col>

          <Col col="1 / -1">
            <div className="zt3-findings">
              {FINDINGS.map(({ slot, time, title, happened, mattered }, index) => (
                <article key={title} className={`zt3-findings__item ${index % 2 ? 'is-flip' : ''}`}>
                  <Slot id={slot} source={`${time} · Recorded session`} onZoom={setZoomed} />
                  <div className="zt3-finding">
                    <span className="case-points__num">{pad(index + 1)}</span>
                    <h3 className="case-sub">{title}</h3>
                    <p className="case-meta">What happened</p>
                    <p className="case-body">{happened}</p>
                    <p className="case-meta">Why it mattered</p>
                    <p className="case-body">{mattered}</p>
                  </div>
                </article>
              ))}
            </div>
          </Col>

          <Col col="1 / -1">
            <p className="case-meta zt3-reported">Reported in interviews — not captured in the recorded session</p>
            <ol className="case-points case-points--four zt3-reported-list">
              {REPORTED.map(([title, body], index) => (
                <li key={title}>
                  <span className="case-points__num">{pad(index + 1)}</span>
                  <h3 className="case-sub">{title}</h3>
                  <p className="case-body case-body--small">{body}</p>
                </li>
              ))}
            </ol>
          </Col>
          <Col col="1 / -1">
            <Slot id="synthesis" source="Synthesis · journey map" caption="The end-to-end journey map built from interview evidence: each stage with user goals, pain points, workarounds and an opportunity." onZoom={setZoomed} />
          </Col>
        </div>
      </Chapter>

      {/* 06 / THE STRATEGIC SHIFT */}
      <Chapter id="zt-shift" number={6} title="The strategic shift" tone="ink" className="case-chapter--hero-moment">
        <div className="case-grid">
          <Col col="1 / -1">
            <h2 id="zt-shift-title" className="case-shift-inline">
              <span>Booking interface</span>
              <ArrowRight aria-hidden="true" />
              <span>Decision journey</span>
            </h2>
          </Col>
          <Col col="1 / span 8">
            <p className="case-question case-question--muted">Flight booking was the part people praised — “10 on 10”.</p>
            <p className="case-question">The friction sat before and after it. So the goal moved from improving the booking interface to reducing effort across travel decisions and coordination.</p>
          </Col>
          <Col col="1 / -1">
            <Flow items={JOURNEY} label="The complete decision journey" className="case-flow--journey" />
          </Col>
          <Col col="1 / -1">
<ol className="case-steps-inline zt3-friction">
              {FRICTION_AT.map(([stage, where]) => (
                <li key={stage}><span className="case-points__num">{stage}</span>{where}</li>
              ))}
            </ol>
          </Col>
        </div>
      </Chapter>

      {/* 07 / OPPORTUNITY AREAS */}
      <Chapter id="zt-opportunities" number={7} title="Opportunity areas">
        <div className="case-grid">
          <Col col="1 / span 8">
            <h2 id="zt-opportunities-title" className="case-h2">Six opportunities, each tied to what I found.</h2>
            <p className="case-body case-body--lead">Some became prototypes, some shaped the 2.0 structure, and two stayed recommendations.</p>
          </Col>
          <Col col="1 / -1">
            <ol className="bsnl-findings">
              {OPPORTUNITIES.map(([name, idea, evidence, scope], index) => (
                <li key={name}>
                  <div className="bsnl-findings__claim">
                    <span className="case-points__num">{pad(index + 1)}</span>
                    <h3 className="case-sub">{name}</h3>
                    <p className="case-body">{idea}</p>
                  </div>
                  <ul className="bsnl-findings__evidence">
                    <li><p>{evidence}</p><span>Finding</span></li>
                    <li className={scope === 'Recommendation' ? 'zt3-rec' : ''}><p>{scope}</p><span>How far it went</span></li>
                  </ul>
                </li>
              ))}
            </ol>
          </Col>
          <Col col="3 / span 8">
            <Slot id="matrix" source="Prioritisation" caption="The order I recommended to the founders: reliability fixes first, then the larger bets." onZoom={setZoomed} />
          </Col>
        </div>
      </Chapter>

      {/* 08 / DESIGN EXPLORATIONS */}
      <Chapter id="zt-design" number={8} title="Design explorations">
        <div className="case-grid">
          <Col col="1 / span 8">
            <h2 id="zt-design-title" className="case-h2">One trip, one conversation.</h2>
            <p className="case-body case-body--lead">
              A working prototype I built and iterated through 14 versions: say where you’re going, and flights, transfer,
              hotel and approval follow in one thread — each step explaining itself.
            </p>
          </Col>
          <Col col="1 / span 7">
            <Slot id="convoFlights" source="01 / Smart recommendations" caption="Answers too many options and policy at the end: every option carries its policy status, and the recommendation says why." onZoom={setZoomed} />
          </Col>
          <Col col="8 / span 5" className="case-col--end">
            <Slot id="convoApproval" source="02 / Adaptive approvals" caption="Answers “I don’t know where my approval is”: a visible timeline, sent on WhatsApp — the approval channel users already loved." onZoom={setZoomed} />
          </Col>
          <Col col="1 / span 5">
            <Slot id="convoTrip" source="03 / Unified coordination" caption="Answers trips spread across five tools: the whole trip, policy checks and an emergency contact in one place." onZoom={setZoomed} />
          </Col>
          <Col col="6 / span 7">
            <h3 className="bsnl-subhead">The comparison card system</h3>
            <p className="case-body">Transfers, hotels and rooms carry different facts. One anatomy — visual and price, name, two or three decision facts, tags with a reason, one action — keeps them comparable.</p>
            <div className="zt3-cards">
              <Slot id="cardTransfers" source="Transfers" onZoom={setZoomed} />
              <Slot id="cardHotels" source="Hotels" onZoom={setZoomed} />
              <Slot id="cardRooms" source="Rooms" onZoom={setZoomed} />
            </div>
          </Col>

          <Col col="1 / -1">
            <h3 className="bsnl-subhead">Iteration · v1 → v14</h3>
          </Col>
          <Col col="1 / span 5" className="case-col--end">
            <Slot id="iterV1" source="v1 · late May" caption="v1 showed what was available. After the benchmark and interviews, v14 added policy status, refundability and reasons." onZoom={setZoomed} />
          </Col>
          <Col col="6 / span 7">
            <Slot id="iterV14" source="v14 · June" onZoom={setZoomed} />
          </Col>

          <Col col="1 / -1">
            <h3 className="bsnl-subhead">Then: ZipTrrip 2.0, organised around trips</h3>
            <p className="case-body bsnl-subhead__intro">Interviews made it clear AI should assist, not act alone. In 2.0, the conversation became one path beside a quick-booking flow, inside a product built around the trip.</p>
          </Col>
          <Col col="1 / span 6">
            <Slot id="ia20" source="04 / 2.0 structure" caption="Workspace for everything about one trip; Recovery for when plans change; Memory so the platform never asks twice." onZoom={setZoomed} />
          </Col>
          <Col col="7 / span 6">
            <Slot id="flow20" source="05 / 2.0 user flow" caption="If a fare rises during approval, the traveller and admin are told and the request is re-sent — the problem two interviewees described." onZoom={setZoomed} />
          </Col>
          <Col col="1 / -1">
            <p className="case-note">Prototype screens use sample data from the prototype’s own definitions. Prototype and 2.0 designs are proposals — not shipped.</p>
          </Col>
        </div>
      </Chapter>

      {/* 09 / OUTCOME */}
      <Chapter id="zt-outcome" number={9} title="Outcome">
        <div className="case-grid">
          <Col col="1 / span 7">
            <h2 id="zt-outcome-title" className="case-h2">What I handed over.</h2>
            <p className="case-body case-body--lead">Research, a strategy and design directions for the founders and product team. They remain recommendations and prototypes — none of it is claimed as shipped.</p>
          </Col>
          <Col col="1 / -1">
            <div className="case-columns">
              {DELIVERED.map(([title, items]) => (
                <div key={title}>
                  <h3 className="case-sub">{title}</h3>
                  <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </Col>
        </div>
      </Chapter>

      {/* 10 / REFLECTION */}
      <Chapter id="zt-reflection" number={10} title="Reflection">
        <div className="case-grid">
          <Col col="1 / -1">
            <h2 id="zt-reflection-title" className="visually-hidden">Reflection</h2>
            <div className="case-reflection">
              <div>
                <p className="case-meta">What changed</p>
                <p className="case-body">A clunky screen turned out to be a symptom. The real problem was a system of people and tools that the interface sat in the middle of.</p>
              </div>
              <div>
                <p className="case-meta">What I learnt</p>
                <p className="case-body">My first prototype came before I’d spoken to a customer. The interviews changed it — now I want the evidence first, and I treat contradictions between users as data.</p>
              </div>
              <div>
                <p className="case-meta">What I’d explore next</p>
                <p className="case-body">Testing the approval timeline and comparison cards with coordinators, and validating the 2.0 flow with real trips.</p>
              </div>
            </div>
          </Col>
        </div>
      </Chapter>

      {/* THE PEOPLE BEHIND THE PROJECT */}
      <section className="case-chapter zt3-team" aria-labelledby="zt-team-title">
        <div className="case-grid">
          <Col col="1 / span 7">
            <p className="case-meta">The team</p>
            <h2 id="zt-team-title" className="case-h2">The people behind the project.</h2>
          </Col>
          <Col col="1 / -1">
            <div className="zt3-gallery">
              {TEAM.map(([id, slot]) => (
                <div key={id} className={`zt3-gallery__item zt3-gallery__item--${slot}`}>
                  <Slot id={id} caption={IMG[id].caption} onZoom={setZoomed} />
                </div>
              ))}
            </div>
          </Col>
        </div>
      </section>

      {/* NEXT PROJECT */}
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

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </article>
  );
};

export default ZiptrripCaseStudy;
