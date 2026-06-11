import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const characterRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const overlay = overlayRef.current;
        const character = characterRef.current;
        const text = textRef.current;
        const glow = glowRef.current;
        const scrollHint = scrollHintRef.current;

        if (!overlay || !character || !text || !glow || !scrollHint) return;

        // Prevent body scroll during intro
        document.body.style.overflow = "hidden";

        // ── Entrance timeline ──
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Start everything invisible
        gsap.set([character, text, scrollHint], { opacity: 0 });
        gsap.set(character, { y: 80, scale: 0.9 });
        gsap.set(text, { y: 30 });
        gsap.set(scrollHint, { y: 20 });

        tl
            // Glow pulse in
            .fromTo(glow,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
            )
            // Character rises
            .to(character,
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
                "-=0.8"
            )
            // Text fades in
            .to(text,
                { opacity: 1, y: 0, duration: 0.9 },
                "-=0.5"
            )
            // Scroll hint appears
            .to(scrollHint,
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.2"
            );

        // Floating animation on character (continuous)
        gsap.to(character, {
            y: "-=16",
            duration: 2.8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1.5
        });

        // Glow pulse (continuous)
        gsap.to(glow, {
            scale: 1.08,
            opacity: 0.7,
            duration: 2.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // ── Scroll-to-dismiss ──
        let hasTriggered = false;

        const dismiss = () => {
            if (hasTriggered) return;
            hasTriggered = true;
            setScrolled(true);

            const exitTl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = "";
                    onComplete();
                }
            });

            exitTl
                .to(scrollHint, { opacity: 0, y: -10, duration: 0.3 })
                .to(text, { opacity: 0, y: -20, duration: 0.5 }, "-=0.2")
                .to(character, {
                    y: -60,
                    opacity: 0,
                    scale: 1.05,
                    duration: 0.9,
                    ease: "power3.in"
                }, "-=0.3")
                .to(glow, { opacity: 0, scale: 1.5, duration: 0.8 }, "-=0.6")
                .to(overlay, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in"
                }, "-=0.3");
        };

        // Trigger on scroll OR click anywhere
        const handleScroll = () => dismiss();
        const handleClick = () => dismiss();
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") dismiss();
        };

        window.addEventListener("wheel", handleScroll, { passive: true });
        window.addEventListener("touchmove", handleScroll, { passive: true });
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKey);

        // Auto-dismiss after 6s if user hasn't interacted
        const autoTimer = setTimeout(dismiss, 6000);

        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKey);
            clearTimeout(autoTimer);
            document.body.style.overflow = "";
        };
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-end overflow-hidden"
            style={{
                background: "radial-gradient(ellipse at 50% 100%, #1a0a2e 0%, #0a0a0f 60%, #000000 100%)"
            }}
        >
            {/* Particle dots */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-violet-400/30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Grid overlay for depth */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px"
                }}
            />

            {/* Bottom ground glow */}
            <div
                ref={glowRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: "700px",
                    height: "400px",
                    background: "radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.45) 0%, rgba(109,40,217,0.2) 40%, transparent 70%)",
                    filter: "blur(20px)"
                }}
            />

            {/* Ground line */}
            <div className="absolute bottom-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

            {/* Anime Character */}
            <img
                ref={characterRef}
                src="/cartoon-character.png"
                alt="Cartoon character"
                className="relative z-10 select-none pointer-events-none"
                style={{
                    height: "clamp(320px, 58vh, 640px)",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom",
                    marginBottom: "0",
                    filter: "drop-shadow(0 0 40px rgba(139,92,246,0.5)) drop-shadow(0 0 80px rgba(109,40,217,0.3))"
                }}
                draggable={false}
            />

            {/* Name & tagline — above character's feet */}
            <div
                ref={textRef}
                className="absolute bottom-[30%] left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none w-full px-6"
            >
                <p className="text-violet-400/80 text-[10px] font-bold tracking-[0.5em] uppercase mb-2">
                    Welcome to the portfolio of
                </p>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                    Gohul<span className="text-transparent" style={{
                        WebkitTextStroke: "1px rgba(139,92,246,0.6)"
                    }}> Das</span>
                </h1>
                <p className="text-white/30 text-xs font-light tracking-[0.3em] uppercase mt-3">
                    Software Engineer · Designer · Creator
                </p>
            </div>

            {/* Scroll hint */}
            <div
                ref={scrollHintRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none"
            >
                <p className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">
                    {scrolled ? "Loading..." : "Scroll or click to enter"}
                </p>
                <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
                    <div
                        className="w-1 h-2.5 rounded-full bg-violet-400/70"
                        style={{
                            animation: "scrollBounce 1.4s ease-in-out infinite"
                        }}
                    />
                </div>
            </div>

            {/* Top vignette */}
            <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #000000 0%, transparent 100%)" }}
            />

            <style>{`
                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(10px); opacity: 0.4; }
                }
            `}</style>
        </div>
    );
};

export default IntroOverlay;
