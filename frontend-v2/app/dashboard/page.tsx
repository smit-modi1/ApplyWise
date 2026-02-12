"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Briefcase, FileText, Send, TrendingUp } from "lucide-react";
import JourneyTimeline from "@/components/dashboard/JourneyTimeline";
import { MouseEvent } from "react";
import { useUser } from "@/contexts/UserContext";

const stats = [
    { name: "Total Matches", value: "24", change: "+12%", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Applications Sent", value: "8", change: "+4%", icon: Send, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Resumes Tailored", value: "14", change: "+8%", icon: FileText, color: "text-pink-600", bg: "bg-pink-50" },
    { name: "Interview Rate", value: "12%", change: "+2%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
];

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-gray-200 bg-white overflow-hidden rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(0,0,0,0.05),
                          transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export default function DashboardHome() {
    const { user, loading } = useUser();

    // Get first name or fallback
    const getGreetingName = () => {
        if (loading) return "there";
        if (!user) return "there";
        if (user.firstName) return user.firstName;
        if (user.fullName) return user.fullName.split(' ')[0];
        return user.email?.split('@')[0] || "there";
    };

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-4xl font-bold mb-2 text-black">
                    Good morning, <span className="text-gray-600">{getGreetingName()}</span> 👋
                </h1>
                <p className="text-gray-500 text-lg">Here's what's happening with your job search today.</p>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-black">Your Journey</h2>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                        In Progress
                    </span>
                </div>
                <JourneyTimeline />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <SpotlightCard key={stat.name} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border border-gray-200`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-black mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</h3>
                        <p className="text-sm text-gray-600">{stat.name}</p>
                    </SpotlightCard>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Matches */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-black">Recent Job Matches</h2>
                        <button className="text-sm text-gray-600 hover:text-black transition-colors">View All</button>
                    </div>

                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <SpotlightCard key={i} className="p-4 transition-all hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-xl font-bold text-white shadow-sm">
                                        G
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-black group-hover:text-gray-700 transition-colors text-lg">Senior Product Designer</h3>
                                        <p className="text-sm text-gray-500">Google • Remote • $180k - $240k</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">98% Match</div>
                                        <div className="text-xs text-gray-400 mt-1">2h ago</div>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

                {/* Action Center */}
                <div className="space-y-6">
                    {/* Upload Resume Card */}
                    <div className="bg-black rounded-2xl p-6 relative overflow-hidden group shadow-lg">
                        <div className="relative h-full">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="font-bold text-xl text-white mb-2">Tailor a Resume</h3>
                            <p className="text-sm text-gray-300 mb-6">Upload a new resume or select an existing one to tailor for a specific job description.</p>
                            <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all active:scale-[0.98]">
                                Start Tailoring
                            </button>
                        </div>
                    </div>

                    {/* Tip Card */}
                    <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
                        <h3 className="font-bold text-black mb-2 flex items-center gap-2">
                            💡 Daily Tip
                        </h3>
                        <p className="text-sm text-gray-700 italic">"Adding quantifiable metrics to your resume bullet points can increase interview rates by 40%."</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
