# GitHub リポジトリ作成手順

## 🎯 現在の状況

✅ ローカルGitリポジトリ初期化完了  
✅ 4つのコミット作成完了  
✅ GitHub Actions CI/CDワークフロー準備完了  
✅ MIT ライセンス追加完了  
⏳ GitHubリモートリポジトリ作成待ち  

## 📋 手順 1: GitHubでリポジトリを作成

1. [GitHub.com](https://github.com) にアクセスしてログイン
2. 右上の「+」ボタンをクリック → 「New repository」を選択
3. リポジトリ設定:
   - **Repository name**: `hatogame` 
   - **Description**: `🕊️ 鳩シューティングゲーム - TypeScript + HTML5 Canvas製の2Dシューティングゲーム`
   - **Public** ✅ （推奨：GitHub Pages利用のため）
   - **Initialize this repository with**: 全てチェックを外す ❌
4. 「Create repository」をクリック

## 🚀 手順 2: ローカルリポジトリをGitHubにプッシュ

リポジトリ作成後、以下のコマンドを実行：

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/yuk1-kondo/hatogame.git

# mainブランチにプッシュ
git push -u origin main
```

## ⚙️ 手順 3: GitHub Pages を有効化

1. リポジトリページの「Settings」タブをクリック
2. 左サイドバーの「Pages」をクリック
3. Source で「GitHub Actions」を選択
4. 自動的にWorkflowが実行され、数分後にゲームがデプロイされます

デプロイURL: `https://YOUR_USERNAME.github.io/hatogame/`

## 🏷️ 手順 4: リポジトリの装飾（オプション）

### Topics追加
1. リポジトリページの右上「About」の歯車アイコン
2. Topics追加: 
   ```
   typescript, game, html5-canvas, shooting-game, pigeon, vite, javascript, 2d-game
   ```
3. Website: デプロイURL

### README更新
GitHubリポジトリ作成後、以下の部分を実際の値に更新：
- `YOUR_USERNAME` → 実際のGitHubユーザー名

## 📊 作成されるもの

- 🌐 **ライブデモ**: GitHub Pagesでホスト
- 🔄 **自動デプロイ**: mainブランチにプッシュ時
- ✅ **CI/CD**: ビルドテスト自動実行
- 📜 **ドキュメント**: README、開発ガイド、ライセンス

## 次のステップ

1. リポジトリ作成 → プッシュ
2. GitHub Pages確認
3. ゲームのテストプレイ
4. 友達にシェア！🎮
