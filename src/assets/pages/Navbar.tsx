import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 1 // Delay to let Hero start first
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
                    ? 'top-6 left-1/2 -translate-x-1/2 w-fit rounded-full glass py-3 px-8 shadow-2xl'
                    : 'top-0 left-0 w-full bg-transparent py-8 px-12 md:px-24'
                }
            `}
        >
            <div className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'hidden md:block mr-12' : ''}`}>
                <span className="text-(--primary)">G</span>D
            </div>

            <div className="flex items-center gap-6 md:gap-10">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setActiveLink(link.href)}
                        className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group
                            ${activeLink === link.href ? 'text-white' : 'text-gray-500 hover:text-white'}
                        `}
                    >
                        {link.name}
                        <span className={`absolute -bottom-1 left-0 h-px bg-(--primary) transition-all duration-300 
                            ${activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                        `}></span>
                    </a>
                ))}
            </div>

            <div className={`hidden md:flex items-center ml-12 ${isScrolled ? '' : ''}`}>
                <button className="text-white hover:text-(--primary) transition-colors p-2 glass rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;