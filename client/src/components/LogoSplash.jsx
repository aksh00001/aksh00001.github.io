import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import logoImage from '../assets/logo.png';

export default function LogoSplash({ onComplete }) {
    const leftHalfRef = useRef(null);
    const rightHalfRef = useRef(null);
    const logoRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressContainerRef = useRef(null);

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Create GSAP timeline
        const tl = gsap.timeline();

        // 1. Fade in logo with scale-up effect and start progress bar
        tl.fromTo(logoRef.current,
            {
                opacity: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: 'power2.out'
            }
        )
            .fromTo(progressBarRef.current,
                {
                    width: '0%'
                },
                {
                    width: '100%',
                    duration: 3.5, // Total duration until split (1.5 + 0.8 + 1.2)
                    ease: 'linear'
                },
                '<' // Start at the same time as logo fade
            )
            // 2. Pause for brand recognition
            .to({}, { duration: 0.8 })
            // 2.5. Fade out progress bar
            .to(progressContainerRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut'
            }, '-=0.2')
            // 3. Apply clip paths and split sideways
            .call(() => {
                // Apply clip paths just before splitting
                if (leftHalfRef.current) {
                    leftHalfRef.current.style.clipPath = 'inset(0 50% 0 0)';
                }
                if (rightHalfRef.current) {
                    rightHalfRef.current.style.clipPath = 'inset(0 0 0 50%)';
                }
            })
            .to(leftHalfRef.current, {
                x: '-100%',
                duration: 1.2,
                ease: 'expo.inOut'
            }, '+=0.1')
            .to(rightHalfRef.current, {
                x: '100%',
                duration: 1.2,
                ease: 'expo.inOut'
            }, '<')
            .call(() => {
                // Hide the overlays completely
                if (leftHalfRef.current) {
                    leftHalfRef.current.style.display = 'none';
                }
                if (rightHalfRef.current) {
                    rightHalfRef.current.style.display = 'none';
                }
                // Unlock body scroll and trigger completion
                document.body.style.overflow = 'auto';
                if (onComplete) onComplete();
            });

    }, [onComplete]);

    return (
        <>
            {/* Left Half */}
            <div
                ref={leftHalfRef}
                className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
            >
                {/* Aurora Mesh Gradient Orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/30 via-pink-500/20 to-transparent blur-3xl animate-pulse"></div>
                    <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-500/25 via-purple-500/15 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-400/20 via-violet-400/10 to-transparent blur-xl"></div>
                </div>

                {/* Logo */}
                <div
                    ref={logoRef}
                    className="relative z-10 text-center"
                >
                    <img
                        src={logoImage}
                        alt="Akshdeep Singh Logo"
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 16px rgba(212, 175, 55, 0.4)) drop-shadow(0 0 24px rgba(212, 175, 55, 0.2))'
                        }}
                    />
                    <div className="mt-6 text-xl md:text-2xl font-semibold text-[#C0C0C0] tracking-widest">
                        AKSHDEEP SINGH
                    </div>

                    {/* Progress Bar */}
                    <div ref={progressContainerRef} className="mt-8 w-64 md:w-80 mx-auto">
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                ref={progressBarRef}
                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full"
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Half */}
            <div
                ref={rightHalfRef}
                className="fixed inset-0 z-[9998] bg-[#050505] flex items-center justify-center overflow-hidden"
            >
                {/* Aurora Mesh Gradient Orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/30 via-pink-500/20 to-transparent blur-3xl animate-pulse"></div>
                    <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-500/25 via-purple-500/15 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-400/20 via-violet-400/10 to-transparent blur-xl"></div>
                </div>

                {/* Logo (duplicate for right half) */}
                <div className="relative z-10 text-center">
                    <img
                        src={logoImage}
                        alt="Akshdeep Singh Logo"
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 16px rgba(212, 175, 55, 0.4)) drop-shadow(0 0 24px rgba(212, 175, 55, 0.2))'
                        }}
                    />
                    <div className="mt-6 text-xl md:text-2xl font-semibold text-[#C0C0C0] tracking-widest">
                        AKSHDEEP SINGH
                    </div>

                    {/* Progress Bar (duplicate - will fade with left half) */}
                    <div className="mt-8 w-64 md:w-80 mx-auto opacity-0">
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full"
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
