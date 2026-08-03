export type ProductCategoryId = 'concrete' | 'steel' | 'pavers' | 'quarry'

export interface ProductCategory {
  id: ProductCategoryId
  title: string
  shortTitle: string
  summary: string
  image: string
  highlights: string[]
  sections: {
    heading: string
    items: string[]
  }[]
}

export const productCategories: ProductCategory[] = [
  {
    id: 'concrete',
    title: 'Ready-Mix Concrete & Mortar',
    shortTitle: 'Cement & Concrete',
    summary:
      'Grades 15–50 MPa, machine-batched for consistent strength, with specialised mixes and boom pump logistics.',
    image: '/images/price_p2_img_0.png',
    highlights: [
      'Grades 15MPa through 50MPa',
      'Self-Compacting (SCC), Screed, WPC P6',
      'Mortar M7.5–M30',
      'Boom pump up to 40m',
    ],
    sections: [
      {
        heading: 'Standard grades',
        items: [
          'Grade 15MPa – 50MPa ready-mix concrete',
          'GP (tipper) and NP (pumpable) options',
          'Machine-batched for consistent strength',
          'On-time transportation for continuous bulk supply',
        ],
      },
      {
        heading: 'Specialised mixes',
        items: [
          'Self-Compacting Concrete (SCC)',
          'Screed (fine stone 10mm)',
          'Water-resistant / Anti-seepage (WPC P6)',
          'Mortar grades M7.5, M10, M15, M20, M25, M30',
        ],
      },
      {
        heading: 'Logistics',
        items: [
          'Boom pump truck establishment — max height 40m',
          'Pumping rate charged per m³',
          'Site delivery across Harare and surrounding regions',
        ],
      },
    ],
  },
  {
    id: 'steel',
    title: 'Steel & Rebar Products',
    shortTitle: 'Steel / Rebar',
    summary:
      'Straight threaded rebar, ribbed coil, and plain coil in standard sizes for residential and industrial structures.',
    image: '/images/price_p3_img_0.png',
    highlights: [
      'Threaded rebar 6–32mm',
      '6m and 12m lengths',
      'Ribbed coil 6–16mm',
      'Plain coil 5.5–12mm',
    ],
    sections: [
      {
        heading: 'Straight threaded rebar',
        items: [
          'Diameters from 6mm to 32mm',
          'Standard lengths: 6m and 12m',
          'Wholesale (per MT) and retail (per length) supply',
        ],
      },
      {
        heading: 'Coil products',
        items: [
          'Ribbed coil — typically 6mm to 16mm',
          'Plain coil — 5.5mm to 12mm',
          'Volume-tier wholesale pricing available',
        ],
      },
    ],
  },
  {
    id: 'pavers',
    title: 'Paving & Masonry Bricks',
    shortTitle: 'Bricks & Pavers',
    summary:
      'Holland and interlocking pavers for domestic and industrial use, plus solid and hollow cement blocks.',
    image: '/images/price_p1_img_4.png',
    highlights: [
      'Holland 60mm & 80mm',
      'Interlocking & industrial pavers',
      'Plain and coloured finishes',
      'Solid & hollow cement blocks',
    ],
    sections: [
      {
        heading: 'Holland pavers',
        items: [
          'Domestic 60mm — plain & coloured (200 × 100 × 60mm)',
          'Industrial 80mm — plain & coloured (200 × 100 × 80mm)',
        ],
      },
      {
        heading: 'Interlocking & industrial',
        items: [
          'Interlocking pavers — domestic & industrial',
          'Industrial pavers for heavy-duty surfaces',
          'Solid cement blocks & hollow building blocks',
        ],
      },
    ],
  },
  {
    id: 'quarry',
    title: 'Quarry Materials & Aggregates',
    shortTitle: 'Quarry Stones',
    summary:
      'Crushed quarry stones in all custom sizes, plus washed and unwashed stone dust for concrete, plaster, and filling.',
    image: '/images/price_p5_img_0.png',
    highlights: [
      'All custom stone sizes',
      'Washed & unwashed dust',
      'Concrete & plastering dust',
      'Filling & blinding',
    ],
    sections: [
      {
        heading: 'Quarry stones',
        items: [
          'Crushed quarry stones — all sizes available',
          'Consistent grading for concrete and road base',
          'Bulk deliveries available',
        ],
      },
      {
        heading: 'Quarry dust / stone dust',
        items: [
          'Washed quarry dust',
          'Unwashed quarry dust',
          'Concrete dust',
          'Plastering / bricklaying dust',
          'Filling & blinding dust',
        ],
      },
    ],
  },
]

export function getCategory(id: ProductCategoryId) {
  return productCategories.find((c) => c.id === id)
}
