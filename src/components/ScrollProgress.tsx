import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SectionConfig {
    id: string;
    label: string;
}

const sections: SectionConfig[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'experience', label: 'Experience' },
    { id: 'awards', label: 'Awards' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
];

const ScrollProgress = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const activeSectionRef = useRef<string | null>(null);

    const updateLabel = useCallback((sectionId: string | null) => {
        if (activeSectionRef.current === sectionId) return;
        activeSectionRef.current = sectionId;

        if (!labelRef.current) return;

        if (sectionId) {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;

            // Animate out, swap text, animate in
            gsap.to(labelRef.current, {
                opacity: 0,
                y: -8,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    setActiveSection(sectionId);
                    gsap.to(labelRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                        ease: "power2.out",
                    });
                }
            });
        } else {
            setActiveSection(null);
        }
    }, []);

    // ─── Section detection via scroll listener ─────────────────────────────────
    // We intentionally avoid GSAP ScrollTrigger here because pinned sections
    // (like Projects) get position:fixed applied by GSAP, which makes
    // trigger-based position calculations unreliable.
    //
    // Instead, we use getBoundingClientRect() directly:
    //   • Normal sections: rect.top moves as the user scrolls.
    //   • GSAP-pinned sections: rect.top stays at ~0 the entire time they are
    //     pinned — so they're always detected as "above the 60% threshold"
    //     for the full duration of the horizontal scroll. ✓
    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Show/hide the whole indicator based on whether we're past the hero
            const aboutEl = document.getElementById('about');
            if (aboutEl) {
                const aboutRect = aboutEl.getBoundingClientRect();
                if (aboutRect.top > viewportHeight * 0.8) {
                    setIsVisible(false);
                    updateLabel(null);
                    return;
                }
                setIsVisible(true);
            }

            const projectsTrigger = ScrollTrigger.getById('projects-trigger');
            let currentSectionId: string | null = null;
            let projectsProgress: number | null = null;

            if (projectsTrigger && scrollY >= projectsTrigger.start && scrollY < projectsTrigger.end) {
                currentSectionId = 'projects';
                projectsProgress = projectsTrigger.progress;
            } else {
                // Find the last section whose top has crossed 60% of the viewport.
                // Iterating in reverse and breaking at first match gives us the
                // bottom-most section that is "in view".
                for (let i = sections.length - 1; i >= 0; i--) {
                    const sectionId = sections[i].id;
                    const el = document.getElementById(sectionId);
                    if (!el) continue;

                    // Special checks:
                    // 1. If we are BEFORE the projects section begins, don't match projects or any section after projects
                    if (projectsTrigger && scrollY < projectsTrigger.start) {
                        const projectsIdx = sections.findIndex(s => s.id === 'projects');
                        const currentIdx = sections.findIndex(s => s.id === sectionId);
                        if (currentIdx >= projectsIdx) {
                            continue;
                        }
                    }
                    // 2. If we are AFTER the projects section ends, don't match projects
                    if (projectsTrigger && scrollY >= projectsTrigger.end && sectionId === 'projects') {
                        continue;
                    }

                    const rect = el.getBoundingClientRect();
                    if (rect.top <= viewportHeight * 0.6) {
                        currentSectionId = sectionId;
                        break;
                    }
                }
            }

            updateLabel(currentSectionId);

            // Update the per-section vertical progress bar
            if (currentSectionId) {
                const sectionBar = document.querySelector(
                    '.scroll-progress-section-fill'
                ) as HTMLElement;
                if (sectionBar) {
                    if (currentSectionId === 'projects' && projectsProgress !== null) {
                        sectionBar.style.transform = `scaleY(${projectsProgress})`;
                    } else {
                        const el = document.getElementById(currentSectionId);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            const progress = Math.min(
                                1,
                                Math.max(
                                    0,
                                    (viewportHeight - rect.top) / (rect.height + viewportHeight)
                                )
                            );
                            sectionBar.style.transform = `scaleY(${progress})`;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // run once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateLabel]);

    // ─── Top horizontal progress bar (ScrollTrigger is fine here) ─────────────
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0,
            onUpdate: (self) => {
                if (progressBarRef.current) {
                    gsap.set(progressBarRef.current, { scaleX: self.progress });
                }
            },
        });
    }, { scope: containerRef });

    const activeSectionData = sections.find(s => s.id === activeSection);
    const activeIndex = sections.findIndex(s => s.id === activeSection);

    return (
        <div ref={containerRef}>
            {/* Top horizontal progress bar */}
            <div
                className={`scroll-progress-bar-container fixed top-0 left-0 w-full z-[100] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ height: '3px' }}
            >
                <div
                    ref={progressBarRef}
                    className="scroll-progress-bar h-full origin-left"
                    style={{
                        transform: 'scaleX(0)',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
                    }}
                />
                {/* Glow effect */}
                <div
                    className="absolute top-0 left-0 w-full h-full blur-sm opacity-60"
                    style={{
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
                        transform: progressBarRef.current?.style.transform || 'scaleX(0)',
                    }}
                />
            </div>

            {/* Left side section indicator */}
            <div
                className={`fixed left-6 top-1/2 -translate-y-1/2 z-[99] flex flex-col items-center gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ pointerEvents: 'none' }}
            >
                {/* Section name - vertically rotated */}
                <div
                    ref={labelRef}
                    className="flex flex-col items-center gap-5"
                >
                    {/* Section counter */}
                    <span className="text-[10px] font-bold tracking-[0.3em] text-(--primary) tabular-nums">
                        {activeIndex >= 0 ? String(activeIndex + 1).padStart(2, '0') : ''}
                        <span className="text-white/20"> / {String(sections.length).padStart(2, '0')}</span>
                    </span>

                    {/* Vertical progress track */}
                    <div className="relative w-[2px] h-16 bg-white/8 rounded-full overflow-hidden">
                        <div
                            className="scroll-progress-section-fill absolute top-0 left-0 w-full h-full origin-top rounded-full"
                            style={{
                                background: 'linear-gradient(180deg, var(--primary), var(--secondary))',
                                transform: 'scaleY(0)',
                                transition: 'transform 0.1s ease-out',
                            }}
                        />
                    </div>

                    {/* Section name */}
                    <span
                        className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/50"
                        style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                        }}
                    >
                        {activeSectionData?.label || ''}
                    </span>
                </div>

                {/* Dot indicators for all sections */}
                <div className="flex flex-col gap-2 mt-2">
                    {sections.map((section, i) => (
                        <div
                            key={section.id}
                            className={`rounded-full transition-all duration-500 ${
                                i === activeIndex
                                    ? 'w-[6px] h-[6px] bg-(--primary) shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                                    : 'w-[4px] h-[4px] bg-white/15'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollProgress;
