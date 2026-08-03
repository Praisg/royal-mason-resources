import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BlurText from '../components/BlurText'
import { ArrowUpRight } from '../components/Icons'
import {
  productCategories,
  type ProductCategoryId,
} from '../data/products'

const tabs = productCategories.map((c) => ({ id: c.id, label: c.shortTitle }))

export default function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const active = useMemo(() => {
    const tab = params.get('tab') as ProductCategoryId | null
    if (tab && productCategories.some((c) => c.id === tab)) return tab
    return 'concrete' as ProductCategoryId
  }, [params])

  const category = productCategories.find((c) => c.id === active)!

  return (
    <div className="page-atmosphere pt-28 pb-20">
      <section className="px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-gold mb-4 tracking-[0.2em] uppercase">
            // Products & services
          </p>
          <div className="max-w-3xl">
            <BlurText
              text="Full specification supply"
              className="text-4xl md:text-6xl font-heading italic text-white leading-[0.9] tracking-[-2px] justify-start"
            />
          </div>
          <p className="mt-5 max-w-2xl text-white/70 font-body font-light">
            One-stop procurement across concrete, steel, paving, and quarry materials — with
            standard specs you can write into tenders and site schedules.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setParams({ tab: t.id })}
                className={`rounded-full px-4 py-2 text-sm font-body transition ${
                  active === t.id
                    ? 'bg-gold text-navy'
                    : 'liquid-glass text-white/85 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div className="liquid-glass rounded-[1.75rem] overflow-hidden">
            <img
              src={category.image}
              alt=""
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          <div>
            <h2 className="font-heading italic text-4xl md:text-5xl text-white tracking-tight">
              {category.title}
            </h2>
            <p className="mt-4 text-white/75 font-body font-light leading-relaxed">
              {category.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {category.highlights.map((h) => (
                <span
                  key={h}
                  className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/90 font-body"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {category.sections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-gold text-xs uppercase tracking-[0.2em] font-body mb-3">
                    {section.heading}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-white/85 font-body font-light"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link to="/pricing" className="btn-gold mt-10">
              Estimate pricing
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
