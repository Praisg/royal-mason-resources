import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { business, pages, photos, services } from './config'
import type { Service } from './config'
import Enquiry from './Enquiry'

type OpenEnquiry = (service: Service) => void
function ColourBand({ className = '' }: { className?: string }) {
  return <div className={`colour-band ${className}`} aria-hidden="true"><i /><i /><i /><i /></div>
}
function Logo() { return <a className="brand" href="/" aria-label="HookedUp home"><img src={business.logo} width="270" height="86" alt="Hooked Up — All Channels Tour Bus" /></a> }
function Icon({ kind = 'arrow' }: { kind?: string }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {kind === 'box' ? <path d="m4 9 12-6 12 6v14l-12 6-12-6V9Zm0 0 12 6 12-6M16 15v14M10 6l12 6v7" /> : kind === 'car' ? <path d="m5 14 3-7h16l3 7M4 14h24v10H4V14Zm3 10v3m18-3v3M4 18h6m12 0h6" /> : kind === 'pin' ? <><path d="M25 12c0 7-9 16-9 16S7 19 7 12a9 9 0 1 1 18 0Z" /><circle cx="16" cy="12" r="3" /></> : <path d="M4 11h23l-6-6M28 21H5l6 6" />}
  </svg>
}
function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .08 }} transition={{ duration: .45 }}>{children}</motion.div>
}
function Actions({ open }: { open: OpenEnquiry }) {
  return <div className="actions"><button className="button primary" onClick={() => open('Car hire')}>Book Transport</button><button className="button secondary" onClick={() => open('Courier')}>Send a Parcel</button></div>
}
function Hero({ open }: { open: OpenEnquiry }) {
  return <section className="hero">
    <div className="hero-copy"><p className="eyebrow"><span className="small-sun">✳</span> ALL CHANNELS. ALL TOGETHER.</p><h1>Good company.<br />Great <span className="underlined">journeys.<svg viewBox="0 0 460 22" preserveAspectRatio="none" aria-hidden="true"><path d="M4 14C130 0 320 3 452 10M16 20C180 11 310 12 430 16" /></svg></span></h1><p className="hero-description">The airport run. The big day. The “let’s get out of town” day. Wherever you’re headed, get HookedUp.</p><p className="hero-services">Car hire, shuttles, city tours & courier services.</p><Actions open={open} /><div className="hero-contact"><span className="contact-dot" /> Have a trip in mind? Let’s talk.<strong>{business.phones[0]}</strong></div></div>
    <div className="hero-photos"><div className="photo-backdrop" /><figure className="main-photo"><img src={photos[0].src} alt={photos[0].alt} width="810" height="1080" fetchPriority="high" /><figcaption><a href="#ride">Meet the ride</a></figcaption></figure><figure className="inset-photo"><img src={photos[1].src} alt={photos[1].alt} width="810" height="1080" /><figcaption>Come on in. <span>↗</span></figcaption></figure><div className="trip-sticker" aria-hidden="true"><span>GOOD TIMES</span><b>ON<br />BOARD.</b><span>GET HOOKED UP ↗</span></div><ColourBand className="photo-ribbons" /></div>
  </section>
}
function ServiceSection() {
  return <section className="services-section section" id="services"><Reveal><div className="section-heading"><div><p className="eyebrow">HOW CAN WE HELP?</p><h2>You’ve got plans.<br />We’ve got ways to get you there.</h2></div><p>People, places and parcels.<br />Choose what you need and we’ll take it from there.</p></div><div className="service-grid">{services.map(s => <a key={s.id} className={`service-card ${s.color}`} href={s.id === 'shuttles' || s.id === 'tours' ? '/shuttles-tours' : `/${s.id}`}><div className="card-top"><Icon kind={s.icon} /><span>{s.number}</span></div><h3>{s.name}</h3><p>{s.description}</p><span className="card-link">Let’s make a plan</span></a>)}</div></Reveal></section>
}
function Gallery({ open }: { open: OpenEnquiry }) {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!expanded) return
    dialog.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [expanded])
  const photo = photos[selected]
  return <section className="ride-section section" id="ride"><Reveal><div className="ride-layout"><div className="gallery"><button className="gallery-image" onClick={() => setExpanded(true)} aria-label={`Enlarge photo: ${photo.label}`}><img src={photo.src} alt={photo.alt} width="810" height="1080" loading="lazy" style={{ objectPosition: photo.position }} /><span className="expand-icon" aria-hidden="true">View photo</span></button><div className="gallery-bottom"><p aria-live="polite">{photo.note}</p><span>{String(selected + 1).padStart(2, '0')} / 03</span></div><div className="thumbnails" aria-label="Choose a vehicle photo">{photos.map((p, i) => <button key={p.src} onClick={() => setSelected(i)} aria-label={`View ${p.label}`} aria-pressed={selected === i}><img src={p.src} alt="" width="100" height="70" loading="lazy" style={{ objectPosition: p.position }} /></button>)}</div></div><div className="ride-copy"><p className="eyebrow">TAKE A LOOK AROUND</p><h2>Your people.<br />Your playlist.<br /><span>Your kind of trip.</span></h2><p>There’s something about travelling together. The catch-ups, the music, the plans made along the way.</p><p>Take a look at the Toyota Quantum and its leather seating. Tell us your group size and where you’re heading, and we’ll confirm the right arrangements for your trip.</p><div className="ride-tags"><span>Group outings</span><span>Airport transfers</span><span>Special occasions</span></div><button className="button navy" onClick={() => open('Shuttles')}>Enquire about this ride</button><small>Vehicle availability and passenger capacity confirmed on enquiry.</small></div></div></Reveal>{expanded && <dialog className="photo-dialog" ref={dialog} aria-label="Vehicle photo viewer" onCancel={() => setExpanded(false)}><button className="close" onClick={() => setExpanded(false)} aria-label="Close photo">×</button><img src={photo.src} alt={photo.alt} /><div className="photo-controls"><button onClick={() => setSelected((selected + 2) % 3)} aria-label="Previous photo">Previous</button><p aria-live="polite">{photo.note}</p><button onClick={() => setSelected((selected + 1) % 3)} aria-label="Next photo">Next</button></div></dialog>}</section>
}
function CourierFeature({ open }: { open: OpenEnquiry }) {
  return <section className="courier-feature section"><ColourBand /><Reveal><div className="courier-layout"><div className="courier-copy"><p className="eyebrow">YES, WE MOVE PARCELS TOO.</p><h2>Not coming along?<br /><span>Send it with us.</span></h2><p>A package for someone. A delivery for your business. Tell us what’s going, where it’s going and when you’d like it collected.</p><button className="button primary" onClick={() => open('Courier')}>Get a delivery quote</button><a className="text-link" href="/courier">More about courier services</a></div><div className="delivery-note"><div className="note-header"><Icon kind="box" /><span>LET’S GET IT THERE</span><b>↗</b></div><div className="delivery-route"><div><i /><span>FROM</span><strong>Your pickup point</strong></div><div><i /><span>TO</span><strong>Their doorstep</strong></div></div><div className="note-bottom"><span>One parcel. One conversation.</span><span>HOOKED UP</span></div><div className="note-stamp">HANDLE<br /><b>WITH CARE</b></div></div></div></Reveal></section>
}
function HowItWorks() {
  return <section className="how section"><Reveal><div className="section-heading"><div><p className="eyebrow">NO LONG FORMS. NO GUESSWORK.</p><h2>Let’s get the details right.</h2></div><p>A quick enquiry is all it takes to get started.</p></div><div className="steps">{[['Tell us the plan', 'Pick a service and share your route, date and the details we should know.'], ['Have a look', 'Review your enquiry. Add anything you missed before sharing it with us.'], ['Let’s talk', 'We’ll discuss availability and a quote. Your booking is confirmed with the team.']].map(([title, body], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></div>)}</div></Reveal></section>
}
function Contact({ open }: { open: OpenEnquiry }) {
  return <><section className="page-intro section about-intro"><div><p className="eyebrow">A NAME TO REMEMBER. A TEAM TO CALL.</p><h1>Let’s get<br /><span>HookedUp.</span></h1><p>{business.fullName} brings together vehicle hire, shuttles, city tours and courier services. Whether you’re planning a group outing or sending a parcel, start with a conversation.</p></div><img className="brand-poster" src="/brand/hookedup-brand.jpg" alt="Hooked Up All Channels Tour Bus brand artwork with cyan, orange, red and purple colour bands" width="1080" height="1080" /></section><section className="contact-layout section"><div><p className="eyebrow">WE’D LOVE TO HEAR THE PLAN</p><h2>A trip? A delivery?<br />Just a question?</h2><p>Use either number for calls or WhatsApp.<br />You can also prepare your enquiry here.</p></div><div className="contact-panel">{business.phones.map((p, i) => <div key={p}><span>CONTACT 0{i + 1}</span><strong>{p}</strong><small>Calls or WhatsApp</small></div>)}<button className="button navy" onClick={() => open('General enquiry')}>Prepare an enquiry</button></div></section></>
}
function ServicePage({ path, open }: { path: string; open: OpenEnquiry }) {
  const courier = path === '/courier'
  const hire = path === '/car-hire'
  const selected = courier ? [services[3]] : hire ? [services[0]] : [services[1], services[2]]
  return <><section className={`page-intro section ${courier ? 'courier-intro' : 'transport-intro'}`}><div><p className="eyebrow">{courier ? 'PARCEL COLLECTION & DELIVERY' : hire ? 'MAKE THE OCCASION YOURS' : 'THE BEST PART? GOING TOGETHER.'}</p><h1>{courier ? <>Small parcel.<br /><span>Big reason to send it.</span></> : hire ? <>Big day?<br /><span>Let’s get you there.</span></> : <>Bring your people.<br /><span>We’ll talk routes.</span></>}</h1><p>{courier ? 'From a personal package to a business delivery, give us the details and we’ll talk through collection, delivery and a quote.' : hire ? 'For the wedding, the workday or a special outing. Tell us what’s on the calendar and we’ll discuss your transport.' : 'Airport pickups, point-to-point journeys and days spent exploring. Tell us where you have in mind.'}</p><button className="button navy" onClick={() => open(selected[0].name)}>{courier ? 'Get a delivery quote' : 'Plan your journey'}</button></div>{!courier && <figure><img src={hire ? photos[0].src : photos[2].src} alt={hire ? photos[0].alt : photos[2].alt} width="810" height="1080" /><figcaption>GOOD COMPANY COMES STANDARD.</figcaption></figure>}{courier && <div className="courier-symbol" aria-hidden="true"><Icon kind="box" /><span>FROM YOU.<br />TO THEM.<br /><b>WITH US.</b></span></div>}</section><section className="detail-section section">{selected.map(s => <article className={`detail-card ${s.color}`} key={s.id}><Icon kind={s.icon} /><div><p className="eyebrow">{s.tag}</p><h2>{s.name}</h2><p>{s.detail}</p><ul>{s.options.map(o => <li key={o}>{o}</li>)}</ul><button className="text-link" onClick={() => open(s.name)}>Enquire about {s.name.toLowerCase()}</button></div></article>)}</section>{!courier && <Gallery open={open} />}<HowItWorks /></>
}
export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const page = pages.find(p => p.path === path)
  const [menu, setMenu] = useState(false)
  const [enquiry, setEnquiry] = useState<Service | null>(null)
  useEffect(() => {
    document.title = `${page?.label || 'Page not found'} | HookedUp — All Channels Tour Bus`
    const description = path === '/courier' ? 'Parcel collection and delivery enquiries with HookedUp. Share your route and parcel details for a quote.' : path === '/car-hire' ? 'Vehicle hire for daily journeys, weddings, events and corporate transport. See the Toyota Quantum and enquire with HookedUp.' : path === '/shuttles-tours' ? 'Airport transfers, point-to-point shuttles and group city tours. Take a look at the ride and plan your journey with HookedUp.' : 'Get your people together. Vehicle hire, shuttles, city tours and courier services from HookedUp — All Channels Tour Bus.'
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [path, page])
  return <><a href="#main" className="skip">Skip to content</a><ColourBand className="top-band" /><header><Logo /><nav aria-label="Main navigation" className={menu ? 'open' : ''} id="main-nav">{pages.map(p => <a href={p.path} key={p.path} aria-current={path === p.path ? 'page' : undefined}>{p.label}</a>)}</nav><button className="header-contact" onClick={() => setEnquiry('General enquiry')}>Let’s talk</button><button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="main-nav" aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? 'Close' : 'Menu'} <span>{menu ? '−' : '+'}</span></button></header><main id="main">
    {path === '/' ? <><Hero open={setEnquiry} /><div className="service-ribbon"><span>GOOD COMPANY.</span><i>✳</i><span>GREAT JOURNEYS.</span><i>✳</i><span>PARCELS, TOO.</span><i>✳</i><span>GET HOOKED UP.</span></div><ServiceSection /><Gallery open={setEnquiry} /><CourierFeature open={setEnquiry} /><HowItWorks /></> : !page ? <section className="page-intro section"><div><p className="eyebrow">A LITTLE OFF ROUTE</p><h1>Page not found.</h1><a href="/" className="button navy">Back to home</a></div></section> : path === '/about' ? <Contact open={setEnquiry} /> : <ServicePage path={path} open={setEnquiry} />}
    <section className="closing section"><div><p className="eyebrow">GO ON. MAKE A PLAN.</p><h2>Where to next?</h2><p>Tell us what you have in mind.</p></div><Actions open={setEnquiry} /><span className="closing-arrow" aria-hidden="true">↗</span></section>
  </main><footer><div className="footer-top"><div><Logo /><p>Good company. Great journeys.<br />All channels, connected.</p></div><div><p className="eyebrow">GIVE US A SHOUT</p>{business.phones.map(p => <span className="footer-phone" key={p}>{p}</span>)}<small>Calls & WhatsApp</small></div><div className="footer-nav">{pages.slice(1).map(p => <a href={p.path} key={p.path}>{p.label}</a>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} HookedUp — All Channels Tour Bus.</span><span>Availability, quotes and bookings confirmed with the team.</span></div></footer><ColourBand /><button className="floating-contact" onClick={() => setEnquiry('General enquiry')} aria-label="Prepare a WhatsApp enquiry"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L3 20l1.5-4.7A8 8 0 1 1 20 11.5Z" /><path d="M8 8c0 4 2 6 6 6l1-2-2-1-1 1-2-2 1-1-1-2-2 1Z" /></svg><span>Let’s talk</span></button>{enquiry && <Enquiry service={enquiry} close={() => setEnquiry(null)} />}</>
}
