import { lazy, Suspense } from "react";

const BrowseStylesSection = lazy(() =>
  import("../components/Home/BrowseStylesSection").then((module) => ({
    default: module.BrowseStylesSection,
  }))
);
const HeroSection = lazy(() =>
  import("../components/Home/HeroSection").then((module) => ({
    default: module.HeroSection,
  }))
);
const NewArrivalsSection = lazy(() =>
  import("../components/Home/NewArrivalsSection").then((module) => ({
    default: module.NewArrivalsSection,
  }))
);
const TestimonialsSection = lazy(() =>
  import("../components/Home/TestimonialsSection").then((module) => ({
    default: module.TestimonialsSection,
  }))
);
const TopSellingSection = lazy(() =>
  import("../components/Home/TopSellingSection").then((module) => ({
    default: module.TopSellingSection,
  }))
);

export const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroSection />
      <NewArrivalsSection />
      <TopSellingSection />
      <BrowseStylesSection />
      <TestimonialsSection />
    </Suspense>
  );
};
