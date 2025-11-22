import React, { useState, useEffect, useRef } from 'react';
import { User, X, Minus, Square, Folder, FileText, Image, Chrome, Monitor, Trash2, ChevronLeft, Wifi, Volume2, Battery, WifiOff, Settings, Power, Calendar, Mail, Calculator, Camera, MousePointer } from 'lucide-react';
import MultiplayerManager from './utils/multiplayer';
import fileSystem from './utils/fileSystem';
import phases from './utils/phases';
import Desktop from './components/Desktop';
import GamePanel from './components/GamePanel';
import Window from './components/Window';
import SettingsWindow from './components/Settings';
import Browser from './components/Browser';
import FileExplorer from './components/FileExplorer';
import Notepad from './components/Apps/Notepad';
import CalculatorReal from './components/Apps/Calculator';
import CalendarApp from './components/Apps/Calendar';
import EmailApp from './components/Apps/Email';
import ImageViewer from './components/Apps/ImageViewer';
import VideoPlayer from './components/Apps/VideoPlayer';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [foundObjects, setFoundObjects] = useState([]);
  const [openWindows, setOpenWindows] = useState([]);
  const [currentPath, setCurrentPath] = useState(['Este Computador', 'Desktop']);
  const [players, setPlayers] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    playerName: 'Jogador',
    cursorColor: '#3B82F6',
    wallpaper: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1920'
  });
  const multiplayerRef = useRef(null);

  // Inicializar multiplayer
  useEffect(() => {
    const mp = new MultiplayerManager();
    mp.connect();
    mp.addPlayer(settings.playerName, settings.cursorColor);
    mp.onChange(setPlayers);
    multiplayerRef.current = mp;
  }, []);

  // Atualizar nome e cor do jogador
  useEffect(() => {
    if (multiplayerRef.current) {
      multiplayerRef.current.addPlayer(settings.playerName, settings.cursorColor);
    }
  }, [settings.playerName, settings.cursorColor]);

  // Atualizar relógio
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Timer do jogo
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      addNotification('⏰ Tempo Esgotado!', 'O jogo terminou!');
    }
  }, [gameStarted, timeLeft]);

  // Rastrear mouse para multiplayer
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (multiplayerRef.current) {
        multiplayerRef.current.updatePosition(e.clientX, e.clientY);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simular perda de conexão
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.98) {
        setIsOnline(false);
        addNotification('🔴 Sem Internet', 'Você ficou offline!');
        setTimeout(() => {
          setIsOnline(true);
          addNotification('🟢 Conectado', 'Internet restaurada!');
        }, 5000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = (title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleLogin = () => {
    if (password.toLowerCase() === 'se divirta!' || password.toLowerCase() === 'se divirta') {
      setIsLocked(false);
      setGameStarted(true);
      addNotification('🎮 Jogo Iniciado!', 'Encontre os objetos antes do tempo acabar!');
    } else {
      setShowPasswordHint(true);
    }
  };

  const openWindow = (type, title, content, extra = {}) => {
    const newWindow = { 
      id: Date.now(), 
      type, 
      title, 
      content, 
      minimized: false,
      x: 100 + openWindows.length * 30,
      y: 80 + openWindows.length * 30,
      ...extra
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  };

  const getCurrentFolder = () => {
    let current = fileSystem;
    for (let i = 0; i < currentPath.length; i++) {
      if (current[currentPath[i]]) {
        current = current[currentPath[i]].items || current[currentPath[i]];
      }
    }
    return current;
  };

  const openFile = (fileName, fileData) => {
    if (fileData.type === 'text') {
      openWindow('notepad', fileName, fileData.content);
      checkFoundObject(`${currentPath.slice(1).join('/')}/${fileName}`);
    } else if (fileData.type === 'image') {
      openWindow('image', fileName, fileData.content);
      checkFoundObject(`${currentPath.slice(1).join('/')}/${fileName}`);
    } else if (fileData.type === 'folder') {
      setCurrentPath([...currentPath, fileName]);
    } else if (fileData.type === 'video') {
      openWindow('video', fileName, fileData.content);
      checkFoundObject(`${currentPath.slice(1).join('/')}/${fileName}`);
    }
  };

  const checkFoundObject = (location) => {
    const phase = phases[currentPhase];
    const obj = phase.objects.find(o => o.location === location && !foundObjects.includes(o.id));
    if (obj) {
      setFoundObjects(prev => [...prev, obj.id]);
      addNotification('✅ Objeto Encontrado!', obj.name);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const changeWallpaper = (url) => {
    setSettings(prev => ({ ...prev, wallpaper: url }));
    addNotification('🖼️ Papel de Parede', 'Alterado com sucesso!');
  };

  // TELA DE BLOQUEIO
  if (isLocked) {
    return (
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        <div className="relative z-10 text-center mb-8">
          <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border-4 border-white/30">
            <User className="w-20 h-20 text-white" />
          </div>
          <h2 className="text-4xl font-light text-white mb-2">{settings.playerName}</h2>
        </div>

        <div className="relative z-10 w-96">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Senha"
            className="w-full px-6 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-lg text-white placeholder-white/60 text-center text-xl focus:outline-none focus:border-white/50 focus:bg-white/30"
          />
          
          {showPasswordHint && (
            <div className="mt-4 p-4 bg-red-500/90 backdrop-blur-sm rounded-lg text-white text-sm flex items-start gap-3 animate-in slide-in-from-top">
              <div className="text-2xl">⚠️</div>
              <div>
                <div className="font-bold mb-1">Senha incorreta</div>
                <div>Dica: "se divirta!"</div>
              </div>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="mt-4 w-full py-4 bg-blue-500/80 backdrop-blur-md border-2 border-blue-400/50 rounded-lg text-white font-semibold text-lg hover:bg-blue-600/80 transition-all"
          >
            Entrar →
          </button>
        </div>

        <div className="absolute bottom-10 right-10 text-white/80 text-lg font-light">
          <div className="text-5xl mb-2">{currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
        </div>
      </div>
    );
  }

  const phase = phases[currentPhase];
  const progress = (foundObjects.length / phase.objectsNeeded) * 100;

  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: `url(${settings.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* NOTIFICAÇÕES */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div key={notif.id} className="bg-gray-900/95 backdrop-blur-sm text-white p-4 rounded-lg shadow-2xl border border-gray-700 animate-in slide-in-from-right w-80">
            <div className="font-bold mb-1">{notif.title}</div>
            <div className="text-sm text-gray-300">{notif.message}</div>
          </div>
        ))}
      </div>

      {/* CURSORES MULTIPLAYER */}
      {players.map(player => (
        <div
          key={player.id}
          className="fixed pointer-events-none z-40 transition-all duration-100"
          style={{ left: player.x, top: player.y, transform: 'translate(-2px, -2px)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill={player.color} className="drop-shadow-lg filter drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" stroke="white" strokeWidth="2"/>
          </svg>
          <div 
            className="ml-7 -mt-5 px-2 py-1 rounded-md text-xs font-bold whitespace-nowrap shadow-lg" 
            style={{ backgroundColor: player.color, color: 'white' }}
          >
            {player.name}
          </div>
        </div>
      ))}

      {/* DESKTOP */}
      <Desktop 
        showStartMenu={showStartMenu}
        setShowStartMenu={setShowStartMenu}
        settings={settings}
        openWindow={openWindow}
        setShowSettings={setShowSettings}
        setIsLocked={setIsLocked}
        addNotification={addNotification}
        setCurrentPath={setCurrentPath}
        currentTime={currentTime}
        isOnline={isOnline}
        openWindows={openWindows}
      />

      {/* CONFIGURAÇÕES */}
      {showSettings && (
        <SettingsWindow 
          settings={settings}
          onClose={() => setShowSettings(false)}
          onSave={(newSettings) => {
            setSettings(newSettings);
            addNotification('⚙️ Configurações', 'Salvo com sucesso!');
            setShowSettings(false);
          }}
          onChangeWallpaper={changeWallpaper}
        />
      )}

      {/* PAINEL DO JOGO */}
      <GamePanel 
        phase={phase}
        currentPhase={currentPhase}
        timeLeft={timeLeft}
        foundObjects={foundObjects}
        progress={progress}
        formatTime={formatTime}
        players={players}
      />

      {/* JANELAS */}
      {openWindows.filter(w => !w.minimized).map(win => (
        <Window 
          key={win.id} 
          window={win} 
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
        >
          {win.type === 'browser' && <Browser onSearch={checkFoundObject} isOnline={isOnline} />}
          {win.type === 'notepad' && <Notepad content={win.content} />}
          {win.type === 'explorer' && (
            <FileExplorer 
              path={currentPath} 
              files={getCurrentFolder()} 
              onOpen={openFile} 
              onBack={() => setCurrentPath(prev => prev.slice(0, -1))}
              onNavigate={(newPath) => setCurrentPath(newPath)}
            />
          )}
          {win.type === 'image' && <ImageViewer src={win.content} />}
          {win.type === 'video' && <VideoPlayer src={win.content} />}
          {win.type === 'calculator' && <CalculatorReal />}
          {win.type === 'calendar' && <CalendarApp />}
          {win.type === 'email' && <EmailApp playerName={settings.playerName} />}
        </Window>
      ))}
    </div>
  );
}