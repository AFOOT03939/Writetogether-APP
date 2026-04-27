import { useState } from "react";
import { generateImageAI } from "../../features/stories/api/story.api";


export function useAiImage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (prompt: string) => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await generateImageAI(prompt);

      if (!res?.imageUrl) throw new Error("No image returned");

      setImagePreview(res.imageUrl);

      // convertir a File
      const blob = await fetch(res.imageUrl).then(r => r.blob());
      const file = new File([blob], "ai.png", { type: blob.type });

      setImageFile(file);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  const setFile = (file: File | null) => {
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return {
    imageFile,
    imagePreview,
    loading,
    error,
    generate,
    clear,
    setImageFile: setFile
  };
}