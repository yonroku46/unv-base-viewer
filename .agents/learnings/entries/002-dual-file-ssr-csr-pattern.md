---
id: 002-dual-file-ssr-csr-pattern
title: 公開ページのSSR / CSR分離（デュアルファイルパターン）の徹底
date: 2026-10-19
scope: [nextjs, ssr, architecture]
status: active
---

### 背景・発生した問題（Problem / Context）
Next.js App Routerにおいて、ページ全体を安易に `"use client"` で宣言すると、サーバーサイドレンダリング（SSR）、検索エンジン向けメタデータ（SEO/AEO）、および初回ローディング速度に悪影響を及ぼす。

### 根本原因（Root Cause）
ブラウザイベントやクライアント側の状態管理が必要な箇所と、初期データ取得やSEOが求められる箇所が1つのファイルに混在して実装されやすいため。

### 解決策および今後のルール（Rule & Solution）
1. インデックス対象の公開ページは必ず2つのファイルに分割して作成する。
   - `page.tsx`: Server Component。`generateMetadata()`、SSRデータフェッチ、HTML骨格を担当。
   - `*Client.tsx`: Client Component (`"use client"`)。ブラウザ固有のインタラクションおよびUIステートを担当。
2. 例外: 管理画面・マイページなど、100%認証前提のインタラクティブなダッシュボードは `"use client"` 単一ファイルでの実装を許可する。
