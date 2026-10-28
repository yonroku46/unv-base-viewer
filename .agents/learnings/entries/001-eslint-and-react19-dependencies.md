---
id: 001-eslint-and-react19-dependencies
title: React 19과 ESLint 호환성 및 의존성 관리
date: 2026-10-19
scope: [build, lint, dependencies]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
React 19 환경에서 ESLint 관련 패키지가 일부 비호환 에러를 유발하는 경우가 발생함.

### 근본 원인 (Root Cause)
Next.js 15 및 React 19 전환기에 일부 eslint 플러그인이 React 19의 peerDependencies를 충족하지 못함.

### 해결책 및 향후 규칙 (Rule & Solution)
- ESLint 실행은 `yarn lint`를 사용하며, 의존성 업데이트 시 peerDependencies 충돌에 유의한다.
- 불필요한 패키지 남발을 피하고 `package.json`의 의존성을 엄격히 관리한다.
