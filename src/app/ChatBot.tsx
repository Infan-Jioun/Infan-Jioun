"use client";

import {
    MessageCircle, X, Send, Rocket, Home, Hamburger,
    AlertCircle, Globe, ShoppingCart, Settings, Monitor,
    Database, Briefcase, Mail, FileText, Github,
    ChevronLeft, ChevronRight, GraduationCap,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type Message = {
    role: "user" | "assistant";
    content: string;
};

type Suggestion = {
    label: string;
    query: string;
    icon: ReactNode;
};

const ALL_SUGGESTIONS: Suggestion[] = [
    { icon: <Rocket size={12} />, label: "All Projects", query: "Show all your projects with live links" },
    { icon: <GraduationCap size={12} />, label: "Education", query: "Tell me about your education background" },
    { icon: <Home size={12} />, label: "Nestify", query: "Tell me about your Nestify real estate project" },
    { icon: <Hamburger size={12} />, label: "FoodHub", query: "Tell me about your FoodHub food delivery project" },
    { icon: <AlertCircle size={12} />, label: "Helps Near", query: "Tell me about your Helps Near emergency platform" },
    { icon: <Globe size={12} />, label: "ISP Platform", query: "Tell me about your Fastbit Communication ISP project" },
    { icon: <ShoppingCart size={12} />, label: "ShoppingGO", query: "Tell me about your ShoppingGO e-commerce project" },
    { icon: <Settings size={12} />, label: "Tech Stack", query: "What tech stack do you use?" },
    { icon: <Monitor size={12} />, label: "Frontend Skills", query: "What are your frontend skills?" },
    { icon: <Database size={12} />, label: "Backend Skills", query: "What are your backend and database skills?" },
    { icon: <Briefcase size={12} />, label: "Available for Hire?", query: "Are you available for hire?" },
    { icon: <Mail size={12} />, label: "Contact Info", query: "How can I contact you?" },
    { icon: <FileText size={12} />, label: "Certificate", query: "Show me your Programming Hero certificate" },
    { icon: <Github size={12} />, label: "GitHub", query: "Show me your GitHub profile or project repos" },
];

const CHIPS_PER_PAGE = 3;

// ── Link parser ──
function renderMessage(text: string): ReactNode[] {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts: string[] = text.split(urlRegex);

    return parts.map((part, i): ReactNode => {
        if (/^https?:\/\/[^\s]+$/.test(part)) {
            const cleanUrl = part.replace(/[.,)\]'"!?]+$/, "");

            return (
                <Link
                    key={i}
                    href={cleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-purple-300 hover:text-purple-100 transition-colors duration-150 break-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {cleanUrl}
                </Link>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi, I'm Infan AI! Ask me about my projects, skills, or hiring — or pick a suggestion below." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
    const [suggPage, setSuggPage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const chatWinRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const ring1Ref = useRef<HTMLSpanElement>(null);
    const ring2Ref = useRef<HTMLSpanElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const visibleSuggestions = ALL_SUGGESTIONS.filter((s) => !usedSuggestions.has(s.label));
    const totalPages = Math.ceil(visibleSuggestions.length / CHIPS_PER_PAGE);
    const currentChips = visibleSuggestions.slice(suggPage * CHIPS_PER_PAGE, (suggPage + 1) * CHIPS_PER_PAGE);

    useEffect(() => {
        if (isHovered || totalPages <= 1) return;

        const interval = setInterval(() => {
            setSuggPage((prev) => (prev + 1) % totalPages);
        }, 3500);
        return () => clearInterval(interval);
    }, [isHovered, totalPages]);

    const goPage = (dir: 1 | -1) => {
        const next = suggPage + dir;
        if (next < 0 || next >= totalPages) return;
        if (sliderRef.current) {
            gsap.fromTo(sliderRef.current,
                { opacity: 0, x: dir * 24 },
                { opacity: 1, x: 0, duration: 0.22, ease: "power2.out" }
            );
        }
        setSuggPage(next);
    };

    useEffect(() => { setSuggPage(0); }, [usedSuggestions]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        tl.fromTo(btnRef.current,
            { scale: 0, rotate: -180, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.7, ease: "back.out(2)" }
        );
        tl.fromTo(labelRef.current,
            { opacity: 0, y: 12, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
            "-=0.25"
        );
        [ring1Ref.current, ring2Ref.current].forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(el,
                { scale: 1, opacity: 0.4 },
                { scale: 2.4, opacity: 0, duration: 1.8, repeat: -1, ease: "power2.out", delay: i * 0.7 }
            );
        });
    }, []);

    useEffect(() => {
        if (!chatWinRef.current || !isOpen) return;
        gsap.fromTo(chatWinRef.current,
            { opacity: 0, y: 32, scale: 0.88, transformOrigin: "bottom right" },
            { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.5)" }
        );
    }, [isOpen]);

    useEffect(() => {
        document.querySelectorAll(".chat-bubble:not(.animated)").forEach((el) => {
            el.classList.add("animated");
            gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
        });
    }, [messages]);

    const onBtnHover = () => {
        if (!iconRef.current) return;
        gsap.fromTo(iconRef.current,
            { rotate: -18 },
            { rotate: 18, duration: 0.13, yoyo: true, repeat: 3, ease: "power1.inOut" }
        );
    };

    const toggleChat = () => {
        gsap.to(btnRef.current, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 });
        setIsOpen((p) => !p);
    };

    const sendMessage = async (text?: string) => {
        const content = (text ?? input).trim();
        if (!content || loading) return;
        const userMsg: Message = { role: "user", content };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updated }),
            });
            const data = await res.json();
            setMessages([...updated, { role: "assistant", content: data.message }]);
        } catch {
            setMessages([...updated, { role: "assistant", content: "Something went wrong. Try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestion = (s: Suggestion) => {
        setUsedSuggestions((prev) => new Set(prev).add(s.label));
        sendMessage(s.query);
    };

    return (
        <>
            <style>{`
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 12px 2px rgba(139,92,246,0.45); }
                    50%       { box-shadow: 0 0 22px 6px rgba(139,92,246,0.7); }
                }
            `}</style>

            {/* ── FAB area ── */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2.5">
                {!isOpen && (
                    <div
                        ref={labelRef}
                        className="inline-flex items-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-4 py-1.5 rounded-none text-purple-300 text-xs font-black tracking-widest uppercase select-none pointer-events-none"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        ✦ Infan AI Assistant
                    </div>
                )}

                <div className="relative flex items-center justify-center">
                    <span ref={ring1Ref} className="absolute inset-0 rounded-full bg-purple-500 pointer-events-none" style={{ transformOrigin: "center" }} />
                    <span ref={ring2Ref} className="absolute inset-0 rounded-full bg-indigo-400 pointer-events-none" style={{ transformOrigin: "center" }} />
                    <span
                        className="absolute inset-[-4px] rounded-full pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
                            animation: "glow-pulse 2.5s ease-in-out infinite",
                        }}
                    />
                    <button
                        ref={btnRef}
                        onClick={toggleChat}
                        onMouseEnter={onBtnHover}
                        className="relative z-10 text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                            boxShadow: "0 8px 28px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                        aria-label="Open chat"
                    >
                        <div ref={iconRef}>
                            {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
                        </div>
                    </button>
                </div>
            </div>

            {/* ── Chat Window ── */}
            {isOpen && (
                <div
                    ref={chatWinRef}
                    className="fixed bottom-24 right-6 w-[340px] h-[520px] bg-[#0f0f1a]/95 backdrop-blur-2xl border border-white/10 text-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-700 to-blue-700 px-4 py-3 flex items-center gap-3 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">AI</div>
                        <div>
                            <p className="font-semibold text-sm leading-none">Infan AI Assistant</p>
                            <p className="text-[11px] opacity-70 mt-0.5">Portfolio · Projects · Hire Me</p>
                        </div>
                        <span className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                    </div>

                    {/* Suggestions Slider */}
                    {visibleSuggestions.length > 0 && (
                        <div
                            className="px-3 pt-2.5 pb-2 border-b border-white/10 shrink-0 select-none"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Header Label */}
                            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                                Suggestions
                            </p>

                            {/* Slider Container with Left & Right Arrows */}
                            <div className="flex items-center gap-2">
                                {/* Left Arrow Button */}
                                <button
                                    onClick={() => goPage(-1)}
                                    disabled={suggPage === 0}
                                    className="w-6 h-6 shrink-0 rounded-full bg-slate-900/60 hover:bg-purple-600 text-white disabled:opacity-20 disabled:hover:bg-slate-900/60 flex items-center justify-center transition-all duration-200 active:scale-90"
                                    aria-label="Previous suggestions"
                                >
                                    <ChevronLeft size={12} />
                                </button>

                                {/* Suggestions Track */}
                                <div ref={sliderRef} className="flex-1 flex items-center gap-2 overflow-hidden">
                                    {currentChips.map((s) => (
                                        <button
                                            key={s.label}
                                            onClick={() => handleSuggestion(s)}
                                            className="flex-1 flex items-center justify-center gap-1.5 text-[11px] bg-slate-900/60 hover:bg-purple-600/90 text-white/90 hover:text-white px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap border border-white/5"
                                        >
                                            {s.icon}
                                            <span className="truncate">{s.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Right Arrow Button */}
                                <button
                                    onClick={() => goPage(1)}
                                    disabled={suggPage >= totalPages - 1}
                                    className="w-6 h-6 shrink-0 rounded-full bg-slate-900/60 hover:bg-purple-600 text-white disabled:opacity-20 disabled:hover:bg-slate-900/60 flex items-center justify-center transition-all duration-200 active:scale-90"
                                    aria-label="Next suggestions"
                                >
                                    <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Messages */}
                    <div
                        className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-2"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-bubble flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "assistant" && (
                                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold mr-1.5 mt-1 shrink-0">AI</div>
                                )}
                                <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-purple-500 text-white rounded-br-sm" : "bg-slate-900/60 text-white rounded-bl-sm"}`}>
                                    {renderMessage(msg.content)}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-bubble flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold mr-1.5 mt-1 shrink-0">AI</div>
                                <div className="bg-slate-900/60 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="px-3 py-3 border-t border-white/10 flex gap-2 shrink-0">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                            placeholder="Type your message..."
                            disabled={loading}
                            className="flex-1 bg-slate-900/60 border border-white/15 text-white placeholder-white/30 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-400 focus:bg-white/15 transition-all duration-200 disabled:opacity-50"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={loading || !input.trim()}
                            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all duration-200 active:scale-95"
                            aria-label="Send"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}