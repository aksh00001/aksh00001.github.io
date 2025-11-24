import React, { useState } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import LogoSplash from './components/LogoSplash';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Skills from './components/Skills';
import { projects } from './data/projects';

function App() {
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    return (
        <div className="relative w-full min-h-screen text-white font-sans selection:bg-accent selection:text-black bg-black">
            {showSplash && <LogoSplash onComplete={handleSplashComplete} />}

            <Background3D />
            <Navbar />

            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                {!loading && <Work projects={projects} />}
                <Contact />
            </main>
        </div>
    );
}

export default App;
