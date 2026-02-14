import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const text = "I am a creative developer with a passion for building beautiful and functional websites. I specialize in React, TypeScript, and Tailwind CSS. I have a strong eye for design and detail, and I love brings ideas to life through code.";
    const words = text.split(" ");

    useEffect(() => {
        if (!textRef.current || !containerRef.current) return;

        const wordsElements = textRef.current.querySelectorAll('.word');

        gsap.fromTo(wordsElements,
            {
                opacity: 0.1,
                color: "#333"
            },
            {
                opacity: 1,
                color: "#fff",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: true,
                    // markers: true, // Uncomment for debugging
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="about" ref={containerRef} className="min-h-screen bg-black text-white py-20 px-6 flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">About Me</span>
                </div>

                <p ref={textRef} className="text-4xl md:text-6xl font-bold leading-tight flex flex-wrap gap-x-3 gap-y-2">
                    {words.map((word, index) => (
                        <span key={index} className="word transition-colors duration-200">
                            {word}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
};

export default About;
