"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 h-[80px] flex items-center bg-white/80 backdrop-blur-md border-b border-gray-100"
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-lg text-white font-bold text-lg">
                        AW
                    </div>
                    <span className="text-xl font-bold tracking-tight text-black">Apply<span className="text-gray-500">Wise</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="/features" className="hover:text-black transition-colors relative group">
                        Features
                        <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/how-it-works" className="hover:text-black transition-colors relative group">
                        How It Works
                        <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/testimonials" className="hover:text-black transition-colors relative group">
                        Testimonials
                        <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-black transition-all group-hover:w-full" />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
