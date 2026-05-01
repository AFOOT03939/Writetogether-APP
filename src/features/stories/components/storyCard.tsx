import { useEffect, useState } from 'react';
import { createFragment, deleteFragment, generateText, getFragments, getUser, updateFragment, uploadImageFragments } from '../api/story.api';
import type { Fragment } from '../models/fragments.model';
import { useParams } from 'react-router-dom';
import ContentCard from '../../../globals/components/ContentCard';
import { buildCorrectionPrompt } from '../../../globals/utils/aiPrompt';

interface Props {
  isFinished: boolean;
  role: "creator" | "editor" | "viewer";
  isCreator: boolean;
}

export default function StoryCard({ isFinished, role, isCreator }: Props) {
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [newFragment, setNewFragment] = useState("");
  const [currentUser, setCurrentUser] = useState<any>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showAiInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const { storyId } = useParams();

  const canWrite = (role === "editor" || isCreator) && !isFinished;

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

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!storyId || !currentUser) return;
    if (!newFragment.trim() && !imageFile) return;

    const res = await createFragment(storyId, newFragment);

    let imageUrl: string | undefined = undefined;

    if (imageFile) {
      const uploadRes = await uploadImageFragments(res.fragmentId, imageFile);

      // validar respuesta del backend
      if (uploadRes && uploadRes.imageUrl) {
        imageUrl = uploadRes.imageUrl;
      }
    }

    const newItem: Fragment = {
      fragmentId: res.fragmentId,
      content: newFragment,
      userId: currentUser.userId,
      userName: currentUser.userName,
      createdAt: new Date().toISOString(),
      imageUrl
    };

    setFragments(prev => [...prev, newItem]);

    setNewFragment("");
    handleRemoveImage();
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

      {/* LISTA */}
      <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.05)] max-h-screen h-100 overflow-y-auto">
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
                imageUrl={f.imageUrl} 
                canEdit={f.userId === currentUser?.userId}
                canDelete={f.userId === currentUser?.userId}
                onUpdate={(text) => handleUpdate(f.fragmentId, text)}
                onDelete={() => handleDelete(f.fragmentId)}
                onAiGenerate={async (instruction) => {
                  const fullContext = fragments
                    .map(frag => frag.content)
                    .filter(Boolean)
                    .join("\n\n");

                  const prompt = buildCorrectionPrompt({
                    currentText: f.content || "",
                    fullContext,
                    instruction
                  });

                  const res = await generateText(f.fragmentId, prompt);

                  return res;
                }}
              />
            </div>
          ))
        )}
      </div>

      {canWrite && (
      <div className="p-6 border-t border-(--color-border) bg-[rgba(0,0,0,0.1)] rounded-b-xl">
        <h3 className="text-white font-bold text-lg mb-4">
          Write next fragment
        </h3>

        <div className="flex flex-col md:flex-row gap-4">

          <div className="flex-1 flex flex-col gap-3">
            <textarea
              value={newFragment}
              onChange={(e) => setNewFragment(e.target.value)}
              placeholder="Type your text here..."
              className="w-full bg-[#1a110b] text-(--color-text) border border-(--color-border) rounded-xl p-4 min-h-25 outline-none resize-none"
            />

            {imagePreview && (
              <div className="relative w-fit">
                <img
                  src={imagePreview}
                  className="h-40 rounded-lg border object-cover"
                />
                <button onClick={handleRemoveImage}>
                  ✕
                </button>
              </div>
            )}

            {showAiInput && (
              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe image..."
              />
            )}

          </div>
          
          {/* Stack de Botones Originales (Sin cambios) */}
          <div className="flex flex-col gap-2 w-full md:w-36 shrink-0">
            <button 
              onClick={handleSubmit}
              className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
              Submit
            </button>
            <button className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
              AI Correction
            </button>
          </div>
            
        </div>
      </div>
      )}
    </div>
  );
}