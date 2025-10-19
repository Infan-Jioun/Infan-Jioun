import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';


interface ProfileImageProps {
    loading: boolean;
}

const ProfileImage = ({ loading }: ProfileImageProps) => {
    if (loading) {
        return (
            <Skeleton
                className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-gray-700"
            />
        );
    }

    return (
        <div className="rounded-full  drop-shadow-lg shadow-xl transition-transform duration-300 hover:scale-105 overflow-hidden">
            <Image
                src={"https://i.ibb.co/TDytG77f/Github-Image.png"}
                alt="Infan Jioun Rahman"
                width={320}
                height={320}
                className="w-64 h-64 md:w-80 md:h-80 object-cover"
                priority
                draggable={false}
            />
        </div>
    );
};

export default ProfileImage;