"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import Select, { StylesConfig } from "react-select";

const options = [
  { value: "English", label: "English" },
  { value: "Japanese", label: "Japanese" },
];

const selectThemeProp: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#0B0E14",
    color: "white",
    borderColor: "#fe7a1b",
    height: "100%",
    width: "100%",
    borderRadius: "8px 8px 0px 0px",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "#0B0E14",
    color: "#fe7a1b",
    padding: "0px",
  }),
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
};

interface TextfieldProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
  disabled?: boolean;
  hasSelect?: boolean;
}

function TextField({ label, disabled = false, hasSelect = true, ...divProps }: TextfieldProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [text, setText] = useState("");

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div {...divProps}>
      <h1>{label}</h1>
      <div className="flex items-center w-full h-max">
        {hasSelect && (
          <Select
            className="basic-single w-full"
            classNamePrefix="select"
            options={options}
            styles={selectThemeProp}
            defaultValue={options[0]}
          />
        )}
      </div>
      <textarea
        className="w-full focus:w-[calc(100%-6px)] h-full text-black px-4 py-2 focus:border-none resize-none rounded-b-lg"
        value={text}
        onChange={handleText}
        disabled={disabled}
      ></textarea>
    </div>
  );
}

export default TextField;
