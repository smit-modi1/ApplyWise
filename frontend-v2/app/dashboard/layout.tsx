"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, Settings, LogOut, Menu, User, FilePlus } from "lucide-react";
import { UserProvider, useUser } from "@/contexts/UserContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { user, loading, logout } = useUser();

    const navigation = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
        { name: "Create New", href: "/dashboard/create", icon: FilePlus },
        { name: "Job Tracker", href: "/dashboard/jobs", icon: Briefcase },
        { name: "Profile", href: "/dashboard/profile", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    // Get user initials
    const getInitials = () => {
        if (!user) return "U";
        const firstInitial = user.firstName?.charAt(0) || user.email?.charAt(0) || "U";
        const lastInitial = user.lastName?.charAt(0) || "";
        return (firstInitial + lastInitial).toUpperCase();
    };

    // Get display name
    const getDisplayName = () => {
        if (!user) return "User";
        if (user.fullName && user.fullName.trim()) return user.fullName;
        if (user.firstName) return user.firstName;
        return user.email?.split('@')[0] || "User";
    };

    return (
        <div className="min-h-screen bg-white flex font-sans text-gray-900 selection:bg-gray-200">

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col justify-between
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div>
                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-8 border-b border-gray-100">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 flex items-center justify-center bg-black rounded-xl text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                                AW
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-black">ApplyWise</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-8 space-y-1">
                        <div className="px-4 mb-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            Menu
                        </div>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                                        ${isActive
                                            ? "bg-black text-white shadow-md hover:bg-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                        }
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 m-4 border-t border-gray-100 bg-gray-50/50 rounded-xl">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                            {loading ? "..." : getInitials()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {loading ? "Loading..." : getDisplayName()}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {loading ? "" : user?.email || "Free Plan"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">

                {/* Mobile Header */}
                <header className="h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 lg:hidden shadow-sm z-30">
                    <div className="font-bold text-lg text-gray-900">Dashboard</div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto w-full bg-gray-50">
                    <div className="container mx-auto px-4 py-8 md:px-8 max-w-7xl animate-fade-in-up">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </UserProvider>
    );
}
