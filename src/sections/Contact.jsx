import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, ArrowUp, Clock3, MapPin } from "lucide-react";
import { useSectionReveal } from "../animations/scrollAnimations.js";
import SocialLinks from "../components/common/SocialLinks.jsx";
import "./Contact.css";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function scrollToTop() {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  window.scrollTo({ top: 0, behavior });
}

const Contact = () => {
  const sectionRef = useRef(null);
  const submissionInProgress = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  useSectionReveal(sectionRef);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submissionInProgress.current) {
      return;
    }

    const { serviceId, templateId, publicKey } = emailJsConfig;
    if (!serviceId || !templateId || !publicKey) {
      setFormMessage(
        "The contact form is not configured yet. Please try again later or use the social links to get in touch.",
      );
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setFormMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const templateParams = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      subject: formData.get("subject")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
    };

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        { publicKey },
      );

      if (response.status !== 200) {
        setFormMessage(
          "We couldn’t confirm delivery. Please try again or use the social links to get in touch.",
        );
        return;
      }

      form.reset();
      setFormMessage("Your message was sent successfully. Thank you!");
    } catch {
      setFormMessage(
        "We couldn’t send your message. Please try again or use the social links to get in touch.",
      );
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="portfolio-section contact-section"
      aria-labelledby="contact-title"
      ref={sectionRef}
    >
      <div className="section-container contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="section-eyebrow">Get in touch</p>
          <h2 id="contact-title">
            Let&apos;s Work <span>Together.</span>
          </h2>
          <p className="contact-description">
            I&apos;m always open to discussing new opportunities,
            collaborations, or just having a chat about technology, ideas, or
            your next project.
          </p>

          <ul className="contact-details">
            <li>
              <span className="contact-detail-icon">
                <MapPin aria-hidden="true" size={18} strokeWidth={1.6} />
              </span>
              <span>
                <span className="contact-detail-label">Location</span>
                <span>Jimma, Ethiopia</span>
              </span>
            </li>
            <li>
              <span className="contact-detail-icon">
                <Clock3 aria-hidden="true" size={18} strokeWidth={1.6} />
              </span>
              <span>
                <span className="contact-detail-label">Availability</span>
                <span>Open to opportunities</span>
                <SocialLinks
                  className="contact-availability-links"
                  ids={["linkedin", "email", "github", "x"]}
                />
              </span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} data-reveal>
          <div className="contact-form-row">
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                minLength={2}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="What would you like to discuss?"
              minLength={3}
              required
            />
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me a little about it..."
              minLength={10}
              required
            />
          </label>
          <button
            className="portfolio-button contact-submit"
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </button>
          <p className="contact-form-status" role="status" aria-live="polite">
            {formMessage}
          </p>
        </form>

        <div className="contact-footer-bottom">
          <p className="contact-copyright">
            © {new Date().getFullYear()} Ebba Meshu. All rights reserved.
          </p>
          <button
            className="contact-back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;