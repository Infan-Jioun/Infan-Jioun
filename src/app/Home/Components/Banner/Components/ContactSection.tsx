"use client";

import React, { useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const ContactSection = ({ formRef, loading }: { formRef: any; loading: boolean }) => {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.current) return;

        emailjs
            .sendForm("service_34ob7qt", "template_2rj1a7j", form.current, {
                publicKey: "LD3EefzuvWY-avuiH",
            })
            .then(() => {
                toast.success("Successfully sent your message!", { position: "top-center" });
                form.current?.reset();
            })
            .catch(() => {
                toast.error("Please try again", { position: "top-center" });
            });
    }, []);

    if (loading) {
        return (
            <div ref={formRef} id="contact" className="mt-16">
                <Skeleton height={40} width={200} className="mx-auto mb-8" />
                <Skeleton height={300} className="max-w-3xl mx-auto" />
            </div>
        );
    }

    return (
        <section ref={formRef} id="contact" className="mt-16">
            <h2 className="text-center text-3xl md:text-4xl uppercase font-bold text-white mb-8">
                Contact Us
            </h2>

            <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg">
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-300 mb-2 block">Name</label>
                            <Input
                                type="text"
                                name="user_name"
                                placeholder="Your Name"
                                required
                                className="text-white bg-transparent border-white/20 focus-visible:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-300 mb-2 block">Email</label>
                            <Input
                                type="email"
                                name="user_email"
                                placeholder="Your Email"
                                required
                                className="text-white bg-transparent border-white/20 focus-visible:ring-purple-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 mb-2 block">Your Message</label>
                        <Textarea
                            name="message"
                            placeholder="Write your message..."
                            required
                            className="min-h-[120px] text-white bg-transparent border-white/20 focus-visible:ring-purple-600"
                        />
                    </div>

                    <Button
                        type="submit"
                        title="Send Your Message"
                        className="w-full bg-purple-700 hover:bg-purple-900 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Send Your Message
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
