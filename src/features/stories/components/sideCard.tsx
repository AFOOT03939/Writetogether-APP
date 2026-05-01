import { useEffect, useState } from 'react';
import type { StoriesCollaboratorsModel, StoriesModel } from '../models/story.model';
import CategoryItem from './categoryItem';
import { createRating, getCollaborators, getStoryRating, getUser, getUserStoryRating } from '../api/story.api';
import { useParams } from 'react-router-dom';
import type { RatingModel } from '../models/rates.model';

interface props{
  story: StoriesModel;
  setStory: React.Dispatch<React.SetStateAction<StoriesModel>>;
}

export default function SideCard({story, setStory}: props) {

  const [tagInput, setTagInput] = useState("");
  const [collaborators, setCollaborators] = useState<StoriesCollaboratorsModel[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const categories = [
    { id: 1, name: "Fantasy" },
    { id: 2, name: "Science Fiction" },
    { id: 3, name: "Romance" },
    { id: 4, name: "Horror" },
    { id: 5, name: "Mystery" },
    { id: 6, name: "Adventure" },
    { id: 7, name: "Drama" },
    { id: 8, name: "Comedy" },
    { id: 9, name: "Historical" },
    { id: 10, name: "Thriller" }
  ];

  const {storyId} = useParams();

  useEffect(() => {
    if(!storyId) return;

      const fetchCollaborators = async () => {
        const collaborators = await getCollaborators(storyId);
        console.log(collaborators);
        setCollaborators(collaborators)
      };

      fetchCollaborators();
    }, [storyId]);

  const handleRate = async (value: number) => {
    if (!storyId || !currentUserId) return;

    try {
      setUserRating(value);

      await createRating({
        storyId: Number(storyId),
        rating: value
      });

      // refrescar promedio
      const newAvg = await getStoryRating(storyId);

      setStory(prev => ({
        ...prev,
        rating: newAvg ?? 0
      }));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!storyId) return;

    const fetchData = async () => {
      try {
        const user = await getUser();
        setCurrentUserId(user.userId);

        const [avg, myRating] = await Promise.all([
          getStoryRating(storyId),
          getUserStoryRating(storyId, user.userId)
        ]);

        setStory(prev => ({
          ...prev,
          rating: avg ?? 0
        }));

        if (myRating) {
          setUserRating(myRating);
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [storyId]);

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
          {collaborators.map(col => (
            <li>{col.userName}</li>
          ))}
          <li></li>
        </ul>
      </div>

      {/* CATEGORY */}
      <div>
        <h3 className='mb-2'>Category:</h3>

        {/* seleccion */}
        <select
          onChange={(e) => {
            const newCategory = e.target.value;

            setStory(prev => ({
              ...prev,
              categoryIds: [...(prev.categoryIds || []), Number(newCategory)]
            }));
          }}
          className="w-full bg-(--color-bg-main) text-(--color-text) border border-(--color-border) rounded-lg px-3 py-2.5 outline-none focus:border-(--color-accent) transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23b8a693" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px'
          }}
        >
          <option value="">Select</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* render */}
        <div className="flex flex-wrap gap-2 mt-2">
        {story.categoryIds?.map((id) => {
            const category = categories.find(c => c.id === id);

            return (
              <CategoryItem
                key={id}
                label={category?.name || "Unknown"}
                onRemove={() =>
                  setStory(prev => ({
                    ...prev,
                    categoryIds: prev.categoryIds.filter(c => c !== id)
                  }))
                }
              />
            );
          })}
        </div>
      </div>

      {/* STORY RATING */}
      <div className="flex gap-1 text-xl mb-1 cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRate(star)}
            className={
              star <= userRating
                ? "text-yellow-400"
                : "text-(--color-text-muted)"
            }
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-sm text-(--color-text-muted)">
        {story.rating > 0
          ? `Average rating: ${story.rating.toFixed(1)}`
          : "Be the first to rate this story!"}
      </p>

    </div>
  );
}