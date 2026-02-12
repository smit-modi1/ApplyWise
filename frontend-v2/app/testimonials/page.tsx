"use client";

import { motion } from "framer-motion";
import { Star, Quote, Briefcase, MapPin, CheckCircle, TrendingUp, Clock, Award } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ParticleField from "@/components/landing/backgrounds/ParticleField";

// Comprehensive testimonials data
const featuredTestimonials = [
    {
        content: "ApplyWise completely transformed my job search. I went from spending 4 hours per application to just 15 minutes reviewing AI-generated materials. The quality is exceptional—I landed 3 interviews in my first week.",
        author: "Sarah Chen",
        role: "Senior Product Manager",
        company: "Google",
        location: "San Francisco, CA",
        avatar: "SC",
        rating: 5,
        outcome: "Hired in 3 weeks",
        applications: 47
    },
    {
        content: "The resume parsing is incredibly accurate. It understood my technical background better than I could explain it myself. The tailored resumes for each role helped me get past ATS systems that previously rejected me.",
        author: "Marcus Johnson",
        role: "Full Stack Developer",
        company: "Stripe",
        location: "New York, NY",
        avatar: "MJ",
        rating: 5,
        outcome: "4 offers received",
        applications: 62
    },
    {
        content: "I was skeptical about AI-generated cover letters, but ApplyWise proved me wrong. Each letter was personalized, professional, and actually highlighted relevant experiences. My response rate tripled.",
        author: "Emily Rodriguez",
        role: "UX Designer",
        company: "Figma",
        location: "Austin, TX",
        avatar: "ER",
        rating: 5,
        outcome: "Hired at dream company",
        applications: 34
    }
];

const allTestimonials = [
    {
        content: "The daily job matching is a game-changer. I wake up to a curated list of opportunities that actually fit my skills and salary requirements. No more endless scrolling through irrelevant postings.",
        author: "David Park",
        role: "Data Scientist",
        company: "Meta",
        avatar: "DP",
        rating: 5
    },
    {
        content: "ApplyWise saved me during my career transition. The AI understood how to reframe my skills for a new industry. I successfully pivoted from finance to tech in just 2 months.",
        author: "Jessica Williams",
        role: "Product Analyst",
        company: "Airbnb",
        avatar: "JW",
        rating: 5
    },
    {
        content: "The application tracking feature is brilliant. I can see exactly where each application stands and get reminders to follow up. It's like having a personal career assistant.",
        author: "Alex Kumar",
        role: "Software Engineer",
        company: "Amazon",
        avatar: "AK",
        rating: 5
    },
    {
        content: "I was drowning in applications before ApplyWise. Now I apply to 10x more roles with better quality materials. The ROI is incredible—I got my money back with my first paycheck.",
        author: "Rachel Thompson",
        role: "Marketing Manager",
        company: "HubSpot",
        avatar: "RT",
        rating: 5
    },
    {
        content: "The DOCX export feature is essential. Being able to make final tweaks while maintaining ATS optimization gives me confidence that my application is perfect.",
        author: "James Lee",
        role: "Engineering Manager",
        company: "Uber",
        avatar: "JL",
        rating: 5
    },
    {
        content: "ApplyWise helped me negotiate better offers by making it easy to apply to multiple companies simultaneously. Having competing offers increased my salary by 40%.",
        author: "Olivia Martinez",
        role: "Senior Designer",
        company: "Adobe",
        avatar: "OM",
        rating: 5
    },
    {
        content: "The AI's understanding of industry-specific keywords is impressive. My applications started getting through ATS filters that previously blocked me.",
        author: "Daniel Brown",
        role: "DevOps Engineer",
        company: "Netflix",
        avatar: "DB",
        rating: 5
    },
    {
        content: "I love the privacy-first approach. My data stays secure, and I have full control over what gets shared. Trust is everything when it comes to career tools.",
        author: "Sophia Anderson",
        role: "Product Designer",
        company: "Shopify",
        avatar: "SA",
        rating: 5
    },
    {
        content: "The cover letter generation alone is worth the subscription. Each one reads like I spent an hour crafting it, but it takes seconds. Absolutely incredible.",
        author: "Michael Zhang",
        role: "Business Analyst",
        company: "McKinsey",
        avatar: "MZ",
        rating: 5
    }
];

const stats = [
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Avg. Time Saved", value: "15hrs/week", icon: Clock },
    { label: "Companies Hired", value: "500+", icon: Briefcase },
    { label: "User Satisfaction", value: "4.9/5.0", icon: Award }
];

export default function TestimonialsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white relative">
            {/* Particle Background */}
            <div className="fixed inset-0 z-0">
                <ParticleField />
            </div>

            <Navbar />

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 md:px-6">
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8"
                        >
                            <Star className="w-4 h-4 text-black fill-black" />
                            <span className="text-sm font-semibold text-gray-600">Rated 4.9/5 by 10,000+ users</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-black"
                        >
                            Real Stories from <br />
                            <span className="text-gray-500">Real Job Seekers</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-gray-500 max-w-2xl mx-auto font-light"
                        >
                            Join thousands of professionals who have transformed their job search with ApplyWise
                        </motion.p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 px-4 md:px-6 border-y border-gray-100 bg-white/50 backdrop-blur-sm">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-black" />
                                    <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Testimonials */}
                <section className="py-24 px-4 md:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
                            Success Stories
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.6 }}
                                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                                >
                                    <Quote className="w-10 h-10 text-gray-200 mb-6" />

                                    <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow">
                                        "{testimonial.content}"
                                    </blockquote>

                                    <div className="flex items-center gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-black fill-black" />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-black">{testimonial.author}</div>
                                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                                            <div className="text-sm text-gray-400">{testimonial.company}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                        <MapPin className="w-3 h-3" />
                                        {testimonial.location}
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-1 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-gray-600">{testimonial.outcome}</span>
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {testimonial.applications} applications
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* All Testimonials Grid */}
                <section className="py-24 px-4 md:px-6 bg-gray-50 border-t border-gray-100">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
                            More Reviews
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                    className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-black fill-black" />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-gray-600">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-black text-sm">{testimonial.author}</div>
                                            <div className="text-xs text-gray-500">{testimonial.role}</div>
                                            <div className="text-xs text-gray-400">{testimonial.company}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4 md:px-6 border-t border-gray-100">
                    <div className="container mx-auto max-w-4xl text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-6 text-black"
                        >
                            Ready to Write Your Success Story?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-500 mb-10 font-light"
                        >
                            Join 10,000+ professionals who have transformed their job search
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                            >
                                Start Free Trial
                                <CheckCircle className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
