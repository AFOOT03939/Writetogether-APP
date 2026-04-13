import { useState } from 'react';

export default function StoryCard() {
  const [newFragment, setNewFragment] = useState("");

  return (
    <div className="bg-(--color-bg-card) rounded-xl border border-(--color-border) shadow-2xl flex flex-col w-full">
      
      {/* ZONA DE FRAGMENTOS (Se separará después)*/}
      <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.05)] max-h-screen h-100">
        
        <p>ola</p>
      </div>

      {/*
          ZONA DE ESCRITURA*/}
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
            <button className="bg-(--color-primary) hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md text-sm">
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