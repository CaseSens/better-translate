"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { GroupBase, OptionsOrGroups } from "react-select";

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
  textValue: string;
  onTextChange?: (t: string) => void;
  is?: "from" | "to" | undefined;
  onLanguageChange?: (is: "from" | "to", selectedOption: OptionType) => void;
  value?: OptionType;
  selectOptions?: OptionsOrGroups<any, GroupBase<unknown>>;
  disabled?: boolean;
  hasSelect?: boolean;
}

export type OptionType = {
  label: string;
  value: string;
};

function TextField({
  label,
  textValue,
  onTextChange,
  is,
  onLanguageChange,
  value,
  selectOptions,
  disabled = false,
  hasSelect = true,
  ...divProps
}: TextfieldProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<OptionType | undefined>(value);

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange && onTextChange(e.target.value);
  };

  const handleLanguageChange = (opt: OptionType) => {
    setSelectedLanguage(opt);
  };

  useEffect(() => {
    if (is && onLanguageChange) {
      onLanguageChange(is, selectedLanguage!);
    }
  }, [selectedLanguage]);

  return (
    <div {...divProps}>
      <h1>{label}</h1>
      <div className="flex items-center w-full h-max">
        {hasSelect && (
          <Select
            instanceId={"hdsah21h"}
            className="basic-single w-full"
            classNamePrefix="select"
            options={selectOptions!}
            styles={selectThemeProp}
            value={value}
            onChange={(newVal) => handleLanguageChange(newVal as OptionType)}
          />
        )}
      </div>
      <textarea
        className="w-full focus:w-[calc(100%-6px)] h-full text-black bg-primary_dark px-4 py-2 focus:border-none resize-none rounded-b-lg"
        value={textValue}
        onChange={handleText}
        disabled={disabled}
      ></textarea>
    </div>
  );
}

export default TextField;
