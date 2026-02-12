"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoJourney() {
    return (
        <section className="py-32 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* Text Side */}
                    <div className="flex-1 space-y-8 max-w-lg">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-tight"
                        >
                            See <span className="text-gray-400">ApplyWise</span> in action.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-gray-500 font-light leading-relaxed"
                        >
                            Watch how our AI navigates complex job portals, fills out forms, and tailors your resume in seconds.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col gap-4 pt-4"
                        >
                            {[
                                "Autofills 95% of application fields",
                                "Generates unique cover letters per role",
                                "Tracks application status automatically"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Video Side */}
                    <div className="flex-1 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.01 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative aspect-video rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg group cursor-pointer"
                        >
                            {/* Simple Placeholder or Thumbnail */}
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <div className="text-gray-300 font-bold text-lg">App Demo Preview</div>
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-all duration-300">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-8 h-8 text-black fill-black ml-1" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
