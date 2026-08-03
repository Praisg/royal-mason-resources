import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, CloseIcon, MenuIcon, WhatsAppIcon } from '../Icons'
import { company, navLinks, whatsappUrl } from '../../data/company'
import QuoteModal from '../ui/QuoteModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16">
        <Link
          to="/"
          className="liquid-glass h-12 pl-1.5 pr-4 rounded-full flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/brand/logo.png" alt="" className="h-9 w-9 object-contain rounded-full bg-white" />
          <span className="hidden sm:block font-heading italic text-lg text-white leading-none tracking-tight">
            {company.shortName}
          </span>
        </Link>

        <div className="hidden lg:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium font-body transition ${
                  isActive ? 'text-gold' : 'text-white/90 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={whatsappUrl('Hello RMR — I would like product information.')}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-2 text-sm font-medium text-navy font-body"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy font-body"
          >
            Request Quote
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden liquid-glass h-12 w-12 rounded-full flex items-center justify-center text-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-navy-950/95 backdrop-blur-md pt-24 px-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-4 text-xl font-heading italic ${
                    isActive ? 'text-gold liquid-glass' : 'text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 btn-gold"
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
            <button
              type="button"
              className="btn-navy border border-white/20"
              onClick={() => {
                setMenuOpen(false)
                setQuoteOpen(true)
              }}
            >
              Request Quote
            </button>
          </div>
        </div>
      )}

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  )
}
