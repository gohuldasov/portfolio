import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

interface IntroOverlayProps {
    onComplete: (theme: "ice" | "fire") => void;
}

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const iceCanvasRef = useRef<HTMLCanvasElement>(null);
    const fireCanvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState<"ice" | "fire" | null>(null);

    // ── Particle Engines ──
    const runIceCanvas = useCallback((canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d")!;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);

        const flakes: { x: number; y: number; r: number; speed: number; drift: number; opacity: number }[] = [];
        for (let i = 0; i < 80; i++) {
            flakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                speed: Math.random() * 0.8 + 0.3,
                drift: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.7 + 0.2,
            });
        }

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            flakes.forEach(f => {
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(186, 230, 253, ${f.opacity})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "#bae6fd";
                ctx.fill();
                f.y += f.speed;
                f.x += f.drift;
                if (f.y > canvas.height) { f.y = -5; f.x = Math.random() * canvas.width; }
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);

    const runFireCanvas = useCallback((canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d")!;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);

        const embers: { x: number; y: number; r: number; speed: number; drift: number; life: number; maxLife: number }[] = [];
        for (let i = 0; i < 60; i++) {
            const maxLife = 80 + Math.random() * 80;
            embers.push({
                x: Math.random() * canvas.width,
                y: canvas.height + 10,
                r: Math.random() * 2 + 0.5,
                speed: Math.random() * 1.5 + 0.5,
                drift: (Math.random() - 0.5) * 0.6,
                life: Math.random() * maxLife,
                maxLife,
            });
        }

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            embers.forEach(e => {
                const alpha = (1 - e.life / e.maxLife) * 0.85;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 146, 60, ${alpha})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#f97316";
                ctx.fill();
                e.y -= e.speed;
                e.x += e.drift;
                e.life++;
                if (e.life >= e.maxLife || e.y < -10) {
                    e.y = canvas.height + 10;
                    e.x = Math.random() * canvas.width;
                    e.life = 0;
                }
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);

    useEffect(() => {
        if (iceCanvasRef.current) runIceCanvas(iceCanvasRef.current);
        if (fireCanvasRef.current) runFireCanvas(fireCanvasRef.current);
    }, [runIceCanvas, runFireCanvas]);

    // Entrance animation
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(titleRef.current,
            { opacity: 0, y: -40 },
            { opacity: 1, y: 0, duration: 1.2 }
        ).fromTo(cardsRef.current?.children!,
            { opacity: 0, y: 60, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: 0.2 },
            "-=0.6"
        );
    }, []);

    const handleChoose = (theme: "ice" | "fire") => {
        const overlay = overlayRef.current;
        if (!overlay) return;
        document.documentElement.setAttribute("data-theme", theme);
        gsap.to(overlay, {
            opacity: 0,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                document.body.style.overflow = "";
                onComplete(theme);
            }
        });
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "radial-gradient(ellipse at 50% 0%, #050e1a 0%, #000000 70%)" }}
        >
            {/* Stars */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 120 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 70}%`,
                            width: `${Math.random() * 2 + 0.5}px`,
                            height: `${Math.random() * 2 + 0.5}px`,
                            opacity: Math.random() * 0.6 + 0.1,
                            animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Title area */}
            <div ref={titleRef} className="text-center mb-16 relative z-10 px-6">
                <p
                    className="text-xs font-semibold tracking-[0.5em] uppercase mb-6"
                    style={{ color: "#7ba3c0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    Choose Your House
                </p>
                <h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none mb-4"
                    style={{
                        fontFamily: "Cinzel Decorative, serif",
                        background: "linear-gradient(135deg, #bae6fd 0%, #ffffff 40%, #fde68a 60%, #fb923c 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: "none",
                    }}
                >
                    Fire & Blood
                </h1>
                <p
                    className="text-sm italic"
                    style={{ color: "#7ba3c0", fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}
                >
                    Winter is Coming · or · Fire Cannot Kill a Dragon
                </p>
            </div>

            {/* Faction Cards */}
            <div ref={cardsRef} className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-4xl px-6 relative z-10">

                {/* ICE Card */}
                <button
                    className="faction-card group relative flex-1 rounded-3xl overflow-hidden cursor-none"
                    style={{ minHeight: "380px", border: "none", padding: 0, background: "transparent" }}
                    onMouseEnter={() => setHovered("ice")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleChoose("ice")}
                >
                    <canvas
                        ref={iceCanvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: 1 }}
                    />
                    <div
                        className="absolute inset-0 transition-all duration-700"
                        style={{
                            background: hovered === "ice"
                                ? "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.25) 0%, rgba(14,28,45,0.85) 70%)"
                                : "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.10) 0%, rgba(4,10,18,0.92) 70%)",
                            border: `1px solid ${hovered === "ice" ? "rgba(125,211,252,0.5)" : "rgba(125,211,252,0.15)"}`,
                            borderRadius: "24px",
                            backdropFilter: "blur(20px) saturate(180%)",
                            boxShadow: hovered === "ice"
                                ? "0 0 60px rgba(56,189,248,0.3), 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(186,230,253,0.2)"
                                : "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                            zIndex: 2,
                        }}
                    />
                    {/* Inner shimmer */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(186,230,253,0.08) 0%, transparent 50%)",
                            zIndex: 3,
                            borderRadius: "24px",
                        }}
                    />
                    <div className="relative flex flex-col items-center justify-end h-full p-10 text-center" style={{ zIndex: 4 }}>
                        {/* House Sigil area */}
                        <div
                            className="absolute top-10 left-1/2 -translate-x-1/2 text-7xl transition-transform duration-700"
                            style={{
                                filter: "drop-shadow(0 0 20px rgba(125,211,252,0.6))",
                                transform: hovered === "ice" ? "translateX(-50%) scale(1.1)" : "translateX(-50%) scale(1)",
                            }}
                        >
                            ❄️
                        </div>

                        <div className="mt-auto">
                            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#38bdf8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                House Stark
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#e0f2fe" }}>
                                The North
                            </h2>
                            <p className="text-sm font-light" style={{ color: "rgba(186,230,253,0.6)", fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>
                                "Winter is Coming"
                            </p>
                            <div
                                className="mt-6 inline-block px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    background: hovered === "ice" ? "rgba(56,189,248,0.2)" : "transparent",
                                    border: "1px solid rgba(125,211,252,0.35)",
                                    color: "#7dd3fc",
                                    boxShadow: hovered === "ice" ? "0 0 20px rgba(125,211,252,0.3)" : "none",
                                }}
                            >
                                Choose Ice
                            </div>
                        </div>
                    </div>
                </button>

                {/* Separator */}
                <div className="flex md:flex-col items-center justify-center gap-3 relative z-10">
                    <div className="flex-1 h-px md:h-auto md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            backdropFilter: "blur(10px)",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color: "rgba(255,255,255,0.5)",
                        }}
                    >
                        or
                    </div>
                    <div className="flex-1 h-px md:h-auto md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                </div>

                {/* FIRE Card */}
                <button
                    className="faction-card group relative flex-1 rounded-3xl overflow-hidden cursor-none"
                    style={{ minHeight: "380px", border: "none", padding: 0, background: "transparent" }}
                    onMouseEnter={() => setHovered("fire")}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleChoose("fire")}
                >
                    <canvas
                        ref={fireCanvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: 1 }}
                    />
                    <div
                        className="absolute inset-0 transition-all duration-700"
                        style={{
                            background: hovered === "fire"
                                ? "radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.25) 0%, rgba(30,10,5,0.85) 70%)"
                                : "radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.10) 0%, rgba(13,5,2,0.92) 70%)",
                            border: `1px solid ${hovered === "fire" ? "rgba(251,146,60,0.5)" : "rgba(251,146,60,0.15)"}`,
                            borderRadius: "24px",
                            backdropFilter: "blur(20px) saturate(180%)",
                            boxShadow: hovered === "fire"
                                ? "0 0 60px rgba(251,146,60,0.3), 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(253,186,116,0.2)"
                                : "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                            zIndex: 2,
                        }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(135deg, rgba(253,186,116,0.08) 0%, transparent 50%)",
                            zIndex: 3,
                            borderRadius: "24px",
                        }}
                    />
                    <div className="relative flex flex-col items-center justify-end h-full p-10 text-center" style={{ zIndex: 4 }}>
                        <div
                            className="absolute top-10 left-1/2 -translate-x-1/2 text-7xl transition-transform duration-700"
                            style={{
                                filter: "drop-shadow(0 0 20px rgba(251,146,60,0.6))",
                                transform: hovered === "fire" ? "translateX(-50%) scale(1.1)" : "translateX(-50%) scale(1)",
                                animation: "fireFlicker 3s ease-in-out infinite",
                            }}
                        >
                            🔥
                        </div>

                        <div className="mt-auto">
                            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: "#f97316", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                House Targaryen
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#fef9f0" }}>
                                Dragonstone
                            </h2>
                            <p className="text-sm font-light" style={{ color: "rgba(253,186,116,0.6)", fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>
                                "Fire & Blood"
            </p>
                            <div
                                className="mt-6 inline-block px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    background: hovered === "fire" ? "rgba(251,146,60,0.2)" : "transparent",
                                    border: "1px solid rgba(251,146,60,0.35)",
                                    color: "#fb923c",
                                    boxShadow: hovered === "fire" ? "0 0 20px rgba(251,146,60,0.3)" : "none",
                                }}
                            >
                                Choose Fire
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <p className="mt-10 text-xs relative z-10" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Cinzel, serif", letterSpacing: "0.2em" }}>
                CLICK TO CHOOSE YOUR ALLEGIANCE
            </p>

            <style>{`
                @keyframes fireFlicker {
                    0%, 100% { filter: drop-shadow(0 0 20px rgba(251,146,60,0.6)); }
                    25% { filter: drop-shadow(0 0 28px rgba(239,68,68,0.7)); }
                    50% { filter: drop-shadow(0 0 16px rgba(251,146,60,0.5)); }
                    75% { filter: drop-shadow(0 0 30px rgba(253,186,116,0.8)); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: var(--pulse-opacity, 0.3); }
                    50% { opacity: calc(var(--pulse-opacity, 0.3) * 2); }
                }
            `}</style>
        </div>
    );
};

export default IntroOverlay;
