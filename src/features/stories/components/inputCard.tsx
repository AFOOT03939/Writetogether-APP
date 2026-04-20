import { useEffect, useState } from 'react';
import { createFragment, deleteFragment, getFragments, getUser, updateFragment } from '../api/story.api';
import type { Fragment } from '../models/fragments.model';
import { useParams } from 'react-router-dom';
import ContentCard from '../../../globals/components/ContentCard';

export default function StoryCard() {
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [newFragment, setNewFragment] = useState("");
  const [currentUser, setCurrentUser] = useState<any>();

  const {storyId} = useParams()

  useEffect(() => {
    if (!storyId) return;

    const fetch = async () => {
      const data = await getFragments(storyId);
      setFragments(data);
    };

    const fetchUser = async () => {
      const user = await getUser();
      setCurrentUser(user);
    };

    fetch();
    fetchUser();
  }, [storyId]);

  const handleSubmit = async () => {
    if (!newFragment.trim()) return;
    if(!storyId) return;

    const res = await createFragment(storyId, newFragment);

    const newItem: Fragment = {
      fragmentId: res.fragmentId,
      content: newFragment,
      userId: currentUser.userId,
      userName: currentUser.userName,
      createdAt: new Date().toISOString()
    };

    setFragments(prev => [...prev, newItem]);
    setNewFragment("");
  };

  const handleUpdate = async (id: number, text: string) => {
    await updateFragment(id, text);

    setFragments(prev =>
      prev.map(f =>
        f.fragmentId === id ? { ...f, content: text } : f
      )
    );
  };

  const handleDelete = async (id: number) => {
    await deleteFragment(id);

    setFragments(prev =>
      prev.filter(f => f.fragmentId !== id)
    );
  };


  return (
    <div className="bg-(--color-bg-card) rounded-xl border border-(--color-border) shadow-2xl flex flex-col w-full">
      
      {/* ZONA DE FRAGMENTOS (Se separará después)*/}
      <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.05)] max-h-screen h-100">
        
        {fragments.length === 0 ? (
          <p className="text-(--color-text-muted) p-4 text-sm">
            No fragments yet...
          </p>
        ) : (
          fragments.map(f => (
            <div key={f.fragmentId} className="p-4">
              <ContentCard
                author={f.userName}
                content={f.content}
                createdAt={new Date(f.createdAt).toLocaleDateString()}
                variant="fragment"

                canEdit={f.userId === currentUser?.userId}
                canDelete={f.userId === currentUser?.userId}

                onUpdate={(text) => handleUpdate(f.fragmentId, text)}
                onDelete={() => handleDelete(f.fragmentId)}
              />
            </div>
          ))
        )}

      </div>

      {/* ZONA DE ESCRITURA*/}
      <div className="p-6 border-t border-(--color-border) bg-[rgba(0,0,0,0.1)] rounded-b-xl">
        <h3 className="text-white font-bold text-lg mb-4">Write next fragment</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={newFragment}
            onChange={(e) => setNewFragment(e.target.value)}
            placeholder="Type your text here..."
            className="flex-1 bg-[#1a110b] text-(--color-text) placeholder-[#6b5c50] border border-(--color-border) rounded-xl p-4 min-h-25 outline-none focus:border-(--color-accent) transition-colors resize-none shadow-inner"
          />
          
          {/* Stack de Botones */}
          <div className="flex flex-col gap-2 w-full md:w-36 shrink-0">
            <button 
              onClick={handleSubmit}
              className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
              Submit
            </button>
            <button className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
              AI Correction
            </button>
            <button className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
              Improve text
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}