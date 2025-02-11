import React from "react";
import "./StarButton.css";

interface GlowingMarkerProps {
  day: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function GlowingMarker({
  day,
  isSelected = false,
  onClick,
}: GlowingMarkerProps) {
  const text = isSelected ? "You are here" : `Day ${day}`;

  return (
    <button className="container" onClick={onClick}>
      <div className="tooltip">
        <p className="text">{text}</p>
      </div>
      <img src="star.png" alt="Marker star" className="star" />
    </button>
  );
}
