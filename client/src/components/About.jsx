import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".about-card", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="about-section min-h-screen flex flex-col items-center justify-center px-4 md:px-20 relative z-10 py-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#FBE4D8] mb-12 text-center tracking-tighter text-shimmer">
                About Me
            </h2>

            <div className="about-card w-full max-w-4xl bg-[#150B1F]/30 backdrop-blur-xl border border-[#522B5B]/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                {/* Profile Icon */}
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#522B5B] to-[#854F6C] flex items-center justify-center text-4xl md:text-5xl font-bold text-[#FBE4D8] shadow-lg">
                    A
                </div>

                {/* Name & Roles */}
                <h3 className="text-3xl md:text-5xl font-bold text-[#FBE4D8] mb-2">
                    Akshdeep Singh
                </h3>
                <p className="text-[#DFB6B2] text-sm md:text-lg font-medium mb-8 uppercase tracking-wider">
                    Cloud Developer • 3D Animator • Student
                </p>

                {/* Body Text */}
                <div className="text-[#FBE4D8]/80 text-base md:text-lg leading-relaxed space-y-6 mb-12 text-left md:text-center max-w-3xl mx-auto">
                    <p>
                        Passionate <strong className="text-[#DFB6B2]">Cloud Developer</strong> from <strong className="text-[#854F6C]">Lovely Professional University</strong> specializing in building immersive web experiences and cutting-edge applications.
                    </p>
                    <p>
                        Expert in <strong className="text-[#DFB6B2]">React, Next.js, and 3D Web Graphics</strong> with a deep interest in <strong className="text-[#854F6C]">Game Development</strong> using Unreal Engine 5 and Blender.
                    </p>
                    <p>
                        Currently developing <strong className="text-[#DFB6B2]">Advanced Portfolio Systems</strong> and exploring <strong className="text-[#854F6C]">3D Animation</strong> — always pushing the boundaries of what's possible on the web.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#522B5B]/30">
                    <div className="p-4 rounded-xl bg-[#050205]/50 hover:bg-[#050205] transition-colors">
                        <div className="text-3xl md:text-4xl font-bold text-[#FBE4D8] mb-1">2+</div>
                        <div className="text-xs md:text-sm text-[#DFB6B2] uppercase tracking-widest">Years Experience</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#050205]/50 hover:bg-[#050205] transition-colors">
                        <div className="text-3xl md:text-4xl font-bold text-[#FBE4D8] mb-1">3</div>
                        <div className="text-xs md:text-sm text-[#DFB6B2] uppercase tracking-widest">Projects</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#050205]/50 hover:bg-[#050205] transition-colors">
                        <div className="text-3xl md:text-4xl font-bold text-[#FBE4D8] mb-1">24+</div>
                        <div className="text-xs md:text-sm text-[#DFB6B2] uppercase tracking-widest">Technologies</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
