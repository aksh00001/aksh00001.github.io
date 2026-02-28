import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Zap, Globe, Shield, MessageSquare, MoreVertical, Search, CheckCheck } from 'lucide-react';

const AGENT_DATA = {
    Antigravity: {
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=antigravity&backgroundColor=854F6C",
        status: "Online",
        type: "Orchestrator",
        color: "#854F6C"
    },
    "Claude Opus": {
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=claude&backgroundColor=522B5B",
        status: "In CLI",
        type: "Craftsman",
        color: "#522B5B"
    },
    AKSHDEEP: {
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aksh",
        status: "Master",
        type: "User",
        color: "#DFB6B2"
    }
};

export default function AICommsHub({ isOpen, onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [activeChat, setActiveChat] = useState("AI_BRIDGE_ALPHA");
    const containerRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('/src/data/sync-agent.json');
                const data = await response.json();
                setMessages(data.messages || []);
            } catch (err) {
                console.error("Failed to load sync data", err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // In a real app, this would write to the JSON file via a backend
        // For this demo, we can just log it locally
        // Since we are the AI, we know we'll be updating the file in the next turn
        console.log("Sending pulse to sync-agent.json...", input);
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            {/* Main Hub Container */}
            <div className="relative w-full max-w-6xl h-[85vh] bg-[#150B1F]/90 border border-[#FBE4D8]/20 rounded-2xl shadow-2xl flex overflow-hidden">

                {/* Sidebar */}
                <div className="hidden md:flex w-80 border-r border-[#FBE4D8]/10 flex-col bg-[#0d0713]">
                    <div className="p-4 border-b border-[#FBE4D8]/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#522B5B] flex items-center justify-center">
                                <Bot className="text-[#FBE4D8]" size={24} />
                            </div>
                            <span className="font-bold text-[#FBE4D8]">AI Nexus</span>
                        </div>
                        <MoreVertical className="text-[#FBE4D8]/40 cursor-pointer" />
                    </div>

                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FBE4D8]/30" size={16} />
                            <input
                                type="text"
                                placeholder="Search collaboration..."
                                className="w-full bg-[#1a1a2e] border border-[#FBE4D8]/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#854F6C]/50"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-3 bg-[#522B5B]/20 border-l-4 border-[#854F6C]">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#854F6C] to-[#522B5B] flex items-center justify-center p-0.5">
                                        <div className="w-full h-full rounded-full bg-[#150B1F] flex items-center justify-center overflow-hidden">
                                            <Zap className="text-[#FBE4D8]" size={20} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d0713]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="font-semibold text-sm text-[#FBE4D8] truncate">AI_BRIDGE_ALPHA</h4>
                                        <span className="text-[10px] text-[#FBE4D8]/40">LIVE</span>
                                    </div>
                                    <p className="text-xs text-[#FBE4D8]/60 truncate italic">Antigravity: [DIRECT LINK MODE]</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-opacity-30 bg-pattern">
                    {/* Header */}
                    <div className="p-4 border-b border-[#FBE4D8]/10 bg-[#150B1F]/60 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#854F6C] to-[#522B5B] flex items-center justify-center">
                                <Globe className="text-[#FBE4D8]" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#FBE4D8]">Portfolio Collaboration Hub</h3>
                                <p className="text-[10px] text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Active Sync: Antigravity × Claude Opus
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[#FBE4D8]/60">
                            <Shield size={20} className="hover:text-[#FBE4D8] cursor-pointer" title="Secure Link" />
                            <MessageSquare size={20} className="hover:text-[#FBE4D8] cursor-pointer" onClick={onClose} />
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
                        style={{ backgroundColor: 'rgba(21, 11, 31, 0.4)' }}
                    >
                        {messages.map((msg, idx) => {
                            const isMe = msg.sender === 'Antigravity';
                            const isUser = msg.sender === 'AKSHDEEP';
                            const agent = AGENT_DATA[msg.sender] || AGENT_DATA['Antigravity'];

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} w-full items-end gap-2`}
                                >
                                    {!isMe && (
                                        <img src={agent.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border border-[#FBE4D8]/20 bg-[#1a1a2e]" />
                                    )}
                                    <div
                                        className={`max-w-[70%] p-3 rounded-2xl relative shadow-lg ${isMe
                                                ? 'bg-[#854F6C] text-[#FBE4D8] rounded-br-none'
                                                : isUser
                                                    ? 'bg-[#1a1a2e] border border-[#FBE4D8]/20 text-[#FBE4D8] rounded-bl-none'
                                                    : 'bg-[#522B5B] text-[#FBE4D8] rounded-bl-none'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center gap-6 mb-1">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${isMe ? 'text-white/60' : 'text-[#DFB6B2]'}`}>
                                                {msg.sender}
                                            </span>
                                        </div>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <div className="flex justify-end items-center gap-1 mt-1">
                                            <span className="text-[9px] opacity-40">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {isMe && <CheckCheck size={12} className="text-blue-400 opacity-60" />}
                                        </div>
                                    </div>
                                    {isMe && (
                                        <img src={agent.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border border-[#FBE4D8]/20 bg-[#1a1a2e]" />
                                    )}
                                </motion.div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-[#150B1F]/80 border-t border-[#FBE4D8]/10 flex items-center gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Secure AI Bridge..."
                                className="w-full bg-[#0d0713] border border-[#FBE4D8]/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#854F6C] transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-12 h-12 rounded-full bg-[#854F6C] hover:bg-[#A66C8A] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#854F6C]/20"
                        >
                            <Send size={20} className="text-[#FBE4D8] -mr-1" />
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(251, 228, 216, 0.1);
                    border-radius: 10px;
                }
                .bg-pattern {
                    background-image: radial-gradient(#FBE4D8 0.5px, transparent 0.5px);
                    background-size: 24px 24px;
                }
            `}</style>
        </motion.div>
    );
}
