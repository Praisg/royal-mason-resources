import { Link } from 'react-router-dom'
import { MailIcon, MapPinIcon, PhoneIcon } from '../Icons'
import { company, navLinks, telHref } from '../../data/company'

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 80% 0%, rgba(212,175,55,0.15), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/brand/logo.png" alt="" className="h-12 w-12 object-contain rounded-full bg-white" />
            <div>
              <p className="font-heading italic text-2xl leading-none tracking-tight">{company.name}</p>
              <p className="text-xs text-gold mt-1 tracking-[0.15em] uppercase font-body">{company.shortName}</p>
            </div>
          </div>
          <p className="text-sm text-white/70 font-body font-light leading-relaxed">{company.tagline}</p>
          <p className="mt-3 text-xs text-white/50 font-body">{company.hours}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-body">Navigate</p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/80 hover:text-gold font-body transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-body">Coverage</p>
          <ul className="space-y-2">
            {company.regions.map((r) => (
              <li key={r} className="text-sm text-white/80 font-body">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-body">Contact</p>
          <ul className="space-y-3 text-sm font-body text-white/80">
            <li className="flex gap-2 items-start">
              <MapPinIcon className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <span>{company.location}</span>
            </li>
            {company.phones.map((p) => (
              <li key={p} className="flex gap-2 items-center">
                <PhoneIcon className="h-4 w-4 text-gold shrink-0" />
                <a href={telHref(p)} className="hover:text-gold transition">
                  {p}
                </a>
              </li>
            ))}
            <li className="flex gap-2 items-center">
              <MailIcon className="h-4 w-4 text-gold shrink-0" />
              <a href={`mailto:${company.email}`} className="hover:text-gold transition break-all">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p className="text-xs text-white/50 font-body">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-gold font-body">{company.partnerLine}</p>
        </div>
      </div>
    </footer>
  )
}
