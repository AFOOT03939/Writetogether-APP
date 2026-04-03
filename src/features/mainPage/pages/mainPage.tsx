import "../css/mainpage.css"

export default function HomePage() {

  return (
    <div className="home">

      {/* 🟧 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">WriteTogether</h1>
          <p className="hero-subtitle">
            Where we collab to make incredible stories...
          </p>
        </div>

        <div className="hero-image">
          {/* 🧩 FUTURO COMPONENTE: HeroImage */}
        </div>
      </section>

      {/* 📚 STORIES SECTION */}
      <section className="stories-section">
        <div className="stories-grid">

          {/* 🧩 FUTURO COMPONENTE: StoryCard */}
          {/* Ejemplo estructura */}
          <div className="story-card">
            <div className="story-image">📖</div>

            <div className="story-info">
              <h3>Story Title</h3>

              <div className="story-rating">
                {/* ⭐ FUTURO COMPONENTE: Rating */}
              </div>

              <div className="story-meta">
                <div>Author:</div>
                <div>Category:</div>
                <div>Date:</div>
              </div>
            </div>
          </div>

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