import SEO from "../components/common/SEO";
import Hero from "../components/home/Hero";
import TrustStats from "../components/home/TrustStats";
import PackageCategories from "../components/home/PackageCategories";
import BestPackages from "../components/home/BestPackages";
import DiscoverIslands from "../components/home/DiscoverIslands";
import TrendingActivities from "../components/home/TrendingActivities";
import PopularCruises from "../components/home/PopularCruises";
import PopularBeaches from "../components/home/PopularBeaches";
import AboutUs from "../components/home/AboutUs";
import Certifications from "../components/home/Certifications";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Contact from "../components/home/Contact";
export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Discover the untouched Andaman Islands with curated tour packages."
      />

      <Hero />
      <TrustStats />
      <PackageCategories />
      <BestPackages />
      <DiscoverIslands />
      <TrendingActivities />
      <PopularCruises />
      <PopularBeaches />
      <AboutUs />
      <Certifications />
      <Testimonials />
      <FAQ />
      <Contact />
      
    </>
  );
}