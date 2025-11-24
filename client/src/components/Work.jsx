import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function Work({ projects }) {
    const comp = useRef();
    const sliderRef = useRef();
    const cardsRef = useRef([]);

    // Duplicate projects for seamless infinite loop
    const extendedProjects = [...projects, ...projects, ...projects];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Infinite Marquee Animation
            const totalWidth = sliderRef.current.scrollWidth / 3; // Width of one set

            gsap.to(sliderRef.current, {
                x: -totalWidth,
                duration: 20, // Slow speed
                ease: "none",
                repeat: -1
            });

            // Center Detection Loop
            gsap.ticker.add(() => {
                const center = window.innerWidth / 2;

                cardsRef.current.forEach((card) => {
                    if (!card) return;
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(center - cardCenter);

                    // Threshold for "center" (e.g., within 150px)
                    if (distance < 200) {
                        card.classList.add('gold-glow');
                        // Scale up more significantly
                        gsap.to(card, { scale: 1.15, duration: 0.5, ease: "power2.out" });
                    } else {
                        card.classList.remove('gold-glow');
                        gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
                    }
                });
            });

        }, comp);

        return () => {
            ctx.revert();
            gsap.ticker.remove(() => { }); // Cleanup ticker (though ctx.revert handles most)
        };
    }, [projects]);

    return (
        <section ref={comp} className="work-section relative z-10 py-20 overflow-hidden">
            <div className="px-4 md:px-20 mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-white">Selected Works</h2>
            </div>

            <div className="flex items-center">
                <div ref={sliderRef} className="flex gap-8 md:gap-20 px-8 md:px-20 w-max">
                    {extendedProjects.map((project, index) => (
                        <div
                            key={`${project.id}-${index}`}
                            ref={el => cardsRef.current[index] = el}
                            className="project-item w-[85vw] md:w-[45vw] lg:w-[30vw] flex-shrink-0 transition-all duration-300 rounded-xl"
                        >
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
