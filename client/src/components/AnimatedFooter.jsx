import React from 'react';

export default function AnimatedFooter() {
    return (
        <footer className="relative w-full h-[500px] overflow-hidden bg-transparent mt-20">
            {/* Fog Layer 1 - Deep Purple Base */}
            <div
                className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[150%] h-[400px] blur-[80px] opacity-60 animate-fog-pulse-1"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(43, 18, 76, 0.6) 0%, rgba(43, 18, 76, 0) 70%)', // #2B124C
                }}
            ></div>

            {/* Fog Layer 2 - Mauve/Rose Mist */}
            <div
                className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[120%] h-[300px] blur-[60px] opacity-50 animate-fog-pulse-2"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(133, 79, 108, 0.5) 0%, rgba(133, 79, 108, 0) 70%)', // #854F6C
                }}
            ></div>

            {/* Fog Layer 3 - Soft Accent Haze (Top) */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[200px] blur-[40px] opacity-30 animate-fog-pulse-3"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(82, 43, 91, 0.4) 0%, rgba(82, 43, 91, 0) 70%)', // #522B5B
                }}
            ></div>

            {/* Large Quote Marks */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <span className="text-[400px] font-serif text-white leading-none">"</span>
            </div>

            {/* Footer Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                <div className="flex justify-between items-end text-white/60 text-sm font-light tracking-wider">
                    <p>Design by Akshdeep Singh</p>
                    <p>Development by Akshdeep Singh</p>
                </div>
            </div>
        </footer>
    );
}
