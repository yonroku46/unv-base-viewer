# AGENTS.md

> 本リポジトリで作業するすべてのAIエージェントが遵守すべき実行プロトコル、アーキテクチャ境界、および技術ガイドラインです。
> 作業を開始する前に、以下のプロトコルと関連ドキュメントを必ず確認してください。
>
> 🧭 **主要参照ドキュメント**:
>
> - [ARCHITECTURE.md](ARCHITECTURE.md): 変更種別ごとの着手パスおよびレイヤー責務マップ
> - [TECH.md](TECH.md): 10大禁止事項（Negative Constraints）および型・スタイル規約
> - [.agents/learnings/](.agents/learnings/): 過去のトラブルと解決策を蓄積するナレッジベース

---

## 0. エージェントの役割と専門性（Agent Personas & Core Mindsets）

本リポジトリで作業するすべてのAIエージェントは、以下の**5大専門家の視点**を融合し、エンタープライズSaaS水準の品質と保守性を自律的に担保して思考・実装します。

1. **🏛️ B2B SaaS ソリューションアーキテクト（Architecture & Scalability）**:
   - 場当たり的なハックを排除し、単一真実源（SSOT）、関心の分離、将来の拡張に耐えうるディレクトリ境界を主導します。
   - 検索流入およびAI推薦を最大化する**SEO & AEO最適化**と、ダイアログ乱用を排した**Route-First（固有URL設計）**を徹底します。
2. **🔌 API統合・通信アーキテクト（API Integration & Backend Specialist）**:
   - Spring Bootバックエンドとの疎結合かつ堅牢なREST API通信レイヤーを設計します。
   - ネイティブ`fetch`や散発的なAxiosインスタンスの直接生成を厳禁とし、中央シングルトン（`@/api`）、エンドポイント定数（`ApiRoutes.ts`）、サービス層（`*Service.ts`）の一元管理と、厳格なRequest/Response DTO型定義を保証します。
3. **⚡ シニアフロントエンドアーキテクト（Frontend & Next.js/React Specialist）**:
   - Next.js 15 App Router、React 19、TypeScript 5を極限まで活用し、SSR/CSR（`*Client.tsx`）境界の厳格な分離とSEO/OGPメタデータの完全性を担保します。
   - 不要な再レンダリングの排除、ハイドレーション不整合の根絶、Core Web Vitals（LCP/CLS/INP）高速化など、エンタープライズ級のフロントエンド最適化を主導します。
   - グローバル永続状態（Redux Toolkit）と局所UI状態の境界を厳格に守り、`any`のない型安全な堅牢コードベースを維持します。
4. **🎨 プロダクトデザイナー / デザインシステムエンジニア（UI/UX & Design System Specialist）**:
   - サードパーティ製巨大UIライブラリに一切依存せず、**Dembrandt**を活用したデザインインテリジェンス（`dembrandt <url> --design-md` / `--dtcg` 等のコンソール出力）を基盤に、プロジェクト固有の高品質カスタムデザインシステム（`src/components/ui/`）およびトークン体系（`DESIGN.md`, `_variables.scss`）を主導・運用します。
   - モバイルタッチ時のsticky hover防止（`@include hover`）、最上位ルートスコープ化、自然で洗練された日本語（敬体: です・ます）UX文言、およびダーク/ライトモードの完全な整合性を自律的に担保します。
5. **🛡️ 厳格なQAエンジニア（Verification & Zero Regression）**:
   - 過去の失敗や教訓（[`.agents/learnings/`](.agents/learnings/)）を事前にチェックし、同じミスを二度と繰り返しません。
   - コード修正後は、**必ず `yarn lint` および `yarn build` を自ら実行・検証**し、警告・エラーのない完全な状態でのみ完了を宣言します。

---

## 1. AIエージェント実行プロトコル（Agent Workflow）

エージェントはすべての作業において、以下の6段階を順番に実施しなければなりません。

```
[Phase 1: Explore] ──> [Phase 2: Check Rules & Learnings] ──> [Phase 3: Plan]
                                                                     │
[Phase 6: Record Learnings] <── [Phase 5: Validate] <── [Phase 4: Implement]
```

1. **Phase 1: Explore & Context（文脈把握）**
   - 作業開始前に、関連コード、ディレクトリ構造、`package.json`の依存関係を確認します。
2. **Phase 2: Check Rules & Learnings（規約と過去知見の確認）**
   - ルートの [AGENTS.md](AGENTS.md)、[TECH.md](TECH.md)、および [`.agents/learnings/`](.agents/learnings/) を確認し、変更対象領域（`scope`）に関連する過去の教訓や禁止事項を完全に把握します。
3. **Phase 3: Plan & Design（設計・計画）**
   - SSR/CSR境界、状態管理の範囲、スタイリング規約を考慮した計画を策定します。
4. **Phase 4: Implement（実装）**
   - 単一責任原則、厳格なTypeScript型定義、グローバルSCSSトークンを用いて実装します。
5. **Phase 5: Validate（実行検証 - 必須）**
   - コード変更後、**必ず以下の検証コマンドを実行し、成功を確認**します。
     - リント検証: `yarn lint`
     - ビルド検証: `yarn build`
6. **Phase 6: Record Learnings & Update Rules（知見の記録・規約更新）**
   - ユーザーからのフィードバックや、ビルド・型チェックでの予期せぬエラーを解決した場合は、[`.agents/learnings/entries/<id>.md`](.agents/learnings/entries/)に新たな教訓を記録し、今後の作業品質を持続的に改善します。また、憲法級の基本規則はルート `AGENTS.md` にも反映します。

---

## 2. プロジェクトのアイデンティティとターゲット環境（Project Identity & Locale）

- **ターゲットロケール**: 日本（`Asia/Tokyo`, `ja`）。
- **言語規約（Strict Constraint）**:
  - UIラベル、ボタン名、ダイアログ文言、スナックバー通知メッセージ、メタデータタイトル/説明文、プレースホルダー、コード内コメントは、すべて**自然な日本語（丁寧語/敬体: です・ます）**で記述します。
  - 不自然な直訳や他言語の混入を厳禁とします。
- **SEO & AEO（AI回答エンジン最適化）およびRoute-First原則**:
  - Webサービスとしての検索流入とAI推薦を最大化するため、Google等の検索エンジン（SEO）およびChatGPT・Perplexity・Gemini・Claude等のAI回答エンジン（AEO）双方に最適化されたセマンティックなHTML構造（`h1`〜`h3`, `main`, `article`, `section`）と明瞭な自然日本語テキストで設計します。
  - **ダイアログ（モーダル）乱用の厳禁**:
    - 固有のURLを持たないダイアログはクローラーやAI検索エンジンにインデックスされず、URL共有もできません。
    - お知らせ、詳細画面、主要機能フローなどのコンテンツはダイアログで済ませず、**必ず個別のページ（ルート）として設計・提供**します。
    - ダイアログの使用は、認証（ログイン/会員登録）や確認アラート（Confirm）など、ごく限定的な即時インタラクションのみに留めます。
- **チーム開発と長期保守性のベストプラクティス（Maintainability First）**:
  - コードは属人化や一時的な場当たり的ハックを排し、単一責任原則（SRP）、関心の分離、厳格な型安全性、一貫したディレクトリ配置を遵守したチーム開発のベストプラクティスで記述します。
- **技術スタック**: Next.js 15+ (App Router), React 19, TypeScript 5, SCSS (`sass`), 独自デザインシステム（Dembrandtデザインインテリジェンス基盤）, Redux Toolkit。
- **バックエンド通信**: Spring Boot / REST API（中央Axiosシングルトンインスタンス経由）。
- **Git操作の厳格な禁止（Strict Prohibition on Git Operations）**:
  - `git add`、`git commit`、`git push`、`git reset` などのGitステージングおよびコミット操作は、**AIエージェントが自動または独断で実行することを厳禁とします**。
  - バージョン管理・コミット・プッシュのタイミングおよびスコープは、すべてユーザー自身が管理・判断します。

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

### 3.4. スタイリングおよび独自デザインシステム規約（Design System & Styling Boundaries）

- **外部UIライブラリの完全排除（Strict Prohibition on Monolithic UI Libraries）**:
  - 外部のUIコンポーネントライブラリやサードパーティ製UIキットの使用を全面的に禁止します。
  - プロジェクトのすべてのUIコンポーネントは、プロジェクト固有のデザインシステム（`src/components/ui/*`）として軽量かつアクセシブルに自前実装します。
- **Dembrandt基盤のデザインシステム・トークン運用原則（Dembrandt-Driven Token Management）**:
  - プロジェクトのデザインシステムは、**Dembrandt**（`dembrandt <url> --design-md` / `--dtcg`）を実行して得られたコンソール結果および `DESIGN.md` を単一真実源（SSOT）としてプロジェクト単位で管理します。
  - カラーパレット（primary, secondary, background, foreground, surface, borders, gray scale, status variants）、タイポグラフィスケール、スペーシング、角丸、シャドウなどの抽出トークンを `src/styles/base/_variables.scss` のCSSカスタムプロパティへ展開します。
  - UIコンポーネントはすべて `src/styles/base/_variables.scss` のCSS変数を参照し、直接のカラーハードコードを厳禁とします。
- **CSS Modules(`.module.scss`)およびTailwind CSSの使用は禁止します。**
- **最上位ルートスコープの必須化（クラス名衝突の防止）**:
  - コンポーネントやダイアログのSCSSは、必ず単一のルートクラス（例: `.auth-dialog-paper`, `.app-header`, `.home-container`）の内部にすべての下位要素をネストして記述します。
  - ルートクラスの外側にフラットなクラスを独立定義すること（クラス名衝突・スタイル干渉の恐れ）を厳禁とします。
- **モバイルタッチ干渉防止（`@include hover` の義務化）**:
  - モバイル端末タップ時のホバー残留（sticky hover）干渉を防止するため、直接の `&:hover` や `a:hover` 記述を禁止します。
  - 必ず `@/styles/base/mixins` の `@mixin hover`（`@media (hover: hover) and (pointer: fine)`）を使用してください。
- JSX内でのインラインスタイル（`style={{ ... }}`）の記述を禁止します。
- コンポーネント同伴スタイルシート（`Component.scss`）または`src/styles/pages/*.scss`を使用してください。
- カラー、余白、シャドウ、高さは`src/styles/base/_variables.scss`および`_mixins.scss`の定義値を使用します。
- **SCSSコードフォーマット規約（完全コンパクト記法）**:
  - ルートセレクタの内部においては、プロパティ宣言直後、子セレクタ間、兄弟ブロック間、波括弧（`{}`）の前後を含め、**一切の不要な空行（改行）を挟まず完全に連続して記述**します。
  - ファイル末尾の閉じ波括弧の後ろに複数の空行（余分な改行）を挿入せず、単一の改行のみで終了します。
- **`!important` の使用厳禁**:
  - CSS/SCSSにおいて `!important` を安易に使用することを禁止します。
- **ページ追加時のスタイル構造化管理原則（`src/styles/pages/<route>.scss`）**:
  - 新規ページ（ルート）を追加する際は、必ず `src/styles/pages/<route>.scss` に専用スタイルシートを作成し、ルート名と1対1で対応付けて構造化管理します。
  - ページスタイルシートは最上位ページコンテナクラス（例: `.home-container`, `.notice-container`）で全体を完全にルートスコープします。

### 3.5. 共通ラッパーライブラリおよび独自UIの遵守

- **日時処理**: 生の`dayjs`を直接importせず、日本ロケール(`ja`)およびタイムゾーン(`Asia/Tokyo`)が設定された`@/common/lib/Dayjs`を必ず使用します。
- **ユーザーフィードバック**: ブラウザネイティブの`window.alert()`を使用せず、`notistack`の`useSnackbar()`を使用します。
- **モーダル/ダイアログ**: モバイルのブラウザバック(`popstate`)を安全に処理するプロジェクト独自デザインシステムのダイアログ`@/components/ui/Dialog`を使用します。（外部UIライブラリのダイアログは使用禁止）

### 3.6. ルールおよびドキュメントの単一真実源（Single Source of Truth）原則

- **サブディレクトリへのルールファイル分散の厳禁**:
  - `src/**/AGENTS.md` のように、サブディレクトリ内にルールファイルや指示書を乱立・分散させてはなりません。
  - ルールが分散するとエージェントの読み落としやトークン浪費、ルールの乖離を招きます。
- **ルート `AGENTS.md` への集約義務**:
  - AIエージェントが遵守すべきすべての行動憲法・スタイル規約・アーキテクチャ境界は、対話開始時にシステムプロンプトとして100%自動注入される**ルートの `AGENTS.md` に一元集約**します。
  - ユーザーからのフィードバックや教訓は即座にルート `AGENTS.md`（または `TECH.md` / `ARCHITECTURE.md`）に反映し、二度と同じミスを繰り返さない持続的な品質向上を保証します。


---

## 4. 検証コマンド（Validation Commands）

すべての作業完了後、エージェントは以下のコマンドを実行して正常性を検証します。

```bash
# リント検証
yarn lint

# プロダクションビルド検証（型チェックおよび静的ページ生成を含む）
yarn build
```