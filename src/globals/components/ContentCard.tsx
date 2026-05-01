import { useState } from "react";

interface Props {
  author: string;
  content: string;
  createdAt?: string;
  imageUrl?: string;

  isOwner?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;

  variant?: "fragment" | "comment";

  onUpdate?: (newText: string, removeImage?: boolean) => void;
  onDelete?: () => void;
  onAiGenerate?: (prompt: string) => Promise<string>;
}

export default function ContentCard({
  author,
  content,
  createdAt,
  imageUrl,
  canEdit = false,
  canDelete = false,
  variant = "fragment",
  onUpdate,
  onDelete,
  onAiGenerate
}: Props) {

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);
  const [removeImage, setRemoveImage] = useState(false);
  const isOnlyImage = !content?.trim() && imageUrl;
  const [aiPrompt, setAiPrompt] = useState("");
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleSave = () => {
    onUpdate?.(text, removeImage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(content);
    setRemoveImage(false);
    setIsEditing(false);
  };

  const styles = {
    fragment: "bg-[#0f0b08] border-orange-900/40",
    comment: "bg-[#1a120c] border-orange-800/30"
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim() || !onAiGenerate) return;

    try {
      setIsLoadingAi(true);

      const result = await onAiGenerate(aiPrompt);

      setText(result);

      setAiPrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className={`border rounded-xl p-4 shadow-lg ${styles[variant]}`}>

      {/* HEADER */}
      <div className="flex items-center gap-2 text-sm text-orange-300 mb-3">
        <span className="font-semibold">{author}</span>
        {createdAt && (
          <span className="opacity-50">• {createdAt}</span>
        )}
      </div>

      {!isEditing ? (
        <div className="flex flex-col gap-4">
          <p className="text-orange-100 leading-relaxed whitespace-pre-line">
            {text}
          </p>

          {imageUrl && (
            <img 
              src={imageUrl} 
              className="max-h-96 w-50 object-cover rounded-lg border border-orange-900/30"
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          className="w-full bg-[#1a0f08] text-orange-100 border border-orange-800 rounded-lg p-3 outline-none focus:border-orange-500 transition resize-none"
          rows={4}
        />

        {/* AI CORRECTION INLINE */}
        {onAiGenerate && (
          <div className="flex gap-2">
            <input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Fix grammar, improve style..."
              className="flex-1 bg-[#1a110b] border border-orange-800 px-2 py-1 rounded text-sm text-orange-100"
            />

            <button
              onClick={handleAiGenerate}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 rounded text-sm"
            >
              {isLoadingAi ? "..." : "✨"}
            </button>
          </div>
        )}

        {/* Imagen editable (igual que ya tienes) */}
        {imageUrl && !removeImage && (
          <div className="relative w-fit">
            <img 
              src={imageUrl} 
              className="max-h-60 rounded-lg border border-orange-900/30"
            />
            <button
              onClick={() => setRemoveImage(true)}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white w-6 h-6 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        )}

      </div>
      )}

      {/* ACTIONS */}
      {(canEdit || canDelete) && (
        <div className="flex gap-2 mt-4 justify-end">
          {!isEditing ? (
            <>
              {canEdit && !isOnlyImage && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 rounded-md bg-orange-800 hover:bg-orange-700 text-white text-xs transition"
                >
                  Edit
                </button>
              )}
              {canDelete && (
                <button
                  onClick={onDelete}
                  className="px-3 py-1 rounded-md bg-red-700 hover:bg-red-600 text-white text-xs transition"
                >
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded-md bg-green-700 hover:bg-green-600 text-white text-xs transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500 text-white text-xs transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}