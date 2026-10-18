import { business } from './config'
export function localDate() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
export function validate(data: Record<string,string>) {
  const required = data.service === 'General enquiry' ? ['name','notes'] : data.service === 'Courier' ? ['name','pickup','destination','parcel','date','preference'] : ['name','pickup','destination','date','time','passengers']
  const errors: Record<string,string> = {}
  required.forEach(key=>{ if(!data[key]?.trim()) errors[key]='Please complete this field.' })
  if(data.date && data.date < localDate()) errors.date='Choose today or a future date.'
  if(data.passengers && (!Number.isInteger(Number(data.passengers)) || Number(data.passengers)<1)) errors.passengers='Enter a whole number of at least 1.'
  if(data.date === localDate() && data.time && new Date(`${data.date}T${data.time}`).getTime()<Date.now()) errors.time='Choose a future pickup time.'
  return errors
}
export const labels: Record<string,string> = {service:'Service',name:'Name',pickup:'Pickup area',destination:'Destination',date:'Preferred date',time:'Pickup time',passengers:'Passengers',parcel:'Parcel description / size',preference:'Delivery preference',return:'Return journey',notes:'Additional details'}
export function messageFor(data: Record<string,string>) { return `Hello HookedUp, I would like to make an enquiry.\n\n${Object.entries(data).filter(([,v])=>v.trim()).map(([k,v])=>`${labels[k]||k}: ${v}`).join('\n')}\n\nPlease confirm availability and a quote. Thank you.` }
export function whatsappUrl(message:string) { return /^[1-9]\d{7,14}$/.test(business.whatsappNumber) ? `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}` : null }
