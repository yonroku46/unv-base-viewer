# TECH.md

本文書は、本プロジェクトにおけるコード品質、型安全性、依存関係管理、および**AIエージェントが厳格に遵守すべき10大禁止事項（Negative Constraints）**を規定します。

---

## 1. 10大禁止事項（Negative Constraints - STRICT）

エージェントは以下の10項目に違反してはならず、違反したコードは完了とはみなされません。

1. **`any` 型および安易な型アサーションの禁止**:
   - `any`の使用を原則禁止し、具体的なインターフェースやユニオン型を定義します。`as unknown as Type`のような二重アサーションも禁止します。
2. **型専用インポートの分離 (`import type`)**:
   - ランタイムバンドルに含まれない型は、必ず `import type { ... } from '...'` として明示的にインポートします。
3. **生 `fetch` およびアドホックな `axios` インスタンス生成の禁止**:
   - コンポーネントやサービスからブラウザネイティブの `fetch()` や `axios.create()` を直接呼び出してはなりません。必ず `@/api` (`ApiInstance`) を使用してください。
4. **生 `dayjs` の直接インポート禁止**:
   - `import dayjs from 'dayjs'` を直接呼び出さず、日本標準時（`Asia/Tokyo`）および日本語ロケール（`ja`）が設定された `@/common/lib/Dayjs` を使用します。
5. **ブラウザ標準の `alert()` / `confirm()` の禁止**:
   - ユーザーへのフィードバックには、`notistack` の `useSnackbar()` または独自デザインシステムの `@/components/ui/Dialog` を使用します。
6. **インラインスタイルの禁止およびデザインシステムトークン参照の徹底**:
   - JSX内での `style={{ ... }}` の記述を禁止します。`DESIGN.md` および `_variables.scss` で定義されたトークン（`var(--primary-color)` 等）を参照するSCSSクラスを定義してください。
7. **外部パッケージの無断追加禁止**:
   - ユーザーの明示的な許可なしに、Zustand、SWR、React Query、Tailwind、Lodashなどのサードパーティ製ライブラリを勝手にインストールしてはなりません。
8. **不要な Redux Slice 追加の禁止**:
   - Redux Toolkitストア（`@/store`）は、`auth` や `notification` などlocalStorageへの永続化が必要な状態のみに限定します。画面固有のローカル状態は `useState` や React Context を使用します。
9. **UIの非日本語露出禁止**:
   - UIラベル、ボタン名、ダイアログ文言、エラーメッセージ、プレースホルダー、メタデータは、すべて自然な日本語で記述します。
10. **未検証での作業完了宣言の禁止**:
    - コード修正後、`yarn lint` および `yarn build` を実行してエラーが解消されたことを確認せずに作業完了とみなすことは禁止します。
11. **Git操作（commit / add / push）の自動実行の厳禁**:
    - `git add`、`git commit`、`git push`、`git reset` 等のGit操作をAIエージェントが自動または独断で実行することを厳禁とします。コミットやステージングの判断と実行はすべてユーザーが行います。
12. **`!important` の使用禁止およびサードパーティ製UIライブラリの完全排除**:
    - スタイルの詳細度を破壊する `!important` の使用を原則厳禁とします。
    - 外部UIライブラリの依存・使用を全面的に排除し、Dembrandtから抽出されたトークン（`DESIGN.md`）に基づく独自デザインシステムコンポーネント（`src/components/ui/*`）で構築します。
13. **ダイアログ（モーダル）乱用の厳禁（SEO/AEO・Route-First原則）**:
    - 固有のURLを持たないダイアログは検索エンジン（SEO）やAI回答エンジン（AEO）にインデックスされず、URL共有もできません。お知らせ、詳細画面、主要機能フローをダイアログで済ませることを禁止し、必ず個別ページ（ルート）として設計します。ダイアログは認証や簡易確認などの即時インタラクションに限定します。



---

## 2. コーディング規約およびスタイル

### 2.1. TypeScript型定義
- グローバルエンティティ・共通DTO: `src/types/global.d.ts` 内の `declare global` ブロックで定義（各ファイルでのimport不要）。
- モジュール専用ローカルDTO: 各ファイルの上部で `export interface` として定義。
- 固定の選択肢には、TypeScriptの `enum` ではなく文字列リテラルのユニオン型（`'USER' | 'ADMIN'`）を使用。

### 2.2. CSS / SCSS 命名規則 (BEM記法) およびフォーマット規約
```scss
// src/styles/pages/sample.scss
@use "../base/variables" as *;
@use "../base/mixins" as *;

.sample-container {
  max-width: 1200px;
  margin: 0 auto;
  .sample-card {
    background: var(--background);
    border: 1px solid var(--gray-alpha-100);
    &__title {
      font-size: 1.25rem;
      color: var(--foreground);
    }
    &--active {
      border-color: var(--primary-color);
    }
    .sample-btn {
      color: var(--foreground);
      @include hover {
        color: var(--primary-color);
        background-color: var(--gray-alpha-100);
      }
    }
  }
}
```

- **最上位ルートスコープの完全必須（クラス名衝突の防止）**:
  - CSS Modulesを使用しないため、各コンポーネントやダイアログのSCSSは**単一のルートクラス（例: `.auth-dialog-paper`, `.app-header`）**の内部にすべての子セレクタをネストして定義します。
  - ルートクラスの外側に `.dialog-header`, `.dialog-content` などのクラスをフラット（平面的）に定義することを厳禁とします。
- **モバイルタッチ干渉防止（`@include hover` の義務化）**:
  - スマートフォンやタブレット等のタッチ端末でのタップ時に発生するホバー残留（sticky hover）干渉を防止するため、直接の `&:hover` や `a:hover` の記述を禁止します。
  - 必ず `@/styles/base/mixins` の `@mixin hover`（`@media (hover: hover) and (pointer: fine)`）を使用してください。
- **ルートセレクタ内部の不要な空行完全禁止（完全コンパクト記法）**:
  - ルートセレクタの内部では、プロパティ宣言の直後、子セレクタ間、兄弟ブロック間、波括弧（`{}`）の前後を含め、**中間に空行（改行）を一切入れずに詰めて記述**します。
- **Dembrandt基盤のデザインシステム・トークン運用**:
  - デザイン定義はDembrandtのコンソール出力（`DESIGN.md`）を単一真実源（SSOT）とし、`src/styles/base/_variables.scss` のCSS変数を通じて全コンポーネントへ展開します。
  - 共通UIコンポーネントは `src/components/ui/<Component>/` 配下に自己完結型（同伴SCSS）で実装し、外部UIライブラリに一切依存しない軽量・堅牢な設計を維持します。
- **ファイル末尾の不要な空行禁止**:
  - ファイル末尾の閉じ波括弧（`}`）の後に余分な空行を残さず、単一の改行で終了します。
- **ページ追加時のスタイル構造化管理（`src/styles/pages/<route>.scss`）**:
  - 新規ページ（ルート）のスタイルシートは必ず `src/styles/pages/<route>.scss` に配置し、ルートと1対1で構造化管理します。最上位ページクラスで100%ルートスコープしてください。

### 2.3. エラーハンドリング
- API呼び出し時には空のcatch文（`catch {}`）で握りつぶさず、適切なスナックバー通知（`enqueueSnackbar`）やフォールバックUIを表示します。