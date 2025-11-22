import React from 'react';
import { Zap, Clock, Activity, MousePointer, Star } from 'lucide-react';

export default function GamePanel({ phase, currentPhase, timeLeft, foundObjects, progress, formatTime, players }) {
  return (
    <div className="absolute top-4 right-4 w-[400px] bg-gradient-to-br from-gray-900/98 to-gray-800/98 backdrop-blur-xl rounded-2xl p-5 text-white border border-gray-700/50 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          FASE {currentPhase + 1}
        </h2>
        <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold shadow-lg">
          {foundObjects.length}/{phase.objectsNeeded}
        </div>
      </div>
      
      <div className="mb-4 p-3 bg-red-900/30 rounded-lg border border-red-700/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Tempo:
          </span>
          <span className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-300 animate-pulse' : 'text-green-300'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all" style={{ width: `${(timeLeft / phase.time) * 100}%` }}></div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Progresso:
          </span>
          <span className="font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all shadow-lg" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-green-900/30 rounded-lg border border-green-700/50">
        <div className="flex items-center gap-2 text-sm">
          <MousePointer className="w-4 h-4 text-green-400" />
          <span className="font-semibold">Jogadores Online: {players.length}</span>
        </div>
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2 sticky top-0 bg-gray-800/95 py-2 rounded">
          <Star className="w-3 h-3" />
          Objetos para Encontrar:
        </h3>
        {phase.objects.slice(0, phase.objectsNeeded).map(obj => (
          <div 
            key={obj.id} 
            className={`p-3 rounded-lg flex items-center gap-3 transition-all ${
              foundObjects.includes(obj.id) 
                ? 'bg-green-900/50 border border-green-700/50 scale-95' 
                : 'bg-gray-800/70 border border-gray-700/50 hover:bg-gray-700/70 hover:border-gray-600'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
              foundObjects.includes(obj.id) 
                ? 'bg-green-500 border-green-400 scale-110 shadow-lg shadow-green-500/50' 
                : 'border-gray-600'
            }`}>
              {foundObjects.includes(obj.id) && <span className="text-white font-bold text-sm">✓</span>}
            </div>
            <span className={`text-sm ${foundObjects.includes(obj.id) ? 'line-through text-gray-500' : ''}`}>
              {obj.name}
            </span>
          </div>
        ))}
      </div>

      {foundObjects.length >= phase.objectsNeeded && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-center animate-bounce shadow-xl">
          <div className="text-3xl mb-2">🎉</div>
          <div className="font-bold text-lg">PARABÉNS!</div>
          <div className="text-sm">Você completou a fase!</div>
        </div>
      )}
    </div>
  );
}