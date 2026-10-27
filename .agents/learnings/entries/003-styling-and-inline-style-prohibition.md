---
id: 003-styling-and-inline-style-prohibition
title: インラインスタイル・CSS Modulesの禁止とグローバルSCSS運用
date: 2026-10-19
scope: [styling, scss]
status: active
---

### 背景・発生した問題（Problem / Context）
Tailwind CSSやCSS Modules、JSXインラインスタイル（style={{ ... }}）が無秩序に混在すると保守性が低下する。

### 根本原因（Root Cause）
スタイル定義の記述箇所が分散し、デザインシステムトークンの統一利用が困難になる。

### 解決策および今後のルール（Rule & Solution）
- CSS Modules、Tailwind CSS、JSXインラインスタイルの記述を禁止する。
- スタイルはコンポーネント同伴SCSSまたは `src/styles/pages/*.scss` に記述し、`DESIGN.md` および `_variables.scss` のトークンを使用する。
