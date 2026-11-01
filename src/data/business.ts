// Facts sourced from maidnew.ca (home, about, pricing, quote, contact, terms) on 2026-11-01.
// Edit here, not in components. Anything marked `verify` needs client confirmation.
export const business = {
  name: 'Maid New',
  tagline: 'Home, office and Airbnb cleaning in Red Deer, Alberta',
  phone: '(587) 306-0182',
  phoneHref: 'tel:+15873060182',
  smsHref: 'sms:+15873060182',
  email: 'admin@maidnew.ca',
  address: '4013 47 St, Red Deer, AB T4N 2Y4',
  hours: [
    { days: 'Monday – Saturday', time: '9 a.m. – 5 p.m.' },
    { days: 'Sunday', time: 'Closed' },
  ],
  sundayNote: 'Sunday: closed, with move-outs and Airbnb turnovers by arrangement. Commercial cleaning is never booked on a Sunday.',
  since: 2023,
  rating: '5.0',
  reviewCount: 27,
  ownerExperience: '20+ years',
  gstNote: '5% GST is added to every price, extra and travel fee.',
  quoteUrl: 'https://maidnew.ca/quote/',
  siteUrl: 'https://maidnew.ca',
  // Existing site advertises "under 30 minutes" without stating whether that is within business hours.
  quoteReplyClaim: 'under 30 minutes',
  quoteReplyVerify:
    'Maid New’s current site advertises quotes in under 30 minutes. This concept keeps that wording but shows it separately from business hours. Proposed clarification (needs client approval): “Within 30 minutes during business hours.”',
  sitepilot: { name: 'SitePilot', url: 'https://sitepilotdesign.ca' },
} as const

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export const trust = [
  { icon: 'mapPin', title: 'Locally owned', text: 'Red Deer based, since 2023' },
  { icon: 'users', title: 'Same crew every visit', text: 'Standing policy, nothing to request' },
  { icon: 'receipt', title: 'Flat, upfront pricing', text: 'Approved before the first clean' },
  { icon: 'star', title: '5.0 on Google', text: '27 published reviews' },
] as const
