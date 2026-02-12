"use client";

import { useEffect, useRef } from 'react';

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            x: number;
            y: number;
            z: number;
            baseX: number;
            baseY: number;
            baseZ: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;

            constructor(canvasWidth: number, canvasHeight: number) {
                // Spread particles across 3D space
                this.baseX = (Math.random() - 0.5) * canvasWidth * 2;
                this.baseY = (Math.random() - 0.5) * canvasHeight * 2;
                this.baseZ = Math.random() * 1000;

                this.x = this.baseX;
                this.y = this.baseY;
                this.z = this.baseZ;

                // Very subtle drift
                this.vx = (Math.random() - 0.5) * 0.1;
                this.vy = (Math.random() - 0.5) * 0.1;
                this.vz = (Math.random() - 0.5) * 0.2;

                this.size = Math.random() * 1.5 + 0.5;
            }

            update(mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
                // Gentle floating motion
                this.x += this.vx;
                this.y += this.vy;
                this.z += this.vz;

                // Subtle mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.x -= dx * force * 0.01;
                    this.y -= dy * force * 0.01;
                }

                // Boundary wrapping
                if (this.x < -canvasWidth) this.x = canvasWidth;
                if (this.x > canvasWidth) this.x = -canvasWidth;
                if (this.y < -canvasHeight) this.y = canvasHeight;
                if (this.y > canvasHeight) this.y = -canvasHeight;
                if (this.z < 0) this.z = 1000;
                if (this.z > 1000) this.z = 0;
            }

            draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
                // 3D projection
                const scale = 800 / (800 + this.z);
                const x2d = this.x * scale + canvasWidth / 2;
                const y2d = this.y * scale + canvasHeight / 2;
                const size = this.size * scale;

                // Depth-based opacity (closer = more visible)
                const opacity = Math.max(0.1, Math.min(0.6, 1 - this.z / 1000));

                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
                ctx.fill();
            }
        }

        // Initialize particles
        const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        // Mouse tracking
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update(mouseX, mouseY, canvas.width, canvas.height);
                particle.draw(ctx, canvas.width, canvas.height);
            });

            // Draw connections between nearby particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dz = p1.z - p2.z;
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < 120) {
                        const scale1 = 800 / (800 + p1.z);
                        const scale2 = 800 / (800 + p2.z);
                        const x1 = p1.x * scale1 + canvas.width / 2;
                        const y1 = p1.y * scale1 + canvas.height / 2;
                        const x2 = p2.x * scale2 + canvas.width / 2;
                        const y2 = p2.y * scale2 + canvas.height / 2;

                        const opacity = Math.max(0.02, (1 - distance / 120) * 0.15);

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.4 }}
        />
    );
}
