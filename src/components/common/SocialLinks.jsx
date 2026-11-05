import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../../constants/index.js";

const icons = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

const SocialLinks = ({ className = "", ids }) => (
  <ul className={`social-links ${className}`.trim()} aria-label="Social links">
    {(ids
      ? ids
          .map((id) => socialLinks.find((link) => link.id === id))
          .filter(Boolean)
      : socialLinks
    ).map(({ id, label, href }) => {
      const Icon = icons[id];
      const icon =
        id === "x" ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.9 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
        );

      return (
        <li key={id}>
          {href ? (
            <a
              className="social-link"
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              {icon}
            </a>
          ) : (
            <span
              className="social-link social-link--inactive"
              aria-label={`${label} profile link not provided`}
              aria-disabled="true"
              title={`${label} profile link not provided`}
            >
              {icon}
            </span>
          )}
        </li>
      );
      })}
  </ul>
);

export default SocialLinks;