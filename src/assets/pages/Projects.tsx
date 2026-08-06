import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Helper function to generate clean SVG UI mockups for project gallery slides
const createProjectMockupSvg = (title: string, color: string, slideNumber: number, slideTitle: string, subtitle: string) => {
    const encoded = encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="100%" height="100%">
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="100%" stop-color="#1e293b" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${color}" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />
                </linearGradient>
            </defs>
            
            <!-- Canvas background -->
            <rect width="1000" height="600" fill="url(#bgGrad)" rx="20" />
            <rect width="996" height="596" x="2" y="2" fill="none" stroke="${color}" stroke-opacity="0.3" stroke-width="2" rx="18" />
            
            <!-- Grid lines background -->
            <path d="M0 100 H1000 M0 200 H1000 M0 300 H1000 M0 400 H1000 M0 500 H1000" stroke="#334155" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="4,4" />
            <path d="M200 0 V600 M400 0 V600 M600 0 V600 M800 0 V600" stroke="#334155" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="4,4" />

            <!-- Header UI bar -->
            <rect x="40" y="40" width="920" height="50" fill="#1e293b" rx="12" stroke="#475569" stroke-width="1" />
            <circle cx="70" cy="65" r="7" fill="#ef4444" />
            <circle cx="92" cy="65" r="7" fill="#f59e0b" />
            <circle cx="114" cy="65" r="7" fill="#10b981" />
            <rect x="150" y="53" width="300" height="24" fill="#0f172a" rx="6" />
            <text x="165" y="70" fill="#94a3b8" font-family="sans-serif" font-size="12">https://${title.toLowerCase()}.app/dashboard/slide-${slideNumber}</text>
            
            <!-- Main Content Card -->
            <rect x="40" y="110" width="600" height="440" fill="#0f172a" rx="16" stroke="#334155" stroke-width="1" />
            
            <!-- Dynamic Graphics based on slide number -->
            ${slideNumber === 1 ? `
                <rect x="70" y="140" width="540" height="180" fill="url(#accentGrad)" opacity="0.15" rx="12" />
                <path d="M70 280 Q 200 160 340 240 T 610 180" fill="none" stroke="${color}" stroke-width="4" />
                <circle cx="340" cy="240" r="8" fill="${color}" />
                <rect x="70" y="340" width="250" height="18" fill="#334155" rx="4" />
                <rect x="70" y="370" width="400" height="14" fill="#1e293b" rx="4" />
                <rect x="70" y="395" width="320" height="14" fill="#1e293b" rx="4" />
                <rect x="70" y="440" width="160" height="45" fill="${color}" rx="8" />
                <text x="115" y="468" fill="#0f172a" font-family="sans-serif" font-weight="bold" font-size="14">Explore Feature</text>
            ` : slideNumber === 2 ? `
                <g fill="${color}" opacity="0.8">
                    <rect x="80" y="380" width="45" height="120" rx="4" />
                    <rect x="145" y="320" width="45" height="180" rx="4" />
                    <rect x="210" y="240" width="45" height="260" rx="4" />
                    <rect x="275" y="180" width="45" height="320" rx="4" />
                    <rect x="340" y="290" width="45" height="210" rx="4" />
                    <rect x="405" y="140" width="45" height="360" rx="4" />
                    <rect x="470" y="220" width="45" height="280" rx="4" />
                </g>
                <text x="80" y="160" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="18">Performance Metrics</text>
            ` : slideNumber === 3 ? `
                <circle cx="340" cy="300" r="120" fill="none" stroke="#334155" stroke-width="20" />
                <circle cx="340" cy="300" r="120" fill="none" stroke="${color}" stroke-width="20" stroke-dasharray="754" stroke-dashoffset="200" stroke-linecap="round" />
                <text x="340" y="295" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="36">98.4%</text>
                <text x="340" y="325" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="14">Efficiency Score</text>
            ` : `
                <g stroke="${color}" stroke-width="2" fill="none">
                    <circle cx="200" cy="250" r="40" />
                    <circle cx="480" cy="200" r="30" />
                    <circle cx="380" cy="400" r="50" />
                    <line x1="200" y1="250" x2="480" y2="200" stroke-dasharray="4,4" />
                    <line x1="480" y1="200" x2="380" y2="400" />
                    <line x1="200" y1="250" x2="380" y2="400" />
                </g>
                <text x="80" y="160" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="18">Interactive Architecture</text>
            `}

            <!-- Side Widgets Panel -->
            <rect x="660" y="110" width="300" height="440" fill="#1e293b" rx="16" stroke="#334155" stroke-width="1" />
            <text x="690" y="155" fill="${color}" font-family="sans-serif" font-weight="bold" font-size="14" letter-spacing="2">SCREENSHOT ${slideNumber} OF 4</text>
            <text x="690" y="190" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="20">${slideTitle}</text>
            <text x="690" y="225" fill="#94a3b8" font-family="sans-serif" font-size="13" width="240">${subtitle}</text>
            
            <rect x="690" y="290" width="240" height="1" fill="#334155" />

            <rect x="690" y="320" width="240" height="50" fill="#0f172a" rx="8" />
            <text x="710" y="350" fill="#e2e8f0" font-family="sans-serif" font-size="12">✓ High Resolution Render</text>
            <rect x="690" y="380" width="240" height="50" fill="#0f172a" rx="8" />
            <text x="710" y="410" fill="#e2e8f0" font-family="sans-serif" font-size="12">✓ Live Interactive State</text>
            <rect x="690" y="440" width="240" height="50" fill="#0f172a" rx="8" />
            <text x="710" y="470" fill="#e2e8f0" font-family="sans-serif" font-size="12">✓ Responsive Mobile Layout</text>
        </svg>
    `);
    return `data:image/svg+xml;utf8,${encoded}`;
};

export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    color: string;
    tag: string;
    description: string;
    longDescription: string;
    features: string[];
    technologies: string[];
    images: { title: string; subtitle: string; url: string }[];
}

const projects: ProjectItem[] = [
    {
        id: "01",
        title: "Pitute",
        category: "Mobile Design",
        tag: "iOS · Android",
        color: "#38bdf8",
        description: "A premium video sharing platform for creatives — built with React Native and Appwrite.",
        longDescription: "Aora is a next-generation mobile application built for video content creators and enthusiasts. It incorporates smooth 60fps video feeds, creator monetization analytics, instant search indexing powered by Appwrite, and custom gesture animations built with React Native Reanimated.",
        features: [
            "Smooth 60fps Video Carousel Feed",
            "Appwrite Backend Auth & Database Integration",
            "Creator Analytics & Earnings Dashboard",
            "Biometric Authentication & Dark Mode UI"
        ],
        technologies: ["React Native", "Expo", "Appwrite", "Tailwind CSS", "Zustand"],
        images: [
            {
                title: "Creator Home Feed",
                subtitle: "Curated high-bitrate video discovery feed with seamless scrolling.",
                url: createProjectMockupSvg("Aora", "#38bdf8", 1, "Creator Home Feed", "Curated high-bitrate video discovery feed with seamless scrolling.")
            },
            {
                title: "Analytics Dashboard",
                subtitle: "Real-time viewer engagement, metrics, and subscriber growth graphs.",
                url: createProjectMockupSvg("Aora", "#38bdf8", 2, "Analytics Dashboard", "Real-time viewer engagement, metrics, and subscriber growth graphs.")
            },
            {
                title: "Video Studio & Upload",
                subtitle: "Instant video processing pipeline with automated thumbnail generation.",
                url: createProjectMockupSvg("Aora", "#38bdf8", 3, "Video Studio & Upload", "Instant video processing pipeline with automated thumbnail generation.")
            },
            {
                title: "User Profile & Library",
                subtitle: "Personalized creator profile with saved collections and playlists.",
                url: createProjectMockupSvg("Aora", "#38bdf8", 4, "User Profile & Library", "Personalized creator profile with saved collections and playlists.")
            }
        ]
    },
    {
        id: "02",
        title: "FeedForge",
        category: "System Design",
        tag: "TypeScript · Node.js",
        color: "#fb923c",
        description: "Optimized algorithm visualization and distributed systems testing framework.",
        longDescription: "FeedForge is a high-throughput distributed systems framework designed for microservice benchmarking and algorithm execution profiling. It provides real-time flamegraph visualizations, automated fault injection testing, and sub-millisecond execution logs.",
        features: [
            "Interactive Flamegraph Code Profiler",
            "Distributed Node Fault Injection Engine",
            "Sub-Millisecond Event Latency Analyzer",
            "Automated Microservice Load Generator"
        ],
        technologies: ["TypeScript", "Node.js", "WebSockets", "Docker", "D3.js", "Redis"],
        images: [
            {
                title: "Cluster Topology Map",
                subtitle: "Visual node health and distributed workload status map.",
                url: createProjectMockupSvg("FizzBuzz", "#fb923c", 1, "Cluster Topology Map", "Visual node health and distributed workload status map.")
            },
            {
                title: "System Flamegraph",
                subtitle: "Sub-millisecond CPU call stack and memory allocation profiler.",
                url: createProjectMockupSvg("FizzBuzz", "#fb923c", 2, "System Flamegraph", "Sub-millisecond CPU call stack and memory allocation profiler.")
            },
            {
                title: "Load Test Matrix",
                subtitle: "Real-time fault injection simulation and latency telemetry.",
                url: createProjectMockupSvg("FizzBuzz", "#fb923c", 3, "Load Test Matrix", "Real-time fault injection simulation and latency telemetry.")
            },
            {
                title: "API Inspector Log",
                subtitle: "Granular packet trace viewer with instant search filters.",
                url: createProjectMockupSvg("FizzBuzz", "#fb923c", 4, "API Inspector Log", "Granular packet trace viewer with instant search filters.")
            }
        ]
    },
    {
        id: "03",
        title: "K-SMART",
        category: "E-commerce",
        tag: "Next.js · Postgres",
        color: "#a78bfa",
        description: "Next-gen shopping experience with AI personalization and real-time analytics.",
        longDescription: "Luma is a futuristic e-commerce platform engineered for extreme performance and ultra-smooth user experience. Built with Next.js App Router and PostgreSQL, it features AI-powered product recommendations, interactive 3D product previews, and instant checkout flows.",
        features: [
            "Sub-100ms Page Transitions with Next.js",
            "Interactive 3D Product Inspector (Three.js)",
            "AI-Driven Dynamic Personalization Engine",
            "Merchant Real-Time Revenue Heatmap"
        ],
        technologies: ["Next.js", "PostgreSQL", "Prisma", "Three.js", "Stripe", "Tailwind CSS"],
        images: [
            {
                title: "Storefront Spotlight",
                subtitle: "AI-curated product storefront with instantaneous filter transitions.",
                url: createProjectMockupSvg("Luma", "#a78bfa", 1, "Storefront Spotlight", "AI-curated product storefront with instantaneous filter transitions.")
            },
            {
                title: "3D Product Viewer",
                subtitle: "Interactive 360-degree model viewing with dynamic material shaders.",
                url: createProjectMockupSvg("Luma", "#a78bfa", 2, "3D Product Viewer", "Interactive 360-degree model viewing with dynamic material shaders.")
            },
            {
                title: "One-Click Checkout",
                subtitle: "Frictionless checkout experience supporting global local currencies.",
                url: createProjectMockupSvg("Luma", "#a78bfa", 3, "One-Click Checkout", "Frictionless checkout experience supporting global local currencies.")
            },
            {
                title: "Merchant Analytics",
                subtitle: "Live sales metrics, visitor heatmaps, and conversion funnels.",
                url: createProjectMockupSvg("Luma", "#a78bfa", 4, "Merchant Analytics", "Live sales metrics, visitor heatmaps, and conversion funnels.")
            }
        ]
    }
];

const ProjectCard = ({ project, onClick }: { project: ProjectItem; onClick: () => void }) => {
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
            style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {/* Card face */}
            <div
                className="relative rounded-[28px] overflow-hidden group"
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
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                    style={{
                        width: "80%",
                        height: "60%",
                        background: `radial-gradient(ellipse at 50% 100%, ${project.color}35, transparent 70%)`,
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

                    {/* Center icon / title */}
                    <div className="flex-1 flex items-center justify-center my-2">
                        <div
                            className="text-6xl md:text-7xl opacity-15 group-hover:opacity-25 transition-opacity duration-300 font-black uppercase tracking-tighter select-none"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                color: project.color,
                                transform: "translateZ(30px)",
                            }}
                        >
                            {project.title}
                        </div>
                    </div>

                    {/* Bottom CTA button */}
                    <div
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full w-fit transition-all duration-300 group-hover:scale-105"
                        style={{
                            background: `${project.color}22`,
                            border: `1px solid ${project.color}45`,
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: project.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Click to View Details
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke={project.color} className="w-3.5 h-3.5">
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
                <p className="text-xs font-light max-w-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {project.description}
                </p>
            </div>
        </div>
    );
};

const Projects = () => {
    const container = useRef<HTMLElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    
    // Modal State
    const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
    const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

    const openModal = (proj: ProjectItem) => {
        setActiveProject(proj);
        setCurrentImgIndex(0);
    };

    const closeModal = () => {
        setActiveProject(null);
    };

    const nextImage = () => {
        if (!activeProject) return;
        setCurrentImgIndex((prev) => (prev + 1) % activeProject.images.length);
    };

    const prevImage = () => {
        if (!activeProject) return;
        setCurrentImgIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
    };

    // Keyboard navigation inside modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeProject) return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeProject]);

    // Lock background body scroll when modal is active
    useEffect(() => {
        if (activeProject) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [activeProject]);

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

                {/* Carousel wrapper */}
                <div className="projects-carousel-wrapper flex-1 flex items-start pt-2 overflow-visible">
                    <div ref={scrollContainer} className="flex gap-10 md:gap-14 px-8 md:px-24 items-start">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} onClick={() => openModal(project)} />
                        ))}
                    </div>
                </div>

                {/* Scrollbar indicator */}
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
                        Scroll to Explore • Click Project to Open
                    </span>
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════
               PROJECT DETAIL MODAL (Heading -> Description -> Single Image Carousel)
               ══════════════════════════════════════════════════════════════ */}
            {activeProject && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/50 backdrop-blur-xl animate-fadeIn"
                    onClick={closeModal}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {/* Modal container */}
                    <div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-6 animate-modalScale custom-scrollbar"
                        style={{
                            background: "rgba(255, 255, 255, 0.94)",
                            backdropFilter: "blur(32px) saturate(180%)",
                            WebkitBackdropFilter: "blur(32px) saturate(180%)",
                            border: "1px solid var(--glass-border)",
                            boxShadow: `0 30px 90px rgba(15, 23, 42, 0.2), 0 0 50px ${activeProject.color}30, inset 0 1px 0 rgba(255,255,255,0.9)`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 z-20 group"
                            style={{
                                background: "rgba(255, 255, 255, 0.9)",
                                border: "1px solid var(--glass-border)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                color: "var(--text)",
                            }}
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:scale-110">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* 1. TOP OF THE MODAL: PROJECT HEADING */}
                        <div className="flex flex-col gap-3 pr-10 border-b border-slate-200/80 pb-6">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span
                                    className="px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase"
                                    style={{
                                        background: `${activeProject.color}18`,
                                        border: `1px solid ${activeProject.color}40`,
                                        color: activeProject.color,
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    PROJECT {activeProject.id}
                                </span>
                                <span
                                    className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                                    style={{
                                        background: "rgba(2, 132, 199, 0.06)",
                                        border: "1px solid rgba(2, 132, 199, 0.15)",
                                        color: "var(--text-muted)",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    {activeProject.category}
                                </span>
                                <span
                                    className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.03)",
                                        border: "1px solid var(--glass-border)",
                                        color: "var(--text-muted)",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    {activeProject.tag}
                                </span>
                            </div>

                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight"
                                style={{
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    color: "var(--text)",
                                }}
                            >
                                {activeProject.title}
                            </h2>
                        </div>

                        {/* 2. BELOW HEADING: DESCRIPTION & FEATURES */}
                        <div className="flex flex-col gap-5">
                            <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                {activeProject.longDescription}
                            </p>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1">
                                {activeProject.features.map((feat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3.5 rounded-2xl"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.75)",
                                            border: "1px solid var(--glass-border)",
                                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.02)",
                                        }}
                                    >
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeProject.color }} />
                                        <span className="text-xs sm:text-sm font-semibold" style={{ color: "var(--text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {feat}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Tech Stack Chips */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-1">Stack:</span>
                                {activeProject.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-semibold px-3.5 py-1.5 rounded-xl transition-all"
                                        style={{
                                            background: "rgba(0, 0, 0, 0.04)",
                                            border: "1px solid var(--glass-border)",
                                            color: "var(--text)",
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 3. BELOW DESCRIPTION: SINGLE IMAGE CAROUSEL WITH LEFT/RIGHT BUTTONS */}
                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Visual Gallery ({currentImgIndex + 1} / {activeProject.images.length})
                                </span>
                                <span className="text-xs font-semibold" style={{ color: "var(--text)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {activeProject.images[currentImgIndex].title}
                                </span>
                            </div>

                            {/* Image Container with Arrow Buttons */}
                            <div
                                className="relative w-full aspect-[16/9.5] sm:aspect-[16/9] rounded-2xl overflow-hidden group shadow-inner"
                                style={{
                                    border: "1px solid var(--glass-border)",
                                    background: "#0f172a",
                                }}
                            >
                                {/* Image display */}
                                <img
                                    src={activeProject.images[currentImgIndex].url}
                                    alt={`${activeProject.title} screenshot ${currentImgIndex + 1}`}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                />

                                {/* Left Arrow Button */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 z-10"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.9)",
                                        border: "1px solid rgba(255, 255, 255, 0.9)",
                                        color: "#0f172a",
                                    }}
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                {/* Right Arrow Button */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 z-10"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.9)",
                                        border: "1px solid rgba(255, 255, 255, 0.9)",
                                        color: "#0f172a",
                                    }}
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>

                                {/* Subtitle overlay banner */}
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between text-white backdrop-blur-xs">
                                    <p className="text-xs sm:text-sm font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {activeProject.images[currentImgIndex].subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* Image Dot Indicators */}
                            <div className="flex items-center justify-center gap-2 mt-2">
                                {activeProject.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImgIndex(idx)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            currentImgIndex === idx ? "w-8" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                                        }`}
                                        style={{
                                            backgroundColor: currentImgIndex === idx ? activeProject.color : undefined,
                                        }}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
