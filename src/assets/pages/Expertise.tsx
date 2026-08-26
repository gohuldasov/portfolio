import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
    name: string;
    icon: string;
}

interface DomainItem {
    id: string;
    title: string;
    subtitle: string;
    highlights: string[];
    skills: SkillItem[];
}

const expertiseDomains: DomainItem[] = [
    {
        id: "01",
        title: "Programming Languages",
        subtitle: "Writing clean, type-safe, and maintainable logic across full-stack software applications.",
        highlights: ["Python Application Logic", "JavaScript (ES6+) Core", "TypeScript Type Safety", "HTML5 & CSS3 Web Standards"],
        skills: [
            { name: "Python", icon: "🐍" },
            { name: "JavaScript (ES6+)", icon: "⚡" },
            { name: "TypeScript", icon: "📘" },
            { name: "HTML5", icon: "🌐" },
            { name: "CSS3", icon: "🎨" },
        ],
    },
    {
        id: "02",
        title: "Backend & RESTful APIs",
        subtitle: "Architecting secure server applications, database models, and RESTful API endpoints built for scale.",
        highlights: ["Django & Django REST Framework", "RESTful API Integration & Specs", "Authentication & Middleware", "Database Management & Queries"],
        skills: [
            { name: "Django", icon: "🎸" },
            { name: "Django REST Framework", icon: "🔌" },
            { name: "REST APIs", icon: "⚡" },
        ],
    },
    {
        id: "03",
        title: "Frontend & UI Frameworks",
        subtitle: "Building dynamic, state-driven interfaces and responsive user experiences with modern design systems.",
        highlights: ["React.js Component Design", "Redux Toolkit State Flow", "Tailwind CSS & Responsive Layouts", "Ant Design, Hero UI & Bootstrap"],
        skills: [
            { name: "React.js", icon: "⚛️" },
            { name: "Redux Toolkit", icon: "🔄" },
            { name: "Tailwind CSS", icon: "💨" },
            { name: "Bootstrap", icon: "🎯" },
            { name: "Hero UI", icon: "✨" },
            { name: "Ant Design", icon: "🐜" },
        ],
    },
    {
        id: "04",
        title: "Databases & Storage",
        subtitle: "Designing relational database schemas, query optimization, and reliable datastore management.",
        highlights: ["PostgreSQL Production Databases", "MySQL Relational Schemas", "SQLite Embedded Datastores", "ORM Query Tuning"],
        skills: [
            { name: "PostgreSQL", icon: "🐘" },
            { name: "MySQL", icon: "🐬" },
            { name: "SQLite", icon: "🗄️" },
        ],
    },
    {
        id: "05",
        title: "Tools & Cloud Platforms",
        subtitle: "Streamlining version control, Linux environments, cloud deployments, and rapid development tools.",
        highlights: ["Git & GitHub Collaboration", "Linux Operating System", "Vercel Cloud Hosting", "Lovable & Modern Tooling"],
        skills: [
            { name: "Git & GitHub", icon: "🐙" },
            { name: "Linux", icon: "🐧" },
            { name: "Windows", icon: "💻" },
            { name: "Vercel", icon: "▲" },
            { name: "Lovable", icon: "🪄" },
            { name: "MS Office", icon: "📊" },
        ],
    },
];

// Flatten all skills for the marquee strip
const allSkills = expertiseDomains.flatMap(domain => domain.skills);

const Expertise = () => {
    const container = useRef<HTMLElement>(null);
    const [activeDomain, setActiveDomain] = useState<string | null>("01");

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

        // Continuous Marquee Loop
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            gsap.to(marqueeTrack, {
                xPercent: -50,
                duration: 25,
                ease: "none",
                repeat: -1,
            });
        }

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

                {/* Header */}
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
                            Engineering robust software solutions, building fluid user interfaces, and shaping complete cloud digital experiences.
                        </p>
                    </div>
                </div>

                {/* Domain Showcase */}
                <div className="domains-container mb-20">
                    {expertiseDomains.map((domain, index) => {
                        const isActive = activeDomain === domain.id;
                        return (
                            <div
                                key={domain.id}
                                className="domain-row group"
                                onClick={() => setActiveDomain(isActive ? null : domain.id)}
                                style={{ cursor: "pointer" }}
                            >
                                {/* Main Row */}
                                <div
                                    className="flex items-center justify-between py-8 md:py-10 transition-all duration-500"
                                    style={{
                                        borderTop: index === 0 ? "1px solid var(--glass-border)" : "none",
                                        borderBottom: "1px solid var(--glass-border)",
                                    }}
                                >
                                    <div className="flex items-center gap-6 md:gap-10">
                                        <span
                                            className="text-xs font-bold tracking-widest transition-colors duration-300"
                                            style={{
                                                color: isActive ? "var(--primary)" : "var(--text-muted)",
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            }}
                                        >
                                            {domain.id}
                                        </span>

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

                                    {/* Toggle Icon */}
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

                                {/* Expanded Content */}
                                <div
                                    className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                    style={{
                                        maxHeight: isActive ? "600px" : "0px",
                                        opacity: isActive ? 1 : 0,
                                    }}
                                >
                                    <div className="py-8 md:py-10 pl-4 md:pl-12 flex flex-col gap-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                                        {/* Inline Skill Chips */}
                                        <div className="pt-2">
                                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)] block mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                Core Capabilities
                                            </span>

                                            <div className="flex flex-wrap items-center gap-3">
                                                {domain.skills.map((skill, i) => (
                                                    <div
                                                        key={i}
                                                        className="group/chip flex items-center gap-3 py-2 px-4 rounded-full transition-all duration-300 hover:border-[var(--primary)]"
                                                        style={{
                                                            background: "rgba(255,255,255,0.03)",
                                                            border: "1px solid var(--glass-border)",
                                                        }}
                                                    >
                                                        <span className="text-base">{skill.icon}</span>
                                                        <span className="text-xs font-semibold text-[var(--text)] tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Marquee Strip */}
                <div
                    className="mt-16 py-6 -mx-6 md:-mx-16 lg:-mx-24 xl:-mx-40 overflow-hidden"
                    style={{
                        borderTop: "1px solid var(--glass-border)",
                        borderBottom: "1px solid var(--glass-border)",
                    }}
                >
                    <div className="marquee-track flex items-center gap-12 whitespace-nowrap" style={{ width: "max-content" }}>
                        {[...allSkills, ...allSkills].map((tech, i) => (
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