'use client';

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

interface TechStack {
    name: string;
    icon: string;
}

interface Project {
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo: string;
    backendRepo: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: TechStack[];
    features: string[];
}

interface ProjectDetailModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailModal = memo(({ project, isOpen, onClose }: ProjectDetailModalProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [autoplayRunning, setAutoplayRunning] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewImageIndex, setPreviewImageIndex] = useState(0);

    const allImages = [project.imageUrl, ...project.additionalImages];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (isPreviewOpen) {
                setIsPreviewOpen(false);
            } else {
                onClose();
            }
        }
    }, [onClose, isPreviewOpen]);

    const openImagePreview = useCallback((index: number) => {
        setPreviewImageIndex(index);
        setIsPreviewOpen(true);
        setAutoplayRunning(false);
    }, []);

    const closeImagePreview = useCallback(() => {
        setIsPreviewOpen(false);
        setAutoplayRunning(true);
    }, []);

    const navigatePreview = useCallback((direction: 'prev' | 'next') => {
        setPreviewImageIndex(prev => {
            if (direction === 'next') {
                return prev === allImages.length - 1 ? 0 : prev + 1;
            } else {
                return prev === 0 ? allImages.length - 1 : prev - 1;
            }
        });
    }, [allImages.length]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            setAutoplayRunning(true);
            setIsPreviewOpen(false);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
                <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white animate-gradient shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-white/20 pb-4">
                        <CardTitle className="text-2xl font-bold text-white">{project.title}</CardTitle>
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            className="text-white hover:text-red-400 hover:bg-white/10 rounded-xl p-2"
                        >
                            ✕
                        </Button>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Swiper Image Gallery */}
                        <div
                            className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                            onMouseEnter={() => setAutoplayRunning(false)}
                            onMouseLeave={() => setAutoplayRunning(true)}
                        >
                            {/* Main Swiper */}
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination, Thumbs, Zoom]}
                                autoplay={autoplayRunning ? {
                                    delay: 4000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                } : false}
                                navigation={{
                                    nextEl: '.custom-next',
                                    prevEl: '.custom-prev',
                                }}
                                pagination={{
                                    clickable: true,
                                    renderBullet: function (index, className) {
                                        return `<span class="${className} !w-3 !h-3 !bg-white/50 !mx-1 hover:!bg-white/70 transition-all duration-200"></span>`;
                                    },
                                }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                zoom={true}
                                spaceBetween={10}
                                slidesPerView={1}
                                className="rounded-xl cursor-zoom-in"
                                onSlideChange={(swiper) => console.log('slide change')}
                            >
                                {allImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-zoom-container">
                                            <div
                                                className="relative h-64 md:h-80 lg:h-96"
                                                onClick={() => openImagePreview(index)}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`${project.title} - Image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    priority={index === 0}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                                />
                                                {/* Zoom indicator */}
                                                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                                                    <span>🔍</span>
                                                    <span>Click to preview</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Custom Navigation Buttons */}
                            {allImages.length > 1 && (
                                <>
                                    <button className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-xl transition-all duration-200 hover:scale-110">
                                        ‹
                                    </button>
                                    <button className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-xl transition-all duration-200 hover:scale-110">
                                        ›
                                    </button>
                                </>
                            )}

                            {/* Autoplay Status Indicator */}
                            {allImages.length > 1 && (
                                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full ${autoplayRunning ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
                                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded-full">
                                        {autoplayRunning ? 'Auto' : 'Paused'}
                                    </span>
                                </div>
                            )}

                            {/* Image Counter */}
                            {allImages.length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                                    {allImages.length} images
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Swiper */}
                        {allImages.length > 1 && (
                            <div className="mt-4">
                                <Swiper
                                    modules={[Thumbs]}
                                    onSwiper={setThumbsSwiper}
                                    watchSlidesProgress
                                    spaceBetween={8}
                                    slidesPerView={4}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 3,
                                        },
                                        640: {
                                            slidesPerView: 4,
                                        },
                                        1024: {
                                            slidesPerView: 5,
                                        },
                                    }}
                                    className="thumb-swiper"
                                >
                                    {allImages.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="relative h-16 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-white/50 transition-all duration-200"
                                                onClick={() => openImagePreview(index)}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 80px, 100px"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}

                        {/* Description */}
                        <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-white mb-3">Project Overview</h4>
                                <p className="text-white leading-relaxed">{project.detailedDescription}</p>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-white">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Technology Stack */}
                        <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {project.techStack.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200"
                                        >
                                            <Image
                                                src={tech.icon}
                                                alt={tech.name}
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 object-contain rounded-lg"
                                            />
                                            <span className="text-white text-sm font-medium">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/20">
                            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                    Live Demo
                                </Button>
                            </Link>
                            <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                    Frontend Code
                                </Button>
                            </Link>
                            {project.backendRepo && (
                                <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                        Backend Code
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Full Screen Image Preview */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-lg">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <Button
                            onClick={closeImagePreview}
                            variant="ghost"
                            className="absolute top-4 right-4 text-white hover:text-red-400 hover:bg-white/10 rounded-xl p-3 z-10"
                        >
                            ✕
                        </Button>

                        {/* Navigation Buttons */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={() => navigatePreview('prev')}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-xl transition-all duration-200 hover:scale-110 z-10"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={() => navigatePreview('next')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-xl transition-all duration-200 hover:scale-110 z-10"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                            {previewImageIndex + 1} / {allImages.length}
                        </div>

                        {/* Main Preview Image */}
                        <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
                            <Image
                                src={allImages[previewImageIndex]}
                                alt={`${project.title} - Preview ${previewImageIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 768px) 100vw, 90vw"
                            />
                        </div>

                        {/* Thumbnail Strip */}
                        {allImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto py-2 px-4 bg-black/50 rounded-xl">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPreviewImageIndex(index)}
                                        className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === previewImageIndex
                                            ? 'border-white scale-110'
                                            : 'border-transparent hover:border-white/50'
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumb ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Keyboard Shortcuts Help */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white/70 text-xs px-3 py-2 rounded-lg z-10">
                            ← → Navigate • ESC Close
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';

export default ProjectDetailModal;