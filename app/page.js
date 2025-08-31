import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import FeatureShowcase from "./components/FeatureShowcase";
import HowItWorks from "./components/HowItWorks";
import Community from "./components/Community";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* <AnimatedBackground /> */}
      <Header />
      <Hero />
      <Features />
      {/* <FeatureShowcase /> */}
      <HowItWorks />
      <Community />
      {/* <Testimonials /> */}
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}
