
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
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
    { name: "Java", icon: <FaJava className="text-[#007396]" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Blender", icon: <SiBlender className="text-[#F5792A]" /> },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
    { name: "Linux", icon: <FaLinux className="text-[#FCC624]" /> },
    { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
    { name: "Unreal Engine 5", icon: <SiUnrealengine className="text-white" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Unity", icon: <FaUnity className="text-white" /> },
    { name: "Blockchain", icon: <FaBitcoin className="text-[#F7931A]" /> },
    { name: "Web3", icon: <FaGlobe className="text-[#F16822]" /> }
];

export default function Skills() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animate the cards as they enter the viewport
            gsap.fromTo(".skill-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".skills-grid",
                        start: "top 90%", // Trigger earlier
                        toggleActions: "play none none none"
                    }
                }
            );
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="skills-section relative z-10 py-20 px-4 md:px-20 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center tracking-tighter text-shimmer">
                Skills & Technologies
            </h2>

            <div className="skills-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full max-w-7xl">
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="skill-card flex flex-col items-center justify-center p-6 rounded-2xl bg-[#111827] border border-gray-800 hover:border-[#FFD700] transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                    >
                        <div className="text-4xl md:text-5xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3">
                            {tech.icon}
                        </div>
                        <span className="text-gray-400 font-medium text-sm md:text-base group-hover:text-white transition-colors">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
