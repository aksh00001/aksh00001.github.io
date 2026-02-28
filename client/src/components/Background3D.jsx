import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const scrollState = { y: 0, progress: 0 };

function updateScroll() {
    scrollState.y = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = maxScroll > 0 ? scrollState.y / maxScroll : 0;
}

function ShapeField() {
    const meshRefs = useRef([]);

    const shapes = useMemo(() => {
        const geometries = [
            new THREE.OctahedronGeometry(1, 0),
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.DodecahedronGeometry(1, 0),
            new THREE.TorusGeometry(0.7, 0.25, 16, 48),
            new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8, 2, 3),
            new THREE.ConeGeometry(0.7, 1.4, 6),
            new THREE.CylinderGeometry(0, 1, 1.6, 4),
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.8, 8, 6),
        ];

        // Mostly dark shapes with rare subtle accents — matches #050205 background
        const themeColors = [
            { color: '#150B1F', emissive: '#0a0510', type: 'glass' },       // near-black purple
            { color: '#1a0f2e', emissive: '#0d0818', type: 'glass' },       // dark indigo
            { color: '#2B124C', emissive: '#150B1F', type: 'metallic' },    // deep purple
            { color: '#2B124C', emissive: '#150B1F', type: 'glass' },       // deep purple glass
            { color: '#522B5B', emissive: '#2B124C', type: 'metallic' },    // royal purple
            { color: '#3d1f4e', emissive: '#2B124C', type: 'glass' },       // mid purple
            { color: '#522B5B', emissive: '#2B124C', type: 'emissive' },    // purple glow (subtle)
            { color: '#854F6C', emissive: '#522B5B', type: 'emissive' },    // rare mauve accent
        ];

        const count = window.innerWidth < 768 ? 30 : 60;
        const items = [];

        for (let i = 0; i < count; i++) {
            const theme = themeColors[Math.floor(Math.random() * themeColors.length)];
            const scale = Math.random() * 0.8 + 0.4;
            const depth = Math.random();

            items.push({
                id: i,
                geometry: geometries[Math.floor(Math.random() * geometries.length)],
                ...theme,
                scale: [scale, scale, scale],
                position: [
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 20 - 5  // z: -15 to +5 (visible range around camera)
                ],
                speed: Math.random() * 0.3 + 0.05,
                floatOffset: Math.random() * Math.PI * 2,
                floatAmplitude: Math.random() * 1.5 + 0.5,
                rotationAxis: [
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                ],
                opacity: 0.2 + depth * 0.3,
            });
        }
        return items;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouseX = state.mouse.x * 3;
        const mouseY = state.mouse.y * 3;
        const scrollOffset = scrollState.progress * 25;

        for (let i = 0; i < shapes.length; i++) {
            const mesh = meshRefs.current[i];
            if (!mesh) continue;

            const { position, speed, floatOffset, floatAmplitude, rotationAxis } = shapes[i];

            mesh.rotation.x += speed * rotationAxis[0] * 0.01;
            mesh.rotation.y += speed * rotationAxis[1] * 0.015;
            mesh.rotation.z += speed * rotationAxis[2] * 0.008;

            const floatY = Math.sin(t * speed * 1.5 + floatOffset) * floatAmplitude;
            const floatX = Math.cos(t * speed * 0.8 + floatOffset * 1.3) * floatAmplitude * 0.3;

            mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, position[0] + mouseX + floatX, 0.03);
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, position[1] + mouseY + scrollOffset + floatY, 0.03);

            // Subtle scale pulse on some shapes
            if (i % 5 === 0) {
                const pulse = 1 + Math.sin(t * 0.5 + floatOffset) * 0.08;
                mesh.scale.setScalar(shapes[i].scale[0] * pulse);
            }
        }
    });

    return (
        <>
            {shapes.map((shape, i) => (
                <mesh
                    key={shape.id}
                    ref={el => meshRefs.current[i] = el}
                    position={shape.position}
                    scale={shape.scale}
                    geometry={shape.geometry}
                >
                    {shape.type === 'glass' ? (
                        <meshPhysicalMaterial
                            color={shape.color}
                            roughness={0.15}
                            metalness={0.3}
                            transparent
                            opacity={shape.opacity * 0.5}
                            envMapIntensity={1}
                        />
                    ) : shape.type === 'emissive' ? (
                        <meshStandardMaterial
                            color={shape.color}
                            emissive={shape.emissive}
                            emissiveIntensity={0.3}
                            transparent
                            opacity={shape.opacity * 0.4}
                            roughness={0.4}
                            metalness={0.5}
                        />
                    ) : (
                        <meshPhysicalMaterial
                            color={shape.color}
                            roughness={0.15}
                            metalness={0.9}
                            transparent
                            opacity={shape.opacity * 0.6}
                            clearcoat={0.5}
                            clearcoatRoughness={0.2}
                            envMapIntensity={1.5}
                        />
                    )}
                </mesh>
            ))}
        </>
    );
}

function SceneContent() {
    return (
        <>
            <fog attach="fog" args={['#050205', 20, 45]} />
            <ambientLight intensity={0.15} />

            {/* Dim purple-toned lighting — no bright whites */}
            <pointLight position={[15, 15, 10]} intensity={1.5} color="#854F6C" distance={60} decay={2} />
            <pointLight position={[-15, -15, -5]} intensity={1} color="#522B5B" distance={50} decay={2} />
            <pointLight position={[0, -20, 5]} intensity={0.8} color="#2B124C" distance={40} decay={2} />
            <pointLight position={[5, 25, 8]} intensity={0.5} color="#DFB6B2" distance={35} decay={2} />

            <Stars radius={150} depth={50} count={6000} factor={4} saturation={0.5} fade speed={1} />
            <Sparkles count={100} scale={30} size={1} color="#854F6C" opacity={0.3} speed={0.3} />
            <Sparkles count={50} scale={25} size={1.5} color="#522B5B" opacity={0.2} speed={0.2} />

            <ShapeField />

            <Environment preset="night" />
        </>
    );
}

export default function Background3D() {
    useEffect(() => {
        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-[#050205]">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 50 }}
                gl={{ antialias: true, stencil: false, depth: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
