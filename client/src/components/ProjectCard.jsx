import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-surface backdrop-blur-md border border-white/10 p-6 hover:border-accent/50 transition-colors duration-300"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                <div className="h-40 mb-4 rounded-lg overflow-hidden bg-black/50">
                    {/* Placeholder for image if needed, or just a colored block */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-gray-700">
                        <span className="text-4xl font-bold opacity-20">{project.title[0]}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
