---
id: 007-hover-mixin-and-root-scoping-rules
title: 모바일 hover 간섭 방지(@include hover) 및 최상위 루트 스코프 의무화
date: 2026-10-20
scope: [styling, scss, mobile]
status: active
---

### 배경 및 발생 문제 (Problem / Context)
모바일 기기에서 탭 시 호버 스타일이 잔류(sticky hover)하는 문제 및 SCSS 내에서 평면적인 클래스명이 정의되어 다른 컴포넌트와 스타일이 충돌할 우려가 발생함.

### 근본 원인 (Root Cause)
직접적인 `&:hover` 작성으로 인한 터치 기기 고려 누락, 및 최상위 래퍼 클래스를 통한 스코프화 부재.

### 해결책 및 향후 규칙 (Rule & Solution)
- 호버 정의는 반드시 `@/styles/base/mixins`의 `@mixin hover`(`@media (hover: hover) and (pointer: fine)`)를 사용한다.
- 모든 SCSS 정의는 단일 최상위 루트 클래스(예: `.auth-dialog-paper`, `.app-header`) 내부에 완전히 중첩(nest)한다.
