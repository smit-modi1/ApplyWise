export default function Footer() {
    return (
        <footer className="py-12 border-t border-gray-100 bg-white relative z-10">
            <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} ApplyWise. All rights reserved.</p>
                    <div className="flex justify-center gap-8">
                        <a href="/about" className="hover:text-black transition-colors font-medium">About Us</a>
                        <a href="/privacy" className="hover:text-black transition-colors font-medium">Privacy</a>
                        <a href="/terms" className="hover:text-black transition-colors font-medium">Terms</a>
                        <a href="/contact" className="hover:text-black transition-colors font-medium">Contact Us</a>
                        <a href="/articles" className="hover:text-black transition-colors font-medium">Blog</a>
                        <a href="#" className="hover:text-black transition-colors font-medium">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
