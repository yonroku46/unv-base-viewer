---
id: 002-dual-file-ssr-csr-pattern
title: 公開ページのデュアルファイルパターン（page.tsx / *Client.tsx）
date: 2026-10-19
scope: [nextjs, ssr, csr, seo]
status: active
---

### 背景・発生した問題（Problem / Context）
Next.js App RouterでSEO・OGPメタデータを担保しつつクライアント状態を扱う際、ファイル構成が混同されやすい。

### 根本原因（Root Cause）
`"use client"` を付与したファイルでは `generateMetadata()` が利用できず、SSRの利点が損なわれる。

### 解決策および今後のルール（Rule & Solution）
- 公開インデックス対象ページは必ず `page.tsx`（Server Component: generateMetadata, SSRデータ取得）と `*Client.tsx`（Client Component: ブラウザUI/ステート）に分離する。
