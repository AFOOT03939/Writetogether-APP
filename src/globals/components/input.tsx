import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onImageChange: (file: File | null) => void;
  onGenerateImage: (prompt: string) => void;
}

export default function Input({
  value,
  onChange,
  onSubmit,
  onImageChange,
  onGenerateImage
}: Props) {

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showAi, setShowAi] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    onImageChange(file);
    setShowAi(false);
  };

  const removeImage = () => {
    setImagePreview(null);
    onImageChange(null);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onGenerateImage(prompt);
  };

  const handlePromptEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const handleSubmit = () => {
    onSubmit();      
    removeImage();   
  };

  return (
    <div className="flex flex-col gap-2 w-full">

      {/* INPUT + BOTÓN EN MISMA FILA */}
      <div className="flex gap-2 items-stretch">

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write..."
          className="flex-1 bg-[#1a110b] text-white px-3 py-2 rounded-lg border border-(--color-border)"
        />

        {/* BOTÓN PRINCIPAL */}
        <button
          onClick={handleSubmit}
          className="bg-(--color-primary) hover:brightness-110 text-white font-semibold px-4 rounded-lg shadow-md whitespace-nowrap"
        >
          Post Comment
        </button>

      </div>

      {/* PREVIEW */}
      {imagePreview && (
        <div className="relative w-fit">
          <img src={imagePreview} className="h-28 rounded-md" />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 text-xs rounded-full"
          >
            ✕
          </button>
        </div>
      )}

      {/* AI INPUT */}
      {showAi && (
        <div className="flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handlePromptEnter}
            placeholder="Describe image..."
            className="flex-1 bg-[#1a110b] border px-2 py-1 rounded text-sm"
          />

          <button
            onClick={handleGenerate}
            className="bg-purple-600 hover:bg-purple-500 text-white px-3 rounded text-sm"
          >
            Generate
          </button>
        </div>
      )}

      {/* TOOLBAR */}
      <div className="flex gap-2">

        <button
          onClick={() => fileRef.current?.click()}
          className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-1 px-3 rounded-lg text-sm"
        >
          Upload Image
        </button>

        <button
          onClick={() => {
            setShowAi(prev => !prev);
            if (imagePreview) removeImage();
          }}
          className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-1 px-3 rounded-lg text-sm"
        >
          AI Image
        </button>

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={handleFile}
        />

      </div>
    </div>
  );
}