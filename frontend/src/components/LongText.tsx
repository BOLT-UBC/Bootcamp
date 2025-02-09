import React from "react";

import "./LongText.css";

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const LongText: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange} // Allows user to edit text
      placeholder={placeholder}
      rows={rows}
      className="textarea"
    />
  );
};

export default LongText;
