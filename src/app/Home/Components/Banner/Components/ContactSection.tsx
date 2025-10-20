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
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

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
            <section
                ref={formRef}
                id="contact"
                className="py-20 backdrop-blur-2xl bg-transparent"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <Skeleton className="h-12 w-64 mx-auto mb-4" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Skeleton className="h-96 lg:col-span-2 rounded-2xl" />
                        <div className="space-y-6">
                            <Skeleton className="h-32 rounded-2xl" />
                            <Skeleton className="h-32 rounded-2xl" />
                            <Skeleton className="h-32 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={formRef}
            id="contact"
            className="py-20 bg-transparent backdrop-blur-2xl"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase mb-6 drop-shadow-lg">
                        Let's Work Together
                    </h2>
                    <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
                        Ready to bring your ideas to life? Let's discuss your project and
                        create something amazing.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Contact Form */}
                    <Card className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-bold text-white">
                                Send a Message
                            </CardTitle>
                            <CardDescription className="text-white text-lg">
                                Fill out the form and I'll get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={form} onSubmit={sendEmail} className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="user_name" className="text-white">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="user_name"
                                            name="user_name"
                                            type="text"
                                            placeholder="Your full name"
                                            required
                                            className=" text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="user_email" className="text-white">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="user_email"
                                            name="user_email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            required
                                            className="text-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-white">
                                        Your Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell me about your project, timeline, and budget..."
                                        required
                                        className="min-h-[150px] text-white"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Sending Message...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info Section */}
                    <div className="space-y-8.5">
                        <Card className="bg-white/5 border border-white/10 backdrop-blur-2xl shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-white">
                                    Contact Details
                                </CardTitle>
                                <CardDescription className="text-white">
                                    Get in touch through any of these channels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8.5">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10">
                                    <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">Email</p>
                                        <p className="text-white text-[9px] lg:text-[12px] font-bold">
                                            infanjiounrahman20606@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10">
                                    <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full">
                                        <Phone className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">Phone</p>
                                        <p className="text-[9px] lg:text-[12px] text-white font-semibold">+880 1610240096</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/10 border border-white/10">
                                    <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">Location</p>
                                        <p className="text-white text-[9px] lg:text-[12px] font-semibold">
                                            Chattogram, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>




                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
