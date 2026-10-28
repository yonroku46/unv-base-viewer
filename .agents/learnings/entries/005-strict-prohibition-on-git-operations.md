---
id: 005-strict-prohibition-on-git-operations
title: Git 스테이징 및 커밋 조작의 AI 자율 실행 엄금
date: 2026-10-19
scope: [git, protocol]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
에이전트가 자율적으로 `git add`, `git commit`, `git push`를 실행할 경우, 사용자의 커밋 히스토리가 오염되거나 의도치 않은 변경 사항이 포함될 위험이 발생함.

### 근본 원인 (Root Cause)
Git 버전 관리 및 커밋 단위 판단은 사용자 측의 배타적 권한이라는 책임 경계 위반.

### 해결책 및 향후 규칙 (Rule & Solution)
- `git add`, `git commit`, `git push`, `git reset` 등의 Git 조작은 AI가 자동 또는 독단으로 실행하는 것을 엄격히 금지한다.
