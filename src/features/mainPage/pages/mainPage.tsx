import { useEffect, useState } from "react";
import "../css/mainpage.css"
import type { Story } from "../../../globals/models/storyCard.model";
import { getStories } from "../api/main.api";
import StoryCard from "../../../globals/components/storyCard";
import MenuFoto from "../../../assets/MenuFoto.png";

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
      <div className="hero-wrapper">
        <section className="hero-section flex items-center justify-between max-w-[1200px] mx-auto gap-12 py-12 px-6">

          {/* LEFT */}
          <div className="flex-1 text-white">

            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
              WriteTogether
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-muted)]">
              Where we collab to make incredible stories...
            </p>

          </div>

          {/* RIGHT */}
          <div className="hero-image">

            <img 
              src={MenuFoto}
              className="hero-img"
            />

            <div className="hero-text">
              Where we collab to make incredible stories...
            </div>

          </div>

        </section>
      </div>
      
      {/* STORIES SECTION */}
      <section className="stories-section">
        <div className="stories-grid">
        {stories.slice(0, 10).map((story) => (
          <StoryCard key={story.storyId} story={story} />
        ))}
        </div>
      </section>

      {/* PARTICLES */}
      <div className="particle" style={{ left: '10%' }} />
      <div className="particle" style={{ left: '20%' }} />
      <div className="particle" style={{ left: '30%' }} />
      <div className="particle" style={{ left: '40%' }} />
      <div className="particle" style={{ left: '50%' }} />
      <div className="particle" style={{ left: '60%' }} />
      <div className="particle" style={{ left: '70%' }} />
      <div className="particle" style={{ left: '80%' }} />
      <div className="particle" style={{ left: '90%' }} />

      {/* GENRES SECTION */}
      <section className="genres-section">
        <h2 className="section-title">Una variedad de géneros</h2>
        <p className="section-subtitle">
          Descubre historias que despertarán tu imaginación
        </p>

        <div className="genres-container">
          <div className="genres-grid">

            {/* FUTURO COMPONENTE: GenreButton */}
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

      {/* AI SECTION */}
      <section className="ai-section flex justify-center py-16 px-4">

        <div className="
          max-w-[800px] w-full
          bg-[var(--color-bg-card)]
          rounded-2xl
          p-8 md:p-10
          shadow-xl
          border border-[var(--color-border)]
          text-center
        ">

          {/* TITLE */}
          <h2 className="
            text-2xl md:text-3xl 
            font-bold 
            text-[var(--color-secondary)]
            mb-4
          ">
            Asistente de Escritura con IA
          </h2>

          {/* DESCRIPTION */}
          <p className="
            text-[var(--color-text-muted)]
            text-sm md:text-base
            mb-6
          ">
            Tu compañero de escritura inteligente ya está activo. Utiliza la potencia
            de Gemini AI para llevar tu historia colaborativa al siguiente nivel:
          </p>

          {/* LIST */}
          <ul className="text-left space-y-3 text-sm md:text-base text-white">

            <li>
              <strong>Corrección Contextual:</strong> Corrige fragmentos adaptando el estilo
              y tono a lo que ya se ha escrito.
            </li>

            <li>
              <strong>Coherencia Global:</strong> Utiliza "Correct all story" para unificar la
              narrativa y eliminar contradicciones entre autores.
            </li>

            <li>
              <strong>Ortografía y Gramática:</strong> Limpieza instantánea de errores de
              redacción y puntuación.
            </li>

            <li>
              <strong>Continuidad:</strong> Asegura que cada nueva aportación fluya
              naturalmente con la historia.
            </li>

          </ul>

        </div>

      </section>
    </div>
  );
}