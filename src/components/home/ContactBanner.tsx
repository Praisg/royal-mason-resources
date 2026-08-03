import { Link } from 'react-router-dom'
import { ArrowUpRight, PhoneIcon, WhatsAppIcon } from '../Icons'
import { company, telHref, whatsappUrl } from '../../data/company'

export default function ContactBanner() {
  return (
    <section className="section-cream py-20 px-6 md:px-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-navy text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(212,175,55,0.25), transparent 55%)',
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 p-8 md:p-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold font-body mb-3">Quick contact</p>
            <h2 className="font-heading italic text-4xl md:text-5xl tracking-tight leading-none">
              Ready to specify materials for your next pour?
            </h2>
            <p className="mt-4 text-white/70 font-body font-light max-w-md">
              Talk to our team on WhatsApp or request a formal quote — we respond with grades,
              volumes, and delivery windows.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl('Hello RMR — I need a quote.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold justify-center"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp {company.phones[0]}
            </a>
            <a href={telHref(company.phones[1])} className="liquid-glass rounded-full px-5 py-2.5 inline-flex items-center justify-center gap-2 text-sm font-body">
              <PhoneIcon className="h-4 w-4 text-gold" />
              Call {company.phones[1]}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 text-sm text-gold font-body pt-1"
            >
              Open full contact form
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
