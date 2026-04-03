import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ContactUs() {
    return (
        <main className="flex min-h-screen flex-col relative text-white bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <div className="prose prose-invert max-w-none">
                    <p className="mb-4 text-gray-300">We value your feedback and are here to help. Reach out to the ApplyWise team using any of the methods below.</p>
                    
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Support & Inquiries</h3>
                            <p className="text-gray-400 mb-2">Email: support@applywise.com</p>
                            <p className="text-gray-400">Response time: Usually within 24 hours</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4">Partnerships</h3>
                            <p className="text-gray-400 mb-2">Email: partnerships@applywise.com</p>
                            <p className="text-gray-400">For university or enterprise queries.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
