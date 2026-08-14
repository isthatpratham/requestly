import { Hero } from "@/components/landing/Hero";
import { OverviewSection } from "@/components/landing/OverviewSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <OverviewSection />
      <WorkflowSection />
      <CapabilitiesSection />
      <ProductPreview />
      <CTASection />
    </div>
  );
}
