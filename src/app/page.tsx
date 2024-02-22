import TextField from "./components/Textfield";

export default function Home() {
  return (
    <main className="flex min-h-screen h-max w-dvw flex-col items-center justify-start gap-8 px-8 py-8 bg-black text-white">
      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        label="FROM"
      />

      <button className="w-full max-w-96 bg-[gray] py-2 rounded-lg">TRANSLATE</button>

      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        label="TO"
      />
      <TextField
        className="flex flex-col flex-shrink-0 items-center w-full max-w-96 h-80 text-white"
        label="Retranslated TO-FROM"
        disabled={true}
        hasSelect={false}
      />
    </main>
  );
}
