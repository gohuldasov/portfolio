import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);

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

    return (
        <section
            id="home"
            ref={container}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={{ padding: "120px 48px 80px" }}
        >
            {/* Glow orbs */}
            <div className="glow-mesh" style={{
                width: 700, height: 700,
                top: "-20%", left: "-15%",
                background: "radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%)",
            }} />
            <div className="glow-mesh" style={{
                width: 500, height: 500,
                bottom: "-10%", right: "-10%",
                background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
                animationDelay: "4s",
            }} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto w-full">

                {/* Eyebrow */}
                

                {/* Title */}
                <div ref={titleRef} className="overflow-hidden mb-10">
                    <div
                        className="hero-title-line text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Design
                    </div>
                    <div
                        className="hero-title-line text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-tight italic"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
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
                        style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(16px, 2vw, 22px)" }}
                    >
                        I craft pixel-perfect, engaging, and accessible digital experiences — forged in code, tempered in design.
                    </p>
                </div>

                {/* Socials + CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-20">
                    <div
                        ref={socialsRef}
                        className="flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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