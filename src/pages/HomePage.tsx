import HomeHero from '../components/home/HomeHero'
import ValuePillars from '../components/home/ValuePillars'
import FeaturedCategories from '../components/home/FeaturedCategories'
import Coverage from '../components/home/Coverage'
import ContactBanner from '../components/home/ContactBanner'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ValuePillars />
      <FeaturedCategories />
      <Coverage />
      <ContactBanner />
    </>
  )
}
