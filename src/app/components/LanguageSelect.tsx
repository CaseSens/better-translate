import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Select, { GroupBase, OptionsOrGroups, StylesConfig } from "react-select";
import { OptionType } from "../page";

export const selectThemeProp: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    height: "100%",
    width: "100%",
    borderRadius: "0px",
    fontSize: "clamp(0.7rem, 2vw, 1.3rem)",
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: "#0B0E14",
    color: "#654953",
    padding: "0px",
    fontSize: "clamp(0.7rem, 2vw, 1.3rem)",
  }),
  input: (styles) => ({
    ...styles,
    color: "white",
  }),
};

interface LanguageSelectProps {
  options: OptionsOrGroups<unknown, GroupBase<OptionType>>;
  value: OptionType;
  is: "from" | "to";
  onLangChange: (is: "from" | "to", lang: OptionType) => void;
}

function LanguageSelect({
  options,
  value,
  is,
  onLangChange,
}: LanguageSelectProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<OptionType>(value);

  const handleLanguageChange = (opt: OptionType) => {
    setSelectedLanguage(opt);
  };

  useEffect(() => {
    onLangChange(is, selectedLanguage);
  }, [selectedLanguage]);

  return (
    <Select
      instanceId={"hdsah21h"}
      className="basic-single"
      classNamePrefix="select"
      value={value}
      options={options}
      styles={selectThemeProp}
      onChange={(newVal) => handleLanguageChange(newVal as OptionType)}
    />
  );
}

export default LanguageSelect;
