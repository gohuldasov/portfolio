import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { educationData } from "../../components/education/educationData";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const containerRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (prefersReducedMotion) return;

            // Header reveal
            gsap.fromTo(
                ".edu-header",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Staggered card grid reveal
            gsap.fromTo(
                ".edu-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 75%",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="education"
            ref={containerRef}
            aria-label="Education and Academic Background"
            className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="edu-header mb-16 lg:mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div
                            className="w-14 h-px"
                            style={{
                                background: "var(--primary)",
                                boxShadow: "0 0 8px var(--primary-glow)",
                            }}
                        />
                        <span
                            className="text-xs font-bold tracking-[0.4em] uppercase"
                            style={{
                                color: "var(--primary)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            Academic Background
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2
                            className="text-[clamp(2.5rem,6vw,7rem)] font-bold uppercase leading-[0.88] tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Education &<br />
                            <span
                                style={{
                                    fontStyle: "italic",
                                    background:
                                        "linear-gradient(135deg, var(--text-muted) 0%, rgba(2, 132, 199, 0.4) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Degrees
                            </span>
                        </h2>
                        <p
                            className="text-lg font-light leading-relaxed max-w-sm lg:text-right"
                            style={{
                                color: "var(--text-muted)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "18px",
                            }}
                        >
                            Foundational computer science principles paired with modern industry engineering practices.
                        </p>
                    </div>
                </div>

                {/* Minimalist Glass Card Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                    {educationData.map((edu) => (
                        <div
                            key={edu.id}
                            className="edu-card group relative p-8 rounded-[24px] flex flex-col justify-between transition-all duration-500 cursor-default hover:-translate-y-2"
                            style={{
                                background: "var(--glass-bg)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid var(--glass-border)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.borderColor = "var(--primary)";
                                el.style.boxShadow = "0 16px 40px rgba(15, 23, 42, 0.12), 0 0 24px var(--primary-glow)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.borderColor = "var(--glass-border)";
                                el.style.boxShadow = "none";
                            }}
                        >
                            {/* Card Glow Bar */}
                            <div
                                className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                                style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
                                aria-hidden="true"
                            />

                            <div>
                                {/* Top Meta Badges */}
                                <div className="flex items-center justify-between gap-3 mb-6 pb-4" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                    <div className="flex items-center gap-2.5">
                                        <span
                                            className="font-bold text-xs px-2.5 py-1 rounded-md tracking-wider flex items-center justify-center select-none"
                                            style={{
                                                background: "rgba(2, 132, 199, 0.12)",
                                                border: "1px solid rgba(2, 132, 199, 0.3)",
                                                color: "var(--primary)",
                                            }}
                                        >
                                            {edu.number}
                                        </span>
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.05)",
                                                border: "1px solid var(--glass-border)",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {edu.type}
                                        </span>
                                    </div>
                                    <span
                                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                        style={{
                                            background: "rgba(2, 132, 199, 0.1)",
                                            border: "1px solid rgba(2, 132, 199, 0.25)",
                                            color: "var(--primary)",
                                        }}
                                    >
                                        {edu.period}
                                    </span>
                                </div>

                                {/* Institution & Degree Title */}
                                <div className="mb-4">
                                    <span
                                        className="block text-xs font-semibold mb-2"
                                        style={{ color: "var(--primary)" }}
                                    >
                                        @{edu.institution}
                                    </span>
                                    <h3
                                        className="text-2xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[var(--primary)]"
                                        style={{ color: "var(--text)" }}
                                    >
                                        {edu.degree}
                                    </h3>
                                    <span
                                        className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-md mb-4"
                                        style={{
                                            background: "rgba(2, 132, 199, 0.08)",
                                            border: "1px solid rgba(2, 132, 199, 0.2)",
                                            color: "var(--primary)",
                                        }}
                                    >
                                        {edu.grade}
                                    </span>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-sm font-light leading-relaxed mb-6"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    {edu.description}
                                </p>
                            </div>

                            {/* Tech & Coursework Tags at Bottom */}
                            <div className="pt-4 border-t border-white/5">
                                <span
                                    className="block text-[10px] font-bold uppercase tracking-widest mb-2"
                                    style={{ color: "var(--text-muted)" }}
                                >
                                    Key Focus Areas
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {edu.technologies.slice(0, 4).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
                                            style={{
                                                background: "rgba(2, 132, 199, 0.08)",
                                                border: "1px solid rgba(2, 132, 199, 0.2)",
                                                color: "var(--primary)",
                                            }}
                                        >
                                            <span
                                                className="w-1 h-1 rounded-full"
                                                style={{ background: "var(--primary)" }}
                                                aria-hidden="true"
                                            />
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
