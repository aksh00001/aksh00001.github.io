import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { HiHome, HiUser, HiCode, HiBriefcase } from 'react-icons/hi';
import { cn } from '../lib/utils';
import SkyToggle from './ui/sky-toggle';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
    { name: 'Home', section: '.hero-section', icon: HiHome },
    { name: 'About', section: '.about-section', icon: HiUser },
    { name: 'Skills', section: '.skills-section', icon: HiCode },
    { name: 'Work', section: '.work-section', icon: HiBriefcase },
];

export default function Navbar() {
    const [activeTab, setActiveTab] = useState(navItems[0].name);
    const [isMobile, setIsMobile] = useState(false);
    const { isDayMode, toggleTheme } = useTheme();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (sectionId, itemName) => {
        const element = document.querySelector(sectionId);
        if (element) {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            const offset = elementTop - (windowHeight / 2) + (elementHeight / 2);

            gsap.to(window, {
                scrollTo: { y: offset, autoKill: false },
                duration: 1.2,
                ease: "power3.out",
            });

            setActiveTab(itemName);
        }
    };

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
            <div className="flex items-center justify-between gap-12 bg-[#150B1F]/40 border border-[#FBE4D8]/10 backdrop-blur-2xl py-3 px-8 rounded-full shadow-2xl shadow-[#522B5B]/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FBE4D8]/5 before:via-transparent before:to-[#854F6C]/5 before:rounded-full">
                {/* Logo - Animated Gradient */}
                <button
                    onClick={() => scrollToSection('.hero-section', 'Home')}
                    className="relative z-10 text-2xl font-bold tracking-tighter transition-all duration-300 hover:scale-105"
                >
                    <span
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #FBE4D8, #DFB6B2, #854F6C, #FBE4D8)',
                            backgroundSize: '200% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'gradientMove 3s ease infinite',
                            display: 'inline-block'
                        }}
                    >
                        aksh21h.me
                    </span>
                </button>

                <style jsx>{`
                    @keyframes gradientMove {
                        0% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                        100% {
                            background-position: 0% 50%;
                        }
                    }
                `}</style>

                {/* Navigation Items with Tubelight */}
                <div className="relative z-10 flex items-center gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.section, item.name)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300",
                                    "text-[#FBE4D8]/70 hover:text-[#FBE4D8]",
                                    isActive && "text-[#FBE4D8]",
                                )}
                            >
                                <span className="hidden md:inline uppercase tracking-wider">{item.name}</span>
                                <span className="md:hidden">
                                    <Icon size={20} />
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="lamp"
                                        className="absolute inset-0 w-full bg-[#522B5B]/20 rounded-full -z-10"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    >
                                        {/* Tubelight glow effect */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FBE4D8] rounded-t-full shadow-[0_0_20px_rgba(251,228,216,0.8)]">
                                            <div className="absolute w-12 h-6 bg-[#FBE4D8]/30 rounded-full blur-md -top-2 -left-2" />
                                            <div className="absolute w-8 h-6 bg-[#FBE4D8]/20 rounded-full blur-md -top-1" />
                                            <div className="absolute w-4 h-4 bg-[#FBE4D8]/20 rounded-full blur-sm top-0 left-2" />
                                        </div>
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Day/Night Toggle */}
                <div className="relative z-10">
                    <SkyToggle checked={!isDayMode} onChange={toggleTheme} />
                </div>
            </div>
        </nav>
    );
}
