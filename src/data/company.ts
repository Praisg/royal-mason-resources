const DEFAULT_WHATSAPP = '263789569999'
const DEFAULT_EMAIL = 'royalmasonresources@outlook.com'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

const whatsappDigits =
  digitsOnly(import.meta.env.VITE_WHATSAPP_NUMBER || '') || DEFAULT_WHATSAPP

export const company = {
  name: 'Royal Mason Resources',
  shortName: 'RMR',
  tagline: 'Building Today, Securing Tomorrow',
  slogan: 'Quality Materials. Stronger Structures. Reliable. Durable. Built to Last.',
  partnerLine: 'Royal Mason Resources – Your Partner in Every Build.',
  positioning:
    'A well-established, Chinese-backed integrated building materials supplier based in Harare, Zimbabwe.',
  mission:
    'Capitalize on Zimbabwe’s infrastructure boom by delivering consistent, uncompromised quality — without raw material supply chain disruptions.',
  vision:
    'Become the preferred long-term partner for large-scale construction projects across Zimbabwe through stable supply, standard quality, reliable delivery, and cost competitiveness.',
  location: 'Domboshava Training Centre, Harare, Zimbabwe',
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || DEFAULT_EMAIL,
  phones: ['+263 789 569 999', '+263 718 059 999', '+263 786 122 062'] as const,
  whatsapp: whatsappDigits,
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID as string | undefined) || '',
  regions: ['Harare', 'Domboshava', 'Norton', 'Bulawayo', 'Surrounding regions'] as const,
  hours: 'Mon – Sat · 7:00 – 17:00',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products & Services', to: '/products' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
] as const

export const pillars = [
  {
    id: 'quality',
    title: 'Premium Quality',
    body: 'Machine-batched mixes and standard specifications — consistent strength for residential, industrial, and municipal works.',
  },
  {
    id: 'strength',
    title: 'Built for Strength',
    body: 'Engineering-grade concrete, steel, pavers, and quarry materials designed for structures that endure.',
  },
  {
    id: 'delivery',
    title: 'Trusted & On-Time Delivery',
    body: 'Reliable logistics across Harare and beyond, including boom pump services up to 40m for continuous site supply.',
  },
  {
    id: 'wholesale',
    title: 'Competitive Wholesale Supply',
    body: 'One-stop procurement with formal, regulated operations — competitive pricing without hidden risk.',
  },
] as const

export const industries = [
  {
    title: 'Private Homebuilders',
    body: 'Concrete, cement, sand, and gravel for residential construction with dependable stock.',
  },
  {
    title: 'High-end Residential & Villas',
    body: 'Crack-resistant quality and standard raw materials for premium builds.',
  },
  {
    title: 'Factories & Industrial Investors',
    body: 'High-strength concrete, engineering-grade cement, and standard steel products.',
  },
  {
    title: 'Foreign Enterprise Projects',
    body: 'Framework agreements and long-term bulk supply for Chinese and international investors.',
  },
  {
    title: 'Municipal Roadworks',
    body: 'High-grade materials capable of supporting continuous large-scale construction.',
  },
] as const

export const differentiators = [
  {
    title: 'End-to-end supply chain stability',
    body: 'Sufficient inventory and uninterrupted supply for long-term projects.',
  },
  {
    title: 'Zero hidden risk',
    body: 'Consistent quality, transparent pricing, and reliable after-sales support.',
  },
  {
    title: 'Strict quality controls',
    body: 'Machine-batched concrete and standard steel specifications you can specify with confidence.',
  },
  {
    title: 'Full formal regulated operations',
    body: 'A formal corporate partner for developers, municipalities, and foreign-funded enterprises.',
  },
] as const

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${company.whatsapp}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

/** Posts to Formspree when configured; always can fall back to WhatsApp. */
export async function submitLead(
  fields: Record<string, string>,
  options?: { alsoOpenWhatsApp?: boolean; whatsappMessage?: string },
) {
  const id = company.formspreeId.trim()
  if (id) {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, _subject: 'RMR website enquiry' }),
    })
    if (!res.ok) {
      throw new Error('Form submission failed')
    }
  }

  if (options?.alsoOpenWhatsApp !== false) {
    window.open(
      whatsappUrl(options?.whatsappMessage || Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return { viaFormspree: Boolean(id) }
}
