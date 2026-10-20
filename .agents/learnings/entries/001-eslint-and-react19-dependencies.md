---
id: 001-eslint-and-react19-dependencies
title: React 19とESLintの互換性および依存関係管理
date: 2026-10-19
scope: [build, lint, dependencies]
status: active
---

### 背景・発生した問題（Problem / Context）
React 19環境においてESLintの関連パッケージが一部非互換エラーを起こす場合があった。

### 根本原因（Root Cause）
Next.js 15およびReact 19への移行期において、一部のeslintプラグインがReact 19のpeerDependenciesを満たさないことがある。

### 解決策および今後のルール（Rule & Solution）
- ESLintの実行は `yarn lint` を使用し、依存関係の更新時はpeerDependenciesの競合に留意する。
- 不要なパッケージの乱立を避け、package.jsonの依存関係を厳格に管理する。
