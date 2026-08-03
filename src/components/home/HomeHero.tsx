import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FadingVideo from '../FadingVideo'
import BlurText from '../BlurText'
import { ArrowUpRight, ShieldIcon, TruckIcon } from '../Icons'
import { company } from '../../data/company'

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
}

const ease = { duration: 0.8, ease: 'easeOut' as const }

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'

export default function HomeHero() {
  return (
    <section className="h-screen overflow-hidden bg-navy-950 relative">
      <FadingVideo
        src={HERO_VIDEO}
        poster="/images/catalogue_p2.png"
        preferStaticOnMobile
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: '120%', height: '120%' }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-950/55 via-navy-950/35 to-navy-950/85" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4 text-center">
          <motion.div
            className="liquid-glass rounded-full px-2 py-1.5 inline-flex items-center gap-2"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...ease, delay: 0.35 }}
          >
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-medium text-navy font-body">
              {company.shortName}
            </span>
            <span className="pr-3 text-sm text-white/90 font-body font-light">
              Harare · Integrated building materials
            </span>
          </motion.div>

          <motion.p
            className="mt-6 text-gold text-sm md:text-base tracking-[0.25em] uppercase font-body"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...ease, delay: 0.45 }}
          >
            {company.name}
          </motion.p>

          <div className="mt-3 max-w-4xl">
            <BlurText
              text={company.tagline}
              className="justify-center text-5xl md:text-7xl lg:text-[5.25rem] font-heading italic text-white leading-[0.85] tracking-[-3px] md:tracking-[-4px]"
            />
          </div>

          <motion.p
            className="mt-5 text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-snug"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...ease, delay: 0.85 }}
          >
            {company.slogan}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...ease, delay: 1.05 }}
          >
            <Link
              to="/products"
              className="liquid-glass-strong rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-sm font-medium text-white font-body"
            >
              Explore Products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-gold">
              Get a Quote
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...ease, delay: 1.25 }}
          >
            <div className="liquid-glass p-5 w-[200px] rounded-[1.25rem] text-left">
              <ShieldIcon className="h-5 w-5 text-gold" />
              <p className="text-3xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                15–50
              </p>
              <p className="mt-2 text-xs text-white/80 font-body font-light leading-snug">
                MPa ready-mix grades, machine-batched
              </p>
            </div>
            <div className="liquid-glass p-5 w-[200px] rounded-[1.25rem] text-left">
              <TruckIcon className="h-5 w-5 text-gold" />
              <p className="text-3xl font-heading italic tracking-[-1px] leading-none mt-4 text-white">
                40m
              </p>
              <p className="mt-2 text-xs text-white/80 font-body font-light leading-snug">
                Boom pump reach for continuous site pours
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-3 pb-8 px-4"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ ...ease, delay: 1.4 }}
        >
          <div className="liquid-glass rounded-full px-5 py-2">
            <span className="text-sm text-white/90 font-body font-light">
              Supply coverage across Zimbabwe’s growth corridors
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {company.regions.slice(0, 4).map((name) => (
              <span
                key={name}
                className="font-heading italic text-xl md:text-2xl tracking-tight text-white/90"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
