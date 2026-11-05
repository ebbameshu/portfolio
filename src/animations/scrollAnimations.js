import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const useSectionReveal = (scopeRef, selector = "[data-reveal]") => {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(selector, {
        y: 22,
        opacity: 0,
        duration: 0.72,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: scopeRef },
  );
};