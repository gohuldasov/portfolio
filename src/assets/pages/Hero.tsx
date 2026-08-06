import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import heroImage from "../image1.png";

const Hero = () => {
    const container = useRef<HTMLDivElement>(null);
    const topWatermarkRef = useRef<HTMLDivElement>(null);
    const bottomTitleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLAnchorElement>(null);

    const [isResumeOpen, setIsResumeOpen] = useState(false);

    // Lock body scroll when resume modal is active
    useEffect(() => {
        if (isResumeOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isResumeOpen]);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(topWatermarkRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.2 }
        ).fromTo(".hero-bio-text",
            { opacity: 0, x: -24 },
            { opacity: 1, x: 0, duration: 0.7 },
            "-=0.8"
        ).fromTo(".hero-bg-image",
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 1.4 },
            "-=0.5"
        ).fromTo(bottomTitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.6"
        ).fromTo(cardRef.current,
            { opacity: 0, y: 24, scale: 0.93 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7 },
            "-=0.6"
        );
    }, { scope: container });

    return (
        <section
            id="home"
            ref={container}
            style={{ height: "100svh", minHeight: "600px" }}
            className="relative w-full flex flex-col overflow-hidden px-6 md:px-12 lg:px-20"
        >
            {/* Background Portrait — centered, contained, not full-cover */}
            <div className="hero-bg-image absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
                <img
                    src={heroImage}
                    alt="Gohul Background Portrait"
                    style={{
                        height: "80%",
                        width: "auto",
                        maxWidth: "55%",
                        objectFit: "contain",
                        opacity: 0.35,
                    }}
                />
            </div>

            {/* Blueprint Corner Crosshairs */}
            {["top-4 left-6", "top-4 right-6", "bottom-4 left-6", "bottom-4 right-6"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-sm font-mono text-[var(--primary)] opacity-35 pointer-events-none select-none z-10`}>+</div>
            ))}

            {/* Giant Watermark GOHUL */}
            <div
                ref={topWatermarkRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
            >
                <span
                    className="font-black uppercase"
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(5rem, 25vw, 28rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        color: "var(--text)",
                        opacity: 0.065,
                        whiteSpace: "nowrap",
                    }}
                >
                    GOHUL
                </span>
            </div>

            {/* ── TOP ROW ── Bio Left only */}
            <div className="relative z-10 w-full flex flex-row items-start pt-24 md:pt-28">
                {/* Bio – Upper Left */}
                <div className="hero-bio-text flex flex-col gap-2 max-w-[220px] md:max-w-[280px]">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-[var(--primary)] opacity-60">+</span>
                        <div className="h-px w-6 bg-[var(--primary)] opacity-40" />
                    </div>
                    <p
                        className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase leading-loose"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)" }}
                    >
                        I design user-centered digital experiences that are simple, smart and impactful.
                    </p>
                </div>
            </div>

            {/* ── CENTER SPACER ── fills space between top and bottom rows */}
            <div className="flex-1" />

            {/* ── BOTTOM ROW ── ©Year + GOHUL name | Resume Button */}
            <div className="relative z-10 w-full flex flex-row items-end justify-between gap-4 pb-5 md:pb-8">
                {/* Big name – Bottom Left */}
                <div className="flex flex-col items-start leading-none">
                    <span
                        className="font-bold uppercase tracking-[0.25em] mb-0.5"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "clamp(9px, 1.2vw, 13px)",
                            color: "var(--text-muted)",
                        }}
                    >
                        ©2026
                    </span>
                    <h1
                        ref={bottomTitleRef}
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "clamp(2.8rem, 9vw, 8rem)",
                            lineHeight: 0.85,
                            letterSpacing: "-0.03em",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: "var(--text)",
                        }}
                    >
                        GOHUL
                    </h1>
                </div>

                {/* Resume Button – Bottom Right */}
                <button
                    onClick={() => setIsResumeOpen(true)}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-full transition-all duration-300 hover:scale-105 group cursor-pointer shadow-xl"
                    style={{
                        background: "#1c1917",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px var(--primary-glow)",
                    }}
                >
                   
                    <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Resume
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>

            {/* ── RESUME MODAL ── */}
            {isResumeOpen && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-950/60 backdrop-blur-xl animate-fadeIn"
                    onClick={() => setIsResumeOpen(false)}
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    <div
                        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[28px] p-6 sm:p-8 md:p-10 flex flex-col gap-6 animate-modalScale custom-scrollbar text-slate-800"
                        style={{
                            background: "rgba(255, 255, 255, 0.98)",
                            backdropFilter: "blur(32px) saturate(180%)",
                            WebkitBackdropFilter: "blur(32px) saturate(180%)",
                            border: "1px solid var(--glass-border)",
                            boxShadow: "0 30px 90px rgba(15, 23, 42, 0.25)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Control Bar: Top Left Download Button & Top Right Close Button — NO white background */}
                        <div className="flex items-center justify-between pb-4 sticky top-0 bg-transparent z-30 pt-1 -mt-2 border-b border-slate-200/40">
                            {/* TOP LEFT: Download Resume Button — Transparent border button */}
                            <a
                                href="/Gohul_Das_Resume.pdf"
                                download="Gohul_Das_Resume.pdf"
                                className="flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-300 text-slate-900 border border-slate-400 hover:bg-slate-900 hover:text-white bg-transparent cursor-pointer"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span>Download PDF</span>
                            </a>

                            {/* TOP RIGHT: Close Button — Transparent border button */}
                            <button
                                onClick={() => setIsResumeOpen(false)}
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90 group text-slate-800 border border-slate-400 hover:bg-slate-900 hover:text-white bg-transparent cursor-pointer"
                                aria-label="Close resume modal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4.5 h-4.5 transition-transform group-hover:scale-110">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Resume Content Sheet — Exact Copy of Gohul Das O V's PDF Resume */}
                        <div className="flex flex-col gap-6 pt-2 text-slate-900 font-sans">
                            {/* Header Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5 border-b border-slate-300/80 items-center">
                                <div className="text-xs font-medium text-slate-600 space-y-0.5">
                                    <p>+91 7356560784</p>
                                    <p>KANNUR, KERALA</p>
                                    <p className="text-slate-800 font-semibold">gohuldasov@gmail.com</p>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        Gohul Das O V
                                    </h2>
                                    <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-700 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        SOFTWARE ENGINEER
                                    </p>
                                </div>
                                <div className="text-xs font-medium text-slate-600 md:text-right space-y-0.5">
                                    <p><a href="https://github.com/gohuldasov" target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-800">github.com/gohuldasov</a></p>
                                    <p><a href="https://linkedin.com/in/gohuldasov" target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-800">linkedin.com/in/gohuldasov</a></p>
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="text-xs sm:text-sm leading-relaxed text-slate-700 border-b border-slate-200/80 pb-5">
                                Results-driven Software Engineer with experience building backend applications using Python, Django, Django REST Framework, REST APIs, MySQL, PostgreSQL, and React. Skilled in designing scalable applications, database management, API integration, debugging, and optimizing application performance. Strong foundation in data structures, algorithms, object-oriented programming, version control (Git), and Agile development methodologies. Passionate about solving complex problems, delivering high-quality software, and learning new technologies to build efficient and reliable applications.
                            </div>

                            {/* Technical Experience Section */}
                            <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">TECHNICAL EXPERIENCE</h3>
                                
                                {/* Experience 1 */}
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-bold text-slate-900">
                                        <span>FULL STACK DEVELOPER</span>
                                        <span>OCTOBER 2025 — MAY 2026</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between text-xs font-bold italic text-slate-700">
                                        <span>CLOUDHOUSE TECHNOLOGIES</span>
                                        <span>THRISSUR, KERALA</span>
                                    </div>
                                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside mt-1 pl-1">
                                        <li>Developed responsive React and TypeScript components using Redux Toolkit.</li>
                                        <li>Collaborated using Git in an Agile development environment.</li>
                                        <li>Developed production-grade UI modules for server administration, DNS management, and database configuration using Hero UI and Tailwind CSS.</li>
                                        <li>Participated in design discussions and implemented solutions aligned with project requirements.</li>
                                        <li>Engineered real-time server provisioning dashboards for Cloudstick (V2) using React, TypeScript, and Redux Toolkit, improving system monitoring response time and user workflow efficiency.</li>
                                    </ul>
                                </div>

                                {/* Experience 2 */}
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-bold text-slate-900">
                                        <span>FULL STACK DEVELOPER INTERN</span>
                                        <span>NOVEMBER 2024 — FEBRUARY 2025</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between text-xs font-bold italic text-slate-700">
                                        <span>LUMINAR TECHNOLAB</span>
                                        <span>ERANAKULAM, KERALA</span>
                                    </div>
                                    <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside mt-1 pl-1">
                                        <li>Assisted senior developers in developing and testing web applications for multiple clients.</li>
                                        <li>Architected, built, and deployed 5+ full-stack web applications leveraging Python (Django) and JavaScript, implementing secure RESTful APIs and optimizing database queries.</li>
                                        <li>Participated in debugging, testing, and improving application performance.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Education Section */}
                            <div className="flex flex-col gap-2.5 border-b border-slate-200/80 pb-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">EDUCATION</h3>
                                <div className="flex flex-col sm:flex-row justify-between text-xs text-slate-800">
                                    <span><strong className="font-bold">MASTERS IN COMPUTER SCIENCE</strong>, SES College, Sreekandapuram</span>
                                    <span className="font-medium text-slate-600">2022 – 2024</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between text-xs text-slate-800">
                                    <span><strong className="font-bold">BACHELORS IN COMPUTER APPLICATION</strong>, AMSTECK Arts and Science College, Kalliassery</span>
                                    <span className="font-medium text-slate-600">2019 — 2022</span>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="flex flex-col gap-2 border-b border-slate-200/80 pb-5 text-xs text-slate-800">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">SKILLS</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Languages</span>
                                    <span>Python, JavaScript (ES6+), TypeScript, HTML5, CSS3</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Backend</span>
                                    <span>Django, Django REST Framework, REST APIs</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Frontend</span>
                                    <span>React.js, Redux Toolkit, Tailwind CSS, Bootstrap, Hero UI, Ant Design</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Databases</span>
                                    <span>MySQL, SQLite, PostgreSQL</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Tools/Platforms</span>
                                    <span>Git, GitHub, Linux, Windows, Vercel, Lovable, MS Office</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1.5">
                                    <span className="font-bold">Core Competencies</span>
                                    <span>Object-Oriented Programming (OOP), Data Structures & Algorithms, Database Design, Authentication & Authorization, Debugging & Troubleshooting, Agile Development</span>
                                </div>
                            </div>

                            {/* Projects Section */}
                            <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-5">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">PROJECTS</h3>
                                
                                <div className="text-xs space-y-1">
                                    <p className="font-bold text-slate-900">K-SMART</p>
                                    <p className="text-slate-700">• Developed a government service management application to digitize citizen requests and improve administrative workflows.</p>
                                    <p className="text-slate-600 font-medium">• Tools Used: Python, Django, React, Tailwind CSS, MySQL, AWS S3</p>
                                </div>

                                <div className="text-xs space-y-1">
                                    <p className="font-bold text-slate-900">PEOPLE’S VOICE</p>
                                    <p className="text-slate-700">• Developed a crime reporting and monitoring platform that enables users to report incidents and assists authorities in tracking criminal activities.</p>
                                    <p className="text-slate-600 font-medium">• Tools Used: Python, Django, HTML, CSS, MySQL</p>
                                </div>

                                <div className="text-xs space-y-1">
                                    <p className="font-bold text-slate-900">RED DROP</p>
                                    <p className="text-slate-700">• Built a real-time blood bank management system to track donor registries, blood group inventories, and automated request processing workflows using Django and SQLite.</p>
                                    <p className="text-slate-600 font-medium">• Tools Used: Python, Django, HTML, CSS, SQLite</p>
                                </div>
                            </div>

                            {/* Honors & Awards Section */}
                            <div className="flex flex-col gap-2 text-xs text-slate-800">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">HONORS & AWARDS</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-700">
                                    <li>Python Web Development – National Council for Technology and Training (NCTT)</li>
                                    <li>Awarded 1st prize for computer designing conducted by Kannur University.</li>
                                    <li>Awarded B grade for multimedia presentation in state level IT fair.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;