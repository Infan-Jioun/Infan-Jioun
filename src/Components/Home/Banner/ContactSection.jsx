import React, { useCallback } from 'react';
import { Input, Textarea } from '@material-tailwind/react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

const ContactSection = ({ formRef, loading }) => {
    const form = React.useRef();

    const sendEmail = useCallback((e) => {
        e.preventDefault();
        emailjs.sendForm('service_34ob7qt', 'template_2rj1a7j', form.current, {
            publicKey: 'LD3EefzuvWY-avuiH',
        }).then(() => {
            toast.success('Successfully sent your message!', { position: "top-center" });
            form.current.reset(); 
        }).catch(() => {
            toast.error('Please try again', { position: "top-center", autoClose: 2000 });
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
        <div ref={formRef} id="contact" className="mt-16">
            <h2 className="text-center text-3xl md:text-4xl uppercase font-bold drop-shadow-lg text-white font-mono mb-8">
                Contact Us
            </h2>
            <div className="card max-w-3xl mx-auto mt-6 shadow-lg rounded-xl p-6 drop-shadow-xl backdrop-blur-2xl bg-white/5 border border-white/10">
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            label="Name"
                            name="user_name"
                            placeholder="Your Name"
                            required
                            className="text-white"
                        />
                        <Input
                            type="email"
                            label="Email"
                            name="user_email"
                            placeholder="Your Email"
                            required
                            className="text-white"
                        />
                    </div>
                    <Textarea
                        name="message"
                        label="Your Message"
                        required
                        className="text-white"
                    />
                    <button
                        type="submit"
                        title='Send Your Message'
                        className="w-full btn border-2 border-white backdrop-blur text-white p-3 bg-purple-700 hover:bg-purple-900 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        Send Your Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactSection;