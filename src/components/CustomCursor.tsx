import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Position tracking & quickTo setters for instant snappy response
        const dotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.16, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.16, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            dotX(clientX);
            dotY(clientY);
            ringX(clientX);
            ringY(clientY);
        };

        const handleMouseLeave = () => {
            gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        };

        const handleMouseEnter = () => {
            gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        const handleOverClickable = () => {
            ring.classList.add("hovered");
            gsap.to(dot, { scale: 0.4, opacity: 0.6, duration: 0.2 });
        };

        const handleOutClickable = () => {
            ring.classList.remove("hovered");
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
        };

        const handleOverProject = () => {
            setCursorText("view");
            ring.classList.add("hovered-project");
            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        };

        const handleOutProject = () => {
            ring.classList.remove("hovered-project");
            setCursorText("");
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
        };

        const addHoverListeners = () => {
            const clickables = document.querySelectorAll(
                'a, button, select, input, textarea, [role="button"], .cursor-pointer, .expertise-item, .exp-row, .domain-row, .orbit-item'
            );
            
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleOverClickable);
                el.removeEventListener("mouseleave", handleOutClickable);
                el.addEventListener("mouseenter", handleOverClickable);
                el.addEventListener("mouseleave", handleOutClickable);
            });

            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((el) => {
                el.removeEventListener("mouseenter", handleOverProject);
                el.removeEventListener("mouseleave", handleOutProject);
                el.addEventListener("mouseenter", handleOverProject);
                el.addEventListener("mouseleave", handleOutProject);
            });
        };

        addHoverListeners();

        const observer = new MutationObserver(() => {
            addHoverListeners();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });

        gsap.set([dot, ring], { opacity: 1 });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            observer.disconnect();

            const clickables = document.querySelectorAll(
                'a, button, select, input, textarea, [role="button"], .cursor-pointer, .expertise-item, .exp-row, .domain-row, .orbit-item'
            );
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleOverClickable);
                el.removeEventListener("mouseleave", handleOutClickable);
            });

            const projectCards = document.querySelectorAll(".project-card");
            projectCards.forEach((el) => {
                el.removeEventListener("mouseenter", handleOverProject);
                el.removeEventListener("mouseleave", handleOutProject);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="custom-cursor-dot pointer-events-none hidden md:block"
            />
            <div
                ref={ringRef}
                className="custom-cursor-ring pointer-events-none hidden md:block"
            >
                <span className="custom-cursor-text">{cursorText}</span>
            </div>
        </>
    );
};

export default CustomCursor;
