import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
    const overlayRef = useRef(null);
    const counterRef = useRef(null);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Animate counter from 0 to 100
        gsap.to({ val: 0 }, {
            val: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: function () {
                setCounter(Math.floor(this.targets()[0].val));
            },
            onComplete: () => {
                // After counter completes, lift the curtain
                gsap.to(overlayRef.current, {
                    y: '-100%',
                    duration: 1.2,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        // Unlock body scroll
                        document.body.style.overflow = 'auto';
                        if (onComplete) onComplete();
                    }
                });
            }
        });
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
        >
            <div
                ref={counterRef}
                className="text-[#D4AF37] text-6xl md:text-8xl font-serif font-bold"
            >
                {counter}%
            </div>
        </div>
    );
}
