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
            <section className="my-16 px-4 backdrop-blur-md" id="education">
                <Skeleton className="h-12 w-56 mx-auto mb-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <Skeleton className="h-48 w-full bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl backdrop-blur-lg border border-purple-500/20" />
                    <Skeleton className="h-48 w-full bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl backdrop-blur-lg border border-purple-500/20" />
                </div>
            </section>
        );
    }

    return (
        <section className="my-20 px-4 backdrop-blur-md relative z-0" id="education">
            {/* Header */}
            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-white drop-shadow-lg mb-4">
                    Education Journey
                </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
                {/* University Card */}
                {education.map((edu, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                        {/* Main Card */}
                        <div className="relative bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-pink-900/30 backdrop-blur-3xl border border-purple-500/30 p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/50 hover:shadow-purple-500/30 h-full flex flex-col">
                            {/* Animated Border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            <div className="relative z-10 flex-1 flex flex-col">
                                {/* Icon and Institute */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                                        <MdSchool className="text-white text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{edu.institute}</h3>
                                </div>

                                {/* Degree and Field */}
                                <div className="space-y-2 mb-4 flex-1">
                                    <p className="text-lg font-semibold text-purple-200">{edu.degree}</p>
                                    <p className="text-white">{edu.field}</p>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-white text-sm font-medium">{edu.duration}</span>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Programming Hero Card */}
                <div className="group relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-pink-900/30 backdrop-blur-3xl border border-purple-500/30 p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-400/50 hover:shadow-purple-500/30 h-full flex flex-col">
                        {/* Animated Border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        <div className="relative z-10 flex-1 flex flex-col">
                            {/* Icon and Institute */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                                    <MdSchool className="text-white text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Programming Hero</h3>
                            </div>

                            {/* Course Details */}
                            <div className="space-y-2 mb-4 flex-1">
                                <p className="text-lg font-semibold text-purple-200">Additional Course</p>
                                <p className="text-white">Web Development</p>
                                <p className="text-white text-sm italic">2023 (July - December)</p>
                            </div>

                            {/* Certificate Button */}
                            <Link
                                href="https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/40 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-purple-500/30 hover:border-purple-300 hover:shadow-purple-500/40 mt-auto"
                            >
                                <div className="relative">
                                    <MdDownloading className="text-xl group-hover/btn:animate-bounce" />
                                    <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm group-hover/btn:blur-md transition-all duration-300"></div>
                                </div>
                                <span className="font-semibold">View Certificate</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute left-10 top-1/3 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute right-10 bottom-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </section>
    );
};

export default EducationSection;