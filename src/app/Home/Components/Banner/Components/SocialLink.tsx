'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface SocialLink {
    icon: React.ReactNode;
    href: string;
    color: string;
}

interface SocialLinksProps {
    loading: boolean;
    socialLinks: SocialLink[];
}

const SocialLinks = ({ loading, socialLinks }: SocialLinksProps) => {
    return (
        <div className="flex flex-col items-center">
            {/* Title */}
            {loading ? (
                <Skeleton className="h-6 w-40 mb-4 rounded-lg bg-white/20" />
            ) : (
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Connect With Me</h3>
            )}

            {/* Icons row */}
            <div className="flex flex-wrap justify-center gap-3">
                {loading
                    ? [...Array(7)].map((_, i) => (
                        <Skeleton
                            key={i}
                            className="h-12 w-12 rounded-xl p-6 bg-white/20"
                        />
                    ))
                    : socialLinks.map((link, index) => (
                        <Card
                            key={index}
                            className="transition-all duration-300 hover:scale-110 hover:shadow-lg border border-white/10 bg-white/5"
                        >
                            <CardContent className="p-0">
                                <Link
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center h-12 w-12 rounded-xl text-white transition-all duration-300 hover:bg-white/20 ${link.color}`}
                                    title={link.href.replace('https://', '').split('/')[0]}
                                >
                                    <span className="text-xl">{link.icon}</span>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default SocialLinks;