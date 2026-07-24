import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        });
    }, { scope: navRef });

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Awards', href: '#awards' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            ref={navRef}
            className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between
                ${isScrolled
                    ? 'top-5 left-1/2 -translate-x-1/2 w-fit rounded-full py-3 px-8 shadow-2xl'
                    : 'top-0 left-0 w-full bg-transparent py-8 px-12 md:px-24'
                }
            `}
            style={isScrolled ? {
                background: "var(--glass-bg)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid var(--glass-border)",
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px var(--primary-glow)`,
            } : {}}
        >
            {/* Logo */}
            <div className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'hidden md:block mr-12' : ''}`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
                <span style={{ color: "var(--primary)" }}>G</span>
                <span style={{ color: "var(--text)" }}>D</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 md:gap-10">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setActiveLink(link.href)}
                        className="relative group transition-all duration-300"
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: activeLink === link.href ? "var(--primary)" : "var(--text-muted)",
                        }}
                    >
                        {link.name}
                        <span
                            className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                            style={{
                                background: "var(--primary)",
                                width: activeLink === link.href ? "100%" : "0%",
                                boxShadow: "0 0 6px var(--primary-glow)",
                            }}
                        />
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;