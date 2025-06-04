import { Vector2, Rectangle } from '../utils/math.js';

// ゲームエンティティの基底クラス
export abstract class GameObject {
  position: Vector2;
  velocity: Vector2;
  size: Vector2;
  alive: boolean = true;

  constructor(x: number, y: number, width: number, height: number) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(0, 0);
    this.size = new Vector2(width, height);
  }

  update(deltaTime: number): void {
    this.position = this.position.add(this.velocity.multiply(deltaTime / 1000));
  }

  render(ctx: CanvasRenderingContext2D): void {
    // 基本的な矩形描画（サブクラスでオーバーライド）
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  getBounds(): Rectangle {
    return new Rectangle(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  collidesWith(other: GameObject): boolean {
    return this.getBounds().intersects(other.getBounds());
  }

  destroy(): void {
    this.alive = false;
  }
}

// プレイヤー（鳩）クラス
export class Player extends GameObject {
  private shootCooldown: number = 0;
  private readonly shootDelay: number = 200; // ミリ秒

  constructor(x: number, y: number) {
    super(x, y, 40, 40);
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    
    // 画面境界での制限
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.size.x > 800) this.position.x = 800 - this.size.x;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.size.y > 600) this.position.y = 600 - this.size.y;
    
    // 射撃クールダウン更新
    if (this.shootCooldown > 0) {
      this.shootCooldown -= deltaTime;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    // 鳩の簡単な描画
    const centerX = this.position.x + this.size.x / 2;
    const centerY = this.position.y + this.size.y / 2;
    
    // 体
    ctx.fillStyle = '#808080';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 頭
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY - 15, 8, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // くちばし
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 15);
    ctx.lineTo(centerX - 5, centerY - 18);
    ctx.lineTo(centerX, centerY - 20);
    ctx.closePath();
    ctx.fill();
    
    // 翼
    ctx.fillStyle = '#A9A9A9';
    ctx.beginPath();
    ctx.ellipse(centerX - 12, centerY - 5, 8, 15, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 12, centerY - 5, 8, 15, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  canShoot(): boolean {
    return this.shootCooldown <= 0;
  }

  shoot(): void {
    if (this.canShoot()) {
      this.shootCooldown = this.shootDelay;
    }
  }
}

// 弾丸クラス
export class Bullet extends GameObject {
  constructor(x: number, y: number, velocityY: number = -400) {
    super(x, y, 4, 8);
    this.velocity.y = velocityY;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    
    // 画面外に出たら削除
    if (this.position.y < -this.size.y || this.position.y > 600) {
      this.destroy();
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}

// 敵クラス
export class Enemy extends GameObject {
  private shootCooldown: number = 0;
  private readonly shootDelay: number = 1000 + Math.random() * 2000;

  constructor(x: number, y: number) {
    super(x, y, 30, 30);
    this.velocity.y = 50 + Math.random() * 50; // 下向きに移動
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    
    // 画面外に出たら削除
    if (this.position.y > 600) {
      this.destroy();
    }
    
    // 射撃クールダウン更新
    this.shootCooldown -= deltaTime;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const centerX = this.position.x + this.size.x / 2;
    const centerY = this.position.y + this.size.y / 2;
    
    // 敵の描画（簡単な三角形）
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 15);
    ctx.lineTo(centerX - 15, centerY - 15);
    ctx.lineTo(centerX + 15, centerY - 15);
    ctx.closePath();
    ctx.fill();
    
    // 目
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.ellipse(centerX - 5, centerY - 5, 2, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(centerX + 5, centerY - 5, 2, 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  canShoot(): boolean {
    return this.shootCooldown <= 0;
  }

  shoot(): void {
    if (this.canShoot()) {
      this.shootCooldown = this.shootDelay;
    }
  }
}
