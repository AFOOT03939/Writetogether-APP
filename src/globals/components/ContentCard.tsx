import { useState } from "react";

interface Props {
  author: string;
  content: string;
  createdAt?: string;

  isOwner?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;

  variant?: "fragment" | "comment"; // 🔥 estilo adaptable

  onUpdate?: (newText: string) => void;
  onDelete?: () => void;
}

export default function ContentCard({
  author,
  content,
  createdAt,
  isOwner,
  canEdit = false,
  canDelete = false,
  variant = "fragment",
  onUpdate,
  onDelete
}: Props) {

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content);

  const handleSave = () => {
    onUpdate?.(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(content);
    setIsEditing(false);
  };

  // 🎨 estilos por tipo
  const styles = {
    fragment: "bg-[#0f0b08] border-orange-900/40",
    comment: "bg-[#1a120c] border-orange-800/30"
  };

  return (
    <div className={`border rounded-xl p-4 shadow-lg ${styles[variant]}`}>

      {/* HEADER */}
      <div className="flex items-center gap-2 text-sm text-orange-300 mb-2">
        <span className="font-semibold">{author}</span>
        {createdAt && (
          <span className="opacity-50">• {createdAt}</span>
        )}
      </div>

      {/* CONTENT */}
      {!isEditing ? (
        <p className="text-orange-100 leading-relaxed whitespace-pre-line">
          {text}
        </p>
      ) : (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          className="w-full bg-[#1a0f08] text-orange-100 border border-orange-800 rounded-lg p-3 outline-none focus:border-orange-500 transition resize-none"
          rows={4}
        />
      )}

      {/* ACTIONS */}
      {(canEdit || canDelete) && (
        <div className="flex gap-2 mt-4 justify-end">

          {!isEditing ? (
            <>
              {canEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 rounded-md bg-orange-800 hover:bg-orange-700 text-white text-xs"
                >
                  Edit
                </button>
              )}

              {canDelete && (
                <button
                  onClick={onDelete}
                  className="px-3 py-1 rounded-md bg-red-700 hover:bg-red-600 text-white text-xs"
                >
                  Delete
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded-md bg-green-700 hover:bg-green-600 text-white text-xs"
              >
                Save
              </button>

              <button
                onClick={handleCancel}
                className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-500 text-white text-xs"
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