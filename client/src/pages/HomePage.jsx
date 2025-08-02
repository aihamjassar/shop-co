import { BrowseStylesSection } from "../components/Home/BrowseStylesSection";
import { HeroSection } from "../components/Home/HeroSection";
import { NewArrivalsSection } from "../components/Home/NewArrivalsSection";
import { TestimonialsSection } from "../components/Home/TestimonialsSection";
import { TopSellingSection } from "../components/Home/TopSellingSection";

export const HomePage = () => {
  return (
    <main className="">
      {/* Hero section */}
      <HeroSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <BrowseStylesSection />
      <TestimonialsSection />
    </main>
  );
};
