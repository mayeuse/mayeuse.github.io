import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import WorksSection from "@/components/WorksSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />
      <HeroSection />
      <StatementSection />
      <WorksSection />
      <ContactSection />
    </main>
  );
};

export default Index;
