import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const allExperiences = [
    {
        number: "01",
        role: "Fullstack Developer",
        company: "Cloudhouse Technology",
        location: "Kochi, Kerala",
        period: "2025 — 2026",
        type: "Full-Time",
        description: "Leading frontend initiatives and building enterprise-grade insurance software solutions with React and TypeScript.",
        tech: ["React", "TypeScript", "Node.js", "Tailwind", "REST APIs"],
        achievements: ["Lead Frontend Developer", "Enterprise Scale Architecture"]
    },
    {
        number: "02",
        role: "Fullstack Developer Intern",
        company: "Luminar TechnoHub",
        location: "Kochi, Kerala",
        period: "2024 — 2025",
        type: "Internship",
        description: "Empowering developers through high-quality educational content, design systems, and open-source contributions.",
        tech: ["Next.js", "MongoDB", "Tailwind", "Node.js", "Express"],
        achievements: ["Best Intern Award", "Design System Lead"]
    },
];

const Experience = () => {
    const container = useRef<HTMLElement>(null);
    const journeyListRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) {
                gsap.set(
                    [
                        ".exp-header",
                        ".exp-milestone-card",
                        ".exp-number-badge",
                        ".exp-timeline-line-growth",
                    ],
                    { opacity: 1, y: 0, scale: 1, height: "100%" }
                );
                return;
            }

            // Header reveal
            gsap.fromTo(
                ".exp-header",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 75%",
                    },
                }
            );

            // Timeline line growth on scroll
            if (journeyListRef.current) {
                gsap.fromTo(
                    ".exp-timeline-line-growth",
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: journeyListRef.current,
                            start: "top 70%",
                            end: "bottom 80%",
                            scrub: 0.5,
                        },
                    }
                );
            }

            // Staggered entrance for milestone cards
            gsap.fromTo(
                ".exp-milestone-card",
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.18,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: journeyListRef.current,
                        start: "top 75%",
                    },
                }
            );
        },
        { scope: container, dependencies: [displayedExperiences] }
    );

    return (
        <section
            id="experience"
            ref={container}
            className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="exp-header mb-16 lg:mb-20">
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
                            Career Path
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2
                            className="text-[clamp(2.5rem,6vw,7rem)] font-bold uppercase leading-[0.88] tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Experience<br />
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
                                History
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
                            Partnering with industry leaders to build products that define the digital landscape.
                        </p>
                    </div>
                </div>

                {/* Alternating Timeline */}
                <div ref={journeyListRef} className="relative w-full">
                    {/* Central Line Track */}
                    <div
                        className="absolute left-3 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] rounded-full pointer-events-none"
                        style={{ background: "var(--glass-border)" }}
                        aria-hidden="true"
                    >
                        <div
                            className="exp-timeline-line-growth w-full h-full origin-top rounded-full"
                            style={{
                                background: "var(--primary)",
                                boxShadow: "0 0 10px var(--primary-glow)",
                            }}
                        />
                    </div>

                    {/* Milestone Items */}
                    {displayedExperiences.map((exp, index) => {
                        const isEven = index % 2 === 0; // index 0 -> Left, index 1 -> Right
                        return (
                            <div
                                key={index}
                                className="relative w-full mb-12 md:mb-16 last:mb-0 flex flex-col md:flex-row items-stretch"
                            >
                                {/* Milestone Dot on Line */}
                                <div
                                    className="absolute left-3 md:left-1/2 -translate-x-1/2 top-5 w-4 h-4 rounded-full z-10 pointer-events-none transition-transform duration-300"
                                    style={{
                                        border: "2px solid var(--primary)",
                                        background: "var(--background)",
                                        boxShadow: "0 0 12px var(--primary-glow)",
                                    }}
                                    aria-hidden="true"
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        style={{ background: "var(--primary)" }}
                                    />
                                </div>

                                {/* Milestone Item */}
                                <div
                                    className={`w-full pl-10 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                                        isEven ? "md:mr-auto" : "md:ml-auto"
                                    }`}
                                >
                                    <article
                                        className="exp-milestone-card group relative p-2 sm:p-4 transition-all duration-300 cursor-default"
                                        style={{
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}
                                    >
                                        <div className="flex flex-col gap-5">
                                            {/* Meta Header */}
                                            <div
                                                className="flex flex-wrap items-center justify-between gap-4 pb-4"
                                                style={{ borderBottom: "1px solid var(--glass-border)" }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className="exp-number-badge font-bold text-xs px-2.5 py-1 rounded-md tracking-wider flex items-center justify-center select-none"
                                                        style={{
                                                            background: "rgba(2, 132, 199, 0.1)",
                                                            border: "1px solid rgba(2, 132, 199, 0.25)",
                                                            color: "var(--primary)",
                                                        }}
                                                    >
                                                        {exp.number || `0${index + 1}`}
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-sm font-semibold"
                                                            style={{ color: "var(--text)" }}
                                                        >
                                                            @{exp.company}
                                                        </span>
                                                        {exp.location && (
                                                            <span
                                                                className="text-xs font-medium"
                                                                style={{ color: "var(--text-muted)" }}
                                                            >
                                                                {exp.location}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <span
                                                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                                    style={{
                                                        background: "rgba(2, 132, 199, 0.1)",
                                                        border: "1px solid rgba(2, 132, 199, 0.25)",
                                                        color: "var(--primary)",
                                                    }}
                                                >
                                                    {exp.period}
                                                </span>
                                            </div>

                                            {/* Main Info */}
                                            <div>
                                                <h3
                                                    className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 transition-colors duration-300"
                                                    style={{ color: "var(--text)" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                                                >
                                                    {exp.role}
                                                </h3>
                                                <p
                                                    className="text-base font-light leading-relaxed"
                                                    style={{ color: "var(--text-muted)", fontSize: "16px" }}
                                                >
                                                    {exp.description}
                                                </p>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {exp.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
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
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show more button if needed */}
                {allExperiences.length > 4 && (
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase cursor-none"
                            style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                        >
                            <span className="pb-1" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                {showAll ? "Show Less" : "Explore All History"}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Experience;
