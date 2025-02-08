import React from "react";
import "./Judges.css";
import "../LandingPage.css";

const judges = [
  { name: "John Doe", position: "Head Judge", image: "assets/judge1.png" },
  { name: "Jane Smith", position: "Senior Judge", image: "assets/judge2.png" },
  {
    name: "Alice Johnson",
    position: "Guest Judge",
    image: "assets/judge3.png",
  },
  { name: "Bob Brown", position: "Judge", image: "assets/judge4.png" },
];

export default function Judges() {
  return (
    <div className="judge-background">
      <div>
        <h1 className="judge-heading">Meet the Judges</h1>
      </div>
      <div>
        <div className="judges-container">
          {judges.map((judge, index) => (
            <div key={index} className="judge-card">
              <img src={judge.image} alt={judge.name} className="judge-img" />
              <h3 className="judge-name">{judge.name}</h3>
              <p className="judge-position">{judge.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
