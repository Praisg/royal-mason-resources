import { motion } from 'framer-motion'
import FadingVideo from '../FadingVideo'
import { HandshakeIcon, ShieldIcon, StrengthIcon, TruckIcon } from '../Icons'
import { pillars } from '../../data/company'

const icons = [ShieldIcon, StrengthIcon, TruckIcon, HandshakeIcon]

const SECTION_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_093722_ccfc7ebf-182f-419f-8a62-2dc02db7dd9d.mp4'

export default function ValuePillars() {
  return (
    <section className="min-h-screen overflow-hidden bg-navy-950 relative">
      <FadingVideo
        src={SECTION_VIDEO}
        poster="/images/catalogue_p3.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 z-[1] bg-navy-950/70" />

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen">
        <header className="mb-auto max-w-3xl">
          <p className="text-sm font-body text-gold mb-4 tracking-[0.2em] uppercase">// Why RMR</p>
          <h2 className="font-heading italic text-5xl md:text-7xl leading-[0.92] tracking-[-2px] md:tracking-[-3px] text-white">
            Four pillars of a
            <br />
            reliable build partner
          </h2>
        </header>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={pillar.id}
                className="liquid-glass rounded-[1.25rem] p-6 min-h-[280px] flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1" />
                <h3 className="font-heading italic text-2xl md:text-3xl tracking-[-1px] leading-none text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm text-white/85 font-body font-light leading-snug">
                  {pillar.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
