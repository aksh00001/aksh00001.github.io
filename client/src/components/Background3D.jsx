import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Geometry({ position, geometry, material, speed }) {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Rotation
        mesh.current.rotation.x = t * speed * 0.2;
        mesh.current.rotation.y = t * speed * 0.3;

        // Native Scroll Interaction
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        // Mouse interaction
        const mouseX = state.mouse.x * 5;
        const mouseY = state.mouse.y * 5;

        // Combine interactions
        mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, position[0] + mouseX, 0.05);
        mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, position[1] + mouseY + (scrollProgress * 20), 0.05);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={position} geometry={geometry} material={material} />
        </Float>
    );
}

function SceneContent() {
    const shapes = useMemo(() => {
        const items = [];
        const geometries = [
            new THREE.IcosahedronGeometry(1, 0),
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.BoxGeometry(1, 1, 1)
        ];

        const material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.1,
            metalness: 0.9,
            envMapIntensity: 1,
        });

        // Reduce count by 30% for better performance
        const count = window.innerWidth < 768 ? 56 : 105;

        for (let i = 0; i < count; i++) {
            items.push({
                id: i,
                geometry: geometries[Math.floor(Math.random() * geometries.length)],
                material: material,
                position: [
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 50, // Increased vertical spread
                    (Math.random() - 0.5) * 15 - 5
                ],
                speed: Math.random() * 0.5 + 0.2
            });
        }
        return items;
    }, []);

    return (
        <>
            <fog attach="fog" args={['#050505', 10, 30]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

            <Stars radius={100} depth={50} count={15000} factor={4} saturation={0} fade speed={1} />

            {shapes.map((shape) => (
                <Geometry
                    key={shape.id}
                    {...shape}
                />
            ))}

            <Environment preset="city" />
        </>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 z-0 bg-[#050505]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                eventSource={document.body}
                eventPrefix="client"
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
