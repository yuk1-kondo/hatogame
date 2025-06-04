# GitHub リポジトリ作成手順

## 手順 1: GitHubでリポジトリを作成

1. [GitHub.com](https://github.com) にアクセスしてログイン
2. 右上の「+」ボタンをクリック → 「New repository」を選択
3. リポジトリ設定:
   - **Repository name**: `hatogame` または `pigeon-shooting-game`
   - **Description**: `🕊️ 鳩シューティングゲーム - TypeScript + HTML5 Canvas製の2Dシューティングゲーム`
   - **Public** or **Private**: お好みで選択
   - **Initialize this repository with**: チェックを外す（既にローカルでファイルを作成済みのため）
4. 「Create repository」をクリック

## 手順 2: ローカルリポジトリをGitHubにプッシュ

リポジトリ作成後、GitHubに表示される手順に従って以下のコマンドを実行：

```bash
# リモートリポジトリを追加（YOUR_USERNAMEを実際のユーザー名に置き換え）
git remote add origin https://github.com/YOUR_USERNAME/hatogame.git

# mainブランチにプッシュ
git branch -M main
git push -u origin main
```

## 手順 3: リポジトリの設定（オプション）

### GitHub Pages有効化（Firebase代替）
1. リポジトリページの「Settings」タブ
2. 左サイドバーの「Pages」
3. Source: 「GitHub Actions」を選択
4. 「Configure」→「Static HTML」ワークフローを選択

### リポジトリの説明追加
1. リポジトリページの右上「About」の歯車アイコン
2. Topics追加: `typescript`, `game`, `html5-canvas`, `shooting-game`, `pigeon`, `vite`
3. Website: デプロイURL（Firebase HostingまたはGitHub Pages）

## 現在の状態

✅ ローカルGitリポジトリ初期化完了
✅ 初回コミット作成完了
⏳ GitHubリモートリポジトリ作成待ち

次に上記の手順1〜2を実行してください！
