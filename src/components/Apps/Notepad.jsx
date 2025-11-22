import React, { useState } from 'react';

export default function Notepad({ content }) {
  const [text, setText] = useState(content || '');
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-gray-50 border-b flex gap-2 text-sm text-gray-700">
        <button className="px-3 py-1 hover:bg-gray-200 rounded transition-colors">Arquivo</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded transition-colors">Editar</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded transition-colors">Formatar</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded transition-colors">Exibir</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-5 font-mono text-sm resize-none focus:outline-none"
        style={{ fontFamily: 'Consolas, Courier New, monospace' }}
        placeholder="Digite algo..."
      />
    </div>
  );
}