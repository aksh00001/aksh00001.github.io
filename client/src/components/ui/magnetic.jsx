import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 0.5 }) {
    const magnetic = useRef(null);

    useEffect(() => {
        const m = magnetic.current;
        if (!m) return;

        const xTo = gsap.quickTo(m, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(m, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = m.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        m.addEventListener("mousemove", mouseMove);
        m.addEventListener("mouseleave", mouseLeave);

        return () => {
            m.removeEventListener("mousemove", mouseMove);
            m.removeEventListener("mouseleave", mouseLeave);
        };
    }, [strength]);

    return (
        <div ref={magnetic} className="inline-block">
            {children}
        </div>
    );
}
