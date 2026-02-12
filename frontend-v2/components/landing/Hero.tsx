"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-transparent pt-24 pb-12">

            <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">

                {/* Animated Badge - Minimal */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-8 shadow-sm backdrop-blur-sm"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">AI-Powered Automation</span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-black"
                >
                    Defy the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">
                        Job Market Gravity
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl md:text-2xl text-gray-500 max-w-3xl mb-12 leading-relaxed font-light"
                >
                    Land your dream job with an AI co-pilot that tailors your resume, writes cover letters, and applies for you.
                </motion.p>

                {/* CTA Buttons - Functional */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-6 items-center"
                >
                    <Link
                        href="/register"
                        className="group relative px-8 py-4 bg-black text-white font-medium text-lg rounded-lg transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 overflow-hidden shadow-lg hover:shadow-xl"
                    >
                        Launch App
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    <Link
                        href="/how-it-works"
                        className="px-8 py-4 rounded-lg bg-white border border-gray-200 text-black hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 font-medium cursor-pointer hover:border-gray-300 hover:shadow-sm"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        How It Works
                    </Link>
                </motion.div>
            </div>

            {/* Fade Up Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-200 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
}
