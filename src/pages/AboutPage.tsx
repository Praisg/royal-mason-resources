import { motion } from 'framer-motion'
import BlurText from '../components/BlurText'
import { company, differentiators, industries } from '../data/company'

export default function AboutPage() {
  return (
    <div className="page-atmosphere pt-28">
      <section className="px-6 md:px-16 lg:px-20 pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-gold mb-4 tracking-[0.2em] uppercase">// About us</p>
          <div className="max-w-4xl">
            <BlurText
              text="The partner behind stronger structures"
              className="text-4xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.9] tracking-[-2px] justify-start"
            />
          </div>
          <p className="mt-6 max-w-2xl text-white/75 font-body font-light leading-relaxed text-lg">
            {company.positioning} Our brand identity focuses on stable supply, standard quality,
            reliable delivery, and cost competitiveness.
          </p>
        </div>
      </section>

      <section className="section-cream py-20 px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="liquid-glass-light rounded-[1.5rem] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-body mb-3">Mission</p>
            <h2 className="font-heading italic text-3xl text-navy tracking-tight">What drives us</h2>
            <p className="mt-4 text-navy/75 font-body font-light leading-relaxed">{company.mission}</p>
          </div>
          <div className="liquid-glass-light rounded-[1.5rem] p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-600 font-body mb-3">Vision</p>
            <h2 className="font-heading italic text-3xl text-navy tracking-tight">Where we’re headed</h2>
            <p className="mt-4 text-navy/75 font-body font-light leading-relaxed">{company.vision}</p>
          </div>
        </div>
      </section>

      <section className="page-atmosphere py-20 px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-gold mb-3 tracking-[0.2em] uppercase">
            // Target industries
          </p>
          <h2 className="font-heading italic text-4xl md:text-5xl text-white tracking-tight max-w-xl">
            Built for the projects shaping Zimbabwe
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((item, i) => (
              <motion.div
                key={item.title}
                className="liquid-glass rounded-[1.25rem] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="font-heading italic text-2xl text-white tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-white/75 font-body font-light leading-snug">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream py-20 px-6 md:px-16 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-body text-gold-600 mb-3 tracking-[0.2em] uppercase">
            // Why choose RMR
          </p>
          <h2 className="font-heading italic text-4xl md:text-5xl text-navy tracking-tight max-w-xl">
            Competitive differentiators
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-[1.25rem] border border-navy/10 bg-white/60 p-6">
                <div className="h-1 w-12 bg-gold mb-4 rounded-full" />
                <h3 className="font-heading italic text-2xl text-navy">{d.title}</h3>
                <p className="mt-2 text-sm text-navy/70 font-body font-light leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-navy/60 font-body text-sm max-w-2xl">
            Core messaging: many suppliers suffer unstable quality and stock shortages. RMR
            guarantees consistent quality, sufficient inventory, and reliable service without
            hidden risks.
          </p>
        </div>
      </section>
    </div>
  )
}
