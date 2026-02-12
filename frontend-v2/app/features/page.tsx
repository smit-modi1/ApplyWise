"use client";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DotGridBackground from "@/components/landing/backgrounds/DotGridBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Search, ShieldCheck, Zap, Layers, BarChart, Database, Lock } from "lucide-react";

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-4 md:px-6 border-b border-gray-100 overflow-hidden">
                <DotGridBackground />
                <div className="container relative z-10 mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Capabilities</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-black"
                    >
                        Built for Focused, <br /> High-Quality Applications
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        ApplyWise combines automation and AI precision to streamline your job search while maintaining professional standards.
                    </motion.p>
                </div>
            </section>

            {/* Core Capabilities Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FileText,
                                title: "Intelligent CV Parsing",
                                desc: "Extracts structured experience and achievements. Identifies domain expertise while preserving formatting integrity.",
                            },
                            {
                                icon: Search,
                                title: "Smart Role Matching",
                                desc: "Semantic keyword scoring filters irrelevant roles using industry-aware logic tailored to your profile.",
                            },
                            {
                                icon: Layers,
                                title: "Tailored Documents",
                                desc: "Generates role-specific resumes (DOCX) that align your experience to job descriptions automatically.",
                            },
                            {
                                icon: Zap,
                                title: "AI Cover Letters",
                                desc: "Creates personalized, professional cover letters specific to each role and company culture.",
                            },
                            {
                                icon: BarChart,
                                title: "Daily Monitoring",
                                desc: "Automated nightly scanning matches you with fresh opportunities ready for your morning review.",
                            },
                            {
                                icon: Database,
                                title: "Application Tracking",
                                desc: "Keep track of every application status, interview request, and offer in one centralized dashboard.",
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Data Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-black">Your Data. Your Control.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { text: "CVs stored securely", icon: Lock },
                                { text: "No data resale", icon: ShieldCheck },
                                { text: "No auto-submit", icon: ShieldCheck },
                                { text: "Full deletion control", icon: ShieldCheck },
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                                    <item.icon className="w-6 h-6 text-black mx-auto mb-3" />
                                    <p className="text-sm font-medium text-gray-600">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
