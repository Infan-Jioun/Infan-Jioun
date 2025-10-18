import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

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
    if (loading) {
        return (
            <div className="flex flex-wrap justify-center md:justify-start gap-3 drop-shadow-lg mb-6">
                {[...Array(7)].map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-10 w-10 bg-gray-700 rounded-full"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center md:justify-start gap-3 drop-shadow-lg mb-6">
            {socialLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 ${link.color} flex items-center justify-center w-10 h-10`}
                    aria-label={`Visit ${link.href}`}
                >
                    {link.icon}
                </Link>
            ))}
        </div>
    );
};

export default SocialLinks;