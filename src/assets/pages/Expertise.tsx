import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
    name: string;
    category: 'frontend' | 'backend' | 'design' | 'tools';
    level: number; // 0-100
    icon: string;
}

const techStack: TechItem[] = [
    { name: "React", category: "frontend", level: 95, icon: "⚛️" },
    { name: "TypeScript", category: "frontend", level: 90, icon: "TS" },
    { name: "Next.js", category: "frontend", level: 80, icon: "▲" },
    { name: "Node.js", category: "backend", level: 75, icon: "⬢" },
    { name: "MongoDB", category: "backend", level: 72, icon: "🍃" },
    { name: "PostgreSQL", category: "backend", level: 70, icon: "⊡" },
    { name: "Tailwind CSS", category: "frontend", level: 92, icon: "🎨" },
    { name: "GSAP", category: "frontend", level: 88, icon: "◈" },
    { name: "Docker", category: "tools", level: 65, icon: "🐳" },
    { name: "Git & GitHub", category: "tools", level: 90, icon: "⌥" },
    { name: "Figma", category: "design", level: 85, icon: "◉" },
    { name: "REST APIs", category: "backend", level: 88, icon: "⚡" },
];

const expertiseDomains = [
    {
        id: "01",
        title: "Frontend Engineering",
        subtitle: "Crafting fluid, high-performance web applications with modular architecture & pixel-perfect precision.",
        highlights: ["React / Next.js Frameworks", "State Management & Performance", "GSAP Micro-Interactions", "Responsive Design Systems"],
        metric: "95%",
        metricLabel: "UI Precision",
    },
    {
        id: "02",
        title: "Backend & Systems",
        subtitle: "Architecting reliable servers, database models, and scalable API layers built for endurance.",
        highlights: ["RESTful & GraphQL APIs", "PostgreSQL & MongoDB", "Authentication & Security", "Server-side Rendering"],
        metric: "80%",
        metricLabel: "System Scale",
    },
    {
        id: "03",
        title: "UI/UX & Design Systems",
        subtitle: "Blending user psychology with modern visual design to deliver intuitive, memorable interfaces.",
        highlights: ["Component Libraries", "Interactive Motion Design", "Design-to-Code Systems", "User Experience Auditing"],
        metric: "90%",
        metricLabel: "Design Score",
    },
];

const Expertise = () => {
    const container = useRef<HTMLElement>(null);
    const [activeDomain, setActiveDomain] = useState<string | null>(null);
    const [hoveredTech, setHoveredTech] = useState<number | null>(null);

    useGSAP(() => {
        // Header reveal
        gsap.fromTo(".expertise-header-new",
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: container.current, start: "top 75%" }
            }
        );

        // Domain rows stagger
        gsap.fromTo(".domain-row",
            { x: -60, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
                scrollTrigger: { trigger: ".domains-container", start: "top 75%" }
            }
        );

        // Tech orbit items
        gsap.fromTo(".orbit-item",
            { scale: 0, opacity: 0 },
            {
                scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.7)",
                scrollTrigger: { trigger: ".tech-orbit-section", start: "top 80%" }
            }
        );

        // Marquee animation
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            gsap.to(marqueeTrack, {
                xPercent: -50,
                duration: 30,
                ease: "none",
                repeat: -1,
            });
        }

        // Bar fill animations
        gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach(bar => {
            const width = bar.dataset.width || "0%";
            gsap.fromTo(bar,
                { width: "0%" },
                {
                    width: width,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: { trigger: bar, start: "top 90%" }
                }
            );
        });

    }, { scope: container });

    return (
        <section id="expertise" ref={container} className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-40 text-[var(--text)] overflow-hidden">
            {/* Background Glow Mesh */}
            <div
                className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(2,132,199,0.12) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />
            <div
                className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="max-w-7xl mx-auto">

                {/* ─── Header ─── */}
                <div className="expertise-header-new mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]" />
                        <span className="text-xs font-bold tracking-[0.4em] uppercase text-[var(--primary)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Capabilities & Mastery
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2 className="text-[clamp(2.5rem,6vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-tight">
                            Technical <br />
                            <span
                                className="italic"
                                style={{
                                    background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >Prowess</span>
                        </h2>
                        <p className="text-[var(--text-muted)] text-base md:text-lg font-light leading-relaxed max-w-md lg:text-right">
                            Engineering robust software solutions, building fluid user interfaces, and shaping complete digital experiences.
                        </p>
                    </div>
                </div>

                {/* ─── Domain Showcase — Expandable Rows ─── */}
                <div className="domains-container mb-24">
                    {expertiseDomains.map((domain, index) => {
                        const isActive = activeDomain === domain.id;
                        return (
                            <div
                                key={domain.id}
                                className="domain-row group"
                                onClick={() => setActiveDomain(isActive ? null : domain.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Main row */}
                                <div
                                    className="flex items-center justify-between py-8 md:py-10 transition-all duration-500"
                                    style={{
                                        borderTop: index === 0 ? "1px solid var(--glass-border)" : "none",
                                        borderBottom: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <div className="flex items-center gap-6 md:gap-10">
                                        {/* Number */}
                                        <span
                                            className="text-xs font-bold tracking-widest transition-colors duration-300"
                                            style={{
                                                color: isActive ? "var(--primary)" : "var(--text-muted)",
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            }}
                                        >
                                            {domain.id}
                                        </span>

                                        {/* Title */}
                                        <h3
                                            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500"
                                            style={{
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                color: isActive ? "var(--primary)" : "var(--text)",
                                                transform: isActive ? "translateX(8px)" : "translateX(0)",
                                            }}
                                        >
                                            {domain.title}
                                        </h3>
                                    </div>

                                    {/* Right side — metric + toggle */}
                                    <div className="flex items-center gap-6 md:gap-10">
                                        <div className="hidden md:block text-right">
                                            <span className="text-2xl font-black" style={{ color: "var(--primary)" }}>
                                                {domain.metric}
                                            </span>
                                            <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                                                {domain.metricLabel}
                                            </p>
                                        </div>

                                        {/* Toggle icon */}
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                                            style={{
                                                border: "1px solid var(--glass-border)",
                                                background: isActive ? "var(--primary)" : "transparent",
                                                transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M7 1V13M1 7H13" stroke={isActive ? "white" : "var(--text-muted)"} strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded content */}
                                <div
                                    className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                    style={{
                                        maxHeight: isActive ? "400px" : "0px",
                                        opacity: isActive ? 1 : 0,
                                    }}
                                >
                                    <div className="py-8 md:py-10 pl-12 md:pl-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <p className="text-base font-light leading-relaxed text-[var(--text-muted)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {domain.subtitle}
                                        </p>
                                        <ul className="space-y-3">
                                            {domain.highlights.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm font-medium text-[var(--text)]">
                                                    <span
                                                        className="w-6 h-px"
                                                        style={{
                                                            background: "var(--primary)",
                                                            boxShadow: "0 0 6px var(--primary-glow)",
                                                        }}
                                                    />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ─── Tech Orbit — Interactive Grid ─── */}
                <div className="tech-orbit-section">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-8 h-px bg-[var(--primary)]" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Technologies & Tools
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className="orbit-item relative group"
                                onMouseEnter={() => setHoveredTech(i)}
                                onMouseLeave={() => setHoveredTech(null)}
                            >
                                <div
                                    className="relative p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-500"
                                    style={{
                                        background: hoveredTech === i ? "rgba(255,255,255,0.9)" : "var(--glass-bg)",
                                        backdropFilter: "blur(20px) saturate(180%)",
                                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                                        border: `1px solid ${hoveredTech === i ? "var(--primary)" : "var(--glass-border)"}`,
                                        boxShadow: hoveredTech === i
                                            ? "0 20px 50px rgba(2,132,199,0.15), 0 0 30px var(--primary-glow)"
                                            : "0 4px 20px rgba(15,23,42,0.04)",
                                        transform: hoveredTech === i ? "translateY(-6px)" : "translateY(0)",
                                    }}
                                >
                                    {/* Icon */}
                                    <span
                                        className="text-3xl transition-transform duration-500"
                                        style={{
                                            transform: hoveredTech === i ? "scale(1.2)" : "scale(1)",
                                            filter: hoveredTech === i ? "drop-shadow(0 0 8px var(--primary-glow))" : "none",
                                        }}
                                    >
                                        {tech.icon}
                                    </span>

                                    {/* Name */}
                                    <span className="text-xs font-bold tracking-wide text-[var(--text)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {tech.name}
                                    </span>

                                    {/* Skill bar */}
                                    <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "var(--glass-border)" }}>
                                        <div
                                            className="skill-bar-fill h-full rounded-full"
                                            data-width={`${tech.level}%`}
                                            style={{
                                                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                                                boxShadow: "0 0 8px var(--primary-glow)",
                                            }}
                                        />
                                    </div>

                                    {/* Level label on hover */}
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                                        style={{
                                            color: hoveredTech === i ? "var(--primary)" : "var(--text-muted)",
                                            opacity: hoveredTech === i ? 1 : 0.5,
                                        }}
                                    >
                                        {tech.level}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Marquee Strip ─── */}
                <div
                    className="mt-20 py-6 -mx-6 md:-mx-16 lg:-mx-24 xl:-mx-40 overflow-hidden"
                    style={{
                        borderTop: "1px solid var(--glass-border)",
                        borderBottom: "1px solid var(--glass-border)",
                    }}
                >
                    <div className="marquee-track flex items-center gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
                        {[...techStack, ...techStack].map((tech, i) => (
                            <span
                                key={i}
                                className="text-[clamp(1.2rem,3vw,2rem)] font-black uppercase tracking-tight"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    color: i % 3 === 0 ? "var(--primary)" : "var(--text-muted)",
                                    opacity: i % 3 === 0 ? 0.9 : 0.25,
                                }}
                            >
                                {tech.name}
                                <span className="inline-block mx-6 text-xs opacity-30">◆</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
