import React from 'react';

export default function Contact() {
    return (
        <section className="min-h-[50vh] flex flex-col justify-center items-center relative z-10 text-white px-4 py-20">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tighter text-center">
                Let's Talk
            </h2>
            <a
                href="mailto:hello@akshdeep.dev"
                className="text-lg md:text-2xl lg:text-3xl text-gray-400 hover:text-accent transition-colors border-b border-gray-700 hover:border-accent pb-2"
            >
                hello@akshdeep.dev
            </a>

            <div className="mt-12 md:mt-20 flex flex-col md:flex-row gap-6 md:gap-8 text-center">
                {['GitHub', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                    <a
                        key={social}
                        href="#"
                        className="text-xs md:text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    >
                        {social}
                    </a>
                ))}
            </div>

            <footer className="mt-20 text-xs text-gray-700">
                &copy; 2025 Akshdeep. All rights reserved.
            </footer>
        </section>
    );
}
