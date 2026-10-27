# Project Design System (Dembrandt Blueprint)

> **概要**: 本ドキュメントは、**Dembrandt**（デザインインテリジェンス・トークン抽出ツール）の出力結果を基盤とした、本プロジェクト固有のデザインシステム仕様書です。
> AIコーディングアシスタントおよび開発者は、すべてのUI実装において本書のトークンおよびコンポーネント仕様を単一真実源（SSOT）として参照してください。

---

## 1. デザイン原則（Design Principles）

1. **Lightweight & Zero-Bloat**: 外部巨大UIライブラリに依存せず、純粋なReact + TypeScript + SCSSで最高峰のパフォーマンスを実現。
2. **Token-Driven Consistency**: すべての色彩、余白、タイポグラフィ、角丸はCSSカスタムプロパティ（`var(--...)`）を参照し、ハードコードを排除。
3. **Accessibility & Responsive**: セマンティックHTML、適切なARIA属性、モバイルタップ時のsticky hover防止（`@include hover`）、および完全なレスポンシブ設計。
4. **Adaptive Dark Mode**: CSS変数によるシームレスなライト/ダークモード切替を標準サポート。

---

## 2. デザイントークン仕様（Design Tokens）

### 2.1. カラーパレット（Color Palette）

| トークン名 | ライトモード値 | ダークモード値 | 説明 / 役割 |
| :--- | :--- | :--- | :--- |
| `--primary-color` | `#2563eb` (Blue 600) | `#3b82f6` (Blue 500) | ブランドプライマリカラー、主要CTA |
| `--primary-color-hover` | `#1d4ed8` (Blue 700) | `#60a5fa` (Blue 400) | プライマリホバー時 |
| `--primary-color-bg` | `#eff6ff` (Blue 50) | `rgba(37, 99, 235, 0.15)` | プライマリ背景ハイライト |
| `--secondary-color` | `#6366f1` (Indigo 500) | `#818cf8` (Indigo 400) | サブアクセント、補助バッジ等 |
| `--accent-color` | `#f59e0b` (Amber 500) | `#fbbf24` (Amber 400) | ハイライト、注目要素 |
| `--background` | `#ffffff` | `#0f172a` (Slate 900) | アプリケーション全体背景 |
| `--foreground` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | 基本テキストカラー |
| `--surface` | `#f8fafc` (Slate 50) | `#1e293b` (Slate 800) | カード、サーフェス、ドロワー背景 |
| `--surface-hover` | `#f1f5f9` (Slate 100) | `#334155` (Slate 700) | サーフェスホバー背景 |
| `--border` | `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | ボーダー・区切り線 |
| `--border-focus` | `#2563eb` | `#3b82f6` | 入力フォーカス時のボーダー |

#### テキスト・グレースケール
| トークン名 | ライトモード値 | ダークモード値 | 用途 |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#0f172a` | `#f8fafc` | 見出し、メインテキスト |
| `--text-secondary` | `#475569` | `#94a3b8` | サブタイトル、メタ情報 |
| `--text-muted` | `#94a3b8` | `#64748b` | プレースホルダー、非活性テキスト |
| `--text-disabled` | `#cbd5e1` | `#475569` | 無効状態 |

#### ステータスカラー（Status Variants）
| トークン名 | 値 | 背景色 | 用途 |
| :--- | :--- | :--- | :--- |
| `--variant-success` | `#10b981` (Emerald 500) | `rgba(16, 185, 129, 0.1)` | 成功、完了通知 |
| `--variant-error` | `#ef4444` (Red 500) | `rgba(239, 68, 68, 0.1)` | エラー、バリデーション失敗 |
| `--variant-warning` | `#f59e0b` (Amber 500) | `rgba(245, 158, 11, 0.1)` | 警告、注意喚起 |
| `--variant-info` | `#3b82f6` (Blue 500) | `rgba(59, 130, 246, 0.1)` | インフォメーション |

---

### 2.2. タイポグラフィ（Typography Scale）

```scss
// 基本フォントファミリー
--font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-code: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

// フォントサイズ
--font-xs: 0.75rem;    // 12px
--font-sm: 0.875rem;   // 14px
--font-base: 1rem;     // 16px
--font-lg: 1.125rem;   // 18px
--font-xl: 1.25rem;    // 20px
--font-2xl: 1.5rem;    // 24px
--font-3xl: 1.875rem;  // 30px
--font-4xl: 2.25rem;   // 36px

// フォントウェイト
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

// 行高 (Line Height)
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

### 2.3. スペーシング（Spacing Scale）

4px / 8px をベースとした規則的なグリッドスケールを採用しています。

| トークン名 | ピクセル換算 | Rem値 | 主な用途 |
| :--- | :--- | :--- | :--- |
| `--space-1` | 4px | `0.25rem` | 微小パディング、アイコンマージン |
| `--space-2` | 8px | `0.5rem` | ボタン内インライン余白、バッジ余白 |
| `--space-3` | 12px | `0.75rem` | 入力欄パディング、カード小余白 |
| `--space-4` | 16px | `1rem` | 標準ブロックパディング、グリッドギャップ |
| `--space-5` | 20px | `1.25rem` | モーダルヘッダー余白 |
| `--space-6` | 24px | `1.5rem` | カードコンテナパディング |
| `--space-8` | 32px | `2rem` | セクション間マージン |
| `--space-10` | 40px | `2.5rem` | 画面上部余白 |
| `--space-12` | 48px | `3rem` | 大セクション間隔 |
| `--space-16` | 64px | `4rem` | ヒーローセクション上下パディング |

---

### 2.4. 角丸およびシャドウ（Border Radius & Shadows）

```scss
// 角丸
--radius-none: 0px;
--radius-sm: 4px;      // バッジ、タグ
--radius-md: 8px;      // ボタン、入力フィールド
--radius-lg: 12px;     // カード、ポップオーバー
--radius-xl: 16px;     // モーダル、ダイアログ
--radius-full: 9999px; // ピルボタン、アバター

// シャドウ (Elevation)
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

// トランジション
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 3. UIコンポーネント仕様（`src/components/ui/`）

本プロジェクトで標準実装・保守するデザインシステムコンポーネントです。

### 3.1. `Button` (`@/components/ui/Button/Button`)
- **バリアント**: `primary`, `secondary`, `outlined`, `ghost`
- **サイズ**: `sm` (32px高), `md` (40px高), `lg` (48px高)
- **ステート**: `disabled`, `loading` (スピナー表示)
- **アイコン**: `startIcon`, `endIcon`

### 3.2. `Dialog` (`@/components/ui/Dialog/Dialog`)
- **機能**: ポータルレンダリング、ESCキー閉鎖、背景クリック閉鎖、フォーカストラップ
- **ブラウザバックセーフ**: モバイルの `popstate` イベントに対応し、戻るボタンで安全に閉鎖
- **構造**: `DialogTitle`, `DialogContent`, `DialogActions`

### 3.3. `Input` (`@/components/ui/Input/Input`)
- **機能**: ラベル、プレースホルダー、ヘルパーテキスト、エラーメッセージ表示
- **ステート**: `focus`, `error`, `disabled`

### 3.4. `Tabs` (`@/components/ui/Tabs/Tabs`)
- **機能**: WAI-ARIA対応のキーボードナビゲーション（矢印キー操作）、アクティブインジケーター

---

## 4. Dembrandt 実行・保守フロー

プロジェクト立ち上げ時やリブランディング時に新しいデザインパラメータを抽出・更新するコマンド：

```bash
# 1. ターゲットサイトからAI用DESIGN.mdを抽出
npx dembrandt https://example.com --design-md

# 2. DTCG W3C標準トークンJSONを抽出
npx dembrandt https://example.com --dtcg

# 3. 抽出されたコンソール結果を本書 (DESIGN.md) および _variables.scss へ反映
```
