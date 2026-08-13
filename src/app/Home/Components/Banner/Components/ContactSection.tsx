"use client";

import React, { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const CONTACT_ITEMS = [
    {
        icon: Mail,
        label: "Email",
        value: "infanjiounrahman20606@gmail.com",
        accent: "purple",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+880 1610240096",
        accent: "emerald",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Chattogram, Bangladesh",
        accent: "rose",
    },
] as const;

const ACCENT_STYLES: Record<
    string,
    { cardBorder: string; shadow: string; iconBg: string; iconText: string }
> = {
    purple: {
        cardBorder: "border-purple-500/50 hover:border-purple-400",
        shadow: "shadow-[4px_4px_0px_0px_#a855f7]",
        iconBg: "bg-slate-950 border-2 border-purple-500/50 text-purple-400",
        iconText: "text-purple-400",
    },
    emerald: {
        cardBorder: "border-emerald-500/50 hover:border-emerald-400",
        shadow: "shadow-[4px_4px_0px_0px_#10b981]",
        iconBg: "bg-slate-950 border-2 border-emerald-500/50 text-emerald-400",
        iconText: "text-emerald-400",
    },
    rose: {
        cardBorder: "border-rose-500/50 hover:border-rose-400",
        shadow: "shadow-[4px_4px_0px_0px_#f43f5e]",
        iconBg: "bg-slate-950 border-2 border-rose-500/50 text-rose-400",
        iconText: "text-rose-400",
    },
};

const ContactSection = ({
    formRef,
    loading,
}: {
    formRef: any;
    loading: boolean;
}) => {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!form.current) return;

        try {
            await emailjs.sendForm(
                "service_34ob7qt",
                "template_2rj1a7j",
                form.current,
                { publicKey: "LD3EefzuvWY-avuiH" }
            );
            toast.success("Message sent successfully! I'll get back to you soon.", {
                position: "top-center",
                duration: 4000,
            });
            form.current?.reset();
        } catch (error) {
            toast.error("Failed to send message. Please try again.", {
                position: "top-center",
            });
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    if (loading) {
        return (
            <section ref={formRef} id="contact" className="py-20 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-64 mx-auto mb-4 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                        <Skeleton className="h-6 w-96 mx-auto rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Skeleton className="h-[450px] lg:col-span-2 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                        <div className="space-y-6">
                            <Skeleton className="h-28 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                            <Skeleton className="h-28 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                            <Skeleton className="h-28 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={formRef} id="contact" className="py-24 relative z-10 bg-transparent">
            {/* Background Glow */}
            <div className="absolute right-10 bottom-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                        LET'S WORK <span className="text-purple-400">TOGETHER</span>
                    </h2>
                    {/* Cyber Divider */}
                    <div className="relative w-48 mx-auto my-4">
                        <div className="w-full border-t-2 border-purple-500/40" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rotate-45 shadow-[0_0_8px_#a855f7]" />
                    </div>
                    <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-2xl mx-auto tracking-wide uppercase">
                        Ready to bring your ideas to life? Let's discuss your project and create something amazing.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Card */}
                    <Card className="lg:col-span-2 relative overflow-hidden rounded-none border-2 border-purple-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[6px_6px_0px_0px_#a855f7] transition-all duration-300 hover:border-purple-400 hover:shadow-[8px_8px_0px_0px_#c084fc]">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 shadow-[0_0_10px_#a855f7]" />

                        <CardHeader className="pb-4 relative z-10">
                            <CardTitle className="flex items-center gap-2.5 text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                                <span className="h-3 w-3 rounded-none bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                                Send a Message
                            </CardTitle>
                            <CardDescription className="text-slate-400 font-mono text-xs pl-5 uppercase">
                                Fill out the form and I'll get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="relative z-10">
                            <form ref={form} onSubmit={sendEmail} className="space-y-5 font-mono">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="user_name" className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                                            Full Name <span className="text-purple-400">*</span>
                                        </Label>
                                        <Input
                                            id="user_name"
                                            name="user_name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            className="rounded-none border-2 border-purple-500/30 bg-slate-950 text-white placeholder:text-slate-600 focus-visible:ring-0 focus-visible:border-purple-400 focus-visible:shadow-[3px_3px_0px_0px_#a855f7] transition-all duration-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="user_email" className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                                            Email Address <span className="text-purple-400">*</span>
                                        </Label>
                                        <Input
                                            id="user_email"
                                            name="user_email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            className="rounded-none border-2 border-purple-500/30 bg-slate-950 text-white placeholder:text-slate-600 focus-visible:ring-0 focus-visible:border-purple-400 focus-visible:shadow-[3px_3px_0px_0px_#a855f7] transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                                        Your Message <span className="text-purple-400">*</span>
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project, timeline, and budget..."
                                        required
                                        className="min-h-[140px] rounded-none border-2 border-purple-500/30 bg-slate-950 text-white placeholder:text-slate-600 focus-visible:ring-0 focus-visible:border-purple-400 focus-visible:shadow-[3px_3px_0px_0px_#a855f7] transition-all duration-200 resize-none"
                                    />
                                </div>

                                {/* Cyber Neo-Brutalist Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-4 py-3 rounded-none text-purple-300 text-xs font-black tracking-widest uppercase transition-all duration-200 hover:border-purple-400 hover:text-white hover:shadow-[5px_5px_0px_0px_#c084fc] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                                            <span>SENDING MESSAGE...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <Send className="w-4 h-4" />
                                            <span>SEND MESSAGE</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Details Card */}
                    <Card className="relative overflow-hidden rounded-none border-2 border-purple-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[6px_6px_0px_0px_#a855f7] transition-all duration-300 hover:border-purple-400 hover:shadow-[8px_8px_0px_0px_#c084fc]">
                        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 shadow-[0_0_10px_#a855f7]" />

                        <CardHeader className="relative z-10">
                            <CardTitle className="flex items-center gap-2.5 text-xl font-black uppercase tracking-wider text-white">
                                <span className="h-3 w-3 rounded-none bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                Contact Details
                            </CardTitle>
                            <CardDescription className="text-slate-400 font-mono text-xs pl-5 uppercase">
                                Get in touch through any of these channels
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="relative z-10 space-y-4">
                            {CONTACT_ITEMS.map(({ icon: Icon, label, value, accent }) => {
                                const a = ACCENT_STYLES[accent];
                                return (
                                    <div
                                        key={label}
                                        className={`group flex items-center gap-4 p-4 rounded-none border-2 bg-slate-950 backdrop-blur-md transition-all duration-300 ${a.cardBorder} ${a.shadow}`}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-12 h-12 rounded-none flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${a.iconBg}`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0 font-mono">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
                                            <p className="text-xs text-white font-bold break-all tracking-tight">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;