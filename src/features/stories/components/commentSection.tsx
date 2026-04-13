import { useState } from 'react';

export default function CommentsSection() {
  const [commentText, setCommentText] = useState("");

  const handlePostComment = () => {
    if (commentText.trim() === "") return;
    console.log("Comentario enviado:", commentText);
    setCommentText(""); // Limpiar el input después de enviar
  };

  return (
    <div className="mt-8 flex flex-col gap-4 w-full">
      {/* Título de la sección */}
      <h3 className="text-[#e8d5c4] font-medium text-2xl mb-2">
        Comments
      </h3>

      {/* Contenedor del Comentario y el Input */}
      <div className="bg-(--color-bg-card) border border-(--color-border) rounded-xl shadow-md flex flex-col">
        

        {/* Input */}
        <div className="p-4 flex flex-col sm:flex-row gap-3 items-center bg-[rgba(0,0,0,0.1)] rounded-b-xl">
          <input 
            type="text" 
            placeholder="Write a comment..." 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            className="flex-1 w-full bg-[#1a110b] text-(--color-text) placeholder-[#6b5c50] rounded-lg px-4 py-3 border border-(--color-border) outline-none focus:border-(--color-accent) transition-colors shadow-inner" 
          />
          <button 
            onClick={handlePostComment}
            className="w-full sm:w-auto bg-(--color-primary) hover:brightness-110 text-white font-semibold py-3 px-5 rounded-lg transition-all shadow-md whitespace-nowrap"
          >
            Post Comment
          </button>
        </div>

      </div>
    </div>
  );
}