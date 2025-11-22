import React from 'react';
import { Chrome, Folder, FileText, Image, Monitor, Trash2, ChevronLeft, Wifi, Volume2, Battery, WifiOff, Settings, Power, Calendar, Mail, Calculator, Camera } from 'lucide-react';

function DesktopIcon({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className="w-24 flex flex-col items-center gap-2 p-2 hover:bg-white/20 rounded-lg group transition-all"
    >
      <div className="w-14 h-14 text-white drop-shadow-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-white text-xs text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
        {label}
      </span>
    </button>
  );
}

function MenuTile({ icon, label, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} rounded-xl p-5 hover:scale-105 active:scale-95 transition-all shadow-xl flex flex-col items-center justify-center gap-2 text-white`}
    >
      <div className="w-10 h-10">{icon}</div>
      <span className="text-xs font-semibold text-center">{label}</span>
    </button>
  );
}

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

export default function Desktop({ 
  showStartMenu, 
  setShowStartMenu, 
  settings, 
  openWindow, 
  setShowSettings, 
  setIsLocked,
  addNotification,
  setCurrentPath,
  currentTime,
  isOnline,
  openWindows
}) {
  return (
    <>
      {showStartMenu && (
        <div className="absolute bottom-14 left-0 w-[680px] h-[650px] bg-gray-900/98 backdrop-blur-xl rounded-tr-xl shadow-2xl z-40 border-t border-r border-gray-700/50">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: settings.cursorColor }}
              >
                {settings.playerName[0].toUpperCase()}
              </div>
              <div>
                <div className="text-white font-semibold text-xl">{settings.playerName}</div>
                <div className="text-gray-400 text-sm">jogador@desktop.com</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 flex-1 overflow-y-auto">
              <MenuTile icon={<Chrome />} label="Google Chrome" color="bg-gradient-to-br from-blue-500 to-blue-600" onClick={() => { openWindow('browser', 'Google Chrome', ''); setShowStartMenu(false); }} />
              <MenuTile icon={<Folder />} label="Explorador" color="bg-gradient-to-br from-yellow-500 to-yellow-600" onClick={() => { openWindow('explorer', 'Explorador de Arquivos', ''); setShowStartMenu(false); }} />
              <MenuTile icon={<FileText />} label="Notepad" color="bg-gradient-to-br from-blue-400 to-blue-500" onClick={() => { openWindow('notepad', 'Bloco de Notas - Sem título', 'Digite algo...'); setShowStartMenu(false); }} />
              <MenuTile icon={<Calculator />} label="Calculadora" color="bg-gradient-to-br from-purple-500 to-purple-600" onClick={() => { openWindow('calculator', 'Calculadora', ''); setShowStartMenu(false); }} />
              <MenuTile icon={<Calendar />} label="Calendário" color="bg-gradient-to-br from-red-500 to-red-600" onClick={() => { openWindow('calendar', 'Calendário', ''); setShowStartMenu(false); }} />
              <MenuTile icon={<Mail />} label="Email" color="bg-gradient-to-br from-blue-600 to-blue-700" onClick={() => { openWindow('email', 'Email - Caixa de Entrada', ''); setShowStartMenu(false); }} />
              <MenuTile icon={<Camera />} label="Câmera" color="bg-gradient-to-br from-green-500 to-green-600" onClick={() => addNotification('📷 Câmera', 'Câmera não disponível')} />
              <MenuTile icon={<Settings />} label="Configurações" color="bg-gradient-to-br from-gray-600 to-gray-700" onClick={() => { setShowSettings(true); setShowStartMenu(false); }} />
              <MenuTile icon={<Power />} label="Desligar" color="bg-gradient-to-br from-red-600 to-red-700" onClick={() => { setIsLocked(true); setShowStartMenu(false); }} />
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#1a1a1a]/98 backdrop-blur-md flex items-center px-2 z-30 border-t border-gray-800/50 shadow-2xl">
        <button 
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="w-12 h-10 flex items-center justify-center hover:bg-white/10 rounded transition-colors group"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" fill="#00D8FF" className="group-hover:fill-blue-400 transition-colors"/>
            <rect x="13" y="3" width="8" height="8" fill="#00D8FF" className="group-hover:fill-blue-400 transition-colors"/>
            <rect x="3" y="13" width="8" height="8" fill="#00D8FF" className="group-hover:fill-blue-400 transition-colors"/>
            <rect x="13" y="13" width="8" height="8" fill="#00D8FF" className="group-hover:fill-blue-400 transition-colors"/>
          </svg>
        </button>

        <div className="w-px h-8 bg-gray-700 mx-1"></div>

        <div className="flex-1 flex items-center gap-1 mx-2 overflow-x-auto">
          {openWindows.filter(w => !w.minimized).map(win => (
            <button
              key={win.id}
              className="px-4 h-10 bg-gray-800/80 hover:bg-gray-700/80 rounded flex items-center gap-2 text-white text-sm max-w-52 flex-shrink-0 border border-gray-700/50 transition-all"
            >
              <WindowIcon type={win.type} />
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-white text-xs px-3">
          <ChevronLeft className="w-4 h-4 opacity-50" />
          {isOnline ? <Wifi className="w-4 h-4 hover:text-blue-400 cursor-pointer transition-colors" /> : <WifiOff className="w-4 h-4 text-red-400" />}
          <Volume2 className="w-4 h-4 hover:text-blue-400 cursor-pointer transition-colors" />
          <Battery className="w-4 h-4 hover:text-blue-400 cursor-pointer transition-colors" />
          <div className="text-right pl-2 border-l border-gray-700">
            <div className="font-medium">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-gray-400 text-[10px]">{currentTime.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 grid gap-3">
        <DesktopIcon icon={<Monitor />} label="Este Computador" onClick={() => { setCurrentPath(['Este Computador']); openWindow('explorer', 'Este Computador', ''); }} />
        <DesktopIcon icon={<Trash2 />} label="Lixeira" onClick={() => addNotification('🗑️ Lixeira', 'Lixeira vazia')} />
        <DesktopIcon icon={<Chrome />} label="Google Chrome" onClick={() => openWindow('browser', 'Google Chrome', '')} />
        <DesktopIcon icon={<Folder />} label="Documentos" onClick={() => { setCurrentPath(['Este Computador', 'Documents']); openWindow('explorer', 'Documentos', ''); }} />
        <DesktopIcon icon={<Image />} label="Imagens" onClick={() => { setCurrentPath(['Este Computador', 'Pictures']); openWindow('explorer', 'Imagens', ''); }} />
      </div>
    </>
  );
}