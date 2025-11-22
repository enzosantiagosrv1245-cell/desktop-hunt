import React, { useState } from 'react';
import { X, Settings, Palette, User, MousePointer, Image } from 'lucide-react';

export default function SettingsWindow({ settings, onClose, onSave, onChangeWallpaper }) {
  const [tempSettings, setTempSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('personalization');

  const wallpapers = [
    { name: 'Montanhas', url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920' },
    { name: 'Céu Estrelado', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920' },
    { name: 'Paisagem', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920' },
    { name: 'Oceano', url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920' }
  ];

  const colors = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Vermelho', value: '#EF4444' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Roxo', value: '#8B5CF6' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Laranja', value: '#F97316' },
    { name: 'Amarelo', value: '#EAB308' },
    { name: 'Ciano', value: '#06B6D4' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[900px] h-[700px] flex flex-col overflow-hidden">
        <div className="h-14 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between px-6 text-white">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6" />
            <h2 className="text-xl font-bold">Configurações</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-64 bg-gray-50 border-r p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('personalization')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'personalization' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <Palette className="w-5 h-5 inline mr-3" />
              Personalização
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              <User className="w-5 h-5 inline mr-3" />
              Conta
            </button>
          </div>

          <div className="flex-1 p-8 overflow-auto">
            {activeTab === 'personalization' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MousePointer className="w-6 h-6" />
                    Cor do Cursor
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setTempSettings(prev => ({ ...prev, cursorColor: color.value }))}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${tempSettings.cursorColor === color.value ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
                      >
                        <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: color.value }}></div>
                        <div className="text-sm font-medium text-gray-700 text-center">{color.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Image className="w-6 h-6" />
                    Papel de Parede
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {wallpapers.map(wp => (
                      <button
                        key={wp.url}
                        onClick={() => {
                          setTempSettings(prev => ({ ...prev, wallpaper: wp.url }));
                          onChangeWallpaper(wp.url);
                        }}
                        className={`relative rounded-xl overflow-hidden border-4 transition-all hover:scale-105 ${tempSettings.wallpaper === wp.url ? 'border-blue-500 shadow-xl' : 'border-gray-200'}`}
                      >
                        <img src={wp.url} alt={wp.name} className="w-full h-32 object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-2 text-sm font-medium text-center">
                          {wp.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nome do Jogador</label>
                  <input
                    type="text"
                    value={tempSettings.playerName}
                    onChange={(e) => setTempSettings(prev => ({ ...prev, playerName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Digite seu nome"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">ℹ️</div>
                    <div>
                      <div className="font-bold text-blue-900 mb-1">Informação</div>
                      <div className="text-sm text-blue-700">Este nome será exibido para outros jogadores online e no cursor do mouse.</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Informações da Conta</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{tempSettings.playerName.toLowerCase().replace(/\s/g, '')}@desktop.com</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">ID do Jogador:</span>
                      <span className="font-mono text-xs">{Math.random().toString(36).substr(2, 9)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-16 bg-gray-50 border-t flex items-center justify-end gap-3 px-6">
          <button 
            onClick={onClose}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onSave(tempSettings)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}