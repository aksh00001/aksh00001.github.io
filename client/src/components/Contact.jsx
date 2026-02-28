import React, { useState, useRef, useCallback, useEffect } from 'react';

const TRIAGE_OPTIONS = [
    { id: 'design', label: 'Design Emergency', icon: '◆', desc: 'UI/UX, Branding, Visual Identity' },
    { id: 'development', label: 'Development Need', icon: '⬡', desc: 'Web Apps, Cloud, Systems' },
    { id: 'collab', label: 'Collaboration', icon: '◎', desc: 'Partnership, Open Source, Freelance' },
];

function useTerminalLog() {
    const [logs, setLogs] = useState([
        { type: 'SYSTEM', text: 'Dispatch console online. Awaiting operator input.', ts: Date.now() }
    ]);
    const scrollContainerRef = useRef(null);

    const addLog = useCallback((type, text) => {
        setLogs(prev => [...prev.slice(-14), { type, text, ts: Date.now() }]);
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return { logs, addLog, scrollContainerRef };
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const LOG_COLORS = {
    SYSTEM: 'text-[#522B5B]',
    INTEL: 'text-[#854F6C]',
    VALID: 'text-[#4ade80]',
    WARN: 'text-[#f59e0b]',
    ERROR: 'text-[#ef4444]',
    TRIAGE: 'text-[#DFB6B2]',
    SUCCESS: 'text-[#4ade80]',
};

// MISSION CONTROL: Paste your Zapier Webhook URL here to link to Gmail
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26622315/u0itvmp/';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', triage: '' });
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const { logs, addLog, scrollContainerRef } = useTerminalLog();
    const debounceRef = useRef({});

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));

        clearTimeout(debounceRef.current[field]);
        debounceRef.current[field] = setTimeout(() => {
            if (field === 'name' && value.length > 1) {
                addLog('INTEL', `Operator identified: ${value}`);
            }
            if (field === 'email' && value.length > 3) {
                if (validateEmail(value)) {
                    addLog('VALID', `Secure channel confirmed: ${value}`);
                } else {
                    addLog('WARN', 'Channel frequency invalid. Check format.');
                }
            }
            if (field === 'message' && value.length > 20) {
                addLog('SYSTEM', `Payload buffer: ${value.length} chars loaded.`);
            }
        }, 600);
    };

    const handleTriageSelect = (id) => {
        setForm(prev => ({ ...prev, triage: id }));
        setErrors(prev => ({ ...prev, triage: '' }));
        const option = TRIAGE_OPTIONS.find(o => o.id === id);
        addLog('TRIAGE', `Priority classified: ${option.label}`);
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Operator name required';
        if (!form.email.trim()) e.email = 'Channel frequency required';
        else if (!validateEmail(form.email)) e.email = 'Invalid channel format';
        if (!form.triage) e.triage = 'Select mission triage';
        if (!form.message.trim()) e.message = 'Transmission payload empty';
        else if (form.message.trim().length < 10) e.message = 'Minimum 10 chars for payload';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            addLog('ERROR', `Dispatch blocked: ${Object.keys(validationErrors).length} field(s) require attention.`);
            return;
        }

        setSending(true);
        addLog('SYSTEM', 'Encrypting transmission payload...');
        await new Promise(r => setTimeout(r, 600));

        addLog('INTEL', 'Establishing Zapier Uplink...');

        try {
            if (!ZAPIER_WEBHOOK_URL) {
                throw new Error('NO_UPLINK_URL');
            }

            const triageLabel = TRIAGE_OPTIONS.find(o => o.id === form.triage)?.label || '';

            // Background Dispatch to Zapier
            const response = await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // Standard for Zapier hooks
                body: JSON.stringify({
                    ...form,
                    triageLabel,
                    timestamp: new Date().toISOString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            addLog('SYSTEM', 'Routing through Gmail Relay...');
            await new Promise(r => setTimeout(r, 1000));
            addLog('SUCCESS', 'Transmission Dispatched to Akshdeep\'s Inbox.');

            setSent(true);
        } catch (error) {
            if (error.message === 'NO_UPLINK_URL') {
                addLog('WARN', 'External Uplink not configured. Falling back to local Mailto protocol...');

                const triageLabel = TRIAGE_OPTIONS.find(o => o.id === form.triage)?.label || '';
                const subject = encodeURIComponent(`[${triageLabel}] from ${form.name}`);
                const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nTriage: ${triageLabel}\n\nMessage:\n${form.message}`);
                window.open(`mailto:hello@aksh21h.me?subject=${subject}&body=${body}`, '_self');

                addLog('SUCCESS', 'Local Relay triggered.');
                setSent(true);
            } else {
                addLog('ERROR', 'Transmission Interrupted. Connection unstable.');
            }
        } finally {
            setSending(false);
            setTimeout(() => {
                if (sent) {
                    setSent(false);
                    setForm({ name: '', email: '', message: '', triage: '' });
                    addLog('SYSTEM', 'Terminal reset. Ready for next mission.');
                }
            }, 4000);
        }
    };

    const inputClass = (field) =>
        `w-full bg-[#150B1F]/40 border ${errors[field] ? 'border-[#ef4444]/40' : 'border-[#FBE4D8]/5'} rounded-xl px-5 py-3.5 text-[#FBE4D8] text-sm font-mono placeholder-[#FBE4D8]/15 focus:outline-none focus:border-[#DFB6B2]/30 focus:bg-[#150B1F]/60 transition-all duration-300`;

    return (
        <section id="contact" className="contact-section relative z-10 min-h-screen py-32 px-4 md:px-16 bg-[#050205] overflow-hidden">
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#FBE4D8 1px, transparent 1px), linear-gradient(90deg, #FBE4D8 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
            </div>

            {/* Ambient Pulse Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#854F6C]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[#DFB6B2] font-mono text-sm tracking-[0.3em] uppercase">
                            <span className="w-2 h-2 rounded-full bg-[#DFB6B2] animate-ping"></span>
                            Uplink Status: Ready
                        </div>
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#FBE4D8] tracking-tighter">
                            GET_IN_TOUCH
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-[#FBE4D8]/20 font-mono text-[10px] leading-tight uppercase tracking-widest">
                            Coord: 40.7128° N, 74.0060° W<br />
                            Protocol: Secure_Handshake_v4.2<br />
                            Encryption: AES_256_GHOST
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Panel: Discovery & Socials */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="p-8 rounded-3xl border border-[#FBE4D8]/10 bg-[#FBE4D8]/[0.02] backdrop-blur-xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#FBE4D8]">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>

                            <h4 className="text-[#DFB6B2] text-xs font-mono uppercase tracking-[0.4em] mb-6">Channel_Secure</h4>
                            <p className="text-[#FBE4D8]/80 text-xl md:text-2xl leading-relaxed mb-8">
                                Reporting a design emergency? Or just want to discuss the next big thing? My sensors are always active.
                            </p>

                            <a href="mailto:hello@aksh21h.me" className="inline-block text-2xl md:text-3xl font-light text-[#FBE4D8] hover:text-[#DFB6B2] transition-colors duration-300 break-all underline decoration-[#DFB6B2]/20 underline-offset-8">
                                hello@aksh21h.me
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'GitHub', url: 'https://github.com/aksh00001' },
                                { name: 'LinkedIn', url: 'https://linkedin.com/in/akshdeep-singh-6b3534241' },
                                { name: 'Twitter', url: 'https://twitter.com/aksh21h' },
                                { name: 'Instagram', url: 'https://instagram.com/aksh21h' }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-6 rounded-2xl border border-[#FBE4D8]/5 bg-[#FBE4D8]/[0.01] hover:bg-[#FBE4D8]/[0.05] hover:border-[#DFB6B2]/30 transition-all duration-300 group"
                                >
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FBE4D8]/30 group-hover:text-[#DFB6B2] block mb-2 transition-colors">External_Link</span>
                                    <span className="text-[#FBE4D8] font-bold tracking-wider">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Command Input Form */}
                    <div className="lg:col-span-7">
                        <div className="relative p-1 rounded-3xl bg-gradient-to-br from-[#FBE4D8]/10 to-transparent">
                            <div className="bg-[#050205] rounded-[22px] p-8 md:p-12">
                                <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#FBE4D8]/5">
                                    <span className="text-xs font-mono text-[#DFB6B2] tracking-[0.2em] uppercase">Dispatch_Mission_Console</span>
                                    <span className="text-xs font-mono text-[#FBE4D8]/20 uppercase">v1.2.0_Stable</span>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[9px] font-mono tracking-[0.4em] text-[#FBE4D8]/30 uppercase mb-2">Operator_Name</label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={e => handleChange('name', e.target.value)}
                                                placeholder="Your callsign"
                                                className={inputClass('name')}
                                            />
                                            {errors.name && <p className="text-[#ef4444] text-[10px] font-mono mt-1.5">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-mono tracking-[0.4em] text-[#FBE4D8]/30 uppercase mb-2">Channel_Frequency</label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={e => handleChange('email', e.target.value)}
                                                placeholder="your@email.com"
                                                className={inputClass('email')}
                                            />
                                            {errors.email && <p className="text-[#ef4444] text-[10px] font-mono mt-1.5">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Suffering Triage Selector */}
                                    <div>
                                        <label className="block text-[9px] font-mono tracking-[0.4em] text-[#FBE4D8]/30 uppercase mb-3">Suffering_Triage</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {TRIAGE_OPTIONS.map(option => (
                                                <button
                                                    key={option.id}
                                                    type="button"
                                                    onClick={() => handleTriageSelect(option.id)}
                                                    className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${form.triage === option.id
                                                        ? 'border-[#DFB6B2]/30 bg-[#DFB6B2]/[0.05] shadow-[0_0_25px_rgba(223,182,178,0.08)]'
                                                        : 'border-[#FBE4D8]/5 bg-[#150B1F]/20 hover:border-[#FBE4D8]/10 hover:bg-[#150B1F]/40'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2.5 mb-1.5">
                                                        <span className={`text-base ${form.triage === option.id ? 'text-[#DFB6B2]' : 'text-[#FBE4D8]/20'} transition-colors`}>
                                                            {option.icon}
                                                        </span>
                                                        <span className={`text-[11px] font-mono font-bold tracking-wider ${form.triage === option.id ? 'text-[#FBE4D8]' : 'text-[#FBE4D8]/40'} transition-colors`}>
                                                            {option.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] font-mono text-[#FBE4D8]/15 tracking-wide">{option.desc}</p>
                                                    {form.triage === option.id && (
                                                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#DFB6B2] shadow-[0_0_8px_rgba(223,182,178,0.6)]"></div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.triage && <p className="text-[#ef4444] text-[10px] font-mono mt-2">{errors.triage}</p>}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-[9px] font-mono tracking-[0.4em] text-[#FBE4D8]/30 uppercase mb-2">Transmission_Payload</label>
                                        <textarea
                                            value={form.message}
                                            onChange={e => handleChange('message', e.target.value)}
                                            placeholder="Describe your mission parameters..."
                                            rows={5}
                                            className={`${inputClass('message')} resize-none`}
                                        />
                                        <div className="flex justify-between mt-1.5">
                                            {errors.message ? <p className="text-[#ef4444] text-[10px] font-mono">{errors.message}</p> : <span />}
                                            <span className="text-[10px] font-mono text-[#FBE4D8]/10">{form.message.length} chars</span>
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className={`w-full py-4 rounded-xl font-mono font-bold text-sm tracking-[0.3em] uppercase transition-all duration-500 border ${sent
                                            ? 'bg-[#4ade80]/5 border-[#4ade80]/20 text-[#4ade80]'
                                            : sending
                                                ? 'bg-[#150B1F]/30 border-[#FBE4D8]/5 text-[#FBE4D8]/30 cursor-wait'
                                                : 'bg-[#150B1F]/40 border-[#DFB6B2]/15 text-[#DFB6B2] hover:border-[#DFB6B2]/40 hover:bg-[#DFB6B2]/[0.05] hover:shadow-[0_0_40px_rgba(223,182,178,0.06)]'
                                            }`}
                                    >
                                        {sent ? '/// Transmission Sent' : sending ? '/// Dispatching...' : '/// Dispatch Mission'}
                                    </button>
                                </form>

                                {/* Ghost Terminal Log */}
                                <div className="mt-8 pt-6 border-t border-[#FBE4D8]/5">
                                    <div className="text-[9px] font-mono tracking-[0.4em] text-[#FBE4D8]/20 uppercase mb-3">Ghost_Terminal_Feed</div>
                                    <div ref={scrollContainerRef} className="bg-[#0a0510]/60 border border-[#FBE4D8]/[0.03] rounded-xl p-4 font-mono text-[11px] leading-[1.8] overflow-y-auto max-h-[200px] min-h-[120px]">
                                        {logs.map((log, i) => (
                                            <div key={log.ts + i} className="flex gap-2">
                                                <span className="text-[#FBE4D8]/10 shrink-0 select-none">
                                                    {new Date(log.ts).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                </span>
                                                <span className={`${LOG_COLORS[log.type] || 'text-[#522B5B]'} shrink-0`}>
                                                    [{log.type}]
                                                </span>
                                                <span className="text-[#FBE4D8]/30">{log.text}</span>
                                            </div>
                                        ))}
                                        <span className="inline-block w-1.5 h-3 bg-[#DFB6B2]/30 animate-pulse ml-1 mt-1"></span>
                                    </div>
                                </div>
                            </div>

                            {/* Industrial Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#DFB6B2]/40 rounded-tl-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#DFB6B2]/40 rounded-br-3xl"></div>
                        </div>
                    </div>
                </div>

                <footer className="mt-32 pt-12 border-t border-[#FBE4D8]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#FBE4D8]/20 tracking-widest uppercase">
                    <p>&copy; 2026 Akshdeep Singh // Autonomous Collaboration Nexus</p>
                    <div className="flex gap-8">
                        <span>Latency: 24ms</span>
                        <span>Uptime: 99.98%</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}
