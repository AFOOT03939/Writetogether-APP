import { useEffect, useState } from "react";
import StoryCard from "../../../globals/components/storyCard";
import type { Story } from "../../../globals/models/storyCard.model";
import { changePhoto, editCharacter, getFragments, getUsers} from "../api/profile.api";
import type { User } from "../../../layout/models/user.model";
import { getStories } from "../../mainPage/api/main.api";
import type { Fragment } from "../../../layout/models/fragment.model";
import ContentCard from "../../../globals/components/ContentCard";
import UserFragmentCard from "../components/userFragmentcard";
import { useNavigate } from "react-router-dom";


// Iconos
const StarIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

export default function ProfilePage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [users, setUsers] = useState<User>();
    const [fragments, setFragments] = useState<Fragment[]>([]);
    const [isEditingName, setIsEditingName] = useState(false);
    const [userName, setUserName] = useState<string>("");

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const CARD_WIDTH = 300 + 24;
    const VISIBLE = 3;

    useEffect(() => {
        const loadData = async () => {
              try{
                    const user = await getUsers();
                    const story = await getStories();
                    const fragment = await getFragments();
                    setFragments(fragment)
                    setStories(story)
                    setUsers(user)

                    if (user?.username) {
                        setUserName(user.username);
                    }
                    
              }catch(err){
                console.log("Error en get de Stories", err)
              }
            };
        loadData();
    }, []);

    const next = () => {
      if (currentIndex < stories.length - VISIBLE) {
        setCurrentIndex((prev) => prev + 1);
      }
    };

    const prev = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    const handleSaveName = async () => {
    try {
        setUsers((prevUser) => 
            prevUser ? { ...prevUser, username: userName } : prevUser
        );

        setIsEditingName(false);
        const edit = async () => {
              try{
                    const user = await editCharacter(userName);
                    setUsers(user)
              }catch(err){
                console.log("Error en get de Stories", err)
              }
            };
        edit();
        window.location.reload();
        console.log("Nombre actualizado a:", userName);
    } catch (error) {
        console.error("Error al actualizar el nombre:", error);
    }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        console.log(file);
         const upload = async () => {
              try{
                    await changePhoto(file);
                    const updatedUser = await getUsers();
                    setUsers(updatedUser);

              }catch(err){
                console.log("Error al subir la imagen", err)
              }
            };
        upload();
    };

    return (
        <div className="bg-(--color-bg-main) min-h-screen text-(--color-text) font-sans p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 max-w-400 mx-auto">
            
            {/* PANEL LATERAL IZQUIERDO */}
            <div className="w-full md:w-80 shrink-0">
                
                <aside className="mt-17 w-full md:w-80 md:fixed md:top-8 md:max-h-[calc(90vh-4rem)] overflow-y-auto bg-(--color-bg-card) rounded-3xl p-8 flex flex-col items-center gap-6 border border-(--color-border) shadow-xl">
                
                <div className="relative">
                    <div className="w-36 h-36 rounded-full bg-(--color-bg-input) overflow-hidden flex items-center justify-center border-4 border-(--color-border) text-5xl">
                    <img className="w-full h-full object-cover" src={`${import.meta.env.VITE_API_URL || 'https://localhost:7219'}${users?.imageUrl}`} alt="Profile" />
                    </div>
                </div>

                {isEditingName ? (
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus 
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()} 
                    className="text-3xl font-extrabold tracking-tight bg-(--color-bg-input) text-(--color-text) border border-(--color-accent) rounded px-2 py-1 text-center w-full md:w-3/4 outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
                />
                ) : (
                <h2 className="text-(--color-text) text-3xl font-extrabold tracking-tight">{users?.username}</h2>
                )}

                <div className="flex items-center gap-2 text-(--color-accent) font-semibold text-lg">
                    <StarIcon />
                    <span>Reputation: {users?.reputationPoints}</span>
                </div>

                <div className="flex gap-3 w-full">
                    <input
                    type="file"
                    accept="image/*"
                    id="photoInput"
                    className="hidden"
                    onChange={handlePhotoChange}
                    />

                    <button
                    onClick={() => document.getElementById("photoInput")?.click()}
                    className="flex-1 px-4 py-2 rounded-full border border-(--color-secondary) text-(--color-text) text-sm font-medium hover:bg-(--color-secondary) transition"
                    >
                    Change photo
                    </button>
                    <button 
                    onClick={() => isEditingName ? handleSaveName() : setIsEditingName(true)}
                    className="flex-1 px-2 py-1 rounded-full border border-(--color-secondary) text-(--color-text) text-sm font-medium hover:bg-(--color-secondary) transition">
                    Edit Name
                    </button>
                </div>

                <div className="w-full  space-y-5">
                    <h3 className="text-(--color-text) text-xl font-bold">My Stories</h3>
                    
                    <div className="space-y-3">
                    <div className="flex justify-between items-center text-base">
                        <span className="text-(--color-text) font-medium">Stories:</span>
                        <span className="text-(--color-text-muted) font-semibold">{stories.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-base">
                        <span className="text-(--color-text) font-medium">Fragments:</span>
                        <span className="text-(--color-text-muted) font-semibold">{fragments?.length}</span>
                    </div>
                    </div>
                </div>

                </aside>
            </div>

            {/* PANEL PRINCIPAL DERECHO */}
            <main className="flex-1 flex flex-col gap-8">
            
            <section className="bg-(--color-bg-card) rounded-3xl p-8 border border-(--color-border) shadow-xl overflow-hidden">
            <h3 className="text-(--color-text) text-2xl font-bold mb-8">
                My Stories
            </h3>

            <div className="w-full">
  
                <div className="overflow-hidden max-w-[60vw] mx-auto relative">
                    
                    {/* BOTÓN IZQUIERDO */}
                    <button
                      onClick={prev}
                      disabled={currentIndex === 0}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-3 py-2 rounded-full"
                    >
                      ←
                    </button>

                    {/* TRACK */}
                    <div
                      className={
                        stories.length > 3
                          ? "flex gap-6 transition-transform duration-300 h-80"
                          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      }
                      style={{
                        transform: `translateX(-${currentIndex * CARD_WIDTH}px)`
                      }}
                    >
                      {stories.map((story) => (
                        <div
                          key={story.storyId}
                          className={stories.length > 3 ? "min-w-[300px] shrink-0" : ""}
                        >
                          <StoryCard story={story} onClick={() => navigate(`/story/${story.storyId}`)} />
                        </div>
                      ))}
                    </div>

                    {/* BOTÓN DERECHO */}
                    <button
                      onClick={next}
                      disabled={currentIndex >= stories.length - VISIBLE}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white px-3 py-2 rounded-full"
                    >
                      →
                    </button>

                </div>
            </div>
            </section>
            
            {/* SECCIÓN MY CONTRIBUTIONS */}
            <section className="bg-(--color-bg-card) rounded-3xl p-8 border border-(--color-border) shadow-xl">
                <h3 className="text-(--color-text) text-2xl font-bold mb-8">My Contributions</h3>
                
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                
                   <div className="space-y-6">
                    {fragments.length === 0 ? (
                        <div className="text-center text-(--color-text-muted)">
                        No contributions yet
                        </div>
                    ) : (
                        fragments.map((fragment) => {
                        const story = stories.find(s => s.storyId === fragment.storyId);

                        return (
                            <UserFragmentCard
                            key={fragment.fragmentId}
                            fragment={fragment}
                            story={story}
                            user={users}
                            />
                        );
                        })
                    )}
                    </div>
                </div>

            </section>

            </main>
        </div>
        </div>
    );
}