import ContentCard from "../../../globals/components/ContentCard";
import type { Fragment } from "../../../layout/models/fragment.model";
import type { Story } from "../../../globals/models/storyCard.model";
import type { User } from "../../../layout/models/user.model";

interface Props {
  fragment: Fragment;
  story?: Story;
  user?: User;
}

export default function UserFragmentCard({ fragment, story, user }: Props) {
  return (
    <div className="space-y-2">
      
      <div className="text-xs text-orange-400 opacity-80 px-1">
        {story ? (
          <>
            From: <span className="font-semibold">{story.title}</span>
          </>
        ) : (
          "Unknown story"
        )}
      </div>

      <ContentCard
        author={user?.username || "You"}
        content={fragment.content || ""}
        variant="fragment"
        canEdit={false}
        canDelete={false}
      />
    </div>
  );
}