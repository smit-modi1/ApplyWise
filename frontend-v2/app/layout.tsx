import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit for headings (modern, clean)
import "./globals.css";
import { cn } from "../utils/cn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "ApplyWise - Your Dream Job, Automated",
    description: "AI-powered job assistant that parses resumes, matches roles, and generates tailored applications.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={cn(inter.variable, outfit.variable, "font-sans antialiased bg-background min-h-screen")}>
                {children}
            </body>
        </html>
    );
}
