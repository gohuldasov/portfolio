
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      // Show dynamic island after scrolling down 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-between
        ${isScrolled
          ? 'top-4 left-1/2 -translate-x-1/2 w-fit rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl py-3 px-8'
          : 'top-0 left-0 w-full bg-transparent py-8 px-12'
        }
      `}
    >
      {/* Left: Brand */}
      {/* Hide brand in dynamic island mode if space is tight, or keep it manageable. 
          The reference has "DC" on the far left. In dynamic island, we usually want to center the nav.
          Let's keep "GD" visible always for now, but maybe smaller in island mode if needed.
      */}
      <div className={`text-2xl font-bold text-white tracking-tight ${isScrolled ? 'hidden md:block mr-8' : ''}`}>
        GD
      </div>

      {/* Center: Links */}
      <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setActiveLink(link.href)}
            className={`transition-colors flex items-center gap-2 hover:text-white ${activeLink === link.href ? 'text-white' : ''
              }`}
          >
            {activeLink === link.href && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]"></span>
            )}
            {link.name}
          </a>
        ))}
      </div>

      {/* Right: Theme/Icon */}
      <div className={`flex items-center ml-8 ${isScrolled ? '' : ''}`}>
        {/* Simple moon icon as per reference */}
        <button className="text-white hover:text-[#a3e635] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;