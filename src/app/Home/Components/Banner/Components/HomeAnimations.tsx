"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAnimations() {
    useEffect(() => {
   
        const lenis = (window as any).__lenis;

        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }

        // Banner fade-in + slide up
        const ctx = gsap.context(() => {
            gsap.from("#home-root > *", {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                stagger: 0.15,
                clearProps: "all",
            });
        });

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            if (lenis) {
                lenis.off("scroll", ScrollTrigger.update);
                gsap.ticker.remove((time) => lenis.raf(time * 1000));
            }
        };
    }, []);

    return null;
}