// ベクトル計算用のユーティリティクラス
export class Vector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const mag = this.magnitude();
    if (mag === 0) return new Vector2(0, 0);
    return new Vector2(this.x / mag, this.y / mag);
  }
}

// 矩形の当たり判定用
export class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  intersects(other: Rectangle): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  contains(point: Vector2): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }
}

// ランダムな値を生成するユーティリティ
export class Random {
  static range(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// FPS計算用
export class FPSCounter {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;

  update(currentTime: number): number {
    this.frameCount++;
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
    
    return this.fps;
  }
}
