import React from 'react';
import { Film } from 'lucide-react';

export default function VideoPlayer({ src }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black p-8 gap-4">
      <Film className="w-24 h-24 text-white/50" />
      <div className="text-white text-center">
        <div className="text-2xl font-bold mb-2">Player de Vídeo</div>
        <div className="text-gray-400 mb-4">Reproduzindo vídeo...</div>
      </div>
      <img src={src} alt="Video thumbnail" className="w-full max-w-2xl rounded-lg shadow-2xl" />
      <div className="flex gap-4 mt-4">
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">▶️ Play</button>
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">⏸️ Pause</button>
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">⏹️ Stop</button>
      </div>
    </div>
  );
}