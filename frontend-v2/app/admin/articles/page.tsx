"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import api from "@/lib/api";

export default function AdminArticles() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            await api.post("/articles", { title, content, published });
            setMessage("Article published successfully!");
            setTitle("");
            setContent("");
            setPublished(false);
        } catch (error: any) {
            setMessage(error.response?.data?.message || "Failed to publish article. Ensure you are logged in.");
        }
    };

    return (
        <main className="flex min-h-screen flex-col relative text-white bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10 flex-grow">
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard - Publish Article</h1>
                
                {message && (
                    <div className="mb-6 p-4 rounded-xl bg-primary/20 text-primary border border-primary/30">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                        <input 
                            type="text" 
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter article title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                        <textarea 
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary h-64"
                            placeholder="Write your article content here in Markdown or plain text..."
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            id="published"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-2"
                        />
                        <label htmlFor="published" className="text-sm font-medium text-gray-300">Publish immediately</label>
                    </div>
                    <button 
                        type="submit"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Save Article
                    </button>
                </form>
            </div>
            <Footer />
        </main>
    );
}
