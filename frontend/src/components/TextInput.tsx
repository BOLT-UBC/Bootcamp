import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, rows = 4 }) => {
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

export default TextArea;
