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
                    
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="about" ref={containerRef} className=" pt-12 pb-32 px-12 text-white  flex items-center ">
            <div className=" ">
                <div className="flex items-center gap-2 mb-8">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#a3e635]">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    <span className="text-[#a3e635] text-sm font-bold tracking-widest uppercase">About Me</span>
                </div>

                <p ref={textRef} className="text-2xl md:text-4xl font-bold leading-tight flex flex-wrap gap-x-3 gap-y-2">
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
