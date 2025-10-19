'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CardItem {
    title: string;
    image: string;
    description: string;
}

const Card = () => {
    const cards = useMemo<CardItem[]>(() => [
        {
            title: "JavaScript Developer",
            image: "https://i.ibb.co/Hy3SnXB/1-p2-P4-Zxi2-Vdp29b-Kg-Mz0i-Dg.jpg",
            description: "Mastering JavaScript for dynamic interactions, event-driven programming, and building real-time user experiences with modern ES6+ practices.",
        },
        {
            title: "TypeScript Developer",
            image: "https://i.ibb.co/QFmSqP6q/1756647436086.jpg",
            description: "Type-safe development, advanced JavaScript patterns, and building scalable, maintainable, real-time web applications.",
        },
        {
            title: "MERN Stack Developer",
            image: "https://i.ibb.co/h1TyXcV4/8901671.jpg",
            description: "Building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Clean code, REST APIs, and scalability guaranteed.",
        },
        {
            title: "React Developer",
            image: "https://i.ibb.co/KjP896gk/react-starter.png",
            description: "Crafting component-based UIs using React.js, React Router, and hooks for fast, maintainable, and interactive web apps.",
        },
        {
            title: "Redux Toolkit",
            image: "https://i.ibb.co/zWp07PwB/2b750a26.webp",
            description: "Efficiently managing app state using Redux Toolkit with slices, async thunks, and scalable architecture for modern applications.",
        },
    ], []);

    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
        cards.reduce((acc, _, index) => ({ ...acc, [index]: false }), {})
    );
    const [isInView, setIsInView] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [scaleTitle, setScaleTitle] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageLoad = useCallback((index: number) => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
    }, []);

    // Intersection Observer for entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    setTimeout(() => setIsVisible(true), 100);
                    setTimeout(() => setScaleTitle(true), 300);
                    // Hide skeleton after content loads
                    setTimeout(() => setShowSkeleton(false), 1000);
                }
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const breakpoints = useMemo(() => ({
        320: { slidesPerView: 1 },
        480: { slidesPerView: 1 },
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }), []);

    const CardItem = useCallback(({ card, index }: { card: CardItem; index: number }) => (
        <div
            className="w-full h-[400px] max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-4 bg-white/10 backdrop-blur-2xl border border-white/30 shadow-xl transition-all duration-300 hover:shadow-purple-500/20 hover:scale-105 active:scale-95 cursor-pointer group"
            style={{
                transform: isInView ? 'scale(1)' : 'scale(0.9)',
                opacity: isInView ? 1 : 0,
                transition: `all 0.3s ease ${index * 100}ms`
            }}
        >
            <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                {!loadedImages[index] && (
                    <Skeleton className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 rounded-lg" />
                )}
                <Image
                    src={card.image}
                    alt={card.title}
                    width={320}
                    height={160}
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                    className={`rounded-lg w-full h-40 object-cover transition-all duration-500 ${loadedImages[index]
                            ? 'opacity-100 scale-100 group-hover:scale-110'
                            : 'opacity-0 scale-95'
                        }`}
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(147, 112, 219, 0.8))',
                    }}
                />
            </div>
            <h3 className="text-xl font-semibold text-center text-white mb-3 line-clamp-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
                {card.title}
            </h3>
            <p className="text-sm text-center text-white/90 leading-relaxed line-clamp-4">
                {card.description}
            </p>
        </div>
    ), [loadedImages, handleImageLoad, isInView]);

    // Shadcn Skeleton Loader
    const skeletonCards = useMemo(() =>
        Array.from({ length: 5 }, (_, index) => (
            <SwiperSlide key={`skeleton-${index}`} className="flex justify-center pb-10">
                <div className="w-full h-[400px] max-w-xs sm:max-w-sm md:max-w-md rounded-2xl p-4 bg-white/5 backdrop-blur-2xl border border-white/20 shadow-xl">
                    {/* Image Skeleton */}
                    <div className="relative h-40 mb-6 rounded-lg overflow-hidden">
                        <Skeleton className="w-full h-full bg-gradient-to-r from-gray-700/40 via-gray-600/40 to-gray-700/40 rounded-lg" />
                    </div>

                    {/* Title Skeleton */}
                    <div className="flex justify-center mb-3">
                        <Skeleton className="h-6 w-4/5 bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-full" />
                    </div>

                    {/* Description Skeletons */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                        <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                        <Skeleton className="h-4 w-2/3 bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                    </div>
                </div>
            </SwiperSlide>
        )), []);

    return (
        <div
            ref={containerRef}
            className="max-w-screen-xl mx-auto my-14 px-4 md:px-6"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                transition: 'all 0.3s ease'
            }}
        >
            <h2
                className="text-3xl md:text-4xl font-bold text-center mb-10 uppercase text-white drop-shadow-md bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text "
                style={{
                    transform: scaleTitle ? 'scale(1)' : 'scale(0.9)',
                    opacity: scaleTitle ? 1 : 0,
                    transition: 'all 0.5s ease'
                }}
            >
                Technologies I Work With
            </h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={800}
                breakpoints={breakpoints}
                className="pb-12"
            >
                {showSkeleton ? (
                    skeletonCards
                ) : (
                    cards.map((card, index) => (
                        <SwiperSlide key={index} className="flex justify-center pb-10">
                            <CardItem card={card} index={index} />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default Card;