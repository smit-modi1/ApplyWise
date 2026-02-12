"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Briefcase, FileText, Send, Award, PartyPopper } from "lucide-react";
import { cn } from "../../utils/cn";

const journeySteps = [
    { id: "account", label: "Account Created", icon: CheckCircle2, status: "completed" },
    { id: "profile", label: "Profile Completed", icon: FileText, status: "completed" },
    { id: "resume", label: "Resume Uploaded", icon: Briefcase, status: "current" },
    { id: "apply", label: "Active Applying", icon: Send, status: "upcoming" },
    { id: "interview", label: "Interviews", icon: Award, status: "upcoming" },
    { id: "offer", label: "Job Offer!", icon: PartyPopper, status: "upcoming" },
];

export default function JourneyTimeline() {
    return (
        <div className="w-full py-8">
            <div className="flex justify-between items-center relative">
                {/* Connecting Line - Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full z-0" />

                {/* Active Progress Line (Dynamic width based on current user state) */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full z-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                />

                {journeySteps.map((step, index) => {
                    const isCompleted = step.status === "completed";
                    const isCurrent = step.status === "current";

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center group cursor-default">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isCompleted ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.6)]" :
                                        isCurrent ? "bg-black border-purple-400 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-110" :
                                            "bg-black border-white/10 text-gray-600"
                                )}
                            >
                                <step.icon className={cn("w-5 h-5", isCurrent && "animate-pulse")} />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                                className="absolute top-14 w-32 text-center"
                            >
                                <p className={cn(
                                    "text-xs font-semibold transition-colors duration-300",
                                    isCompleted ? "text-indigo-300" :
                                        isCurrent ? "text-white" : "text-gray-600"
                                )}>
                                    {step.label}
                                </p>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
