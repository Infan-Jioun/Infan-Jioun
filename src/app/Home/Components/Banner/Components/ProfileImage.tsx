"use client"
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileImageProps {
    loading: boolean;
}

const ProfileImage = ({ loading }: ProfileImageProps) => {
    if (loading) {
        return (
            <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                    <Skeleton className="h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl bg-white/20" />
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="relative group">
            {/* Background gradient effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <Card className="relative border-0 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden bg-black/20 backdrop-blur-sm">
                <CardContent className="p-0">
                    <img
                        src={"https://i.ibb.co.com/hxVK2S3c/IMG-20250907-122427-2.jpg"}
                        alt="Infan Jioun Rahman - Full Stack Developer"
                        width={384}
                        height={384}
                        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                        
                        draggable={false}
                    />
                </CardContent>

                {/* Status badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Available
                </div>
            </Card>
        </div>
    );
};

export default ProfileImage;