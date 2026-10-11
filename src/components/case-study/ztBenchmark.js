/*
 * Competitor benchmark data — transcribed from the handwritten audit
 * (ZipTrrip/competitors.pdf, "Bucket 2: market hygiene"). Each status reflects
 * only what was recorded while booking on each platform:
 *   'yes'     Documented      — explicitly recorded in the audit
 *   'partial' Partial         — a limited or related capability was recorded
 *   'no'      Not documented  — not recorded; this does NOT mean the platform lacks it
 * `note` is the evidence from the audit, shown under the status.
 */

export const COMPETITORS = ['Navan', 'TravelPerk', 'Travel Plus', 'MakeMyTrip MyBiz', 'TripGain'];

const n = { s: 'no' };
const y = (note) => ({ s: 'yes', note });
const p = (note) => ({ s: 'partial', note });

export const BENCHMARK = [
  {
    group: 'Policy and compliance',
    rows: [
      ['Policy compliance (in / out of policy)', [y('Flags out-of-policy while booking'), y('Flags out-of-policy services'), y('Flags out-of-policy services'), n, y('Flags in- and out-of-policy while booking')]],
      ['Policy explanation and guidance', [y('Shows the company policy'), y('Explains why a service is out of policy'), n, n, n]],
      ['Approval workflows', [n, y('Asks for a reason to get approval before payment'), p('Travel request form at checkout'), n, n]],
    ],
  },
  {
    group: 'Booking and flexibility',
    rows: [
      ['Flight booking and search', [p('Flight details such as seat dimensions'), y('Luggage rules per selected flight'), y('Flight booking audited'), y('Flight booking audited'), y('Flight booking and smart web check-in')]],
      ['Change and cancellation policies', [y('Shown on the last page'), n, n, n, n]],
      ['Non-refundable fare warnings', [n, n, n, n, y('Pop-up before checkout if refundable fares exist')]],
    ],
  },
  {
    group: 'Hotel experience',
    rows: [
      ['Hotel booking and search', [y('Room types easy to tell apart'), y('Hotel booking audited'), y('Hotel booking audited'), y('Best room deal shown at top'), y('Hotel booking audited')]],
      ['Map view and location context', [y('Map view; distance from city centre'), n, n, n, y('Split list and map; hover highlights hotel')]],
      ['Nearby attractions and amenities', [n, n, n, y('Activities and attractions near the hotel'), y('Nearby locations and attractions')]],
      ['Flexible check-in and special requests', [n, p('Shows what travellers need at check-in'), y('Expected check-in time'), y('Early / late check-in; special requests'), y('Special requests before arrival')]],
    ],
  },
  {
    group: 'Ground transport',
    rows: [
      ['Car rentals', [n, y('Pick-up map; insurance included'), n, n, n]],
      ['Airport transfers', [n, n, n, y('Nudges airport transfer while booking flights'), n]],
      ['Train journey information', [n, y('Full journey with changes and times'), n, n, n]],
      ['Bus seat availability', [n, n, n, p('Bus photos, reviews and amenities'), y('Number of seats available')]],
    ],
  },
  {
    group: 'Additional services',
    rows: [
      ['Extra baggage', [n, y('Add extra baggage on the last page'), n, n, n]],
      ['Insurance options', [n, y('Insurance included for car rentals'), n, y('Flight, bus and train insurance'), n]],
      ['Loyalty programmes and offers', [y('Loyalty programme'), n, n, y('Offers, benefits and loyalty programme'), n]],
    ],
  },
  {
    group: 'Travel information',
    rows: [
      ['Carbon emissions or footprint', [y('Shows carbon emission'), y('Carbon emission / footprint'), n, n, y('Carbon emissions for flights')]],
      ['Seat information', [y('Seat dimensions'), n, n, y('Colour-coded seats with a legend'), n]],
      ['Train travel advisory', [n, n, n, y('Complete travel advisory for trains'), n]],
      ['Other contextual travel guidance', [n, y('Live news that may affect air travel'), y('Warns when airports don’t match'), y('Cab inclusions; waiting / hilly-area info'), p('Supplier name for flights and hotels')]],
    ],
  },
  {
    group: 'Payment and booking',
    rows: [
      ['Multiple payment methods', [n, n, n, n, y('Wallet, card, UPI, net banking')]],
      ['Pay-at-hotel option', [n, n, y('“Pay at hotel” facility'), n, n]],
    ],
  },
];

export const STATUS = {
  yes: { label: 'Documented', mark: '✓' },
  partial: { label: 'Partial', mark: '~' },
  no: { label: 'Not documented', mark: '—' },
};
