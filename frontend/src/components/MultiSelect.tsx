"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";
import { ChevronDown } from "lucide-react";
import "./MultiSelect.css";

interface MultiSelectProps {
  onValueChange?: (value: string) => void;
  value?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export default function MultiSelect({
  onValueChange,
  value,
  options = [],
  placeholder = "Select an option...",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="multiSelectContainer" ref={dropdownRef}>
      <div className="selectWrapper">
        <button
          id="multi-select"
          type="button"
          className="multiSelectButton"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
        >
          <span className="multiSelectSelectedText">
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder}
          </span>
          <span className="multiSelectIconWrapper">
            <ChevronDown />
          </span>
        </button>

        {isOpen && (
          <div className="multiSelectDropdown" role="listbox">
            {options.map((option) => (
              <div
                key={option.value}
                className={`multiSelectOption ${
                  value === option.value ? "multiSelectOptionSelected" : ""
                }`}
                onClick={() => {
                  onValueChange?.(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
