"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function MagneticLink({ children, href, onClick }: { children: React.ReactNode, href: string, onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative text-sm font-medium text-muted hover:text-primary transition-colors group px-4 py-2"
    >
      {children}
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-[60%] rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_8px_var(--primary)]"></span>
    </motion.a>
  );
}

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex items-center justify-between rounded-full px-8 py-3 transition-all duration-500 overflow-hidden ${
            isScrolled
              ? "bg-white/5 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
              : "bg-transparent"
          }`}
        >
          {/* Animated SVG Morphing Background on Scroll */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[-1] opacity-30"
              >
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path 
                    d="M0,0 Q50,100 100,0 V100 H0 Z" 
                    fill="url(#grad)"
                    animate={{ 
                      d: ["M0,0 Q50,100 100,0 V100 H0 Z", "M0,0 Q50,0 100,0 V100 H0 Z", "M0,0 Q50,100 100,0 V100 H0 Z"] 
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="var(--primary-dark)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo */}
          <a href="#" className="magnetic text-2xl font-heading font-black tracking-tighter flex items-center gap-2 group z-10">
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background shadow-[0_0_15px_var(--primary)]"
            >
              S
            </motion.div>
            <span className="text-foreground relative overflow-hidden flex items-center">
              Shruti<span className="text-primary animate-pulse">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 z-10">
            {navLinks.map((link) => (
              <MagneticLink key={link.name} href={link.href}>
                {link.name}
              </MagneticLink>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-4 z-10">
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic hidden md:flex relative overflow-hidden items-center justify-center px-6 py-2 text-sm font-bold rounded-full bg-primary text-background group shadow-[0_0_15px_var(--primary)]"
            >
              <span className="absolute inset-0 bg-white/30 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out rounded-full"></span>
              <span className="relative z-10 mix-blend-difference text-white">Resume</span>
            </a>
            
            <button
              className="md:hidden text-foreground hover:text-primary transition-colors magnetic p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-20 left-4 right-4 md:hidden bg-white/10 dark:bg-black/40 backdrop-blur-3xl rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl z-30"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors text-2xl font-heading font-bold p-4 rounded-xl hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full text-center px-6 py-4 text-lg font-bold rounded-xl bg-primary text-background hover:brightness-110 transition-all shadow-[0_0_20px_var(--primary)]"
              >
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
