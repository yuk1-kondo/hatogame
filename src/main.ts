import './style.css'
import { Game } from './game/game.js'

// ゲームの初期化
function initGame(): void {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }
  
  try {
    const game = new Game(canvas);
    game.start();
    
    console.log('🕊️ Hatogame started! 🕊️');
    console.log('Controls:');
    console.log('- Arrow Keys / WASD: Move');
    console.log('- Space: Shoot');
    
  } catch (error) {
    console.error('Failed to initialize game:', error);
    
    // エラー表示
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 0, 0, 0.1);
      border: 2px solid #ff0000;
      padding: 20px;
      border-radius: 10px;
      color: #ff0000;
      font-weight: bold;
    `;
    errorDiv.textContent = `Game initialization failed: ${error}`;
    document.getElementById('app')?.appendChild(errorDiv);
  }
}

// DOM読み込み完了後にゲームを開始
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
