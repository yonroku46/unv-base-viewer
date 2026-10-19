# AGENTS.md

> 本リポジトリで作業するすべてのAIエージェントが遵守すべき実行プロトコル、アーキテクチャ境界、および技術ガイドラインです。
> 作業を開始する前に、以下のプロトコルと関連ドキュメントを必ず確認してください。
>
> 🧭 **主要参照ドキュメント**:
> - [ARCHITECTURE.md](ARCHITECTURE.md): 変更種別ごとの着手パスおよびレイヤー責務マップ
> - [TECH.md](TECH.md): 10大禁止事項（Negative Constraints）および型・スタイル規約
> - [.agents/learnings/](.agents/learnings/): エージェントナレッジベースおよび過去の知見・教訓

---

## 1. AIエージェント実行プロトコル（Agent Workflow）

エージェントはすべての作業において、以下の6段階を順番に実施しなければなりません。

```
[Phase 1: Explore] ──> [Phase 2: Check Learnings] ──> [Phase 3: Plan]
                                                           │
[Phase 6: Record Learnings] <── [Phase 5: Validate] <── [Phase 4: Implement]
```

1. **Phase 1: Explore & Context（文脈把握）**
   - 作業開始前に、関連コード、ディレクトリ構造、`package.json`の依存関係を確認します。
2. **Phase 2: Check Learnings（知見の確認）**
   - [`.agents/learnings/`](.agents/learnings/)ディレクトリを確認し、変更対象の領域（`scope`）に関連する過去の教訓や注意事項を読み込みます。
3. **Phase 3: Plan & Design（設計・計画）**
   - SSR/CSR境界、状態管理の範囲、スタイリング規約を考慮した計画を策定します。
4. **Phase 4: Implement（実装）**
   - 単一責任原則、厳格なTypeScript型定義、グローバルSCSSトークンを用いて実装します。
5. **Phase 5: Validate（実行検証 - 必須）**
   - コード変更後、**必ず以下の検証コマンドを実行し、成功を確認**します。
     - リント検証: `yarn lint`
     - ビルド検証: `yarn build`
6. **Phase 6: Record Learnings（知見の記録）**
   - ユーザーからのフィードバックや、ビルド・型チェックでの予期せぬエラーを解決した場合は、[`.agents/learnings/entries/<id>.md`](.agents/learnings/entries/)に新たな教訓を記録し、今後の作業品質を持続的に改善します。

---

## 2. プロジェクトのアイデンティティとターゲット環境（Project Identity & Locale）

- **ターゲットロケール**: 日本（`Asia/Tokyo`, `ja`）。
- **言語規約（Strict Constraint）**:
  - UIラベル、ボタン名、ダイアログ文言、スナックバー通知メッセージ、メタデータタイトル/説明文、プレースホルダー、コード内コメントは、すべて**自然な日本語（丁寧語/敬体: です・ます）**で記述します。
  - 不自然な直訳や他言語の混入を厳禁とします。
- **技術スタック**: Next.js 15+ (App Router), React 19, TypeScript 5, SCSS (`sass`), MUI v6, Redux Toolkit。
- **バックエンド通信**: Spring Boot / REST API（中央Axiosシングルトンインスタンス経由）。

---

## 3. コアアーキテクチャと境界規約（Core Architecture Boundaries）

### 3.1. SSR / CSR分離（`*Client.tsx` デュアルファイルパターン）
- インデックス対象の公開ページは、必ず**デュアルファイルパターン**を適用します。
  - `page.tsx`: Server Component。`generateMetadata()`、初期SSRデータフェッチ、SEOを担当。
  - `*Client.tsx`: Client Component (`"use client"`)。ブラウザ固有のインタラクションおよびUIステートを担当。
- 管理画面やダッシュボードなどの完全認証前提のインタラクティブページは、`"use client"`単独の記述を許可します。

### 3.2. 状態管理の境界（State Boundary）
- **Redux Toolkit (`@/store`)**: `auth`、`notification`など、グローバルに維持されlocalStorageへ永続化（persist）が必要な状態に限定して使用します。
- 任意のフィーチャースライスを無秩序にReduxに追加してはなりません。
- 不要な外部サーバー状態管理ライブラリ（React Query, SWR, Zustandなど）を重複導入しないでください。

### 3.3. API通信規約（API Layer）
- ネイティブの`fetch()`やアドホックなAxiosインスタンスを直接生成してはなりません。
- すべてのAPIリクエストは、中央シングルトン`@/api` (`ApiInstance`)および`@/api/service/*Service.ts`を経由します。
- バックエンドのルート定数は`src/api/module/ApiRoutes.ts`に一元管理します。

### 3.4. スタイリングおよびデザインシステム規約
- **CSS Modules(`.module.scss`)およびTailwind CSSの使用は禁止します。**
- JSX内でのインラインスタイル（`style={{ ... }}`）およびMUI `sx={{ ... }}`の乱用を禁止します。
- コンポーネント同伴スタイルシート（`Component.scss`）または`src/styles/pages/*.scss`を使用してください。
- カラー、余白、シャドウ、高さは`src/styles/base/_variables.scss`および`_mixins.scss`の定義値を使用します。

### 3.5. 共通ラッパーライブラリの遵守
- **日時処理**: 生の`dayjs`を直接importせず、日本ロケール(`ja`)およびタイムゾーン(`Asia/Tokyo`)が設定された`@/common/lib/Dayjs`を必ず使用します。
- **ユーザーフィードバック**: ブラウザネイティブの`window.alert()`を使用せず、`notistack`の`useSnackbar()`を使用します。
- **モーダル/ダイアログ**: モバイルのブラウザバック(`popstate`)を安全に処理する`@/components/mui/MuiDialog`を使用します。

---

## 4. 検証コマンド（Validation Commands）

すべての作業完了後、エージェントは以下のコマンドを実行して正常性を検証します。

```bash
# リント検証
yarn lint

# プロダクションビルド検証（型チェックおよび静的ページ生成を含む）
yarn build
```
