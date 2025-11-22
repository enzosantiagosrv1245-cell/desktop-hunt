import React from 'react';

export default function ImageViewer({ src }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-900 p-4">
      <img src={src} alt="Imagem" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
    </div>
  );
}