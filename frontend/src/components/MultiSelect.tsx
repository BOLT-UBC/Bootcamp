"use client"

import { useState, useRef, useEffect } from "react"
import React from 'react';
import { ChevronDown } from "lucide-react"
import "./MultiSelect.css"

interface MultiSelectProps {
  onValueChange?: (value: string) => void
  value?: string
  label?: string
  options: Array<{ value: string; label: string }>
  placeholder?: string
}

export default function MultiSelect({
  onValueChange,
  value,
  label = "Select an option",
  options = [],
  placeholder = "Select an option...",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false)
    } else if (event.key === "Enter" || event.key === " ") {
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <label htmlFor="multi-select" className="multi-select-label">
        {label}
      </label>

      <div className="relative">
        <button
          id="multi-select"
          type="button"
          className={`multi-select-button ${isOpen ? "multi-select-button-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="multi-select-selected-text">
            {value ? options.find((opt) => opt.value === value)?.label : placeholder}
          </span>
          <span className="multi-select-icon-wrapper">
            <ChevronDown className={`multi-select-icon ${isOpen ? "multi-select-icon-open" : ""}`} />
          </span>
        </button>

        {isOpen && (
          <ul className="multi-select-dropdown" role="listbox" tabIndex={-1}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`multi-select-option ${value === option.value ? "multi-select-option-selected" : ""}`}
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onValueChange?.(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

