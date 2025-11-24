import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-[#CD7F32]' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Metallic Gold */}
                    <button
                        onClick={() => scrollToSection('.hero-section')}
                        className="text-2xl font-bold tracking-tighter text-[#D4AF37] hover:text-[#E09850] transition-colors"
                    >
                        Aksh
                    </button>

                    {/* Navigation Links - Warm Silver with Muted Bronze hover */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('.about-section')}
                            className="text-sm uppercase tracking-widest text-[#C0C0C0] hover:text-[#CD7F32] transition-colors"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('.skills-section')}
                            className="text-sm uppercase tracking-widest text-[#C0C0C0] hover:text-[#CD7F32] transition-colors"
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => scrollToSection('.work-section')}
                            className="text-sm uppercase tracking-widest text-[#C0C0C0] hover:text-[#CD7F32] transition-colors"
                        >
                            Work
                        </button>
                        <button
                            onClick={() => scrollToSection('.contact-section')}
                            className="text-sm uppercase tracking-widest text-[#C0C0C0] hover:text-[#CD7F32] transition-colors"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-[#D4AF37]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
