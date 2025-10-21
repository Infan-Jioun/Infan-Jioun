import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { MdSchool, MdDownloading } from 'react-icons/md';

interface EducationItem {
    institute: string;
    degree: string;
    field: string;
    duration: string;
}

interface EducationSectionProps {
    loading: boolean;
}

const EducationSection = ({ loading }: EducationSectionProps) => {
    const education: EducationItem[] = [
        {
            institute: 'Premier University Chittagong',
            degree: 'Bachelor of Arts (BA)',
            field: 'Fashion Design And Technology',
            duration: '2024 - Present',
        },
    ];

    if (loading) {
        return (
            <section className="my-16 px-4" id="education">
                <Skeleton className="h-10 w-48 mx-auto mb-8 bg-gray-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Skeleton className="h-40 w-full bg-gray-500 rounded-xl" />
                    <Skeleton className="h-40 w-full bg-gray-500 rounded-xl" />
                </div>
            </section>
        );
    }

    return (
        <section className="my-16 px-4" id="education">
            <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="relative bg-gray-900/40 backdrop-blur-lg p-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-800/40"
                    >
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                            <MdSchool className="text-white" /> {edu.institute}
                        </h3>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-white-300">{edu.field}</p>
                        <p className="italic mt-2">{edu.duration}</p>
                    </div>
                ))}

                <div className="relative bg-gray-900/40 backdrop-blur   border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-800/40">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                        <MdSchool className="text-white" /> Programming Hero
                    </h3>
                    <p className="font-semibold">Additional Course</p>
                    <p className="text-white-300">Web Development</p>
                    <p className="italic mt-2">2023 (July - December)</p>
                    <Link
                        href="https://drive.google.com/file/d/1LRG-O9v8Xi0APntm4gbi6gR7BODlmqBu/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-white mt-4 text-white py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10"
                    >
                        <MdDownloading className="text-xl" />
                        Certificate
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;