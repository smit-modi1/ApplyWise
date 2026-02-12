"use client";

import { useEffect, useRef } from "react";

export default function DotGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationFrameId: number;
        let time = 0;

        const draw = () => {
            time += 0.002;
            ctx.clearRect(0, 0, width, height);

            // Dot Settings - Premium Minimal
            const spacing = 32;
            const rows = Math.ceil(height / spacing);
            const cols = Math.ceil(width / spacing);

            ctx.fillStyle = "#EAEAEA"; // Very light grey

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;

                    // Subtle Wave Effect
                    const wave = Math.sin(x * 0.005 + time) * Math.cos(y * 0.005 + time) * 0.5 + 0.5;
                    const opacity = 0.15 + (wave * 0.2); // Fluctuate between 0.15 and 0.35

                    const size = 1.2;

                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none bg-white"
        />
    );
}
