import { useState } from 'react';

export default function SideCard() {

  const [category, setCategory] = useState("Fantasy");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);


  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="bg-(--color-bg-card) rounded-2xl p-6 border border-(--color-border) shadow-xl flex flex-col gap-6 w-full text-(--color-text)">
      
      {/* AUTHOR */}
      <div>
        <h3 className="font-medium text-lg mb-1">Author: AFOOT</h3>
      </div>

      {/* COLLABORATORS */}
      <div>
        <h3 className="font-medium text-(--color-text) mb-2">Collaborators:</h3>
        <ul className="list-disc list-inside text-(--color-text-muted) text-sm ml-2">
          <li>None</li>
        </ul>
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className="font-medium text-(--color-text) mb-2">Category:</h3>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-(--color-bg-main) text-(--color-text) border border-(--color-border) rounded-lg px-3 py-2.5 outline-none focus:border-(--color-accent) transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23b8a693" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
          }}
        >
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
        </select>
      </div>

      {/* TAGS */}
      <div>
        <h3 className="font-medium text-(--color-text) mb-2">Tags:</h3>
        
        {/* Lista de tags agregados */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-(--color-bg-main) border border-(--color-border) rounded text-xs text-(--color-text-muted)">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Type a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1 bg-(--color-bg-main) text-(--color-text) placeholder-(--color-text-muted) border border-(--color-border) rounded-lg px-3 py-2 outline-none focus:border-(--color-accent) transition-colors"
          />
          <button 
            onClick={handleAddTag}
            className="w-10 h-10 shrink-0 bg-(--color-secondary) hover:bg-(--color-primary) text-white rounded-full flex items-center justify-center font-bold text-xl transition-colors shadow-md"
          >
            +
          </button>
        </div>
      </div>

      {/* STORY RATING */}
      <div>
        <h3 className="font-medium text-(--color-text) mb-2">Story rating</h3>
        <div className="flex gap-1 text-(--color-text-muted) text-xl mb-1">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
        <p className="text-sm text-(--color-text-muted)">
          Be the first to rate this story!
        </p>
      </div>

    </div>
  );
}