import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";

const SocialLinks = ({ loading, socialLinks }) => {
    if (loading) {
        return <Skeleton height={40} width={250} className="mb-6" />;
    }

    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-3 drop-shadow-lg mb-6">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 ${link.color}`}
                    aria-label={`Visit ${link.href}`}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialLinks;