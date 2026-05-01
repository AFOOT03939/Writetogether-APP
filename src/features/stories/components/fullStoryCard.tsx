import ContentCard from "../../../globals/components/ContentCard";

interface Props {
  content: string;
  storyTitle?: string;
  author?: string;
}

export default function FullStoryCard({ content, storyTitle, author }: Props) {
  return (
    <div className="space-y-4">

      {/* 🔹 HEADER */}
      <div className="text-orange-400 text-sm opacity-80">
        Final Version {storyTitle && <>• <span className="font-semibold">{storyTitle}</span></>}
      </div>

      {/* 🔹 CONTENIDO */}
      <ContentCard
        author={author || "Final Story"}
        content={content}
        variant="fragment"
        canEdit={false}
        canDelete={false}
      />

    </div>
  );
}