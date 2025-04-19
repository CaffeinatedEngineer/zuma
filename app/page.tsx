import HeroSection from "@/components/Home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/Home/demo-section";
import HowItWorksSection from "@/components/Home/how-it-works-section";
import PricingSection from "@/components/Home/pricing-section";
import CTASection from "@/components/Home/cta-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient/>
      <div className="flex flex-col">
      <HeroSection/>
      <DemoSection/>
      <HowItWorksSection/>
      <PricingSection/>
      <CTASection/>
      </div>
      
    </div>
  );
}
