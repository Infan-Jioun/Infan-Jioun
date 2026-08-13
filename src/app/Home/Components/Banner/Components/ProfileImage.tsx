"use client";

import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import profileImage from "../../../../assests/profileImage.png";

interface ProfileImageProps {
    loading: boolean;
}

const ProfileImage = ({ loading }: ProfileImageProps) => {
    // Loading Skeleton State
    if (loading) {
        return (
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2rem] overflow-hidden p-1 bg-white/5 border border-white/10">
                <Skeleton className="w-full h-full rounded-[1.8rem] bg-slate-900/60 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="relative group select-none">
            {/* 1. Dynamic Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-105"></div>

            {/* 2. Glassmorphic Outer Border Wrapper */}
            <div className="relative rounded-[2rem] p-1.5 bg-gradient-to-b from-white/20 via-white/5 to-transparent backdrop-blur-2xl border border-white/15 group-hover:border-purple-400/40 transition-all duration-500 shadow-2xl">

                {/* 3. Main Card Container */}
                <Card className="relative border-0 bg-slate-950/50 backdrop-blur-md rounded-[1.7rem] overflow-hidden shadow-inner">
                    <CardContent className="p-0 relative overflow-hidden">

                        {/* Profile Image with Smooth Zoom */}
                        <Image
                            src={profileImage || "https://i.ibb.co.com/hxVK2S3c/IMG-20250907-122427-2.jpg"}
                            alt="Infan Jioun Rahman - Full Stack Developer"
                            width={384}
                            height={384}
                            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            priority
                        />

                        {/* 4. Cinematic Vignette & Lighting Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none group-hover:opacity-80 transition-opacity duration-500" />
                    

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfileImage;