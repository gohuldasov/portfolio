import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { educationData } from "../../components/education/educationData";
import { EducationCard } from "../../components/education/EducationCard";
import { EducationBackground } from "../../components/education/EducationBackground";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // DESKTOP & TABLET STACKING (>= 1024px)
            mm.add("(min-width: 1024px)", () => {
                const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
                if (cards.length === 0) return;

                const totalCards = cards.length;

                // Set up initial positions: Next cards start COMPLETELY HIDDEN below screen
                cards.forEach((card, index) => {
                    if (index > 0) {
                        gsap.set(card, {
                            yPercent: 140,
                            opacity: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        });
                    } else {
                        gsap.set(card, {
                            yPercent: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        });
                    }
                });

                // Create master timeline pinned to trigger container
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top+=100",
                        end: `+=${totalCards * 110}%`,
                        pin: true,
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (totalCards - 1),
                            duration: { min: 0.25, max: 0.6 },
                            ease: "power2.inOut",
                        },
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const currentIndex = Math.min(
                                Math.floor(progress * totalCards),
                                totalCards - 1
                            );
                            setActiveIndex(currentIndex);

                            if (progressBarRef.current) {
                                gsap.to(progressBarRef.current, {
                                    scaleX: progress,
                                    duration: 0.1,
                                    ease: "none",
                                });
                            }
                        },
                    },
                });

                // Animate card transitions: Next card ONLY appears on scroll
                for (let i = 0; i < totalCards - 1; i++) {
                    const currentCard = cards[i];
                    const nextCard = cards[i + 1];

                    // 1. Fade out previous card so it does not show under next card
                    tl.to(
                        currentCard,
                        {
                            scale: 0.95,
                            opacity: 0,
                            filter: "blur(6px)",
                            ease: "power1.inOut",
                            duration: 1,
                        },
                        `card-${i}`
                    );

                    // 2. Slide next card up from bottom and fade in ON SCROLL ONLY
                    tl.to(
                        nextCard,
                        {
                            yPercent: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            ease: "power1.inOut",
                            duration: 1,
                        },
                        `card-${i}`
                    );
                }
            });

            // MOBILE / SMALL SCREEN FALLBACK (< 1024px)
            mm.add("(max-width: 1023px)", () => {
                const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

                cards.forEach((card, index) => {
                    gsap.set(card, { yPercent: 0, scale: 1, opacity: 1, filter: "none" });

                    gsap.fromTo(
                        card,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                                onEnter: () => setActiveIndex(index),
                            },
                        }
                    );
                });
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="education"
            ref={sectionRef}
            aria-label="Education and Academic Background"
            className="relative py-20 sm:py-24 lg:py-28 overflow-hidden select-none"
            style={{ padding: "100px 24px", background: "transparent" }}
        >
            {/* Background Mesh & Orbs */}
            <EducationBackground />

            {/* Main Stage Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Trigger Section Wrapper */}
                <div ref={triggerRef} className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* LEFT SIDEBAR (Cols 1-4): Pinned Header & Timeline Progress Line */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col justify-between space-y-6 z-20">
                            <div>
                                {/* Category Badge Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-14 h-px"
                                        style={{
                                            background: "var(--primary)",
                                            boxShadow: "0 0 8px var(--primary-glow)",
                                        }}
                                    />
                                    <span
                                        className="text-xs font-bold tracking-[0.4em] uppercase"
                                        style={{
                                            color: "var(--primary)",
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}
                                    >
                                        Academic Journey
                                    </span>
                                </div>

                                {/* Heading Matching Site Style */}
                                <h2
                                    className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold uppercase leading-[0.88] tracking-tight mb-6"
                                    style={{
                                        color: "var(--text)",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    Education &<br />
                                    <span
                                        style={{
                                            fontStyle: "italic",
                                            background:
                                                "linear-gradient(135deg, var(--text-muted) 0%, rgba(2, 132, 199, 0.5) 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        Degrees
                                    </span>
                                </h2>

                                <p
                                    className="text-base sm:text-lg font-light leading-relaxed max-w-sm mb-6"
                                    style={{
                                        color: "var(--text-muted)",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: "18px",
                                    }}
                                >
                                    Foundational computer science principles paired with modern fullstack cloud engineering practices.
                                </p>
                            </div>

                            {/* Vertical Timeline Progress Line (Desktop) */}
                            <div
                                className="hidden lg:block pt-6"
                                style={{ borderTop: "1px solid var(--glass-border)" }}
                            >
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-3">
                                    <span style={{ color: "var(--primary)" }}>
                                        STACK PROGRESS
                                    </span>
                                    <span style={{ color: "var(--text-muted)" }}>
                                        0{activeIndex + 1} / 0{educationData.length}
                                    </span>
                                </div>

                                {/* Progress Track Line */}
                                <div
                                    className="relative w-full h-1.5 rounded-full overflow-hidden mb-6"
                                    style={{ background: "rgba(255, 255, 255, 0.4)", border: "1px solid var(--glass-border)" }}
                                >
                                    <div
                                        ref={progressBarRef}
                                        className="absolute inset-0 origin-left rounded-full"
                                        style={{
                                            background: "var(--primary)",
                                            boxShadow: "0 0 10px var(--primary-glow)",
                                            transform: "scaleX(0)",
                                        }}
                                    />
                                </div>

                                {/* Step Nav Dots */}
                                <div className="space-y-3">
                                    {educationData.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-center gap-3 text-xs font-bold transition-all duration-300 ${
                                                idx === activeIndex
                                                    ? "translate-x-2"
                                                    : "opacity-60 hover:opacity-100"
                                            }`}
                                            style={{
                                                color: idx === activeIndex ? "var(--primary)" : "var(--text-muted)",
                                            }}
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                                    idx === activeIndex
                                                        ? "scale-125"
                                                        : ""
                                                }`}
                                                style={{
                                                    background: idx === activeIndex ? "var(--primary)" : "var(--text-muted)",
                                                    boxShadow: idx === activeIndex ? "0 0 8px var(--primary-glow)" : "none",
                                                }}
                                            />
                                            <span className="font-mono">{item.number}</span>
                                            <span className="truncate max-w-[220px]">{item.degree}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT STAGE (Cols 5-12): Shifted Further Right */}
                        <div className="lg:col-span-8 relative flex justify-end lg:pl-6">
                            {/* Card stack container with overflow hidden to clip off-screen cards until scroll */}
                            <div className="relative w-full space-y-6 lg:space-y-0 lg:h-[560px] flex flex-col items-end overflow-hidden">
                                {educationData.map((edu, idx) => (
                                    <div
                                        key={edu.id}
                                        ref={(el) => {
                                            cardsRef.current[idx] = el;
                                        }}
                                        className="relative lg:absolute lg:inset-0 w-full flex justify-end"
                                        style={{
                                            zIndex: idx + 1,
                                        }}
                                    >
                                        <EducationCard
                                            data={edu}
                                            index={idx}
                                            totalCards={educationData.length}
                                            isActive={idx === activeIndex}
                                        />
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

export default Education;
