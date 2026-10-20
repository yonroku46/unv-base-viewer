---
id: 008-mui-global-theming-and-important-prohibition
title: MUIコンポーネント全体テーマ化原則および!important使用厳禁
date: 2026-10-20
scope: [mui, styling, scss, theme]
status: active
---

### 背景・発生した問題（Problem / Context）
個別のSCSSファイルで `.Mui*` クラスをアドホックに上書きしたり、強引に `!important` を付与してスタイルを適用していた。

### 根本原因（Root Cause）
MUIのテーマ機構を無視した場当たり的なスタイル上書きにより、サービス全体の統一性と詳細度設計が破壊される。

### 解決策および今後のルール（Rule & Solution）
- `!important` の安易な使用を全面的に禁止する。
- MUIコンポーネントのカスタマイズは個別SCSSで行わず、必ず `src/components/provider/MuiProvider.tsx` の `createTheme`（`components: { MuiXxx: { styleOverrides: ... } }`）で一括管理する。
