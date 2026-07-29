import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import heroImage from "../image1.png";

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const topWatermarkRef = useRef<HTMLDivElement>(null);
    const bottomTitleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(topWatermarkRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.2 }
        ).fromTo(".hero-bio-text",
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, duration: 0.7 },
            "-=0.8"
        ).fromTo(".hero-bg-image",
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 1.4 },
            "-=0.5"
        ).fromTo(bottomTitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.6"
        ).fromTo(cardRef.current,
            { opacity: 0, y: 24, scale: 0.93 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            "-=0.6"
        );


    }, { scope: container });

    return (
        <section
            id="home"
            ref={container}
            style={{ height: "100svh", minHeight: "600px" }}
            className="relative w-full flex flex-col overflow-hidden px-6 md:px-12 lg:px-20"
        >
            {/* Background Portrait — centered, contained, not full-cover */}
            <div className="hero-bg-image absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
                <img
                    src={heroImage}
                    alt="Gohul Background Portrait"
                    style={{
                        height: "80%",
                        width: "auto",
                        maxWidth: "55%",
                        objectFit: "contain",
                        opacity: 0.35,
                    }}
                />
            </div>



            {/* Blueprint Corner Crosshairs */}
            {["top-4 left-6", "top-4 right-6", "bottom-4 left-6", "bottom-4 right-6"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-sm font-mono text-[var(--primary)] opacity-35 pointer-events-none select-none z-10`}>+</div>
            ))}

            {/* Giant Watermark GOHUL */}
            <div
                ref={topWatermarkRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
            >
                <span
                    className="font-black uppercase"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(5rem, 25vw, 28rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "var(--text)",
                        opacity: 0.065,
                        whiteSpace: "nowrap",
                    }}
                >
                    GOHUL
                </span>
            </div>

            {/* ── TOP ROW ── Bio Left only */}
            <div className="relative z-10 w-full flex flex-row items-start pt-24 md:pt-28">

                {/* Bio – Upper Left */}
                <div className="hero-bio-text flex flex-col gap-2 max-w-[220px] md:max-w-[280px]">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[var(--primary)] opacity-60">+</span>
                        <div className="h-px w-6 bg-[var(--primary)] opacity-40" />
                    </div>
                    <p
                        className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase leading-loose"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)" }}
                    >
                        I design user-centered digital experiences that are simple, smart and impactful.
                    </p>
                </div>
            </div>

            {/* ── CENTER SPACER ── fills space between top and bottom rows */}
            <div className="flex-1" />

            {/* ── BOTTOM ROW ── ©Year + GOHUL name | Explore My Work Card */}
            <div className="relative z-10 w-full flex flex-row items-end justify-between gap-4 pb-5 md:pb-8">

                {/* Big name – Bottom Left */}
                <div className="flex flex-col items-start leading-none">
                    <span
                        className="font-bold uppercase tracking-[0.25em] mb-0.5"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "clamp(9px, 1.2vw, 13px)",
                            color: "var(--text-muted)",
                        }}
                    >
                        ©2026
                    </span>
                    <h1
                        ref={bottomTitleRef}
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "clamp(2.8rem, 9vw, 8rem)",
                            lineHeight: 0.85,
                            letterSpacing: "-0.03em",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "var(--text)",
                        }}
                    >
                        GOHUL
                    </h1>
                </div>

                {/* Explore My Work Card – Bottom Right */}
                <a
                    href="#projects"
                    ref={cardRef}
                    className="group flex items-center gap-3 glass border border-[var(--glass-border)] rounded-2xl p-2.5 pr-3.5 shadow-2xl shrink-0 transition-all duration-300 hover:border-[var(--primary)] hover:shadow-[0_8px_28px_var(--primary-glow)]"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--border)]/20 shrink-0 p-1">
                        <img src={heroImage} alt="Gohul Avatar" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[var(--primary)]">
                            Explore My Work
                        </span>
                        <span className="text-sm md:text-base font-extrabold text-[var(--text)] leading-tight">
                            Gohul
                        </span>
                        <span className="text-[8px] md:text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            Frontend & UI Developer
                        </span>
                    </div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shrink-0 ml-1 group-hover:scale-110 transition-transform shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default Hero;