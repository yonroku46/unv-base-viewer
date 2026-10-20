---
id: 007-hover-mixin-and-root-scoping-rules
title: モバイルhover干渉防止（@include hover）および最上位ルートスコープ義務
date: 2026-10-20
scope: [styling, scss, mobile]
status: active
---

### 背景・発生した问题（Problem / Context）
モバイル端末でタップした際にホバースタイルが残留（sticky hover）する問題や、SCSS内でフラットなクラス名が定義されて他コンポーネントと衝突する懸念があった。

### 根本原因（Root Cause）
直接の `&:hover` 記述によるタッチデバイス考慮漏れ、および最上位ラッパークラスによるスコープ化の欠如。

### 解決策および今後のルール（Rule & Solution）
- ホバー定義は必ず `@/styles/base/mixins` の `@mixin hover`（`@media (hover: hover) and (pointer: fine)`）を使用する。
- すべてのSCSS定義は単一の最上位ルートクラス（例: `.auth-dialog-paper`, `.app-header`）の内部に完全にネストする。
