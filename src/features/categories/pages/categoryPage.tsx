import { useEffect, useState } from "react";
import "../css/category.css"; // Asegúrate de crear e importar este archivo
import type { Story } from "../../../globals/models/storyCard.model";
import { getStories } from "../api/category.api";
import StoryCard from "../../../globals/components/storyCard";
import { getCategories } from "../../../globals/api/api";
import type { Category } from "../../../globals/models/category.model";
import { useNavigate } from "react-router-dom";

export default function CategoryPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    

    const [selectedStatus, setSelectedStatus] = useState<string>("active");
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategoryStories = async () => {
        try {
            const cat = await getCategories();
            const resp = await getStories(selectedStatus, selectedCategory);
            setStories(resp);
            setCategories(cat)
        } catch (err) {
            console.log("Error cargando historias de la categoría", err);
        }
        };

        loadCategoryStories();
    }, [selectedStatus, selectedCategory]);

    return (
        <div className="category-page">
        
        {/* HEADER*/}
        <section className="category-hero">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-3">
            Stories
            </h1>
            <p className="text-lg text-[var(--color-text)] mb-6">
            Discover Incredible Stories
            </p>
            
            <div className="category-stats">
            <span>{stories.length} historias</span>
            <span className="separator">|</span>
            <span>0 autores</span>
            </div>
        </section>

        {/* BARRA DE FILTROS */}
        <section className="category-controls">
            <div className="max-w-[1200px] mx-auto w-full flex flex-wrap items-center gap-6 md:gap-10 px-6">
            
                {/* STATUS */}
                <div className="flex items-center">
                    <label htmlFor="status-select" className="text-[var(--color-text)] mr-3 font-medium">
                        Status:
                    </label>
                    <select 
                        id="status-select" 
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="sort-dropdown"
                    >
                        <option value="active">In progress</option>
                        <option value="finished">Finished</option>
                    </select>
                </div>

                {/* CATEGORÍA */}
                <div className="flex items-center">
                    <label htmlFor="category-select" className="text-[var(--color-text)] mr-3 font-medium">
                        Category:
                    </label>
                    <select 
                        id="category-select" 
                        value={selectedCategory} 
                        onChange={(e) => {
                            const valor = e.target.value;
                            setSelectedCategory(valor === "" ? undefined : Number(valor));
                        }}
                        className="sort-dropdown"
                    >
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.categoryId} value={category.categoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </section>

        {/* GRID DE HISTORIAS */}
        <section className="category-stories-section">
            <div className="stories-grid-cat">
            {/* Si no hay historias, puedes mostrar un mensaje vacío */}
            {stories.length === 0 ? (
                <p className="text-[var(--color-text-muted)] col-span-full text-center py-10">
                No hay historias en esta categoría aún.
                </p>
            ) : (
                stories.map((story) => (
                <StoryCard key={story.storyId} onClick={() => navigate(`/story/${story.storyId}`)} story={story} />
                ))
            )}
            </div>
        </section>

        </div>
    );
}