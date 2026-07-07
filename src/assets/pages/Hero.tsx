import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
    theme: "ice" | "fire";
}

const Hero = ({ theme }: HeroProps) => {
    const container = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);

    // ── Particle engine ──
    const runParticles = useCallback((canvas: HTMLCanvasElement, t: "ice" | "fire") => {
        const ctx = canvas.getContext("2d")!;
        let w = canvas.offsetWidth;
        let h = canvas.offsetHeight;
        canvas.width = w;
        canvas.height = h;

        const onResize = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w;
            canvas.height = h;
        };
        window.addEventListener("resize", onResize);

        type Particle = {
            x: number; y: number; r: number;
            speedX: number; speedY: number;
            opacity: number; life: number; maxLife: number;
        };

        const particles: Particle[] = [];
        const count = t === "ice" ? 80 : 60;

        for (let i = 0; i < count; i++) {
            const maxLife = 120 + Math.random() * 80;
            particles.push({
                x: Math.random() * w,
                y: t === "ice" ? Math.random() * h : h + Math.random() * 20,
                r: Math.random() * (t === "ice" ? 2 : 1.5) + 0.5,
                speedX: (Math.random() - 0.5) * (t === "ice" ? 0.4 : 0.5),
                speedY: t === "ice" ? Math.random() * 0.7 + 0.2 : -(Math.random() * 1.2 + 0.5),
                opacity: Math.random() * 0.6 + 0.2,
                life: Math.random() * maxLife,
                maxLife,
            });
        }

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                const fade = t === "fire" ? (1 - p.life / p.maxLife) : 1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = t === "ice"
                    ? `rgba(186,230,253,${p.opacity})`
                    : `rgba(251,146,60,${p.opacity * fade})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = t === "ice" ? "#bae6fd" : "#f97316";
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                p.life++;

                // Reset
                if (t === "ice" && p.y > h + 5) {
                    p.y = -5;
                    p.x = Math.random() * w;
                } else if (t === "fire" && (p.y < -10 || p.life >= p.maxLife)) {
                    p.y = h + 10;
                    p.x = Math.random() * w;
                    p.life = 0;
                }
            }
            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const cleanup = runParticles(canvasRef.current, theme);
        return cleanup;
    }, [theme, runParticles]);

    // Entrance animations
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(".hero-eyebrow",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 }
        ).fromTo(".hero-title-line",
            { opacity: 0, y: 60, skewY: 4 },
            { opacity: 1, y: 0, skewY: 0, duration: 1.0, stagger: 0.15 },
            "-=0.4"
        ).fromTo(".hero-divider",
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.8 },
            "-=0.5"
        ).fromTo(subtitleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.4"
        ).fromTo(".social-link",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
            "-=0.5"
        ).fromTo(buttonRef.current,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.6 },
            "-=0.4"
        );

        // Magnetic button
        const btn = buttonRef.current;
        if (btn) {
            const onMove = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
            };
            const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
            btn.addEventListener("mousemove", onMove);
            btn.addEventListener("mouseleave", onLeave);
            return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
        }
    }, { scope: container });

    const isIce = theme === "ice";

    return (
        <section
            id="home"
            ref={container}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={{ padding: "120px 48px 80px" }}
        >
            {/* Canvas particles */}
            <canvas
                ref={canvasRef}
                className="particle-canvas"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
            />

            {/* Glow orbs */}
            <div className="glow-mesh" style={{
                width: 700, height: 700,
                top: "-20%", left: "-15%",
                background: isIce
                    ? "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(251,146,60,0.12) 0%, transparent 70%)",
            }} />
            <div className="glow-mesh" style={{
                width: 500, height: 500,
                bottom: "-10%", right: "-10%",
                background: isIce
                    ? "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)",
                animationDelay: "4s",
            }} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">

                {/* Eyebrow */}
                <div className="hero-eyebrow flex items-center gap-4 mb-8">
                    <div className="w-16 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                    <span className="text-xs font-semibold tracking-[0.4em] uppercase" style={{
                        color: "var(--primary)",
                        fontFamily: "Cinzel, serif",
                    }}>
                        {isIce ? "The North Remembers" : "Fire & Blood"}
                    </span>
                </div>

                {/* Title */}
                <div ref={titleRef} className="overflow-hidden mb-10">
                    <div
                        className="hero-title-line text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-tight"
                        style={{ fontFamily: "Cinzel, serif" }}
                    >
                        Design
                    </div>
                    <div
                        className="hero-title-line text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-tight italic"
                        style={{
                            fontFamily: "Cinzel, serif",
                            background: `linear-gradient(135deg, var(--primary) 0%, var(--shimmer) 50%, var(--secondary) 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            backgroundSize: "200% auto",
                            animation: "shimmer-flow 4s linear infinite",
                        }}
                    >
                        that Reacts
                    </div>
                </div>

                {/* Divider + Bio */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mt-6">
                    <div
                        className="hero-divider w-full md:w-64 h-px shrink-0"
                        style={{
                            background: `linear-gradient(90deg, var(--primary), transparent)`,
                            boxShadow: "0 0 8px var(--primary-glow)"
                        }}
                    />
                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
                        style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(16px, 2vw, 22px)" }}
                    >
                        I craft pixel-perfect, engaging, and accessible digital experiences — forged in code, tempered in design.
                    </p>
                </div>

                {/* Socials + CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-20">
                    <div
                        ref={socialsRef}
                        className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: "var(--text-muted)", fontFamily: "Cinzel, serif" }}
                    >
                        {['LinkedIn', 'Github', 'Instagram', 'Gmail'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="social-link flex items-center gap-2 transition-all duration-300 group"
                                style={{ color: "var(--text-muted)" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                            >
                                <span>{social}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <button
                        ref={buttonRef}
                        className="magnetic-button group relative overflow-hidden"
                        style={{
                            fontFamily: "Cinzel, serif",
                            background: "transparent",
                            border: "1px solid var(--primary)",
                            color: "var(--primary)",
                            padding: "18px 44px",
                            borderRadius: "50px",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            cursor: "none",
                            backdropFilter: "blur(10px)",
                            boxShadow: `0 0 20px var(--primary-glow), 0 8px 32px rgba(0,0,0,0.3)`,
                            transition: "all 0.4s ease",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "var(--primary-glow)";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px var(--primary-glow), 0 12px 40px rgba(0,0,0,0.4)`;
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px var(--primary-glow), 0 8px 32px rgba(0,0,0,0.3)`;
                        }}
                    >
                        Explore My Work
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10" style={{ opacity: 0.5 }}>
                <div className="w-5 h-9 rounded-full border flex items-start justify-center p-1"
                    style={{ borderColor: "var(--glass-border)" }}
                >
                    <div className="w-1 h-2.5 rounded-full"
                        style={{ background: "var(--primary)", animation: "scrollBounce 1.4s ease-in-out infinite" }}
                    />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em]"
                    style={{ color: "var(--text-muted)", fontFamily: "Cinzel, serif" }}
                >Scroll</span>
            </div>
        </section>
    );
};

export default Hero;