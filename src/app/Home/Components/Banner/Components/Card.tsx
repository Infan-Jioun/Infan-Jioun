'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CardItem {
    title: string;
    image: string;
    description: string;
}

const TechnologySlider = () => {
    const cards = useMemo<CardItem[]>(() => [
        {
            title: "JavaScript Developer",
            image: "https://i.ibb.co.com/Hy3SnXB/1-p2-P4-Zxi2-Vdp29b-Kg-Mz0i-Dg.jpg",
            description: "Mastering JavaScript for dynamic interactions, event-driven programming, and building real-time user experiences with modern ES6+ practices.",
        },
        {
            title: "TypeScript Developer",
            image: "https://i.ibb.co.com/QFmSqP6q/1756647436086.jpg",
            description: "Type-safe development, advanced JavaScript patterns, and building scalable, maintainable, real-time web applications.",
        },
        {
            title: "MERN Stack Developer",
            image: "https://i.ibb.co.com/h1TyXcV4/8901671.jpg",
            description: "Building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Clean code, REST APIs, and scalability guaranteed.",
        },
        {
            title: "React Developer",
            image: "https://i.ibb.co.com/KjP896gk/react-starter.png",
            description: "Crafting component-based UIs using React.js, React Router, and hooks for fast, maintainable, and interactive web apps.",
        },
        {
            title: "Redux Toolkit",
            image: "https://i.ibb.co.com/zWp07PwB/2b750a26.webp",
            description: "Efficiently managing app state using Redux Toolkit with slices, async thunks, and scalable architecture for modern applications.",
        },
        {
            title: "Next.js Developer",
            image: "https://i.ibb.co.com/TqmxqhgX/hero-1.webp",
            description: "Building server-rendered React applications with Next.js for optimal performance, SEO, and user experience.",
        },
    ], []);

    const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
    const [isInView, setIsInView] = useState(false);
    const [showSkeletons, setShowSkeletons] = useState(true);
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
                    // Hide skeletons after a short delay
                    setTimeout(() => setShowSkeletons(false), 500);
                }
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        if (Object.keys(loadedImages).length === cards.length) {
            setShowSkeletons(false);
        }
    }, [loadedImages, cards.length]);

    const breakpoints = useMemo(() => ({
        320: { slidesPerView: 1, spaceBetween: 16 },
        480: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 1.2, spaceBetween: 24 },
        768: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 32 },
        1280: { slidesPerView: 3, spaceBetween: 32 },
    }), []);

    const TechnologyCard = useCallback(({ card, index }: { card: CardItem; index: number }) => (
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group h-full">
            <CardContent className="p-6 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-40 mb-6 rounded-xl overflow-hidden">
                    {!loadedImages[index] && (
                        <Skeleton className="absolute inset-0 w-full h-full bg-white/20 rounded-xl z-10" />
                    )}
                    <Image
                        src={card.image}
                        alt={card.title}
                        width={320}
                        height={160}
                        loading="lazy"
                        onLoad={() => handleImageLoad(index)}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${loadedImages[index] ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white text-center mb-3 group-hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed text-center flex-1">
                        {card.description}
                    </p>
                </div>

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </CardContent>
        </Card>
    ), [loadedImages, handleImageLoad]);

    // Shadcn Skeleton Loader
    const skeletonCards = useMemo(() =>
        Array.from({ length: 6 }, (_, index) => (
            <SwiperSlide key={`skeleton-${index}`}>
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                        {/* Image Skeleton */}
                        <div className="relative h-40 mb-6 rounded-xl overflow-hidden">
                            <Skeleton className="w-full h-full bg-white/20 rounded-xl" />
                        </div>

                        {/* Title Skeleton */}
                        <div className="flex justify-center mb-3">
                            <Skeleton className="h-6 w-3/4 bg-white/20 rounded-full" />
                        </div>

                        {/* Description Skeletons */}
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full bg-white/20 rounded-full" />
                            <Skeleton className="h-4 w-full bg-white/20 rounded-full" />
                            <Skeleton className="h-4 w-2/3 bg-white/20 rounded-full mx-auto" />
                        </div>
                    </CardContent>
                </Card>
            </SwiperSlide>
        )), []);

    return (
        <section className="py-20 bg-transparent" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                        Technologies I Work With
                    </h2>
                    <p className="text-xl text-white max-w-2xl mx-auto">
                        Explore the cutting-edge technologies and frameworks I use to build amazing web applications
                    </p>
                </div>

                {/* Swiper Slider */}
                <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={32}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            waitForTransition: true
                        }}
                        speed={800}
                        grabCursor={true}
                        breakpoints={breakpoints}

                        className="pb-16"
                    >
                        {/* Show skeletons or actual cards */}
                        {showSkeletons ? (
                            skeletonCards
                        ) : (
                            cards.map((card, index) => (
                                <SwiperSlide key={index}>
                                    <TechnologyCard card={card} index={index} />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>



            </div>


        </section>
    );
};

export default TechnologySlider;