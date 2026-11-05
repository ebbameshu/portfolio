import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "../common/Button.jsx";
import { navigationLinks } from "../../constants/navigation.js";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import { gsap, useGSAP } from "../../animations/gsapConfig.js";
import "./Navbar.css";

const Navbar = () => {
  const headerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(headerRef.current, { y: -16, opacity: 0, duration: 0.58 })
        .from(
          ".site-brand",
          { y: -8, opacity: 0, duration: 0.32 },
          "-=0.25",
        )
        .from(
          ".site-nav-link",
          { y: -7, opacity: 0, duration: 0.3, stagger: 0.045 },
          "-=0.18",
        )
        .from(
          ".site-nav-actions",
          { opacity: 0, duration: 0.28 },
          "-=0.15",
        );
    },
    { scope: headerRef },
  );

  useGSAP(
    () => {
      if (
        !isMenuOpen ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      gsap.fromTo(
        ".site-nav-link",
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.28,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
      );
    },
    { scope: headerRef, dependencies: [isMenuOpen], revertOnUpdate: true },
  );

  useEffect(() => {
    const sections = navigationLinks
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-nav-container">
        <a
          className="site-brand"
          href="#hero"
          aria-label="Ebba Meshu home"
          onClick={closeMenu}
        >
          <span className="site-brand-mark" aria-hidden="true">
            EM
          </span>
          <span className="site-brand-name">EBBA MESHU</span>
        </a>

        <nav
          id="primary-navigation"
          className={`site-nav${isMenuOpen ? " site-nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul className="site-nav-list">
            {navigationLinks.map(({ label, id }) => (
              <li key={id}>
                <a
                  className={`site-nav-link${activeSection === id ? " site-nav-link--active" : ""}`}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="#contact"
            variant="outline"
            className="site-nav-cta site-nav-mobile-cta"
            onClick={closeMenu}
          >
            Hire Me <ArrowUpRight aria-hidden="true" size={16} />
          </Button>
        </nav>

        <div className="site-nav-actions">
          <ThemeToggle />
          <Button
            href="#contact"
            variant="outline"
            className="site-nav-cta"
            onClick={closeMenu}
          >
            Hire Me <ArrowUpRight aria-hidden="true" size={16} />
          </Button>

          <button
            className={`site-menu-toggle${isMenuOpen ? " site-menu-toggle--open" : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="site-menu-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;