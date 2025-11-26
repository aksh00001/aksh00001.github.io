import React, { useState } from 'react';
import ShaderDemo_ATC from './components/ui/atc-shader';
import Navbar from './components/Navbar';
import LogoSplash from './components/LogoSplash';
import Hero from './components/Hero';
import Work from './components/Work';
import AngledMarquee from './components/AngledMarquee';
import About from './components/About';
import AnimatedFooter from './components/AnimatedFooter';
import Skills from './components/Skills';
import { projects } from './data/projects';

function App() {
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    return (
        <div className="relative w-full min-h-screen text-[#FBE4D8] font-sans selection:bg-[#DFB6B2] selection:text-[#050205]">
            {showSplash && <LogoSplash onComplete={handleSplashComplete} />}

            <ShaderDemo_ATC />
            <Navbar />

            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                {!loading && <Work projects={projects} />}
                <AngledMarquee />
            </main>

            <AnimatedFooter />
        </div>
    );
}

export default App;
