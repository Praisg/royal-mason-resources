export const business = {
  name: 'HookedUp',
  fullName: 'Hooked Up – All Channels Tour Bus',
  phones: ['0780332387', '0713968275'],
  // Confirm the country code before setting international digits (no + or spaces).
  whatsappNumber: '',
  logo: '/brand/hookedup-logo.png',
}
export const photos = [
  { src: '/images/quantum-exterior.jpg', alt: 'White Toyota Quantum photographed from the front and side', label: 'Meet your ride', note: 'Toyota Quantum · exterior', position: '50% 38%' },
  { src: '/images/quantum-interior.jpg', alt: 'Open sliding door showing the Toyota Quantum’s dark leather seats', label: 'Come on in', note: 'A closer look at the seating', position: '50% 42%' },
  { src: '/images/quantum-open-door.jpg', alt: 'Side view of the Toyota Quantum with the sliding door open', label: 'Room for the occasion', note: 'A look inside, before you set off', position: '50% 38%' },
] as const
export const services = [
  { id: 'car-hire', number: '01', name: 'Car hire', tag: 'YOUR PLANS. YOUR PACE.', description: 'The wedding, the work trip, the big occasion. Let’s sort your ride.', detail: 'Tell us about your plans for daily hire, a wedding, an event or corporate transport. We’ll discuss a vehicle and arrangements that suit your journey.', options: ['Daily hire', 'Weddings & events', 'Corporate transport'], icon: 'car', color: 'orange' },
  { id: 'shuttles', number: '02', name: 'Shuttles', tag: 'FROM ARRIVALS TO THERE.', description: 'Airport pickups and point-to-point trips, for you and your group.', detail: 'Share your pickup point, destination, time and passenger count. For airport transfers, include flight details in your enquiry so we can discuss your arrival.', options: ['Airport transfers', 'Point-to-point travel', 'Group transport'], icon: 'arrow', color: 'blue' },
  { id: 'tours', number: '03', name: 'City tours', tag: 'BRING YOUR PEOPLE.', description: 'A day out, a different view, a few good stories on the way home.', detail: 'Get your group together and tell us what you would like to explore. We’ll discuss the route and options with you before anything is confirmed.', options: ['City tour enquiries', 'Group trips', 'Private outings'], icon: 'pin', color: 'purple' },
  { id: 'courier', number: '04', name: 'Courier', tag: 'GOT SOMETHING TO SEND?', description: 'A parcel to collect. A delivery to arrange. Start with the details.', detail: 'Tell us what you’re sending, the pickup and delivery areas, and your preferred date. The team will discuss coverage, timing and a quote with you.', options: ['Parcel collection', 'Delivery enquiries', 'Business deliveries'], icon: 'box', color: 'red' },
] as const
export type Service = typeof services[number]['name'] | 'General enquiry'
export const pages = [{ path: '/', label: 'Home' }, { path: '/car-hire', label: 'Car hire' }, { path: '/shuttles-tours', label: 'Shuttles & tours' }, { path: '/courier', label: 'Courier' }, { path: '/about', label: 'About & contact' }]
