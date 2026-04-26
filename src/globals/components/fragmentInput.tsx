import { useRef, useState } from "react";

interface Props {
  initialText?: string;
  onSubmit: (text: string, image: File | null, aiPrompt: string) => void;
  submitLabel?: string;
}

export default function FragmentInput({
  initialText = "",
  onSubmit,
  submitLabel = "Submit"
}: Props) {

  const [text, setText] = useState(initialText);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSubmit(text, imageFile, aiPrompt);

    // reset
    setText("");
    setImageFile(null);
    setAiPrompt("");
    setShowAIPrompt(false);
  };

  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">

  {/* TEXTO IA (tus botones, intactos pero mejor alineados) */}
  <button className="px-3 py-1 rounded-md bg-(--color-primary) text-white text-xs">
    AI Correction
  </button>

  <button className="px-3 py-1 rounded-md bg-(--color-primary) text-white text-xs">
    Improve
  </button>

  {/* DIVISOR VISUAL */}
  <div className="h-5 w-px bg-(--color-border) mx-1" />

  {/* IMAGEN */}
  <button
    onClick={() => fileInputRef.current?.click()}
    className="flex items-center gap-1 px-2 py-1 text-xs border border-(--color-border) rounded-md hover:bg-[#2a1b12]"
  >
    📷 <span className="hidden sm:inline">Image</span>
  </button>

  {/* IA IMAGE */}
  <button
    onClick={() => setShowAIPrompt(prev => !prev)}
    className="flex items-center gap-1 px-2 py-1 text-xs border border-(--color-border) rounded-md hover:bg-[#2a1b12]"
  >
    🤖 <span className="hidden sm:inline">AI Image</span>
  </button>

  {/* REMOVE */}
  {(imageFile || aiPrompt) && (
    <button
      onClick={() => {
        setImageFile(null);
        setAiPrompt("");
      }}
      className="text-xs text-red-400 hover:text-red-300 ml-auto"
    >
      ✕ remove
    </button>
  )}
</div>
  );
}