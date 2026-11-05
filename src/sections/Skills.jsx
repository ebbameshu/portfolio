import { useRef } from "react";
import { useSectionReveal } from "../animations/scrollAnimations.js";
import { skillGroups } from "../constants/skills.js";
import "./Skills.css";

const Skills = () => {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef, "[data-reveal]");

  return (
    <section
      id="skills"
      className="portfolio-section skills-section"
      aria-labelledby="skills-title"
      ref={sectionRef}
    >
      <div className="section-container">
        <header className="section-heading skills-heading" data-reveal>
          <p className="section-eyebrow skills-eyebrow">
            01 / Capabilities
          </p>
          <h2 id="skills-title">Skills &amp; Technologies</h2>
          <p className="section-intro">
            A focused toolkit for crafting thoughtful interfaces, reliable
            services, and efficient development workflows.
          </p>
        </header>

        <div className="skills-grid">
          {skillGroups.map(({ number, name, skills, featured }) => (
            <article
              className={`skill-group${featured ? " skill-group--featured" : ""}`}
              key={name}
              data-reveal
            >
              <span className="skill-group-index" aria-hidden="true">
                {number}
              </span>
              <h3>{name}</h3>
              <ul>
                {skills.map(({ name: skillName, logo, monochrome }) => (
                  <li className="skill-item" key={skillName}>
                    <img
                      className={`skill-item-logo${monochrome ? " skill-item-logo--monochrome" : ""}`}
                      src={logo}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                    />
                    <span className="skill-item-name">{skillName}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;