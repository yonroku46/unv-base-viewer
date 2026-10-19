---
id: 003-styling-and-inline-style-prohibition
title: スタイリング境界の遵守（インラインスタイル禁止・SCSSトークンの徹底）
date: 2026-10-19
scope: [styling, scss, mui]
status: active
---

### 背景・発生した問題（Problem / Context）
コンポーネントごとにインラインスタイル（`style={{ ... }}`）や MUI の `sx={{ ... }}`、アドホックなCSSモジュールを使用すると、プロジェクト全体のデザイン統一性が崩れ、保守性が著しく低下する。

### 根本原因（Root Cause）
手早いマークアップ作成のためにインラインでスタイル値を直接注入してしまう慣行。

### 解決策および今後のルール（Rule & Solution）
1. CSS Modules（`.module.scss`）およびTailwind CSSは使用しない。
2. JSX/TSX内でのインライン `style` および `sx` プロパティの乱用を禁止する。
3. コンポーネント同伴のスタイルシート（`Component.scss`）または `src/styles/pages/*.scss` を作成し、BEM記法のクラス名でスタイルを適用する。
4. すべてのカラー、余白、シャドウ値は `src/styles/base/_variables.scss` および `_mixins.scss` に定義されたCSS変数を最優先で使用する。
