import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
    name: string;
    category: 'frontend' | 'backend' | 'design' | 'tools';
    level: string;
    icon: string;
}

const techStack: TechItem[] = [
    { name: "React", category: "frontend", level: "Advanced", icon: "⚛️" },
    { name: "TypeScript", category: "frontend", level: "Advanced", icon: "📘" },
    { name: "Next.js", category: "frontend", level: "Intermediate", icon: "▲" },
    { name: "Node.js", category: "backend", level: "Intermediate", icon: "🌐" },
    { name: "MongoDB", category: "backend", level: "Intermediate", icon: "🍃" },
    { name: "PostgreSQL", category: "backend", level: "Intermediate", icon: "🐘" },
    { name: "Tailwind CSS", category: "frontend", level: "Advanced", icon: "🎨" },
    { name: "GSAP", category: "frontend", level: "Advanced", icon: "🎭" },
    { name: "Docker", category: "tools", level: "Intermediate", icon: "🐳" },
    { name: "Git & GitHub", category: "tools", level: "Advanced", icon: "🌿" },
    { name: "Figma", category: "design", level: "Advanced", icon: "🎨" },
    { name: "REST APIs", category: "backend", level: "Advanced", icon: "⚡" },
];

const expertiseDomains = [
    {
        id: "01",
        title: "Frontend Engineering",
        subtitle: "Crafting fluid, high-performance web applications with modular architecture & pixel-perfect precision.",
        highlights: ["React / Next.js Frameworks", "State Management & Performance", "GSAP Micro-Interactions", "Responsive Design Systems"],
        color: "var(--primary)",
    },
    {
        id: "02",
        title: "Backend & Systems",
        subtitle: "Architecting reliable servers, database models, and scalable API layers built for endurance.",
        highlights: ["RESTful & GraphQL APIs", "PostgreSQL & MongoDB", "Authentication & Security", "Server-side Rendering"],
        color: "#0ea5e9",
    },
    {
        id: "03",
        title: "UI/UX & Design Systems",
        subtitle: "Blending user psychology with modern visual design to deliver intuitive, memorable interfaces.",
        highlights: ["Component Libraries", "Interactive Motion Design", "Design-to-Code Systems", "User Experience Auditing"],
        color: "#38bdf8",
    },
];

const Expertise = () => {
    const container = useRef<HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredTech = selectedCategory === 'all'
        ? techStack
        : techStack.filter(t => t.category === selectedCategory);

    useGSAP(() => {
        gsap.fromTo(".expertise-header",
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
                scrollTrigger: { trigger: container.current, start: "top 75%" }
            }
        );

        gsap.fromTo(".bento-card",
            { y: 50, opacity: 0, scale: 0.96 },
            {
                y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
                scrollTrigger: { trigger: ".bento-grid", start: "top 75%" }
            }
        );

        gsap.fromTo(".tech-pill",
            { scale: 0.9, opacity: 0 },
            {
                scale: 1, opacity: 1, duration: 0.4, stagger: 0.04, ease: "back.out(1.5)",
                scrollTrigger: { trigger: ".tech-matrix", start: "top 85%" }
            }
        );
    }, { scope: container });

    return (
        <section id="expertise" ref={container} className="relative py-32 px-6 md:px-16 lg:px-24 xl:px-40 text-[var(--text)] overflow-hidden">
            {/* Background Glow Mesh */}
            <div
                className="absolute top-1/3 left-[-10%] w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--orb1), transparent 70%)",
                    filter: "blur(90px)",
                }}
            />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="expertise-header mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px bg-[var(--primary)] shadow-[0_0_8px_var(--primary-glow)]" />
                        <span className="text-xs font-bold tracking-[0.4em] uppercase text-[var(--primary)]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Capabilities & Mastery
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2 className="text-[clamp(2.5rem,6vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-tight">
                            Technical <br />
                            <span className="italic text-[var(--text-muted)]">Prowess</span>
                        </h2>
                        <p className="text-[var(--text-muted)] text-base md:text-lg font-light leading-relaxed max-w-md lg:text-right">
                            Engineering robust software solutions, building fluid user interfaces, and shaping complete digital experiences.
                        </p>
                    </div>
                </div>

                {/* Bento Grid Domain Showcase */}
                <div className="bento-grid grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
                    {expertiseDomains.map((domain) => (
                        <div
                            key={domain.id}
                            className="bento-card group relative p-8 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--primary)] transition-all duration-500 flex flex-col justify-between"
                            style={{
                                backdropFilter: "blur(20px) saturate(180%)",
                                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                                boxShadow: "0 12px 40px rgba(15, 23, 42, 0.05)",
                            }}
                        >
                            {/* Card Header */}
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xs font-bold tracking-widest text-[var(--primary)] px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                                        {domain.id}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-[var(--primary)] group-hover:scale-150 transition-transform duration-300" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-[var(--primary)] transition-colors duration-300">
                                    {domain.title}
                                </h3>

                                <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed mb-8">
                                    {domain.subtitle}
                                </p>
                            </div>

                            {/* Highlights List */}
                            <div className="pt-6 border-t border-[var(--glass-border)]">
                                <ul className="space-y-3">
                                    {domain.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-[var(--text)]">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Matrix Wall */}
                <div className="tech-matrix p-8 md:p-12 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)]" style={{ backdropFilter: "blur(20px)" }}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight">Technologies & Tools</h3>
                            <p className="text-[var(--text-muted)] text-xs font-medium tracking-wide mt-1">
                                Languages, frameworks, and modern software tools I build with daily.
                            </p>
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'all', label: 'All Tech' },
                                { id: 'frontend', label: 'Frontend' },
                                { id: 'backend', label: 'Backend' },
                                { id: 'design', label: 'Design' },
                                { id: 'tools', label: 'Tools' },
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                        selectedCategory === cat.id
                                            ? 'bg-[var(--primary)] text-white shadow-[0_0_15px_var(--primary-glow)]'
                                            : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tech Pills Wall */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {filteredTech.map((tech, i) => (
                            <div
                                key={i}
                                className="tech-pill group p-4 rounded-2xl border border-[var(--glass-border)] bg-white/40 hover:bg-white/80 hover:border-[var(--primary)] transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-default"
                                style={{ backdropFilter: "blur(10px)" }}
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                                <span className="text-xs font-bold tracking-wide text-[var(--text)]">{tech.name}</span>
                                <span className="text-[9px] font-medium text-[var(--text-muted)] tracking-wider uppercase opacity-70">
                                    {tech.level}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
