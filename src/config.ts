export const business = {
  name: 'HookedUp', fullName: 'Hooked Up – All Channels Tour Bus',
  phones: ['0780332387', '0713968275'],
  // Set only after confirming the country code: international digits, no + or spaces.
  whatsappNumber: '',
  fleet: [] as { name: string; image: string; passengers: number; features: string[] }[],
}
export const services = [
  { id: 'car-hire', number: '01', name: 'Car hire', tag: 'ARRIVE YOUR WAY', description: 'For the everyday, the occasion and everything in between.', detail: 'Enquire about luxury vehicle hire for daily journeys, weddings, events and corporate transport.', options: ['Daily hire', 'Weddings & events', 'Corporate transport'], icon: 'car' },
  { id: 'shuttles', number: '02', name: 'Shuttles', tag: 'MAKE THE CONNECTION', description: 'Airport arrivals. Point-to-point journeys. One less thing to plan.', detail: 'Plan your airport transfer or point-to-point journey with the team. Share your pickup, destination and passenger count.', options: ['Airport transfers', 'Point-to-point travel', 'Group transport'], icon: 'arrow' },
  { id: 'tours', number: '03', name: 'City tours', tag: 'TAKE THE SCENIC ROUTE', description: 'A new perspective on the city, with your favourite people.', detail: 'Tell us where you would like to explore and who is coming along. The team will discuss suitable options for your group.', options: ['City tour enquiries', 'Group trips', 'Private outings'], icon: 'pin' },
  { id: 'courier', number: '04', name: 'Courier', tag: 'KEEP THINGS MOVING', description: 'From your doorstep to their next destination. Let’s connect the dots.', detail: 'Arrange a parcel collection and delivery enquiry. Share the route, parcel details and preferred date for a tailored quote.', options: ['Parcel collection', 'Delivery enquiries', 'Business deliveries'], icon: 'box' },
] as const
export type Service = typeof services[number]['name'] | 'General enquiry'
export const pages = [{ path: '/', label: 'Home' }, { path: '/car-hire', label: 'Car hire' }, { path: '/shuttles-tours', label: 'Shuttles & tours' }, { path: '/courier', label: 'Courier' }, { path: '/about', label: 'About & contact' }]
