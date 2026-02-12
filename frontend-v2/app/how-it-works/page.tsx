"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DotGridBackground from "@/components/landing/backgrounds/DotGridBackground";
import { motion } from "framer-motion";
import { UploadCloud, Target, Radar, FileCheck, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        title: "Upload Your Profile",
        desc: "Securely upload your CV (DOCX). Our parser extracts your skills, experience, and achievements instantly.",
        icon: UploadCloud
    },
    {
        title: "Set Preferences",
        desc: "Define your target roles, preferred industries, and salary expectations to focus our search engine.",
        icon: Target
    },
    {
        title: "Intelligent Matching",
        desc: "Our AI scans thousands of listings nightly, filtering out noise to present only high-fit opportunities.",
        icon: Radar
    },
    {
        title: "Auto-Generation",
        desc: "For every match, we generate a tailored resume and cover letter optimized for that specific job description.",
        icon: FileCheck
    },
    {
        title: "Review & Apply",
        desc: "Review the generated documents, make final tweaks if needed, and apply with confidence.",
        icon: CheckCircle2
    }
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-24 px-4 md:px-6 border-b border-gray-100 overflow-hidden">
                <DotGridBackground />
                <div className="container relative z-10 mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Workflow</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-black"
                    >
                        How ApplyWise Works
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        From upload to application in five simple steps.
                    </motion.p>
                </div>
            </section>

            {/* Timeline Process */}
            <section className="py-24 px-4 md:px-6 bg-white relative">
                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -z-10 md:-translate-x-1/2" />

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content Card */}
                                <div className="w-full md:w-1/2 flex justify-start md:justify-center pl-16 md:pl-0">
                                    <div className={`
                                        bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 w-full group
                                        ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
                                    `}>
                                        <div className={`
                                            mb-6 inline-flex p-3 rounded-xl bg-gray-50 text-black group-hover:scale-110 transition-transform duration-300
                                            ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}
                                        `}>
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-black">{step.title}</h3>
                                        <p className="text-gray-500 leading-relaxed font-light text-lg">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Marker */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white rounded-full border-4 border-black -translate-x-[9px] md:-translate-x-1/2 mt-8 z-10 shadow-[0_0_0_4px_white]" />

                                <div className="hidden md:block w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black tracking-tight">
                            Ready to streamline your search?
                        </h2>
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-medium text-lg rounded-lg hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-lg group"
                        >
                            Start Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
