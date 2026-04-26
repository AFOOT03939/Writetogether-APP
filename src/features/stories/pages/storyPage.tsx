import { useEffect, useRef, useState } from 'react';
import SideCard from '../components/sideCard';
import StoryCard from '../components/inputCard';
import CommentsSection from '../components/commentSection';
import { useNavigate, useParams } from 'react-router-dom';
import type { StoriesModel, StoriesModelRequest } from '../models/story.model';
import { createStory, getStory, getUser, getUserRole, uploadImage } from '../api/story.api';
import type { User } from '../../../globals/models/user.model';

export default function ReadStoryPage() {
  const [story, setStory] = useState<StoriesModel>({
    storyId: 0,
    title: "",
    description: "",
    userId: 0,
    status: "active",
    visibility: "",
    imageUrl: "",
    createdAt: "",
    authorName: "",
    rating: 0,
    category: "",
    categoryIds: [], 
    tags: [] 
  });

  const [isCollaborator, setIsCollaborator] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate()
  const {storyId} = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
        const user = await getUser();
        console.log(user);
        setCurrentUser(user);
      };

    fetchUser();
  }, [])

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      const currentStory = await getStory(storyId);
      console.log(currentStory);
      const parsedStory = {
        ...currentStory,
        categoryIds: currentStory.categoryIds
          ? currentStory.categoryIds.split(",").map(Number)
          : []
      };
      setStory(parsedStory);
    };

    const fetchRole = async () => {
      const userRole = await getUserRole(storyId);
      console.log(userRole);
      setIsCollaborator(userRole)
    };

    fetchStory();
    fetchRole();
  }, [storyId]);

  const handleSave = async () => {
    try{

      if (!currentUser) return;
      console.log("request", story)
      const storyRequest: StoriesModelRequest = {
        title: story.title,
        description: story.description,
        userId: currentUser.userId, 
        status: story.status,
        visibility: "public",
        imageUrl: story.imageUrl,
        categoryIds: story.categoryIds
      };

      if(isCreate){
        const res = await createStory(storyRequest)

        //sube la imagen
        if (imageFile) {
          await uploadImage(res.storyId, imageFile);
        }

        alert("insertado correctamente")
        navigate(`/story/${res.storyId}`);
      }

    }catch(err){
      console.log(err)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setImageFile(file);
  };
 
  const imageSrc = imageFile 
  ? URL.createObjectURL(imageFile)  
  : story.imageUrl 

  console.log(currentUser)

  const isCreate = !storyId;
  const isCreator = story.userId === currentUser?.userId;
  const canEdit = isCreate || isCreator || isCollaborator;

  const [isEditingTitle, setIsEditingTitle] = useState(isCreate);

  useEffect(() => {
    setIsEditingTitle(isCreate);
  }, [isCreate]);
  
  return (
    <div className="bg-(--color-bg-main) min-h-screen text-(--color-text) font-sans flex flex-col">
      
      {/* HERO */}
      <header 
        className="w-full flex flex-col items-center justify-center p-8 border-b-4 border-(--color-primary-dark)"
        style={{
          backgroundColor: 'var(--color-secondary)',
          backgroundImage: `
            linear-gradient(135deg, rgba(142, 81, 26, 0.3) 25%, transparent 25%), 
            linear-gradient(225deg, rgba(142, 81, 26, 0.3) 25%, transparent 25%), 
            linear-gradient(45deg, rgba(142, 81, 26, 0.3) 25%, transparent 25%), 
            linear-gradient(315deg, rgba(142, 81, 26, 0.3) 25%, transparent 25%)
          `,
          backgroundPosition: '12px 0, 12px 0, 0 0, 0 0',
          backgroundSize: '24px 24px',
          backgroundRepeat: 'repeat'
        }}
      >
        <div className="max-w-300 w-full flex flex-col md:flex-row justify-around items-center gap-4 bg-[rgba(61,40,23,0.7)] p-6 rounded-xl backdrop-blur-sm border border-(--color-border)">
          {/* IMAGEN */}
          <div className="flex items-center gap-10">
            <div
              onClick={() => fileInputRef.current?.click()} 
              className="w-32 h-32 border-2 border-(--color-border) rounded-xl overflow-hidden bg-(--color-bg-secondary) flex items-center justify-center shadow-md">
              
              {story.imageUrl || imageFile ? (
                <img
                  src={imageSrc}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">Upload an Image</span>
              )}
              
            </div>

            <input 
              type='file'
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              >
            </input>

            
            {/* Info principal de la historia */}
            <div className="">
                {isEditingTitle ? (
                <input
                  type="text"
                  value={story.title || ""}
                  onChange={(e) =>
                    setStory({ ...story, title: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsEditingTitle(false);
                    }
                  }}
                  autoFocus
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-white bg-transparent border-b border-white outline-none mb-2"
                />
              ) : (
                <h1
                  onClick={() => {
                    if (canEdit) setIsEditingTitle(true);
                  }}
                  className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md mb-2 cursor-pointer"
                >
                  {story.title || "Untitled"}
                </h1>
              )}

              <div className="flex items-center gap-3 text-sm font-medium text-white/90">

                {isCreate ? (
                  <span>Author: {currentUser?.userName}</span>
                ) : (
                  <span>Author: {story.authorName}</span>
                )}

                <span className="text-white/50">|</span>

                {isCreate ? (
                <>
                  <span>Status:</span>
                  <select 
                    value={story.status || ""}
                    onChange={(e) =>
                      setStory({ ...story, status: e.target.value })
                    }

                    className="
                    bg-(--color-bg-secondary)
                    text-white
                    p-1
                    rounded-lg
                    border border-(--color-border)
                    outline-none
                    cursor-pointer
                    hover:bg-(--color-bg-card)
                    transition
                  "
                >
                    <option value="active">active</option>
                    <option value="finished">finished</option>
                  </select>
                </>
                ) : (
                  <span>Status: {story.status}</span>
                )}

                <span className="text-white/50">|</span>
                <div className="flex text-(--color-accent)">
                  <span>★</span><span>★</span><span>★</span><span className="opacity-50">★</span><span className="opacity-50">★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción del header */}
          <div className="flex gap-3">
            <button
              onClick={handleSave} 
              className="px-6 py-2 rounded-lg bg-(--color-accent) text-(--color-bg-secondary) hover:brightness-110 transition font-bold text-sm shadow-md">
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL  */}
      <main className="flex-1 w-full max-w-350 mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start">
      
        <div className="w-full md:w-80 shrink-0 md:sticky md:top-40 md:max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <SideCard
              story={story}
              setStory={setStory}
            />
        </div>

        {/* COMMENTS & STORIES */}
        <div className="flex-1 w-full flex flex-col min-w-0">
            <StoryCard />
            <CommentsSection />
        </div>

      </main>
    </div>
  );
}