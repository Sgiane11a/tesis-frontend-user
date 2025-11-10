import Header from "../components/sections/Header";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import TechnologySection from "../components/sections/TechnologySection";
import AITutorSection from "../components/sections/AITutorSection";
import AICapabilitiesSection from "../components/sections/AICapabilitiesSection";
import Footer from "../components/sections/Footer";

export function Web() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TechnologySection />
        <AITutorSection />
        <AICapabilitiesSection />
      </main>
      <Footer />
    </div>
  );
}
export default Web;

