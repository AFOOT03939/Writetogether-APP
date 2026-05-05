import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { LoreEntitiesModel } from '../models/wiki.model';
import { getStory, getUser } from '../../stories/api/story.api';
import { 
    deleteLoreEntity, 
    getFullWikiData, 
} from '../api/wiki.api';
import { WikiCard } from '../components/wikiCard';
import "../../../features/categories/css/category.css"; 

export default function WikiPage() {
    const { storyId } = useParams();
    const [story, setStory] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [entities, setEntities] = useState<LoreEntitiesModel[]>([]);
    const [activeTab, setActiveTab] = useState('Characters');
    const [isEditingSummary, setIsEditingSummary] = useState(false);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); // <--- AGREGADO

    const isCreator = story && currentUser && story.userId === currentUser.userId;

    useEffect(() => {
        const loadData = async () => {
            if (!storyId) return;
            setLoading(true);
            try {
                const [storyData, userData] = await Promise.all([
                    getStory(storyId),
                    getUser()
                ]);
                
                setStory(storyData);
                setCurrentUser(userData);

                // La IA se dispara aquí automáticamente en el backend
                const wikiData = await getFullWikiData(storyId);
                
                setEntities(wikiData.entities || []);
                // Cargamos el texto de la IA directamente al estado
                setSummary(wikiData.storySummary || storyData.description || "");
                
            } catch (error) {
                console.error("Error loading wiki", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [storyId]);

    // <--- FUNCIÓN AGREGADA PARA GUARDAR CAMBIOS MANUALE
    const handleSaveSummary = async () => {
        if (!storyId) return;
        setIsSaving(true);
        try {
            // Llamamos a la API para persistir el cambio
            await updateStorySummary(storyId, summary);
            setIsEditingSummary(false);
        } catch (error) {
            alert("Error saving summary");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'Characters', label: 'Characters', type: 'character' },
        { id: 'Places', label: 'Places', type: 'place' },
        { id: 'Objects', label: 'Objects', type: 'object' },
        { id: 'Events', label: 'Events', type: 'event' }
    ];

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this entry?")) return;
        await deleteLoreEntity(id);
        setEntities(prev => prev.filter(e => e.id !== id));
    };

    return (
        <div className="category-page bg-[#1a110b]">
            <section className="category-hero">
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-3">
                    {loading ? "Loading..." : `Wiki: ${story?.title}`}
                </h1>
                <p className="text-lg text-[var(--color-text)] mb-6 italic">
                    Lore and information extracted from the story
                </p>
                
                <div className="category-stats">
                    <span>{story?.authorName || "AI Generated"}</span>
                </div>
            </section>

            <main className="max-w-5xl mx-auto p-6 space-y-8">
                
                {/* Summary Section */}
                <section className="bg-[#3d2817] rounded-xl border border-[#5d3511] overflow-hidden shadow-2xl">
                    <div className="bg-[#5d3511]/30 px-6 py-3 border-b border-[#5d3511] flex justify-between items-center">
                        <h2 className="text-xl font-bold text-[#f4a460]">Story Summary</h2>
                        
                        {isCreator && (
                            <button 
                                onClick={isEditingSummary ? handleSaveSummary : () => setIsEditingSummary(true)}
                                disabled={isSaving}
                                className={`text-xs px-4 py-1 rounded transition font-bold ${
                                    isEditingSummary 
                                    ? "bg-green-700 hover:bg-green-600 text-white" 
                                    : "bg-[#8e511a] hover:bg-[#a66225] text-white"
                                }`}
                            >
                                {isSaving ? "Saving..." : isEditingSummary ? "Save Changes" : "Edit Summary"}
                            </button>
                        )}
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="space-y-3">
                                <div className="h-4 bg-[#1a110b] rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-[#1a110b] rounded w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-[#1a110b] rounded w-2/3 animate-pulse"></div>
                            </div>
                        ) : isEditingSummary ? (
                            <textarea 
                                className="w-full bg-[#1a110b] border border-[#8e511a] p-4 rounded-lg text-white focus:ring-1 focus:ring-[#f4a460] outline-none h-48 resize-none shadow-inner"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="The chronicles are being synthesized..."
                            />
                        ) : (
                            <p className="text-lg leading-relaxed text-[var(--color-text)] italic opacity-90 whitespace-pre-wrap">
                                "{summary || "No description available."}"
                            </p>
                        )}
                    </div>
                </section>

                <section className="category-controls rounded-lg p-1">
                    <div className="flex w-full gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-2 text-sm font-bold rounded transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-[#8e511a] ml-4 mr-4 text-white shadow-lg translate-y-[-2px]' 
                                    : 'text-[var(--color-text-muted)] hover:text-[#f4a460]'
                                }`}
                            >
                                {tab.label} 
                                <span className="ml-2 px-2 py-0.5 bg-black/20 rounded-full text-[10px]">
                                    {!loading && entities.filter(e => e.type?.toLowerCase() === tab.type).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-32 bg-[#3d2817] rounded-xl animate-pulse border border-[#5d3511]"></div>
                        ))
                    ) : (
                        entities
                            .filter(e => e.type?.toLowerCase() === tabs.find(t => t.id === activeTab)?.type)
                            .map(entity => (
                                <WikiCard 
                                    key={entity.id} 
                                    entity={entity} 
                                    isCreator={isCreator} 
                                    onDelete={handleDelete}
                                />
                            ))
                    )}
                    
                    {!loading && isCreator && (
                        <button className="border-2 border-dashed border-[#5d3511] rounded-xl p-8 text-[#8e511a] hover:bg-[#3d2817]/30 transition flex flex-col items-center justify-center">
                            <span className="text-4xl">+</span>
                            <span className="text-xs font-bold uppercase mt-2">Add New {activeTab.slice(0, -1)}</span>
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}

function updateStorySummary(storyId: string, summary: string) {
    throw new Error('Function not implemented.');
}
