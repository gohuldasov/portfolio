import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Awards', href: '#awards' },
        { name: 'Contact', href: '#contact' },
    ];

    // Scroll spy & scrolled threshold listener
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const scrollPosition = window.scrollY + 200;
            for (let i = navLinks.length - 1; i >= 0; i--) {
                const sectionId = navLinks[i].href.substring(1);
                const element = document.getElementById(sectionId);
                if (element) {
                    const top = element.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveLink(navLinks[i].href);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.3
        });
    }, { scope: navRef });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setActiveLink(href);
        setMobileMenuOpen(false);

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between
                    ${isScrolled
                        ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-fit rounded-full py-3 px-6 md:px-8 shadow-2xl'
                        : 'top-0 left-0 w-full bg-transparent py-6 px-6 md:px-20'
                    }
                `}
                style={isScrolled ? {
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: `0 8px 32px rgba(15, 23, 42, 0.1), 0 0 20px var(--primary-glow)`,
                } : {}}
            >
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className={`text-xl md:text-2xl font-bold tracking-tighter transition-all ${isScrolled ? 'mr-4 md:mr-10' : ''}`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    <span style={{ color: "var(--primary)" }}>G</span>
                    <span style={{ color: "var(--text)" }}>D</span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 md:gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="relative group py-1 transition-all duration-300"
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "10px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: activeLink === link.href ? "var(--primary)" : "var(--text-muted)",
                            }}
                        >
                            {link.name}
                            <span
                                className="absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300"
                                style={{
                                    background: "var(--primary)",
                                    width: activeLink === link.href ? "100%" : "0%",
                                    boxShadow: "0 0 6px var(--primary-glow)",
                                }}
                            />
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-full focus:outline-none"
                    style={{ color: "var(--text)" }}
                    aria-label="Toggle Navigation Menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-all duration-300"
                    style={{
                        background: "rgba(237, 244, 253, 0.95)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-lg font-bold uppercase tracking-[0.2em] transition-colors"
                            style={{
                                color: activeLink === link.href ? "var(--primary)" : "var(--text)",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </>
    );
};

export default Navbar;