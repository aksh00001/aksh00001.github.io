import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';
import GradientButton from './ui/gradient-button';
import Magnetic from './ui/magnetic';

export default function Hero() {
    const comp = useRef();
    const containerRef = useRef();
    const [displayText, setDisplayText] = React.useState("");
    const [roleIndex, setRoleIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [trailText, setTrailText] = React.useState("");

    const roles = ["Cloud Developer", "3D Animator", "UI/UX Designer"];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial Entry
            tl.from(".hero-glass-card", {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            })
                .from(".hero-content", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                }, "-=1");

            // Floating Animation for the Glass Card
            gsap.to(".hero-glass-card", {
                y: 15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    // Mouse tilt effect for the Glass Card
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        gsap.to(".hero-glass-card", {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(".hero-glass-card", {
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };

    React.useEffect(() => {
        const currentRole = roles[roleIndex];
        const typingSpeed = isDeleting ? 60 : 120;
        const pauseTime = isDeleting ? 0 : 2500;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === currentRole) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setTrailText("");
            } else if (isDeleting) {
                const deletedChar = displayText[displayText.length - 1];
                setTrailText(deletedChar);
                setDisplayText(currentRole.substring(0, displayText.length - 1));
                setTimeout(() => setTrailText(""), 200);
            } else {
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
        <section
            ref={comp}
            className="hero-section h-screen flex flex-col justify-center items-center relative z-10 px-4 pt-16"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={containerRef} className="hero-glass-card relative p-8 md:p-12 rounded-[2.5rem] border border-[#FBE4D8]/10 bg-[#150B1F]/30 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col items-center max-w-4xl w-full perspective-1000">
                {/* Decorative Background Elements inside Glass Card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#854F6C]/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#522B5B]/20 blur-3xl rounded-full -ml-24 -mb-24"></div>

                {/* Profile Avatar */}
                <div className="hero-content mb-8 z-10">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] blur-sm opacity-75"
                        ></motion.div>
                        <img
                            src={profileImage}
                            alt="Akshdeep Singh"
                            className="relative w-full h-full rounded-full object-cover border-2 border-[#150B1F] shadow-xl z-10"
                        />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="hero-content text-4xl md:text-6xl font-bold tracking-tight text-center mb-4 text-[#FBE4D8] z-10">
                    Hi, I'm{' '}
                    <span
                        className="relative inline-block cursor-default transition-transform duration-300 hover:scale-105"
                        style={{
                            backgroundImage: `linear-gradient(to right, #FBE4D8, #DFB6B2, #854F6C, #DFB6B2, #FBE4D8)`,
                            backgroundSize: '200% auto',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent',
                            animation: 'gradientAnimation 5s linear infinite',
                            filter: 'drop-shadow(0 0 10px rgba(223, 182, 178, 0.4))'
                        }}
                    >
                        Akshdeep Singh
                    </span>
                </h1>

                {/* Sub-heading with Typewriter Effect */}
                <h2 className="hero-content text-xl md:text-2xl text-[#DFB6B2] tracking-widest text-center mb-6 font-medium min-h-[3rem] z-10 uppercase">
                    {displayText}
                    <span className="opacity-40 transition-opacity duration-200">{trailText}</span>
                    <span className="animate-pulse inline-block w-0.5 h-6 bg-[#DFB6B2] ml-1 align-middle"></span>
                </h2>

                {/* Bio */}
                <p className="hero-content text-base md:text-lg text-[#FBE4D8]/70 text-center max-w-2xl mb-10 leading-relaxed font-light z-10">
                    Architecting <span className="text-[#DFB6B2] font-semibold">Scalable Cloud Infrastructures</span> & crafting
                    <span className="text-[#DFB6B2] font-semibold"> Immersive Visual Experiences</span>.
                    Merging complex code with artistic precision.
                </p>

                {/* Action Buttons */}
                <div className="hero-content flex flex-col sm:flex-row gap-6 z-10">
                    <Magnetic strength={0.2}>
                        <GradientButton className="text-sm tracking-widest" onClick={() => scrollToSection('.work-section')}>
                            VIEW PORTFOLIO
                        </GradientButton>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <GradientButton variant="variant" className="text-sm tracking-widest" onClick={() => scrollToSection('.contact-section')}>
                            LET'S CONNECT
                        </GradientButton>
                    </Magnetic>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] tracking-[0.3em] text-[#FBE4D8]/40 uppercase font-bold">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[#FBE4D8]/40 to-transparent"></div>
            </motion.div>
        </section>
    );
}
