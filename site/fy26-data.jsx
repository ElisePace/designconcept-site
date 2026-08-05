// Blue Insights — FY26 Revenue: content model (ported from the Figma-Make source app)
const REVENUE = [
  { label: 'Q1', value: 8.4 },
  { label: 'Q2', value: 9.6 },
  { label: 'Q3', value: 8.45 },
  { label: 'Q4', value: 8.9, projected: true },
];

const SOURCES = [
  {
    id: 1,
    title: 'Revenue warehouse — Q3 rollup',
    type: 'Warehouse view · read-only',
    updated: 'Updated 28 Jul 2026, 06:00 UTC',
    snippet: 'Materialised from fct_revenue nightly. EMEA / enterprise segment, recognised revenue.',
    rows: [
      { k: 'EMEA enterprise renewals (Q2)', v: '$4.10M' },
      { k: 'EMEA enterprise renewals (Q3)', v: '$2.95M' },
      { k: 'Change QoQ', v: '−28.0%' },
    ],
  },
  {
    id: 2,
    title: 'Renewals tracker (CSV)',
    type: 'Export · owned by RevOps',
    updated: 'Updated 14 Jul 2026, 09:12 UTC',
    snippet: 'account_id,region,segment,renewal_status,moved_quarter\nEMEA-0442,EMEA,ENT,in_negotiation,Q4',
    rows: [
      { k: 'Renewals pushed to Q4', v: '12 accounts' },
      { k: 'Status "in negotiation"', v: '4 accounts' },
      { k: 'Closed lost', v: '3 accounts' },
    ],
  },
  {
    id: 3,
    title: 'Q3 finance commentary (doc)',
    type: 'Finance narrative · signed off',
    updated: 'Updated 22 Jul 2026, 15:40 UTC',
    snippet: '“New-business bookings held flat QoQ; the Q3 shortfall is a renewals-timing effect, not demand.”',
    rows: [
      { k: 'New-business bookings', v: 'Flat QoQ (+0.4%)' },
      { k: 'Expansion revenue', v: '+3.1% QoQ' },
      { k: 'Net revenue retention', v: '104%' },
    ],
  },
];

const WHY = {
  1: 'Compared recognised renewal revenue for the EMEA enterprise segment in Q3 against Q2 in the warehouse rollup; the −28% is the raw QoQ delta.',
  2: 'Counted accounts in the renewals tracker whose renewal quarter moved from Q3 to Q4. In-negotiation deals were included in that count.',
  3: 'Checked new-business bookings in the finance commentary — flat QoQ — which points away from demand as the driver and toward renewal timing.',
};

const PIPELINE = [
  { key: 'annotation', label: 'Analysing the annotation' },
  { key: 'retrieve', label: 'Retrieving sources you can access' },
  { key: 'figures', label: 'Checking the figures' },
  { key: 'draft', label: 'Drafting the explanation' },
];

const SCENARIOS = {
  Q1: { qoq: '5%', qoqCorr: '3%', renewal: '14%', renewalCorr: '10%', pushed: '6', pushedCorr: '4' },
  Q2: { qoq: '3%', qoqCorr: '2%', renewal: '9%', renewalCorr: '6%', pushed: '4', pushedCorr: '3' },
  Q3: { qoq: '12%', qoqCorr: '9%', renewal: '28%', renewalCorr: '21%', pushed: '12', pushedCorr: '8' },
  Q4: { qoq: '7%', qoqCorr: '5%', renewal: '18%', renewalCorr: '13%', pushed: '9', pushedCorr: '6' },
};

const ANSWER_BLOCKS = { evidence: SOURCES.length, assumption: 1, unknown: 1 };

function agentStatus(phase, step, sourceCount, correcting) {
  if (phase === 'idle') return 'Waiting for a question.';
  if (phase === 'answer') return 'Done — your move.';
  const p = PIPELINE[Math.max(0, Math.min(step, PIPELINE.length - 1))];
  if (p.key === 'retrieve') return `Retrieving ${sourceCount} sources you can access…`;
  if (p.key === 'draft') return correcting ? 'Redrafting with your correction…' : 'Drafting…';
  return `${p.label}…`;
}

function turnLabel(phase) {
  if (phase === 'working') return 'Agent working';
  if (phase === 'answer') return 'Waiting for you';
  return 'Ready when you are';
}

Object.assign(window, { REVENUE, SOURCES, WHY, PIPELINE, SCENARIOS, ANSWER_BLOCKS, agentStatus, turnLabel });
