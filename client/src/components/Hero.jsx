import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import profileImage from '../assets/profile.jpg';

export default function Hero() {
    const comp = useRef();

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
                    <div className="absolute inset-0 rounded-full bg-purple-500 blur-xl opacity-75 animate-pulse"></div>
                    <img
                        src={profileImage}
                        alt="Akshdeep Singh"
                        className="relative w-full h-full rounded-full object-cover border-4 border-purple-500 shadow-2xl shadow-purple-500/50"
                    />
                </div>
            </div>

            {/* Headline - Metallic Gold */}
            <h1 className="hero-content text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center mb-4 text-[#D4AF37]">
                Hi, I'm{' '}
                <span
                    className="relative inline-block cursor-default transition-transform duration-300 hover:scale-110"
                    style={{
                        backgroundImage: `linear-gradient(to right, #8A2BE2, #E879F9, #8A2BE2)`,
                        backgroundSize: '200% auto',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradientAnimation 3s linear infinite',
                    }}
                >
                    Akshdeep Singh
                </span>

            </h1>

            {/* Sub-heading - Metallic Gold */}
            <h2 className="hero-content text-xl md:text-3xl text-[#D4AF37] tracking-wide text-center mb-6 font-semibold">
                Cloud Developer
            </h2>

            {/* Bio - Warm Silver */}
            <p className="hero-content text-base md:text-lg text-[#C0C0C0] text-center max-w-2xl mb-8 leading-relaxed">
                Passionate about building scalable cloud solutions with <span className="text-[#D4AF37] font-semibold">AWS</span> and creating immersive experiences as a <span className="text-[#D4AF37] font-semibold">3D Animator</span>. I bring ideas to life through code and creativity.
            </p>

            {/* Action Buttons - Muted Bronze */}
            <div className="hero-content flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => scrollToSection('.work-section')}
                    className="px-8 py-3 bg-[#CD7F32] text-white font-semibold rounded-lg hover:bg-[#E09850] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#CD7F32]/50"
                >
                    View My Work
                </button>
                <button
                    onClick={() => scrollToSection('.contact-section')}
                    className="px-8 py-3 border-2 border-[#CD7F32] text-[#CD7F32] font-semibold rounded-lg hover:bg-[#CD7F32] hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                    Get In Touch
                </button>
            </div>

            {/* Scroll Indicator - Warm Silver */}
            <div className="hero-content absolute bottom-8 animate-bounce">
                <span className="text-xs md:text-sm text-[#C0C0C0]">Scroll to Explore</span>
            </div>
        </section>
    );
}
