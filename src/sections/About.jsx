import { useRef } from "react";
import { Code2, Database, Lightbulb } from "lucide-react";
import { useSectionReveal } from "../animations/scrollAnimations.js";
import "./About.css";

const highlights = [
  {
    title: "Development",
    description:
      "Interested in software development, building practical applications, and solving real-world problems.",
    Icon: Code2,
  },
  {
    title: "Full-Stack Development",
    description:
      "Exploring frontend and backend development, building complete web applications, connecting user interfaces with APIs, and working with databases.",
    Icon: Database,
  },
  {
    title: "Continuous Learning",
    description:
      "Committed to improving my technical skills, exploring modern technologies, learning software engineering concepts, and growing through practical projects.",
    Icon: Lightbulb,
  },
];

const About = () => {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-title"
      ref={sectionRef}
    >
      <div className="about-container">
        <div className="about-content">
          <div className="about-copy">
            <header className="about-heading" data-reveal>
              <h2 id="about-title">
                About <span>Me</span>
              </h2>
            </header>

            <p className="about-lead" data-reveal>
              I’m <span>Ebba Meshu</span>, a Full-Stack Developer passionate
              about building meaningful digital experiences and reliable
              software solutions.
            </p>

            <p className="about-description" data-reveal>
              I’m a Software Engineering student at Jimma University,
              continuously developing my skills in frontend development,
              backend architecture, database design, and modern web
              technologies.
            </p>
          </div>

          <div className="about-highlights" aria-label="Areas of focus">
            {highlights.map(({ title, description, Icon }) => (
              <article className="about-highlight" key={title} data-reveal>
                <Icon
                  className="about-highlight-icon"
                  size={24}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
