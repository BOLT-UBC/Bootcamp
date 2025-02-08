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
          <Dropdown title="What is your return policy?">
            We accept returns within 30 days of purchase.
          </Dropdown>
          <Dropdown title="How do I contact support?">
            You can reach us via email or phone during business hours.
          </Dropdown>
          <Dropdown title="Do you ship internationally?">
            Yes, we offer international shipping.
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
