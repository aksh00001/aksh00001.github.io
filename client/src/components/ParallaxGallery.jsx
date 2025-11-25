import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGallery() {
    const sectionRef = useRef();
    const gridRef = useRef();
    const centerRef = useRef();
    const overlayRef = useRef();

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
            const imgElement = centerRef.current?.querySelector('img');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "center center",
                    end: "+=4000",
                    scrub: 0.3,
                    pin: true,
                }
            });

            // Fade out grid
            tl.to(gridRef.current, {
                opacity: 0,
                duration: 0.5,
            })
                // Show overlay
                .to(overlayRef.current, {
                    opacity: 1,
                    duration: 0.3,
                }, 0)
                // Zoom INTO the image (no container expansion)
                .to(imgElement, {
                    scale: 3,
                    duration: 1,
                    ease: "power3.inOut"
                }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] pt-0 pb-20">
            {/* Main Grid */}
            <div ref={gridRef} className="w-full max-w-7xl px-4 md:px-8">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-[20px] group cursor-pointer"
                            style={{ aspectRatio: '16/9' }}
                        >
                            <img
                                src={img}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
            >
                <div
                    ref={centerRef}
                    className="relative overflow-hidden rounded-[20px]"
                    style={{
                        width: '33%',
                        aspectRatio: '16/9',
                    }}
                >
                    <img
                        src={images[4]}
                        alt="Featured Project"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
