import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageGrid() {
    const comp = useRef();
    const gridRef = useRef();
    const featuredRef = useRef();
    const imageRefs = useRef([]);

    // Cloud computing themed images
    const gridImages = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop', // Global network
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop', // Server racks
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=1080&fit=crop', // Cloud infrastructure
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop', // Data center
        'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1920&h=1080&fit=crop', // CENTER - Cloud computing (row 2, middle)
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop', // AWS/Cloud
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop', // Technology
        'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&h=1080&fit=crop', // Servers
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop', // Network
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: comp.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 0.5,
                    pin: true,
                }
            });

            // Animate each image
            imageRefs.current.forEach((img, index) => {
                if (!img) return;

                if (index === 4) {
                    // Center image - expand to fullscreen
                    tl.to(img, {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        borderRadius: 0,
                        zIndex: 40,
                        duration: 2,
                        ease: "power3.inOut"
                    }, 0);
                } else {
                    // Other images - scale up in their own position then fade
                    tl.to(img, {
                        scale: 1.3,
                        duration: 1,
                        ease: "power2.out"
                    }, 0)
                        .to(img, {
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out"
                        }, 0.5);
                }
            });

            // Fade in text overlay
            tl.to(featuredRef.current, {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, "-=0.5");

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section ref={comp} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
                {/* 3x3 Image Grid */}
                <div ref={gridRef} className="absolute inset-0 p-8 md:p-16">
                    <div className="relative w-full h-full">
                        {gridImages.map((img, index) => {
                            const row = Math.floor(index / 3);
                            const col = index % 3;
                            return (
                                <div
                                    key={index}
                                    ref={el => imageRefs.current[index] = el}
                                    className="grid-image absolute overflow-hidden rounded-2xl"
                                    style={{
                                        width: 'calc(33.333% - 16px)',
                                        height: 'calc(33.333% - 16px)',
                                        top: `calc(${row * 33.333}% + ${row * 8}px)`,
                                        left: `calc(${col * 33.333}% + ${col * 8}px)`,
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Cloud Computing ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Featured Projects Text Overlay */}
                <div
                    ref={featuredRef}
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-50 bg-black/40"
                >
                    <div className="text-center px-4">
                        <p className="text-purple-400 text-sm md:text-base uppercase tracking-widest mb-4">
                            Featured
                        </p>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
                            Cloud Infrastructure
                        </h2>
                        <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                            Discover
                        </button>
                    </div>
                </div>
            </section>

            {/* New Featured Projects Section */}
            <section className="relative z-10 py-20 px-4 md:px-20 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center">
                        Featured Projects
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Project Cards */}
                        {[
                            { title: 'AWS Cloud Migration', desc: 'Enterprise-scale cloud infrastructure migration' },
                            { title: 'Kubernetes Deployment', desc: 'Containerized application orchestration' },
                            { title: 'Serverless Architecture', desc: 'Event-driven serverless solutions' },
                            { title: 'DevOps Pipeline', desc: 'CI/CD automation and deployment' },
                            { title: 'Data Lake Solution', desc: 'Big data analytics infrastructure' },
                            { title: 'Microservices Platform', desc: 'Scalable microservices architecture' },
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                                    <p className="text-gray-400 mb-6">{project.desc}</p>
                                    <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
