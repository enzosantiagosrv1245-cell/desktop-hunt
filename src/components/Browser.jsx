import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Globe, WifiOff } from 'lucide-react';

function DinoGame({ onClose }) {
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => setScore(s => s + 1), 100);
      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <button onClick={onClose} className="absolute top-4 right-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Voltar Online
      </button>
      <div className="text-center mb-8">
        <WifiOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sem conexão com a internet</h2>
        <p className="text-gray-600">Pressione ESPAÇO para jogar</p>
      </div>
      <div className="text-4xl mb-8">🦖</div>
      <div className="text-2xl font-mono mb-4">Pontuação: {score}</div>
      <button
        onClick={() => setGameStarted(true)}
        className="px-8 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
      >
        {gameStarted ? 'Jogando...' : 'Iniciar Jogo'}
      </button>
    </div>
  );
}

export default function Browser({ onSearch, isOnline }) {
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [searchResults, setSearchResults] = useState([]);
  const [showDinoGame, setShowDinoGame] = useState(false);

  const handleSearch = () => {
    if (!isOnline) {
      setShowDinoGame(true);
      return;
    }
    if (url) {
      setCurrentPage('results');
      setSearchResults([
        { title: `${url} - Wikipedia`, url: `https://pt.wikipedia.org/wiki/${url}`, desc: `${url} é um termo que se refere a... (Wikipedia)` },
        { title: `Tudo sobre ${url}`, url: `https://www.${url}.com`, desc: `Site oficial sobre ${url}. Informações completas e atualizadas.` },
        { title: `Como aprender ${url} - Tutorial Completo`, url: `https://tutorial.com/${url}`, desc: `Guia completo para iniciantes sobre ${url}.` },
        { title: `${url} - Notícias e Atualizações`, url: `https://noticias.com/${url}`, desc: `Últimas notícias sobre ${url}.` }
      ]);
      onSearch(`browser:google:${url}`);
    }
  };

  if (showDinoGame) {
    return <DinoGame onClose={() => setShowDinoGame(false)} />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 bg-gray-100 border-b flex items-center gap-3">
        <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" onClick={() => setCurrentPage('home')} />
        <ChevronRight className="w-5 h-5 text-gray-300" />
        <button className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
          <Home className="w-4 h-4 text-gray-600" />
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Pesquisar no Google ou digite um URL"
          className="flex-1 px-5 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        <button 
          onClick={handleSearch} 
          className="px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm"
        >
          Buscar
        </button>
      </div>
      
      <div className="flex-1 overflow-auto bg-white">
        {currentPage === 'home' ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg className="w-32 h-32 mb-8" viewBox="0 0 272 92">
              <text x="10" y="70" fontFamily="Arial" fontSize="80" fill="#4285F4">G</text>
              <text x="70" y="70" fontFamily="Arial" fontSize="80" fill="#EA4335">o</text>
              <text x="120" y="70" fontFamily="Arial" fontSize="80" fill="#FBBC04">o</text>
              <text x="170" y="70" fontFamily="Arial" fontSize="80" fill="#4285F4">g</text>
              <text x="210" y="70" fontFamily="Arial" fontSize="80" fill="#34A853">l</text>
              <text x="240" y="70" fontFamily="Arial" fontSize="80" fill="#EA4335">e</text>
            </svg>
            <p className="text-gray-500 text-lg">Pesquise qualquer coisa</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="max-w-3xl">
              <div className="text-sm text-gray-600 mb-2">Aproximadamente 1.250.000 resultados (0,42 segundos)</div>
              <div className="space-y-6">
                {searchResults.map((result, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1">{result.url}</div>
                        <a href="#" className="text-xl text-blue-700 hover:underline font-medium">{result.title}</a>
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{result.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}