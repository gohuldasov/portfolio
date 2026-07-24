import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const [activeTab, setActiveTab] = useState(0);
    const container = useRef<HTMLElement>(null);

    const expertiseItems = [
        {
            title: "Development",
            tag: "Engineering",
            icon: "⚔",
            description: "I build scalable, high-performance web applications using modern technologies like React, TypeScript, and Node.js — architected for maintainability and speed."
        },
        {
            title: "UI/UX Design",
            tag: "Bespoke Design",
            icon: "🛡",
            description: "I design intuitive and visually stunning user interfaces. My approach fuses aesthetic precision with deep usability principles to create seamless digital experiences."
        },
        {
            title: "Branding",
            tag: "Visual Identity",
            icon: "👁",
            description: "I help brands establish powerful identities through logo design, color systems, and visual storytelling that resonates with their audience and stands apart."
        }
    ];

    const techStack = [
        { name: "React", icon: "⚛" },
        { name: "TypeScript", icon: "TS" },
        { name: "Next.js", icon: "▲" },
        { name: "Node.js", icon: "🌐" },
        { name: "MongoDB", icon: "🍃" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "Docker", icon: "🐳" },
        { name: "GSAP", icon: "🎭" },
        { name: "Tailwind", icon: "🎨" },
    ];

    useGSAP(() => {
        gsap.fromTo(".expertise-item",
            { x: -40, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
                scrollTrigger: { trigger: ".expertise-list", start: "top 72%" }
            }
        );
        gsap.fromTo(".tech-tag",
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out",
                scrollTrigger: { trigger: ".tech-stack-area", start: "top 80%" }
            }
        );
    }, { scope: container });

    return (
        <section id="expertise" ref={container} className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px" }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left — Accordion */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                            <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                My Mastery
                            </span>
                        </div>
                        <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-tight mb-14"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Technical<br />
                            <span style={{
                                fontStyle: "italic",
                                background: "linear-gradient(135deg, var(--primary) 0%, var(--shimmer) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>Prowess</span>
                        </h2>

                        <div className="expertise-list space-y-4">
                            {expertiseItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="expertise-item group p-7 rounded-2xl cursor-none transition-all duration-500"
                                    style={{
                                        background: activeTab === index ? "var(--glass-bg)" : "transparent",
                                        backdropFilter: activeTab === index ? "blur(20px) saturate(180%)" : "none",
                                        WebkitBackdropFilter: activeTab === index ? "blur(20px) saturate(180%)" : "none",
                                        border: activeTab === index ? "1px solid var(--glass-border)" : "1px solid transparent",
                                        boxShadow: activeTab === index ? `0 8px 32px rgba(0,0,0,0.3), 0 0 24px var(--primary-glow)` : "none",
                                    }}
                                    onClick={() => setActiveTab(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{item.icon}</span>
                                            <div>
                                                <span className="text-[9px] font-bold uppercase tracking-[0.25em] block"
                                                    style={{ color: activeTab === index ? "var(--primary)" : "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    {item.tag}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: activeTab === index ? "var(--text)" : "var(--text-muted)" }}
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shrink-0"
                                            style={{
                                                background: activeTab === index ? "var(--primary)" : "var(--glass-bg)",
                                                border: "1px solid var(--glass-border)",
                                                backdropFilter: "blur(10px)",
                                                transform: activeTab === index ? "rotate(180deg)" : "rotate(0deg)",
                                                color: activeTab === index ? "var(--background)" : "var(--text-muted)",
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                                        </div>
                                    </div>

                                    <div className={`grid transition-all duration-500 ease-in-out ${activeTab === index ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <p className="text-base font-light leading-relaxed overflow-hidden"
                                            style={{ color: "var(--text-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "18px" }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Tech Stack + Image */}
                    <div className="relative">
                        {/* Image panel */}
                        <div className="relative rounded-[32px] overflow-hidden h-80 lg:h-auto lg:aspect-[3/4]"
                            style={{
                                background: "var(--glass-bg)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid var(--glass-border)",
                                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80"
                                alt="Development workspace"
                                className="w-full h-full object-cover opacity-30"
                                style={{ filter: "grayscale(60%) saturate(80%)" }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0"
                                style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 50%)" }}
                            />
                            {/* Glass shimmer */}
                            <div className="absolute inset-0"
                                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
                            />
                        </div>

                        {/* Tech stack overlay */}
                        <div className="tech-stack-area absolute bottom-8 inset-x-6">
                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="tech-tag px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-default"
                                        style={{
                                            background: "var(--glass-bg)",
                                            backdropFilter: "blur(16px)",
                                            border: "1px solid var(--glass-border)",
                                            color: "var(--text-muted)",
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget;
                                            el.style.borderColor = "var(--primary)";
                                            el.style.color = "var(--primary)";
                                            el.style.boxShadow = "0 0 16px var(--primary-glow)";
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget;
                                            el.style.borderColor = "var(--glass-border)";
                                            el.style.color = "var(--text-muted)";
                                            el.style.boxShadow = "none";
                                        }}
                                    >
                                        <span className="mr-1.5 text-xs">{tech.icon}</span>
                                        {tech.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
