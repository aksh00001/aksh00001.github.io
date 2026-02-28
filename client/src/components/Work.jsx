import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Work({ projects }) {
    const comp = useRef();
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Simplified stacking animation - only scale, no fade
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Scale down previous cards as new ones come in (no opacity change)
                if (index > 0) {
                    gsap.to(cardsRef.current.slice(0, index), {
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.3, // Very low for ultra-smooth animation
                            invalidateOnRefresh: true,
                        },
                        scale: 0.95 - (index * 0.015),
                        ease: "none"
                    });
                }
            });

            // Header animation
            gsap.from(".work-header", {
                scrollTrigger: {
                    trigger: ".work-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, comp);

        return () => ctx.revert();
    }, [projects]);

    const cardColors = [
        'from-[#150B1F] to-[#2B124C]', // Dark Charcoal to Rich Purple
        'from-[#150B1F] to-[#522B5B]', // Dark Charcoal to Royal Purple
        'from-[#050205] to-[#2B124C]', // Almost Black to Rich Purple
        'from-[#150B1F] to-[#050205]', // Dark Charcoal to Almost Black
    ];

    const glowColors = [
        { border: '#522B5B', shadow: 'rgba(82, 43, 91, 0.6)' }, // Accent Glow
        { border: '#854F6C', shadow: 'rgba(133, 79, 108, 0.6)' }, // Mauve Glow
        { border: '#DFB6B2', shadow: 'rgba(223, 182, 178, 0.6)' }, // Rose Glow
        { border: '#FBE4D8', shadow: 'rgba(251, 228, 216, 0.6)' }, // Champagne Glow
    ];

    return (
        <section ref={comp} className="work-section relative z-10 py-20">
            <div className="w-full">
                <h2 className="work-header text-4xl md:text-6xl font-bold text-[#FBE4D8] mb-20 px-8 md:px-16">
                    Selected Works
                </h2>

                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={el => cardsRef.current[index] = el}
                            className="sticky w-full px-4 md:px-8"
                            style={{
                                top: `${60 + index * 30}px`,
                                willChange: 'transform, opacity',
                                transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
                            }}
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#522B5B]/30 mx-auto max-w-[95vw]">
                                <div className={`bg-gradient-to-br ${cardColors[index % cardColors.length]} min-h-[550px] md:min-h-[650px]`}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-8 md:p-16 h-full">
                                        {/* Left: Content */}
                                        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                                            <div className="text-[#DFB6B2] text-xl md:text-2xl font-bold opacity-60">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            <h3
                                                className="text-5xl md:text-7xl font-bold leading-tight"
                                                style={{
                                                    textShadow: `0 0 30px ${glowColors[index % glowColors.length].shadow}, 0 0 60px ${glowColors[index % glowColors.length].shadow}`,
                                                    color: glowColors[index % glowColors.length].border,
                                                }}
                                            >
                                                {project.title}
                                            </h3>

                                            <p className="text-[#FBE4D8]/80 text-xl md:text-2xl leading-relaxed max-w-xl">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-3">
                                                {project.tech?.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-5 py-2.5 bg-[#050205]/30 text-[#FBE4D8] rounded-full text-base border border-[#FBE4D8]/20 hover:bg-[#050205]/50 transition-all duration-300 hover:scale-105"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-8 flex gap-4">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-8 py-3 bg-[#DFB6B2] text-[#050205] font-bold text-sm rounded-full hover:bg-[#FBE4D8] transform hover:scale-105 transition-all duration-300 shadow-xl tracking-widest uppercase"
                                                >
                                                    Live Demo
                                                </a>
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-8 py-3 bg-transparent border border-[#DFB6B2]/40 text-[#DFB6B2] font-bold text-sm rounded-full hover:border-[#FBE4D8] hover:text-[#FBE4D8] transform hover:scale-105 transition-all duration-300 shadow-xl tracking-widest uppercase"
                                                >
                                                    GitHub
                                                </a>
                                            </div>
                                        </div>

                                        {/* Right: Visual Section */}
                                        <div className="flex items-center justify-center">
                                            <div
                                                className={`relative w-full max-w-[600px] aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border border-[#FBE4D8]/10
                                                    ${project.title === 'Mark4-Bot' ? 'animate-terminal-pulse' : ''}
                                                    `}
                                                style={{
                                                    background: `rgba(21, 11, 31, 0.4)`,
                                                    backdropFilter: 'blur(10px)',
                                                }}
                                            >
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-center p-8">
                                                            <div className="text-7xl mb-6">🚀</div>
                                                            <p className="text-white/40 text-sm font-mono tracking-widest uppercase">
                                                                Project System Online
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Decorative Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#150B1F]/80 to-transparent pointer-events-none"></div>

                                                {/* Scanline Effect for Mark4 */}
                                                {project.title === 'Mark4-Bot' && (
                                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(223,182,178,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline pointer-events-none" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Spacer to allow last card to scroll */}
                <div className="h-[80vh]"></div>
            </div>
        </section>
    );
}
