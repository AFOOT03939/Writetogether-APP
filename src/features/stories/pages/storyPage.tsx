import { useState } from 'react';
import SideCard from '../components/sideCard';
import StoryCard from '../components/inputCard';
import CommentsSection from '../components/commentSection';


export default function ReadStoryPage() {
  const [storyInfo, setStoryInfo] = useState({
    title: "The Girl That Didn't Eat",
    status: "In Progress",
    author: "AFOOT"
  });

  return (
    <div className="bg-(--color-bg-main) min-h-screen text-(--color-text) font-sans flex flex-col">
      
      {/* 1. HERO / CABECERA CON PATRÓN ZIGZAG */}
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
        <div className="max-w-300 w-full flex flex-col md:flex-row justify-between items-end gap-4 bg-[rgba(61,40,23,0.7)] p-6 rounded-xl backdrop-blur-sm border border-(--color-border)">
          {/* Info principal de la historia */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md mb-2">
              {storyInfo.title}
            </h1>
            <div className="flex items-center gap-3 text-sm font-medium text-white/90">
              <span>Author: {storyInfo.author}</span>
              <span className="text-white/50">|</span>
              <span>Status: {storyInfo.status}</span>
              <span className="text-white/50">|</span>
              <div className="flex text-(--color-accent)">
                <span>★</span><span>★</span><span>★</span><span className="opacity-50">★</span><span className="opacity-50">★</span>
              </div>
            </div>
          </div>

          {/* Botones de acción del header */}
          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-lg bg-(--color-bg-secondary) border border-(--color-border) hover:bg-(--color-bg-card) transition font-medium text-sm shadow-md">
              Save
            </button>
            <button className="px-5 py-2 rounded-lg bg-(--color-bg-secondary) border border-(--color-border) hover:bg-(--color-bg-card) transition font-medium text-sm shadow-md">
              Upload Photo
            </button>
            <button className="px-6 py-2 rounded-lg bg-(--color-accent) text-(--color-bg-secondary) hover:brightness-110 transition font-bold text-sm shadow-md">
              Publish
            </button>
          </div>
        </div>
      </header>

        {/* CONTENEDOR PRINCIPAL  */}
        <main className="flex-1 w-full max-w-350 mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        
        <div className="w-full md:w-80 shrink-0 md:sticky md:top-40 md:max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <SideCard />
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