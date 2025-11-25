import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenExpansion() {
    const sectionRef = useRef();
    const wrapperRef = useRef();
    const centerImageRef = useRef();

    const images = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1920&h=1080&fit=crop', // CENTER
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&h=1080&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop',
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                }
            });

            // Scale up center image to fullscreen
            tl.to(centerImageRef.current, {
                scale: 3,
                borderRadius: 0,
                duration: 1,
                ease: "power2.inOut"
            })
                // Fade out wrapper
                .to(wrapperRef.current, {
                    opacity: 0,
                    duration: 0.5,
                }, 0.5);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
            <div ref={wrapperRef} className="w-full max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            ref={index === 4 ? centerImageRef : null}
                            className="relative overflow-hidden rounded-[20px]"
                            style={{
                                aspectRatio: '16/9',
                            }}
                        >
                            <img
                                src={img}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
