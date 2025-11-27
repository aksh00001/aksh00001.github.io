import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DisplayCards from './ui/display-cards';
import { GlowingEffect } from './ui/glowing-effect';
import { Award, Code, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".about-header", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.from(".about-content", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out"
            });

            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    const achievementCards = [
        {
            icon: <Award className="size-4 text-[#DFB6B2]" />,
            title: "AWS Certified",
            description: "Cloud Solutions Architect",
            date: "2024",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Code className="size-4 text-[#DFB6B2]" />,
            title: "Full Stack Dev",
            description: "React • Next.js • Node.js",
            date: "Expert",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Sparkles className="size-4 text-[#DFB6B2]" />,
            title: "3D Artist",
            description: "Blender • Unreal Engine 5",
            date: "Creative",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    return (
        <section ref={comp} className="about-section min-h-screen flex flex-col items-center justify-center px-4 md:px-20 relative z-10 py-32">
            {/* Section Header */}
            <div className="about-header text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-4 tracking-tight">
                    About Me
                </h2>
                <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#DFB6B2] to-transparent rounded-full"></div>
            </div>

            {/* Main Content Grid */}
            <div className="about-content w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Left Column - Profile Card */}
                <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                    <div className="relative group">
                        {/* Gradient Ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#DFB6B2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>

                        {/* Profile Circle */}
                        <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#522B5B] to-[#854F6C] flex items-center justify-center text-6xl font-bold text-[#FBE4D8] shadow-2xl">
                            A
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold text-[#FBE4D8] mt-6 text-center lg:text-left">
                        Akshdeep Singh
                    </h3>
                    <p className="text-[#DFB6B2] text-sm font-medium mt-2 uppercase tracking-widest text-center lg:text-left">
                        Cloud Developer
                    </p>
                    <p className="text-[#854F6C] text-sm font-medium uppercase tracking-widest text-center lg:text-left">
                        3D Animator • Student
                    </p>
                </div>

                {/* Right Column - Bio */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#522B5B]/40 transition-all duration-300">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                            movementDuration={0.3}
                        />
                        <p className="text-[#FBE4D8]/90 text-lg leading-relaxed relative z-10">
                            Passionate <span className="text-[#DFB6B2] font-semibold">Cloud Developer</span> from{' '}
                            <span className="text-[#854F6C] font-semibold">Lovely Professional University</span>, specializing in building immersive web experiences and cutting-edge applications.
                        </p>
                    </div>

                    <div className="relative bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#522B5B]/40 transition-all duration-300">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                            movementDuration={0.3}
                        />
                        <p className="text-[#FBE4D8]/90 text-lg leading-relaxed relative z-10">
                            Expert in <span className="text-[#DFB6B2] font-semibold">React, Next.js, and 3D Web Graphics</span> with a deep interest in{' '}
                            <span className="text-[#854F6C] font-semibold">Game Development</span> using Unreal Engine 5 and Blender.
                        </p>
                    </div>

                    <div className="relative bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#522B5B]/40 transition-all duration-300">
                        <GlowingEffect
                            spread={40}
                            glow={true}
                            disabled={false}
                            proximity={64}
                            inactiveZone={0.01}
                            borderWidth={2}
                            movementDuration={0.3}
                        />
                        <p className="text-[#FBE4D8]/90 text-lg leading-relaxed relative z-10">
                            Currently developing <span className="text-[#DFB6B2] font-semibold">Advanced Portfolio Systems</span> and exploring{' '}
                            <span className="text-[#854F6C] font-semibold">3D Animation</span> — always pushing the boundaries of what's possible on the web.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Container */}
            <div className="stats-container w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                <div className="stat-card group relative overflow-hidden bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#DFB6B2]/40 transition-all duration-300">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        movementDuration={0.3}
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#522B5B]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="text-5xl font-bold text-[#FBE4D8] mb-2">2+</div>
                        <div className="text-sm text-[#DFB6B2] uppercase tracking-widest">Years Experience</div>
                    </div>
                </div>

                <div className="stat-card group relative overflow-hidden bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#DFB6B2]/40 transition-all duration-300">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        movementDuration={0.3}
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#854F6C]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="text-5xl font-bold text-[#FBE4D8] mb-2">3</div>
                        <div className="text-sm text-[#DFB6B2] uppercase tracking-widest">Projects</div>
                    </div>
                </div>

                <div className="stat-card group relative overflow-hidden bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/20 rounded-2xl p-8 hover:border-[#DFB6B2]/40 transition-all duration-300">
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                        movementDuration={0.3}
                    />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DFB6B2]/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                        <div className="text-5xl font-bold text-[#FBE4D8] mb-2">24+</div>
                        <div className="text-sm text-[#DFB6B2] uppercase tracking-widest">Technologies</div>
                    </div>
                </div>
            </div>

            {/* Display Cards - Achievements */}
            <div className="w-full flex justify-center">
                <DisplayCards cards={achievementCards} />
            </div>
        </section>
    );
}
