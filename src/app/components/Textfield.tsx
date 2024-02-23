"use client";

import { ComponentPropsWithoutRef } from "react";

interface TextfieldProps extends ComponentPropsWithoutRef<"textarea"> {
  value: string;
  onTextChange: (t: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function TextField({
  value,
  onTextChange,
  placeholder,
  disabled,
  ...textareaProps
}: TextfieldProps) {
  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={handleText}
      disabled={disabled}
      {...textareaProps}
    />
  );
}

export default TextField;
