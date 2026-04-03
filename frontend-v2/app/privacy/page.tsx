import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="flex min-h-screen flex-col relative text-white bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="mb-4 text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                    <p className="mb-4 text-gray-300">We collect information you provide directly to us when using our services. This includes your resume data, contact information, and preferences for job matching.</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4 text-gray-300">Your information is used strictly to provide and improve the ApplyWise service. We do not sell your personal data to third parties. Your resumes and tailored cover letters are securely processed by our AI algorithms.</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
                    <p className="mb-4 text-gray-300">We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                    <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
                    <p className="mb-4 text-gray-300">If you have any questions about this Privacy Policy, please contact us at support@applywise.com.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
