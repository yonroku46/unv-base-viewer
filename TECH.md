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
   - ユーザーへのフィードバックには、`notistack` の `useSnackbar()` または `@/components/mui/MuiDialog` を使用します。
6. **インラインスタイルおよび MUI `sx` の乱用禁止**:
   - JSX内での `style={{ ... }}` および MUI `sx={{ ... }}` の乱用を禁止します。グローバルトークン（`var(--primary-color)` 等）を参照するSCSSクラスを定義してください。
7. **外部パッケージの無断追加禁止**:
   - ユーザーの明示的な許可なしに、Zustand、SWR、React Query、Tailwind、Lodashなどのサードパーティ製ライブラリを勝手にインストールしてはなりません。
8. **不要な Redux Slice 追加の禁止**:
   - Redux Toolkitストア（`@/store`）は、`auth` や `notification` などlocalStorageへの永続化が必要な状態のみに限定します。画面固有のローカル状態は `useState` や React Context を使用します。
9. **UIの非日本語露出禁止**:
   - UIラベル、ボタン名、ダイアログ文言、エラーメッセージ、プレースホルダー、メタデータは、すべて自然な日本語で記述します。
10. **未検証での作業完了宣言の禁止**:
    - コード修正後、`yarn lint` および `yarn build` を実行してエラーが解消されたことを確認せずに作業完了とみなすことは禁止します。

---

## 2. コーディング規約およびスタイル

### 2.1. TypeScript型定義
- グローバルエンティティ・共通DTO: `src/types/global.d.ts` 内の `declare global` ブロックで定義（各ファイルでのimport不要）。
- モジュール専用ローカルDTO: 各ファイルの上部で `export interface` として定義。
- 固定の選択肢には、TypeScriptの `enum` ではなく文字列リテラルのユニオン型（`'USER' | 'ADMIN'`）を使用。

### 2.2. CSS / SCSS 命名規則 (BEM記法)
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
  }
}
```

### 2.3. エラーハンドリング
- API呼び出し時には空のcatch文（`catch {}`）で握りつぶさず、適切なスナックバー通知（`enqueueSnackbar`）やフォールバックUIを表示します。
