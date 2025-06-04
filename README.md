# Hatogame - 鳩シューティングゲーム 🕊️

[![Build and Deploy](https://github.com/yuk1-kondo/hatogame/actions/workflows/deploy.yml/badge.svg)](https://github.com/yuk1-kondo/hatogame/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/API/Canvas_API)

TypeScriptとHTML5 Canvasで作られた2Dシューティングゲームです。

🎮 **[ゲームをプレイ](https://yuk1-kondo.github.io/hatogame/)** | 📖 **[開発ガイド](DEVELOPMENT.md)**

## ゲーム概要

プレイヤーは鳩を操作して、降ってくる敵を撃ち落とすシューティングゲームです。

### 操作方法
- **移動**: 矢印キー または WASD
- **射撃**: スペースキー
- **リスタート**: ゲームオーバー時に表示されるボタン

### ゲーム機能
- プレイヤー（鳩）の移動と射撃
- 敵キャラクターの自動生成
- 弾丸システム（プレイヤー・敵両方）
- 当たり判定とスコアシステム
- ゲームオーバー・リスタート機能

## 技術スタック

- **TypeScript**: 型安全性とコード品質の向上
- **HTML5 Canvas**: 2Dグラフィックス描画
- **Vite**: 高速な開発サーバーとビルドツール
- **CSS**: スタイリング
- **Firebase Hosting**: デプロイメント

## 開発

### 前提条件
- Node.js (v18以上)
- npm または yarn

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

### プロジェクト構造
```
src/
├── game/           # ゲームロジック
│   ├── entities.ts # ゲームオブジェクト（プレイヤー、敵、弾丸）
│   ├── game.ts     # メインゲームループ
│   └── input.ts    # 入力処理
├── utils/          # ユーティリティ
│   └── math.ts     # 数学関数・ヘルパークラス
├── assets/         # ゲームアセット
├── main.ts         # エントリーポイント
└── style.css       # スタイルシート
```

## デプロイ

### Firebase Hostingへのデプロイ

1. Firebase CLIのインストール（グローバルインストール済み）
2. Firebaseプロジェクトの初期化:
   ```bash
   firebase init hosting
   ```
3. ビルドとデプロイ:
   ```bash
   npm run build
   firebase deploy
   ```

## 今後の拡張案

- [ ] 効果音・BGM
- [ ] アニメーション効果
- [ ] パワーアップアイテム
- [ ] 複数レベル・ステージ
- [ ] ローカルスコアランキング
- [ ] モバイル対応（タッチ操作）
- [ ] ゲーム設定メニュー

## ライセンス

MIT License
