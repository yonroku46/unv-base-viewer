---
id: 009-seo-aeo-and-route-first-principles
title: SEO & AEO最適化、ダイアログ乱用禁止（Route-First）、ページスタイル構造化
date: 2026-10-20
scope: [seo, aeo, routing, architecture, styling]
status: active
---

### 背景・発生した問題（Problem / Context）
Webサービスでありながら、お知らせや詳細情報などをダイアログ（モーダル）で処理しすぎると、検索エンジンやAI回答エンジン（AEO）にインデックスされず、URL共有もできない。

### 根本原因（Root Cause）
WebとしてのSEO/AEO流入最大化および持続的なチーム保守性の観点の不足。

### 解決策および今後のルール（Rule & Solution）
- **ダイアログ乱用禁止（Route-First原則）**: お知らせや詳細画面、主要機能フローはダイアログで済ませず、固有URLを持つ個別ページ（ルート）として設計する。ダイアログは認証や確認アラート等に限定する。
- **SEO & AEO最適化**: セマンティックなHTML構造（h1〜h3, main, article, section）と明瞭な自然日本語テキストで記述する。
- **ページスタイルの構造化管理**: ページ新規作成時は必ず `src/styles/pages/<route>.scss` に専用スタイルシートを作成し、ルートスコープ化して管理する。
