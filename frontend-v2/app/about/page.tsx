import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function AboutUs() {
    return (
        <main className="flex min-h-screen flex-col relative text-white bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10 flex-grow">
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-primary">Our Mission</h2>
                    <p className="text-xl leading-relaxed text-gray-300 font-medium">
                        Our mission is to help people land their dream job fast. We empower ambitious professionals by leveraging AI to automate the tedious parts of the application process.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mt-12 mb-4">Who We Are</h2>
                    <p className="mb-4 text-gray-300">
                        ApplyWise is built by a team of technologists and career experts who understand the frustration of the modern job hunt. We experienced firsthand the broken, repetitive nature of filling out countless applications, tailoring resumes endlessly, and dealing with radio silence. 
                    </p>
                    <p className="mb-4 text-gray-300">
                        We built ApplyWise to flip the script. Instead of applicants spending hours formatting documents, our AI system handles document generation, parsing, and matching so that you can focus on interview prep and networking.
                    </p>

                    <h2 className="text-2xl font-semibold mt-12 mb-4">Our Values</h2>
                    <ul className="list-disc pl-6 space-y-3 text-gray-300">
                        <li><strong>Efficiency:</strong> Speed is the ultimate competitive advantage in the job market.</li>
                        <li><strong>Empowerment:</strong> We equip candidates with technology normally reserved for enterprise recruiters.</li>
                        <li><strong>Privacy:</strong> Your data is your career capital. We protect it with rigorous security protocols.</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </main>
    );
}
