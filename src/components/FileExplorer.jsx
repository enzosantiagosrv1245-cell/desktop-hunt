import React from 'react';
import { ChevronLeft, ChevronRight, Search, Folder, FileText, Download, Image, Music, Film, Monitor } from 'lucide-react';

export default function FileExplorer({ path, files, onOpen, onBack, onNavigate }) {
  const quickAccess = [
    { name: 'Desktop', icon: <Monitor className="w-4 h-4" />, path: ['Este Computador', 'Desktop'] },
    { name: 'Documentos', icon: <FileText className="w-4 h-4" />, path: ['Este Computador', 'Documents'] },
    { name: 'Downloads', icon: <Download className="w-4 h-4" />, path: ['Este Computador', 'Downloads'] },
    { name: 'Imagens', icon: <Image className="w-4 h-4" />, path: ['Este Computador', 'Pictures'] },
    { name: 'Músicas', icon: <Music className="w-4 h-4" />, path: ['Este Computador', 'Music'] },
    { name: 'Vídeos', icon: <Film className="w-4 h-4" />, path: ['Este Computador', 'Videos'] }
  ];

  return (
    <div className="flex h-full">
      <div className="w-56 bg-gray-50 border-r p-3 space-y-1">
        <div className="text-xs font-bold text-gray-500 uppercase mb-3 px-2">Acesso Rápido</div>
        {quickAccess.map((item, i) => (
          <button
            key={i}
            onClick={() => onNavigate(item.path)}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-lg text-sm text-left transition-colors group"
          >
            <div className="text-gray-600 group-hover:text-blue-600">{item.icon}</div>
            <span className="text-gray-700 group-hover:text-blue-700 font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-2 bg-gray-50 border-b flex items-center gap-2">
          <button 
            onClick={onBack} 
            disabled={path.length <= 1}
            className="p-2 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors opacity-50">
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex-1 px-4 py-2 bg-white border rounded-lg text-sm flex items-center gap-2 shadow-sm">
            <Folder className="w-4 h-4 text-yellow-600" />
            <span className="text-gray-700">{path.join(' > ')}</span>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 p-5 grid grid-cols-6 gap-4 content-start overflow-auto bg-white">
          {Object.entries(files).length === 0 ? (
            <div className="col-span-6 text-center py-20 text-gray-400">
              <Folder className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Esta pasta está vazia</p>
            </div>
          ) : (
            Object.entries(files).map(([name, data]) => (
              <button
                key={name}
                onClick={() => onOpen(name, data)}
                className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 rounded-xl group transition-all"
              >
                {data.type === 'folder' && <Folder className="w-16 h-16 text-yellow-500 group-hover:scale-110 transition-transform" />}
                {data.type === 'text' && <FileText className="w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform" />}
                {data.type === 'image' && <Image className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform" />}
                {data.type === 'video' && <Film className="w-16 h-16 text-purple-500 group-hover:scale-110 transition-transform" />}
                {data.type === 'audio' && <Music className="w-16 h-16 text-pink-500 group-hover:scale-110 transition-transform" />}
                {data.type === 'file' && <FileText className="w-16 h-16 text-gray-500 group-hover:scale-110 transition-transform" />}
                <span className="text-xs text-center break-words max-w-full text-gray-700 group-hover:text-blue-700">{name}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}