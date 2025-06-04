import { Player, Enemy, Bullet } from './entities.js';
import { InputManager } from './input.js';
import { Random, FPSCounter } from '../utils/math.js';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private input: InputManager;
  private fpsCounter: FPSCounter;
  
  private player: Player;
  private enemies: Enemy[] = [];
  private playerBullets: Bullet[] = [];
  private enemyBullets: Bullet[] = [];
  
  private score: number = 0;
  private gameOver: boolean = false;
  private lastTime: number = 0;
  private enemySpawnTimer: number = 0;
  private readonly enemySpawnDelay: number = 2000; // 2秒間隔
  
  // UI要素
  private scoreElement: HTMLElement | null = null;
  private gameOverElement: HTMLElement | null = null;
  private restartButton: HTMLElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }
    this.ctx = context;
    
    this.input = new InputManager();
    this.fpsCounter = new FPSCounter();
    
    // プレイヤーを画面下部中央に配置
    this.player = new Player(
      this.canvas.width / 2 - 20,
      this.canvas.height - 80
    );
    
    this.setupUI();
    this.setupEventListeners();
  }

  private setupUI(): void {
    this.scoreElement = document.getElementById('score');
    this.gameOverElement = document.getElementById('gameOver');
    this.restartButton = document.getElementById('restartBtn');
  }

  private setupEventListeners(): void {
    this.restartButton?.addEventListener('click', () => {
      this.restart();
    });
  }

  private restart(): void {
    this.gameOver = false;
    this.score = 0;
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.enemySpawnTimer = 0;
    
    this.player = new Player(
      this.canvas.width / 2 - 20,
      this.canvas.height - 80
    );
    
    this.updateUI();
    this.gameLoop(performance.now());
  }

  private updateUI(): void {
    if (this.scoreElement) {
      this.scoreElement.textContent = `スコア: ${this.score}`;
    }
    
    if (this.gameOverElement) {
      this.gameOverElement.style.display = this.gameOver ? 'block' : 'none';
    }
  }

  private spawnEnemy(): void {
    const x = Random.range(0, this.canvas.width - 30);
    const enemy = new Enemy(x, -30);
    this.enemies.push(enemy);
  }

  private updatePlayer(deltaTime: number): void {
    const speed = 300; // ピクセル/秒
    
    // プレイヤー移動
    if (this.input.moveLeft) {
      this.player.velocity.x = -speed;
    } else if (this.input.moveRight) {
      this.player.velocity.x = speed;
    } else {
      this.player.velocity.x = 0;
    }
    
    if (this.input.moveUp) {
      this.player.velocity.y = -speed;
    } else if (this.input.moveDown) {
      this.player.velocity.y = speed;
    } else {
      this.player.velocity.y = 0;
    }
    
    // プレイヤー射撃
    if (this.input.shoot && this.player.canShoot()) {
      this.player.shoot();
      const bullet = new Bullet(
        this.player.position.x + this.player.size.x / 2 - 2,
        this.player.position.y
      );
      this.playerBullets.push(bullet);
    }
    
    this.player.update(deltaTime);
  }

  private updateEnemies(deltaTime: number): void {
    // 敵のスポーン
    this.enemySpawnTimer += deltaTime;
    if (this.enemySpawnTimer >= this.enemySpawnDelay) {
      this.spawnEnemy();
      this.enemySpawnTimer = 0;
    }
    
    // 敵の更新
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(deltaTime);
      
      // 敵の射撃
      if (enemy.canShoot()) {
        enemy.shoot();
        const bullet = new Bullet(
          enemy.position.x + enemy.size.x / 2 - 2,
          enemy.position.y + enemy.size.y,
          200 // 下向きの速度
        );
        this.enemyBullets.push(bullet);
      }
      
      // 死んでいる敵を削除
      if (!enemy.alive) {
        this.enemies.splice(i, 1);
      }
    }
  }

  private updateBullets(deltaTime: number): void {
    // プレイヤーの弾丸更新
    for (let i = this.playerBullets.length - 1; i >= 0; i--) {
      const bullet = this.playerBullets[i];
      bullet.update(deltaTime);
      
      if (!bullet.alive) {
        this.playerBullets.splice(i, 1);
      }
    }
    
    // 敵の弾丸更新
    for (let i = this.enemyBullets.length - 1; i >= 0; i--) {
      const bullet = this.enemyBullets[i];
      bullet.update(deltaTime);
      
      if (!bullet.alive) {
        this.enemyBullets.splice(i, 1);
      }
    }
  }

  private checkCollisions(): void {
    // プレイヤーの弾丸と敵の当たり判定
    for (let i = this.playerBullets.length - 1; i >= 0; i--) {
      const bullet = this.playerBullets[i];
      
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        
        if (bullet.collidesWith(enemy)) {
          bullet.destroy();
          enemy.destroy();
          this.score += 10;
          break;
        }
      }
    }
    
    // 敵の弾丸とプレイヤーの当たり判定
    for (const bullet of this.enemyBullets) {
      if (bullet.collidesWith(this.player)) {
        this.gameOver = true;
        return;
      }
    }
    
    // 敵とプレイヤーの当たり判定
    for (const enemy of this.enemies) {
      if (enemy.collidesWith(this.player)) {
        this.gameOver = true;
        return;
      }
    }
  }

  private render(): void {
    // 背景をクリア
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 背景グラデーション
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // ゲームオブジェクトの描画
    this.player.render(this.ctx);
    
    for (const enemy of this.enemies) {
      enemy.render(this.ctx);
    }
    
    for (const bullet of this.playerBullets) {
      bullet.render(this.ctx);
    }
    
    for (const bullet of this.enemyBullets) {
      bullet.render(this.ctx);
    }
    
    // FPS表示（デバッグ用）
    const isDev = import.meta.env.DEV;
    if (isDev) {
      this.ctx.fillStyle = '#333';
      this.ctx.font = '16px monospace';
      this.ctx.fillText(`FPS: ${this.fpsCounter.update(performance.now())}`, 10, 30);
    }
  }

  public gameLoop = (currentTime: number): void => {
    if (this.gameOver) {
      this.updateUI();
      return;
    }
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // ゲーム更新
    this.updatePlayer(deltaTime);
    this.updateEnemies(deltaTime);
    this.updateBullets(deltaTime);
    this.checkCollisions();
    
    // 入力状態をリセット
    this.input.update();
    
    // 描画
    this.render();
    
    // UI更新
    this.updateUI();
    
    // 次のフレーム
    requestAnimationFrame(this.gameLoop);
  };

  public start(): void {
    this.lastTime = performance.now();
    this.gameLoop(this.lastTime);
  }
}
