import React, { useState } from "react";
import "./FAQ.css";

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-title">{title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="faq-background">
      <h1 className="faq-title">FAQ</h1>
      <div className="faq-container">
        <div className="faq-section faq-equal-width">
          <h2 className="faq-header">General</h2>
          <Dropdown title="What is BOLT UBC Bootcamp?">
            BOLT UBC Bootcamp is a week-long event designed to give students
            hands-on experience in data analytics, business problem-solving, and
            networking with industry professionals. The Bootcamp consists of
            interactive workshops, a structured networking event, and a
            real-world case competition where participants can showcase their
            skills.
          </Dropdown>
          <Dropdown title="Who can participate in Bootcamp?">
            Bootcamp is open to all UBC students interested in business
            strategy, data analytics, consulting, and technology. Students from
            any faculty or background are welcome to participate—no prior
            experience is required!
          </Dropdown>
          <Dropdown title="How do I register for Bootcamp?">
            Registration opens on February 10, 2025, and you can sign up through
            the BOLT UBC website. The deadline to register is February 24, 2025.
          </Dropdown>
          <Dropdown title="What are the key dates for Bootcamp 2025?">
            <ul>
              <li>
                <strong>February 10, 2025:</strong> Registration Opens
              </li>
              <li>
                <strong>February 24, 2025:</strong> Registration Closes
              </li>
              <li>
                <strong>February 26, 2025:</strong> Case Competition Release
              </li>
              <li>
                <strong>March 1, 2025:</strong> Networking Event
              </li>
              <li>
                <strong>March 4, 2025:</strong> Online Presentation Workshop
              </li>
              <li>
                <strong>March 5, 2025:</strong> Case Submission Deadline
              </li>
              <li>
                <strong>March 8, 2025:</strong> Final Presentation & Awards
              </li>
            </ul>
          </Dropdown>
        </div>
        <div className="faq-section faq-equal-width">
          <h2 className="faq-header">Logistics</h2>
          <Dropdown title="How long does shipping take?">
            Shipping times vary between 5-10 business days.
          </Dropdown>
          <Dropdown title="Can I track my order?">
            Yes, tracking information is provided once your order ships.
          </Dropdown>
          <Dropdown title="What courier services do you use?">
            We partner with FedEx, UPS, and DHL for deliveries.
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
