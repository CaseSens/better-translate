"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { GoogleTranslatorTokenFree } from "@translate-tools/core/esm/translators/GoogleTranslator";
import { Scheduler } from "@translate-tools/core/scheduling/Scheduler";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import LanguageSelect, { selectThemeProp } from "./components/LanguageSelect";
import TextField from "./components/Textfield";

export type OptionType = {
  label: string;
  value: string;
};

const langOptions: OptionsOrGroups<any, GroupBase<unknown>> = [
  { value: "en", label: "English" },
  { value: "ja", label: "Japanese" },
];

const honorificOptions: OptionsOrGroups<any, GroupBase<unknown>> = [
  { value: "", label: "None" },
  { value: "僕", label: "Boku" },
  { value: "私", label: "Watashi" },
];

const translator = new GoogleTranslatorTokenFree({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
  corsProxy: "https://corsproxy.io/?",
});

const scheduler = new Scheduler(translator, { translatePoolDelay: 500 });

export default function Home() {
  const [fromValue, setFromValue] = useState<OptionType>(langOptions[0]);
  const [toValue, setToValue] = useState<OptionType>(langOptions[1]);
  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [retranslateText, setRetranslateText] = useState<string>("");
  const [desiredHonorific, setDesiredHonorific] = useState<OptionType>(
    honorificOptions[0]
  );

  const onSelectOptionChange = (
    is: "from" | "to",
    selectedLanguage: OptionType
  ) => {
    console.log(is);
    console.log(selectedLanguage);
    if (is === "from") {
      const prevFrom = fromValue;
      setFromValue(selectedLanguage);
      if (toValue === selectedLanguage) {
        setToValue(prevFrom);
      }
    } else {
      const prevTo = toValue;
      setToValue(selectedLanguage);
      if (fromValue === selectedLanguage) {
        setFromValue(prevTo);
      }
    }
  };

  const swapLangs = () => {
    const currentFrom = fromValue;
    const currentTo = toValue;
    const currentFromText = fromText;
    const currentToText = toText;
    setFromValue(currentTo);
    setToValue(currentFrom);
    setFromText(currentToText);
    setToText(currentFromText);
  };

  const onTextChange = (t: string) => {
    setFromText(t);
  };

  useEffect(() => {
    runTranslations();
  }, [fromText]);

  const runTranslations = ({ withScheduler } = { withScheduler: true }) => {
    (withScheduler ? scheduler : translator)
      .translate(
        `${encodeURIComponent(fromText)}`,
        fromValue.value,
        toValue.value
      )
      .then((translate) => {
        setToText(translate);
        (withScheduler ? scheduler : translator)
          .translate(
            `${encodeURIComponent(translate)}`,
            toValue.value,
            fromValue.value
          )
          .then((retranslate) => {
            setRetranslateText(retranslate);
          });
      });
  };

  const handleHonorificsChange = (opt: OptionType) => {
    setDesiredHonorific(opt);
  };

  useEffect(() => {
    if (desiredHonorific.value !== "") {
      let newToTranslate = toText;
      newToTranslate = newToTranslate.replaceAll(`僕`, desiredHonorific.value);
      newToTranslate = newToTranslate.replaceAll(`私`, desiredHonorific.value);
      setToText(newToTranslate);
    }
  }, [desiredHonorific, toText]);

  return (
    <main className="grid grid-cols-page-sm grid-rows-page lg:grid-cols-page-lg xl:grid-cols-page-xl 2xl:grid-cols-page-2xl gap-y-8 items-start min-h-screen h-max w-dvw bg-bg_dark text-text_white">
      <div className="grid grid-cols-page-sm lg:grid-cols-page-lg xl:grid-cols-page-xl 2xl:grid-cols-page-2xl items-center h-12 w-full bg-primary_dark col-span-3">
        <h1 className="col-start-2">Better translator</h1>
      </div>
      <span className="col-start-2 flex flex-col">
        <h1>Desired honorific</h1>
        <Select
          instanceId={"hbfogdch"}
          className="basic-single"
          classNamePrefix="select"
          options={honorificOptions}
          styles={selectThemeProp}
          value={desiredHonorific}
          onChange={(newVal) => handleHonorificsChange(newVal as OptionType)}
        />
      </span>
      <div className="col-start-2 flex flex-col">
        <div
          id="lang-select"
          aria-label="languages"
          aria-description="Container for language selection"
          className="col-start-2 grid grid-cols-icon-middle items-center gap-x-0 sm:gap-x-16 bg-accent_dark p-1"
        >
          <LanguageSelect
            options={langOptions}
            is="from"
            value={fromValue}
            onLangChange={onSelectOptionChange}
          />
          <HiOutlineSwitchHorizontal
            className="transition-colors text-primary_dark cursor-pointer hover:text-secondary_dark place-self-center text-[clamp(1rem,2vw,2rem)]"
            onClick={swapLangs}
          />
          <LanguageSelect
            options={langOptions}
            is="to"
            value={toValue}
            onLangChange={onSelectOptionChange}
          />
        </div>
        <div className="col-start-2 flex flex-col h-max bg-white">
          <TextField
            value={fromText}
            onTextChange={onTextChange}
            className="h-full w-full min-h-44 focus:outline-none focus:border-x-2 focus:border-t-2 text-text_black bg-primary_dark px-4 py-2 resize-y"
          />
          <TextField
            value={toText}
            onTextChange={onTextChange}
            disabled
            className="h-full min-h-44 w-full focus:outline-none text-text_black bg-primary_dark px-4 py-2 resize-y border-t-2 border-black"
          />
        </div>
      </div>
      <div className="col-start-2 flex flex-col">
        <h1 className="w-full">Retranslated text</h1>
        <TextField
          value={retranslateText}
          onTextChange={onTextChange}
          disabled
          className="h-full w-full min-h-44 focus:outline-none text-text_black bg-primary_dark px-4 py-2 resize-y border-t-2 border-black mb-8"
        />
      </div>
    </main>
  );
}
