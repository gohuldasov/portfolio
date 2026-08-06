import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const awardsList = [
    {
        title: "Star Performer of the Year",
        period: "2024",
        issuer: "Cloudhouse Technology",
        category: "Engineering Excellence",
        description: "Awarded for leadership in architecting enterprise applications, optimizing performance, and driving team innovation.",
        tags: ["Performance", "Architecture", "Leadership"],
    },
    {
        title: "Best Beginner Hack Winner",
        period: "2024",
        issuer: "MLH Global Hackathon",
        category: "Hackathon",
        description: "Built an AI-powered accessibility solution for visually impaired users in under 36 hours.",
        tags: ["AI", "React", "Accessibility"],
    },
    {
        title: "NASA Space Apps Finalist",
        period: "2023",
        issuer: "NASA Space Apps Challenge",
        category: "Global Competition",
        description: "Developed interactive satellite data visualizers for tracking real-time atmospheric changes.",
        tags: ["Data Viz", "TypeScript", "Space Apps"],
    },
    {
        title: "Open Source Contributor Award",
        period: "2023",
        issuer: "GitHub Stars Program",
        category: "Open Source",
        description: "Recognized for high-impact contributions to developer tooling and community UI libraries.",
        tags: ["Open Source", "Tooling", "Community"],
    },
    {
        title: "Innovative UI Design Winner",
        period: "2023",
        issuer: "Dribbble Design Collective",
        category: "UI/UX Design",
        description: "Honored for creating state-of-the-art glassmorphism design systems and fluid micro-animations.",
        tags: ["Design System", "Motion", "Figma"],
    },
    {
        title: "Excellence in Web Engineering",
        period: "2022",
        issuer: "Dev.to Technical Writing",
        category: "Technical Writing",
        description: "Top author award for published articles on React performance optimization and modern state management.",
        tags: ["Technical Writing", "React", "Web Perf"],
    }
];

const Awards = () => {
    const container = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    const displayedAwards = showAll ? awardsList : awardsList.slice(0, 4);

    useGSAP(() => {
        gsap.fromTo(
            ".awards-header",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                }
            }
        );

        gsap.fromTo(
            ".award-row",
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".awards-list",
                    start: "top 75%",
                }
            }
        );
    }, { scope: container, dependencies: [displayedAwards] });

    return (
        <section
            id="awards"
            ref={container}
            className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header matching Experience.tsx & About.tsx */}
                <div className="awards-header mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                        <span
                            className="text-xs font-bold tracking-[0.4em] uppercase"
                            style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Honors & Accolades
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2
                            className="text-[clamp(2.5rem,6vw,7rem)] font-bold uppercase leading-[0.88] tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Awards &<br />
                            <span
                                style={{
                                    fontStyle: "italic",
                                    background: "linear-gradient(135deg, var(--text-muted) 0%, rgba(0, 0, 0, 0.45) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Recognition
                            </span>
                        </h2>
                        <p
                            className="text-lg font-light leading-relaxed max-w-sm lg:text-right"
                            style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "18px" }}
                        >
                            Recognition from industry leaders, global hackathons, and design communities.
                        </p>
                    </div>
                </div>

                {/* List with identical row hover structure as Experience.tsx */}
                <div className="awards-list">
                    {displayedAwards.map((award, index) => (
                        <div
                            key={index}
                            className="award-row group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 transition-all duration-500 cursor-default"
                            style={{ borderBottom: "1px solid var(--glass-border)" }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "var(--glass-bg)";
                                el.style.backdropFilter = "blur(16px)";
                                el.style.padding = "40px 24px";
                                el.style.borderRadius = "20px";
                                el.style.marginLeft = "-24px";
                                el.style.marginRight = "-24px";
                                el.style.boxShadow = "0 8px 32px rgba(15, 23, 42, 0.08)";
                            }}
                            onMouseLeave={(e) => {
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
                            {/* Left side */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-widest"
                                        style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {award.period}
                                    </span>
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                        style={{
                                            background: "rgba(2, 132, 199, 0.1)",
                                            border: "1px solid rgba(2, 132, 199, 0.2)",
                                            color: "var(--primary)",
                                        }}
                                    >
                                        {award.category}
                                    </span>
                                </div>
                                <h3
                                    className="text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                                >
                                    {award.title}
                                </h3>
                                <p
                                    className="text-base italic font-light"
                                    style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "17px" }}
                                >
                                    @{award.issuer}
                                </p>
                            </div>

                            {/* Right side */}
                            <div className="mt-5 md:mt-0 md:text-right md:max-w-xs lg:max-w-sm">
                                <p
                                    className="text-sm font-light leading-relaxed mb-4"
                                    style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px" }}
                                >
                                    {award.description}
                                </p>
                                <div className="flex md:justify-end flex-wrap gap-2">
                                    {award.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                                            style={{
                                                background: "var(--glass-bg)",
                                                border: "1px solid var(--glass-border)",
                                                color: "var(--text-muted)",
                                                backdropFilter: "blur(8px)",
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Show more button */}
                    {awardsList.length > 4 && (
                        <div className="mt-16 flex justify-end">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="group flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase cursor-pointer"
                                style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                            >
                                <span className="pb-1" style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                    {showAll ? "Show Less" : "Explore All Honors"}
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

export default Awards;
