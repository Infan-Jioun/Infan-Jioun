import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    GraduationCap,
    Download,
    Calendar,
    BookOpen,
    ExternalLink
} from 'lucide-react';

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
            <section className="my-20 px-4" id="education">
                <div className="max-w-6xl mx-auto">
                    <Skeleton className="h-12 w-64 mx-auto mb-12 rounded-full" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Skeleton className="h-48 rounded-2xl" />
                        <Skeleton className="h-48 rounded-2xl" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="my-20 px-4" id="education">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
                        ACADEMIC BACKGROUND
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                        Education Journey
                    </h2>
                    <p className="text-white max-w-2xl mx-auto text-lg">
                        My academic qualifications and professional certifications
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* University Education */}
                    {education.map((edu, index) => (
                        <Card
                            key={index}
                            className="relative bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                                            <GraduationCap className="h-6 w-6 text-purple-300" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-white text-xl font-bold">
                                                {edu.institute}
                                            </CardTitle>
                                            <Badge variant="outline" className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                                                {edu.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <BookOpen className="h-5 w-5 text-purple-300/60" />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                        {edu.degree}
                                    </h3>
                                    <p className="text-white leading-relaxed">
                                        {edu.field}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-white">
                                    <Calendar className="h-4 w-4" />
                                    <span className='text-white'>Currently Enrolled</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Programming Hero Course */}
                    <Card className="relative bg-gradient-to-br from-gray-900/80 via-pink-900/20 to-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden group hover:shadow-pink-500/20 transition-all duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-pink-500/20 rounded-xl border border-pink-500/30">
                                        <GraduationCap className="h-6 w-6 text-pink-300" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white text-xl font-bold">
                                            Programming Hero
                                        </CardTitle>
                                        <Badge variant="outline" className="mt-2 bg-pink-500/20 text-pink-300 border-pink-500/30">
                                            2023 (July - December)
                                        </Badge>
                                    </div>
                                </div>
                                <ExternalLink className="h-5 w-5 text-pink-300/60" />
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                                    Web Development Course
                                </h3>
                                <p className="text-white leading-relaxed">
                                    Comprehensive full-stack web development training with modern technologies
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-sm text-white">
                                    <Calendar className="h-4 w-4" />
                                    <span>6 Months Intensive</span>
                                </div>

                                <Link
                                    href="https://drive.google.com/file/d/1LRG-O9v8Xi0APntm4gbi6gR7BODlmqBu/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        variant="outline"
                                        className="bg-transparent border-pink-400/30 text-pink-300 hover:bg-pink-500/20 hover:text-white hover:border-pink-400 transition-all duration-300 group/btn"
                                    >
                                        <Download className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                                        View Certificate
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-8">
                    <p className="text-white text-sm">
                        {" Continuously learning and expanding skills through both formal education and professional courses"}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;