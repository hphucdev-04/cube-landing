"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, CubeLogoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NavSection {
  id: string;
  label: string;
}

const NAV_SECTIONS: NavSection[] = [
  { id: "hero", label: "Get Started" },
  { id: "harness", label: "Harness" },
  { id: "demo", label: "Demo" },
  { id: "commands", label: "Commands" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock scroll spy while smoothly scrolling from click
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll handler with offset for sticky navbar
  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "#hero");
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      // Scroll flush to section boundary so the dividing line and section above are completely out of view
      const elementPosition = Math.ceil(el.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  // RAF-throttled scroll spy to update active nav section without layout thrashing
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.scrollHeight;

          // Bottom threshold -> activate FAQ
          if (scrollY + windowHeight >= fullHeight - 100) {
            setActiveSection("faq");
            ticking = false;
            return;
          }

          // Top of page -> activate hero
          if (scrollY < 180) {
            setActiveSection("hero");
            ticking = false;
            return;
          }

          // Check section positions relative to activation line (38% of viewport)
          const activationLine = windowHeight * 0.38;
          let currentId = "hero";

          for (let i = 0; i < NAV_SECTIONS.length; i++) {
            const id = NAV_SECTIONS[i].id;
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= activationLine) {
                currentId = id;
              }
            }
          }

          setActiveSection(currentId);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, []);

  return (
    <header className="sticky top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-center">
        {/* Floating Centered Pill Navbar */}
        <div className="w-full sm:w-auto pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-full bg-[#18181B]/90 backdrop-blur-xl border border-[#27272A] shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
          {/* Brand Logo (Scrolls to top) */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group px-2 sm:px-2.5 py-1 rounded-full hover:bg-white/5 cursor-pointer select-none text-left transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
              <CubeLogoIcon className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white font-sans">
              Cube
            </span>
          </button>

          <span className="hidden sm:inline-block text-[#27272A] select-none text-xs">|</span>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer select-none font-medium"
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbarActivePill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 480, damping: 35 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-150",
                      isActive
                        ? "text-black font-semibold"
                        : "text-[#A1A1AA] hover:text-white"
                    )}
                  >
                    {sec.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <span className="hidden sm:inline-block text-[#27272A] select-none text-xs">|</span>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center pr-1">
            <a
              href="https://github.com/hphucdev-04/cube"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
              title="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Bar: Active white pill indicator + Hamburger toggle */}
          <div className="flex items-center gap-2 sm:hidden pr-1">
            <span className="text-[11px] font-mono text-black font-semibold px-2.5 py-0.5 rounded-full bg-white shadow-sm">
              {NAV_SECTIONS.find((s) => s.id === activeSection)?.label || "Get Started"}
            </span>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="sm:hidden mt-2 max-w-sm mx-auto pointer-events-auto rounded-2xl bg-[#18181B]/95 backdrop-blur-xl border border-[#27272A] p-2.5 flex flex-col gap-1 text-sm shadow-2xl"
          >
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer font-medium",
                    isActive
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{sec.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </button>
              );
            })}

            <div className="pt-2 mt-1 border-t border-[#27272A] flex items-center justify-between px-2">
              <a
                href="https://github.com/hphucdev-04/cube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1.5 py-1"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-[10px] font-mono text-[#71717A]">Cube v1.0.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
