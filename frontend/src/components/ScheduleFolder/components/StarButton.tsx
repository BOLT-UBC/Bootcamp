import React from "react";
import "./StarButton.css";

interface StarButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function StarButton({
  label,
  isSelected = false,
  onClick,
}: StarButtonProps) {
  const circle = !isSelected ? "" : "circle";

  return (
    <button className="star-container" onClick={onClick}>
      <div className="tooltip">
        <p className="text">{label}</p>
      </div>
      <img src="star.png" alt="Marker star" className={`star ${circle}`} />
    </button>
  );
}
