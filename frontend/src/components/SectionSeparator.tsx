import React from "react";

export default function SectionSeparator() {
  return (
    <div
      style={{
        width: "100vw",
        backgroundColor: "#673304",
        height: "4rem",
        padding: "0.7rem", // This is to make room for the inner border
        boxSizing: "border-box", // This makes sure padding is inside the div
        border: "0.7rem solid #51342B", // Adding an inner border
      }}
    ></div>
  );
}
