"use client";

import { use, useEffect, useState } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";
import TextField, { OptionType } from "./components/Textfield";
import { GoogleTranslatorTokenFree } from "@translate-tools/core/esm/translators/GoogleTranslator";
import { DeepLTranslator } from "@translate-tools/core/translators/DeepLTranslator";

const options: OptionsOrGroups<any, GroupBase<unknown>> = [
  { value: "en", label: "English" },
  { value: "ja", label: "Japanese" },
];

type SelectedOptionsType = {
  from: OptionType;
  to: OptionType;
};

const translator = new GoogleTranslatorTokenFree({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
  corsProxy: "https://corsproxy.io/?",
});

const retranslator = new DeepLTranslator({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
  },
  apiKey: "820c5d18-365b-289c-e63b6fc7e1cb:fx",
  corsProxy: "https://corsproxy.io/?",
});

export default function Home() {
  const [fromValue, setFromValue] = useState<OptionType>(options[0]);
  const [toValue, setToValue] = useState<OptionType>(options[1]);
  const [fromText, setFromText] = useState<string>("");
  const [toText, setToText] = useState<string>("");
  const [retranslateText, setRetranslateText] = useState<string>("");

  const onSelectOptionChange = (
    is: "from" | "to",
    selectedLanguage: OptionType
  ) => {
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

  const onTextChange = (t: string) => {
    setFromText(t);
  };

  const onTranslateClicked = () => {
    translator
      .translate(
        `${encodeURIComponent(fromText)}`,
        fromValue.value,
        toValue.value
      )
      .then((translate) => {
        setToText(translate);
        translator
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

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-2 lg:items-start lg:place-items-center lg:px-32 xl:px-48 2xl:px-64 items-center gap-8 min-h-screen h-max w-dvw px-8 py-4 bg-bg_dark text-text_white">
      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        textValue={fromText}
        onTextChange={onTextChange}
        is="from"
        onLanguageChange={onSelectOptionChange}
        value={fromValue}
        label="FROM"
        selectOptions={options}
      />

      <button
        className="w-full max-w-96 bg-secondary_dark py-2 rounded-lg row-start-2"
        onClick={onTranslateClicked}
      >
        TRANSLATE
      </button>

      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        is="to"
        textValue={toText}
        onLanguageChange={onSelectOptionChange}
        value={toValue}
        selectOptions={options}
        label="TO"
        disabled={true}
      />

      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        textValue={retranslateText}
        label="Retranslated TO-FROM"
        disabled={true}
        hasSelect={false}
      />
    </main>
  );
}
