---
id: 008-external-ui-prohibition-and-important-ban
title: 外部UIライブラリの完全排除および!important使用厳禁
date: 2026-10-20
scope: [design-system, styling, scss]
status: active
---

### 背景・発生した問題（Problem / Context）
外部の巨大UIライブラリを導入した結果、バンドルサイズの肥大化、スタイルの詳細度衝突、および個別SCSSで強引に `!important` を付与して上書きするアンチパターンが発生した。

### 根本原因（Root Cause）
外部UIライブラリが独自のスタイル機構や詳細度を持つため、CSS変数による自由なトークン管理やダークモードの制御が著しく困難になる。

### 解決策および今後のルール（Rule & Solution）
- `!important` の安易な使用を全面的に禁止する。
- 外部UIコンポーネントライブラリを完全排除し、すべてのコンポーネントはDembrandtのトークン（`DESIGN.md`）に基づく独自UI（`src/components/ui/*`）で自前実装する。
