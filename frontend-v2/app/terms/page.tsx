import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function TermsOfService() {
    return (
        <main className="flex min-h-screen flex-col relative text-white bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="mb-4 text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-4 text-gray-300">By accessing and using ApplyWise, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
                    <p className="mb-4 text-gray-300">ApplyWise provides AI-powered job application assistance, including resume tailoring, matching, and generation. We do not guarantee employment or specific results.</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Obligations</h2>
                    <p className="mb-4 text-gray-300">You must provide accurate and complete information and maintain the security of your account. You are responsible for all activities that occur under your account.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
