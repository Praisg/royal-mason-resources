import { useEffect, useId, useRef, type FormEvent, type ReactNode } from 'react'
import { CloseIcon } from '../Icons'
import { company, whatsappUrl } from '../../data/company'

interface QuoteModalProps {
  open: boolean
  onClose: () => void
}

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const titleId = useId()
  const firstField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const lines = [
      'Quote request from RMR website',
      `Name: ${fd.get('name')}`,
      `Phone: ${fd.get('phone')}`,
      `Project: ${fd.get('project')}`,
      `Product: ${fd.get('product')}`,
      `Quantity: ${fd.get('quantity')}`,
      `Location: ${fd.get('location')}`,
      `Notes: ${fd.get('notes') || '—'}`,
    ]
    window.open(whatsappUrl(lines.join('\n')), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        aria-label="Close quote dialog"
        onClick={onClose}
      />
      <div className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream text-navy shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-navy/10 bg-cream/95 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-body">Request a quote</p>
            <h2 id={titleId} className="font-heading italic text-2xl tracking-tight">
              Tell us about your project
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="liquid-glass-light h-10 w-10 rounded-full flex items-center justify-center text-navy"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">
          <Field label="Full name">
            <input ref={firstField} name="name" required className="input-rmr" placeholder="Your name" />
          </Field>
          <Field label="Phone / WhatsApp">
            <input name="phone" required className="input-rmr" placeholder="+263 …" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Project type">
              <select name="project" required className="input-rmr">
                <option value="">Select…</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Roadworks</option>
              </select>
            </Field>
            <Field label="Product required">
              <select name="product" required className="input-rmr">
                <option value="">Select…</option>
                <option>Ready-mix concrete</option>
                <option>Steel / rebar</option>
                <option>Pavers / bricks</option>
                <option>Quarry materials</option>
                <option>Mixed order</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Quantity">
              <input name="quantity" required className="input-rmr" placeholder="e.g. 40 m³" />
            </Field>
            <Field label="Delivery location">
              <input name="location" required className="input-rmr" placeholder="Harare suburb / site" />
            </Field>
          </div>
          <Field label="Notes (optional)">
            <textarea name="notes" rows={3} className="input-rmr resize-y" placeholder="Grades, timing, site access…" />
          </Field>
          <p className="text-xs text-navy/60 font-body">
            Submits via WhatsApp to {company.phones[0]}. Or email{' '}
            <a className="text-gold-600 underline" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            .
          </p>
          <button type="submit" className="btn-gold w-full">
            Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-navy/60 font-body">{label}</span>
      {children}
    </label>
  )
}
