# ARCHITECTURE.md

本文書は、本プロジェクトのディレクトリ構造、レイヤー境界、および**変更種別ごとの着手パス（Starting Paths）**を定義するアーキテクチャ設計図です。
新しいサービスを構築したり機能を拡張する際、すべてのAIエージェントはこの設計図に基づいて適切な変更ポイントを特定しなければなりません。

---

## 1. 変更種別ごとの着手パス（Starting Paths by Change Type）

AIエージェントは、作業内容に応じて以下の起点ファイルを確認して実装を開始してください。

| 変更種別 | 起点ファイル / ディレクトリ | 作業フロー |
| :--- | :--- | :--- |
| **新規ページ（画面）の追加** | `src/app/<route>/page.tsx` | 1. `page.tsx`（SSR・メタデータ）<br>2. `*Client.tsx`（CSRインタラクション）<br>3. `src/styles/pages/<route>.scss` |
| **新規バックエンドAPIの連携** | `src/api/module/ApiRoutes.ts` | 1. `ApiRoutes.ts`にエンドポイント定数を登録<br>2. `src/types/global.d.ts`にDTO型を定義<br>3. `src/api/service/*Service.ts`にサービスクラス・関数を作成 |
| **グローバル状態の追加（Auth, Notification等）** | `src/store/slice/` | 1. Sliceファイルを作成・更新<br>2. `src/store/index.ts`の`rootReducer`および`whitelist`に登録 |
| **共通UIコンポーネントの追加・変更** | `src/components/ui/` | 1. `src/components/ui/<Component>/` に自己完結型コンポーネントを配置<br>2. 同伴スタイルシート（`Component.scss`）を作成 |
| **カラー・余白・フォント等のデザイン変更** | `DESIGN.md` および `src/styles/base/_variables.scss` | 1. Dembrandtからトークンを抽出または更新<br>2. `DESIGN.md` および `_variables.scss` のCSS変数を更新<br>3. 必要に応じて`_mixins.scss`を更新 |
| **サービス名・メタデータ初期値・設定値** | `src/config.ts` および `.env.development` | 1. `.env.development`に環境変数を追加<br>2. `src/config.ts`の設定オブジェクトにマッピング |

---

## 2. レイヤーアーキテクチャと責務の境界

```
[Browser / User]
       │
       ▼
[src/app/ (Next.js App Router)]
   ├─ page.tsx (Server Component: SEO、メタデータ、初期SSRデータフェッチ)
   └─ *Client.tsx (Client Component: ブラウザイベント、ローカル状態)
       │
       ├─ [src/components/ui/] (Dembrandtトークンに基づく独自デザインシステムUI)
       │      └─ <Component>/ (Component.tsx + Component.scss)
       ├─ [src/components/layout/] (Header, Footer等の共通シェル)
       │
       ├─ [src/store/] (Redux Toolkit: auth/notification等の永続グローバル状態)
       │
       └─ [src/api/] (中央集権型APIレイヤー)
              ├─ index.ts (Axiosシングルトン: インターセプター、認証ヘッダー付与)
              ├─ module/ApiRoutes.ts (エンドポイント定数レジストリ)
              └─ service/*Service.ts (ドメイン別API呼び出し関数)
```

### 2.1. SSR / CSRの境界（デュアルファイルパターン）
- インデックス対象となる公開ページは、必ずServer ComponentとClient Componentに分離します。
- Server Component（`page.tsx`）でメタデータ（`generateMetadata`）および初期データ取得を行い、Client Componentにpropsとして渡します。

### 2.2. APIレイヤーの原則
- UIコンポーネント内で直接`axios`や`fetch`を呼び出してはなりません。
- 必ず`src/api/service/*Service.ts`に定義されたビジネス関数を経由し、すべてのリクエストは`src/api/index.ts`のシングルトンインスタンスを通過します。

### 2.3. スタイリングおよび独自デザインシステムレイヤーの原則（Dembrandt連携）
- **外部UIライブラリの排除**:
  - サードパーティUIコンポーネントライブラリは使用せず、すべて `src/components/ui/` にプロジェクト固有の独自デザインシステムとして構築します。
- **Dembrandtによるトークン管理（単一真実源）**:
  - 各プロジェクトのデザインシステムは、**Dembrandt**（`dembrandt <url> --design-md` / `--dtcg`）のコンソール・Markdown出力を `DESIGN.md` に集約して管理します。
  - `DESIGN.md` で規定されたトークン（カラー、タイポグラフィ、スペーシング、角丸、シャドウ）を `src/styles/base/_variables.scss` のCSS変数へバインドし、ライト/ダーク双方のテーマに対応します。
- CSS-in-JS、Tailwind CSS、CSS Modules（`.module.scss`）は使用しません。
- **ページスタイル構造化（`src/styles/pages/<route>.scss`）**:
  - 新規ページ（画面）を追加する際は、必ず `src/styles/pages/<route>.scss` に専用スタイルシートを作成し、ルート名と1対1で構造化管理します。
  - 最上位ページコンテナクラス（例: `.home-container`）で全体を完全にルートスコープします。
- すべてのスタイルは`src/styles/base/_variables.scss`のCSS変数を参照してください。

### 2.4. SEO / AEOおよびRoute-First設計原則（ダイアログ乱用禁止）
- **検索エンジン（SEO）とAI回答エンジン（AEO）への最適化**:
  - Webサービスとしての露出を高めるため、セマンティックなHTML構造（`h1`〜`h3`, `main`, `article`, `section`）と明瞭な日本語コンテンツで構築します。
- **Route-First原則（ダイアログ乱用の厳禁）**:
  - モーダルダイアログはクローラーやAI検索エンジンにインデックスされず、URLの直接共有もできません。
  - お知らせ、詳細情報、主要な機能フローはダイアログで済ませず、固有URLを持つ独立したページ（ルート）として設計します。
  - ダイアログの使用は、認証（ログイン/登録）や一時的な確認（Confirm）などの短期インタラクションに限定します。