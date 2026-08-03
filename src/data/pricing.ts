/** Pricing tables sourced from RMR Price List PDFs (USD). */

export const pricingDisclaimer =
  'All prices exclude transportation costs. VAT included where applicable — see notes per category.'

export interface PaverPrice {
  id: string
  name: string
  qtyLabel: string
  measurements: string
  pricePerUnit: number
  unit: 'piece'
  vatIncluded: true
}

export const paverPrices: PaverPrice[] = [
  {
    id: 'holland-dom-plain',
    name: 'Holland Pavers (Domestic) Plain',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 60 mm',
    pricePerUnit: 0.16,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'holland-dom-col',
    name: 'Holland Pavers (Domestic) Coloured',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 60 mm',
    pricePerUnit: 0.17,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'holland-ind-plain',
    name: 'Holland Pavers (Industrial) Plain',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 80 mm',
    pricePerUnit: 0.21,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'holland-ind-col',
    name: 'Holland Pavers (Industrial) Coloured',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 80 mm',
    pricePerUnit: 0.22,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'inter-dom-plain',
    name: 'Interlocking Pavers (Domestic) Plain',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 60 mm',
    pricePerUnit: 0.16,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'inter-dom-col',
    name: 'Interlocking Pavers (Domestic) Coloured',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 60 mm',
    pricePerUnit: 0.17,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'inter-ind-plain',
    name: 'Interlocking Pavers (Industrial) Plain',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 80 mm',
    pricePerUnit: 0.21,
    unit: 'piece',
    vatIncluded: true,
  },
  {
    id: 'inter-ind-col',
    name: 'Interlocking Pavers (Industrial) Coloured',
    qtyLabel: '50 sqm pack reference',
    measurements: '200 × 100 × 80 mm',
    pricePerUnit: 0.22,
    unit: 'piece',
    vatIncluded: true,
  },
]

/** Approx pieces per m² for 200×100mm pavers */
export const PAVERS_PER_SQM = 50

export interface ConcreteRow {
  grade: string
  gp: number | null
  np: number | null
  mortar: { label: string; price: number } | null
  scc: number | null
  screed: number | null
  wpc: number | null
}

export const concretePrices: ConcreteRow[] = [
  {
    grade: '15 MPa',
    gp: 118,
    np: 120,
    mortar: { label: 'M7.5', price: 135 },
    scc: null,
    screed: 143,
    wpc: null,
  },
  {
    grade: '20 MPa',
    gp: 128,
    np: 130,
    mortar: { label: 'M10', price: 140 },
    scc: null,
    screed: 149,
    wpc: 144,
  },
  {
    grade: '25 MPa',
    gp: 130,
    np: 132,
    mortar: { label: 'M15', price: 145 },
    scc: 148,
    screed: 155,
    wpc: 149,
  },
  {
    grade: '30 MPa',
    gp: 134,
    np: 136,
    mortar: { label: 'M20', price: 147 },
    scc: 157,
    screed: 163,
    wpc: 155,
  },
  {
    grade: '35 MPa',
    gp: 140,
    np: 142,
    mortar: { label: 'M25', price: 152 },
    scc: 164,
    screed: 173,
    wpc: 162,
  },
  {
    grade: '40 MPa',
    gp: 155,
    np: 157,
    mortar: { label: 'M30', price: 157 },
    scc: 173,
    screed: 180,
    wpc: 171,
  },
  {
    grade: '45 MPa',
    gp: 178,
    np: null,
    mortar: null,
    scc: null,
    screed: null,
    wpc: null,
  },
]

export const concreteExtras = {
  boomPumpFee: 600,
  pumpingRatePerM3: 8,
  maxPumpHeightM: 40,
  vatNote: 'Concrete mix prices are exclusive of VAT (per price list).',
} as const

export type SteelVolumeTier = '≤200MT' | '201-500MT' | '501-1000MT' | '≥1001MT'

export const steelVolumeTiers: SteelVolumeTier[] = [
  '≤200MT',
  '201-500MT',
  '501-1000MT',
  '≥1001MT',
]

export interface SteelWholesaleRow {
  id: string
  category: 'ribbed-coil' | 'threaded' | 'plain-coil'
  size: string
  length: string
  prices: Record<SteelVolumeTier, number>
}

export const steelWholesale: SteelWholesaleRow[] = [
  // Ribbed coil — sizes inferred as common 6–16mm range rows from list
  {
    id: 'rc-1',
    category: 'ribbed-coil',
    size: 'Ribbed coil (tier A)',
    length: 'Coil',
    prices: { '≤200MT': 793.53, '201-500MT': 783.53, '501-1000MT': 763.53, '≥1001MT': 758.53 },
  },
  {
    id: 'rc-2',
    category: 'ribbed-coil',
    size: 'Ribbed coil (tier B)',
    length: 'Coil',
    prices: { '≤200MT': 770.43, '201-500MT': 760.43, '501-1000MT': 740.43, '≥1001MT': 735.43 },
  },
  {
    id: 'rc-3',
    category: 'ribbed-coil',
    size: 'Ribbed coil (tier C)',
    length: 'Coil',
    prices: { '≤200MT': 764.66, '201-500MT': 754.66, '501-1000MT': 734.66, '≥1001MT': 729.66 },
  },
  {
    id: 't-6',
    category: 'threaded',
    size: '6mm',
    length: '12m',
    prices: { '≤200MT': 799.31, '201-500MT': 789.31, '501-1000MT': 769.31, '≥1001MT': 764.31 },
  },
  {
    id: 't-8',
    category: 'threaded',
    size: '8mm',
    length: '12m',
    prices: { '≤200MT': 776.21, '201-500MT': 766.21, '501-1000MT': 746.21, '≥1001MT': 741.21 },
  },
  {
    id: 't-10',
    category: 'threaded',
    size: '10mm',
    length: '12m',
    prices: { '≤200MT': 753.11, '201-500MT': 743.11, '501-1000MT': 723.11, '≥1001MT': 718.11 },
  },
  {
    id: 't-12',
    category: 'threaded',
    size: '12mm',
    length: '12m',
    prices: { '≤200MT': 741.56, '201-500MT': 731.56, '501-1000MT': 711.56, '≥1001MT': 706.56 },
  },
  {
    id: 't-14',
    category: 'threaded',
    size: '14mm',
    length: '12m',
    prices: { '≤200MT': 735.78, '201-500MT': 725.78, '501-1000MT': 705.78, '≥1001MT': 700.78 },
  },
  {
    id: 't-16',
    category: 'threaded',
    size: '16mm',
    length: '12m',
    prices: { '≤200MT': 730.01, '201-500MT': 720.01, '501-1000MT': 700.01, '≥1001MT': 695.01 },
  },
  {
    id: 't-18',
    category: 'threaded',
    size: '18mm',
    length: '12m',
    prices: { '≤200MT': 730.01, '201-500MT': 720.01, '501-1000MT': 700.01, '≥1001MT': 695.01 },
  },
  {
    id: 't-20',
    category: 'threaded',
    size: '20mm',
    length: '12m',
    prices: { '≤200MT': 730.01, '201-500MT': 720.01, '501-1000MT': 700.01, '≥1001MT': 695.01 },
  },
  {
    id: 't-22',
    category: 'threaded',
    size: '22mm',
    length: '12m',
    prices: { '≤200MT': 730.01, '201-500MT': 720.01, '501-1000MT': 700.01, '≥1001MT': 695.01 },
  },
  {
    id: 't-25',
    category: 'threaded',
    size: '25mm',
    length: '12m',
    prices: { '≤200MT': 730.01, '201-500MT': 720.01, '501-1000MT': 700.01, '≥1001MT': 695.01 },
  },
  {
    id: 't-32',
    category: 'threaded',
    size: '32mm',
    length: '12m',
    prices: { '≤200MT': 753.11, '201-500MT': 743.11, '501-1000MT': 723.11, '≥1001MT': 718.11 },
  },
  {
    id: 'pc-5.5',
    category: 'plain-coil',
    size: '5.5mm',
    length: 'Coil',
    prices: { '≤200MT': 822.41, '201-500MT': 812.41, '501-1000MT': 792.41, '≥1001MT': 787.41 },
  },
  {
    id: 'pc-6',
    category: 'plain-coil',
    size: '6mm',
    length: 'Coil',
    prices: { '≤200MT': 816.63, '201-500MT': 806.63, '501-1000MT': 786.63, '≥1001MT': 781.63 },
  },
  {
    id: 'pc-8',
    category: 'plain-coil',
    size: '8mm',
    length: 'Coil',
    prices: { '≤200MT': 805.08, '201-500MT': 795.08, '501-1000MT': 775.08, '≥1001MT': 770.08 },
  },
  {
    id: 'pc-10',
    category: 'plain-coil',
    size: '10mm',
    length: 'Coil',
    prices: { '≤200MT': 805.08, '201-500MT': 795.08, '501-1000MT': 775.08, '≥1001MT': 770.08 },
  },
  {
    id: 'pc-12',
    category: 'plain-coil',
    size: '12mm',
    length: 'Coil',
    prices: { '≤200MT': 816.63, '201-500MT': 806.63, '501-1000MT': 786.63, '≥1001MT': 781.63 },
  },
]

export interface SteelRetailRow {
  id: string
  diameter: string
  length: '6M' | '12M'
  pricePerLength: number
  pricePerTonneUnder30: number
}

export const steelRetail: SteelRetailRow[] = [
  { id: 'r6-6', diameter: '6mm', length: '6M', pricePerLength: 1.28, pricePerTonneUnder30: 842.31 },
  { id: 'r8-6', diameter: '8mm', length: '6M', pricePerLength: 2.0, pricePerTonneUnder30: 819.21 },
  { id: 'r10-6', diameter: '10mm', length: '6M', pricePerLength: 3.0, pricePerTonneUnder30: 796.11 },
  { id: 'r12-6', diameter: '12mm', length: '6M', pricePerLength: 4.2, pricePerTonneUnder30: 784.56 },
  { id: 'r14-6', diameter: '14mm', length: '6M', pricePerLength: 5.8, pricePerTonneUnder30: 778.78 },
  { id: 'r16-6', diameter: '16mm', length: '6M', pricePerLength: 7.2, pricePerTonneUnder30: 773.01 },
  { id: 'r18-6', diameter: '18mm', length: '6M', pricePerLength: 9.2, pricePerTonneUnder30: 773.01 },
  { id: 'r20-6', diameter: '20mm', length: '6M', pricePerLength: 11.2, pricePerTonneUnder30: 773.01 },
  { id: 'r22-6', diameter: '22mm', length: '6M', pricePerLength: 13.5, pricePerTonneUnder30: 773.01 },
  { id: 'r25-6', diameter: '25mm', length: '6M', pricePerLength: 17.5, pricePerTonneUnder30: 773.01 },
  { id: 'r32-6', diameter: '32mm', length: '6M', pricePerLength: 35.0, pricePerTonneUnder30: 796.11 },
  { id: 'r6-12', diameter: '6mm', length: '12M', pricePerLength: 2.6, pricePerTonneUnder30: 834.31 },
  { id: 'r8-12', diameter: '8mm', length: '12M', pricePerLength: 3.9, pricePerTonneUnder30: 811.21 },
  { id: 'r10-12', diameter: '10mm', length: '12M', pricePerLength: 6.0, pricePerTonneUnder30: 788.11 },
  { id: 'r12-12', diameter: '12mm', length: '12M', pricePerLength: 8.6, pricePerTonneUnder30: 776.56 },
  { id: 'r14-12', diameter: '14mm', length: '12M', pricePerLength: 12.1, pricePerTonneUnder30: 770.78 },
  { id: 'r16-12', diameter: '16mm', length: '12M', pricePerLength: 15.0, pricePerTonneUnder30: 765.01 },
  { id: 'r18-12', diameter: '18mm', length: '12M', pricePerLength: 20.0, pricePerTonneUnder30: 765.01 },
  { id: 'r20-12', diameter: '20mm', length: '12M', pricePerLength: 24.0, pricePerTonneUnder30: 765.01 },
  { id: 'r22-12', diameter: '22mm', length: '12M', pricePerLength: 29.0, pricePerTonneUnder30: 765.01 },
  { id: 'r25-12', diameter: '25mm', length: '12M', pricePerLength: 35.0, pricePerTonneUnder30: 765.01 },
  { id: 'r32-12', diameter: '32mm', length: '12M', pricePerLength: 65.0, pricePerTonneUnder30: 788.11 },
]

export const quarryPrice = {
  pricePerM3: 17,
  vatIncluded: true,
  note: 'For all sizes including dust (VAT inclusive).',
} as const

export function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n)
}
