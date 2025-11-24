import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.from(".hero-text", {
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

    return (
        <section ref={comp} className="h-screen flex flex-col justify-center items-center relative z-10 px-4">
            <h1 className="hero-text text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-4 text-center">
                &gt;Akshdeep&lt;
            </h1>
            <p className="hero-text text-lg md:text-2xl text-gray-400 tracking-widest uppercase text-center">
                Creative Developer
            </p>
            <div className="hero-text mt-12 animate-bounce">
                <span className="text-xs md:text-sm text-gray-500">Scroll to Explore</span>
            </div>
        </section>
    );
}
