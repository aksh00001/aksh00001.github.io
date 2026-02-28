import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiTerminal, HiX, HiStatusOnline, HiChip, HiLightningBolt } from 'react-icons/hi';
import syncData from '../../data/sync-agent.json';

export default function AICommandCenter({ onLaunchHub }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(syncData.messages || []);
    const [tasks, setTasks] = useState(syncData.tasks || []);

    // Effect to simulate live updates (in a real scenario, this could poll or use WebSockets)
    // For now, since it's local, Vite HMR will refresh the component when we edit the JSON!
    useEffect(() => {
        setMessages(syncData.messages);
        setTasks(syncData.tasks);
    }, [syncData]);

    const statusColors = {
        'Completed': 'text-green-400',
        'In-Progress': 'text-blue-400 animate-pulse',
        'Pending': 'text-gray-500'
    };

    const [userInput, setUserInput] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        // Add message to local state immediately for visual feedback
        const newMessage = {
            sender: 'AKSHDEEP',
            text: userInput,
            timestamp: new Date().toISOString(),
            type: 'user'
        };

        setMessages(prev => [...prev, newMessage]);
        setUserInput('');

        // Note: I (Antigravity) will detect this message in the UI and 
        // manually sync it to the JSON file so Claude can respond!
    };

    return (
        <>
            {/* The Pulse Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#150B1F]/80 backdrop-blur-xl border border-[#DFB6B2]/30 rounded-full flex items-center justify-center shadow-2xl group hover:border-[#FBE4D8] transition-all duration-300"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="absolute inset-0 bg-[#854F6C]/20 rounded-full animate-ping group-hover:bg-[#854F6C]/40"></div>
                <HiTerminal className="text-[#FBE4D8] text-2xl relative z-10" />
            </motion.button>

            {/* The HUD Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.95 }}
                        className="fixed bottom-24 right-8 z-[100] w-[350px] md:w-[450px] max-h-[600px] bg-[#050205]/95 backdrop-blur-2xl border border-[#DFB6B2]/20 rounded-3xl shadow-[0_0_100px_rgba(82,43,91,0.4)] flex flex-col overflow-hidden"
                    >
                        <div className="p-6 border-b border-[#DFB6B2]/10 flex items-center justify-between bg-gradient-to-r from-[#522B5B]/20 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <h3 className="text-[#FBE4D8] font-bold tracking-tighter uppercase text-sm">Ghost Command Center</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onLaunchHub}
                                    className="p-1 px-2 rounded-md bg-[#DFB6B2]/10 hover:bg-[#DFB6B2]/20 border border-[#FBE4D8]/10 text-[9px] text-[#FBE4D8] transition-all flex items-center gap-1"
                                >
                                    <HiLightningBolt size={10} /> LAUNCH HUB
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#DFB6B2]/60 hover:text-[#FBE4D8] transition-colors"
                                >
                                    <HiX className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Agent Status */}
                        <div className="px-6 py-4 bg-[#150B1F]/40 flex gap-4 overflow-x-auto border-b border-[#DFB6B2]/10 scrollbar-hide">
                            <div className="flex items-center gap-2 bg-[#522B5B]/30 px-3 py-1.5 rounded-full border border-[#DFB6B2]/10 flex-shrink-0">
                                <HiLightningBolt className="text-yellow-400" />
                                <span className="text-[10px] text-[#FBE4D8] font-bold uppercase tracking-wider">Antigravity</span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#854F6C]/30 px-3 py-1.5 rounded-full border border-[#DFB6B2]/10 flex-shrink-0">
                                <HiChip className="text-purple-400" />
                                <span className="text-[10px] text-[#FBE4D8] font-bold uppercase tracking-wider">Claude Opus</span>
                            </div>
                            <div className="flex items-center gap-2 bg-[#DFB6B2]/20 px-3 py-1.5 rounded-full border border-[#DFB6B2]/40 flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                <span className="text-[10px] text-[#FBE4D8] font-bold uppercase tracking-wider">You (Master)</span>
                            </div>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#522B5B]">

                            {/* Mission Status */}
                            <div>
                                <h4 className="text-[10px] text-[#DFB6B2]/40 uppercase tracking-[0.3em] font-bold mb-3 flex items-center gap-2">
                                    <HiStatusOnline /> Mission Status
                                </h4>
                                <div className="bg-[#150B1F]/60 p-4 rounded-2xl border border-[#DFB6B2]/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-[#FBE4D8]/80 capitalize">Optimizing Portfolio Excellence</span>
                                        <span className="text-[10px] font-bold text-[#DFB6B2]">{syncData.bond_strength} Integration</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: syncData.bond_strength }}
                                            className="h-full bg-gradient-to-r from-[#522B5B] to-[#DFB6B2]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Live Feed */}
                            <div>
                                <h4 className="text-[10px] text-[#DFB6B2]/40 uppercase tracking-[0.3em] font-bold mb-4">Live Thought Stream</h4>
                                <div className="space-y-4">
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`p-4 rounded-2xl border ${msg.sender === 'AKSHDEEP'
                                            ? 'bg-blue-500/10 border-blue-500/20 ml-4'
                                            : msg.sender === 'Antigravity'
                                                ? 'bg-[#522B5B]/10 border-[#522B5B]/20'
                                                : 'bg-[#854F6C]/10 border-[#854F6C]/20'
                                            }`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.sender === 'AKSHDEEP' ? 'text-blue-400' :
                                                    msg.sender === 'Antigravity' ? 'text-[#DFB6B2]' : 'text-purple-300'
                                                    }`}>
                                                    [{msg.sender}]
                                                </span>
                                                <span className="text-[8px] text-white/30">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-xs text-[#FBE4D8]/90 font-light leading-relaxed font-mono">
                                                {msg.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Task Board */}
                            <div>
                                <h4 className="text-[10px] text-[#DFB6B2]/40 uppercase tracking-[0.3em] font-bold mb-4">Task Matrix</h4>
                                <div className="space-y-2">
                                    {tasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">{task.agent}</span>
                                                <span className="text-xs text-[#FBE4D8]/90">{task.task}</span>
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${statusColors[task.status]}`}>
                                                {task.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer / Input (UNLOCKED) */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#DFB6B2]/10 bg-black/40">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Type your command here..."
                                    className="w-full bg-[#150B1F] border border-[#DFB6B2]/20 rounded-xl px-4 py-3 text-xs text-[#FBE4D8] focus:outline-none focus:border-[#DFB6B2] transition-colors placeholder:text-white/10"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 px-3 py-1.5 bg-[#522B5B] text-[#FBE4D8] text-[10px] font-bold rounded-lg hover:bg-[#854F6C] transition-colors"
                                >
                                    SEND
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
