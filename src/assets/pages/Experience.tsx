import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const allExperiences = [
    {
        role: "Fullstack Developer",
        company: "Cloudhouse Technology",
        period: "2025 — 2026",
        description: "Leading frontend initiatives and building enterprise-grade insurance software solutions with React and TypeScript.",
        tech: ["React", "TypeScript", "Node.js"],
    },
    {
        role: "Fullstack Developer Intern",
        company: "Luminar TechnoHub",
        period: "2024 — 2025",
        description: "Empowering developers through high-quality educational content, design systems, and open-source contributions.",
        tech: ["Next.js", "MongoDB", "Tailwind"],
    },
];

const Experience = () => {
    const container = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

    useGSAP(() => {
        gsap.fromTo(".exp-header",
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: container.current, start: "top 75%" }
            }
        );
        gsap.fromTo(".exp-row",
            { x: 50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
                scrollTrigger: { trigger: ".exp-list", start: "top 75%" }
            }
        );
    }, { scope: container, dependencies: [displayedExperiences] });

    return (
        <section id="experience" ref={container} className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="exp-header mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                        <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: "var(--primary)", fontFamily: "Cinzel, serif" }}>
                            Career Path
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2 className="text-[clamp(2.5rem,6vw,7rem)] font-bold uppercase leading-[0.88] tracking-tight"
                            style={{ fontFamily: "Cinzel, serif" }}
                        >
                            Experience<br />
                            <span style={{
                                fontStyle: "italic",
                                background: "linear-gradient(135deg, var(--text-muted) 0%, rgba(255,255,255,0.1) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>History</span>
                        </h2>
                        <p className="text-lg font-light leading-relaxed max-w-sm lg:text-right"
                            style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}
                        >
                            Partnering with industry leaders to build products that define the digital landscape.
                        </p>
                    </div>
                </div>

                {/* List */}
                <div className="exp-list">
                    {displayedExperiences.map((exp, index) => (
                        <div
                            key={index}
                            className="exp-row group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 transition-all duration-500 cursor-default"
                            style={{ borderBottom: "1px solid var(--glass-border)" }}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.background = "var(--glass-bg)";
                                el.style.backdropFilter = "blur(16px)";
                                el.style.padding = "40px 24px";
                                el.style.borderRadius = "20px";
                                el.style.marginLeft = "-24px";
                                el.style.marginRight = "-24px";
                                el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.background = "transparent";
                                el.style.backdropFilter = "none";
                                el.style.padding = "40px 0";
                                el.style.borderRadius = "0";
                                el.style.marginLeft = "0";
                                el.style.marginRight = "0";
                                el.style.boxShadow = "none";
                            }}
                        >
                            {/* Left */}
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest"
                                    style={{ color: "var(--text-muted)", fontFamily: "Cinzel, serif" }}
                                >
                                    {exp.period}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300"
                                    style={{ fontFamily: "Cinzel, serif", color: "var(--text)" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                                >
                                    {exp.role}
                                </h3>
                                <p className="text-base italic font-light" style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "17px" }}>
                                    @{exp.company}
                                </p>
                            </div>

                            {/* Right */}
                            <div className="mt-5 md:mt-0 md:text-right md:max-w-xs lg:max-w-sm">
                                <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>
                                    {exp.description}
                                </p>
                                <div className="flex md:justify-end flex-wrap gap-2">
                                    {exp.tech.map(t => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                                            style={{
                                                background: "var(--glass-bg)",
                                                border: "1px solid var(--glass-border)",
                                                color: "var(--text-muted)",
                                                backdropFilter: "blur(8px)",
                                                fontFamily: "Cinzel, serif",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Show more */}
                    {allExperiences.length > 4 && (
                        <div className="mt-16 flex justify-end">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase cursor-none"
                                style={{ color: "var(--text-muted)", fontFamily: "Cinzel, serif" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                            >
                                <span className="pb-1" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                    {showAll ? "Show Less" : "Explore All History"}
                                </span>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                                    style={{
                                        background: "var(--glass-bg)",
                                        border: "1px solid var(--glass-border)",
                                        backdropFilter: "blur(10px)",
                                        transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
