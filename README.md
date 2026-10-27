# Web Application Viewer Boilerplate

Next.js 15+ App RouterをベースとしたモダンなWebサービス向けボイラープレートです。**Dembrandt**を活用したプロジェクト固有の独自デザインシステム、SCSS、Redux Toolkit、そしてAIエージェント向けの行動規範・ナレッジ体系を標準搭載しています。

---

## 🚀 新規サービス立ち上げ時の設定（Quick Setup）

本リポジトリを複製して新しいサービスを立ち上げる際は、**以下の2箇所のみを変更**するだけで、プロジェクト全体（UI、メタデータ、ブランディング）が即座に連動します。

### 1. `package.json`
```json
{
  "name": "your-new-service-name"
}
```

### 2. `.env.development`（および `.env.production`）
```env
NEXT_PUBLIC_APP_NAME="サービス名"
NEXT_PUBLIC_COPYRIGHT="会社名"
NEXT_DEFAULT_METADATA_TITLE="サービス名"
NEXT_DEFAULT_METADATA_DESCRIPTION="サービス紹介文"
```

---

## 🛠️ 技術スタック（Tech Stack）

- **フレームワーク**: Next.js 15+ (App Router)
- **ライブラリ**: React 19, TypeScript 5
- **UI & スタイリング**: プロジェクト独自デザインシステム (Dembrandtトークン基盤), SCSS (`sass`)
- **状態管理**: Redux Toolkit, Redux Persist
- **HTTPクライアント**: Axios（中央集権型シングルトンインスタンス）
- **ユーティリティ**: Dayjs（日本標準時 `Asia/Tokyo`、ロケール `ja` 設定済み）、Notistack（スナックバー通知）

---

## 🎨 デザインシステム運用（Dembrandt Workflow）

本プロジェクトはサードパーティ製の巨大UIライブラリに依存せず、**Dembrandt**（`dembrandt <url> --design-md` / `--dtcg`）の出力結果をもとに各プロジェクト独自のデザインシステムを構築・運用します。

- [DESIGN.md](DESIGN.md): Dembrandtから抽出されたカラー、タイポグラフィ、スペーシング、角丸、シャドウのトークン仕様書
- `src/styles/base/_variables.scss`: トークンをCSSカスタムプロパティとして定義
- `src/components/ui/`: 純粋なReact + SCSSで実装された再利用可能なデザインシステムコンポーネント群

---

## 🧭 アーキテクチャおよびエージェント規約

- [DESIGN.md](DESIGN.md): プロジェクト固有のデザインシステム設計図（Dembrandt連携）
- [ARCHITECTURE.md](ARCHITECTURE.md): 変更種別ごとの着手パス（Starting Paths）とレイヤー責務マップ
- [TECH.md](TECH.md): 10大禁止ルール（Negative Constraints）およびコード規約
- [AGENTS.md](AGENTS.md): AIエージェントの作業プロトコルおよび単一真実源（SSOT）規約
- [.agents/learnings/](.agents/learnings/): 過去のトラブルと解決策を蓄積するナレッジベース
- [.agents/skills/](.agents/skills/): ページおよびAPI追加の標準スキルガイド

---

## 💻 実行および検証コマンド（Commands）

```bash
# 依存関係のインストール
yarn install

# 開発サーバーの起動 (http://localhost:3000)
yarn dev

# リント検証
yarn lint

# プロダクションビルド検証
yarn build
```
