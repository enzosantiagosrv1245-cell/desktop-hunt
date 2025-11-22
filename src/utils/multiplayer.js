class MultiplayerManager {
  constructor() {
    this.players = new Map();
    this.myId = Math.random().toString(36).substr(2, 9);
    this.callbacks = new Set();
  }

  connect() {
    // Simulação de broadcast local (em produção use WebSocket/Socket.io)
    window.addEventListener('storage', (e) => {
      if (e.key === 'players') {
        this.updatePlayers(JSON.parse(e.newValue || '[]'));
      }
    });
    
    setInterval(() => this.broadcastPosition(), 50);
  }

  broadcastPosition() {
    const players = this.getPlayers();
    localStorage.setItem('players', JSON.stringify(players));
  }

  updatePosition(x, y) {
    const myPlayer = this.players.get(this.myId);
    if (myPlayer) {
      myPlayer.x = x;
      myPlayer.y = y;
      myPlayer.lastUpdate = Date.now();
    }
  }

  addPlayer(name, color) {
    this.players.set(this.myId, {
      id: this.myId,
      name,
      color,
      x: 0,
      y: 0,
      lastUpdate: Date.now()
    });
  }

  getPlayers() {
    const now = Date.now();
    const active = [];
    this.players.forEach(player => {
      if (now - player.lastUpdate < 5000) {
        active.push(player);
      }
    });
    return active;
  }

  updatePlayers(remotePlayers) {
    remotePlayers.forEach(remote => {
      if (remote.id !== this.myId) {
        this.players.set(remote.id, remote);
      }
    });
    this.callbacks.forEach(cb => cb(this.getPlayers()));
  }

  onChange(callback) {
    this.callbacks.add(callback);
  }
}

export default MultiplayerManager;