import { useEffect, useState } from "react";
import "../css/mainpage.css"
import type { Story } from "../../../globals/models/storyCard.model";
import { getStories } from "../api/stories.api";
import StoryCard from "../../../globals/components/storyCard";

export default function HomePage() {

  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const loadStories = async () => {
      try{
          const resp = await getStories();
          setStories(resp)
      }catch(err){
        console.log("Error en get de Stories", err)
      }
    };

    loadStories();
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">WriteTogether</h1>
          <p className="hero-subtitle">
            Where we collab to make incredible stories...
          </p>
        </div>

        <div className="hero-image">
          {/* FUTURO COMPONENTE: HeroImage */}
        </div>
      </section>

      {/* STORIES SECTION */}
      <section className="stories-section">
        <div className="stories-grid">
        {stories.slice(0, 10).map((story) => (
          <StoryCard key={story.storyId} story={story} />
        ))}
        </div>
      </section>

      {/* ✨ PARTICLES */}
      <div className="particle" style={{ left: '10%' }} />
      <div className="particle" style={{ left: '20%' }} />
      <div className="particle" style={{ left: '30%' }} />
      <div className="particle" style={{ left: '40%' }} />
      <div className="particle" style={{ left: '50%' }} />
      <div className="particle" style={{ left: '60%' }} />
      <div className="particle" style={{ left: '70%' }} />
      <div className="particle" style={{ left: '80%' }} />
      <div className="particle" style={{ left: '90%' }} />

      {/* 🎭 GENRES SECTION */}
      <section className="genres-section">
        <h2 className="section-title">Una variedad de géneros</h2>
        <p className="section-subtitle">
          Descubre historias que despertarán tu imaginación
        </p>

        <div className="genres-container">
          <div className="genres-grid">

            {/* 🧩 FUTURO COMPONENTE: GenreButton */}
            <button className="genre-btn">Fantasy</button>
            <button className="genre-btn">Romance</button>
            <button className="genre-btn">Mystery</button>
            <button className="genre-btn">Sci-Fi</button>
            <button className="genre-btn">Horror</button>
            <button className="genre-btn">Adventure</button>
            <button className="genre-btn">Drama</button>
            <button className="genre-btn">Comedy</button>
            <button className="genre-btn">Historical</button>
            <button className="genre-btn">Thriller</button>

          </div>
        </div>
      </section>

      {/* 🤖 AI SECTION */}
      <section className="ai-section">
        <div className="ai-placeholder">

          <h2>Asistente de Escritura con IA</h2>

          <p>
            Tu compañero de escritura inteligente ya está activo.
          </p>

          <ul>
            <li><strong>Corrección Contextual</strong></li>
            <li><strong>Coherencia Global</strong></li>
            <li><strong>Ortografía y Gramática</strong></li>
            <li><strong>Continuidad</strong></li>
          </ul>

        </div>
      </section>

    </div>
  );
}