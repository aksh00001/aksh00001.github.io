import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaReact, FaNodeJs,
    FaGitAlt, FaGithub, FaAws, FaLinux, FaDocker, FaFigma, FaUnity,
    FaBitcoin, FaGlobe
} from 'react-icons/fa';
import {
    SiCplusplus, SiNextdotjs, SiBlender, SiUnrealengine, SiPostgresql,
    SiGraphql, SiTypescript, SiTailwindcss
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" />, glow: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" />, glow: "#1572B6" },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" />, glow: "#F7DF1E" },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" />, glow: "#3776AB" },
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, glow: "#00599C" },
    { name: "Java", icon: <FaJava className="text-[#007396]" />, glow: "#007396" },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" />, glow: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" />, glow: "#FFFFFF" },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, glow: "#339933" },
    { name: "Blender", icon: <SiBlender className="text-[#F5792A]" />, glow: "#F5792A" },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" />, glow: "#F05032" },
    { name: "GitHub", icon: <FaGithub className="text-white" />, glow: "#FFFFFF" },
];

const technologies2 = [
    { name: "AWS", icon: <FaAws className="text-[#FF9900]" />, glow: "#FF9900" },
    { name: "Linux", icon: <FaLinux className="text-[#FCC624]" />, glow: "#FCC624" },
    { name: "Docker", icon: <FaDocker className="text-[#2496ED]" />, glow: "#2496ED" },
    { name: "Unreal Engine 5", icon: <SiUnrealengine className="text-white" />, glow: "#FFFFFF" },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, glow: "#4169E1" },
    { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" />, glow: "#E10098" },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, glow: "#3178C6" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" />, glow: "#06B6D4" },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" />, glow: "#F24E1E" },
    { name: "Unity", icon: <FaUnity className="text-white" />, glow: "#FFFFFF" },
    { name: "Blockchain", icon: <FaBitcoin className="text-[#F7931A]" />, glow: "#F7931A" },
    { name: "Web3", icon: <FaGlobe className="text-[#F16822]" />, glow: "#F16822" }
];

export default function Skills() {
    const comp = useRef();
    const marquee1Ref = useRef();
    const marquee2Ref = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Header animation
            gsap.from(".skills-header", {
                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            // Marquee 1 - scroll left
            const marquee1Width = marquee1Ref.current.scrollWidth / 2;
            gsap.to(marquee1Ref.current, {
                x: -marquee1Width,
                duration: 30,
                ease: "none",
                repeat: -1,
            });

            // Marquee 2 - scroll right
            const marquee2Width = marquee2Ref.current.scrollWidth / 2;
            gsap.fromTo(marquee2Ref.current,
                { x: -marquee2Width },
                {
                    x: 0,
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                }
            );
        }, comp);

        return () => ctx.revert();
    }, []);

    const TechCard = ({ tech }) => {
        // Convert hex to rgba for shadow
        const hexToRgba = (hex, alpha = 0.5) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        return (
            <div className="flex-shrink-0 w-[180px] md:w-[200px] mx-3">
                <div
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#150B1F] transition-all duration-300 h-[140px] group"
                    style={{
                        border: `1px solid ${hexToRgba(tech.glow, 0.4)}`,
                        boxShadow: `0 0 15px ${hexToRgba(tech.glow, 0.15)}, 0 0 30px ${hexToRgba(tech.glow, 0.08)}`,
                    }}
                >
                    <div className="text-4xl md:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                        {tech.icon}
                    </div>
                    <span className="text-[#DFB6B2] font-medium text-sm text-center group-hover:text-[#FBE4D8] transition-colors">
                        {tech.name}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <section ref={comp} className="skills-section relative z-10 py-20 overflow-hidden">
            <h2 className="skills-header text-4xl md:text-6xl font-bold text-[#FBE4D8] mb-16 text-center tracking-tighter text-shimmer px-4">
                Skills & Technologies
            </h2>

            <div className="space-y-8">
                {/* Top Row - Scroll Left */}
                <div className="relative overflow-hidden">
                    <div
                        ref={marquee1Ref}
                        className="flex hover:pause-animation"
                        style={{ width: 'max-content' }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...technologies, ...technologies].map((tech, index) => (
                            <TechCard key={`top-${index}`} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Scroll Right */}
                <div className="relative overflow-hidden">
                    <div
                        ref={marquee2Ref}
                        className="flex hover:pause-animation"
                        style={{ width: 'max-content' }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...technologies2, ...technologies2].map((tech, index) => (
                            <TechCard key={`bottom-${index}`} tech={tech} />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover\\:pause-animation:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
        </section>
    );
}
