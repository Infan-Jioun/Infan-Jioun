"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,          
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // RAF loop
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Expose lenis instance globally (optional — useful for scroll-triggered animations)
        (window as unknown as Record<string, unknown>).lenis = lenis;

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}