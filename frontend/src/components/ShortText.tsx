import React from "react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const ShortText: React.FC<InputProps> = ({ value, onChange, placeholder, rows = 1 }) => {
  return (
    <textarea
      value={value}
      onChange={onChange} // Allows user to edit text
      placeholder={placeholder}
      rows={rows}
      className="p-2 border rounded-md w-full resize-none"
    />
  );
};

export default ShortText;
