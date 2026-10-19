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
| **共通UIコンポーネントの追加・変更** | `src/components/` | 1. `layout/`や`mui/`などの適切なディレクトリに配置<br>2. 同伴スタイルシート（`Component.scss`）を作成 |
| **カラー・余白・フォント等のデザイン変更** | `src/styles/base/_variables.scss` | 1. `_variables.scss`のCSS変数を更新<br>2. 必要に応じて`_mixins.scss`を更新 |
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
       ├─ [src/components/] (MUIラッパーおよび共通UI)
       │      └─ *.scss (コンポーネント単位のスタイルシート)
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

### 2.3. スタイリングレイヤーの原則
- CSS-in-JS、Tailwind CSS、CSS Modules（`.module.scss`）は使用しません。
- BEM記法に準拠したコンポーネント同伴SCSS（`Component.scss`）またはページSCSS（`src/styles/pages/*.scss`）を作成します。
- すべてのスタイルは`src/styles/base/_variables.scss`のCSS変数を参照してください。
