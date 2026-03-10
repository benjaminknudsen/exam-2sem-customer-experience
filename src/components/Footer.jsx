import { useState } from "react";

export default function Footer() {
  const sections = [
    {
      title: "CONTACT",
      items: ["DK 0045 23831322", "E-MAIL US", "STORE LOCATOR"],
    },
    {
      title: "CUSTOMER SERVICE",
      items: [
        "FREQUENTY ASKED QUESTIONS",
        "MANAGE YOUR ORDER",
        "ONLINE SERVICE",
        "TRACK YOUR ORDER",
      ],
    },
    {
      title: "CORPORATE",
      items: ["BRAND INFORMATION", "SUSTAINABILITY", "CAREER OPTIONS"],
    },
    {
      title: "SOCIAL MEDIA",
      items: ["INSTAGRAM", "FACEBOOK", "TIKTOK", "YOUTUBE"],
    },
  ];

  const [openSections, setOpenSections] = useState(() =>
    Object.fromEntries(sections.map((section) => [section.title, true]))
  );

  const toggleSection = (title) => {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          {sections.map((section) => (
            <div key={section.title} className="footer-section">
              <button
                type="button"
                className="footer-row footer-toggle-btn"
                onClick={() => toggleSection(section.title)}
                aria-expanded={openSections[section.title]}
              >
                <span>{section.title}</span>
                <span aria-hidden="true">
                  {openSections[section.title] ? "-" : "+"}
                </span>
              </button>

              {openSections[section.title] && (
                <ul className="footer-items">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <p className="footer-brand">blunt.</p>
        </div>

        <div className="footer-newsletter">
          <p className="footer-heading">SUBMIT TO OUR NEWSLETTER</p>
          <p className="footer-subheading">GET 10% OFF YOUR NEXT ORDER</p>
          <form className="footer-form">
            <input
              type="email"
              placeholder="Enter your e-mail adress here"
              aria-label="Email"
            />
            <button type="submit">CONTINUE</button>
          </form>
        </div>
      </div>
      <p className="footer-copyright">
        Copyright 2026 - Lavet af Benjamin, Mikkel, Lauge og Benjamin
      </p>
    </footer>
  );
}
