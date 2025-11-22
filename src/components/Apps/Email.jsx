import React from 'react';

export default function EmailApp({ playerName }) {
  const emails = [
    { from: 'Equipe Desktop Hunt', subject: 'Bem-vindo ao jogo!', preview: 'Olá! Bem-vindo ao Desktop Hunt...', time: '10:30' },
    { from: 'Sistema', subject: 'Configuração completa', preview: 'Sua conta foi configurada com sucesso!', time: '09:15' },
    { from: 'Notificações', subject: 'Nova fase desbloqueada', preview: 'Você desbloqueou a fase 2!', time: '08:45' }
  ];

  return (
    <div className="flex h-full">
      <div className="w-64 bg-gray-50 border-r p-4">
        <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 transition-colors font-medium">
          + Nova Mensagem
        </button>
        <div className="space-y-1">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium">📥 Caixa de Entrada</button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">📤 Enviados</button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">⭐ Favoritos</button>
          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700">🗑️ Lixeira</button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Caixa de Entrada</h2>
          <p className="text-sm text-gray-600">{playerName}@desktop.com</p>
        </div>
        
        <div className="flex-1 overflow-auto">
          {emails.map((email, i) => (
            <div key={i} className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-1">
                <div className="font-bold text-gray-900">{email.from}</div>
                <div className="text-sm text-gray-500">{email.time}</div>
              </div>
              <div className="font-semibold text-gray-800 mb-1">{email.subject}</div>
              <div className="text-sm text-gray-600">{email.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}