---
id: 005-strict-prohibition-on-git-operations
title: Gitステージングおよびコミット操作のAI自律実行厳禁
date: 2026-10-19
scope: [git, protocol]
status: active
---

### 背景・発生した問題（Problem / Context）
エージェントが自律的に `git add` や `git commit`、`git push` を実行すると、ユーザーのコミット履歴や意図しない差分の巻き込みが発生する。

### 根本原因（Root Cause）
Gitのバージョン管理およびコミット単位の判断はユーザー側の排他的な権限であることの境界違反。

### 解決策および今後のルール（Rule & Solution）
- `git add`, `git commit`, `git push`, `git reset` などのGit操作はAIが自動または独断で実行することを厳禁とする。
