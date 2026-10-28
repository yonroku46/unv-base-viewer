---
id: 008-external-ui-prohibition-and-important-ban
title: 외부 UI 라이브러리 완전 배제 및 !important 사용 엄금
date: 2026-10-20
scope: [design-system, styling, scss]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
외부 거대 UI 라이브러리를 도입한 결과, 번들 크기 비대화, 스타일 우선순위(Specificity) 충돌, 개별 SCSS에서 무리하게 `!important`를 부여하여 덮어쓰는 안티패턴이 발생함.

### 근본 원인 (Root Cause)
외부 UI 라이브러리가 고유의 스타일 메커니즘과 상세도를 가지고 있어, CSS 변수를 통한 자유로운 토큰 관리나 다크 모드 제어가 극히 어려워짐.

### 해결책 및 향후 규칙 (Rule & Solution)
- `!important`의 안이한 사용을 전면 금지한다.
- 외부 UI 컴포넌트 라이브러리를 완전히 배제하고, 모든 컴포넌트는 Dembrandt의 토큰(`DESIGN.md`)에 기반한 자체 UI(`src/components/ui/*`)로 직접 구현한다.
