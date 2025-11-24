import React, { useEffect, useRef } from 'react';

export default function VortexBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                // Start from center
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;

                // Random angle for spiral effect
                this.angle = Math.random() * Math.PI * 2;

                // Speed and acceleration
                this.speed = Math.random() * 2 + 0.5;
                this.acceleration = 1.02;

                // Distance from center
                this.distance = 0;

                // Color palette: blues, purples, cyans
                const colors = [
                    '#00d4ff', // Electric cyan
                    '#0080ff', // Deep blue
                    '#8000ff', // Purple
                    '#ff00ff', // Magenta
                    '#00ffff', // Bright cyan
                    '#4169e1', // Royal blue
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];

                // Trail properties
                this.trailLength = Math.random() * 50 + 30;
                this.opacity = 1;
            }

            update() {
                // Increase distance from center
                this.distance += this.speed;
                this.speed *= this.acceleration;

                // Calculate position in spiral
                const spiralFactor = this.distance * 0.01;
                this.x = canvas.width / 2 + Math.cos(this.angle + spiralFactor) * this.distance;
                this.y = canvas.height / 2 + Math.sin(this.angle + spiralFactor) * this.distance;

                // Fade out as it moves away
                this.opacity = Math.max(0, 1 - (this.distance / (Math.max(canvas.width, canvas.height) * 0.7)));

                // Reset if out of bounds
                if (this.x < -100 || this.x > canvas.width + 100 ||
                    this.y < -100 || this.y > canvas.height + 100 ||
                    this.opacity <= 0) {
                    this.reset();
                }
            }

            draw() {
                // Calculate trail end point
                const trailX = canvas.width / 2 + Math.cos(this.angle) * (this.distance - this.trailLength);
                const trailY = canvas.height / 2 + Math.sin(this.angle) * (this.distance - this.trailLength);

                // Draw trail with gradient
                const gradient = ctx.createLinearGradient(trailX, trailY, this.x, this.y);
                gradient.addColorStop(0, `${this.color}00`); // Transparent at tail
                gradient.addColorStop(1, `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(trailX, trailY);
                ctx.lineTo(this.x, this.y);
                ctx.stroke();

                // Draw bright star head
                ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const particleCount = window.innerWidth < 768 ? 150 : 300;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Star());
            // Stagger initial positions
            particles[i].distance = Math.random() * 200;
        }

        // Animation loop
        const animate = () => {
            // Create trail effect with semi-transparent black
            ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Use lighter composite for glowing effect
            ctx.globalCompositeOperation = 'lighter';

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0"
            style={{ background: '#050505' }}
        />
    );
}
