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
            className="project-card relative shrink-0 w-[78vw] sm:w-[60vw] md:w-[42vw] lg:w-[38vw] max-w-[560px]"
            style={{ transformStyle: "preserve-3d", cursor: "none" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Card face */}
            <div
                className="relative rounded-[28px] overflow-hidden"
                style={{
                    aspectRatio: "16/9.5",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: `0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)`,
                }}
            >
                {/* Shimmer overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                        zIndex: 1,
                    }}
                />

                {/* Color glow */}
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: "80%",
                        height: "60%",
                        background: `radial-gradient(ellipse at 50% 100%, ${project.color}25, transparent 70%)`,
                        filter: "blur(30px)",
                        zIndex: 0,
                    }}
                />

                {/* Content */}
                <div className="card-inner relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Top badges */}
                    <div className="flex gap-2.5 flex-wrap">
                        <span
                            className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: `${project.color}18`,
                                border: `1px solid ${project.color}35`,
                                color: project.color,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.id}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(2, 132, 199, 0.06)",
                                border: "1px solid rgba(2, 132, 199, 0.15)",
                                color: "var(--text-muted)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.category}
                        </span>
                        <span
                            className="px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(255,255,255,0.5)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--text-muted)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.tag}
                        </span>
                    </div>

                    {/* Center icon */}
                    <div className="flex-1 flex items-center justify-center my-2">
                        <div
                            className="text-6xl md:text-7xl opacity-10 font-black uppercase tracking-tighter select-none"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                color: project.color,
                                transform: "translateZ(30px)",
                            }}
                        >
                            {project.title}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `${project.color}18`,
                            border: `1px solid ${project.color}30`,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: project.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            View Case Study
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke={project.color} className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Title below */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 px-2 mt-3">
                <h3
                    className="project-title text-2xl md:text-4xl font-bold uppercase leading-none tracking-tight transition-colors duration-300"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: "var(--text)",
                    }}
                >
                    {project.title}
                </h3>
                <p className="text-xs font-light max-w-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
          .to(".projects-carousel-wrapper", { y: "-12vh", duration: 1, ease: "power2.inOut" }, "-=0.8")
          .to(".projects-progress-bar-container", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
          .to(scrollContainer.current, { x: xTranslate, ease: "none", duration: 4 }, "-=0.2")
          .to(".projects-progress-fill", { scaleX: 1, ease: "none", duration: 4 }, "-=4");

        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
            gsap.fromTo(card,
                { scale: 0.88, opacity: 0.3, y: 40 },
                {
                    scale: 1, opacity: 1, y: 0, ease: "power2.out",
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
        <section id="projects" ref={container} className="relative text-[var(--text)] overflow-hidden min-h-screen"
            style={{ background: "transparent" }}
        >
            <div className="h-screen flex flex-col justify-between pt-8 pb-20 md:pt-10 md:pb-24 relative">
                {/* Header */}
                <div className="projects-header mb-2 px-8 md:px-24 shrink-0">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                        <span
                            className="text-xs font-bold tracking-[0.4em] uppercase"
                            style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Selected Works
                        </span>
                    </div>
                    <h2
                        className="text-[clamp(2.2rem,5vw,5rem)] font-bold uppercase leading-[0.88] tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Featured <br />
                        <span
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontStyle: "italic",
                                background: "linear-gradient(135deg, var(--text-muted) 0%, rgba(0, 0, 0, 0.45) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Projects
                        </span>
                    </h2>
                </div>

                {/* Carousel wrapper - fits gracefully in upper section */}
                <div className="projects-carousel-wrapper flex-1 flex items-start pt-2 overflow-visible">
                    <div ref={scrollContainer} className="flex gap-10 md:gap-14 px-8 md:px-24 items-start">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>

                {/* Scrollbar indicator - moved upwards */}
                <div
                    className="projects-progress-bar-container absolute bottom-20 md:bottom-28 left-0 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
                    style={{ opacity: 0, y: 15 } as React.CSSProperties}
                >
                    <div className="w-48 sm:w-64 md:w-80 h-[4px] rounded-full overflow-hidden relative" style={{ background: "rgba(30, 36, 43, 0.12)", backdropFilter: "blur(4px)" }}>
                        <div
                            className="projects-progress-fill h-full rounded-full"
                            style={{
                                width: "100%",
                                transformOrigin: "left center",
                                transform: "scaleX(0)",
                                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                                boxShadow: "0 0 10px var(--primary-glow)",
                            }}
                        />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Scroll to Explore
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Projects;
