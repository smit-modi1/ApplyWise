"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        content: "The parsing accuracy is unmatched. It correctly identified my niche skills that other ATS systems missed completely.",
        author: "Sarah J.",
        role: "Senior Product Designer",
        company: "Linear"
    },
    {
        content: "I tailored my resume for 50+ applications in one night. The quality of the output is what actually got me the interviews.",
        author: "Michael C.",
        role: "Software Engineer",
        company: "Stripe"
    },
    {
        content: "The daily monitoring saves me hours. I wake up to a curated list of roles that actually match my criteria.",
        author: "Elena R.",
        role: "Marketing Director",
        company: "Vercel"
    }
];

export default function Reviews() {
    return (
        <section className="py-32 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-black">
                            Trusted by professionals.
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            Join thousands of candidates who are applying smarter.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 text-black fill-black" />
                        ))}
                        <span className="ml-2 font-bold text-lg">5.0</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-b border-gray-100">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="p-8 md:p-12 hover:bg-gray-50 transition-colors duration-300"
                        >
                            <div className="flex flex-col h-full justify-between">
                                <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-8 text-black">
                                    "{item.content}"
                                </blockquote>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                                        {item.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-black">{item.author}</div>
                                        <div className="text-sm text-gray-500">{item.role} at {item.company}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
