import React from 'react';
import { X, Minus, Square, Chrome, FileText, Folder, Image, Calculator, Calendar, Mail } from 'lucide-react';

function WindowIcon({ type }) {
  const icons = {
    browser: <Chrome className="w-4 h-4 text-blue-400" />,
    notepad: <FileText className="w-4 h-4 text-blue-300" />,
    explorer: <Folder className="w-4 h-4 text-yellow-400" />,
    image: <Image className="w-4 h-4 text-green-400" />,
    calculator: <Calculator className="w-4 h-4 text-purple-400" />,
    calendar: <Calendar className="w-4 h-4 text-red-400" />,
    email: <Mail className="w-4 h-4 text-blue-500" />
  };
  return icons[type] || <FileText className="w-4 h-4" />;
}

export default function Window({ window, onClose, onMinimize, children }) {
  return (
    <div 
      className="absolute bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden z-20 border border-gray-300/50"
      style={{ 
        top: window.y || 100, 
        left: window.x || 200, 
        width: '920px', 
        height: '680px',
        maxWidth: 'calc(100vw - 100px)',
        maxHeight: 'calc(100vh - 150px)'
      }}
    >
      <div className="h-10 bg-white border-b border-gray-200 flex items-center px-3 justify-between cursor-move hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <WindowIcon type={window.type} />
          <span className="text-sm font-medium truncate text-gray-800">{window.title}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onMinimize}
            className="w-12 h-8 hover:bg-gray-200 flex items-center justify-center rounded transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-700" />
          </button>
          <button 
            className="w-12 h-8 hover:bg-gray-200 flex items-center justify-center rounded transition-colors"
          >
            <Square className="w-3 h-3 text-gray-700" />
          </button>
          <button 
            onClick={onClose}
            className="w-12 h-8 hover:bg-red-500 hover:text-white flex items-center justify-center rounded transition-colors group"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}