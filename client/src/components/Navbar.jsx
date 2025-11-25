import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.querySelector(id);
        if (element) {
            // Calculate offset to center the section
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const windowHeight = window.innerHeight;
            const offset = elementTop - (windowHeight / 2) + (elementHeight / 2);

            // Smooth scroll with GSAP - fast start, slow stop
            gsap.to(window, {
                scrollTo: { y: offset, autoKill: false },
                duration: 1.2,
                ease: "power3.out", // Fast start, slow deceleration
            });

            setMobileMenuOpen(false); // Close mobile menu after navigation
        }
    };

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
            <div
                className={`transition-all duration-300 rounded-full px-8 py-4 ${scrolled
                    ? 'bg-[#150B1F]/80 backdrop-blur-xl border border-[#522B5B]/20 shadow-lg shadow-black/10'
                    : 'bg-[#150B1F]/40 backdrop-blur-md border border-[#522B5B]/10'
                    }`}
                style={{
                    backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)',
                    WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(150%)'
                }}
            >
                <div className="flex items-center justify-between gap-12">
                    {/* Logo - Animated Gradient */}
                    <button
                        onClick={() => scrollToSection('.hero-section')}
                        className="text-2xl font-bold tracking-tighter transition-all duration-300 hover:scale-105"
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

                    {/* Navigation Links - Champagne with Mauve hover */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('.about-section')}
                            className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-110 group pb-1"
                        >
                            About
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                        </button>
                        <button
                            onClick={() => scrollToSection('.skills-section')}
                            className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-110 group pb-1"
                        >
                            Skills
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                        </button>
                        <button
                            onClick={() => scrollToSection('.work-section')}
                            className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-110 group pb-1"
                        >
                            Work
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                        </button>
                        <button
                            onClick={() => scrollToSection('.contact-section')}
                            className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-110 group pb-1"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-[#FBE4D8]"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-[#522B5B]/20">
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => scrollToSection('.about-section')}
                                className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-105 origin-left text-left group pb-1"
                            >
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('.skills-section')}
                                className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-105 origin-left text-left group pb-1"
                            >
                                Skills
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('.work-section')}
                                className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-105 origin-left text-left group pb-1"
                            >
                                Work
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('.contact-section')}
                                className="relative text-sm uppercase tracking-widest text-[#FBE4D8]/80 hover:text-[#DFB6B2] transition-all duration-300 hover:scale-105 origin-left text-left group pb-1"
                            >
                                Contact
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FBE4D8] shadow-[0_0_10px_rgba(251,228,216,0.8)] group-hover:w-1/2 transition-all duration-300"></span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
