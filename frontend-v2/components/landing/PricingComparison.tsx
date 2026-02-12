"use client";

import { motion } from "framer-motion";
import { Check, X, Code, Globe, User, Star, Rocket, Crown, Zap } from "lucide-react";

// Feature Comparison Data
const features = [
    { name: "Resume Parsing", applywise: true, others: true },
    { name: "AI Role Matching", applywise: true, others: "Basic" },
    { name: "Tailored Resumes (DOCX/PDF)", applywise: true, others: "PDF Only" },
    { name: "AI Cover Letters", applywise: true, others: "Generic" },
    { name: "Target Company Tracking", applywise: true, others: false },
    { name: "Auto-Apply (Drafts)", applywise: true, others: false },
];

export default function PricingComparison() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight"
                    >
                        Why Choose <span className="text-gray-500">ApplyWise</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-500 text-lg max-w-2xl mx-auto font-light"
                    >
                        Don't settle for basic tools. Get the complete career copilot.
                    </motion.p>
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-5xl mx-auto mb-24"
                >
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl ring-1 ring-black/5">
                        <div className="grid grid-cols-3 p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="col-span-1 p-2 font-semibold text-gray-500 text-sm md:text-base uppercase tracking-wider">Feature</div>
                            <div className="col-span-1 p-2 font-bold text-center text-sm md:text-xl text-gray-400">Other Tools</div>
                            <div className="col-span-1 p-2 font-bold text-center text-sm md:text-xl text-black relative flex items-center justify-center gap-2">
                                ApplyWise
                                <span className="hidden md:inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold tracking-widest uppercase">
                                    ELITE
                                </span>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {features.map((feature, idx) => (
                                <div
                                    key={feature.name}
                                    className="grid grid-cols-3 p-4 md:p-6 hover:bg-gray-50/50 transition-colors group"
                                >
                                    <div className="col-span-1 flex items-center text-gray-800 font-medium text-sm md:text-base group-hover:text-black transition-colors">
                                        {feature.name}
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center text-gray-400">
                                        {feature.others === true ? (
                                            <Check className="w-5 h-5" />
                                        ) : feature.others === false ? (
                                            <X className="w-5 h-5 text-gray-300" />
                                        ) : (
                                            <span className="text-xs md:text-sm font-medium">{feature.others}</span>
                                        )}
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center text-black font-semibold">
                                        {feature.applywise === true ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shadow-md scale-90 group-hover:scale-110 transition-transform">
                                                    <Check className="w-3.5 h-3.5 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            feature.applywise
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Tiers */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Job Seeker",
                            price: "$0",
                            desc: "Perfect for starting out",
                            icon: <Star className="w-6 h-6 text-gray-400" />,
                            features: ["5 Resumes/mo", "Basic Matching", "1 Target Industry"],
                            delay: 0.1
                        },
                        {
                            title: "Pro",
                            price: "$19",
                            desc: "For serious candidates",
                            icon: <Rocket className="w-6 h-6 text-black" />,
                            features: ["Unlimited Resumes", "Priority AI Processing", "Cover Letter Generator", "All Industries"],
                            highlight: true,
                            delay: 0.2
                        },
                        {
                            title: "Ultimate",
                            price: "$49",
                            desc: "Landing the dream job",
                            icon: <Crown className="w-6 h-6 text-gray-600" />,
                            features: ["Everything in Pro", "Human Review (1/mo)", "Interview Prep AI", "Career Coaching Access"],
                            delay: 0.3
                        }
                    ].map((tier, i) => (
                        <PricingCard key={i} {...tier} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingCard({ title, price, desc, features, highlight = false, icon, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            className={`relative p-8 rounded-2xl border flex flex-col transition-all duration-300 ${highlight
                    ? 'border-black bg-white shadow-2xl z-10 scale-105 Ring-1 Ring-black/5'
                    : 'border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1'
                }`}
        >
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm">{desc}</p>
                </div>
                <div className={`p-3 rounded-xl ${highlight ? 'bg-gray-100' : 'bg-gray-50'}`}>
                    {icon}
                </div>
            </div>

            <div className="text-4xl font-bold mb-8 text-black tracking-tight">{price}<span className="text-lg text-gray-400 font-normal ml-1">/mo</span></div>

            <div className="space-y-4 mb-8 flex-1">
                {features.map((f: string) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-gray-600 group">
                        <Zap className={`w-4 h-4 shrink-0 transition-colors ${highlight ? 'text-black' : 'text-gray-300 group-hover:text-gray-400'}`} />
                        {f}
                    </div>
                ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold transition-all tracking-wide text-sm ${highlight
                    ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl active:scale-95'
                    : 'bg-gray-50 hover:bg-black hover:text-white text-black border border-gray-200 active:scale-95'
                }`}>
                Get {title}
            </button>
        </motion.div>
    )
}
