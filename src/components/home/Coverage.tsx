import { motion } from 'framer-motion'
import { MapPinIcon } from '../Icons'
import { company } from '../../data/company'

export default function Coverage() {
  return (
    <section className="page-atmosphere py-24 px-6 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-body text-gold mb-3 tracking-[0.2em] uppercase">
            // Coverage & operations
          </p>
          <h2 className="font-heading italic text-4xl md:text-6xl leading-[0.95] tracking-[-2px] text-white">
            Supply that reaches your site
          </h2>
          <p className="mt-5 text-white/75 font-body font-light leading-relaxed max-w-lg">
            Based at {company.location}, RMR supports projects across Harare and key corridors —
            with stable stock and logistics built for continuous construction.
          </p>
          <ul className="mt-8 space-y-3">
            {company.regions.map((region, i) => (
              <motion.li
                key={region}
                className="liquid-glass rounded-2xl px-4 py-3 flex items-center gap-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MapPinIcon className="h-4 w-4 text-gold shrink-0" />
                <span className="font-body text-sm text-white/90">{region}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="liquid-glass rounded-[2rem] p-2 overflow-hidden">
            <div className="relative aspect-[4/5] rounded-[1.6rem] overflow-hidden bg-navy-800">
              <img
                src="/images/Images_260710_093724.png"
                alt="RMR site operations"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-heading italic text-2xl text-white">Harare hub</p>
                <p className="text-sm text-white/75 font-body mt-1">{company.location}</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 liquid-glass rounded-2xl px-4 py-3 hidden sm:block">
            <p className="text-xs text-gold uppercase tracking-wider font-body">Hours</p>
            <p className="text-sm text-white font-body">{company.hours}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
