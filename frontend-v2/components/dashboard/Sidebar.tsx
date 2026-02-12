"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Send,
    Settings,
    LogOut,
    User,
    PlusCircle
} from "lucide-react";
import { cn } from "../../utils/cn";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Job Matches", href: "/dashboard/jobs", icon: Briefcase },
    { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
    { name: "Applications", href: "/dashboard/applications", icon: Send },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 fixed left-0 top-0 text-white">
            <div className="p-6 border-b border-white/5">
                <Link href="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    ApplyWise
                </Link>
            </div>

            <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                {/* Quick Action */}
                <div className="mb-6">
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                        <PlusCircle className="w-4 h-4" />
                        New Application
                    </button>
                </div>

                <nav className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-400" : "text-gray-500")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 w-full transition-colors">
                    <LogOut className="w-5 h-5 text-gray-500" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
