import type { Story } from "../models/storyCard.model"

interface Props {
  story: Story;
  onClick?: (id: number) => void;
}

export default function StoryCard({ story, onClick }: Props) {
  const rating = story.rating ?? 0;

  return (
    <div
      onClick={() => onClick?.(story.storyId)}
      className="
        bg-[var(--color-bg-card)]
        rounded-xl
        p-4
        w-full
        cursor-pointer
        transition
        hover:scale-105
        shadow-md
        border border-[var(--color-border)]
      "
    >
      {/* IMAGE */}
      <div className="
        h-28
        flex items-center justify-center
        bg-[var(--color-primary)]
        rounded-lg
        mb-3
        border border-[var(--color-border)]
      ">
        📖
      </div>

      {/* TITLE */}
      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
        {story.title}
      </h3>

      {/* RATING */}
      <div className="text-[var(--color-accent)] text-sm mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>
            {i < rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* META */}
      <div className="text-[var(--color-text-muted)] text-xs space-y-1">
        <div>Author: {story.authorName ?? "Unknown"}</div>
        <div>Category: {story.category ?? "Unknown"}</div>
        <div>Status: {story.status ?? "Unknown"}</div>
        <div>
          Date:{" "}
          {story.createdAt
            ? new Date(story.createdAt).toLocaleDateString()
            : "-"}
        </div>
      </div>
    </div>
  );
}