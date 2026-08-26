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
        title: "K-SMART",
        category: "E-Governance App",
        tag: "Python · Django · React",
        color: "#38bdf8",
        description: "Government service management platform streamlining citizen requests and service workflows.",
        longDescription: "K-SMART is a comprehensive e-governance service management system designed to streamline municipal service deliveries, certificate issuance, and citizen applications. Built with Python (Django) on the backend and React with Tailwind CSS on the frontend, utilizing MySQL and AWS S3 for secure file storage.",
        features: [
            "Modular Citizen Application Processing Pipeline",
            "Secure RESTful APIs with Django REST Framework",
            "AWS S3 Document Vault & Cloud Storage Integration",
            "Responsive React & Tailwind CSS Dashboard Interface"
        ],
        technologies: ["Python", "Django", "React", "Tailwind CSS", "MySQL", "AWS S3", "REST APIs"],
        images: [
            {
                title: "Service Portal Overview",
                subtitle: "Centralized citizen service catalog and application tracking portal.",
                url: createProjectMockupSvg("K-SMART", "#38bdf8", 1, "Service Portal Overview", "Centralized citizen service catalog and application tracking portal.")
            },
            {
                title: "Application Workflow Engine",
                subtitle: "Real-time verification stages and automated approval routing.",
                url: createProjectMockupSvg("K-SMART", "#38bdf8", 2, "Application Workflow Engine", "Real-time verification stages and automated approval routing.")
            },
            {
                title: "Document Vault & AWS Storage",
                subtitle: "Encrypted citizen document uploads and secure AWS S3 bucket storage.",
                url: createProjectMockupSvg("K-SMART", "#38bdf8", 3, "Document Vault & AWS Storage", "Encrypted citizen document uploads and secure AWS S3 bucket storage.")
            },
            {
                title: "Administrative Analytics",
                subtitle: "Municipal department performance metrics and response telemetry.",
                url: createProjectMockupSvg("K-SMART", "#38bdf8", 4, "Administrative Analytics", "Municipal department performance metrics and response telemetry.")
            }
        ]
    },
    {
        id: "02",
        title: "PEOPLE'S VOICE",
        category: "Public Safety",
        tag: "Django · REST API · MySQL",
        color: "#fb923c",
        description: "Crime reporting and public safety monitoring platform with real-time issue tracking.",
        longDescription: "People's Voice is a public safety platform enabling citizens to report local incidents, file formal grievances, and track resolution status transparently. Features robust Django authentication, MySQL relational data structuring, and instant notification alerts.",
        features: [
            "Anonymous Incident Reporting & Evidence Uploads",
            "Authority Resolution Workflow & Status Tracking",
            "Optimized MySQL Relational Database Schema",
            "Role-Based Access Control for Officers & Public"
        ],
        technologies: ["Python", "Django", "JavaScript", "HTML5", "CSS3", "MySQL", "REST APIs"],
        images: [
            {
                title: "Public Incident Map",
                subtitle: "Interactive spatial map of reported community safety alerts.",
                url: createProjectMockupSvg("PeoplesVoice", "#fb923c", 1, "Public Incident Map", "Interactive spatial map of reported community safety alerts.")
            },
            {
                title: "Grievance Dispatch System",
                subtitle: "Automated routing of public reports to assigned municipal departments.",
                url: createProjectMockupSvg("PeoplesVoice", "#fb923c", 2, "Grievance Dispatch System", "Automated routing of public reports to assigned municipal departments.")
            },
            {
                title: "Evidence & Media Vault",
                subtitle: "Secure file validation and verification system for submitted media.",
                url: createProjectMockupSvg("PeoplesVoice", "#fb923c", 3, "Evidence & Media Vault", "Secure file validation and verification system for submitted media.")
            },
            {
                title: "Resolution Metrics",
                subtitle: "Real-time officer response metrics and department SLA dashboards.",
                url: createProjectMockupSvg("PeoplesVoice", "#fb923c", 4, "Resolution Metrics", "Real-time officer response metrics and department SLA dashboards.")
            }
        ]
    },
    {
        id: "03",
        title: "RED DROP",
        category: "Healthcare",
        tag: "Python · SQLite · Web UI",
        color: "#f43f5e",
        description: "Real-time blood bank management system matching urgent donor requests with active supplies.",
        longDescription: "Red Drop is a real-time blood bank management web application engineered to solve critical supply shortages during emergencies. It matches blood requests with nearby registered donors, manages inventory batches, and optimizes donor dispatch workflows.",
        features: [
            "Instant Donor-Patient Blood Type Match Engine",
            "Real-Time Blood Inventory & Expiration Tracking",
            "Emergency Broadcast Notification Dispatch",
            "Lightweight SQLite Relational Datastore"
        ],
        technologies: ["Python", "Django", "JavaScript", "HTML5", "CSS3", "SQLite"],
        images: [
            {
                title: "Donor Match Engine",
                subtitle: "Immediate matching based on location and rare blood group availability.",
                url: createProjectMockupSvg("RedDrop", "#f43f5e", 1, "Donor Match Engine", "Immediate matching based on location and rare blood group availability.")
            },
            {
                title: "Inventory Command Dashboard",
                subtitle: "Live batch monitoring, unit counts, and shelf life telemetry.",
                url: createProjectMockupSvg("RedDrop", "#f43f5e", 2, "Inventory Command Dashboard", "Live batch monitoring, unit counts, and shelf life telemetry.")
            },
            {
                title: "Emergency Alert Hub",
                subtitle: "Automated notification dispatches to available registered donors.",
                url: createProjectMockupSvg("RedDrop", "#f43f5e", 3, "Emergency Alert Hub", "Automated notification dispatches to available registered donors.")
            },
            {
                title: "Hospital Request Logs",
                subtitle: "Verified hospital requisition pipeline and dispatch records.",
                url: createProjectMockupSvg("RedDrop", "#f43f5e", 4, "Hospital Request Logs", "Verified hospital requisition pipeline and dispatch records.")
            }
        ]
    },
    {
        id: "04",
        title: "CLOUDSTICK V2",
        category: "Cloud Infrastructure",
        tag: "React · TypeScript · Redux",
        color: "#a78bfa",
        description: "Real-time server provisioning and cloud administration dashboard engineered for Cloudhouse.",
        longDescription: "Cloudstick (V2) is an enterprise cloud management platform. Gohul engineered real-time server provisioning dashboards, DNS automation, and production-grade UI modules for server administration, database configuration, and network security using React, TypeScript, and Redux Toolkit.",
        features: [
            "Real-Time Server Provisioning Dashboards",
            "Redux Toolkit Global State & Telemetry Management",
            "Automated DNS, Firewall & Database Configuration UI",
            "Agile Collaborated Production Deployment Modules"
        ],
        technologies: ["React", "TypeScript", "Redux Toolkit", "REST APIs", "Tailwind CSS", "Git"],
        images: [
            {
                title: "Server Fleet Overview",
                subtitle: "Real-time cloud instance CPU, RAM, and disk utilization metrics.",
                url: createProjectMockupSvg("Cloudstick", "#a78bfa", 1, "Server Fleet Overview", "Real-time cloud instance CPU, RAM, and disk utilization metrics.")
            },
            {
                title: "DNS & Domain Configurator",
                subtitle: "Automated record propagation and custom zone management UI.",
                url: createProjectMockupSvg("Cloudstick", "#a78bfa", 2, "DNS & Domain Configurator", "Automated record propagation and custom zone management UI.")
            },
            {
                title: "Database Cluster Provisioning",
                subtitle: "One-click MySQL and PostgreSQL database cluster deployment wizard.",
                url: createProjectMockupSvg("Cloudstick", "#a78bfa", 3, "Database Cluster Provisioning", "One-click MySQL and PostgreSQL database cluster deployment wizard.")
            },
            {
                title: "Real-Time Telemetry & Logs",
                subtitle: "Sub-second server event logging and activity audit streams.",
                url: createProjectMockupSvg("Cloudstick", "#a78bfa", 4, "Real-Time Telemetry & Logs", "Sub-second server event logging and activity audit streams.")
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
            className="project-card relative shrink-0 w-[88vw] sm:w-[72vw] md:w-[56vw] lg:w-[48vw] xl:w-[44vw] max-w-[720px]"
            style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {/* Card face */}
            <div
                className="relative rounded-[32px] overflow-hidden group"
                style={{
                    aspectRatio: "16/9.8",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: `0 24px 70px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.7)`,
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
                        width: "85%",
                        height: "65%",
                        background: `radial-gradient(ellipse at 50% 100%, ${project.color}40, transparent 70%)`,
                        filter: "blur(35px)",
                        zIndex: 0,
                    }}
                />

                {/* Content */}
                <div className="card-inner relative z-10 w-full h-full flex flex-col justify-between p-7 sm:p-8 md:p-10">
                    {/* Top badges */}
                    <div className="flex gap-2.5 flex-wrap">
                        <span
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-extrabold tracking-widest uppercase"
                            style={{
                                background: `${project.color}22`,
                                border: `1px solid ${project.color}45`,
                                color: project.color,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.id}
                        </span>
                        <span
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(2, 132, 199, 0.08)",
                                border: "1px solid rgba(2, 132, 199, 0.18)",
                                color: "var(--text-muted)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.category}
                        </span>
                        <span
                            className="px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                            style={{
                                background: "rgba(255,255,255,0.6)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--text-muted)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {project.tag}
                        </span>
                    </div>

                    {/* Center icon / title */}
                    <div className="flex-1 flex items-center justify-center my-3">
                        <div
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-15 group-hover:opacity-30 transition-all duration-500 font-black uppercase tracking-tighter select-none text-center"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                color: project.color,
                                transform: "translateZ(40px)",
                            }}
                        >
                            {project.title}
                        </div>
                    </div>

                    {/* Bottom CTA button */}
                    <div
                        className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full w-fit transition-all duration-300 group-hover:scale-105 shadow-sm"
                        style={{
                            background: `${project.color}25`,
                            border: `1px solid ${project.color}50`,
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: project.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Click to View Details
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke={project.color} className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Title below */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 px-3 mt-4">
                <h3
                    className="project-title text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase leading-none tracking-tight transition-colors duration-300"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: "var(--text)",
                    }}
                >
                    {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-light max-w-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
                    className="projects-progress-bar-container absolute bottom-6 md:bottom-8 left-0 w-full flex flex-col items-center gap-2 z-30 pointer-events-none"
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
               PROJECT DETAIL MODAL (Human Editorial Portfolio Layout)
               ══════════════════════════════════════════════════════════════ */}
            {activeProject && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/50 backdrop-blur-md animate-fadeIn"
                    onClick={closeModal}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {/* Modal Card Container */}
                    <div
                        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-[28px] bg-white p-6 sm:p-8 md:p-10 flex flex-col gap-6 animate-modalScale custom-scrollbar shadow-2xl border border-stone-200/80"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Minimalist Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 z-20"
                            aria-label="Close modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* 1. EDITORIAL HEADER */}
                        <div className="flex flex-col gap-2 pr-10 border-b border-stone-100 pb-5">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-sky-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {activeProject.category}
                                </span>
                                <span className="text-stone-300">•</span>
                                <span className="text-[11px] font-medium tracking-wider text-stone-500" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    {activeProject.tag}
                                </span>
                            </div>

                            <h2
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-stone-900"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                {activeProject.title}
                            </h2>
                        </div>

                        {/* 2. IMAGE PREVIEW GALLERY */}
                        <div className="flex flex-col gap-3">
                            <div className="relative w-full aspect-[16/9.5] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-stone-200 group">
                                <img
                                    src={activeProject.images[currentImgIndex].url}
                                    alt={`${activeProject.title} slide ${currentImgIndex + 1}`}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                />

                                {/* Left Nav Arrow */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/90 hover:bg-white text-stone-900 shadow-md z-10 hover:scale-105"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>

                                {/* Right Nav Arrow */}
                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/90 hover:bg-white text-stone-900 shadow-md z-10 hover:scale-105"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>

                                {/* Image Subtitle Overlay */}
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-stone-300">
                                            {activeProject.images[currentImgIndex].title}
                                        </p>
                                        <p className="text-xs font-medium text-stone-200 mt-0.5">
                                            {activeProject.images[currentImgIndex].subtitle}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-mono tracking-widest text-stone-300 bg-black/40 px-2 py-0.5 rounded">
                                        {currentImgIndex + 1} / {activeProject.images.length}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Indicator Dots */}
                            <div className="flex items-center justify-center gap-2 mt-1">
                                {activeProject.images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImgIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            currentImgIndex === idx ? "w-6 bg-stone-900" : "w-2 bg-stone-300 hover:bg-stone-400"
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 3. DETAILS & TECH STACK (2 COLUMNS) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-stone-100">
                            {/* Main Story & Features (2 Cols) */}
                            <div className="md:col-span-2 flex flex-col gap-6">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        About the Project
                                    </h4>
                                    <p className="text-sm md:text-base text-stone-600 font-normal leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {activeProject.longDescription}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        Key Highlights
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {activeProject.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-stone-800 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Tech Stack & Action (1 Col) */}
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        Technologies Used
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200/60"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
