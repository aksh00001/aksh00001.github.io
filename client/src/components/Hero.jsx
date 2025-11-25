import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import profileImage from '../assets/profile.jpg';

export default function Hero() {
    const comp = useRef();
    const [displayText, setDisplayText] = React.useState("");
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [trailText, setTrailText] = React.useState("");

    const roles = ["Cloud Developer", "3D Animator"];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.from(".hero-content", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.5
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    React.useEffect(() => {
        const currentRole = roles[roleIndex];
        const typingSpeed = isDeleting ? 80 : 150; // Slower speeds
        const pauseTime = isDeleting ? 0 : 2000;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === currentRole) {
                // Pause before deleting
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === "") {
                // Move to next role
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setTrailText("");
            } else if (isDeleting) {
                // Delete character and set trail
                const deletedChar = displayText[displayText.length - 1];
                setTrailText(deletedChar);
                setDisplayText(currentRole.substring(0, displayText.length - 1));
                // Clear trail after a short delay
                setTimeout(() => setTrailText(""), 200);
            } else {
                // Type character
                setDisplayText(currentRole.substring(0, displayText.length + 1));
                setTrailText("");
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex]);

    const scrollToSection = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={comp} className="hero-section h-screen flex flex-col justify-center items-center relative z-10 px-4 pt-16">
            {/* Profile Avatar */}
            <div className="hero-content mb-8">
                <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                    <div className="absolute inset-0 rounded-full bg-[#522B5B] blur-xl opacity-75 animate-pulse"></div>
                    <img
                        src={profileImage}
                        alt="Akshdeep Singh"
                        className="relative w-full h-full rounded-full object-cover border-4 border-[#522B5B] shadow-2xl shadow-[#522B5B]/50"
                    />
                </div>
            </div>

            {/* Headline - Champagne */}
            <h1 className="hero-content text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-4 text-[#FBE4D8]">
                Hi, I'm{' '}
                <span
                    className="relative inline-block cursor-default transition-transform duration-300 hover:scale-110"
                    style={{
                        backgroundImage: `linear-gradient(to right, #522B5B, #854F6C, #522B5B)`,
                        backgroundSize: '200% auto',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientAnimation 2s linear infinite',
                    }}
                >
                    Akshdeep Singh
                </span>

            </h1>

            {/* Sub-heading - Rose Gold with Typewriter Effect */}
            <h2 className="text-xl md:text-3xl text-[#DFB6B2] tracking-wide text-center mb-6 font-semibold min-h-[2.5rem] md:min-h-[3rem]">
                {displayText}
                <span className="opacity-30 transition-opacity duration-200">{trailText}</span>
                <span className="animate-pulse">|</span>
            </h2>

            {/* Bio - Champagne (Muted) */}
            <p className="hero-content text-base md:text-lg text-[#FBE4D8]/80 text-center max-w-2xl mb-8 leading-relaxed">
                Passionate about building scalable cloud solutions with <span className="text-[#DFB6B2] font-semibold">AWS</span> and creating immersive experiences as a <span className="text-[#DFB6B2] font-semibold">3D Animator</span>. I bring ideas to life through code and creativity.
            </p>

            {/* Action Buttons - Mauve/Accent */}
            <div className="hero-content flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => scrollToSection('.work-section')}
                    className="px-8 py-3 bg-[#854F6C] text-[#FBE4D8] font-semibold rounded-lg hover:bg-[#522B5B] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#854F6C]/50"
                >
                    View My Work
                </button>
                <button
                    onClick={() => scrollToSection('.contact-section')}
                    className="px-8 py-3 border-2 border-[#854F6C] text-[#854F6C] font-semibold rounded-lg hover:bg-[#854F6C] hover:text-[#FBE4D8] transform hover:scale-105 transition-all duration-300"
                >
                    Get In Touch
                </button>
            </div>

            {/* Scroll Indicator - Champagne (Muted) */}
            <div className="hero-content absolute bottom-8 animate-bounce">
                <span className="text-xs md:text-sm text-[#FBE4D8]/60">Scroll to Explore</span>
            </div>
        </section>
    );
}
