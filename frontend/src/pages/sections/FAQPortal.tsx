import React, { useState } from "react";
import "./FAQ.css";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

const Dropdown = ({ title, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown-title">{title}</span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="dropdown-content">{children}</div>}
    </div>
  );
};

export default function FAQPortal() {
  return (
    <div className="faq-portal-background">
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
          <Dropdown title="What workshops are included in Bootcamp?">
            We offer two main workshops:
            <ul>
              <li style={{ marginTop: "1rem" }}>
                <strong>March 1, 2025 (In-Person Workshop):</strong> Hands-on
                session covering problem-solving techniques and analytics tools.
              </li>
              <li>
                <strong>March 4, 2025 (Online Presentation Workshop):</strong>{" "}
                Guidance on how to structure and deliver a compelling case
                presentation.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title="Do I need to attend the workshops to participate in Bootcamp?">
            Workshops are not mandatory but are highly recommended as they
            provide valuable skills and insights that will help you in the case
            competition.
          </Dropdown>
          <h2 className="faq-header">Case Competition</h2>
          <Dropdown title="How does the case competition work?">
            The case competition challenges teams to analyze a real-world
            business problem using data analytics, strategy, and problem-solving
            skills. Teams will submit their final presentations, and the best
            ones will be invited to present in the final round on March 8, 2025.
          </Dropdown>
          <Dropdown title="Do I need to form a team before registering?">
            Not at all! After registering you'll have the opportunity to form a
            team with up to four people using our portal.
          </Dropdown>
          <Dropdown title="What are the team roles in the case competition?">
            Each team consists of 4 members with the following roles:
            <ul>
              <li style={{ marginTop: "1rem" }}>
                <strong>Project Manager (PM):</strong> Oversees workflow,
                ensures deadlines are met, and coordinates the final
                presentation.
              </li>
              <li>
                <strong>Business Analyst (BA):</strong> Focuses on problem
                definition, strategy, and final recommendations.
              </li>
              <li>
                <strong>Data Analysts (DA) (x2):</strong> Handle data
                collection, visualization, and analysis to support
                decision-making.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title="What is the prize for the winners?">
            The total prize pool is $1,200, distributed as follows:
            <ul>
              <li style={{ marginTop: "1rem" }}>🥇 1st Place: $700</li>
              <li>🥈 2nd Place: $350</li>
              <li>🥉 3rd Place: $150</li>
            </ul>
          </Dropdown>
          <Dropdown title="How will the case be judged?">
            Teams will be evaluated based on:
            <ul>
              <li style={{ marginTop: "1rem" }}>
                ✅ <strong>Data-Driven Insights</strong> – How well the team
                uses analytics to support their recommendations.
              </li>
              <li>
                ✅ <strong>Problem-Solving Approach</strong> – The creativity
                and feasibility of the proposed solution.
              </li>
              <li>
                ✅ <strong>Presentation & Storytelling</strong> – Clarity,
                engagement, and effectiveness in communicating ideas.
              </li>
              <li>
                ✅ <strong>Q&A Handling</strong> – The ability to respond to
                judge inquiries with strong reasoning.
              </li>
            </ul>
          </Dropdown>
        </div>
        <div className="faq-section faq-equal-width">
          <h2 className="faq-header">Logistics</h2>
          <Dropdown title="Where will the Bootcamp events take place?">
            <ul>
              <li>
                <strong>Workshops & Networking Event:</strong> Henry Angus
                Building, UBC
              </li>
              <li>
                <strong>Final Presentations & Awards:</strong> Sauder School of
                Business, UBC
              </li>
            </ul>
          </Dropdown>
          <Dropdown title="Do I need prior experience in data analytics or business strategy?">
            No! Bootcamp is designed to be beginner-friendly, and we will
            provide guidance through workshops and mentor sessions.
          </Dropdown>
          <Dropdown title="How can I prepare for the case competition?">
            We recommend: Attending Bootcamp workshops, exploring business case
            studies, and practicing with data visualization tools like Excel,
            Tableau, or Power BI.
          </Dropdown>
          <Dropdown title="Will there be networking opportunities outside the official event?">
            Yes! You’ll have opportunities to connect with professionals and
            other participants throughout the week, including during the
            workshops and final case competition day.
          </Dropdown>
          <Dropdown title="Who can I contact for more information?">
            Contact us at our email:{" "}
            <a href="mailto:boltubc@gmail.com" className="email-link">
              boltubc@gmail.com
            </a>{" "}
            if you have any questions!
          </Dropdown>

          <h2 className="faq-header">Networking Event</h2>
          <Dropdown title="What happens at the networking event?">
            The networking event provides an opportunity for students to connect
            with industry professionals through panel discussions, structured
            networking activities, and open Q&A sessions. This is a great chance
            to gain industry insights and expand your professional network.
          </Dropdown>
          <Dropdown title="Do I need to pay to attend the networking event?">
            Yes, the networking event has a small ticket fee for non-BOLT
            members. However, if your club is one of the collaborating clubs,
            you may be eligible for free entry.
          </Dropdown>
          <Dropdown title="What should I wear to the networking event?">
            We recommend business casual attire for the networking event to
            maintain a professional environment.
          </Dropdown>
          <Dropdown title="Can I attend the networking event if I’m not participating in the case competition?">
            Yes! The networking event is open to all UBC students, regardless of
            case competition participation.
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
