---
name: manage-design-system
description: Dembrandtを使用したデザインシステムトークン抽出、DESIGN.mdおよび_variables.scssへの反映、および独自UIコンポーネント作成スキル
---

# Dembrandt基盤デザインシステム管理ワークフロー（Design System Workflow）

> **原則**: 本プロジェクトでは外部UIコンポーネントライブラリに依存せず、**Dembrandt**を活用してプロジェクトごとに独立したデザインシステム（トークンおよび独自コンポーネント群）を構築・運用します。

---

## 1. Dembrandt によるトークン抽出と更新手順

ブランドやリファレンスサイトからデザインシステムを導出する場合、以下の手順で実行します。

### 1.1. Dembrandt コマンドの実行
```bash
# 1. AI向けデザイン仕様書 (DESIGN.md) の生成
npx dembrandt <target-url> --design-md

# 2. W3C標準 DTCGトークン (JSON) の抽出
npx dembrandt <target-url> --dtcg
```

### 1.2. `DESIGN.md` の更新
Dembrandtのコンソール出力および生成されたMarkdownをルートの `DESIGN.md` に集約・反映します。
- カラーパレット（Primary, Secondary, Background, Foreground, Surface, Muted, Status）
- タイポグラフィ（Font Family, Font Scale, Font Weights, Line Heights）
- スペーシング（4px/8pxグリッドベース）
- 角丸（Border Radii）
- ボックスシャドウ（Box Shadows / Elevations）
- トランジション（Transitions / Timing Functions）

---

## 2. `_variables.scss` へのトークン展開

`DESIGN.md` で合意・抽出されたトークンを、`src/styles/base/_variables.scss` のCSSカスタムプロパティへ反映します。

```scss
// src/styles/base/_variables.scss
:root {
  // カラーパレット
  --primary-color: #2563eb;
  --primary-color-hover: #1d4ed8;
  --primary-color-bg: #eff6ff;
  --secondary-color: #6366f1;
  --background: #ffffff;
  --foreground: #171717;
  --surface: #f8fafc;
  --border: #e2e8f0;

  // タイポグラフィ
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-base: 1rem;
  --font-lg: 1.125rem;
  --font-xl: 1.25rem;
  --font-2xl: 1.5rem;

  // スペーシング
  --space-1: 0.25rem; // 4px
  --space-2: 0.5rem;  // 8px
  --space-3: 0.75rem; // 12px
  --space-4: 1rem;    // 16px
  --space-6: 1.5rem;  // 24px
  --space-8: 2rem;    // 32px

  // 角丸・シャドウ
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

// ダークモード対応
[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --surface: #1e293b;
  --border: #334155;
}
```

---

## 3. `src/components/ui/` での独自UIコンポーネント作成

すべてのUIコンポーネントは、サードパーティライブラリを介さず、純粋なReact + TypeScript + 同伴SCSS（`<Component>.scss`）で自己完結型として作成します。

### 3.1. ディレクトリ構造
```
src/components/ui/
  ├─ Button/
  │    ├─ Button.tsx
  │    └─ Button.scss
  ├─ Dialog/
  │    ├─ Dialog.tsx
  │    └─ Dialog.scss
  ├─ Input/
  │    ├─ Input.tsx
  │    └─ Input.scss
  └─ index.ts
```

### 3.2. コンポーネント実装の必須要件
1. **トークン参照の徹底**: カラーや余白などのスタイル値はハードコードせず、必ず `var(--...)` を使用します。
2. **最上位ルートスコープ**: コンポーネントSCSSは単一のルートクラス（例: `.ui-button`, `.ui-dialog-backdrop`）内に全要素をネストします。
3. **モバイルホバー保護**: ホバースタイルには必ず `@include hover` を適用します。
4. **アクセシビリティ**: 適切なARIA属性（`aria-label`, `aria-hidden`, `role` 等）およびキーボード操作（Escapeキーでモーダル閉じる等）を実装します。
5. **ブラウザバックセーフ（Dialog）**: モーダル/ダイアログは `popstate` イベントをハンドリングし、モバイルの戻る操作で安全に閉じるように設計します。
