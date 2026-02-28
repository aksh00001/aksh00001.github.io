import React from 'react';

export default function Contact() {
    return (
        <section id="contact" className="contact-section min-h-[50vh] flex flex-col justify-center items-center relative z-10 px-4 py-32 bg-[#050205]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#854F6C]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <h2 className="text-4xl md:text-7xl lg:text-9xl font-bold mb-12 tracking-tighter text-center text-[#FBE4D8]">
                Let's Talk
            </h2>

            <a
                href="mailto:hello@aksh21h.me"
                className="group relative text-2xl md:text-4xl lg:text-5xl font-light text-[#DFB6B2] hover:text-[#FBE4D8] transition-all duration-500 pb-4"
            >
                <span className="relative z-10">hello@aksh21h.me</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#DFB6B2]/30 scale-x-100 group-hover:bg-[#FBE4D8] group-hover:h-[2px] transition-all duration-500 origin-left"></div>
            </a>

            <div className="mt-16 md:mt-24 flex flex-wrap justify-center gap-8 md:gap-12 text-center z-10">
                {[
                    { name: 'GitHub', url: 'https://github.com/aksh00001' },
                    { name: 'Twitter', url: 'https://twitter.com/aksh21h' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/in/akshdeep-singh-6b3534241' },
                    { name: 'Instagram', url: 'https://instagram.com/aksh21h' }
                ].map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-[#FBE4D8]/40 hover:text-[#DFB6B2] transition-all duration-300 hover:tracking-[0.5em]"
                    >
                        {social.name}
                    </a>
                ))}
            </div>

            <footer className="mt-24 text-[10px] tracking-widest text-[#FBE4D8]/20 uppercase font-bold">
                &copy; 2026 Akshdeep Singh. Crafted with Passion.
            </footer>
        </section>
    );
}
