import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from '../Icons'
import { productCategories } from '../../data/products'

export default function FeaturedCategories() {
  return (
    <section className="section-cream py-24 px-6 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm font-body text-gold-600 mb-3 tracking-[0.2em] uppercase">
              // Product lines
            </p>
            <h2 className="font-heading italic text-4xl md:text-6xl leading-[0.95] tracking-[-2px] text-navy max-w-xl">
              Materials for every stage of the build
            </h2>
          </div>
          <Link to="/products" className="btn-navy self-start md:self-auto">
            Full catalogue
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link
                to={`/products?tab=${cat.id}`}
                className="group relative block overflow-hidden rounded-[1.5rem] min-h-[280px] bg-navy"
              >
                <img
                  src={cat.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105 group-hover:opacity-70"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold font-body mb-2">
                    {cat.shortTitle}
                  </p>
                  <h3 className="font-heading italic text-3xl text-white tracking-tight leading-none">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/80 font-body font-light max-w-md leading-snug">
                    {cat.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-gold font-body">
                    View specs
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
