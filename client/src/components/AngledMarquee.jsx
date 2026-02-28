import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AngledMarquee() {
    const containerRef = useRef();
    const topStripRef = useRef();
    const bottomStripRef = useRef();

    const topKeywords = ['GitHub', 'Animation', 'Cloud'];
    const bottomKeywords = ['AWS', 'Blender', 'Docker'];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const baseSpeed = 100;

            const topTl = gsap.timeline({ repeat: -1 });
            topTl.to(topStripRef.current, {
                x: '-50%',
                duration: baseSpeed,
                ease: 'none',
            });

            const bottomTl = gsap.timeline({ repeat: -1 });
            bottomTl.fromTo(bottomStripRef.current,
                { x: '-50%' },
                { x: '0%', duration: baseSpeed, ease: 'none' }
            );

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const speedMultiplier = 1 + Math.abs(self.getVelocity() / 1000);
                    gsap.to(topTl, { timeScale: speedMultiplier, duration: 0.3 });
                    gsap.to(bottomTl, { timeScale: speedMultiplier, duration: 0.3 });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Duplicate via JSX array instead of innerHTML +=
    const renderKeywords = (keywords, className) => (
        [...keywords, ...keywords].map((keyword, index) => (
            <span key={index} className={`text-6xl md:text-8xl font-bold ${className} mx-8`}>
                {keyword}
            </span>
        ))
    );

    return (
        <section ref={containerRef} className="relative py-20 overflow-hidden bg-transparent">
            <div className="relative" style={{ transform: 'rotate(-3deg)' }}>
                <div className="relative overflow-hidden bg-gradient-to-r from-[#2B124C] to-[#522B5B] py-8 mb-4">
                    <div ref={topStripRef} className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
                        {renderKeywords(topKeywords, 'text-[#FBE4D8]/90')}
                    </div>
                </div>
                <div className="relative overflow-hidden bg-gradient-to-r from-[#522B5B] to-[#854F6C] py-8">
                    <div ref={bottomStripRef} className="flex whitespace-nowrap" style={{ willChange: 'transform' }}>
                        {renderKeywords(bottomKeywords, 'text-[#DFB6B2]')}
                    </div>
                </div>
            </div>
        </section>
    );
}
