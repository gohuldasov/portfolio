import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const educationList = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "APJ Abdul Kalam Technological University",
        period: "2020 — 2024",
        grade: "CGPA: 8.9 / 10.0",
        description: "Specialized in Fullstack Web Systems, Distributed Architectures, and Database Optimization. Graduated with First Class Distinction.",
        modules: ["Data Structures", "Algorithms", "Web Architecture", "Database Systems", "Cloud Computing"],
    },
    {
        degree: "Higher Secondary in Computer Science",
        institution: "Board of Higher Secondary Education",
        period: "2018 — 2020",
        grade: "Score: 94%",
        description: "Focused on Mathematics, Physics, and Foundational Programming in C++ and Object-Oriented Software Design.",
        modules: ["Object-Oriented Programming", "Applied Mathematics", "C++", "Database Basics"],
    },
    {
        degree: "Advanced Fullstack & Cloud Specialization",
        institution: "Luminar TechnoHub Academy",
        period: "2024",
        grade: "Certified Master",
        description: "Intensive training in modern frontend engineering, microservices API design, and cloud DevOps deployment pipelines.",
        modules: ["React 19", "TypeScript", "Next.js", "Node.js", "Docker"],
    }
];

const Education = () => {
    const container = useRef<HTMLElement>(null);
    const [showAll] = useState(false);

    const displayedEducation = showAll ? educationList : educationList.slice(0, 4);

    useGSAP(() => {
        gsap.fromTo(
            ".edu-header",
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
            ".edu-row",
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".edu-list",
                    start: "top 75%",
                }
            }
        );
    }, { scope: container, dependencies: [displayedEducation] });

    return (
        <section
            id="education"
            ref={container}
            className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header matching Experience.tsx & About.tsx */}
                <div className="edu-header mb-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                        <span
                            className="text-xs font-bold tracking-[0.4em] uppercase"
                            style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Academic Background
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <h2
                            className="text-[clamp(2.5rem,6vw,7rem)] font-bold uppercase leading-[0.88] tracking-tight"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Education &<br />
                            <span
                                style={{
                                    fontStyle: "italic",
                                    background: "linear-gradient(135deg, var(--text-muted) 0%, rgba(2, 132, 199, 0.4) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Degrees
                            </span>
                        </h2>
                        <p
                            className="text-lg font-light leading-relaxed max-w-sm lg:text-right"
                            style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "18px" }}
                        >
                            Foundational computer science principles paired with modern industry engineering practices.
                        </p>
                    </div>
                </div>

                {/* List with identical row hover structure as Experience.tsx */}
                <div className="edu-list">
                    {displayedEducation.map((edu, index) => (
                        <div
                            key={index}
                            className="edu-row group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 transition-all duration-500 cursor-default"
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
                                        {edu.period}
                                    </span>
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                        style={{
                                            background: "rgba(2, 132, 199, 0.1)",
                                            border: "1px solid rgba(2, 132, 199, 0.2)",
                                            color: "var(--primary)",
                                        }}
                                    >
                                        {edu.grade}
                                    </span>
                                </div>
                                <h3
                                    className="text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
                                >
                                    {edu.degree}
                                </h3>
                                <p
                                    className="text-base italic font-light"
                                    style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "17px" }}
                                >
                                    @{edu.institution}
                                </p>
                            </div>

                            {/* Right side */}
                            <div className="mt-5 md:mt-0 md:text-right md:max-w-xs lg:max-w-sm">
                                <p
                                    className="text-sm font-light leading-relaxed mb-4"
                                    style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "16px" }}
                                >
                                    {edu.description}
                                </p>
                                <div className="flex md:justify-end flex-wrap gap-2">
                                    {edu.modules.map((mod) => (
                                        <span
                                            key={mod}
                                            className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
                                            style={{
                                                background: "var(--glass-bg)",
                                                border: "1px solid var(--glass-border)",
                                                color: "var(--text-muted)",
                                                backdropFilter: "blur(8px)",
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            }}
                                        >
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
