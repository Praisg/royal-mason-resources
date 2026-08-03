import { useMemo, useState, type ReactNode } from 'react'
import BlurText from '../components/BlurText'
import {
  PAVERS_PER_SQM,
  concreteExtras,
  concretePrices,
  formatUsd,
  paverPrices,
  pricingDisclaimer,
  quarryPrice,
  steelRetail,
  steelVolumeTiers,
  steelWholesale,
  type SteelVolumeTier,
} from '../data/pricing'

type Category = 'concrete' | 'steel' | 'pavers' | 'quarry'

export default function PricingPage() {
  const [category, setCategory] = useState<Category>('concrete')

  return (
    <div className="page-atmosphere pt-28 pb-20">
      <section className="px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-gold mb-4 tracking-[0.2em] uppercase">
            // Pricing
          </p>
          <div className="max-w-3xl">
            <BlurText
              text="Interactive price estimator"
              className="text-4xl md:text-6xl font-heading italic text-white leading-[0.9] tracking-[-2px] justify-start"
            />
          </div>
          <p className="mt-5 max-w-2xl text-white/70 font-body font-light">
            Estimate costs from our published wholesale and retail tables. Final quotes may vary
            with volume, grade, and site logistics.
          </p>
          <div className="mt-6 liquid-glass rounded-2xl px-4 py-3 max-w-2xl text-sm text-gold font-body">
            {pricingDisclaimer}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {(
              [
                ['concrete', 'Concrete / m³'],
                ['steel', 'Steel'],
                ['pavers', 'Pavers'],
                ['quarry', 'Quarry / m³'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`rounded-full px-4 py-2 text-sm font-body transition ${
                  category === id ? 'bg-gold text-navy' : 'liquid-glass text-white/85'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          {category === 'concrete' && <ConcreteEstimator />}
          {category === 'steel' && <SteelEstimator />}
          {category === 'pavers' && <PaverEstimator />}
          {category === 'quarry' && <QuarryEstimator />}
        </div>
      </section>
    </div>
  )
}

function Panel({
  title,
  children,
  result,
  note,
}: {
  title: string
  children: ReactNode
  result: ReactNode
  note?: string
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div className="section-cream rounded-[1.75rem] p-6 md:p-8 text-navy">
        <h2 className="font-heading italic text-3xl tracking-tight mb-6">{title}</h2>
        <div className="space-y-4">{children}</div>
        {note && <p className="mt-6 text-xs text-navy/55 font-body">{note}</p>}
      </div>
      <div className="liquid-glass rounded-[1.75rem] p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-body">Estimated total</p>
        <div className="mt-4">{result}</div>
        <p className="mt-8 text-xs text-white/50 font-body">Excludes transportation costs.</p>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-navy/55 font-body">{label}</span>
      {children}
    </label>
  )
}

const selectClass =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy font-body outline-none focus:border-gold focus:ring-2 focus:ring-gold/30'

function ConcreteEstimator() {
  const [gradeIdx, setGradeIdx] = useState(2)
  const [mix, setMix] = useState<'gp' | 'np' | 'mortar' | 'scc' | 'screed' | 'wpc'>('np')
  const [qty, setQty] = useState(20)
  const [includePump, setIncludePump] = useState(false)

  const row = concretePrices[gradeIdx]
  const unit = useMemo(() => {
    if (mix === 'gp') return row.gp
    if (mix === 'np') return row.np
    if (mix === 'mortar') return row.mortar?.price ?? null
    if (mix === 'scc') return row.scc
    if (mix === 'screed') return row.screed
    return row.wpc
  }, [mix, row])

  const total = unit == null ? null : unit * qty + (includePump ? concreteExtras.boomPumpFee + concreteExtras.pumpingRatePerM3 * qty : 0)

  return (
    <Panel
      title="Ready-mix concrete"
      note={concreteExtras.vatNote}
      result={
        total == null ? (
          <p className="text-white/70 font-body text-sm">Selected mix not available for this grade.</p>
        ) : (
          <>
            <p className="font-heading italic text-5xl text-white tracking-tight">{formatUsd(total)}</p>
            <p className="mt-2 text-sm text-white/65 font-body">
              {formatUsd(unit!)} / m³ × {qty} m³
              {includePump
                ? ` + pump fee ${formatUsd(concreteExtras.boomPumpFee)} + ${formatUsd(concreteExtras.pumpingRatePerM3)}/m³`
                : ''}
            </p>
          </>
        )
      }
    >
      <Field label="Grade">
        <select className={selectClass} value={gradeIdx} onChange={(e) => setGradeIdx(Number(e.target.value))}>
          {concretePrices.map((r, i) => (
            <option key={r.grade} value={i}>
              {r.grade}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Mix type">
        <select className={selectClass} value={mix} onChange={(e) => setMix(e.target.value as typeof mix)}>
          <option value="gp">GP (tipper)</option>
          <option value="np">NP (pumpable)</option>
          <option value="mortar">Mortar {row.mortar ? `(${row.mortar.label})` : ''}</option>
          <option value="scc">Self-compacting (SCC)</option>
          <option value="screed">Screed</option>
          <option value="wpc">WPC anti-seepage P6</option>
        </select>
      </Field>
      <Field label="Quantity (m³)">
        <input
          type="number"
          min={1}
          className={selectClass}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
      </Field>
      <label className="flex items-center gap-3 text-sm font-body text-navy/80">
        <input
          type="checkbox"
          checked={includePump}
          onChange={(e) => setIncludePump(e.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        Include boom pump (max {concreteExtras.maxPumpHeightM}m) — establishment + pumping rate
      </label>
    </Panel>
  )
}

function SteelEstimator() {
  const [mode, setMode] = useState<'wholesale' | 'retail'>('retail')
  const [tier, setTier] = useState<SteelVolumeTier>('≤200MT')
  const [wholesaleId, setWholesaleId] = useState(steelWholesale.find((s) => s.category === 'threaded')!.id)
  const [retailId, setRetailId] = useState(steelRetail[2].id)
  const [qty, setQty] = useState(5)

  const wholesale = steelWholesale.find((s) => s.id === wholesaleId)!
  const retail = steelRetail.find((s) => s.id === retailId)!

  const total =
    mode === 'wholesale'
      ? wholesale.prices[tier] * qty
      : retail.pricePerLength * qty

  return (
    <Panel
      title="Steel & rebar"
      note="Wholesale prices are USD per metric tonne (VAT included). Retail is USD per length (VAT included)."
      result={
        <>
          <p className="font-heading italic text-5xl text-white tracking-tight">{formatUsd(total)}</p>
          <p className="mt-2 text-sm text-white/65 font-body">
            {mode === 'wholesale'
              ? `${formatUsd(wholesale.prices[tier])} / MT × ${qty} MT (${tier})`
              : `${formatUsd(retail.pricePerLength)} / length × ${qty} pcs (${retail.diameter} ${retail.length})`}
          </p>
        </>
      }
    >
      <Field label="Pricing mode">
        <select className={selectClass} value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
          <option value="retail">Retail (per length)</option>
          <option value="wholesale">Wholesale (per MT)</option>
        </select>
      </Field>
      {mode === 'wholesale' ? (
        <>
          <Field label="Product">
            <select className={selectClass} value={wholesaleId} onChange={(e) => setWholesaleId(e.target.value)}>
              {steelWholesale.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.category} · {s.size} · {s.length}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Volume tier">
            <select className={selectClass} value={tier} onChange={(e) => setTier(e.target.value as SteelVolumeTier)}>
              {steelVolumeTiers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Quantity (MT)">
            <input
              type="number"
              min={0.1}
              step={0.1}
              className={selectClass}
              value={qty}
              onChange={(e) => setQty(Math.max(0.1, Number(e.target.value) || 0.1))}
            />
          </Field>
        </>
      ) : (
        <>
          <Field label="Straight threaded rebar">
            <select className={selectClass} value={retailId} onChange={(e) => setRetailId(e.target.value)}>
              {steelRetail.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.diameter} · {s.length} — {formatUsd(s.pricePerLength)}/pc
                </option>
              ))}
            </select>
          </Field>
          <Field label="Number of lengths">
            <input
              type="number"
              min={1}
              className={selectClass}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
          </Field>
        </>
      )}
    </Panel>
  )
}

function PaverEstimator() {
  const [paverId, setPaverId] = useState(paverPrices[0].id)
  const [sqm, setSqm] = useState(50)
  const paver = paverPrices.find((p) => p.id === paverId)!
  const pieces = sqm * PAVERS_PER_SQM
  const total = pieces * paver.pricePerUnit

  return (
    <Panel
      title="Paving bricks"
      note="Prices include VAT. Approx. 50 pieces per m² for 200×100mm format."
      result={
        <>
          <p className="font-heading italic text-5xl text-white tracking-tight">{formatUsd(total)}</p>
          <p className="mt-2 text-sm text-white/65 font-body">
            {formatUsd(paver.pricePerUnit)} / piece × ~{pieces.toLocaleString()} pieces ({sqm} m²)
          </p>
        </>
      }
    >
      <Field label="Paver type">
        <select className={selectClass} value={paverId} onChange={(e) => setPaverId(e.target.value)}>
          {paverPrices.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {formatUsd(p.pricePerUnit)}
            </option>
          ))}
        </select>
      </Field>
      <p className="text-xs text-navy/55 font-body">{paver.measurements}</p>
      <Field label="Area (m²)">
        <input
          type="number"
          min={1}
          className={selectClass}
          value={sqm}
          onChange={(e) => setSqm(Math.max(1, Number(e.target.value) || 1))}
        />
      </Field>
    </Panel>
  )
}

function QuarryEstimator() {
  const [qty, setQty] = useState(10)
  const total = qty * quarryPrice.pricePerM3

  return (
    <Panel
      title="Quarry stones & dust"
      note={quarryPrice.note}
      result={
        <>
          <p className="font-heading italic text-5xl text-white tracking-tight">{formatUsd(total)}</p>
          <p className="mt-2 text-sm text-white/65 font-body">
            {formatUsd(quarryPrice.pricePerM3)} / m³ × {qty} m³
          </p>
        </>
      }
    >
      <Field label="Material">
        <select className={selectClass} defaultValue="all">
          <option value="all">All quarry stone sizes</option>
          <option>Washed quarry dust</option>
          <option>Unwashed quarry dust</option>
          <option>Concrete dust</option>
          <option>Plaster / bricklaying dust</option>
          <option>Filling & blinding dust</option>
        </select>
      </Field>
      <Field label="Quantity (m³)">
        <input
          type="number"
          min={1}
          className={selectClass}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        />
      </Field>
    </Panel>
  )
}
