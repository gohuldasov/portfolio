import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const text = "I am a creative developer with a passion for building beautiful and functional digital experiences. I specialize in React, TypeScript, and modern web technologies — blending engineering precision with design artistry.";
    const words = text.split(" ");

    useGSAP(() => {
        if (!textRef.current || !containerRef.current) return;

        const wordsElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(wordsElements,
            { opacity: 0.08, y: 12, filter: "blur(6px)" },
            {
                opacity: 1, y: 0, filter: "blur(0px)",
                stagger: 0.06,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: true,
                }
            }
        );

        gsap.to(".about-label", {
            y: -40,
            scrollTrigger: { trigger: containerRef.current, scrub: 1.5 }
        });

        // Stats counter
        gsap.utils.toArray<HTMLElement>(".stat-number").forEach(el => {
            const target = parseInt(el.dataset.target || "0");
            gsap.fromTo(el, { textContent: "0" }, {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: { trigger: el, start: "top 85%" },
            });
        });

    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="relative py-36 overflow-hidden"
            style={{ padding: "144px 48px", background: "transparent" }}
        >
            {/* BG glow accent */}
            <div className="absolute top-1/2 right-[-8%] w-96 h-96 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, var(--orb1), transparent 70%)",
                    filter: "blur(80px)",
                    transform: "translateY(-50%)",
                }}
            />

            <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto w-full">

                {/* Label */}
                <div className="about-label flex items-center gap-4 mb-16">
                    <div className="w-14 h-px" style={{ background: "var(--primary)", boxShadow: "0 0 8px var(--primary-glow)" }} />
                    <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ color: "var(--primary)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Who I Am
                    </span>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

                    {/* Left */}
                    <div>
                        <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-tight mb-10"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Crafting<br />
                            Digital<br />
                            <span
                                style={{
                                    fontStyle: "italic",
                                    background: "linear-gradient(135deg, var(--primary) 0%, var(--shimmer) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Essence
                            </span>
                        </h2>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10">
                            {[
                                { value: 5, label: "Projects" },
                                { value: 1, label: "Years Exp." },
                                { value: 8, label: "Clients" },
                            ].map(({ value, label }) => (
                                <div key={label} className="relative p-5 rounded-2xl text-center"
                                    style={{
                                        background: "var(--glass-bg)",
                                        backdropFilter: "blur(16px)",
                                        border: "1px solid var(--glass-border)",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                                    }}
                                >
                                    <div className="text-3xl font-black" style={{ color: "var(--primary)", fontFamily: "Cinzel, serif" }}>
                                        <span className="stat-number" data-target={value}>0</span>+
                                    </div>
                                    <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)", fontFamily: "Cinzel, serif" }}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — word reveal */}
                    <div>
                        <p
                            ref={textRef}
                            className="text-3xl md:text-4xl font-medium leading-[1.2] tracking-tight flex flex-wrap gap-x-3 gap-y-2"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "var(--text)" }}
                        >
                            {words.map((word, index) => (
                                <span key={index} className="word inline-block" style={{ transition: "color 0.2s" }}>
                                    {word}
                                </span>
                            ))}
                        </p>

                        <div className="mt-16 pt-10 border-t" style={{ borderColor: "var(--glass-border)" }}>
                            <p className="text-base font-light leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "18px" }}>
                                Based in India, partnering with clients worldwide to craft bespoke digital solutions that blend artistry and engineering in seamless harmony.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
