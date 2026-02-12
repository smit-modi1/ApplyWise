"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import api from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleGoogleLogin = () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        window.location.href = `${apiUrl}/auth/google`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", formData);
            const { user, tokens } = response.data.data || response.data;
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Or{" "}
                            <Link href="/register" className="font-medium text-black hover:underline">
                                start your 14-day free trial
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-all"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link href="/auth/forgot-password" className="font-medium text-black hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full justify-center rounded-lg bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition-all"
                            >
                                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                    <path
                                        d="M12.0003 20.4082C16.5821 20.4082 20.8229 17.551 22.4277 13.5H12V10.5H23.5113C23.6703 11.233 23.7503 12.008 23.7503 12.808C23.7503 19.418 18.5003 24 12.0003 24C5.37227 24 0.000244141 18.628 0.000244141 12C0.000244141 5.373 5.37227 0.000976562 12.0003 0.000976562C15.1003 0.000976562 17.7803 1.05098 19.8603 3.00098L17.5803 5.16098C16.3203 4.02098 14.5403 3.12098 12.0003 3.12098C7.15027 3.12098 3.12027 7.15098 3.12027 12C3.12027 16.85 7.15027 20.879 12.0003 20.879V20.4082Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="text-sm font-semibold">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex relative bg-gray-50 items-center justify-center overflow-hidden border-l border-gray-200">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="relative text-center p-12 max-w-lg">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                        "ApplyWise transformed my job search."
                    </h3>
                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        Join thousands of professionals who have automated their applications and landed their dream roles.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                            ))}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                            Join 10,000+ users
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
