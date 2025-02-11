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
  const text = isSelected ? "Viewing" : label;

  return (
    <button className="container" onClick={onClick}>
      <div className="tooltip">
        <p className="text">{text}</p>
      </div>
      <img src="star.png" alt="Marker star" className="star" />
    </button>
  );
}
