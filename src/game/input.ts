// キー入力管理クラス
export class InputManager {
  private keys: Set<string> = new Set();
  private keysPressed: Set<string> = new Set();
  private keysReleased: Set<string> = new Set();

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('keydown', (e) => {
      if (!this.keys.has(e.code)) {
        this.keysPressed.add(e.code);
      }
      this.keys.add(e.code);
      
      // ゲーム用キーのデフォルト動作を防ぐ
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
      this.keysReleased.add(e.code);
    });
  }

  isKeyDown(key: string): boolean {
    return this.keys.has(key);
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key);
  }

  isKeyReleased(key: string): boolean {
    return this.keysReleased.has(key);
  }

  update(): void {
    this.keysPressed.clear();
    this.keysReleased.clear();
  }

  // よく使うキーのヘルパーメソッド
  get moveLeft(): boolean { return this.isKeyDown('ArrowLeft') || this.isKeyDown('KeyA'); }
  get moveRight(): boolean { return this.isKeyDown('ArrowRight') || this.isKeyDown('KeyD'); }
  get moveUp(): boolean { return this.isKeyDown('ArrowUp') || this.isKeyDown('KeyW'); }
  get moveDown(): boolean { return this.isKeyDown('ArrowDown') || this.isKeyDown('KeyS'); }
  get shoot(): boolean { return this.isKeyPressed('Space'); }
}
