import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    const text = "I am a creative developer with a passion for building beautiful and functional websites. I specialize in React, TypeScript, and Tailwind CSS. I have a strong eye for design and detail, and I love bringing ideas to life through code.";
    const words = text.split(" ");

    useGSAP(() => {
        if (!textRef.current || !containerRef.current) return;

        const wordsElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(wordsElements,
            {
                opacity: 0.1,
                y: 10,
                filter: "blur(4px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: true,
                }
            }
        );

        // Subtle parallax for the section title
        gsap.to(".about-title", {
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1.5
            }
        });

    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="py-32 px-6 md:px-24 text-white flex flex-col items-start relative overflow-hidden bg-[#09090b]">
            {/* Background Accent */}
            <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

            <div ref={containerRef} className="relative z-10 w-full max-w-6xl">
                <div className="about-title flex items-center gap-4 mb-16">
                    <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                    <span className="text-[var(--primary)] text-xs font-bold tracking-[0.4em] uppercase">Who I Am</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                        Crafting <br /> Digital <br /> <span className="text-gray-600 italic">Essence</span>
                    </h2>

                    <p ref={textRef} className="text-3xl md:text-5xl font-medium leading-[1.1] tracking-tight flex flex-wrap gap-x-4 gap-y-2 opacity-100">
                        {words.map((word, index) => (
                            <span key={index} className="word inline-block transition-colors duration-200">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>

                <div className="mt-24 flex justify-end">
                    <div className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed font-light lowercase tracking-wider">
                        based in india, working with clients worldwide to create bespoke digital solutions that blend art and technology in seamless harmony.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
