import { useRef } from "react";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useSectionReveal } from "../animations/scrollAnimations.js";
import "./Projects.css";

const projects = [
  {
    number: "03",
    title: (
      <>
        Church <span>Management System</span>
      </>
    ),
    name: "Church Management System",
    description:
      "A platform for organizing church members, managing records, tracking attendance, and coordinating church activities.",
    technologies: ["React", "Node.js", "Express", "MySQL"],
    image: "/image/projects/church-management-dashboard.png",
    imageAlt: "Church administration dashboard with member statistics, attendance chart, upcoming events, and member records",
  },
  {
    number: "01",
    title: (
      <>
        Visit <span>Ethiopia</span>
      </>
    ),
    name: "Visit Ethiopia",
    description:
      "A tourism platform showcasing Ethiopia's destinations, culture, history, and attractions.",
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB"],
    image: "/image/projects/visit-ethiopia.png",
    imageAlt: "Visit Ethiopia tourism platform homepage preview",
  },
  {
    number: "02",
    title: (
      <>
        Student <span>Resource Hub</span>
      </>
    ),
    name: "Student Resource Hub",
    description:
      "An educational platform concept for organizing and sharing academic resources.",
    technologies: ["React", "Node.js", "SQLite", "Express", "Tailwind CSS"],
    image: "/image/projects/student-resource-hub.png",
    imageAlt: "Student Resource Hub academic resources homepage preview",
  },
];

function ProjectCard({ project }) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-preview">
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
      </div>
      <div className="project-card-content">
        <div className="project-number">
          <span>{project.number}</span>
          <i aria-hidden="true" />
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-tags" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-actions" aria-label={`${project.name} links`}>
          <span className="project-action project-action--unavailable">
            <Github aria-hidden="true" size={18} />
            <span>GitHub unavailable</span>
          </span>
          <span className="project-action project-action--unavailable">
            <ExternalLink aria-hidden="true" size={17} />
            <span>Demo unavailable</span>
          </span>
        </div>
      </div>
    </article>
  );
}

const Projects = () => {
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="projects"
      className="portfolio-section projects-section"
      aria-labelledby="projects-title"
      ref={sectionRef}
    >
      <div className="projects-container">
        <header className="projects-heading" data-reveal>
          <p className="projects-eyebrow"><span /> MY PROJECTS <span /></p>
          <h2 id="projects-title">
            Selected <span>Works</span>
          </h2>
          <p className="projects-intro">
            Here are some of the projects I&apos;ve built, showcasing my skills
            in full-stack development, problem-solving and creating real-world
            solutions.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>

        <div className="projects-cta-wrap" data-reveal>
          <a
            className="portfolio-button projects-cta"
            href="https://github.com/ebbameshu"
            target="_blank"
            rel="noreferrer"
          >
            View All Projects
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
