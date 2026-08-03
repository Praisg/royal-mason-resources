import { useState, type FormEvent } from 'react'
import BlurText from '../components/BlurText'
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons'
import { company, submitLead, telHref, whatsappUrl } from '../data/company'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const fields = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      project: String(fd.get('project') || ''),
      product: String(fd.get('product') || ''),
      quantity: String(fd.get('quantity') || ''),
      location: String(fd.get('location') || ''),
      message: String(fd.get('message') || ''),
    }
    const lines = [
      'Lead form — RMR website',
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone}`,
      `Project type: ${fields.project}`,
      `Product: ${fields.product}`,
      `Quantity: ${fields.quantity}`,
      `Delivery location: ${fields.location}`,
      `Message: ${fields.message || '—'}`,
    ]
    try {
      await submitLead(fields, { whatsappMessage: lines.join('\n') })
      setSent(true)
    } catch {
      setError('Could not submit the form. Opening WhatsApp instead.')
      window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
      setSent(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="page-atmosphere pt-28 pb-20">
      <section className="px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm font-body text-gold mb-4 tracking-[0.2em] uppercase">// Contact</p>
            <BlurText
              text="Let’s supply your next project"
              className="text-4xl md:text-6xl font-heading italic text-white leading-[0.9] tracking-[-2px] justify-start"
            />
            <p className="mt-5 text-white/70 font-body font-light max-w-md leading-relaxed">
              Share your project type, materials, and delivery location — we’ll follow up with
              availability and pricing.
            </p>

            <ul className="mt-10 space-y-4">
              <li className="liquid-glass rounded-2xl p-4 flex gap-3">
                <MapPinIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50 font-body">Location</p>
                  <p className="text-sm text-white font-body mt-1">{company.location}</p>
                </div>
              </li>
              <li className="liquid-glass rounded-2xl p-4 flex gap-3">
                <PhoneIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50 font-body">Phones</p>
                  <div className="mt-1 space-y-1">
                    {company.phones.map((p) => (
                      <a key={p} href={telHref(p)} className="block text-sm text-white hover:text-gold font-body">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="liquid-glass rounded-2xl p-4 flex gap-3">
                <MailIcon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/50 font-body">Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-sm text-white hover:text-gold font-body mt-1 break-all"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
            </ul>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="section-cream rounded-[1.75rem] p-6 md:p-8 text-navy space-y-4"
          >
            <h2 className="font-heading italic text-3xl tracking-tight">Project enquiry</h2>
            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-navy/55 font-body">Full name</span>
              <input name="name" required className="input-rmr" />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">Email</span>
                <input name="email" type="email" required className="input-rmr" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">Phone</span>
                <input name="phone" required className="input-rmr" />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">
                  Project type
                </span>
                <select name="project" required className="input-rmr">
                  <option value="">Select…</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Roadworks</option>
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">
                  Product required
                </span>
                <select name="product" required className="input-rmr">
                  <option value="">Select…</option>
                  <option>Ready-mix concrete</option>
                  <option>Steel / rebar</option>
                  <option>Pavers / bricks</option>
                  <option>Quarry materials</option>
                  <option>Mixed order</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">Quantity</span>
                <input name="quantity" required className="input-rmr" placeholder="e.g. 25 m³ / 10 MT" />
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-navy/55 font-body">
                  Delivery location
                </span>
                <input name="location" required className="input-rmr" />
              </label>
            </div>
            <label className="block space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-navy/55 font-body">
                Additional details
              </span>
              <textarea name="message" rows={4} className="input-rmr resize-y" />
            </label>
            <button type="submit" className="btn-gold w-full" disabled={pending}>
              {pending ? 'Sending…' : 'Submit enquiry'}
            </button>
            {error && <p className="text-sm text-red-700 font-body">{error}</p>}
            {sent && (
              <p className="text-sm text-navy/70 font-body">
                Thanks — we opened WhatsApp with your enquiry
                {company.formspreeId ? ' and sent a copy to our team' : ''}. If WhatsApp did not open,
                message us at +{company.whatsapp}.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
