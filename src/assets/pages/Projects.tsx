import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Aora",
        category: "Mobile Design",
        id: "01",
        description: "A premium video sharing platform for creatives — built with React Native and Appwrite.",
        color: "#38bdf8",
        tag: "iOS · Android",
    },
    {
        title: "FizzBuzz",
        category: "System Design",
        id: "02",
        description: "Optimized algorithm visualization and distributed systems testing framework.",
        color: "#fb923c",
        tag: "TypeScript · Node.js",
    },
    {
        title: "Luma",
        category: "E-commerce",
        id: "03",
        description: "Next-gen shopping experience with AI personalization and real-time analytics.",
        color: "#a78bfa",
        tag: "Next.js · Postgres",
    },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out",
        });

        // Parallax inner
        gsap.to(card.querySelector(".card-inner"), {
            x: x * 12,
            y: y * 12,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, {
            rotateY: 0, rotateX: 0,
            duration: 0.6, ease: "elastic.out(1,0.5)",
        });
        gsap.to(card.querySelector(".card-inner"), {
            x: 0, y: 0,
            duration: 0.6, ease: "elastic.out(1,0.5)",
        });
    };

    return (
        <div
            ref={cardRef}
            className="project-card relative shrink-0 w-[82vw] md:w-[55vw]"
            style={{ transformStyle: "preserve-3d", cursor: "none" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card face */}
            <div
                className="relative rounded-[32px] overflow-hidden"
                style={{
                    aspectRatio: "16/10",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: `0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`,
                }}
            >
                {/* Shimmer overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)",
                        zIndex: 1,
                    }}
                />

                {/* Color glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: "80%",
                        height: "60%",
                        background: `radial-gradient(ellipse at 50% 100%, ${project.color}18, transparent 70%)`,
                        filter: "blur(30px)",
                        zIndex: 0,
                    }}
                />

                {/* Content */}
                <div className="card-inner relative z-10 w-full h-full flex flex-col justify-between p-10">
                    {/* Top badges */}
                    <div className="flex gap-3 flex-wrap">
                        <span
                            className="px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: `${project.color}18`,
                                border: `1px solid ${project.color}35`,
                                color: project.color,
                                fontFamily: "Cinzel, serif",
                            }}
                        >
                            {project.id}
                        </span>
                        <span
                            className="px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "var(--text-muted)",
                                fontFamily: "Cinzel, serif",
                            }}
                        >
                            {project.category}
                        </span>
                        <span
                            className="px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.25)",
                                fontFamily: "Cinzel, serif",
                            }}
                        >
                            {project.tag}
                        </span>
                    </div>

                    {/* Center icon */}
                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className="text-8xl opacity-5 font-black uppercase tracking-tighter select-none"
                            style={{
                                fontFamily: "Cinzel, serif",
                                color: project.color,
                                transform: "translateZ(40px)",
                            }}
                        >
                            {project.title}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div
                        className="flex items-center gap-3 px-5 py-3 rounded-full w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `${project.color}18`,
                            border: `1px solid ${project.color}30`,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: project.color, fontFamily: "Cinzel, serif" }}>
                            View Case Study
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={project.color} className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Title below */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2 mt-8">
                <h3
                    className="project-title text-5xl md:text-7xl font-bold uppercase leading-none tracking-tight transition-colors duration-300"
                    style={{
                        fontFamily: "Cinzel, serif",
                        color: "var(--text)",
                    }}
                >
                    {project.title}
                </h3>
                <p className="text-sm font-light max-w-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "16px" }}>
                    {project.description}
                </p>
            </div>
        </div>
    );
};

const Projects = () => {
    const container = useRef<HTMLElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current || !scrollContainer.current) return;

        const totalWidth = scrollContainer.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xTranslate = -(totalWidth - viewportWidth + viewportWidth * 0.1);

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "projects-trigger",
                trigger: container.current,
                pin: true,
                start: "top top",
                end: () => `+=${totalWidth * 2}`,
                scrub: 1.2,
                invalidateOnRefresh: true,
            }
        });

        tl.to(".projects-header", { y: "-120%", opacity: 0, duration: 1, ease: "power3.inOut" })
          .to(".projects-carousel-wrapper", { y: "-15vh", duration: 1, ease: "power2.inOut" }, "-=0.8")
          .to(scrollContainer.current, { x: xTranslate, ease: "none", duration: 4 }, "-=0.2");

        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
            gsap.fromTo(card,
                { scale: 0.85, opacity: 0, y: 80, rotate: 3 },
                {
                    scale: 1, opacity: 1, y: 0, rotate: 0, ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: tl,
                        start: "left 98%",
                        end: "left 60%",
                        scrub: true,
                    }
                }
            );
        });
    }, { scope: container });

    return (
        <section id="projects" ref={container} className="relative text-white overflow-hidden min-h-screen"
            style={{ background: "transparent" }}
        >
            <div className="h-screen flex flex-col justify-start pt-16 pb-32">
                {/* Header */}
                <div className="projects-header mb-14 px-8 md:px-24 shrink-0">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                        <span
                            className="text-xs font-bold tracking-[0.4em] uppercase"
                            style={{ color: "var(--primary)", fontFamily: "Cinzel, serif" }}
                        >
                            Selected Works
                        </span>
                    </div>
                    <h2
                        className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.82] tracking-tight"
                        style={{ fontFamily: "Cinzel, serif" }}
                    >
                        Featured <br />
                        <span
                            style={{
                                fontFamily: "Cinzel, serif",
                                fontStyle: "italic",
                                background: "linear-gradient(135deg, var(--text-muted) 0%, rgba(255,255,255,0.15) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Projects
                        </span>
                    </h2>
                </div>

                {/* Carousel */}
                <div className="projects-carousel-wrapper flex-1 flex items-center overflow-visible">
                    <div ref={scrollContainer} className="flex gap-16 px-8 md:px-24 items-center">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}

                        {/* End CTA */}
                        <div className="shrink-0 pl-16 pr-32">
                            <button
                                className="group px-12 py-6 rounded-full transition-all duration-500 flex items-center gap-5 cursor-none"
                                style={{
                                    border: "1px solid var(--glass-border)",
                                    background: "var(--glass-bg)",
                                    backdropFilter: "blur(16px)",
                                    color: "var(--text-muted)",
                                    fontFamily: "Cinzel, serif",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = "var(--primary)";
                                    el.style.color = "var(--primary)";
                                    el.style.boxShadow = "0 0 30px var(--primary-glow)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget;
                                    el.style.borderColor = "var(--glass-border)";
                                    el.style.color = "var(--text-muted)";
                                    el.style.boxShadow = "none";
                                }}
                            >
                                <span className="text-xs font-bold uppercase tracking-widest">View All Projects</span>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ border: "1px solid var(--glass-border)", background: "rgba(255,255,255,0.03)" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
