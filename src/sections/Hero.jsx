import { useRef } from "react";
import "./Hero.css";
import Button from "../components/common/Button.jsx";
import { words } from "../constants/index.js";
import { gsap, useGSAP } from "../animations/gsapConfig.js";

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const hero = heroRef.current;
      const wordTrack = hero.querySelector(".hero-word-track");
      const wordRows = wordTrack.querySelectorAll(".slide-word");
      const rowHeight = wordRows[0]?.getBoundingClientRect().height ?? 0;
      const wordTimeline = gsap.timeline({ repeat: -1, paused: true });

      if (rowHeight > 0) {
        for (let index = 1; index <= words.length; index += 1) {
          wordTimeline
            .to(wordTrack, {
              y: -rowHeight * index,
              duration: 0.72,
              ease: "power2.inOut",
            })
            .to({}, { duration: 1.15 });
        }
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      hero.querySelectorAll("[data-hero-stat]").forEach((stat) => {
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: Number(stat.dataset.heroStat),
            duration: 1.6,
            delay: 3.4,
            ease: "power2.out",
            snap: { textContent: 1 },
          },
        );
      });

      intro
        .from(".hero-word-reel", { y: 10, opacity: 0, duration: 0.45 }, 1.28)
        .from(
          ".hero-headline-line",
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.16 },
          1.75,
        )
        .from(".hero-intro", { y: 16, opacity: 0, duration: 0.58 }, 2.78)
        .from(
          ".hero-actions .portfolio-button",
          { y: 12, opacity: 0, duration: 0.48, stagger: 0.12 },
          3.15,
        )
        .from(".hero-portrait", { scale: 0.96, opacity: 0, duration: 0.9 }, 3.4)
        .from(".hero-caption", { y: 10, opacity: 0, duration: 0.48 }, 3.9)
        .call(() => wordTimeline.play(), [], 2.8);

      gsap.to(".hero-ambient", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: heroRef },
  );

  const renderWord = (word, key, isClone = false) => (
    <span
      key={key}
      className="slide-word"
      aria-hidden={isClone ? "true" : undefined}
    >
      <img src={word.imgPath} alt="" className="hero-word-icon" />
      <span className="hero-word-label">{word.text}</span>
    </span>
  );

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-ambient" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-main">
          <header className="hero-content">
            <h1 className="hero-heading">
              <span className="hero-headline-line hero-headline-opening">
                <span>Shaping</span>
                {/* <span className="hero-sr-only"> idea</span> */}
                <span className="slide hero-word-reel" aria-hidden="true">
                  <span className="hero-word-track">
                    {words.map((word, index) =>
                      renderWord(word, `${word.text}-${index}`),
                    )}
                    {words.length > 0 &&
                      renderWord(words[0], `${words[0].text}-loop`, true)}
                  </span>
                </span>
              </span>
              <span className="hero-headline-line">into real projects</span>
              <span className="hero-headline-line">
                that deliver results.
              </span>
            </h1>

            <p className="hero-intro">
              Software developer focused on building elegant digital
              experiences and reliable applications.
            </p>

            <div className="hero-actions">
              <Button variant="primary" href="#projects">
                View My Projects
              </Button>
            </div>
          </header>

          <div className="hero-profile">
            <figure className="hero-portrait" aria-label="Profile photograph">
              <img
                src="/image/image.png"
                alt="Profile portrait"
                className="hero-portrait-image"
              />
            </figure>

            <div className="hero-caption">
              <h3 className="hero-name">Ebba Meshu</h3>
              <p className="hero-role">Full-Stack Developer</p>
            </div>
          </div>
        </div>

        <div className="hero-stats" aria-label="Project statistics">
          <div className="hero-stat">
            <p className="hero-stat-value">
              <span data-hero-stat="100">100</span>+
            </p>
            <p className="hero-stat-label">Clients</p>
          </div>
          <div className="hero-stat">
            <p className="hero-stat-value">
              <span data-hero-stat="90">90</span>%
            </p>
            <p className="hero-stat-label">Client Satisfaction</p>
          </div>
          <div className="hero-stat">
            <p className="hero-stat-value">
              <span data-hero-stat="7">7</span>+
            </p>
            <p className="hero-stat-label">Completed Projects</p>
          </div>
        </div>
      </div>
      <a className="hero-scroll" href="#about">
        <span className="hero-scroll-mark" aria-hidden="true" />
        Scroll to explore
      </a>
    </section>
  );
};

export default Hero;
