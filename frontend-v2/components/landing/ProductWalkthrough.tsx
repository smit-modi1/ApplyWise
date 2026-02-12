"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RefreshCw, Check, FileText, Briefcase, Bell, Download, ShieldCheck, ArrowRight } from "lucide-react";

// Scene Definitions
const SCENES = [
    { id: 1, duration: 5000 }, // Opening
    { id: 2, duration: 6000 }, // The Problem
    { id: 3, duration: 5000 }, // Intro
    { id: 4, duration: 8000 }, // Onboarding
    { id: 5, duration: 8000 }, // Automation
    { id: 6, duration: 6000 }, // Outcome
    { id: 7, duration: 5000 }, // Closing
];

export default function ProductWalkthrough() {
    const [currentScene, setCurrentScene] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            const sceneDuration = SCENES.find(s => s.id === currentScene)?.duration || 5000;
            const step = 100 / (sceneDuration / 100); // Update every 100ms

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        if (currentScene < SCENES.length) {
                            setCurrentScene(c => c + 1);
                            return 0;
                        } else {
                            setIsPlaying(false);
                            return 100;
                        }
                    }
                    return prev + step;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentScene]);

    const handlePlay = () => {
        if (currentScene === SCENES.length && progress >= 100) {
            setCurrentScene(1);
            setProgress(0);
        }
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        setCurrentScene(1);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">See ApplyWise in Action</h2>
                    <p className="text-gray-500">Automate your job search in minutes.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    onViewportEnter={() => setIsPlaying(true)}
                    className="relative mx-auto max-w-5xl aspect-video bg-gray-50 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/5"
                >

                    {/* Video Content Area */}
                    <div className="flex-1 relative flex items-center justify-center p-8 md:p-16 overflow-hidden bg-white">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentScene}
                                className="absolute inset-0 flex items-center justify-center w-full h-full"
                                initial={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {currentScene === 1 && <Scene1Opening />}
                                {currentScene === 2 && <Scene2Problem />}
                                {currentScene === 3 && <Scene3Intro />}
                                {currentScene === 4 && <Scene4Onboarding />}
                                {currentScene === 5 && <Scene5Automation />}
                                {currentScene === 6 && <Scene6Outcome />}
                                {currentScene === 7 && <Scene7Closing />}
                            </motion.div>
                        </AnimatePresence>

                        {/* Overlay Play Button (if paused) */}
                        {!isPlaying && progress === 0 && currentScene === 1 && (
                            <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50">
                                <button
                                    onClick={handlePlay}
                                    className="group relative flex items-center justify-center w-24 h-24 bg-black rounded-full shadow-2xl transition-transform hover:scale-105"
                                >
                                    <Play className="w-10 h-10 text-white fill-white ml-2" />
                                </button>
                            </div>
                        )}

                        {/* Replay Overlay */}
                        {!isPlaying && currentScene === SCENES.length && progress >= 100 && (
                            <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] flex items-center justify-center z-50">
                                <button
                                    onClick={() => { setCurrentScene(1); setProgress(0); setIsPlaying(true); }}
                                    className="group relative flex items-center justify-center w-24 h-24 bg-black rounded-full shadow-2xl transition-transform hover:scale-105"
                                >
                                    <RefreshCw className="w-10 h-10 text-white" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Controls Bar */}
                    <div className="bg-white border-t border-gray-100 p-4 flex items-center gap-4 z-50">
                        <button onClick={handlePlay} className="p-2 hover:bg-gray-100 rounded-full transition-colors font-medium text-sm w-20">
                            {isPlaying ? "Pause" : (progress >= 100 && currentScene === SCENES.length) ? "Replay" : "Play"}
                        </button>

                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
                            {SCENES.map((scene) => (
                                <div key={scene.id} className="h-full flex-1 bg-gray-200 relative">
                                    {(currentScene > scene.id || (currentScene === scene.id && progress >= 100)) && (
                                        <div className="absolute inset-0 bg-black" />
                                    )}
                                    {currentScene === scene.id && (
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 bg-black"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="text-xs font-mono text-gray-400 w-12 text-right">
                            0{currentScene}:0{SCENES.length}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- SCENES ---

function Scene1Opening() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
        >
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
            >
                Defy the <br /> Job Market Gravity.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gray-500 text-xl"
            >
                An AI co-pilot that automates your job search.
            </motion.p>
        </motion.div>
    )
}

function Scene2Problem() {
    return (
        <motion.div className="w-full h-full flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative w-full max-w-2xl h-64 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden p-4">
                {/* Browser Tabs Simulation */}
                <div className="flex gap-2 mb-4 border-b border-gray-100 pb-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-2 w-20 bg-gray-200 rounded-full" />
                    ))}
                </div>
                {/* Messy Content */}
                <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded" />
                    <div className="flex gap-4 mt-8">
                        <div className="h-32 w-full border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-300 text-sm">copy</div>
                        <div className="h-32 w-full border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-300 text-sm">paste</div>
                    </div>
                </div>

                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute inset-0 bg-white/90 flex items-center justify-center"
                >
                    <h3 className="text-2xl font-bold text-black">Job searching is repetitive <br /> and inefficient.</h3>
                </motion.div>
            </div>
        </motion.div>
    )
}

function Scene3Intro() {
    return (
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-24 h-24 bg-black text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-8 shadow-xl"
            >
                AW
            </motion.div>
            <h2 className="text-4xl font-bold mb-2">Introducing ApplyWise</h2>
            <div className="flex justify-center mt-8">
                <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-bold opacity-0 animate-[fadeIn_0.5s_forwards_1s]">
                    Launch App <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    )
}

function Scene4Onboarding() {
    return (
        <motion.div className="w-full max-w-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                <div className="flex justify-between mb-8 border-b border-gray-100 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Step 1 */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
                    >
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Upload CV (DOCX)</div>
                            <div className="text-xs text-green-600 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Parse</div>
                        </div>
                        <Check className="ml-auto w-5 h-5 text-black" />
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
                    >
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Select Target Roles</div>
                            <div className="flex gap-2 mt-1">
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px]">Product Manager</span>
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px]">Tech Lead</span>
                            </div>
                        </div>
                        <Check className="ml-auto w-5 h-5 text-black" />
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 3 }}
                        className="flex items-center gap-4 p-4 bg-black text-white rounded-lg shadow-lg"
                    >
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-white animate-spin" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Initializing Tracker...</div>
                            <div className="text-xs text-gray-400">Nightly scanning enabled</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

function Scene5Automation() {
    return (
        <motion.div className="w-full max-w-4xl grid grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Sidebar */}
            <div className="col-span-1 border border-gray-200 bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="h-2 w-12 bg-gray-200 rounded mb-4" />
                <div className="h-8 w-full bg-white rounded border border-gray-200" />
                <div className="h-8 w-full bg-black text-white rounded flex items-center px-2 text-xs">Matches (3)</div>
                <div className="h-8 w-full bg-transparent rounded border border-gray-200" />
            </div>

            {/* Main Content */}
            <div className="col-span-2 border border-gray-200 bg-white rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Product Manager @ Google</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">98% Match</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="border border-gray-200 p-4 rounded-lg hover:border-black transition-colors"
                    >
                        <FileText className="w-6 h-6 text-black mb-2" />
                        <div className="text-sm font-bold">Tailored CV</div>
                        <div className="text-xs text-gray-500">Optimized for ATS</div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="border border-gray-200 p-4 rounded-lg hover:border-black transition-colors"
                    >
                        <FileText className="w-6 h-6 text-black mb-2" />
                        <div className="text-sm font-bold">Cover Letter</div>
                        <div className="text-xs text-gray-500">Personalized by AI</div>
                    </motion.div>
                </div>

                {/* Cursor Simulation */}
                <motion.div
                    initial={{ x: 200, y: 200, opacity: 0 }}
                    animate={{ x: 50, y: 80, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute z-20 pointer-events-none"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="white" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /></svg>
                </motion.div>
            </div>
        </motion.div>
    )
}

function Scene6Outcome() {
    return (
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl shadow-2xl mb-8"
            >
                <div className="relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                </div>
                <div className="text-left">
                    <div className="text-sm font-bold">3 High-Fit Matches Found</div>
                    <div className="text-xs text-gray-400">Ready for review</div>
                </div>
            </motion.div>

            <div className="flex gap-4 justify-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 border border-gray-200 rounded-xl bg-white w-48 shadow-sm"
                >
                    <Download className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                    <div className="text-sm font-bold mb-2">Google</div>
                    <div className="text-xs bg-gray-100 py-1 rounded">Download Pack</div>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 border border-gray-200 rounded-xl bg-white w-48 shadow-sm"
                >
                    <Download className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                    <div className="text-sm font-bold mb-2">Stripe</div>
                    <div className="text-xs bg-gray-100 py-1 rounded">Download Pack</div>
                </motion.div>
            </div>
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 text-2xl font-bold"
            >
                Wake up. Review. Apply.
            </motion.h3>
        </motion.div>
    )
}

function Scene7Closing() {
    return (
        <motion.div className="text-center flex flex-col items-center justify-center h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="w-20 h-20 flex items-center justify-center bg-black rounded-xl mb-8">
                <span className="text-white font-bold text-2xl">AW</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">Apply Smarter.</h1>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-black">Not Harder.</h1>
        </motion.div>
    )
}
