---
id: 001-eslint-and-react19-dependencies
title: React 19およびNext.js 15環境におけるESLint 8固定と依存関係の整合性
date: 2026-10-19
scope: [dependencies, build, eslint]
status: active
---

### 背景・発生した問題（Problem / Context）
ESLint v9最新版が導入された場合、Next.jsの組み込みリント設定（`eslint-config-next`）や関連プラグインと競合し、ビルドエラーや非互換性の問題が発生する。

### 根本原因（Root Cause）
`eslint-config-next@15.1.x` はFlat Config移行の過渡期にあるため、`eslint@^8` および `eslint-visitor-keys@4.2.1` のバージョン固定（`resolutions`）を前提としている。

### 解決策および今後のルール（Rule & Solution）
1. `package.json` の eslint は `"eslint": "^8"` を維持し、`resolutions` に `"eslint-visitor-keys": "4.2.1"` を必ず設定する。
2. パッケージインストール時のタイムアウトを防ぐため、必要に応じて `--network-timeout 600000` を付与する。
