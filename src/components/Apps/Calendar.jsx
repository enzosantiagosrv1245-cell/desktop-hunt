import React from 'react';

export default function CalendarApp() {
  const now = new Date();
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 h-full">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{monthNames[now.getMonth()]} {now.getFullYear()}</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Hoje</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="text-center font-bold text-gray-600 py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => (
            <div 
              key={i} 
              className={`aspect-square flex items-center justify-center rounded-lg border transition-colors ${
                i === now.getDate() + 10 ? 'bg-blue-500 text-white font-bold' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              {i > 0 && i <= 31 ? i : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}