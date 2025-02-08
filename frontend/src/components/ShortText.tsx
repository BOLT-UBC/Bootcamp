import React from "react";
import "./ShortText.css";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  need: boolean;
}

const ShortText: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  need,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
      required={need}
    />
  );
};

export default ShortText;
