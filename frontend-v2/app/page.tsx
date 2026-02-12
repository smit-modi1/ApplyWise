import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProductWalkthrough from "@/components/landing/ProductWalkthrough";
import PricingComparison from "@/components/landing/PricingComparison";
import Reviews from "@/components/landing/Reviews";
import Footer from "@/components/landing/Footer";
import ParticleField from "@/components/landing/backgrounds/ParticleField";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col relative">
            {/* Particle Background - Fixed across entire page */}
            <div className="fixed inset-0 z-0">
                <ParticleField />
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10">
                <Navbar />
                <Hero />
                <ProductWalkthrough />
                <PricingComparison />
                <Reviews />
                <Footer />
            </div>
        </main>
    );
}
